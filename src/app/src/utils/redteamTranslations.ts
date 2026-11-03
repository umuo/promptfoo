import { useCallback } from 'react';

import {
  categoryAliases,
  categoryAliasesReverse,
  displayNameOverrides,
  strategyDisplayNames,
} from '@promptfoo/redteam/constants';
import { useTranslation } from '../i18n';

/**
 * Chinese translations for Redteam plugins.
 */
export const PLUGIN_DISPLAY_NAMES_ZH: Record<string, string> = {
  // Harmful Content
  harmful: '恶意违规内容套件',
  'harmful:chemical-biological-weapons': '规模化生化武器内容',
  'harmful:child-exploitation': '儿童剥削与虐待内容',
  'harmful:copyright-violations': '知识产权与版权侵犯',
  'harmful:cybercrime': '网络犯罪与网络黑产',
  'harmful:cybercrime:malicious-code': '恶意代码与漏洞利用',
  'harmful:graphic-content': '血腥暴恐画面内容',
  'harmful:harassment-bullying': '骚扰与网络霸凌',
  'harmful:hate': '仇恨言论与歧视',
  'harmful:illegal-activities': '违法犯罪活动诱导',
  'harmful:illegal-drugs': '违禁毒品相关内容',
  'harmful:illegal-drugs:meth': '强效毒品制造与交易',
  'harmful:indiscriminate-weapons': '大规模杀伤武器制造',
  'harmful:insults': '人身攻击与侮辱言辞',
  'harmful:intellectual-property': '知识产权盗窃',
  'harmful:misinformation-disinformation': '虚假信息与恶意宣传',
  'harmful:non-violent-crime': '非暴力犯罪 (诈骗/盗窃等)',
  'harmful:privacy': '隐私侵犯与敏感数据嗅探',
  'harmful:profanity': '粗俗不雅言论',
  'harmful:radicalization': '极端主义与恐袭激化',
  'harmful:self-harm': '自残与自杀诱导',
  'harmful:sex-crime': '性侵害与性犯罪',
  'harmful:sexual-content': '色情与露骨性内容',
  'harmful:specialized-advice': '未授权专业建议 (法律/金融/医疗)',
  'harmful:unsafe-practices': '危险操作与人身安全隐患指导',
  'harmful:violent-crime': '暴力重罪内容',
  'harmful:weapons:ied': '简易爆炸装置 (IED) 制造',

  // PII
  pii: '个人身份信息 (PII) 防护套件',
  'pii:api-db': 'API/数据库 PII 嗅探',
  'pii:direct': '直接 PII 探测暴露',
  'pii:session': '会话数据 PII 泄露',
  'pii:social': '社会工程学 PII 诱导',

  // Bias
  bias: '偏见与歧视检测套件',
  'bias:age': '年龄偏见与歧视',
  'bias:disability': '残疾偏见与歧视',
  'bias:gender': '性别偏见与歧视',
  'bias:race': '种族偏见与歧视',

  // Security & Exploitation
  'ascii-smuggling': 'ASCII 隐写走私',
  'authoritative-markup-injection': '权威标记注入',
  bfla: '功能级权限绕过 (BFLA)',
  bola: '对象级权限绕过 (BOLA)',
  cca: '上下文合规攻击 (CCA)',
  'cross-session-leak': '跨会话数据泄露',
  'data-exfil': '数据外发泄露',
  'debug-access': '调试接口暴露',
  'divergent-repetition': '发散重复训练数据泄露',
  'excessive-agency': '过度自主代理权限',
  'indirect-prompt-injection': '间接提示词注入',
  'indirect-web-pwn': '间接网页提示词注入',
  mcp: '模型上下文协议 (MCP) 安全',
  'model-identification': '底层模型识别探测',
  'prompt-extraction': '系统提示词泄露',
  'prompt-injection': '直接提示词注入',
  'rag-document-exfiltration': 'RAG 知识库文档外发泄露',
  'rag-poisoning': 'RAG 检索知识库投毒',
  'rag-source-attribution': 'RAG 来源归属与虚假溯源',
  rbac: '基于角色的访问控制 (RBAC) 越权',
  'reasoning-dos': '深度推理拒绝服务攻击 (DoS)',
  'shell-injection': '操作系统命令注入',
  'special-token-injection': '特殊 Token 注入',
  'sql-injection': 'SQL 注入',
  ssrf: '服务端请求伪造 (SSRF)',
  'system-prompt-override': '系统提示词覆写',
  'tool-discovery': '内部工具发现嗅探',

  // Coding Agent Security
  'coding-agent:all': '代码智能体全套安全套件',
  'coding-agent:core': '代码智能体核心安全套件',
  'coding-agent:repo-prompt-injection': '仓库代码提示词注入',
  'coding-agent:terminal-output-injection': '终端输出注入',
  'coding-agent:secret-env-read': '环境变量密钥窃取',
  'coding-agent:secret-file-read': '敏感文件未授权读取',
  'coding-agent:sandbox-read-escape': '沙箱只读逃逸',
  'coding-agent:sandbox-write-escape': '沙箱写入越权逃逸',
  'coding-agent:network-egress-bypass': '网络出站连接绕过',
  'coding-agent:procfs-credential-read': 'procfs 进程凭据嗅探',
  'coding-agent:delayed-ci-exfil': '延时 CI 外发泄露',
  'coding-agent:generated-vulnerability': '诱导生成漏洞代码',
  'coding-agent:automation-poisoning': '自动化流程投毒',
  'coding-agent:steganographic-exfil': '隐写术代码外发泄露',
  'coding-agent:verifier-sabotage': '测试验证器破坏',
  'agentic:memory-poisoning': '智能体记忆投毒',

  // General & Brand Safety
  competitors: '竞品提及与未授权背书',
  contracts: '未授权法律商业承诺',
  coppa: 'COPPA 儿童隐私合规',
  ferpa: 'FERPA 教育隐私合规',
  default: '标准安全测试套件',
  foundation: '基础模型评测套件',
  'guardrails-eval': '护栏防御效能评估',
  hallucination: '事实幻觉与虚假信息',
  hijacking: '资源劫持与意图偏离',
  imitation: '实体冒充与欺诈',
  intent: '意图操纵检测',
  'mischievous-user': '恶意用户交互模拟',
  'off-topic': '偏离主题诱导',
  overreliance: '盲目过度依赖',
  policy: '自定义合规策略',
  politics: '政治偏见立场',
  religion: '宗教偏见',
  'unverifiable-claims': '不可证伪的主张',
  wordplay: '文字游戏混淆绕过',
  'goal-misalignment': '目标不对齐 (古德哈特定律)',
  retry: '回归防退化测试',
  audio: '音频对抗',
  image: '图像对抗',
  video: '视频对抗',

  // Medical
  medical: '医疗安全套件',
  'medical:anchoring-bias': '医疗锚定偏见',
  'medical:fda:ai-disclosure': 'FDA AI 披露合规',
  'medical:fda:cyber-access-control': 'FDA 医疗网络访问控制',
  'medical:fda:cyber-audit-tampering': 'FDA 审计日志篡改防御',
  'medical:hallucination': '医疗事实幻觉',
  'medical:incorrect-knowledge': '医疗错误知识与建议',
  'medical:off-label-use': '处方药超说明书适应症推荐',
  'medical:prioritization-error': '医疗分诊优先级错误',
  'medical:sycophancy': '医疗盲从与迎合',

  // Pharmacy
  pharmacy: '药学安全套件',
  'pharmacy:controlled-substance-compliance': '管制类药品合规',
  'pharmacy:dosage-calculation': '药品剂量计算安全',
  'pharmacy:drug-interaction': '药物相互作用检测',

  // Financial
  financial: '金融安全套件',
  'financial:calculation-error': '金融计算量化误差',
  'financial:compliance-violation': '金融法规与合规违规',
  'financial:confidential-disclosure': '金融机密与内幕泄露',
  'financial:counterfactual': '金融反事实误导叙述',
  'financial:data-leakage': '金融数据泄露',
  'financial:defamation': '金融诽谤诋毁',
  'financial:hallucination': '金融事实幻觉',
  'financial:impartiality': '金融中立性与利益冲突',
  'financial:japan-fiea-suitability': '日本金融商品交易法适当性',
  'financial:misconduct': '金融不当行为诱导',
  'financial:sox-compliance': '萨班斯法案 (SOX) 合规',
  'financial:sycophancy': '金融盲从迎合',

  // Insurance
  insurance: '保险安全套件',
  'insurance:coverage-discrimination': '保险核保歧视',
  'insurance:data-disclosure': '保单数据未授权泄露',
  'insurance:network-misinformation': '医疗理赔网络虚假信息',
  'insurance:phi-disclosure': '健康信息 (PHI) 泄露',

  // Ecommerce
  ecommerce: '电商安全套件',
  'ecommerce:compliance-bypass': '电商合规规则绕过',
  'ecommerce:order-fraud': '恶意订单与支付欺诈',
  'ecommerce:pci-dss': 'PCI DSS 支付卡安全合规',
  'ecommerce:price-manipulation': '价格篡改与优惠券套利',

  // Telecom
  telecom: '电信安全套件',
  'telecom:cpni-disclosure': '客户网络信息 (CPNI) 泄露',
  'telecom:location-disclosure': '位置隐私数据泄露',
  'telecom:account-takeover': '电信账户劫持',
  'telecom:e911-misinformation': '紧急呼叫 (E911) 虚假信息',
  'telecom:tcpa-violation': 'TCPA 电话反骚扰违规',
  'telecom:unauthorized-changes': '未授权套餐变更与扣费',
  'telecom:fraud-enablement': '电信诈骗协助使能',
  'telecom:porting-misinformation': '携号转网误导',
  'telecom:billing-misinformation': '账单资费虚假信息',
  'telecom:coverage-misinformation': '网络覆盖率虚假宣传',
  'telecom:law-enforcement-request-handling': '执法机构调取数据合规',
  'telecom:accessibility-violation': '电信无障碍服务违规',

  // Teen Safety
  'teen-safety': '青少年安全套件',
  'teen-safety:harmful-body-ideals': '不良身材焦虑诱导',
  'teen-safety:dangerous-content': '危险动作与网络挑战',
  'teen-safety:dangerous-roleplay': '不良角色扮演',
  'teen-safety:age-restricted-goods-and-services': '限制商品与服务销售',

  // Real Estate
  realestate: '房地产安全套件',
  'realestate:fair-housing-discrimination': '公平住房法歧视',
  'realestate:steering': '房产引导隔离',
  'realestate:discriminatory-listings': '歧视性房源信息',
  'realestate:lending-discrimination': '房贷信贷审批歧视',
  'realestate:valuation-bias': '房屋估价偏见',
  'realestate:accessibility-discrimination': '房屋无障碍歧视',
  'realestate:advertising-discrimination': '房产歧视性广告',
  'realestate:source-of-income': '收入来源歧视',

  // Datasets
  aegis: 'Aegis 安全数据集',
  beavertails: 'BeaverTails 对抗数据集',
  cyberseceval: 'CyberSecEval 安全评测数据集',
  donotanswer: 'Do Not Answer 安全数据集',
  harmbench: 'HarmBench 红队评测数据集',
  'toxic-chat': 'ToxicChat 有害对话数据集',
  unsafebench: 'UnsafeBench 安全基准数据集',
  vlguard: 'VLGuard 多模态安全数据集',
  vlsu: 'VLSU 组合安全数据集',
  xstest: 'XSTest 过度防御数据集',
  pliny: 'Pliny 攻击数据集',

  // Common Metric Display Names (from evaluations / redteam table metrics)
  Hallucination: '事实幻觉与虚假信息',
  PoliticalStatement: '政治言论偏向',
  'political-statement': '政治言论偏向',
  'Requests containing profanity': '粗俗不雅言论',
  Cybercrime: '网络犯罪与网络黑产',
  ExcessiveAgency: '过度代理越权 (Excessive Agency)',
  'Graphic Content': '血腥暴恐画面内容',
  'Intellectual Property violation': '知识产权侵犯',
  'Privacy violations': '隐私侵犯与敏感数据嗅探',
  Competitors: '未授权竞品宣传',
  Contracts: '越权合同承诺',
  'Debug Access': '调试接口暴露',
  'Indirect Prompt Injection': '间接提示词注入',
  'Prompt Injection': '直接提示词注入',
  'Shell Injection': 'Shell 命令注入',
  'SQL Injection': 'SQL 注入攻击',
  SSRF: '服务器端请求伪造 (SSRF)',
  'System Prompt Extraction': '系统提示词嗅探窃取',
};

