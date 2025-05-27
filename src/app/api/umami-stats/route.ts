import { getClient } from "@umami/api-client";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  
  const client = getClient();
  const nowInMs = Date.now();
  const oneMonthAgoDate = new Date(nowInMs);
  oneMonthAgoDate.setMonth(oneMonthAgoDate.getMonth() - 1);
  const oneMonthAgoTimestamp = oneMonthAgoDate.getTime();

  
  

  try {
    const { ok, status, data } = await client.getWebsiteStats("45b80c2d-d963-4cd8-a4cc-5f51ccaffb95", {
      startAt: oneMonthAgoTimestamp,
      endAt: nowInMs,
      
    });

    if (!ok) {
      return Response.json({ error: "Failed to fetch Umami data" }, { status });
    }
    console.log("THIS: " + data);
    return Response.json(data);
  } catch (err) {
    console.error("Umami API error:", err);
    return Response.json({ error: "Server error fetching data" }, { status: 500 });
  }
}
