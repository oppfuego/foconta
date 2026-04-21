import { NextRequest, NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";

/**
 * DEBUG ENDPOINT: Retrieve payment flow logs
 *
 * GET /api/payments/logs?limit=100&event=payment.create.completed
 *
 * Query params:
 *   - limit: max entries to return (default: 100)
 *   - event: filter by specific event type (optional)
 *   - sortBy: 'asc' or 'desc' (default: 'desc')
 */

export async function GET(req: NextRequest) {
    try {
        const { searchParams } = new URL(req.url);
        const limit = Math.min(parseInt(searchParams.get("limit") || "100"), 1000);
        const eventFilter = searchParams.get("event") || "";
        const sortBy = searchParams.get("sortBy") === "asc" ? "asc" : "desc";

        const logPath = path.join(process.cwd(), "logs", "payment-flow.json");

        // Check if file exists
        try {
            await fs.stat(logPath);
        } catch {
            return NextResponse.json({
                message: "No payment logs found",
                data: [],
                total: 0,
            });
        }

        // Read logs
        const content = await fs.readFile(logPath, "utf8");
        let logs: unknown[] = [];

        if (content.trim()) {
            try {
                const parsed = JSON.parse(content);
                logs = Array.isArray(parsed) ? parsed : [];
            } catch {
                return NextResponse.json(
                    { message: "Invalid JSON in log file" },
                    { status: 500 }
                );
            }
        }

        // Apply filters
        let filtered = logs;
        if (eventFilter) {
            filtered = logs.filter(
                (entry: any) =>
                    typeof entry?.event === "string" &&
                    entry.event.includes(eventFilter)
            );
        }

        // Sort
        if (sortBy === "asc") {
            filtered = filtered.reverse();
        }

        // Apply limit
        const result = filtered.slice(0, limit);

        // Calculate statistics
        const stats = {
            total: logs.length,
            filtered: filtered.length,
            returned: result.length,
            eventTypes: [
                ...new Set(
                    logs.map((entry: any) => entry?.event).filter(Boolean)
                ),
            ],
        };

        return NextResponse.json(
            {
                message: "Payment flow logs retrieved",
                stats,
                data: result,
                limit,
                event_filter: eventFilter || null,
                sort: sortBy,
            },
            {
                headers: {
                    "X-Total-Count": String(logs.length),
                    "X-Filtered-Count": String(filtered.length),
                    "X-Returned-Count": String(result.length),
                },
            }
        );
    } catch (err: any) {
        console.error("[Payment Logs] Error:", err);
        return NextResponse.json(
            { message: err?.message || "Failed to retrieve logs" },
            { status: 500 }
        );
    }
}

export async function DELETE(req: NextRequest) {
    try {
        const logPath = path.join(process.cwd(), "logs", "payment-flow.json");

        // Delete the file
        try {
            await fs.unlink(logPath);
        } catch (err: any) {
            if (err?.code !== "ENOENT") {
                throw err;
            }
        }

        return NextResponse.json({
            message: "Payment logs cleared",
        });
    } catch (err: any) {
        console.error("[Payment Logs] Delete error:", err);
        return NextResponse.json(
            { message: err?.message || "Failed to clear logs" },
            { status: 500 }
        );
    }
}

