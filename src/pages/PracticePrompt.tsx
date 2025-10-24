/* PracticePrompt.tsx — fully fixed, safe version */
import { useEffect, useState } from 'react';
import Editor from '@monaco-editor/react';
import {
  Play, Send, AlertCircle, CheckCircle, TrendingUp, Lightbulb,
  Filter, Cpu, Target, Database, GitBranch, Zap, ChevronLeft, ChevronRight
} from 'lucide-react';
import promptsData from '../data/prompts.json';
import { evaluatePrompt, EvaluationResult } from '../lib/evaluationEngine';

interface Prompt {
  id: string;
  title: string;
  description: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  category: string;
  technique: string;
  expected_output: string;
  scenario: string;
  target_output_details: string;
  input_data: string;
  keywords: string[];
  patterns: string[];
  max_tokens: number;
  example_output: string;
  hints: string[];
  created_at: string;
  type?: 'normal' | 'competition';
  ai_eval_metrics?: { [key: string]: number };
  ai_eval_criteria?: { [key: string]: string };
}

interface PracticePromptProps {
  initialPromptId?: string;
}

const getUniqueOptions = (data: Prompt[], key: keyof Prompt) => {
  const options = new Set(['All']);
  data.forEach(p => options.add(String(p[key])));
  return Array.from(options).sort();
};

