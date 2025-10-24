import { useEffect, useState } from 'react';
import { Sparkles, TrendingUp, Trophy, ArrowRight, Newspaper, ChevronRight, MessageSquare } from 'lucide-react';

// NOTE: External JSON imports have been replaced with in-file mock data 
// to resolve compilation errors related to file path resolution in the environment.

interface Prompt {
  id: string;
  title: string;
  description: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  category: string;
  technique: string;
  expected_output: string;
  keywords: string[];
  patterns: string[];
  max_tokens: number;
  example_output: string;
  hints: string[];
  created_at: string;
}

interface AITool {
  id: string;
  name: string;
  logo: string;
  category: string;
  useCase: string;
  motivation: string;
  trending: boolean;
  website: string;
}

interface PromptLegend {
  id: string;
  name: string;
  rank: number;
  region: string;
  competition: string;
  achievement: string;
  strategy_snippet: string;
}

interface NewsItem {
  title: string;
  link: string;
  pubDate: string;
  description: string;
}

interface HomeProps {
  onNavigate: (page: string, data?: any) => void;
}

// --- MOCK DATA DEFINITIONS (Updated with more detail) ---

const MOCK_PROMPTS_DATA: Prompt[] = [
   {
    "id": "p1",
    "title": "Refine a Vague Query Using Socratic Questioning",
    "description": "Act as a Prompt Engineering Mentor. Transform a broad or unclear user question into a clear, detailed, and actionable prompt using the Socratic Method. Provide a concise 5-step guide in markdown format.",
    "difficulty": "Medium",
    "category": "Prompt Refinement",
    "technique": "Socratic Prompting",
    "expected_output": "A 5-step numbered list showing how to clarify, challenge, and refine a vague query into a precise prompt.",
    "keywords": ["Socratic", "prompt refinement", "clarification", "step-by-step guide"],
    "patterns": ["Zero-Shot Prompting"],
    "max_tokens": 300,
    "example_output": "1. Clarify Intent: Ask the user what the main goal of the query is. 2. Probe Context: Identify background information or constraints that are not specified. 3. Expose Assumptions: Question underlying assumptions or vague terms. 4. Suggest Options: Offer alternative ways to approach the query. 5. Confirm Details: Summarize the refined prompt and verify with the user.",
    "hints": ["Use sequential, actionable steps.", "Frame each step as a guiding question or action."],
    "created_at": "2025-10-21"
}

];

const MOCK_LEGENDS_DATA: PromptLegend[] = [
    {
        id: 'l1',
        name: 'Alex "The Oracle" Chen',
        rank: 1,
        region: 'Asia',
        competition: 'Prompt Engineering Global Cup 2024',
        achievement: 'Pioneered the Chain-of-Thought Decomposition (CoTD) for complex reasoning.',
        strategy_snippet: 'Break down multi-step problems into sequential, verifiable sub-tasks. Ask the model to generate the intermediate steps before the final answer, then review the steps using a secondary, objective prompt.',
    },
];

const MOCK_AI_TOOLS_DATA: AITool[] = [
    { id: 't1', name: 'Gemini Advanced', logo: '✨', category: 'Foundation Model', useCase: 'Advanced reasoning, coding assistance, and multimodal tasks.', motivation: 'Top-tier generalist model.', trending: true, website: 'https://gemini.google.com/' },
    { id: 't2', name: 'DALL-E 3', logo: '🎨', category: 'Image Generation', useCase: 'Creating highly detailed images and art based on text prompts.', motivation: 'Known for prompt adherence and integration with generalist models.', trending: true, website: 'https://openai.com/dall-e-3' },
    { id: 't3', name: 'Anthropic Claude', logo: '📚', category: 'Foundation Model', useCase: 'Processing long documents and detailed policy analysis.', motivation: 'Excels in large context window tasks and safety.', trending: true, website: 'https://www.anthropic.com/' },
    { id: 't4', name: 'GitHub Copilot', logo: '🐙', category: 'Coding Assistant', useCase: 'Writing code suggestions and completing functions in real-time.', motivation: 'Massively boosts developer productivity.', trending: false, website: 'https://github.com/features/copilot' },
];

// --- END MOCK DATA ---


