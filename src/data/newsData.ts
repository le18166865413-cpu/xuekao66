import { NewsArticle, ScoreLine, ExamSchedule } from './types';

// 高考资讯文章数据
export const newsArticles: NewsArticle[] = [
  {
    id: 'news-001',
    title: '2024年全国高考时间安排公布',
    category: 'exam-schedule',
    categoryName: '考试时间',
    summary: '教育部正式发布2024年高考时间安排，全国统一考试于6月7日至8日举行，部分地区因新高考改革延长至9日。',
    content: `
      <h3>考试时间安排</h3>
      <p>根据教育部最新通知，2024年全国普通高等学校招生统一考试（以下简称高考）将于6月7日至8日举行。</p>
      <ul>
        <li><strong>6月7日：</strong>语文 (9:00-11:30)、数学 (15:00-17:00)</li>
        <li><strong>6月8日：</strong>综合科目 (9:00-11:30)、外语 (15:00-17:00)</li>
        <li><strong>6月9日：</strong>部分新高考省份选考科目考试</li>
      </ul>
      
      <h3>注意事项</h3>
      <p>考生须提前了解考场位置，合理规划出行路线。建议提前1小时到达考点，预留安检和身份验证时间。</p>
      
      <h3>考试纪律</h3>
      <p>严格遵守考试纪律，严禁携带手机、智能手表等电子设备进入考场。考生需诚信考试，如有违规将按相关规定严肃处理。</p>
    `,
    date: '2024-05-10',
    author: '教育部考试中心',
    tags: ['高考时间', '考试安排', '2024高考'],
    readTime: '5分钟',
    viewCount: 125800,
    isHot: true,
    isFeatured: true,
    gradient: 'from-blue-500 to-cyan-500'
  },
  {
    id: 'news-002',
    title: '2024年高考政策重大调整解读',
    category: 'policy',
    categoryName: '政策解读',
    summary: '2024年高考迎来多项政策调整，包括录取批次合并、志愿设置优化、加分政策规范等，考生和家长务必关注。',
    content: `
      <h3>一、录取批次合并</h3>
      <p>多个省份将本科一批和本科二批合并为本科批，进一步减少录取批次，增加考生选择空间。</p>
      
      <h3>二、志愿设置优化</h3>
      <p>平行志愿数量普遍增加，部分省份从原来的6-8个增加到20-40个，降低滑档风险。</p>
      
      <h3>三、加分政策规范</h3>
      <p>严格控制高考加分项目，只保留全国性加分项目，地方性加分项目将逐步取消。</p>
      
      <h3>四、选考科目要求调整</h3>
      <p>部分高校专业对选考科目要求进行了优化，更加强调物理化学的重要性。</p>
    `,
    date: '2024-05-08',
    author: '教育政策研究室',
    tags: ['政策变化', '志愿填报', '录取政策'],
    readTime: '8分钟',
    viewCount: 98600,
    isHot: true,
    isFeatured: true,
    gradient: 'from-violet-500 to-purple-500'
  },
  {
    id: 'news-003',
    title: '近5年各省高考分数线汇总',
    category: 'score-line',
    categoryName: '分数线',
    summary: '整理了2019-2023年全国31个省市区的高考分数线，帮助考生了解各批次分数变化趋势。',
    content: `
      <h3>分数线分析</h3>
      <p>从近5年数据来看，各省份分数线整体呈现稳中有升的趋势，新高考省份分数线变化相对较大。</p>
      
      <h3>主要省份分数线</h3>
      <ul>
        <li><strong>北京市：</strong>本科线稳定在420-440分</li>
        <li><strong>上海市：</strong>本科线约400-410分</li>
        <li><strong>广东省：</strong>本科线稳定在430-450分</li>
        <li><strong>山东省：</strong>特殊类型控制线在510-530分</li>
        <li><strong>浙江省：</strong>第一段分数线在590-610分</li>
      </ul>
      
      <h3>填报建议</h3>
      <p>建议考生参考近3年的分数线，结合自己的位次和兴趣进行志愿填报。</p>
    `,
    date: '2024-05-05',
    author: '数据研究中心',
    tags: ['历年分数线', '数据汇总', '趋势分析'],
    readTime: '12分钟',
    viewCount: 87500,
    isHot: true,
    isFeatured: false,
    gradient: 'from-emerald-500 to-teal-500'
  },
  {
    id: 'news-004',
    title: '志愿填报技巧与避坑指南',
    category: 'volunteer-guide',
    categoryName: '志愿填报',
    summary: '资深高考志愿填报专家为你解读志愿填报的黄金法则，避免常见的填报误区，提高录取成功率。',
    content: `
      <h3>一、志愿填报黄金法则</h3>
      <ol>
        <li><strong>冲稳保梯度：</strong>合理设置志愿梯度，前2-3个志愿可以冲一冲，中间5-6个稳一稳，最后3-4个保一保</li>
        <li><strong>位次优先：</strong>位次比分数更重要，务必关注自己在全省的排名</li>
        <li><strong>专业优先：</strong>根据个人兴趣和职业规划选择专业，避免盲目追求热门</li>
      </ol>
      
      <h3>二、常见避坑指南</h3>
      <ul>
        <li>⚠️ 不要只看学校名称，忽略专业实力</li>
        <li>⚠️ 不要完全依赖往年分数，忽视位次变化</li>
        <li>⚠️ 不要忽视专业限制条件，如单科成绩、身体要求等</li>
        <li>⚠️ 一定要服从调剂，增加录取机会</li>
      </ul>
      
      <h3>三、填报工具推荐</h3>
      <p>使用我们的志愿填报系统，一键生成个性化志愿方案。</p>
    `,
    date: '2024-05-12',
    author: '张志愿指导师',
    tags: ['志愿填报', '填报技巧', '避坑指南'],
    readTime: '15分钟',
    viewCount: 156000,
    isHot: true,
    isFeatured: true,
    gradient: 'from-amber-500 to-orange-500'
  },
  {
    id: 'news-005',
    title: '最后30天高考冲刺策略',
    category: 'study-tips',
    categoryName: '学习方法',
    summary: '高考倒计时30天，如何高效利用时间、调整心态、查漏补缺？特级教师给出科学冲刺方案。',
    content: `
      <h3>一、时间管理策略</h3>
      <ul>
        <li>每天保证7-8小时睡眠，避免熬夜</li>
        <li>按照高考时间安排练习，培养生物钟</li>
        <li>合理安排各科复习时间，弱项优先</li>
      </ul>
      
      <h3>二、复习重点</h3>
      <ul>
        <li>回归基础，梳理核心知识点</li>
        <li>做真题，查漏补缺</li>
        <li>整理错题，避免重复错误</li>
      </ul>
      
      <h3>三、心态调整</h3>
      <p>保持适度紧张，积极自我暗示，相信自己的能力。家长不要给孩子过多压力。</p>
    `,
    date: '2024-05-07',
    author: '李特级教师',
    tags: ['高考冲刺', '时间管理', '复习方法'],
    readTime: '10分钟',
    viewCount: 215000,
    isHot: true,
    isFeatured: true,
    gradient: 'from-rose-500 to-red-500'
  },
  {
    id: 'news-006',
    title: '新高考选考科目组合分析',
    category: 'policy',
    categoryName: '政策解读',
    summary: '12种选考科目组合的优劣势分析，帮助高一高二学生做出最优选择。',
    content: `
      <h3>一、物化生组合</h3>
      <p>专业覆盖率96%以上，适合理科强的学生，但竞争激烈。</p>
      
      <h3>二、物化地组合</h3>
      <p>专业覆盖率95%左右，地理相对容易，是热门组合。</p>
      
      <h3>三、其他组合</h3>
      <p>建议根据个人兴趣和目标专业选择，不要盲目跟风。</p>
    `,
    date: '2024-05-02',
    author: '王升学规划师',
    tags: ['新高考', '选考科目', '组合分析'],
    readTime: '7分钟',
    viewCount: 65800,
    isHot: false,
    isFeatured: false,
    gradient: 'from-indigo-500 to-blue-500'
  },
  {
    id: 'news-007',
    title: '高考考场应急处理指南',
    category: 'exam-schedule',
    categoryName: '考试时间',
    summary: '遇到突发状况怎么办？这份考场应急指南帮你从容应对各种意外情况。',
    content: `
      <h3>常见突发状况处理</h3>
      <ul>
        <li><strong>忘带准考证：</strong>立即联系监考老师或学校送考老师</li>
        <li><strong>迟到：</strong>可凭身份证在开考15分钟内进入考场</li>
        <li><strong>身体不适：</strong>举手报告监考员，寻求医疗帮助</li>
      </ul>
    `,
    date: '2024-06-01',
    author: '考务指导中心',
    tags: ['考场应急', '注意事项', '考试指南'],
    readTime: '4分钟',
    viewCount: 78900,
    isHot: true,
    isFeatured: false,
    gradient: 'from-cyan-500 to-blue-500'
  },
  {
    id: 'news-008',
    title: '热门专业解读与就业前景分析',
    category: 'volunteer-guide',
    categoryName: '志愿填报',
    summary: '2024年十大热门专业深度解读，包括专业介绍、课程设置、就业方向及薪酬水平。',
    content: `
      <h3>一、计算机科学与技术</h3>
      <p>就业前景广阔，起薪较高，适合对编程感兴趣的学生。</p>
      
      <h3>二、人工智能</h3>
      <p>国家战略需求，人才缺口大，未来发展潜力大。</p>
      
      <h3>三、临床医学</h3>
      <p>职业稳定，社会地位高，但学习周期长，需要奉献精神。</p>
    `,
    date: '2024-05-15',
    author: '职业规划中心',
    tags: ['热门专业', '就业前景', '专业选择'],
    readTime: '18分钟',
    viewCount: 112000,
    isHot: true,
    isFeatured: false,
    gradient: 'from-pink-500 to-rose-500'
  },
  {
    id: 'news-009',
    title: '高考数学高分备考策略大全',
    category: 'study-tips',
    categoryName: '学习方法',
    summary: '资深教师分享高考数学备考经验，从基础巩固到冲刺提升的完整攻略...',
    content: `
      <h3>一、基础夯实阶段</h3>
      <p>重点复习函数、数列、几何等基础知识点，确保掌握所有必考公式和定理。</p>
      
      <h3>二、强化练习阶段</h3>
      <p>分模块专项训练，重点突破三角函数、圆锥曲线、导数等难点章节。</p>
      
      <h3>三、冲刺提升阶段</h3>
      <p>限时做真题，熟悉考试节奏，查漏补缺，确保在考场上发挥最佳水平。</p>
    `,
    date: '2025-01-14',
    author: '数学备考专家组',
    tags: ['数学备考', '高分策略', '高考数学'],
    readTime: '12分钟',
    viewCount: 189000,
    isHot: true,
    isFeatured: true,
    gradient: 'from-purple-500 to-indigo-500'
  },
  {
    id: 'news-010',
    title: '高效记忆法：让学习事半功倍',
    category: 'study-tips',
    categoryName: '学习方法',
    summary: '科学的记忆方法能够帮助学生更快掌握知识点，本文介绍几种实用的记忆技巧...',
    content: `
      <h3>一、艾宾浩斯记忆法</h3>
      <p>根据遗忘曲线规律，合理安排复习时间，最大化记忆效果。</p>
      
      <h3>二、联想记忆法</h3>
      <p>通过联想将抽象知识点与生活场景联系起来，加深记忆印象。</p>
      
      <h3>三、思维导图法</h3>
      <p>用思维导图梳理知识体系，帮助建立系统的知识结构。</p>
    `,
    date: '2025-01-13',
    author: '学习方法研究中心',
    tags: ['记忆法', '学习技巧', '高效学习'],
    readTime: '6分钟',
    viewCount: 134000,
    isHot: true,
    isFeatured: false,
    gradient: 'from-teal-500 to-emerald-500'
  },
  {
    id: 'news-011',
    title: '2025年高校自主招生政策变化',
    category: 'college-info',
    categoryName: '院校资讯',
    summary: '多所高校发布2025年自主招生简章，招生计划和选拔标准均有调整...',
    content: `
      <h3>一、招生计划调整</h3>
      <p>2025年自主招生计划略有增加，重点向基础学科和创新型人才倾斜。</p>
      
      <h3>二、选拔标准变化</h3>
      <p>更加注重学生的综合素质和创新能力，竞赛成绩权重有所调整。</p>
      
      <h3>三、申请时间安排</h3>
      <p>各校报名时间集中在3-4月份，考生需提前准备申请材料。</p>
    `,
    date: '2025-01-12',
    author: '高校招生办公室',
    tags: ['自主招生', '政策变化', '2025高考'],
    readTime: '9分钟',
    viewCount: 95600,
    isHot: false,
    isFeatured: true,
    gradient: 'from-blue-500 to-indigo-500'
  },
  {
    id: 'news-012',
    title: '英语阅读理解满分技巧',
    category: 'exam-guide',
    categoryName: '备考指南',
    summary: '高考英语阅读理解占分比重大，掌握这些技巧可以有效提升得分率...',
    content: `
      <h3>一、快速阅读技巧</h3>
      <p>先看题目，带着问题去读文章，提高阅读效率。</p>
      
      <h3>二、题型分析</h3>
      <p>掌握细节题、推理题、主旨大意题等不同题型的解题方法。</p>
      
      <h3>三、词汇积累</h3>
      <p>重点掌握高频词汇和核心词组，提高阅读速度和理解能力。</p>
    `,
    date: '2025-01-11',
    author: '英语教学专家',
    tags: ['英语阅读', '阅读技巧', '满分攻略'],
    readTime: '8分钟',
    viewCount: 167000,
    isHot: false,
    isFeatured: true,
    gradient: 'from-indigo-500 to-blue-500'
  },
  {
    id: 'news-013',
    title: '物理实验题解题思路总结',
    category: 'exam-guide',
    categoryName: '备考指南',
    summary: '物理实验题是高考难点之一，本文系统总结常见实验题的解题思路...',
    content: `
      <h3>一、实验原理掌握</h3>
      <p>深入理解每个实验的原理和设计思路，这是解题的基础。</p>
      
      <h3>二、常见题型归纳</h3>
      <p>系统总结电路实验、力学实验、光学实验等各类实验题的解题方法。</p>
      
      <h3>三、答题规范</h3>
      <p>注意实验题的答题规范，确保答案完整清晰。</p>
    `,
    date: '2025-01-10',
    author: '物理教研团队',
    tags: ['物理实验', '解题方法', '高考物理'],
    readTime: '10分钟',
    viewCount: 123000,
    isHot: false,
    isFeatured: false,
    gradient: 'from-orange-500 to-red-500'
  },
  {
    id: 'news-014',
    title: '高三学生心理调适指南',
    category: 'study-tips',
    categoryName: '学习方法',
    summary: '高考临近，考生如何保持良好心态？心理专家给出专业建议...',
    content: `
      <h3>一、压力管理</h3>
      <p>学会适度放松，保持规律作息，避免过度焦虑。</p>
      
      <h3>二、积极心理暗示</h3>
      <p>建立自信心，用积极的心态面对考试。</p>
      
      <h3>三、家长沟通</h3>
      <p>与家长保持良好沟通，获得家庭的理解和支持。</p>
    `,
    date: '2025-01-09',
    author: '心理辅导中心',
    tags: ['心理调适', '高考心态', '备考心理'],
    readTime: '7分钟',
    viewCount: 245000,
    isHot: true,
    isFeatured: true,
    gradient: 'from-pink-500 to-purple-500'
  },
  {
    id: 'news-015',
    title: '化学推断题秒杀技巧',
    category: 'exam-guide',
    categoryName: '备考指南',
    summary: '化学推断题掌握规律后可以快速解题，本文分享实用的推断技巧...',
    content: `
      <h3>一、物质特性记忆</h3>
      <p>熟记常见物质的颜色、状态、反应特性等关键信息。</p>
      
      <h3>二、推断思路</h3>
      <p>从突破口入手，逐步推理，注意验证每个推断结论。</p>
      
      <h3>三、常见规律</h3>
      <p>总结元素周期律、反应规律等核心知识点，提高推断速度。</p>
    `,
    date: '2025-01-08',
    author: '化学备考专家',
    tags: ['化学推断', '解题技巧', '高考化学'],
    readTime: '6分钟',
    viewCount: 156000,
    isHot: false,
    isFeatured: false,
    gradient: 'from-emerald-500 to-green-500'
  }
];

