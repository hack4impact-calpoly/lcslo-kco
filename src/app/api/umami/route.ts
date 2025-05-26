import { getClient } from "@umami/api-client";

export async function GET() {
  const client = getClient();
  const nowInMs = Date.now();
  const oneMonthAgoDate = new Date(nowInMs);
  oneMonthAgoDate.setMonth(oneMonthAgoDate.getMonth() - 1);
  const oneMonthAgoTimestamp = oneMonthAgoDate.getTime();
  //Change start time, by entering the date in unix time (for startAt)
  const { ok, status, data } = await client.getEventDataEvents("45b80c2d-d963-4cd8-a4cc-5f51ccaffb95", {
    startAt: oneMonthAgoTimestamp,
    endAt: nowInMs,
    event: "Bill Deneen Kathleen-POI-Visited",
  });
  return Response.json(data);
}
