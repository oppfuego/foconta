import fs from "fs";
import path from "path";

/**
 * Test payment creation for USD, EUR, GBP currencies
 * Logs all payment flow events to logs/payment-flow.json
 *
 * Usage:
 *   node src/example/test-payment-flow.js <auth_token> [app_url]
 *
 * Example:
 *   node src/example/test-payment-flow.js "eyJhbGc..." "http://localhost:3000"
 */

const APP_URL = process.argv[3] || "http://localhost:3000";
const AUTH_TOKEN = process.argv[2];

if (!AUTH_TOKEN) {
    console.error("❌ Error: AUTH_TOKEN is required");
    console.error("Usage: node test-payment-flow.js <auth_token> [app_url]");
    process.exit(1);
}

interface PaymentTestCase {
    currency: string;
    amount: number;
}

const testCases: PaymentTestCase[] = [
    { currency: "USD", amount: 100 },
    { currency: "EUR", amount: 150 },
    { currency: "GBP", amount: 75 },
];

async function testPaymentCreation(
    testCase: PaymentTestCase,
    index: number
): Promise<void> {
    const { currency, amount } = testCase;
    const endpoint = `${APP_URL}/api/payments/create`;

    console.log(
        `\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━`
    );
    console.log(
        `Test #${index + 1}: ${currency} - Amount: ${amount}`
    );
    console.log(
        `━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━`
    );

    const payload = { amount, currency };

    console.log("📤 Request Payload:");
    console.log(JSON.stringify(payload, null, 2));

    console.log(`\n🌐 Sending request to ${endpoint}`);

    try {
        const response = await fetch(endpoint, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${AUTH_TOKEN}`,
            },
            body: JSON.stringify(payload),
        });

        const responseData = await response.json();

        console.log(`\n📥 Response (${response.status}):`);
        console.log(JSON.stringify(responseData, null, 2));

        if (!response.ok) {
            console.error(
                `⚠️  Request failed with status ${response.status}`
            );
        } else {
            console.log(
                `✅ Payment created successfully`
            );
            console.log(
                `   Reference ID: ${responseData.reference_id}`
            );
            console.log(
                `   Tokens: ${responseData.tokens}`
            );
            console.log(
                `   Provider Currency: ${responseData.provider_currency}`
            );
            if (responseData.currency_fallback) {
                console.log(
                    `   ⚠️  Currency fallback applied: ${currency} → ${responseData.provider_currency}`
                );
            }
        }
    } catch (error: any) {
        console.error(`❌ Error: ${error.message}`);
    }
}

async function runAllTests(): Promise<void> {
    console.log(
        `\n🚀 Starting payment flow tests for all currencies...`
    );
    console.log(`📍 Endpoint: ${APP_URL}/api/payments/create`);
    console.log(`🔐 Using provided auth token\n`);

    for (let i = 0; i < testCases.length; i++) {
        await testPaymentCreation(testCases[i], i);

        if (i < testCases.length - 1) {
            console.log("\n⏳ Waiting 2 seconds before next request...");
            await new Promise((resolve) => setTimeout(resolve, 2000));
        }
    }

    console.log(
        `\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━`
    );
    console.log(`✅ All tests completed!`);
    console.log(
        `\n📋 Payment flow logs saved to: logs/payment-flow.json`
    );
    console.log(`\n📖 View logs:`);
    console.log(
        `   cat logs/payment-flow.json | jq .`
    );

    // Display logs if file exists
    const logPath = path.join(process.cwd(), "logs", "payment-flow.json");
    if (fs.existsSync(logPath)) {
        console.log(`\n📊 Recent log entries:`);
        const logs = JSON.parse(fs.readFileSync(logPath, "utf8"));
        const recentLogs = logs.slice(-20);
        console.log(JSON.stringify(recentLogs, null, 2));
    }
}

runAllTests().catch(console.error);

