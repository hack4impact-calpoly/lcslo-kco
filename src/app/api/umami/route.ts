import { getClient } from "@umami/api-client";

export async function GET() {
  const client = getClient();
  const nowInMs = Date.now();
  //Change start time, by entering the date in unix time (for startAt)
  const { ok, status, data } = await client.getWebsiteStats("45b80c2d-d963-4cd8-a4cc-5f51ccaffb95", {
    startAt: 0,
    endAt: nowInMs,
  });
  return Response.json(data);
}