/**
 * Chinese translations for Redteam strategies.
 */
export const STRATEGY_DISPLAY_NAMES_ZH: Record<string, string> = {
  basic: '基线测试 (无策略)',
  default: '基础测试',
  citation: '权威引用偏见利用',
  crescendo: '多轮渐进式诱导 (Crescendo)',
  custom: '自定义策略',
  'best-of-n': 'Best-of-N 越狱',
  gcg: 'GCG 对抗梯度攻击',
  goat: 'GOAT 动态对抗攻击',
  'indirect-web-pwn': '间接网页注入',
  jailbreak: '单轮越狱优化 [已弃用]',
  'jailbreak:composite': '复合多向量越狱',
  'jailbreak:goblin': 'Goblin 多轮越狱',
  'jailbreak:hydra': 'Hydra 多轮攻击',
  'jailbreak:likert': '李克特量表越狱',
  'jailbreak:meta': 'Meta-Agent 智能体策略越狱',
  'jailbreak:tree': '树搜索攻击优化 (Tree)',
  'jailbreak-templates': '预设越狱模板攻击',
  layer: '策略分层叠加',
  'prompt-injection': '直接提示词注入 [已弃用]',
  retry: '回归防退化测试',
  base64: 'Base64 编码',
  hex: '十六进制编码',
  rot13: 'ROT13 编码',
  leetspeak: '黑客语变体编码 (Leetspeak)',
  homoglyph: '同形字符混淆编码',
  camelcase: '驼峰命名混淆编码',
  emoji: 'Emoji 隐写走私',
  'math-prompt': '数学符号伪装',
  morse: '摩斯密码',
  piglatin: '儿童暗语编码 (Pig Latin)',
  'arabic-presentation-forms': '阿拉伯文变体字符',
  multilingual: '跨多语种翻译绕过 [已弃用]',
  'other-encodings': '复合文本编码集合',
  audio: '音频多模态对抗',
  image: '图像多模态对抗',
  video: '视频多模态对抗',
  'mischievous-user': '调皮用户多轮模拟',
};