export default function PracticePrompt({ initialPromptId }: PracticePromptProps) {
  const [prompts, setPrompts] = useState<Prompt[]>([]);
  const [filteredPrompts, setFilteredPrompts] = useState<Prompt[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [currentPrompt, setCurrentPrompt] = useState<Prompt | null>(null);
  const [userText, setUserText] = useState('');
  const [evaluation, setEvaluation] = useState<EvaluationResult | null>(null);
  const [mode, setMode] = useState<'run' | 'submit'>('run');
  const [loading, setLoading] = useState(false);
  const [progressStats, setProgressStats] = useState({ solved: 0, total: 0 });
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedTechnique, setSelectedTechnique] = useState('All');
  const [selectedDifficulty, setSelectedDifficulty] = useState('All');
  const [categoryOptions, setCategoryOptions] = useState<string[]>(['All']);
  const [techniqueOptions, setTechniqueOptions] = useState<string[]>(['All']);
  const [competitionMode, setCompetitionMode] = useState(false);
  const [timeLeft, setTimeLeft] = useState(0);
  const [timerActive, setTimerActive] = useState(false);

  /* --- Load prompts once --- */
  useEffect(() => {
    const data = (promptsData as any[]).map((p) => ({
      ...p,
      expected_output: typeof p.expected_output === 'string'
        ? p.expected_output
        : JSON.stringify(p.expected_output),
      type: p.type || 'normal'
    })) as Prompt[];

    setCategoryOptions(getUniqueOptions(data, 'category'));
    setTechniqueOptions(getUniqueOptions(data, 'technique'));
    setPrompts(data);

    if (initialPromptId) {
      const idx = data.findIndex(d => d.id === initialPromptId);
      if (idx >= 0) setCurrentIndex(idx);
    }
  }, [initialPromptId]);

  /* --- Apply filters --- */
  useEffect(() => {
    let filtered = prompts;
    if (selectedCategory !== 'All') filtered = filtered.filter(p => p.category === selectedCategory);
    if (selectedTechnique !== 'All') filtered = filtered.filter(p => p.technique === selectedTechnique);
    if (selectedDifficulty !== 'All') filtered = filtered.filter(p => p.difficulty === selectedDifficulty);

    setFilteredPrompts(filtered);
    setCurrentIndex(0);
  }, [prompts, selectedCategory, selectedTechnique, selectedDifficulty]);

  /* --- Sync currentPrompt --- */
  useEffect(() => {
    if (filteredPrompts.length === 0) {
      setCurrentPrompt(null);
      return;
    }
    const clamped = Math.max(0, Math.min(currentIndex, filteredPrompts.length - 1));
    if (clamped !== currentIndex) setCurrentIndex(clamped);
    setCurrentPrompt(filteredPrompts[clamped]);

    const attempts = JSON.parse(localStorage.getItem('promptAttempts') || '{}');
    const lastAttempt = attempts?.[filteredPrompts[clamped]?.id]?.slice(-1)[0];
    setUserText(lastAttempt?.text || '');
    setEvaluation(null);
  }, [filteredPrompts, currentIndex]);

  /* --- Timer --- */
  useEffect(() => {
    if (!timerActive) return;
    if (timeLeft <= 0) {
      setTimerActive(false);
      return;
    }
    const t = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
    return () => clearTimeout(t);
  }, [timerActive, timeLeft]);

  /* --- Progress loader --- */
  function loadProgress() {
    const attempts = JSON.parse(localStorage.getItem('promptAttempts') || '{}');
    const solvedSet = new Set<string>();
    Object.keys(attempts).forEach(promptId => {
      const promptAttempts = attempts[promptId];
      const hasPassed = promptAttempts.some((attempt: any) => attempt.result?.passed && attempt.mode === 'submit');
      if (hasPassed) solvedSet.add(promptId);
    });
    setProgressStats({ solved: solvedSet.size, total: prompts.length });
  }
  useEffect(() => { loadProgress(); }, [prompts]);

  /* --- Evaluate --- */
  /*
  // Commented out handleRun as requested
  async function handleRun() {
    if (!currentPrompt || (competitionMode && !timerActive)) return;
    setMode('run');
    setLoading(true);

    setTimeout(async () => {
      const result = await Promise.resolve(evaluatePrompt(
        userText,
        currentPrompt.expected_output,
        currentPrompt.keywords,
        currentPrompt.patterns,
        currentPrompt.max_tokens,
        currentPrompt.hints,
        'run',
        currentPrompt.ai_eval_metrics ?? {}
      ));
      setEvaluation(result);
      setLoading(false);

      const attempts = JSON.parse(localStorage.getItem('promptAttempts') || '{}');
      attempts[currentPrompt.id] = attempts[currentPrompt.id] || [];
      attempts[currentPrompt.id].push({ text: userText, result, timestamp: new Date().toISOString(), mode: 'run' });
      localStorage.setItem('promptAttempts', JSON.stringify(attempts));
    }, 400);
  }
  */

  async function handleSubmit() {
    if (!currentPrompt || (competitionMode && !timerActive)) return;
    setMode('submit');
    setLoading(true);

    setTimeout(async () => {
      const result = await evaluatePrompt(
        userText,
        currentPrompt.expected_output,
        currentPrompt.keywords,
        currentPrompt.patterns,
        currentPrompt.max_tokens,
        currentPrompt.hints,
        'submit',
        currentPrompt.ai_eval_metrics || {}
      );
      setEvaluation(result);
      setLoading(false);

      const attempts = JSON.parse(localStorage.getItem('promptAttempts') || '{}');
      attempts[currentPrompt.id] = attempts[currentPrompt.id] || [];
      attempts[currentPrompt.id].push({ text: userText, result, timestamp: new Date().toISOString(), mode: 'submit' });
      localStorage.setItem('promptAttempts', JSON.stringify(attempts));
      loadProgress();
    }, 400);
  }

  /* --- Competition mode --- */
  function startCompetition() {
    if (!currentPrompt) return;
    setCompetitionMode(true);
    setTimeLeft(15 * 60);
    setTimerActive(true);
    setUserText('');
    setEvaluation(null);
  }

  /* --- Safe renderAiCriteria --- */
  const renderAiCriteria = (
    criteria?: { [key: string]: string },
    metrics?: { [key: string]: number }
  ) => {
    if (!criteria || !metrics || Object.keys(criteria).length === 0) return <p className="text-gray-500 text-sm">No scoring criteria available.</p>;

    return Object.keys(criteria).map((key) => (
      <div key={key} className="flex justify-between items-center text-sm">
        <span className="text-gray-300 font-medium">{criteria[key]}</span>
        <span className="text-pink-400 font-bold">
          ({metrics[key] ? (metrics[key] * 100).toFixed(0) : 0}%)
        </span>
      </div>
    ));
  };

  /* --- Navigation --- */
  const handlePrev = () => {
    if (currentIndex <= 0) return;
    setCurrentIndex(ci => Math.max(0, ci - 1));
    setEvaluation(null);
    setUserText('');
  };

  const handleNext = () => {
    if (currentIndex >= filteredPrompts.length - 1) return;
    setCurrentIndex(ci => Math.min(filteredPrompts.length - 1, ci + 1));
    setEvaluation(null);
    setUserText('');
  };

  /* --- JSX --- */
  return (
    <div className="relative z-10 min-h-screen pt-20 px-4 pb-12">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8 text-center">
          <h1 className="text-5xl font-bold bg-gradient-to-r from-cyan-400 to-pink-400 bg-clip-text text-transparent mb-4">
            Practice Arena
          </h1>
          <p className="text-gray-300">Sharpen your prompt engineering skills with real-time feedback</p>
        </div>

        {/* Progress */}
        <div className="mb-6">
          <div className="bg-gradient-to-r from-cyan-500/10 to-pink-500/10 border border-cyan-500/30 rounded-lg p-4 flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <TrendingUp className="w-6 h-6 text-cyan-400" />
              <span className="text-white font-medium">Your Progress: {progressStats.solved}/{prompts.length} Solved</span>
            </div>
            <div className="flex items-center space-x-4">
              <div className="text-sm text-gray-400">Showing {filteredPrompts.length} of {prompts.length}</div>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="mb-6 bg-white/5 border border-cyan-500/30 rounded-lg p-4">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center space-x-2">
              <Filter className="w-5 h-5 text-cyan-400" />
              <span className="text-white font-semibold">Filter Prompts</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm text-gray-400 mb-2">Category</label>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full px-3 py-2 bg-black/30 border border-cyan-500/30 rounded-lg text-white"
              >
                {categoryOptions.map(opt => <option key={opt} value={opt}>{opt}</option>)}
              </select>
            </div>

            <div>
              <label className="block text-sm text-gray-400 mb-2">Technique</label>
              <select
                value={selectedTechnique}
                onChange={(e) => setSelectedTechnique(e.target.value)}
                className="w-full px-3 py-2 bg-black/30 border border-cyan-500/30 rounded-lg text-white"
              >
                {techniqueOptions.map(opt => <option key={opt} value={opt}>{opt}</option>)}
              </select>
            </div>

            <div>
              <label className="block text-sm text-gray-400 mb-2">Difficulty</label>
              <select
                value={selectedDifficulty}
                onChange={(e) => setSelectedDifficulty(e.target.value)}
                className="w-full px-3 py-2 bg-black/30 border border-cyan-500/30 rounded-lg text-white"
              >
                <option value="All">All Levels</option>
                <option value="Easy">Easy</option>
                <option value="Medium">Medium</option>
                <option value="Hard">Hard</option>
              </select>
            </div>
          </div>
        </div>

        {/* Main Area */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Left: Prompt Details */}
          <div className="bg-gradient-to-br from-white/5 to-white/0 border border-cyan-500/30 rounded-2xl p-6 backdrop-blur-sm">
            {currentPrompt ? (
              <>
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h2 className="text-3xl font-bold text-white mb-2">{currentPrompt.title}</h2>
                    <div className="text-sm text-gray-400">
                      <span className="mr-3">{currentPrompt.difficulty}</span>
                      <span className="mr-3">{currentPrompt.category}</span>
                      <span className="text-xs text-gray-500">({currentIndex + 1} of {filteredPrompts.length})</span>
                    </div>
                  </div>

                  {/* Primary Prev/Next */}
                  <div className="flex items-center space-x-3">
                    <button
                      onClick={handlePrev}
                      disabled={currentIndex === 0}
                      className="flex items-center px-3 py-2 rounded-lg bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 disabled:opacity-40"
                    >
                      <ChevronLeft className="w-4 h-4 mr-1" /> Prev
                    </button>

                    <button
                      onClick={handleNext}
                      disabled={currentIndex === filteredPrompts.length - 1}
                      className="flex items-center px-3 py-2 rounded-lg bg-pink-500/20 text-pink-300 border border-pink-500/30 disabled:opacity-40"
                    >
                      Next <ChevronRight className="w-4 h-4 ml-1" />
                    </button>
                  </div>
                </div>

                {/* Scenario/Problem */}
                <div className="mb-5">
                  <h3 className="text-xl font-bold text-cyan-400 flex items-center mb-2"><Cpu className="w-5 h-5 mr-2" /> Scenario/Problem</h3>
                  <p className="text-gray-300 mb-2 leading-relaxed">{currentPrompt.scenario}</p>
                  <p className="text-gray-300 leading-relaxed italic border-l-2 border-cyan-500/50 pl-3">{currentPrompt.description}</p>
                </div>

                {/* Target Output */}
                <div className="mb-5">
                  <h3 className="text-xl font-bold text-pink-400 flex items-center mb-2"><Target className="w-5 h-5 mr-2" /> Target Output Details</h3>
                  <p className="text-gray-300 leading-relaxed">{currentPrompt.target_output_details}</p>
                </div>

                {/* Input Data */}
                <div className="mb-5">
                  <h3 className="text-xl font-bold text-yellow-400 flex items-center mb-2"><Database className="w-5 h-5 mr-2" /> Input Data</h3>
                  <div className="bg-black/30 border border-yellow-500/20 rounded-lg p-3 text-sm text-gray-200 font-mono">
                    {currentPrompt.input_data}
                  </div>
                </div>

                {/* Technique */}
                <div className="mb-5">
                  <h3 className="text-xl font-bold text-purple-400 flex items-center mb-2"><GitBranch className="w-5 h-5 mr-2" /> Constraints/Technique</h3>
                  <div className="bg-black/30 border border-pink-500/20 rounded-lg p-3">
                    <p className="text-pink-400 font-semibold">{currentPrompt.technique}</p>
                  </div>
                </div>

                {/* Scoring Criteria */}
                <div className="bg-black/30 border border-green-500/20 rounded-lg p-4">
                  <h3 className="text-xl font-bold text-green-400 flex items-center mb-3"><Zap className="w-5 h-5 mr-2" /> Scoring Criteria</h3>
                  <div className="space-y-1">
                    {renderAiCriteria(currentPrompt?.ai_eval_criteria, currentPrompt?.ai_eval_metrics)}
                  </div>
                </div>

                {/* Competition Mode */}
                {currentPrompt.type === 'competition' && (
                  <div className="mt-4 bg-gradient-to-r from-purple-500/10 to-pink-500/10 border border-purple-500/30 rounded-lg p-4">
                    {!competitionMode ? (
                      <>
                        <h4 className="text-lg font-bold text-purple-400 mb-2">🏆 Competition Mode</h4>
                        <p className="text-gray-300 mb-3 text-sm">You have 15 minutes to solve this prompt and achieve the highest score.</p>
                        <button onClick={startCompetition} className="px-4 py-2 bg-purple-500/30 text-purple-300 rounded-lg border border-purple-500/50">Start Competition</button>
                      </>
                    ) : (
                      <div className="flex items-center justify-between">
                        <span className="text-purple-400 font-medium">🕒 Time Left:</span>
                        <span className="text-xl font-mono text-purple-300">{Math.floor(timeLeft / 60)}:{(timeLeft % 60).toString().padStart(2, '0')}</span>
                      </div>
                    )}
                  </div>
                )}
              </>
            ) : (
              <p className="text-gray-400 text-center py-10">No prompt available for current filters.</p>
            )}
          </div>

          {/* Right: Editor + Evaluation */}
          <div className="bg-gradient-to-br from-white/5 to-white/0 border border-cyan-500/30 rounded-2xl overflow-hidden backdrop-blur-sm">
            <div className="bg-black/40 border-b border-cyan-500/20 px-6 py-3 flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="flex space-x-2">
                  <div className="w-3 h-3 rounded-full bg-red-500"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                  <div className="w-3 h-3 rounded-full bg-green-500"></div>
                </div>
                <span className="text-gray-400 text-sm font-mono">your-prompt.txt</span>
              </div>

              <div className="flex items-center space-x-4">
                {competitionMode && (
                  <div className="text-purple-400 font-mono">⏳ {Math.floor(timeLeft / 60)}:{(timeLeft % 60).toString().padStart(2, '0')}</div>
                )}
                
                {/* // Commented out RUN button as requested
                <button 
                  onClick={handleRun} 
                  disabled={loading || !userText.trim() || (competitionMode && !timerActive) || !currentPrompt} 
                  className="flex items-center space-x-2 px-4 py-2 bg-cyan-500/20 text-cyan-400 border border-cyan-500/30 rounded-lg disabled:opacity-50"
                >
                  <Play className="w-4 h-4" /><span>RUN</span>
                </button> 
                */}

                <button 
                  onClick={handleSubmit} 
                  disabled={loading || !userText.trim() || (competitionMode && !timerActive) || !currentPrompt} 
                  className="flex items-center space-x-2 px-4 py-2 bg-pink-500/20 text-pink-400 border border-pink-500/30 rounded-lg disabled:opacity-50"
                >
                  <Send className="w-4 h-4" /><span>SUBMIT</span>
                </button>
              </div>
            </div>

            <div className="h-96">
              <Editor
                height="100%"
                defaultLanguage="plaintext"
                value={userText}
                onChange={(value) => setUserText(value || '')}
                theme="vs-dark"
                options={{ minimap: { enabled: false }, fontSize: 14, lineNumbers: 'on', wordWrap: 'on', padding: { top: 16, bottom: 16 } }}
              />
            </div>

            {evaluation && (
              <div className="bg-black/50 border-t border-cyan-500/20 p-4 space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    {evaluation.passed ? <CheckCircle className="w-5 h-5 text-green-400" /> : <AlertCircle className="w-5 h-5 text-red-400" />}
                    <span className="text-white font-semibold">{evaluation.passed ? '✅ Passed!' : '❌ Try Again!'}</span>
                  </div>
                  <span className="text-4xl font-bold bg-gradient-to-r from-cyan-400 to-pink-400 bg-clip-text text-transparent">{evaluation.score}%</span>
                </div>

                <div className="grid grid-cols-2 gap-x-6 text-sm">
                  <p className="text-gray-300"><strong>Clarity:</strong> {evaluation.feedback.clarityScore}%</p>
                  <p className="text-gray-300"><strong>Relevance:</strong> {evaluation.feedback.relevanceAiScore}%</p>
                  <p className="text-gray-300"><strong>Creativity:</strong> {evaluation.feedback.creativityScore}%</p>
                  <p className="text-gray-300"><strong>Persuasiveness:</strong> {evaluation.feedback.persuasivenessScore}%</p>
                </div>

                <div className="mt-2 text-sm text-gray-400">
                  <strong>Detailed Feedback:</strong>
                  <ul className="list-disc pl-6 space-y-1">
                    {evaluation.feedback.details.map((d, i) => <li key={i}>{d}</li>)}
                  </ul>
                </div>

                {evaluation.feedback.hints && evaluation.feedback.hints.length > 0 && (
                  <div className="mt-2">
                    <div className="flex items-center space-x-2 mb-1">
                      <Lightbulb className="w-4 h-4 text-yellow-400" />
                      <span className="text-yellow-400 font-medium">Hints</span>
                    </div>
                    <ul className="list-disc pl-6 text-sm text-gray-300">
                      {evaluation.feedback.hints.map((h, i) => <li key={i}>{h}</li>)}
                    </ul>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}