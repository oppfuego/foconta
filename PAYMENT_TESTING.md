# 💳 Payment Flow Testing Guide

This guide explains how to test payment creation for all supported currencies (USD, EUR, GBP) and view the logs.

## 📋 Quick Start

### 1. Start the Development Server

```bash
npm run dev
```

The app will be available at `http://localhost:3000`

### 2. Get Authentication Token

First, you need to register or login to get a valid JWT token.

**Register:**
```bash
curl -X POST http://localhost:3000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "SecurePassword123!"
  }'
```

**Login:**
```bash
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "SecurePassword123!"
  }' | jq '.data.access_token'
```

Save the `access_token` from the response.

### 3. Run Currency Tests

#### Option A: Using TypeScript Runner

```bash
# Compile and run the test
npx ts-node src/example/test-payment-flow.ts "YOUR_JWT_TOKEN"

# Or with custom app URL
npx ts-node src/example/test-payment-flow.ts "YOUR_JWT_TOKEN" "http://localhost:3000"
```

#### Option B: Manual cURL Requests

**Test USD:**
```bash
curl -X POST http://localhost:3000/api/payments/create \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -d '{
    "amount": 100,
    "currency": "USD"
  }' | jq .
```

**Test EUR:**
```bash
curl -X POST http://localhost:3000/api/payments/create \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -d '{
    "amount": 150,
    "currency": "EUR"
  }' | jq .
```

**Test GBP:**
```bash
curl -X POST http://localhost:3000/api/payments/create \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -d '{
    "amount": 75,
    "currency": "GBP"
  }' | jq .
```

### 4. View Payment Flow Logs

#### Option A: Browser (Recommended)

Open in your browser:
```
http://localhost:3000/api/payments/logs
http://localhost:3000/api/payments/logs?limit=50
http://localhost:3000/api/payments/logs?event=payment.create.completed
```

#### Option B: Command Line

View all logs:
```bash
cat logs/payment-flow.json | jq .
```

View last 10 entries:
```bash
tail -1 logs/payment-flow.json | jq '.[-10:]'
```

Filter by event type:
```bash
cat logs/payment-flow.json | jq '.[] | select(.event | contains("payment.create"))'
```

View a specific currency:
```bash
cat logs/payment-flow.json | jq '.[] | select(.requestedCurrency == "EUR")'
```

### 5. Clear Logs

```bash
# HTTP DELETE
curl -X DELETE http://localhost:3000/api/payments/logs

# Or manually delete
rm logs/payment-flow.json
```

## 📊 Log Structure

Each payment flow is logged with these event types:

### Create Payment Events
- `payment.create.received` — Initial request received
- `payment.create.converted` — Currency conversion calculated
- `payment.create.provider_non_json` — Provider returned non-JSON response
- `payment.create.provider_error` — Provider returned error
- `payment.create.redirect_missing` — Payment URL not found in response
- `payment.create.completed` — Payment created successfully
- `payment.create.failed` — Payment creation failed

### Callback Events
- `payment.callback.received` — Callback received from provider
- `payment.callback.invalid_payload` — Invalid callback payload
- `payment.callback.invalid_signature` — Signature verification failed
- `payment.callback.missing_reference` — Reference ID not found
- `payment.callback.mapped_state` — Payment state determined
- `payment.callback.order_not_found` — Order not found in database
- `payment.callback.duplicate_completed` — Order already completed
- `payment.callback.tokens_credited` — Tokens credited to user
- `payment.callback.completed` — Callback processing completed
- `payment.callback.failed` — Callback processing failed

## 🔄 Currency Conversion Rates

```
Base: GBP
GBP: 1.0
EUR: 1.17
USD: 1.29

Tokens per GBP: 100
```

### Example Conversions:
- **USD 100** → ~77.52 GBP → ~7,752 tokens
- **EUR 150** → ~128.21 GBP → ~12,821 tokens
- **GBP 75** → 75 GBP → 7,500 tokens

## 🛠 Environment Variables

Required in `.env`:

```env
APS_MERCHANT_GUID="..."
APS_METHOD_GUID_USD="..."
APS_METHOD_GUID_EUR="..."
APS_METHOD_GUID_GBP="..."
APS_CALLBACK_SECRET="..."
APS_APP_TOKEN="..."
APS_APP_SECRET="..."
APS_API_URL="..."
```

## 🐛 Troubleshooting

### "Invalid signature" in callback logs
- Check `APS_CALLBACK_SECRET` in `.env`
- Verify provider is sending correct signature

### "Order not found"
- Ensure database is running
- Check MongoDB connection string

### "No redirect URL in response"
- Check provider credentials
- Verify method GUIDs are correct for each currency
- Check provider API status

### Payment log not appearing
- Ensure `logs/` directory has write permissions
- Check `PAYMENT_LOG_ENABLED` is not set to `false`
- Review server console for errors

## 📝 Example Log Entry

```json
{
  "timestamp": "2026-04-20T15:30:45.123Z",
  "event": "payment.create.completed",
  "referenceId": "topup-user123-1713619845123-abc12def",
  "userId": "user123",
  "requestedCurrency": "EUR",
  "providerCurrency": "EUR",
  "requestedAmount": 150,
  "providerAmount": 150,
  "tokens": 12821,
  "currencyFallback": false,
  "redirectUrl": "https://payment-provider.com/checkout/..."
}
```

## 🔗 API Endpoints

| Endpoint | Method | Purpose |
|----------|--------|---------|
| `/api/payments/create` | POST | Create payment order |
| `/api/payments/callback` | POST | Receive payment callback |
| `/api/payments/logs` | GET | View payment flow logs |
| `/api/payments/logs` | DELETE | Clear payment logs |
| `/api/payments/status` | GET | Check payment status |
| `/api/payments/orders` | GET | List all payment orders |

---

**Happy Testing! 🚀**

