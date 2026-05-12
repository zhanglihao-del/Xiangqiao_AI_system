export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ answer: "仅支持POST请求" });
  }

  const { prompt } = req.body;
  if (!prompt) {
    return res.json({ answer: "请输入内容" });
  }

  try {
    const response = await fetch("https://api.deepseek.com/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer sk-0ebfd0f498624fdd91dea63553b47c87"
      },
      body: JSON.stringify({
        model: "deepseek-chat",
        messages: [
          { role: "user", content: prompt }
        ],
        temperature: 0.3,
        stream: false
      })
    });

    const data = await response.json();
    const answer = data.choices?.[0]?.message?.content || "AI 暂时无法回答，请稍后再试";

    res.json({ answer });

  } catch (error) {
    console.error("DeepSeek 错误：", error);
    res.json({ answer: "❌ DeepSeek 连接失败，请检查 Key 或额度" });
  }
}
