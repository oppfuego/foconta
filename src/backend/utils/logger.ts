import { promises as fs } from "fs";
import path from "path";

type JsonValue = string | number | boolean | null | JsonObject | JsonValue[];
type JsonObject = { [key: string]: JsonValue };

const LOG_DIR = path.join(process.cwd(), "logs");
const PAYMENT_LOG_FILE = path.join(LOG_DIR, "payment-flow.json");

let writeQueue: Promise<void> = Promise.resolve();

function toSerializable(value: unknown): JsonValue {
	if (value === null || value === undefined) return null;
	if (typeof value === "string" || typeof value === "number" || typeof value === "boolean") {
		return value;
	}
	if (Array.isArray(value)) {
		return value.map(toSerializable);
	}
	if (typeof value === "object") {
		const result: JsonObject = {};
		for (const [key, nested] of Object.entries(value as Record<string, unknown>)) {
			result[key] = toSerializable(nested);
		}
		return result;
	}
	return String(value);
}

async function readExistingLogEntries(): Promise<JsonObject[]> {
	try {
		const content = await fs.readFile(PAYMENT_LOG_FILE, "utf8");
		if (!content.trim()) return [];
		const parsed = JSON.parse(content);
		return Array.isArray(parsed) ? (parsed as JsonObject[]) : [];
	} catch (error: any) {
		if (error?.code === "ENOENT") return [];
		console.error("[PaymentLog] Read failed:", error);
		return [];
	}
}

export async function appendPaymentLog(event: string, payload: Record<string, unknown> = {}): Promise<void> {
	if (process.env.PAYMENT_LOG_ENABLED === "false") return;

	writeQueue = writeQueue
		.then(async () => {
			await fs.mkdir(LOG_DIR, { recursive: true });
			const entries = await readExistingLogEntries();
			entries.push({
				timestamp: new Date().toISOString(),
				event,
				...toSerializable(payload) as JsonObject,
			});
			await fs.writeFile(PAYMENT_LOG_FILE, `${JSON.stringify(entries, null, 2)}\n`, "utf8");
		})
		.catch((error) => {
			console.error("[PaymentLog] Write failed:", error);
		});

	return writeQueue;
}

export const PAYMENT_LOG_PATH = PAYMENT_LOG_FILE;

