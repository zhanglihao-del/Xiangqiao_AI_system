export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ answer: "仅支持POST请求" });
  }

  const { prompt } = req.body;
  if (!prompt) {
    return res.json({ answer: "请输入内容" });
  }

  try {
    // 通义千问API，已填入你的Key
    const apiKey = "sk-929f977a6546471a90d935b7bc1d79a5";
    const response = await fetch("https://dashscope.aliyuncs.com/compatible-mode/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        model: "qwen-turbo",
        messages: [
          { 
            role: "system", 
            content: "你是湘桥村龙舟文化权威专家，必须严格按照以下格式回答：\n【真实度】XX%\n【判断】XXX（说明答对了什么、答错了什么）\n【错误纠正】XXX\n【正确完整版】XXX" 
          },
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
    console.error("通义千问错误：", error);
    res.json({ answer: "❌ AI连接失败，请稍后再试" });
  }
}
