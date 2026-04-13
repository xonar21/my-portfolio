const prerender = false;
const POST = async ({ request }) => {
  let body;
  try {
    body = await request.json();
  } catch {
    return new Response(JSON.stringify({ error: "Invalid JSON body" }), {
      status: 400,
      headers: { "Content-Type": "application/json" }
    });
  }
  const messages = body.messages;
  if (!Array.isArray(messages) || messages.length === 0) {
    return new Response(JSON.stringify({ error: "Expected messages[]" }), {
      status: 400,
      headers: { "Content-Type": "application/json" }
    });
  }
  const last = messages[messages.length - 1];
  const preview = typeof last?.content === "string" ? last.content.slice(0, 200) : "";
  const mock = process.env.CHAT_MOCK_REPLY ?? "Mock: set GROQ_API_KEY / GOOGLE_GENERATIVE_AI_API_KEY and wire Vercel AI SDK in src/pages/api/chat.ts.";
  const content = preview ? `${mock}

(You wrote: “${preview}${last?.content && last.content.length > 200 ? "…" : ""}”)` : mock;
  return new Response(JSON.stringify({ role: "assistant", content }), {
    status: 200,
    headers: { "Content-Type": "application/json" }
  });
};

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
	__proto__: null,
	POST,
	prerender
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
