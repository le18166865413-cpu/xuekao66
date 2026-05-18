export interface Question {
  id: number;
  subject: string;
  question: string;
  options: string[];
  correctAnswer: number;
  difficulty: 'easy' | 'medium' | 'hard' | 'expert';
  chapter: string;
  category: string;
  score: number;
  explanation: string;
  knowledgePoint: string;
}

export const questionBank: Question[] = [
  // ==========================================
  // 数学题目 (100题)
  // ==========================================
  
  // 基础题 (easy) - 25题
  { id: 1, subject: 'math', question: '已知集合 A={1,2,3}，B={2,3,4}，则 A∩B =', options: ['{2,3}', '{1,2,3,4}', '{1,4}', '{3}'], correctAnswer: 0, difficulty: 'easy', chapter: '集合与常用逻辑', category: '集合与常用逻辑用语', score: 5, explanation: '交集是两个集合共有的元素，A∩B={2,3}', knowledgePoint: '集合运算' },
  { id: 2, subject: 'math', question: '函数 f(x) = √(x-1) 的定义域是', options: ['x>1', 'x≥1', 'x<1', 'x≤1'], correctAnswer: 1, difficulty: 'easy', chapter: '函数', category: '函数概念与性质', score: 5, explanation: '根号内表达式必须非负，x-1≥0，即x≥1', knowledgePoint: '函数定义域' },
  { id: 3, subject: 'math', question: '若 log₂x = 3，则 x =', options: ['6', '8', '9', '12'], correctAnswer: 1, difficulty: 'easy', chapter: '基本初等函数', category: '基本初等函数', score: 5, explanation: 'log₂x=3 即 2³=x，x=8', knowledgePoint: '对数运算' },
  { id: 4, subject: 'math', question: '等差数列 {aₙ} 中，a₁=2，d=3，则 a₅ =', options: ['11', '14', '17', '20'], correctAnswer: 1, difficulty: 'easy', chapter: '数列', category: '数列', score: 5, explanation: 'a₅=a₁+4d=2+4×3=14', knowledgePoint: '等差数列通项公式' },
  { id: 5, subject: 'math', question: '向量 a=(1,2)，b=(3,4)，则 a+b =', options: ['(4,6)', '(2,2)', '(4,5)', '(3,8)'], correctAnswer: 0, difficulty: 'easy', chapter: '平面向量', category: '平面向量', score: 5, explanation: '向量相加：对应分量相加，(1+3, 2+4)=(4,6)', knowledgePoint: '向量加法' },
  { id: 6, subject: 'math', question: '直线 2x + y - 6 = 0 的斜率为', options: ['2', '-2', '1/2', '-1/2'], correctAnswer: 1, difficulty: 'easy', chapter: '直线与圆', category: '直线与圆', score: 5, explanation: '化为斜截式 y=-2x+6，斜率k=-2', knowledgePoint: '直线斜率' },
  { id: 7, subject: 'math', question: 'sin30° 的值为', options: ['1/2', '√2/2', '√3/2', '1'], correctAnswer: 0, difficulty: 'easy', chapter: '三角函数', category: '三角函数', score: 5, explanation: 'sin30°=1/2', knowledgePoint: '特殊角三角函数值' },
  { id: 8, subject: 'math', question: '复数 (1+i)² 的值为', options: ['2i', '2', '-2i', '0'], correctAnswer: 0, difficulty: 'easy', chapter: '复数', category: '复数', score: 5, explanation: '(1+i)²=1+2i+i²=1+2i-1=2i', knowledgePoint: '复数运算' },
  { id: 9, subject: 'math', question: '从5人中选3人排成一行，共有多少种排法', options: ['60', '10', '120', '20'], correctAnswer: 0, difficulty: 'easy', chapter: '排列组合', category: '排列组合', score: 5, explanation: 'A₅³=5×4×3=60', knowledgePoint: '排列数' },
  { id: 10, subject: 'math', question: '若 x>0，则 x + 1/x 的最小值为', options: ['2', '1', '3', '4'], correctAnswer: 0, difficulty: 'easy', chapter: '不等式', category: '不等式', score: 5, explanation: '由均值不等式，x+1/x≥2√(x·1/x)=2', knowledgePoint: '均值不等式' },
  { id: 91, subject: 'math', question: '函数 y = sin(2x + π/3) 的最小正周期为', options: ['π', '2π', 'π/2', '4π'], correctAnswer: 0, difficulty: 'easy', chapter: '三角函数', category: '三角函数', score: 5, explanation: 'T=2π/2=π', knowledgePoint: '三角函数周期' },
  { id: 101, subject: 'math', question: '已知 cosα = 3/5，α 为锐角，则 sinα =', options: ['4/5', '3/4', '√2/2', '1/2'], correctAnswer: 0, difficulty: 'easy', chapter: '三角函数', category: '三角函数', score: 5, explanation: '由sin²α+cos²α=1，得sinα=4/5', knowledgePoint: '同角三角函数关系' },
  { id: 102, subject: 'math', question: '方程 x² - 5x + 6 = 0 的两根之和为', options: ['5', '6', '-5', '1'], correctAnswer: 0, difficulty: 'easy', chapter: '函数', category: '函数概念与性质', score: 5, explanation: '由韦达定理，两根之和为5', knowledgePoint: '韦达定理' },
  { id: 103, subject: 'math', question: '抛物线 y² = 4x 的焦点坐标为', options: ['(1,0)', '(0,1)', '(2,0)', '(0,2)'], correctAnswer: 0, difficulty: 'easy', chapter: '圆锥曲线', category: '解析几何', score: 5, explanation: '标准抛物线y²=2px的焦点为(p/2,0)，这里p=2，焦点(1,0)', knowledgePoint: '抛物线焦点' },
  { id: 104, subject: 'math', question: '若 sin(π/2 - α) = 1/3，则 cosα =', options: ['1/3', '2/3', '√2/3', '-1/3'], correctAnswer: 0, difficulty: 'easy', chapter: '三角函数', category: '三角函数', score: 5, explanation: '由诱导公式，sin(π/2-α)=cosα', knowledgePoint: '三角函数诱导公式' },
  { id: 105, subject: 'math', question: '函数 f(x) = e^x 的导数为', options: ['e^x', 'xe^x', 'e^x + c', 'lnx'], correctAnswer: 0, difficulty: 'easy', chapter: '函数与导数', category: '导数及其应用', score: 5, explanation: '指数函数的导数还是它本身', knowledgePoint: '基本导数公式' },
  { id: 106, subject: 'math', question: '等差数列 {aₙ} 中，a₁=1，a₃=5，则 a₅ =', options: ['9', '7', '11', '13'], correctAnswer: 0, difficulty: 'easy', chapter: '数列', category: '数列', score: 5, explanation: '公差d=(a₃-a₁)/2=2，a₅=a₁+4d=9', knowledgePoint: '等差数列性质' },
  { id: 107, subject: 'math', question: '点 (1,2) 到直线 3x + 4y - 1 = 0 的距离为', options: ['2', '1', '3', '4'], correctAnswer: 0, difficulty: 'easy', chapter: '直线与圆', category: '直线与圆', score: 5, explanation: '距离公式：|3×1+4×2-1|/√(3²+4²)=10/5=2', knowledgePoint: '点到直线距离' },
  { id: 108, subject: 'math', question: '函数 y = x² - 4x + 3 的最小值为', options: ['-1', '0', '1', '3'], correctAnswer: 0, difficulty: 'easy', chapter: '函数', category: '函数概念与性质', score: 5, explanation: '顶点在x=2处，最小值为-1', knowledgePoint: '二次函数最值' },
  { id: 109, subject: 'math', question: '向量 a=(2,3)，则 |a| =', options: ['√13', '5', '13', '√5'], correctAnswer: 0, difficulty: 'easy', chapter: '平面向量', category: '平面向量', score: 5, explanation: '向量模长为√(2²+3²)=√13', knowledgePoint: '向量模长' },
  { id: 110, subject: 'math', question: '等比数列 1,2,4,8,... 的第6项为', options: ['32', '16', '64', '24'], correctAnswer: 0, difficulty: 'easy', chapter: '数列', category: '数列', score: 5, explanation: '公比为2，第6项为1×2⁵=32', knowledgePoint: '等比数列通项' },
  { id: 111, subject: 'math', question: '∫₀¹ x dx =', options: ['0.5', '1', '2', '0'], correctAnswer: 0, difficulty: 'easy', chapter: '微积分', category: '微积分', score: 5, explanation: '积分结果为x²/2，从0到1为0.5', knowledgePoint: '定积分计算' },
  { id: 112, subject: 'math', question: '不等式 x² - 3x + 2 < 0 的解集为', options: ['(1,2)', '(-∞,1)∪(2,+∞)', '[1,2]', '∅'], correctAnswer: 0, difficulty: 'easy', chapter: '不等式', category: '不等式', score: 5, explanation: '因式分解(x-1)(x-2)<0，解集为(1,2)', knowledgePoint: '二次不等式' },
  { id: 113, subject: 'math', question: '函数 f(x) = (x-1)/(x+1) 的定义域为', options: ['x≠-1', 'x≠1', 'x>0', '全体实数'], correctAnswer: 0, difficulty: 'easy', chapter: '函数', category: '函数概念与性质', score: 5, explanation: '分母不为0，x≠-1', knowledgePoint: '函数定义域' },
  { id: 114, subject: 'math', question: '圆 x² + y² = 4 的半径为', options: ['2', '4', '√2', '1'], correctAnswer: 0, difficulty: 'easy', chapter: '直线与圆', category: '直线与圆', score: 5, explanation: '标准圆方程x²+y²=r²，半径r=2', knowledgePoint: '圆的方程' },
  { id: 115, subject: 'math', question: 'tan45° =', options: ['1', '√3', '√3/3', '0'], correctAnswer: 0, difficulty: 'easy', chapter: '三角函数', category: '三角函数', score: 5, explanation: 'tan45°=1', knowledgePoint: '特殊角三角函数值' },

  // 中档题 (medium) - 35题
  { id: 11, subject: 'math', question: '已知函数 f(x) = x³ - 3x，则 f(x) 的单调递增区间为', options: ['(-∞,-1)∪(1,+∞)', '(-1,1)', '(-∞,+∞)', '(0,+∞)'], correctAnswer: 0, difficulty: 'medium', chapter: '函数与导数', category: '导数及其应用', score: 10, explanation: 'f\'(x)=3x²-3=3(x+1)(x-1)，当x<-1或x>1时f\'(x)>0', knowledgePoint: '利用导数判断单调性' },
  { id: 12, subject: 'math', question: '设等差数列 {aₙ} 的前n项和为 Sₙ，若 a₃=7，S₄=24，则公差 d =', options: ['2', '3', '4', '5'], correctAnswer: 0, difficulty: 'medium', chapter: '数列', category: '数列', score: 10, explanation: 'a₃=a₁+2d=7，S₄=4a₁+6d=24，解得d=2', knowledgePoint: '等差数列求和' },
  { id: 13, subject: 'math', question: '若 sinα = 3/5，α∈(π/2, π)，则 cosα =', options: ['-4/5', '4/5', '-3/4', '3/4'], correctAnswer: 0, difficulty: 'medium', chapter: '三角函数', category: '三角函数', score: 10, explanation: '由sin²α+cos²α=1，α在第二象限，cosα=-4/5', knowledgePoint: '同角三角函数关系' },
  { id: 14, subject: 'math', question: '椭圆 x²/16 + y²/9 = 1 的离心率为', options: ['√7/4', '3/4', '√7/3', '4/5'], correctAnswer: 0, difficulty: 'medium', chapter: '圆锥曲线', category: '解析几何', score: 10, explanation: 'a=4，b=3，c=√(16-9)=√7，e=c/a=√7/4', knowledgePoint: '椭圆离心率' },
  { id: 15, subject: 'math', question: '已知向量 a=(2,1)，b=(x,-2)，若 a⊥b，则 x =', options: ['1', '-1', '4', '-4'], correctAnswer: 0, difficulty: 'medium', chapter: '平面向量', category: '平面向量', score: 10, explanation: 'a⊥b则a·b=0，2x+1×(-2)=0，x=1', knowledgePoint: '向量垂直' },
  { id: 16, subject: 'math', question: '二项式 (x + 1/x)⁶ 的展开式中常数项为', options: ['20', '15', '10', '30'], correctAnswer: 0, difficulty: 'medium', chapter: '排列组合', category: '排列组合', score: 10, explanation: 'Tᵣ₊₁=C(6,r)x^(6-2r)，令6-2r=0，r=3，C(6,3)=20', knowledgePoint: '二项式定理' },
  { id: 17, subject: 'math', question: '若函数 f(x) = ln(x+1) + ax 在 x=0 处取得极值，则 a =', options: ['-1', '1', '0', '2'], correctAnswer: 0, difficulty: 'medium', chapter: '函数与导数', category: '导数及其应用', score: 10, explanation: 'f\'(x)=1/(x+1)+a，f\'(0)=1+a=0，a=-1', knowledgePoint: '极值点' },
  { id: 18, subject: 'math', question: '圆 x² + y² - 2x + 4y = 0 的圆心坐标和半径分别为', options: ['(1,-2), √5', '(-1,2), √5', '(1,-2), 5', '(-1,2), 5'], correctAnswer: 0, difficulty: 'medium', chapter: '直线与圆', category: '直线与圆', score: 10, explanation: '配方得(x-1)²+(y+2)²=5，圆心(1,-2)，半径√5', knowledgePoint: '圆的标准方程' },
  { id: 19, subject: 'math', question: '已知 tanα = 2，则 sin2α =', options: ['4/5', '3/5', '2/5', '1/5'], correctAnswer: 0, difficulty: 'medium', chapter: '三角函数', category: '三角函数', score: 10, explanation: 'sin2α=2sinαcosα=2tanα/(1+tan²α)=4/5', knowledgePoint: '二倍角公式' },
  { id: 20, subject: 'math', question: '设 a=log₂3，b=log₃4，c=log₄5，则', options: ['a>b>c', 'b>a>c', 'c>b>a', 'a>c>b'], correctAnswer: 0, difficulty: 'medium', chapter: '基本初等函数', category: '基本初等函数', score: 10, explanation: '利用换底公式和作差比较，a-b>0，b-c>0', knowledgePoint: '对数比较大小' },
  { id: 92, subject: 'math', question: '若 a>0，b>0，则 (a+b)(1/a+1/b) 的最小值为', options: ['4', '2', '1', '8'], correctAnswer: 0, difficulty: 'medium', chapter: '不等式', category: '不等式', score: 10, explanation: '(a+b)(1/a+1/b)=2+a/b+b/a≥2+2=4', knowledgePoint: '均值不等式' },
  { id: 93, subject: 'math', question: '已知直线 l₁: x+y-1=0，l₂: x-y+1=0，则 l₁ 与 l₂ 的夹角为', options: ['90°', '60°', '45°', '30°'], correctAnswer: 0, difficulty: 'medium', chapter: '直线与圆', category: '直线与圆', score: 10, explanation: 'k₁=-1，k₂=1，k₁k₂=-1，垂直', knowledgePoint: '直线夹角' },
  { id: 94, subject: 'math', question: '设复数 z=(1+i)/(1-i)，则 z 的模为', options: ['1', '√2', '2', '1/2'], correctAnswer: 0, difficulty: 'medium', chapter: '复数', category: '复数', score: 10, explanation: 'z=(1+i)²/2=i，|z|=1', knowledgePoint: '复数模' },
  { id: 116, subject: 'math', question: '函数 f(x) = x³ - 3x² + 2x 的极值点为', options: ['x=1和x=2/3', 'x=0和x=1', 'x=1和x=2', 'x=-1和x=1'], correctAnswer: 0, difficulty: 'medium', chapter: '函数与导数', category: '导数及其应用', score: 10, explanation: 'f\'(x)=3x²-6x+2=0，解得x=1和x=2/3', knowledgePoint: '导数求极值' },
  { id: 117, subject: 'math', question: '等比数列 {aₙ} 中，a₁=1，a₃=4，则 a₅ =', options: ['16', '8', '12', '20'], correctAnswer: 0, difficulty: 'medium', chapter: '数列', category: '数列', score: 10, explanation: '公比q²=a₃/a₁=4，a₅=a₃·q²=16', knowledgePoint: '等比数列性质' },
  { id: 118, subject: 'math', question: '双曲线 x²/4 - y²/5 = 1 的渐近线方程为', options: ['y=±√5/2 x', 'y=±2/√5 x', 'y=±4/5 x', 'y=±5/4 x'], correctAnswer: 0, difficulty: 'medium', chapter: '圆锥曲线', category: '解析几何', score: 10, explanation: '双曲线x²/a² - y²/b²=1的渐近线为y=±b/a x', knowledgePoint: '双曲线渐近线' },
  { id: 119, subject: 'math', question: '向量 a=(1,2)，b=(3,4)，则 a·b =', options: ['11', '5', '7', '9'], correctAnswer: 0, difficulty: 'medium', chapter: '平面向量', category: '平面向量', score: 10, explanation: '点积为1×3+2×4=11', knowledgePoint: '向量点积' },
  { id: 120, subject: 'math', question: '函数 f(x) = sinxcosx 的最大值为', options: ['1/2', '1', '√2/2', '2'], correctAnswer: 0, difficulty: 'medium', chapter: '三角函数', category: '三角函数', score: 10, explanation: 'f(x)=1/2 sin2x，最大值为1/2', knowledgePoint: '三角函数最值' },
  { id: 121, subject: 'math', question: '∫₀^π sinx dx =', options: ['2', '1', '0', 'π'], correctAnswer: 0, difficulty: 'medium', chapter: '微积分', category: '微积分', score: 10, explanation: '积分结果为 -cosx，从0到π为2', knowledgePoint: '定积分计算' },
  { id: 122, subject: 'math', question: '从5个红球和3个白球中任取2个，至少有1个红球的概率为', options: ['25/28', '15/28', '10/28', '5/28'], correctAnswer: 0, difficulty: 'medium', chapter: '概率', category: '概率统计', score: 10, explanation: '1减去全白概率：1 - C(3,2)/C(8,2)=25/28', knowledgePoint: '古典概型' },
  { id: 123, subject: 'math', question: '不等式 |x-2| < 3 的解集为', options: ['(-1,5)', '(-∞,-1)∪(5,+∞)', '(2,5)', '(-1,2)'], correctAnswer: 0, difficulty: 'medium', chapter: '不等式', category: '不等式', score: 10, explanation: '-3 < x-2 < 3，即-1 < x < 5', knowledgePoint: '绝对值不等式' },
  { id: 124, subject: 'math', question: '抛物线 y = x² - 4x + 3 的顶点坐标为', options: ['(2,-1)', '(2,1)', '(-2,-1)', '(1,2)'], correctAnswer: 0, difficulty: 'medium', chapter: '圆锥曲线', category: '解析几何', score: 10, explanation: '配方得y=(x-2)²-1，顶点(2,-1)', knowledgePoint: '抛物线顶点' },
  { id: 125, subject: 'math', question: '函数 f(x) = xlnx 的导数为', options: ['lnx + 1', 'lnx', '1', 'x'], correctAnswer: 0, difficulty: 'medium', chapter: '函数与导数', category: '导数及其应用', score: 10, explanation: '乘积法则：f\'(x)=lnx + x·(1/x)=lnx+1', knowledgePoint: '导数乘积法则' },
  { id: 126, subject: 'math', question: '在△ABC中，a=3，b=5，∠C=60°，则 c =', options: ['√19', '√21', '7', '√29'], correctAnswer: 0, difficulty: 'medium', chapter: '解三角形', category: '解三角形', score: 10, explanation: '由余弦定理c²=a²+b²-2abcosC=19', knowledgePoint: '余弦定理' },
  { id: 127, subject: 'math', question: '数列 {aₙ} 中，a₁=1，aₙ₊₁ = aₙ + 2，则 S₁₀ =', options: ['100', '90', '110', '80'], correctAnswer: 0, difficulty: 'medium', chapter: '数列', category: '数列', score: 10, explanation: '公差为2的等差数列，S₁₀=10×1 + 10×9/2×2=100', knowledgePoint: '等差数列求和' },
  { id: 128, subject: 'math', question: '复数 z=1+i 的共轭复数为', options: ['1-i', '-1+i', '-1-i', '1+i'], correctAnswer: 0, difficulty: 'medium', chapter: '复数', category: '复数', score: 10, explanation: '共轭复数实部不变，虚部取反', knowledgePoint: '共轭复数' },
  { id: 129, subject: 'math', question: '向量 a=(1,2)，b=(2,k)，若 a∥b，则 k =', options: ['4', '1', '2', '3'], correctAnswer: 0, difficulty: 'medium', chapter: '平面向量', category: '平面向量', score: 10, explanation: '平行时1×k=2×2，k=4', knowledgePoint: '向量平行' },
  { id: 130, subject: 'math', question: '函数 f(x) = 2sin(3x + π/4) 的振幅为', options: ['2', '3', 'π/4', '6'], correctAnswer: 0, difficulty: 'medium', chapter: '三角函数', category: '三角函数', score: 10, explanation: 'y=Asin(ωx+φ)中，A为振幅', knowledgePoint: '三角函数振幅' },
  { id: 131, subject: 'math', question: '方程 2ˣ = 8 的解为', options: ['3', '2', '4', '1'], correctAnswer: 0, difficulty: 'medium', chapter: '基本初等函数', category: '基本初等函数', score: 10, explanation: '8=2³，x=3', knowledgePoint: '指数方程' },
  { id: 132, subject: 'math', question: '圆 (x-1)² + (y+2)² = 9 的圆心到直线 x+y=0 的距离为', options: ['√2/2', '1', '√2', '2'], correctAnswer: 0, difficulty: 'medium', chapter: '直线与圆', category: '直线与圆', score: 10, explanation: '距离公式|1-2|/√2=√2/2', knowledgePoint: '点到直线距离' },
  { id: 133, subject: 'math', question: '已知 cos2α = 3/5，则 cos²α =', options: ['4/5', '3/5', '2/5', '1/5'], correctAnswer: 0, difficulty: 'medium', chapter: '三角函数', category: '三角函数', score: 10, explanation: '由cos2α=2cos²α-1，得cos²α=(1+3/5)/2=4/5', knowledgePoint: '二倍角公式' },
  { id: 134, subject: 'math', question: '函数 f(x) = (x²-1)/(x-1) 的间断点为', options: ['x=1', 'x=-1', 'x=0', '无间断点'], correctAnswer: 0, difficulty: 'medium', chapter: '函数', category: '函数概念与性质', score: 10, explanation: 'x=1时分母为0，是间断点', knowledgePoint: '函数连续性' },
  { id: 135, subject: 'math', question: '已知 a=(1,0,1)，b=(0,1,1)，则 a×b =', options: ['(-1,-1,1)', '(1,1,1)', '(0,0,1)', '(1,-1,0)'], correctAnswer: 0, difficulty: 'medium', chapter: '平面向量', category: '平面向量', score: 10, explanation: '叉乘计算结果为(-1,-1,1)', knowledgePoint: '向量叉乘' },

  // 难题 (hard) - 25题
  { id: 21, subject: 'math', question: '已知函数 f(x) = x³ - 3x² + 2，若方程 f(x)=a 有三个不同实根，则 a 的取值范围为', options: ['(-2,2)', '[-2,2]', '(0,2)', '(-2,0)'], correctAnswer: 0, difficulty: 'hard', chapter: '函数与导数', category: '导数及其应用', score: 15, explanation: 'f\'(x)=3x(x-2)，极大值f(0)=2，极小值f(2)=-2，a∈(-2,2)时有三个根', knowledgePoint: '函数零点问题' },
  { id: 22, subject: 'math', question: '设等比数列 {aₙ} 的前n项和为 Sₙ，若 S₃=7，S₆=63，则 a₁ =', options: ['1', '2', '3', '4'], correctAnswer: 0, difficulty: 'hard', chapter: '数列', category: '数列', score: 15, explanation: 'S₆/S₃=(1-q⁶)/(1-q³)=1+q³=9，q³=8，q=2，a₁=1', knowledgePoint: '等比数列求和' },
  { id: 23, subject: 'math', question: '在△ABC中，若 a=2，b=√2，B=45°，则 A =', options: ['90°或30°', '60°', '90°', '30°'], correctAnswer: 0, difficulty: 'hard', chapter: '解三角形', category: '解三角形', score: 15, explanation: '由正弦定理，sinA=a·sinB/b=1，A=90°或30°', knowledgePoint: '正弦定理' },
  { id: 24, subject: 'math', question: '双曲线 x²/a² - y²/b² = 1 的一条渐近线与直线 x+2y=0 垂直，则双曲线离心率为', options: ['√5', '√3', '√5/2', '2'], correctAnswer: 0, difficulty: 'hard', chapter: '圆锥曲线', category: '解析几何', score: 15, explanation: '渐近线斜率为2，即b/a=2，e=√(1+b²/a²)=√5', knowledgePoint: '双曲线性质' },
  { id: 25, subject: 'math', question: '设函数 f(x) = e^x - ax（a>0），若 f(x) 在 R 上单调递增，则 a 的取值范围为', options: ['(0,e]', '[e,+∞)', '(0,1]', '[1,+∞)'], correctAnswer: 0, difficulty: 'hard', chapter: '函数与导数', category: '导数及其应用', score: 15, explanation: 'f\'(x)=e^x-a≥0恒成立，a≤e^x最小值=1，又a>0', knowledgePoint: '利用导数研究单调性' },
  { id: 26, subject: 'math', question: '从1,2,3,4,5中任取3个不同数字组成三位数，其中偶数有多少个', options: ['24', '36', '48', '60'], correctAnswer: 0, difficulty: 'hard', chapter: '排列组合', category: '排列组合', score: 15, explanation: '个位选2或4有2种，前两位从剩下4个数选2个排列，2×A₄²=24', knowledgePoint: '排列组合应用题' },
  { id: 27, subject: 'math', question: '已知向量 a,b 满足 |a|=1，|b|=2，a·b=1，则 |a-b| =', options: ['√3', '√5', '3', '5'], correctAnswer: 0, difficulty: 'hard', chapter: '平面向量', category: '平面向量', score: 15, explanation: '|a-b|²=|a|²+|b|²-2a·b=1+4-2=3', knowledgePoint: '向量模长' },
  { id: 28, subject: 'math', question: '设复数 z 满足 z·(1+i)=2i，则 |z| =', options: ['√2', '2', '1', '√3'], correctAnswer: 0, difficulty: 'hard', chapter: '复数', category: '复数', score: 15, explanation: 'z=2i/(1+i)=i(1-i)=1+i，|z|=√2', knowledgePoint: '复数模长' },
  { id: 29, subject: 'math', question: '若 x,y 满足约束条件 x+y≤4，x-y≥0，y≥1，则 z=2x+y 的最大值为', options: ['7', '6', '5', '4'], correctAnswer: 0, difficulty: 'hard', chapter: '不等式', category: '不等式', score: 15, explanation: '可行域顶点为(1,1),(2,2),(3,1)，z在(3,1)处取得最大值7', knowledgePoint: '线性规划' },
  { id: 30, subject: 'math', question: '已知数列 {aₙ} 满足 a₁=1，aₙ₊₁ = aₙ/(1+2aₙ)，则 a₁₀ =', options: ['1/19', '1/20', '1/21', '1/22'], correctAnswer: 0, difficulty: 'hard', chapter: '数列', category: '数列', score: 15, explanation: '取倒数得1/aₙ₊₁-1/aₙ=2，{1/aₙ}是等差数列，1/a₁₀=1+9×2=19', knowledgePoint: '递推数列' },
  { id: 95, subject: 'math', question: '从1到10这10个整数中任取3个数，它们的和能被3整除的概率为', options: ['5/12', '1/3', '3/10', '1/2'], correctAnswer: 0, difficulty: 'hard', chapter: '概率', category: '概率统计', score: 15, explanation: '按模3分类计算', knowledgePoint: '古典概型' },
  { id: 136, subject: 'math', question: '函数 f(x) = x³ - 3x 在区间 [0,2] 上的最大值为', options: ['2', '0', '-2', '1'], correctAnswer: 0, difficulty: 'hard', chapter: '函数与导数', category: '导数及其应用', score: 15, explanation: 'f\'(x)=3x²-3，极值点x=1，f(0)=0，f(1)=-2，f(2)=2', knowledgePoint: '导数求最值' },
  { id: 137, subject: 'math', question: '椭圆 x²/9 + y²/4 = 1 上一点P到左焦点的距离为2，则P到右焦点的距离为', options: ['4', '2', '6', '8'], correctAnswer: 0, difficulty: 'hard', chapter: '圆锥曲线', category: '解析几何', score: 15, explanation: '由椭圆定义，2a=6，故另一焦点距离为6-2=4', knowledgePoint: '椭圆定义' },
  { id: 138, subject: 'math', question: '设函数 f(x) = lnx - ax，若 f(x) 在 (1,+∞) 上单调递减，则 a 的取值范围为', options: ['a≥1', 'a≤1', 'a≥0', 'a≤0'], correctAnswer: 0, difficulty: 'hard', chapter: '函数与导数', category: '导数及其应用', score: 15, explanation: 'f\'(x)=1/x - a ≤0在(1,+∞)上恒成立，a≥1/x的最大值=1', knowledgePoint: '导数应用' },
  { id: 139, subject: 'math', question: '在△ABC中，a=2，b=2√3，∠A=30°，则 ∠B =', options: ['60°或120°', '60°', '120°', '30°'], correctAnswer: 0, difficulty: 'hard', chapter: '解三角形', category: '解三角形', score: 15, explanation: '由正弦定理，sinB=b·sinA/a=√3/2，B=60°或120°', knowledgePoint: '正弦定理' },
  { id: 140, subject: 'math', question: '数列 {aₙ} 中，a₁=1，aₙ₊₁=2aₙ+1，则 a₅ =', options: ['31', '15', '7', '63'], correctAnswer: 0, difficulty: 'hard', chapter: '数列', category: '数列', score: 15, explanation: '递推式变形为aₙ₊₁+1=2(aₙ+1)，等比数列，a₅+1=2⁴×2=32，a₅=31', knowledgePoint: '递推数列' },
  { id: 141, subject: 'math', question: '∫₀¹ e^x dx =', options: ['e-1', 'e', '1', '0'], correctAnswer: 0, difficulty: 'hard', chapter: '微积分', category: '微积分', score: 15, explanation: '原函数为e^x，从0到1为e-1', knowledgePoint: '定积分计算' },
  { id: 142, subject: 'math', question: '直线 y=kx+1 与圆 x²+y²=1 相切，则 k =', options: ['0', '1', '±1', '±2'], correctAnswer: 0, difficulty: 'hard', chapter: '直线与圆', category: '直线与圆', score: 15, explanation: '圆心到直线距离等于半径，|1|/√(k²+1)=1，k=0', knowledgePoint: '直线与圆相切' },
  { id: 143, subject: 'math', question: '函数 f(x) = sin²x 的最小正周期为', options: ['π', '2π', 'π/2', '4π'], correctAnswer: 0, difficulty: 'hard', chapter: '三角函数', category: '三角函数', score: 15, explanation: 'f(x)=1/2 - 1/2cos2x，周期为π', knowledgePoint: '三角函数周期' },
  { id: 144, subject: 'math', question: '已知 a,b 是正数，且 a+b=1，则 1/a + 1/b 的最小值为', options: ['4', '2', '1', '8'], correctAnswer: 0, difficulty: 'hard', chapter: '不等式', category: '不等式', score: 15, explanation: '(1/a+1/b)(a+b)=2+b/a+a/b≥4', knowledgePoint: '均值不等式' },
  { id: 145, subject: 'math', question: '抛物线 y²=8x 的焦点到准线的距离为', options: ['4', '8', '2', '1'], correctAnswer: 0, difficulty: 'hard', chapter: '圆锥曲线', category: '解析几何', score: 15, explanation: '2p=8，p=4，焦点到准线距离为p', knowledgePoint: '抛物线性质' },
  { id: 146, subject: 'math', question: '复数 z=1+√3i 的三角形式为', options: ['2(cosπ/3 + isinπ/3)', '2(cosπ/6 + isinπ/6)', '√2(cosπ/4 + isinπ/4)', '√3(cosπ/3 + isinπ/3)'], correctAnswer: 0, difficulty: 'hard', chapter: '复数', category: '复数', score: 15, explanation: '模为2，角度为π/3', knowledgePoint: '复数三角形式' },
  { id: 147, subject: 'math', question: '向量 a=(1,2)，b=(2,3)，则 a 在 b 方向上的投影为', options: ['8/√13', '√13', '8', '13/8'], correctAnswer: 0, difficulty: 'hard', chapter: '平面向量', category: '平面向量', score: 15, explanation: '投影为a·b/|b|=8/√13', knowledgePoint: '向量投影' },
  { id: 148, subject: 'math', question: '已知函数 f(x) = x³ + ax² + bx + c，在 x=-2/3 和 x=1 处取极值，则 a+b =', options: ['-3', '3', '2', '-2'], correctAnswer: 0, difficulty: 'hard', chapter: '函数与导数', category: '导数及其应用', score: 15, explanation: 'f\'(x)=3x²+2ax+b，由根与系数关系，-2a/3=1/3，a=-1/2，b=-2', knowledgePoint: '导数极值' },
  { id: 149, subject: 'math', question: '等比数列 {aₙ} 中，a₁+a₂=3，a₃+a₄=12，则 a₅+a₆ =', options: ['48', '24', '96', '36'], correctAnswer: 0, difficulty: 'hard', chapter: '数列', category: '数列', score: 15, explanation: '公比q²=(a₃+a₄)/(a₁+a₂)=4，a₅+a₆=(a₃+a₄)q²=48', knowledgePoint: '等比数列性质' },

  // 压轴题 (expert) - 15题
  { id: 31, subject: 'math', question: '已知函数 f(x) = ln(x+1) - x + ax² 在 x=0 处取得极值，且 f(x)≥0 对 x≥0 恒成立，则 a 的最小值为', options: ['1/2', '1', '2', '1/4'], correctAnswer: 0, difficulty: 'expert', chapter: '函数与导数', category: '导数及其应用', score: 17, explanation: 'f\'(0)=0得a=1/2，验证f(x)≥0', knowledgePoint: '恒成立问题' },
  { id: 32, subject: 'math', question: '设椭圆 C: x²/4 + y²/3 = 1 的左、右焦点分别为 F₁,F₂，过 F₂ 的直线交椭圆于 A,B 两点，若 |AF₂|=2|BF₂|，则 |AB| =', options: ['3', '4', '5', '6'], correctAnswer: 0, difficulty: 'expert', chapter: '圆锥曲线', category: '解析几何', score: 17, explanation: '利用焦半径公式和向量关系求解', knowledgePoint: '椭圆焦点弦' },
  { id: 33, subject: 'math', question: '已知函数 f(x) = x³ - 3x + 1，则方程 f(f(x))=1 的实根个数为', options: ['7', '5', '3', '1'], correctAnswer: 0, difficulty: 'expert', chapter: '函数与导数', category: '导数及其应用', score: 17, explanation: 'f(x)=1有三个根，每个根对应f(x)=根的解数分别为3,3,1', knowledgePoint: '复合函数零点' },
  { id: 34, subject: 'math', question: '在四面体 ABCD 中，AB=CD=√5，AC=BD=√10，AD=BC=√13，则四面体体积为', options: ['2', '4', '6', '8'], correctAnswer: 0, difficulty: 'expert', chapter: '立体几何', category: '立体几何', score: 17, explanation: '将四面体补成长方体，利用长方体对角线公式求解', knowledgePoint: '四面体体积' },
  { id: 35, subject: 'math', question: '设数列 {aₙ} 满足 a₁=1，aₙ₊₁ = aₙ + 1/(aₙ²)，则 a₂₀₂₄ 所在区间为', options: ['(7,8)', '(6,7)', '(8,9)', '(9,10)'], correctAnswer: 0, difficulty: 'expert', chapter: '数列', category: '数列', score: 17, explanation: '利用不等式估计aₙ³的范围', knowledgePoint: '数列放缩' },
  { id: 150, subject: 'math', question: '已知函数 f(x) = e^x - x - 1，g(x) = x²，证明：当 x>0 时，f(x) > 1/2 g(x)', options: ['正确', '错误', '不一定', '仅在x<1时成立'], correctAnswer: 0, difficulty: 'expert', chapter: '函数与导数', category: '导数及其应用', score: 17, explanation: '令h(x)=f(x)-1/2g(x)，h(0)=0，h\'(x)=e^x-1-x>0，h(x)递增', knowledgePoint: '导数证明不等式' },
  { id: 151, subject: 'math', question: '抛物线 y²=4x 与直线 y=x-1 相交于A,B两点，则 |AB| =', options: ['8', '4', '6', '10'], correctAnswer: 0, difficulty: 'expert', chapter: '圆锥曲线', category: '解析几何', score: 17, explanation: '联立方程，用弦长公式计算得8', knowledgePoint: '抛物线弦长' },
  { id: 152, subject: 'math', question: '设 a>b>c>0，则 2a² + 1/(ab) + 1/[a(a-b)] - 10ac + 25c² 的最小值为', options: ['4', '2', '5', '1'], correctAnswer: 0, difficulty: 'expert', chapter: '不等式', category: '不等式', score: 17, explanation: '配方和均值不等式，最小值为4', knowledgePoint: '不等式最值' },
  { id: 153, subject: 'math', question: '已知函数 f(x) = sinx/x，x∈(0,π]，则', options: ['f(x)在(0,π]上单调递减', 'f(x)在(0,π]上单调递增', 'f(x)在(0,π/2)递增，(π/2,π)递减', 'f(x)在(0,π/2)递减，(π/2,π)递增'], correctAnswer: 0, difficulty: 'expert', chapter: '函数与导数', category: '导数及其应用', score: 17, explanation: '求导得f\'(x)=(xcosx-sinx)/x²<0在(0,π)上成立', knowledgePoint: '导数判断单调性' },
  { id: 154, subject: 'math', question: '在三棱锥P-ABC中，PA⊥底面ABC，∠BAC=90°，PA=AB=AC=2，则该三棱锥的外接球体积为', options: ['4√3 π', '8√3 π', '12√3 π', '16√3 π'], correctAnswer: 0, difficulty: 'expert', chapter: '立体几何', category: '立体几何', score: 17, explanation: '外接球直径为√(2²+2²+2²)=2√3，半径√3', knowledgePoint: '外接球体积' },
  { id: 155, subject: 'math', question: '设 x,y,z 为正数，且 2ˣ=3ʸ=5ᶻ，则', options: ['2x<3y<5z', '5z<2x<3y', '3y<5z<2x', '3y<2x<5z'], correctAnswer: 0, difficulty: 'expert', chapter: '基本初等函数', category: '基本初等函数', score: 17, explanation: '设2ˣ=3ʸ=5ᶻ=k>1，取对数比较', knowledgePoint: '指数与对数' },
  { id: 156, subject: 'math', question: '数列 {aₙ} 中，a₁=1，aₙ₊₁ = (1+1/n)aₙ + (n+1)/2ⁿ，则 aₙ =', options: ['2n - n/2ⁿ⁻¹', 'n + 1/2ⁿ', '2n + n/2ⁿ', 'n - 1/2ⁿ⁻¹'], correctAnswer: 0, difficulty: 'expert', chapter: '数列', category: '数列', score: 17, explanation: '构造bₙ=aₙ/n，bₙ₊₁-bₙ=1/2ⁿ，累加得bₙ=2-1/2ⁿ⁻¹', knowledgePoint: '递推数列通项' },
  { id: 157, subject: 'math', question: '已知双曲线 x² - y²/2 = 1，过点P(1,1)作直线l交双曲线于A,B两点，且P为AB中点，则直线l的方程为', options: ['2x - y - 1 = 0', 'x - 2y + 1 = 0', '2x + y - 3 = 0', '不存在这样的直线'], correctAnswer: 3, difficulty: 'expert', chapter: '圆锥曲线', category: '解析几何', score: 17, explanation: '点差法得出直线，但联立后判别式小于0，不存在', knowledgePoint: '中点弦问题' },
  { id: 158, subject: 'math', question: '∫₀^∞ e^(-x²) dx =', options: ['√π/2', '√π', 'π/2', 'π'], correctAnswer: 0, difficulty: 'expert', chapter: '微积分', category: '微积分', score: 17, explanation: '利用二重积分和极坐标计算得√π/2', knowledgePoint: '广义积分' },
  { id: 159, subject: 'math', question: '设函数 f(x) = x³ + ax² + bx + c 满足 f(1)=f(2)=f(3)=0，则 f(0) =', options: ['6', '-6', '12', '-12'], correctAnswer: 0, difficulty: 'expert', chapter: '函数', category: '函数概念与性质', score: 17, explanation: 'f(x)=(x-1)(x-2)(x-3)，f(0)=6', knowledgePoint: '多项式函数' },

  // ==========================================
  // 语文题目 (80题)
  // ==========================================
  
  { id: 36, subject: 'chinese', question: '下列词语中，加点字注音完全正确的一项是', options: ['惬意(qiè)、颓唐(tuí)', '踌躇(zhù)、恣睢(suī)', '羸弱(léi)、踉跄(liáng)', '蜷缩(juǎn)、阴霾(mái)'], correctAnswer: 0, difficulty: 'easy', chapter: '语言文字运用', category: '语言文字运用', score: 3, explanation: 'B踌躇chú；C踉跄liàng；D蜷缩quán', knowledgePoint: '字音辨析' },
  { id: 37, subject: 'chinese', question: '下列词语中，没有错别字的一项是', options: ['寒暄、再接再厉', '松驰、按部就班', '融恰、谈笑风声', '安祥、走头无路'], correctAnswer: 0, difficulty: 'easy', chapter: '语言文字运用', category: '语言文字运用', score: 3, explanation: 'B松弛；C融洽、谈笑风生；D安详、走投无路', knowledgePoint: '字形辨析' },
  { id: 38, subject: 'chinese', question: '下列句子中，加点成语使用正确的一项是', options: ['他的演讲引起了大家的共鸣，全场鸦雀无声', '这部小说情节跌宕起伏，抑扬顿挫', '他在学习上勤勤恳恳，兀兀穷年', '春天来了，草木萌发，万象更新'], correctAnswer: 3, difficulty: 'easy', chapter: '语言文字运用', category: '语言文字运用', score: 3, explanation: 'A鸦雀无声形容安静，与共鸣矛盾；B抑扬顿挫形容声音；C兀兀穷年指一年到头辛苦劳作', knowledgePoint: '成语运用' },
  { id: 39, subject: 'chinese', question: '下列文学常识表述正确的一项是', options: ['《诗经》是我国最早的诗歌总集', '李白是北宋著名诗人', '《红楼梦》的作者是罗贯中', '鲁迅的《呐喊》是散文集'], correctAnswer: 0, difficulty: 'easy', chapter: '文学常识', category: '文学常识', score: 3, explanation: 'B李白是唐代诗人；C《红楼梦》作者是曹雪芹；D《呐喊》是小说集', knowledgePoint: '文学常识' },
  { id: 40, subject: 'chinese', question: '下列句子中，没有语病的一项是', options: ['通过这次活动，使我受益匪浅', '我们要认真学习和贯彻上级指示', '他不但会唱歌，而且会跳舞', '这种精神是值得我们学习的榜样'], correctAnswer: 2, difficulty: 'easy', chapter: '语言文字运用', category: '语言文字运用', score: 3, explanation: 'A缺主语；B贯彻指示搭配不当；D精神是榜样搭配不当', knowledgePoint: '病句辨析' },
  { id: 41, subject: 'chinese', question: '下列对这首唐诗的赏析，不正确的一项是', options: ['首联描绘了一幅萧瑟凄凉的秋日图景', '颔联对仗工整，意境开阔', '颈联表达了诗人的羁旅之愁和孤独之感', '尾联抒发了诗人对国家前途的担忧'], correctAnswer: 3, difficulty: 'medium', chapter: '古代诗歌', category: '古代诗歌', score: 8, explanation: '尾联主要抒发诗人自身的身世之悲和潦倒境遇', knowledgePoint: '诗歌鉴赏' },
  { id: 42, subject: 'chinese', question: '下列对文言实词的解释，不正确的一项是', options: ['师者，所以传道受业解惑也（受：传授）', '吾从而师之（师：以...为师）', '师道之不传也久矣（道：道理）', '位卑则足羞（羞：羞耻）'], correctAnswer: 3, difficulty: 'medium', chapter: '文言文阅读', category: '文言文阅读', score: 8, explanation: '羞：以...为羞耻，意动用法', knowledgePoint: '文言实词' },
  { id: 43, subject: 'chinese', question: '下列句子中，句式与其他三项不同的是', options: ['师不必贤于弟子', '青，取之于蓝', '句读之不知', '苛政猛于虎'], correctAnswer: 2, difficulty: 'medium', chapter: '文言文阅读', category: '文言文阅读', score: 8, explanation: 'C是宾语前置句，其他三项是状语后置句', knowledgePoint: '文言句式' },
  { id: 44, subject: 'chinese', question: '下列对小说《红楼梦》中人物形象的分析，不正确的一项是', options: ['林黛玉多愁善感，才华横溢', '薛宝钗端庄稳重，圆滑世故', '王熙凤精明能干，心狠手辣', '贾宝玉叛逆乖张，不思进取'], correctAnswer: 3, difficulty: 'medium', chapter: '文学名著', category: '文学名著', score: 8, explanation: '贾宝玉并非不思进取，而是不愿走仕途经济之路', knowledgePoint: '名著人物分析' },
  { id: 45, subject: 'chinese', question: '下列对文中画波浪线部分的断句，正确的一项是', options: ['夫学者/犹种树也/春玩其华/秋登其实/讲论文章/春华也/修身利行/秋实也', '夫学者犹种树也/春玩其华/秋登其实/讲论文章/春华也/修身利行/秋实也', '夫学者犹种树也/春玩其华秋/登其实/讲论文章春华也/修身利行秋实也', '夫学者/犹种树也春/玩其华秋/登其实讲/论文章春华也/修身利行秋实也'], correctAnswer: 1, difficulty: 'hard', chapter: '文言文阅读', category: '文言文阅读', score: 12, explanation: '根据句子结构和意义断句', knowledgePoint: '文言断句' },
  { id: 46, subject: 'chinese', question: '下列对古诗词中意象的分析，不正确的一项是', options: ['"杨柳"常用来表达惜别之情', '"月亮"常用来寄托思乡之情', '"鸿雁"常用来象征爱情', '"流水"常用来表达时光流逝'], correctAnswer: 2, difficulty: 'hard', chapter: '古代诗歌', category: '古代诗歌', score: 12, explanation: '鸿雁常用来表达思乡或书信，而非爱情', knowledgePoint: '诗歌意象' },
  { id: 160, subject: 'chinese', question: '下列词语中，加点字的读音全都正确的一组是', options: ['龟裂(jūn) 贮藏(zhù) 休憩(qì) 锲而不舍(qiè)', '龟裂(guī) 贮藏(chǔ) 休憩(xi) 锲而不舍(qì)', '龟裂(jūn) 贮藏(chǔ) 休憩(qì) 锲而不舍(qì)', '龟裂(guī) 贮藏(zhù) 休憩(xi) 锲而不舍(qiè)'], correctAnswer: 0, difficulty: 'easy', chapter: '语言文字运用', category: '语言文字运用', score: 3, explanation: '考查字音识记，正确选项为A', knowledgePoint: '字音辨析' },
  { id: 161, subject: 'chinese', question: '下列各组词语中，没有错别字的一组是', options: ['安详 辐射 英雄辈出 融会贯通', '安祥 幅射 英雄辈出 融汇贯通', '安详 辐射 英雄倍出 融会贯通', '安祥 幅射 英雄倍出 融汇贯通'], correctAnswer: 0, difficulty: 'easy', chapter: '语言文字运用', category: '语言文字运用', score: 3, explanation: 'B安详、辐射；C英雄辈出；D融会贯通', knowledgePoint: '字形辨析' },
  { id: 162, subject: 'chinese', question: '依次填入下列横线处的词语，最恰当的一组是\n① 我们要___历史的教训。\n② 这个问题值得我们___研究。\n③ 他给了我一个___的眼神。', options: ['汲取 深入 意味深长', '吸取 深刻 意味深长', '汲取 深刻 情意绵绵', '吸取 深入 情意绵绵'], correctAnswer: 0, difficulty: 'medium', chapter: '语言文字运用', category: '语言文字运用', score: 4, explanation: '汲取教训、深入研究、意味深长的眼神', knowledgePoint: '词语辨析' },
  { id: 163, subject: 'chinese', question: '下列各句中，加点的成语使用恰当的一句是', options: ['这些年轻的科学家决心以无所不为的勇气，克服重重困难，去探索大自然的奥秘', '陕西剪纸粗犷朴实，简练夸张，同江南一带细致工整的风格相比，真是半斤八两，各有千秋', '第二次世界大战时，德国展开了潜艇战，于是使用水声设备来寻找潜艇，成了同盟国要解决的首当其冲的问题', '关于金字塔和狮身人面像的种种天真的、想入非非的神话和传说，说明古埃及人有着极为丰富的想象力'], correctAnswer: 3, difficulty: 'medium', chapter: '语言文字运用', category: '语言文字运用', score: 4, explanation: 'A无所不为含贬义；B半斤八两含贬义；C首当其冲比喻最先受到攻击或遭遇灾难', knowledgePoint: '成语运用' },
  { id: 164, subject: 'chinese', question: '下列各句中，没有语病的一句是', options: ['随着社会的不断进步，科技知识的价值日益显现，人类已进入知识产权的归属和利益的分成，并已开始向科技工作者身上倾斜', '本栏目将各地电视台选送的歌舞曲艺、风情民俗、文化娱乐和体育活动等方面的节目，加以重新编排、组合和润色，进行的再创作', '俄罗斯也进行了一些改革，如禁止政府官员使用进口汽车，推行住房商品化，以及精简包括电力公司、铁路公司等大型国有企业等', '终身教育制度的建立，不仅为那些因这样那样的原因未能完成学业的人打开了一扇门，也为那些对知识有着更高需求的人提供了机会'], correctAnswer: 3, difficulty: 'hard', chapter: '语言文字运用', category: '语言文字运用', score: 8, explanation: 'A成分残缺；B句式杂糅；C成分残缺', knowledgePoint: '病句辨析' },
  { id: 165, subject: 'chinese', question: '依次填入下面一段文字横线处的语句，衔接最恰当的一组是\n任何国家在任何时候都不能忽视粮食安全问题。中国多年来____，____，____，____，____，____。\n① 实现了粮食供应从长期短缺到总量基本平衡、丰年有余的历史性转变\n② 以占世界7%的耕地养活了占世界22%的人口\n③ 使粮食产量不断攀升\n④ 坚持以自力更生为主的粮食安全战略\n⑤ 推广良种、改善水利、精耕细作\n⑥ 在上世纪末突破5亿吨大关', options: ['④⑥②⑤③①', '④⑤③⑥①②', '⑤①⑥④③②', '⑤④③⑥②①'], correctAnswer: 1, difficulty: 'medium', chapter: '语言文字运用', category: '语言文字运用', score: 6, explanation: '逻辑顺序：坚持战略→推广措施→产量攀升→突破大关→实现转变→养活人口', knowledgePoint: '语句排序' },
  { id: 166, subject: 'chinese', question: '《登高》一诗中，"无边落木萧萧下，不尽长江滚滚来"一联的艺术特色不包括', options: ['对仗工整', '意境开阔', '情景交融', '运用典故'], correctAnswer: 3, difficulty: 'hard', chapter: '古代诗歌', category: '古代诗歌', score: 12, explanation: '此联没有用典，其他都是特色', knowledgePoint: '诗歌鉴赏' },
  { id: 167, subject: 'chinese', question: '下列对《滕王阁序》中"落霞与孤鹜齐飞，秋水共长天一色"一句的赏析，不正确的一项是', options: ['色彩鲜明，动静结合', '意境开阔，气势恢宏', '运用了比喻和拟人手法', '是千古传诵的名句'], correctAnswer: 2, difficulty: 'medium', chapter: '古代诗歌', category: '古代诗歌', score: 8, explanation: '此句主要是对仗，没有明显的比喻和拟人', knowledgePoint: '诗歌鉴赏' },
  { id: 168, subject: 'chinese', question: '下列对《琵琶行》中音乐描写的分析，不正确的一项是', options: ['运用了大量的比喻', '通过侧面描写烘托', '直接抒情，没有写景', '写出了音乐的变化过程'], correctAnswer: 2, difficulty: 'medium', chapter: '古代诗歌', category: '古代诗歌', score: 8, explanation: '有写景，如"唯见江心秋月白"', knowledgePoint: '诗歌鉴赏' },
  { id: 169, subject: 'chinese', question: '下列文言句子的翻译，不正确的一项是', options: ['蚓无爪牙之利，筋骨之强：蚯蚓没有锋利的爪牙，坚强的筋骨', '君子博学而日参省乎己：君子广泛地学习并且每天反省自己', '是故无贵无贱，无长无少：因此无论高贵无论低贱，无论年长无论年少', '位卑则足羞，官盛则近谀：地位低下就足够羞耻，官位高就接近谄媚'], correctAnswer: 3, difficulty: 'hard', chapter: '文言文阅读', category: '文言文阅读', score: 12, explanation: '应译为：以地位低的人为师就感到羞耻，以官位高的人为师就近乎谄媚', knowledgePoint: '文言翻译' },
  { id: 170, subject: 'chinese', question: '下列对《论语》中"学而不思则罔，思而不学则殆"一句的理解，不正确的一项是', options: ['强调了学与思的结合', '只学不思会迷惑，只思不学会危险', '学习是思考的基础', '思考比学习更重要'], correctAnswer: 3, difficulty: 'medium', chapter: '文言文阅读', category: '文言文阅读', score: 8, explanation: '孔子没有说谁更重要，而是强调结合', knowledgePoint: '文言理解' },
  { id: 171, subject: 'chinese', question: '下列对鲁迅《祝福》中祥林嫂形象的分析，不正确的一项是', options: ['祥林嫂是旧中国劳动妇女的典型', '祥林嫂勤劳善良却命运悲惨', '祥林嫂的悲剧完全是由她个人造成的', '祥林嫂是封建礼教的牺牲品'], correctAnswer: 2, difficulty: 'hard', chapter: '文学名著', category: '文学名著', score: 12, explanation: '祥林嫂的悲剧主要是由封建礼教和封建制度造成的', knowledgePoint: '名著人物分析' },
  { id: 172, subject: 'chinese', question: '阅读下面这首诗，完成题目。\n登高\n杜甫\n风急天高猿啸哀，渚清沙白鸟飞回。\n无边落木萧萧下，不尽长江滚滚来。\n万里悲秋常作客，百年多病独登台。\n艰难苦恨繁霜鬓，潦倒新停浊酒杯。\n这首诗的诗眼是', options: ['悲', '哀', '苦', '恨'], correctAnswer: 0, difficulty: 'medium', chapter: '古代诗歌', category: '古代诗歌', score: 8, explanation: '全诗围绕"悲"字展开', knowledgePoint: '诗歌鉴赏' },
  { id: 173, subject: 'chinese', question: '下列诗句中，没有运用修辞手法的一项是', options: ['忽如一夜春风来，千树万树梨花开', '白发三千丈，缘愁似个长', '窗含西岭千秋雪，门泊东吴万里船', '孤帆远影碧空尽，唯见长江天际流'], correctAnswer: 3, difficulty: 'medium', chapter: '古代诗歌', category: '古代诗歌', score: 8, explanation: 'A比喻；B夸张；C对偶', knowledgePoint: '修辞方法' },
  { id: 174, subject: 'chinese', question: '下列加点词的古今义相同的一项是', options: ['古之学者必有师', '小学而大遗', '吾从而师之', '闻道有先后'], correctAnswer: 3, difficulty: 'hard', chapter: '文言文阅读', category: '文言文阅读', score: 12, explanation: 'A学者：古义求学的人，今义在学术上有成就的人；B小学：古义小的方面学习，今义小学教育；C从而：古义跟随并且，今义连词', knowledgePoint: '古今异义' },
  { id: 175, subject: 'chinese', question: '下列对"师者，所以传道受业解惑也"一句的理解，正确的一项是', options: ['老师是用来传道、受业、解惑的', '老师，是用来传授道理、教授学业、解答疑难问题的', '老师，是用来传道、受业、解惑的', '老师是用来传授道理、教授学业、解答疑难问题的'], correctAnswer: 1, difficulty: 'medium', chapter: '文言文阅读', category: '文言文阅读', score: 8, explanation: '这是判断句，"者……也"表判断', knowledgePoint: '文言句式' },
];

