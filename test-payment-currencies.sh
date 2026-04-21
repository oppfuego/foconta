#!/bin/zsh

# Test payment creation for USD, EUR, GBP currencies
# This script creates payment requests and logs the results to logs/payment-flow.json

set -e

ENDPOINT="http://localhost:3000/api/payments/create"
AUTH_TOKEN="your_jwt_token_here"  # Заміни на реальний токен або запусти після login

# Test currencies and amounts
declare -a CURRENCIES=("USD" "EUR" "GBP")
declare -a AMOUNTS=(100 150 75)

echo "🚀 Starting payment flow tests for all currencies..."
echo ""

for i in {1..3}; do
    CURRENCY=${CURRENCIES[$i]}
    AMOUNT=${AMOUNTS[$i]}

    echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
    echo "Test #$i: $CURRENCY - Amount: $AMOUNT"
    echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
    echo ""

    # Prepare request payload
    PAYLOAD=$(cat <<EOF
{
  "amount": $AMOUNT,
  "currency": "$CURRENCY"
}
EOF
)

    echo "📤 Request Payload:"
    echo "$PAYLOAD" | jq .
    echo ""

    # Send request
    echo "🌐 Sending request to $ENDPOINT"
    RESPONSE=$(curl -s -X POST "$ENDPOINT" \
      -H "Content-Type: application/json" \
      -H "Authorization: Bearer $AUTH_TOKEN" \
      -d "$PAYLOAD" 2>&1)

    echo "📥 Response:"
    echo "$RESPONSE" | jq . 2>/dev/null || echo "$RESPONSE"
    echo ""

    # Wait between requests
    if [ $i -lt 3 ]; then
        echo "⏳ Waiting 2 seconds before next request..."
        sleep 2
    fi
done

echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "✅ All tests completed!"
echo ""
echo "📋 Payment flow logs saved to: logs/payment-flow.json"
echo ""
echo "View logs:"
echo "  cat logs/payment-flow.json | jq ."
echo ""

