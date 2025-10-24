// ✅ evaluationEngine.ts — Universal Prompt Evaluation Engine (v3.0)
// Works with PracticePrompt.tsx — fully modular, context-aware, and scalable.

export interface EvaluationResult {
  passed: boolean;
  score: number;
  feedback: {
    keywordScore: number;
    patternScore: number;
    fuzzyScore: number;
    tokenScore: number;
    relevanceAiScore: number;
    clarityScore: number;
    creativityScore: number;
    persuasivenessScore: number;
    details: string[];
    hints: string[];
  };
}

/* ---------------------- Utility Functions ---------------------- */

function normalizeText(text: string): string {
  return text.toLowerCase().replace(/[^a-z0-9\s]/g, '').trim();
}

function jaccardSimilarity(a: string, b: string): number {
  const setA = new Set(normalizeText(a).split(/\s+/));
  const setB = new Set(normalizeText(b).split(/\s+/));
  const intersection = new Set([...setA].filter(x => setB.has(x)));
  const union = new Set([...setA, ...setB]);
  return union.size === 0 ? 0 : intersection.size / union.size;
}

function levenshteinSimilarity(a: string, b: string): number {
  const s1 = normalizeText(a);
  const s2 = normalizeText(b);
  const dp: number[][] = Array(s1.length + 1)
    .fill(null)
    .map(() => Array(s2.length + 1).fill(0));

  for (let i = 0; i <= s1.length; i++) dp[i][0] = i;
  for (let j = 0; j <= s2.length; j++) dp[0][j] = j;

  for (let i = 1; i <= s1.length; i++) {
    for (let j = 1; j <= s2.length; j++) {
      const cost = s1[i - 1] === s2[j - 1] ? 0 : 1;
      dp[i][j] = Math.min(
        dp[i - 1][j] + 1,
        dp[i][j - 1] + 1,
        dp[i - 1][j - 1] + cost
      );
    }
  }
  const distance = dp[s1.length][s2.length];
  return 1 - distance / Math.max(s1.length, s2.length);
}

function fuzzyMatchScore(user: string, expected: string): number {
  return Math.max(jaccardSimilarity(user, expected), levenshteinSimilarity(user, expected));
}

/* ---------------------- AI Criteria Scoring ---------------------- */

function calculateAiCriteriaScore(user: string): {
  relevance: number;
  clarity: number;
  creativity: number;
  persuasiveness: number;
} {
  const text = normalizeText(user);

  // Relevance = density of strong action / factual terms
  const relevanceKeywords = ['explain', 'define', 'analyze', 'how', 'why', 'what', 'steps', 'process', 'goal'];
  const clarityIndicators = ['therefore', 'first', 'second', 'finally', 'clearly', 'in conclusion'];
  const creativityIndicators = ['imagine', 'unique', 'creative', 'innovative', 'inspire', 'vision'];
  const persuasiveIndicators = ['must', 'should', 'powerful', 'effective', 'important', 'strongly'];

  const relevanceScore = Math.min(1, relevanceKeywords.filter(k => text.includes(k)).length / 4);
  const clarityScore = Math.min(1, clarityIndicators.filter(k => text.includes(k)).length / 3);
  const creativityScore = Math.min(1, creativityIndicators.filter(k => text.includes(k)).length / 3);
  const persuasivenessScore = Math.min(1, persuasiveIndicators.filter(k => text.includes(k)).length / 3);

  // Dynamic balancing — if none found, fallback to structure
  const wordCount = text.split(/\s+/).length;
  const structureBonus = wordCount > 30 ? 0.2 : 0;

  return {
    relevance: Math.min(1, relevanceScore + structureBonus),
    clarity: Math.min(1, clarityScore + structureBonus),
    creativity: Math.min(1, creativityScore + 0.1),
    persuasiveness: Math.min(1, persuasivenessScore + 0.1),
  };
}

/* ---------------------- Main Evaluation ---------------------- */

export function evaluatePrompt(
  userText: string,
  expectedOutput: string,
  keywords: string[],
  patterns: string[],
  maxTokens: number,
  hints: string[],
  mode: 'run' | 'submit' = 'run',
  ai_eval_metrics: { [key: string]: number } = {}
): EvaluationResult {
  const user = normalizeText(userText);
  const expected = normalizeText(expectedOutput);

  // 1. Keyword Match
  const keywordMatches = keywords.filter(k => user.includes(normalizeText(k))).length;
  const keywordScore = keywords.length ? keywordMatches / keywords.length : 0.5;

  // 2. Pattern Match
  const patternScore = patterns.length
    ? patterns.filter(p => new RegExp(p, 'i').test(userText)).length / patterns.length
    : 0.5;

  // 3. Fuzzy Semantic Similarity
  const fuzzyScore = fuzzyMatchScore(userText, expectedOutput);

  // 4. Token Balance
  const tokenCount = userText.split(/\s+/).length;
  const tokenScore = Math.min(1, tokenCount / (maxTokens * 0.6));
  const lengthPenalty = tokenCount > maxTokens ? 0.8 : 1;

  // 5. AI Criteria (Universal Scoring)
  const ai = calculateAiCriteriaScore(userText);

  // 6. Final Weighted Universal Score
  const finalScore =
    (keywordScore * 0.15 +
      patternScore * 0.15 +
      fuzzyScore * 0.25 +
      ai.relevance * 0.15 +
      ai.clarity * 0.1 +
      ai.creativity * 0.1 +
      ai.persuasiveness * 0.1 +
      tokenScore * 0.05) *
    lengthPenalty;

  const passed = finalScore >= (mode === 'run' ? 0.55 : 0.7);

  // 7. Feedback Generation
  const details: string[] = [];
  if (keywordScore < 0.5) details.push('Try including more essential keywords or concepts.');
  if (fuzzyScore < 0.6) details.push('Output meaning differs from the expected result.');
  if (ai.clarity < 0.5) details.push('Improve sentence structure for better clarity.');
  if (ai.creativity < 0.4) details.push('Add more unique or imaginative phrasing.');
  if (ai.persuasiveness < 0.4) details.push('Use more assertive or convincing language.');
  if (tokenCount < maxTokens * 0.3) details.push('Your response seems too short, expand ideas.');

  // 8. Smart Hints
  const hintList = hints.slice(0, 3);
  if (details.length === 0 && passed) details.push('Excellent! Your prompt output is balanced and effective.');

  return {
    passed,
    score: Math.round(finalScore * 100),
    feedback: {
      keywordScore: Math.round(keywordScore * 100),
      patternScore: Math.round(patternScore * 100),
      fuzzyScore: Math.round(fuzzyScore * 100),
      tokenScore: Math.round(tokenScore * 100),
      relevanceAiScore: Math.round(ai.relevance * 100),
      clarityScore: Math.round(ai.clarity * 100),
      creativityScore: Math.round(ai.creativity * 100),
      persuasivenessScore: Math.round(ai.persuasiveness * 100),
      details,
      hints: hintList,
    },
  };
}
