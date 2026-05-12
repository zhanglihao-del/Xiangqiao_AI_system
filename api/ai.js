export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end();
  const { prompt } = req.body;
  if (!prompt) return res.json({ content: "请输入内容" });

  // 这里是你的人性化评分逻辑，我用示例实现，你可以替换成真实大模型调用
  let score = 0;
  let judge = "";
  let correction = "";
  let correctVersion = "湘桥村位于福建省漳州市龙文区蓝田街道，地处九龙江北溪与西溪交汇处，是一座拥有600多年历史的传统古村落。该村以“大夫第”、“翰林第”等明清官宦府第建筑群闻名，村内保存有10余座红砖燕尾脊的闽南古厝，其中“华佗庙”（又称“仙祖庙”）始建于明代，供奉神医华佗，是闽南地区罕见的华佗信仰场所。湘桥村历史上文风鼎盛，清代曾出过进士、举人多名，如康熙年间进士黄可润，其故居“大夫第”至今保留完整。村落布局依水而建，古榕、古井、古码头与红砖古厝相映成趣，2019年入选第七批中国历史文化名村。村中每年农历正月十五的“华佗巡安”民俗活动，以及端午节的“扒龙船”传统，均被列入漳州市非物质文化遗产名录。";

  if (prompt.includes("湘桥村")) score += 25;
  if (prompt.includes("龙舟") || prompt.includes("扒龙船")) score += 25;
  if (prompt.includes("端午")) score += 15;
  if (prompt.includes("漳州") || prompt.includes("龙文区")) score += 15;
  if (prompt.includes("历史") || prompt.includes("文化")) score += 10;
  if (prompt.length > 50) score += 10;

  if (score >= 90) judge = "内容非常准确，信息完整，无错误";
  else if (score >= 70) judge = "内容基本正确，信息较完整，有少量细节可完善";
  else if (score >= 40) judge = "部分内容沾边，有一定正确性，但信息不够完整";
  else judge = "信息不准确，请重新学习湘桥村文化";

  correction = "请补充湘桥村的具体位置、历史背景、龙舟习俗等关键信息。";

  const result = `【真实度】${score}%\n【判断】${judge}\n【错误纠正】\n${correction}\n【正确完整版】\n${correctVersion}`;

  res.json({ content: result });
}
