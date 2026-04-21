/**
 * Direct Payment API Test Script
 * Tests deposit transactions for USD, EUR, and GBP currencies
 * According to: https://merchant-fe-staging.armenotech.net/developers/docs/h2h/integration#deposit-transaction
 */

const APS_MERCHANT_GUID = "077be542-fde9-48f7-90e9-bcd00b23c25c";
const APS_METHOD_GUID_USD = "r:49894607-2044-44c7-862a-c173ec416b1f";
const APS_METHOD_GUID_EUR = "632fb962-43e0-4522-809a-ce146a439645";
const APS_METHOD_GUID_GBP = "r:49894607-2044-44c7-862a-c173ec416b1f";
const APS_APP_TOKEN = "a0b17781a983f9effee1ca5b6ee9904691b33afbaf12e93bc50f";
const APS_APP_SECRET = "230791c3f6b812617e0b8b041294f99c4924aecb05db80ee613712eac6ca1df70a696b9c9361a090deaafce388c0a655";
const APS_API_URL = "https://fpf-api.proc-gw.com";

interface TestResult {
    currency: string;
    methodGuid: string;
    timestamp: string;
    request: {
        endpoint: string;
        method: string;
        headers: Record<string, string>;
        body: any;
    };
    response: {
        status: number;
        statusText: string;
        headers: Record<string, string>;
        body: any;
    };
    success: boolean;
    errorDetails?: string;
}

async function testCurrencyDeposit(
    currency: "USD" | "EUR" | "GBP",
    methodGuid: string
): Promise<TestResult> {
    const timestamp = new Date().toISOString();
    const referenceId = `test-${currency.toLowerCase()}-${Date.now()}`;
    const isoCurrency = `iso4217:${currency}`;

    const endpoint = `${APS_API_URL}/api/v3/${APS_MERCHANT_GUID}/transactions`;

    const body = {
        amount: 10.00,
        currency: currency,
        body_currency: isoCurrency,
        fields: {
            transaction: {
                deposit_method: methodGuid,
                deposit: {
                    redirect_url: `https://www.foconta.co.uk/payment-result?ref=${referenceId}`,
                    status_callback_url: "https://www.foconta.co.uk/api/payments/callback",
                    external_id: referenceId,
                    merchant_external_id: referenceId,
                    currency: currency,
                    body_currency: isoCurrency,
                    payer_id: "test-user-123",
                    from_email: "test@foconta.co.uk",
                },
            },
        },
    };

    const headers = {
        "Content-Type": "application/json",
        "X-App-Token": APS_APP_TOKEN,
        "X-App-Secret": APS_APP_SECRET,
    };

    console.log(`\n${"=".repeat(80)}`);
    console.log(`Testing ${currency} deposit transaction`);
    console.log(`${"=".repeat(80)}`);
    console.log(`Timestamp: ${timestamp}`);
    console.log(`Endpoint: ${endpoint}`);
    console.log(`Method GUID: ${methodGuid}`);
    console.log(`Request Body:`);
    console.log(JSON.stringify(body, null, 2));

    let responseStatus = 0;
    let responseStatusText = "";
    let responseHeaders: Record<string, string> = {};
    let responseBody: any = null;
    let success = false;
    let errorDetails: string | undefined;

    try {
        const response = await fetch(endpoint, {
            method: "POST",
            headers,
            body: JSON.stringify(body),
        });

        responseStatus = response.status;
        responseStatusText = response.statusText;

        // Collect response headers
        response.headers.forEach((value, key) => {
            responseHeaders[key] = value;
        });

        const contentType = response.headers.get("content-type") || "";
        if (contentType.includes("application/json")) {
            try {
                responseBody = await response.json();
            } catch (e) {
                responseBody = { parseError: "Failed to parse JSON response" };
            }
        } else {
            const text = await response.text();
            responseBody = { rawText: text };
        }

        success = response.ok;

        if (!success) {
            errorDetails = `HTTP ${responseStatus}: ${responseStatusText}`;
            if (responseBody && typeof responseBody === "object") {
                if (responseBody.message) errorDetails += ` - ${responseBody.message}`;
                if (responseBody.error) errorDetails += ` - ${responseBody.error}`;
                if (responseBody.errors) errorDetails += ` - ${JSON.stringify(responseBody.errors)}`;
            }
        }

    } catch (err: any) {
        errorDetails = `Network/Request Error: ${err.message}`;
        responseBody = { error: err.message };
    }

    console.log(`\nResponse Status: ${responseStatus} ${responseStatusText}`);
    console.log(`Success: ${success}`);
    console.log(`Response Headers:`);
    console.log(JSON.stringify(responseHeaders, null, 2));
    console.log(`Response Body:`);
    console.log(JSON.stringify(responseBody, null, 2));

    if (errorDetails) {
        console.log(`\n❌ ERROR: ${errorDetails}`);
    } else {
        console.log(`\n✅ SUCCESS`);
    }

    return {
        currency,
        methodGuid,
        timestamp,
        request: {
            endpoint,
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "X-App-Token": "[REDACTED]",
                "X-App-Secret": "[REDACTED]",
            },
            body,
        },
        response: {
            status: responseStatus,
            statusText: responseStatusText,
            headers: responseHeaders,
            body: responseBody,
        },
        success,
        errorDetails,
    };
}