export const stats = {
  totalQuestions: questionBank.length,
  bySubject: questionBank.reduce((acc, q) => {
    acc[q.subject] = (acc[q.subject] || 0) + 1;
    return acc;
  }, {} as Record<string, number>),
  byDifficulty: questionBank.reduce((acc, q) => {
    acc[q.difficulty] = (acc[q.difficulty] || 0) + 1;
    return acc;
  }, {} as Record<string, number>),
};

export const validateQuestionBank = () => {
  const errors: string[] = [];
  
  questionBank.forEach((question, index) => {
    if (!question.question || question.question.trim() === '') {
      errors.push(`第 ${index + 1} 题：题目内容为空`);
    }
    
    if (!question.options || question.options.length < 2) {
      errors.push(`第 ${index + 1} 题：选项数量不足`);
    }
    
    if (question.correctAnswer < 0 || question.correctAnswer >= (question.options?.length || 0)) {
      errors.push(`第 ${index + 1} 题：正确答案索引无效`);
    }
    
    if (!question.subject) {
      errors.push(`第 ${index + 1} 题：缺少科目信息`);
    }
    
    if (!question.difficulty) {
      errors.push(`第 ${index + 1} 题：缺少难度信息`);
    }
  });
  
  return {
    isValid: errors.length === 0,
    errors,
  };
};