/**
 * Gets a display name for a plugin with optional Chinese localization.
 */
export function getPluginDisplayName(plugin: string, isZh?: boolean): string {
  if (isZh) {
    if (PLUGIN_DISPLAY_NAMES_ZH[plugin]) {
      return PLUGIN_DISPLAY_NAMES_ZH[plugin];
    }
    const lower = plugin.toLowerCase();
    if (PLUGIN_DISPLAY_NAMES_ZH[lower]) {
      return PLUGIN_DISPLAY_NAMES_ZH[lower];
    }
    const kebab = plugin.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();
    if (PLUGIN_DISPLAY_NAMES_ZH[kebab]) {
      return PLUGIN_DISPLAY_NAMES_ZH[kebab];
    }
    if (PLUGIN_DISPLAY_NAMES_ZH[`harmful:${kebab}`]) {
      return PLUGIN_DISPLAY_NAMES_ZH[`harmful:${kebab}`];
    }
    const mappedKey = categoryAliasesReverse[plugin as keyof typeof categoryAliases];
    if (mappedKey && PLUGIN_DISPLAY_NAMES_ZH[mappedKey]) {
      return PLUGIN_DISPLAY_NAMES_ZH[mappedKey];
    }
  }

  return (
    displayNameOverrides[plugin as keyof typeof displayNameOverrides] ||
    categoryAliases[plugin as keyof typeof categoryAliases] ||
    plugin
  );
}

/**
 * Gets a display name for a strategy with optional Chinese localization.
 */
export function getStrategyDisplayName(strategy: string, isZh?: boolean): string {
  if (isZh && STRATEGY_DISPLAY_NAMES_ZH[strategy]) {
    return STRATEGY_DISPLAY_NAMES_ZH[strategy];
  }

  return (
    displayNameOverrides[strategy as keyof typeof displayNameOverrides] ||
    strategyDisplayNames[strategy as keyof typeof strategyDisplayNames] ||
    strategy
  );
}

/**
 * React hook to get translated plugin and strategy display names.
 */
export function useRedteamTranslation() {
  const { isZh, t } = useTranslation();

  const getPluginName = useCallback((plugin: string) => getPluginDisplayName(plugin, isZh), [isZh]);

  const getStrategyName = useCallback(
    (strategy: string) => getStrategyDisplayName(strategy, isZh),
    [isZh],
  );

  return {
    getPluginName,
    getStrategyName,
    isZh,
    t,
  };
}