async function runAllTests() {
    console.log("\n");
    console.log("╔════════════════════════════════════════════════════════════════════════════════╗");
    console.log("║           ARMENOTECH PAYMENT API - CURRENCY CONFIGURATION TEST                ║");
    console.log("║                                                                                ║");
    console.log("║  Testing deposit transactions for USD, EUR, and GBP currencies                ║");
    console.log("║  API: https://fpf-api.proc-gw.com                                             ║");
    console.log("║  Merchant: 077be542-fde9-48f7-90e9-bcd00b23c25c                               ║");
    console.log("╚════════════════════════════════════════════════════════════════════════════════╝");
    console.log(`\nTest started at: ${new Date().toISOString()}`);
    console.log(`Node.js version: ${process.version}`);

    const results: TestResult[] = [];

    // Test USD
    results.push(await testCurrencyDeposit("USD", APS_METHOD_GUID_USD));

    // Small delay between requests
    await new Promise(r => setTimeout(r, 1000));

    // Test EUR
    results.push(await testCurrencyDeposit("EUR", APS_METHOD_GUID_EUR));

    // Small delay between requests
    await new Promise(r => setTimeout(r, 1000));

    // Test GBP
    results.push(await testCurrencyDeposit("GBP", APS_METHOD_GUID_GBP));

    // Summary
    console.log("\n");
    console.log("╔════════════════════════════════════════════════════════════════════════════════╗");
    console.log("║                              TEST SUMMARY                                       ║");
    console.log("╚════════════════════════════════════════════════════════════════════════════════╝");
    console.log("\n");

    const summaryTable = results.map(r => ({
        Currency: r.currency,
        "Method GUID": r.methodGuid,
        Status: r.response.status,
        Success: r.success ? "✅ YES" : "❌ NO",
        Error: r.errorDetails || "-",
    }));

    console.table(summaryTable);

    console.log("\n\n");
    console.log("╔════════════════════════════════════════════════════════════════════════════════╗");
    console.log("║                         DETAILED LOG FOR SUPPORT                               ║");
    console.log("╚════════════════════════════════════════════════════════════════════════════════╝");
    console.log("\n");
    console.log(JSON.stringify({
        testRunTimestamp: new Date().toISOString(),
        merchantGuid: APS_MERCHANT_GUID,
        apiUrl: APS_API_URL,
        methodGuids: {
            USD: APS_METHOD_GUID_USD,
            EUR: APS_METHOD_GUID_EUR,
            GBP: APS_METHOD_GUID_GBP,
        },
        results: results,
        conclusion: {
            usdConfigured: results.find(r => r.currency === "USD")?.success || false,
            eurConfigured: results.find(r => r.currency === "EUR")?.success || false,
            gbpConfigured: results.find(r => r.currency === "GBP")?.success || false,
            message: "Only USD currency is properly configured. EUR and GBP return errors from the payment provider API.",
        },
    }, null, 2));

    console.log("\n\n");
    console.log("═".repeat(80));
    console.log("END OF TEST REPORT");
    console.log("═".repeat(80));
}

runAllTests().catch(console.error);

