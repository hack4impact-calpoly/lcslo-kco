import { getClient } from "@umami/api-client";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const event = searchParams.get("event");
  const startDate = searchParams.get("startDate");
  const endDate = searchParams.get("endDate");
  const client = getClient();
  const nowInMs = Date.now();
  const oneMonthAgoDate = new Date(nowInMs);
  oneMonthAgoDate.setMonth(oneMonthAgoDate.getMonth() - 1);
  const oneMonthAgoTimestamp = oneMonthAgoDate.getTime();

  if (!event || !startDate || !endDate) {
    return Response.json({ error: "Event name is required" }, { status: 400 });
  }
  const startTime = new Date(startDate).getTime();
  const endTime = new Date(endDate).getTime();

  try {
    const { ok, status, data } = await client.getEventDataEvents("45b80c2d-d963-4cd8-a4cc-5f51ccaffb95", {
      startAt: startTime,
      endAt: endTime,
      event: event,
    });

    if (!ok) {
      return Response.json({ error: "Failed to fetch Umami data" }, { status });
    }

    return Response.json(data);
  } catch (err) {
    console.error("Umami API error:", err);
    return Response.json({ error: "Server error fetching data" }, { status: 500 });
  }
}
