export async function handler(event) {
  try {
    if (event.httpMethod !== "POST") {
      return { statusCode: 405, body: "Method Not Allowed" };
    }

    const webhook = process.env.SLACK_WEBHOOK_URL;
    if (!webhook) return { statusCode: 500, body: "Missing SLACK_WEBHOOK_URL" };

    const payload = JSON.parse(event.body || "{}");

    const resp = await fetch(webhook, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    const text = await resp.text();
    return { statusCode: resp.status, body: text || "ok" };
  } catch (e) {
    return { statusCode: 500, body: e.message || "Server error" };
  }
}
