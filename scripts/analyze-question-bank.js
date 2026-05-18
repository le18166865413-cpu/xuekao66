const fs = require('fs');
const path = require('path');

const assessmentTsPath = path.join(__dirname, '../src/utils/assessment.ts');
const content = fs.readFileSync(assessmentTsPath, 'utf-8');

const questionsMatch = content.match(/\{\s*id:\s*(\d+)[^}]+\}/g) || [];
console.log('=== 题库统计分析 ===');
console.log('总题目数:', questionsMatch.length);

const bySubject = {};
const byDifficulty = {};
const byChapter = {};
const byType = {};

questionsMatch.forEach((match, index) => {
  const idMatch = match.match(/id:\s*(\d+)/);
  const subjectMatch = match.match(/subject:\s*['"]([^'"]+)['"]/);
  const difficultyMatch = match.match(/difficulty:\s*['"]([^'"]+)['"]/);
  const chapterMatch = match.match(/chapter:\s*['"]([^'"]+)['"]/);

  if (subjectMatch) {
    const subject = subjectMatch[1];
    bySubject[subject] = (bySubject[subject] || 0) + 1;
  }

  if (difficultyMatch) {
    const difficulty = difficultyMatch[1];
    byDifficulty[difficulty] = (byDifficulty[difficulty] || 0) + 1;
  }

  if (chapterMatch) {
    const chapter = chapterMatch[1];
    byChapter[chapter] = (byChapter[chapter] || 0) + 1;
  }

  byType['选择题'] = (byType['选择题'] || 0) + 1;
});

const subjectsList = [
  { id: 'math', name: '数学' },
  { id: 'chinese', name: '语文' },
  { id: 'english', name: '英语' },
  { id: 'physics', name: '物理' },
  { id: 'chemistry', name: '化学' },
  { id: 'biology', name: '生物' },
  { id: 'history', name: '历史' },
  { id: 'geography', name: '地理' },
  { id: 'politics', name: '政治' },
];

console.log('\n【按科目分布】');
let totalSubject = 0;
subjectsList.forEach(s => {
  const count = bySubject[s.id] || 0;
  totalSubject += count;
  console.log(`${s.name.padEnd(4)}: ${count} 题`);
});
console.log(`合计: ${totalSubject} 题`);

console.log('\n【按难度分布】');
const difficultyNames = {
  easy: '基础题',
  medium: '中档题',
  hard: '提高题',
  expert: '压轴题'
};
Object.entries(byDifficulty).forEach(([k, v]) => {
  console.log(`${(difficultyNames[k] || k).padEnd(4)}: ${v} 题 (${((v / questionsMatch.length) * 100).toFixed(1)}%)`);
});

console.log('\n【按章节分布】');
const sortedChapters = Object.entries(byChapter).sort((a, b) => b[1] - a[1]);
sortedChapters.forEach(([chapter, count]) => {
  console.log(`${chapter.padEnd(20)}: ${count} 题`);
});

console.log('\n【题型分布】');
Object.entries(byType).forEach(([type, count]) => {
  console.log(`${type}: ${count} 题`);
});

console.log('\n【数据完整性检查】');
const missingCategory = questionsMatch.filter(q => !q.includes('category:')).length;
const missingScore = questionsMatch.filter(q => !q.includes('score:')).length;
console.log(`缺少 category 字段: ${missingCategory} 题`);
console.log(`缺少 score 字段: ${missingScore} 题`);

console.log('\n=== 分析完成 ===');