// 历年分数线数据
export const scoreLines: ScoreLine[] = [
  {
    id: 'sl-2023-bj-science-1',
    year: 2023,
    province: 'beijing',
    provinceName: '北京市',
    subjectType: 'comprehensive',
    subjectTypeName: '综合',
    batch: 'batch1',
    batchName: '特殊类型控制线',
    score: 527,
    lastYearScore: 518,
    change: 9
  },
  {
    id: 'sl-2023-bj-science-2',
    year: 2023,
    province: 'beijing',
    provinceName: '北京市',
    subjectType: 'comprehensive',
    subjectTypeName: '综合',
    batch: 'batch2',
    batchName: '本科批',
    score: 448,
    lastYearScore: 425,
    change: 23
  },
  {
    id: 'sl-2023-gd-science-1',
    year: 2023,
    province: 'guangdong',
    provinceName: '广东省',
    subjectType: 'science',
    subjectTypeName: '物理类',
    batch: 'batch1',
    batchName: '本科批',
    score: 539,
    lastYearScore: 538,
    change: 1
  },
  {
    id: 'sl-2023-gd-arts-1',
    year: 2023,
    province: 'guangdong',
    provinceName: '广东省',
    subjectType: 'arts',
    subjectTypeName: '历史类',
    batch: 'batch1',
    batchName: '本科批',
    score: 540,
    lastYearScore: 545,
    change: -5
  },
  {
    id: 'sl-2023-sh-science-1',
    year: 2023,
    province: 'shanghai',
    provinceName: '上海市',
    subjectType: 'comprehensive',
    subjectTypeName: '综合',
    batch: 'batch1',
    batchName: '特殊类型控制线',
    score: 504,
    lastYearScore: 503,
    change: 1
  },
  {
    id: 'sl-2023-sh-science-2',
    year: 2023,
    province: 'shanghai',
    provinceName: '上海市',
    subjectType: 'comprehensive',
    subjectTypeName: '综合',
    batch: 'batch2',
    batchName: '本科批',
    score: 405,
    lastYearScore: 400,
    change: 5
  },
  {
    id: 'sl-2023-zj-science-1',
    year: 2023,
    province: 'zhejiang',
    provinceName: '浙江省',
    subjectType: 'comprehensive',
    subjectTypeName: '综合',
    batch: 'batch1',
    batchName: '第一段',
    score: 594,
    lastYearScore: 592,
    change: 2
  },
  {
    id: 'sl-2023-zj-science-2',
    year: 2023,
    province: 'zhejiang',
    provinceName: '浙江省',
    subjectType: 'comprehensive',
    subjectTypeName: '综合',
    batch: 'batch2',
    batchName: '第二段',
    score: 274,
    lastYearScore: 280,
    change: -6
  },
  {
    id: 'sl-2023-js-science-1',
    year: 2023,
    province: 'jiangsu',
    provinceName: '江苏省',
    subjectType: 'science',
    subjectTypeName: '物理类',
    batch: 'batch1',
    batchName: '特殊类型控制线',
    score: 512,
    lastYearScore: 516,
    change: -4
  },
  {
    id: 'sl-2023-js-arts-1',
    year: 2023,
    province: 'jiangsu',
    provinceName: '江苏省',
    subjectType: 'arts',
    subjectTypeName: '历史类',
    batch: 'batch1',
    batchName: '特殊类型控制线',
    score: 527,
    lastYearScore: 525,
    change: 2
  }
];

