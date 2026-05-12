export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end();
  const { text } = req.body;
  if (!text) return res.json({ answer: "请输入内容" });

  let score = 0;
  let note = "";

  if (text.includes("湘桥村")) score += 25;
  if (text.includes("龙舟")) score += 25;
  if (text.includes("端午")) score += 15;
  if (text.includes("历史")) score += 10;
  if (text.includes("漳州")) score += 10;
  if (text.length > 50) score += 15;

  if (score >= 90) note = "内容非常准确，信息完整";
  else if (score >= 70) note = "内容基本正确，信息较完整";
  else if (score >= 40) note = "部分内容沾边，可继续完善";
  else note = "信息不准确，请重新学习湘桥村文化";

  res.json({
    answer: `【真实度】${score}%\n【评价】${note}\n\n提示：包含湘桥村、龙舟、端午、漳州等关键词会提高分数`
  });
}