export default function Home({ onNavigate }: HomeProps) {
  // --- FIXED: Feedback Form State (Moved INSIDE the component) ---
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [type, setType] = useState("suggestion");
  const [message, setMessage] = useState("");

  // --- FIXED: Submit Function (Moved INSIDE the component) ---
  const handleSubmit = async () => {
    if (!name || !message) {
      alert("Please fill in your name and message.");
      return;
    }

    const formData = new FormData();
    // Replace these entry IDs with your actual Google Form entry IDs
    formData.append("entry.123456789", name);      // Name
    formData.append("entry.987654321", email);     // Email
    formData.append("entry.1122334455", type);     // Feedback Type
    formData.append("entry.5566778899", message);  // Message

    try {
      await fetch("https://docs.google.com/forms/d/e/FORM_ID/formResponse", {
        method: "POST",
        body: formData,
        mode: "no-cors"
      });
      alert("Feedback submitted successfully!");
      setName(""); setEmail(""); setType("suggestion"); setMessage("");
    } catch (error) {
      console.error("Error submitting feedback:", error);
      alert("Failed to submit feedback. Please try again later.");
    }
  };
  // -----------------------------------------------------------------
  
  const [promptOfDay, setPromptOfDay] = useState<Prompt | null>(null);
  const [legendOfWeek, setLegendOfWeek] = useState<PromptLegend | null>(null);
  const [aiTools, setAiTools] = useState<AITool[]>([]);
  const [newsItems, setNewsItems] = useState<NewsItem[]>([]);
  const [newsLoading, setNewsLoading] = useState(true);

  useEffect(() => {
    loadData();
    loadNews();
  }, []);

  function loadData() {
    // Using MOCK_PROMPTS_DATA instead of imported promptsData
    if (MOCK_PROMPTS_DATA.length === 0) {
        console.warn("Prompts data is empty. Cannot determine Prompt of the Day.");
        setPromptOfDay(null);
    } else {
        const dayOfYear = Math.floor((new Date().getTime() - new Date(new Date().getFullYear(), 0, 0).getTime()) / 86400000);
        const promptIndex = dayOfYear % MOCK_PROMPTS_DATA.length;
        setPromptOfDay(MOCK_PROMPTS_DATA[promptIndex] as Prompt);
    }

    const dayOfYear = Math.floor((new Date().getTime() - new Date(new Date().getFullYear(), 0, 0).getTime()) / 86400000);
    
    // Using MOCK_LEGENDS_DATA instead of imported legendsData
    if (MOCK_LEGENDS_DATA.length > 0) {
        const weekOfYear = Math.floor(dayOfYear / 7);
        const legendIndex = weekOfYear % MOCK_LEGENDS_DATA.length;
        setLegendOfWeek(MOCK_LEGENDS_DATA[legendIndex] as PromptLegend);
    }

    // Using MOCK_AI_TOOLS_DATA instead of imported aiToolsData
    setAiTools(MOCK_AI_TOOLS_DATA as AITool[]);
  }

  async function loadNews() {
    try {
      const baseUrl =
        window.location.hostname === 'localhost'
          ? 'https://api.rss2json.com/v1/api.json?rss_url=' +
            encodeURIComponent('https://rss.nytimes.com/services/xml/rss/nyt/Technology.xml')
          : '/api/news';

      const res = await fetch(baseUrl);

      // --- FIX: Enhanced error handling for HTTP status codes ---
      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }
      // -----------------------------------------------------------

      const data = await res.json();

      if (data.items) {
        setNewsItems(data.items.slice(0, 5));
      } else {
        // Handle case where fetch is OK, but response structure is unexpected
        throw new Error("News response structure is invalid (missing 'items').");
      }
    } catch (error) {
      console.error('Failed to load news:', error);
      setNewsItems([
        // Provides a clearer mock data message after a real fetch attempt failed
        { title: "News API Unavailable", link: "#", pubDate: new Date().toISOString(), description: "Could not load news data. Displaying fallback." },
      ]);
    } finally {
      setNewsLoading(false);
    }
  }

  const trendingTools = aiTools.filter(tool => tool.trending).slice(0, 6);

  return (
    <div className="relative z-10">
      <section className="min-h-screen flex items-center justify-center px-4 pt-16">
        <div className="max-w-5xl mx-auto text-center">
          <div className="mb-6 inline-flex items-center space-x-2 px-4 py-2 rounded-full bg-pink-500/10 border border-pink-500/30">
            <Sparkles className="w-4 h-4 text-pink-400" />
            <span className="text-pink-400 text-sm font-medium">New Challenge Today</span>
          </div>

          <h1 className="text-6xl md:text-8xl font-bold mb-6 leading-tight">
            <span className="bg-gradient-to-r from-cyan-400 via-pink-400 to-yellow-400 bg-clip-text text-transparent animate-pulse">
              Master Prompt
            </span>
            <br />
            <span className="text-white">Engineering</span>
          </h1>

          <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto leading-relaxed">
            Level up your AI skills with hands-on practice, real-time evaluation, and expert techniques.
            Join the future of human-AI collaboration.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4">
            <button
              onClick={() => onNavigate('practice')}
              className="group relative px-8 py-4 bg-gradient-to-r from-cyan-500 to-pink-500 rounded-lg font-semibold text-white transition-all duration-300 hover:shadow-2xl hover:shadow-cyan-500/50 hover:scale-105"
            >
              <span className="flex items-center space-x-2">
                <span>Start Practicing</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </span>
              <div className="absolute inset-0 blur-xl bg-gradient-to-r from-cyan-500 to-pink-500 opacity-50 group-hover:opacity-75 transition-opacity rounded-lg"></div>
            </button>

            <button
              onClick={() => onNavigate('tutorial')}
              className="px-8 py-4 bg-white/5 backdrop-blur-sm border border-cyan-500/30 rounded-lg font-semibold text-white hover:bg-white/10 hover:border-cyan-500/50 transition-all duration-300"
            >
              Learn Techniques
            </button>
          </div>
        </div>
      </section>

      <section className="py-20 px-4 bg-gradient-to-b from-transparent to-black/20">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <div className="flex items-center justify-center space-x-3 mb-4">
              <Newspaper className="w-8 h-8 text-cyan-400" />
              <h2 className="text-4xl font-bold text-white">AI Tech News</h2>
            </div>
            <p className="text-gray-400">Latest technology updates from around the world</p>
          </div>

          <div className="relative overflow-hidden bg-gradient-to-br from-cyan-500/5 to-pink-500/5 border border-cyan-500/20 rounded-2xl p-6 backdrop-blur-sm">
            {newsLoading ? (
              <div className="text-center py-8">
                <div className="animate-spin w-8 h-8 border-4 border-cyan-500 border-t-transparent rounded-full mx-auto"></div>
                <p className="text-gray-400 mt-4">Loading latest news...</p>
              </div>
            ) : (
              <div className="flex animate-scroll-left">
                {/* Duplicating items for seamless loop */}
                {[...newsItems, ...newsItems].map((item, idx) => (
                  <a
                    key={idx}
                    href={item.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-shrink-0 w-80 mx-4 bg-black/30 border border-cyan-500/20 rounded-lg p-4 hover:border-cyan-500/50 transition-all group"
                  >
                    <h3 className="text-white font-semibold mb-2 line-clamp-2 group-hover:text-cyan-400 transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-gray-400 text-sm line-clamp-2 mb-2">{item.description}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-gray-500">{new Date(item.pubDate).toLocaleDateString()}</span>
                      <ChevronRight className="w-4 h-4 text-cyan-400 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </a>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>

      {promptOfDay && (
        <section className="py-20 px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-white mb-4">Prompt of the Day</h2>
              <p className="text-gray-400">Challenge yourself with today's featured prompt</p>
            </div>

            {/* The card is interactive via the explicit button now */}
            <div className="group relative bg-gradient-to-br from-cyan-500/10 to-pink-500/10 border border-cyan-500/30 rounded-2xl p-8 backdrop-blur-sm hover:border-cyan-500/50 transition-all duration-300 hover:scale-105">
              <div className="absolute inset-0 blur-2xl bg-gradient-to-br from-cyan-500/20 to-pink-500/20 opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl"></div>

              <div className="relative z-10">
                {/* Difficulty, Category, Technique Tags */}
                <div className="flex flex-wrap items-center gap-3 mb-6">
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                    promptOfDay.difficulty === 'Easy' ? 'bg-green-500/20 text-green-400 border border-green-500/30' :
                    promptOfDay.difficulty === 'Medium' ? 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/30' :
                    'bg-red-500/20 text-red-400 border border-red-500/30'
                  }`}>
                    Level: {promptOfDay.difficulty}
                  </span>
                  <span className="px-3 py-1 rounded-full text-sm font-medium bg-cyan-500/20 text-cyan-400 border border-cyan-500/30">
                    Category: {promptOfDay.category}
                  </span>
                  <span className="px-3 py-1 rounded-full text-sm font-medium bg-pink-500/20 text-pink-400 border border-pink-500/30">
                    Technique: {promptOfDay.technique}
                  </span>
                </div>

                {/* Main Question/Task */}
                <h3 className="text-2xl font-bold text-white mb-2">Question/Task:</h3>
                <p className="text-xl text-cyan-300 mb-6 font-semibold">{promptOfDay.title}</p>


                {/* Detailed Description/Input Context */}
                <div className="mb-6">
                    <h3 className="text-lg font-bold text-white mb-2">Detailed Instructions:</h3>
                    <p className="text-gray-300 leading-relaxed bg-black/20 p-4 rounded-lg border border-gray-700/50">{promptOfDay.description}</p>
                </div>


                {/* Expected Output Format */}
                <div className="mb-6">
                    <h3 className="text-lg font-bold text-white mb-2">Expected Output Format:</h3>
                    <p className="text-gray-300 leading-relaxed bg-black/20 p-4 rounded-lg border border-gray-700/50 italic">{promptOfDay.expected_output}</p>
                </div>
                
                {/* Example Output (Existing block, kept for context) */}
                {promptOfDay.example_output && (
                  <div className="bg-black/30 border border-cyan-500/20 rounded-lg p-4 mb-8">
                    <p className="text-sm text-gray-400 mb-2">Example Output:</p>
                    <p className="text-gray-200 italic text-sm">{promptOfDay.example_output}</p>
                  </div>
                )}
                
                {/* --- The explicit "Try This Prompt" button --- */}
                <button
                  onClick={() => onNavigate('practice', { promptId: promptOfDay.id })}
                  className="mt-2 px-6 py-3 w-full md:w-auto bg-gradient-to-r from-pink-500 to-red-500 rounded-lg font-semibold text-white transition-all duration-300 hover:shadow-xl hover:shadow-pink-500/50 flex items-center justify-center space-x-2"
                >
                  <span>Try This Prompt</span>
                  <ArrowRight className="w-5 h-5 ml-2" />
                </button>

              </div>
            </div>
          </div>
        </section>
      )}

      {legendOfWeek && (
        <section className="py-20 px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <div className="flex items-center justify-center space-x-3 mb-4">
                <Trophy className="w-8 h-8 text-yellow-400" />
                <h2 className="text-4xl font-bold text-white">Legend of the Week</h2>
              </div>
              <p className="text-gray-400">Learn from the best in the field</p>
            </div>

            <div className="bg-gradient-to-br from-yellow-500/10 to-pink-500/10 border border-yellow-500/30 rounded-2xl p-8 backdrop-blur-sm">
              <div className="flex flex-col md:flex-row items-center gap-8">
                <div className="w-32 h-32 rounded-full bg-gradient-to-br from-yellow-400 to-pink-400 flex items-center justify-center text-4xl font-bold text-white">
                  #{legendOfWeek.rank}
                </div>

                <div className="flex-1 text-center md:text-left">
                  <h3 className="text-3xl font-bold text-white mb-2">{legendOfWeek.name}</h3>
                  <p className="text-gray-300 mb-2">{legendOfWeek.region} • {legendOfWeek.competition}</p>
                  <p className="text-yellow-400 font-semibold mb-4">{legendOfWeek.achievement}</p>

                  {legendOfWeek.strategy_snippet && (
                    <div className="bg-black/30 border border-yellow-500/20 rounded-lg p-4 mt-4">
                      <p className="text-sm text-gray-400 mb-2">Strategy Tip:</p>
                      <p className="text-gray-200 italic leading-relaxed">{legendOfWeek.strategy_snippet}</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <div className="flex items-center justify-center space-x-3 mb-4">
              <TrendingUp className="w-8 h-8 text-cyan-400" />
              <h2 className="text-4xl font-bold text-white">Trending AI Tools</h2>
              </div>
            <p className="text-gray-400">Explore the most popular AI tools and platforms</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {trendingTools.map((tool) => (
              <a
                key={tool.id}
                href={tool.website}
                target="_blank"
                rel="noopener noreferrer"
                className="group bg-gradient-to-br from-white/5 to-white/0 border border-cyan-500/20 rounded-xl p-6 backdrop-blur-sm hover:border-cyan-500/50 hover:scale-105 transition-all duration-300 cursor-pointer"
              >
                <div className="absolute inset-0 blur-xl bg-cyan-500/0 group-hover:bg-cyan-500/10 transition-all rounded-xl"></div>

                <div className="relative z-10">
                  <div className="text-5xl mb-4">{tool.logo}</div>

                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-xl font-bold text-white">{tool.name}</h3>
                    {tool.trending && (
                      <span className="px-2 py-1 bg-pink-500/20 text-pink-400 text-xs rounded-full border border-pink-500/30">Hot</span>
                    )}
                  </div>
                  <p className="text-gray-400 text-sm mb-3 line-clamp-2">{tool.useCase}</p>

                  <span className="inline-block px-3 py-1 rounded-full text-xs font-medium bg-cyan-500/20 text-cyan-400 border border-cyan-500/30">
                    {tool.category}
                  </span>
                </div>
              </a>
            ))}
          </div>

          <div className="text-center">
            <button
              onClick={() => onNavigate('tools')}
              className="px-8 py-3 bg-gradient-to-r from-cyan-500 to-pink-500 rounded-lg font-semibold text-white hover:shadow-2xl hover:shadow-cyan-500/50 hover:scale-105 transition-all"
            >
              View All AI Tools
            </button>
          </div>
        </div>
      </section>

{/* --- FEEDBACK SECTION (Google Form Integrated) --- */}
<section className="py-20 px-4">
  <div className="max-w-4xl mx-auto">
    <div className="bg-gradient-to-r from-cyan-500/10 to-pink-500/10 border border-cyan-500/30 rounded-2xl p-8 backdrop-blur-sm">
      <div className="flex items-center space-x-3 mb-6">
        <MessageSquare className="w-8 h-8 text-cyan-400" />
        <h2 className="text-3xl font-bold text-white">Share Your Feedback</h2>
      </div>

      <p className="text-gray-300 mb-6 leading-relaxed">
        Found a bug, have a suggestion, or just want to tell us what you think? We value your input to help us improve PromptXera.
      </p>

      {/* --- What Makes Us Different --- */}
      <div className="mb-10 bg-black/30 border border-cyan-500/20 rounded-xl p-6">
        <h2 className="text-2xl font-bold text-center text-white mb-6">What Makes PromptXera Different</h2>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="p-4 bg-cyan-500/10 border border-cyan-500/30 rounded-lg">
            <h3 className="text-lg font-semibold text-cyan-400 mb-2">🎯 Practice-First Approach</h3>
            <p className="text-sm text-gray-300">
              Learn by doing. Every concept comes with hands-on challenges and real-time feedback.
            </p>
          </div>

          <div className="p-4 bg-pink-500/10 border border-pink-500/30 rounded-lg">
            <h3 className="text-lg font-semibold text-pink-400 mb-2">🚀 Cutting-Edge Content</h3>
            <p className="text-sm text-gray-300">
              Stay current with the latest AI tools, techniques, and industry developments.
            </p>
          </div>

          <div className="p-4 bg-purple-500/10 border border-purple-500/30 rounded-lg">
            <h3 className="text-lg font-semibold text-purple-400 mb-2">🏆 Community Recognition</h3>
            <p className="text-sm text-gray-300">
              Showcase your skills, compete in challenges, and join the hall of fame.
            </p>
          </div>

          <div className="p-4 bg-indigo-500/10 border border-indigo-500/30 rounded-lg">
            <h3 className="text-lg font-semibold text-indigo-400 mb-2">💡 Zero to Hero Path</h3>
            <p className="text-sm text-gray-300">
              Structured learning path from beginner basics to advanced techniques.
            </p>
          </div>
        </div>
      </div>

      {/* --- Redirect to Google Form --- */}
      <div className="text-center">
        <a
          href="https://docs.google.com/forms/d/e/1FAIpQLSesBKu4ZFQ3wD5XUeBIiyGbVpBhfFhtxWwhm85N2Iuese3emw/viewform?usp=preview"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block px-8 py-4 bg-gradient-to-r from-cyan-500 to-pink-500 rounded-lg font-semibold text-white hover:shadow-2xl hover:shadow-cyan-500/50 hover:scale-105 transition-all"
        >
          Open Feedback Form
        </a>
      </div>

      <div className="mt-6 text-center">
        <p className="text-gray-400 text-sm">
          You can also reach us directly at{' '}
          <a href="mailto:hello@promptXera.com" className="text-cyan-400 hover:underline">
            hello@promptXera.com
          </a>
        </p>
      </div>
    </div>
  </div>
</section>


    </div> // Correctly closes the main div that wraps the component content
  );
}