// 考试时间安排
export const examSchedules: ExamSchedule[] = [
  {
    id: 'es-2024-national',
    year: 2024,
    province: 'national',
    provinceName: '全国统考',
    stages: [
      {
        id: 'es-2024-stage1',
        name: '高考',
        date: '2024-06-07',
        description: '全国统一高考第一天',
        timeSlots: [
          { subject: '语文', startTime: '09:00', endTime: '11:30' },
          { subject: '数学', startTime: '15:00', endTime: '17:00' }
        ]
      },
      {
        id: 'es-2024-stage2',
        name: '高考',
        date: '2024-06-08',
        description: '全国统一高考第二天',
        timeSlots: [
          { subject: '综合科目', startTime: '09:00', endTime: '11:30' },
          { subject: '外语', startTime: '15:00', endTime: '17:00' }
        ]
      }
    ]
  },
  {
    id: 'es-2024-zj',
    year: 2024,
    province: 'zhejiang',
    provinceName: '浙江省',
    stages: [
      {
        id: 'es-2024-zj-stage1',
        name: '高考',
        date: '2024-06-07',
        description: '浙江高考第一天',
        timeSlots: [
          { subject: '语文', startTime: '09:00', endTime: '11:30' },
          { subject: '数学', startTime: '15:00', endTime: '17:00' }
        ]
      },
      {
        id: 'es-2024-zj-stage2',
        name: '高考',
        date: '2024-06-08',
        description: '浙江高考第二天',
        timeSlots: [
          { subject: '外语', startTime: '15:00', endTime: '17:00' }
        ]
      },
      {
        id: 'es-2024-zj-stage3',
        name: '选考',
        date: '2024-06-09',
        description: '浙江选考科目',
        timeSlots: [
          { subject: '物理/思想政治', startTime: '08:00', endTime: '09:30' },
          { subject: '化学/技术', startTime: '10:30', endTime: '12:00' },
          { subject: '生物/历史', startTime: '15:00', endTime: '16:30' },
          { subject: '地理', startTime: '17:00', endTime: '18:30' }
        ]
      }
    ]
  }
];

// 获取分类筛选列表
export const newsCategories = [
  { id: 'all', name: '全部资讯', icon: '📰' },
  { id: 'exam-schedule', name: '考试时间', icon: '📅' },
  { id: 'policy', name: '政策解读', icon: '📋' },
  { id: 'score-line', name: '分数线', icon: '📊' },
  { id: 'volunteer-guide', name: '志愿填报', icon: '🎯' },
  { id: 'study-tips', name: '学习方法', icon: '📚' },
  { id: 'college-info', name: '院校资讯', icon: '🏛️' },
  { id: 'exam-guide', name: '备考指南', icon: '📖' }
];
