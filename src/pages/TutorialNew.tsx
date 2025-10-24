// ✅ TutorialNew.tsx (Updated for Minimal Gap)
import { useState, useEffect, useRef } from 'react';
import {
  ChevronDown,
  ChevronUp,
  Menu,
  X,
  Zap,
  Lightbulb,
  TrendingUp,
  AlertTriangle,
  BookOpen,
  Target,
  Code,
  ChevronLeft, 
  ChevronRight, 
} from 'lucide-react';
import tutorialsData from '../data/tutorials.json';

// --- Interfaces (No changes) ---
interface Technique {
  name: string;
  description?: string;
  example?: string;
}

interface ContentBlock {
  summary?: string;
  whatYouLearn?: string[];
  keyPoints?: string[];
  example?: string;
  exercise?: string;
  proTip?: string;
  commonMistake?: string;
  techniques?: Technique[];
}

interface Subtopic {
  id: string;
  title: string;
  content: ContentBlock;
}

interface MainTopic {
  id: string;
  title: string;
  description: string;
  subtopics: Subtopic[];
}

// --- Icons Map (No changes) ---
const sectionIcons: { [key: string]: React.ElementType } = {
  '📘 Summary': BookOpen,
  "📚 What You'll Learn": Lightbulb,
  '🎯 Key Points': Target,
  '💪 Exercise': TrendingUp,
  '🚀 Pro Tip': Zap,
  '⚠️ Common Mistake': AlertTriangle,
  'Code Block': Code,
};

const HEADER_HEIGHT_OFFSET = 'pt-[70px]';
const HEADER_HEIGHT = 'h-[70px]';

export default function TutorialPage() {
  const tutorials = tutorialsData as MainTopic[];

  const [activeMain, setActiveMain] = useState(0);
  const [activeSub, setActiveSub] = useState(0);
  const [openMain, setOpenMain] = useState<number | null>(0);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const contentRef = useRef<HTMLDivElement | null>(null);
  const sidebarRef = useRef<HTMLDivElement | null>(null);

  const mainTopic = tutorials[activeMain];
  const subtopic = mainTopic?.subtopics?.[activeSub];

  if (!mainTopic || !subtopic) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black text-red-400 text-lg">
        ⚠️ Invalid topic or subtopic data. Please check your tutorials.json file.
      </div>
    );
  }

  // --- Navigation Logic ---
  const maxSub = mainTopic.subtopics.length - 1;
  const maxMain = tutorials.length - 1;

  const isFirstSubtopic = activeSub === 0 && activeMain === 0;
  const isLastSubtopic = activeSub === maxSub && activeMain === maxMain;

  const goToNextSubtopic = () => {
    if (activeSub < maxSub) {
      setActiveSub(activeSub + 1);
    } else if (activeMain < maxMain) {
      setActiveMain(activeMain + 1);
      setActiveSub(0);
      setOpenMain(activeMain + 1);
    }
  };

  const goToPrevSubtopic = () => {
    if (activeSub > 0) {
      setActiveSub(activeSub - 1);
    } else if (activeMain > 0) {
      const prevMainIndex = activeMain - 1;
      setActiveMain(prevMainIndex);
      const prevSubCount = tutorials[prevMainIndex].subtopics.length - 1;
      setActiveSub(prevSubCount);
      setOpenMain(prevMainIndex);
    }
  };
  // ------------------------

  useEffect(() => {
    contentRef.current?.scrollTo({ top: 0, behavior: 'smooth' });
  }, [activeSub, activeMain]);

  useEffect(() => {
    const activeBtn = document.querySelector('.active-subtopic');
    if (activeBtn && sidebarRef.current) {
      activeBtn.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }, [activeSub, activeMain, sidebarOpen]);

  return (
    <div className="flex flex-col min-h-screen bg-black/95 text-gray-200">
      {/* === HEADER === */}
      <header
        className={`fixed top-0 left-0 w-full z-40 backdrop-blur-md bg-black/80 border-b border-cyan-500/30 shadow-xl ${HEADER_HEIGHT}`}
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between px-4 sm:px-6 h-full">
          <h1 className="text-xl font-bold text-cyan-400 flex items-center">
            <span className="text-2xl text-pink-500 mr-2">⚡</span>
            PromptXera
            <span className="text-sm font-normal text-gray-500 ml-2 hidden sm:inline">
              Roadmap
            </span>
          </h1>

          {/* --- Menu Button (Top Right, fallback) --- */}
          <button
            onClick={() => setSidebarOpen(true)}
            className="text-cyan-400 bg-cyan-500/10 border border-cyan-500/30 px-3 py-2 rounded-lg hover:bg-cyan-500/20 transition lg:hidden"
          >
            Menu
          </button>
        </div>
      </header>

      {/* === MAIN LAYOUT === */}
      <div className={`flex flex-1 ${HEADER_HEIGHT_OFFSET}`}>
        {/* --- DESKTOP SIDEBAR --- */}
        <aside className="hidden lg:block fixed left-0 top-[70px] w-72 h-[calc(100vh-70px)] bg-gradient-to-b from-cyan-900/30 to-black/70 backdrop-blur-md border-r border-cyan-500/30 shadow-lg overflow-hidden">
          <div ref={sidebarRef} className="h-full overflow-y-auto scrollbar-thin scrollbar-thumb-cyan-500/40">
            <Sidebar
              {...{
                tutorials,
                activeMain,
                activeSub,
                openMain,
                setOpenMain,
                setActiveMain,
                setActiveSub,
              }}
            />
          </div>
        </aside>

        {/* --- MOBILE SIDEBAR --- */}
        {sidebarOpen && (
          <div className="fixed inset-0 z-50 flex">
            <div
              className="w-72 bg-gradient-to-b from-cyan-900/40 to-black/80 backdrop-blur-md border-r border-cyan-500/30 shadow-xl p-4 overflow-y-auto"
              ref={sidebarRef}
            >
              <div className="flex justify-between items-center mb-3">
                <h2 className="text-cyan-400 font-semibold text-lg">Tutorials</h2>
                <button onClick={() => setSidebarOpen(false)} className="text-gray-400 hover:text-cyan-400">
                  <X className="w-6 h-6" />
                </button>
              </div>
              <Sidebar
                tutorials={tutorials}
                activeMain={activeMain}
                activeSub={activeSub}
                openMain={openMain}
                setOpenMain={setOpenMain}
                setActiveMain={(i: number) => {
                  setActiveMain(i);
                  setActiveSub(0);
                  setSidebarOpen(false);
                }}
                setActiveSub={(j: number) => {
                  setActiveSub(j);
                  setSidebarOpen(false);
                }}
              />
            </div>
            <div className="flex-1 bg-black/60 backdrop-blur-sm" onClick={() => setSidebarOpen(false)} />
          </div>
        )}

        {/* === CONTENT === */}
        <main
          ref={contentRef}
          className="flex-1 lg:ml-72 overflow-y-auto h-[calc(100vh-70px)] px-4 sm:px-8 lg:px-12 py-8 scroll-smooth scrollbar-thin scrollbar-thumb-cyan-500/40 scrollbar-track-transparent"
          style={{ scrollPaddingTop: '20px' }}
        >
          {/* STICKY MENU BUTTON - Adjusted to top-0 for minimal gap */}
          {!sidebarOpen && (
            <button
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden **sticky top-0** left-4 z-40 px-4 py-2 bg-cyan-600/40 border border-cyan-400/40 rounded-full shadow-lg backdrop-blur-md hover:bg-cyan-600/60 transition"
            >
              Menu
            </button>
          )}

          {/* Adjusted top margin of h2 to mt-2 to pull content up */}
          <h2 className="text-3xl font-bold text-cyan-400 mb-2 mt-2">{mainTopic.title}</h2>
          <p className="text-gray-400 mb-8">{mainTopic.description}</p>

          <h3 className="text-2xl font-semibold text-pink-400 mb-6">{subtopic.title}</h3>

          <div className="space-y-6">
            <Card title="📘 Summary" color="cyan" icon={sectionIcons['📘 Summary']}>
              {subtopic.content.summary}
            </Card>
            <ListCard
              title="📚 What You'll Learn"
              color="cyan"
              icon={sectionIcons["📚 What You'll Learn"]}
              items={subtopic.content.whatYouLearn}
            />
            <ListCard
              title="🎯 Key Points"
              color="pink"
              icon={sectionIcons['🎯 Key Points']}
              items={subtopic.content.keyPoints}
            />
            <CodeBlock code={subtopic.content.example} />
            <NoteCard title="💪 Exercise" color="yellow" icon={sectionIcons['💪 Exercise']}>
              {subtopic.content.exercise}
            </NoteCard>
            <NoteCard title="🚀 Pro Tip" color="green" icon={sectionIcons['🚀 Pro Tip']}>
              {subtopic.content.proTip}
            </NoteCard>
            <NoteCard title="⚠️ Common Mistake" color="red" icon={sectionIcons['⚠️ Common Mistake']}>
              {subtopic.content.commonMistake}
            </NoteCard>
          </div>

          {/* PREV/NEXT BUTTONS */}
          <div className="flex justify-between mt-12 pt-6 border-t border-cyan-500/20">
            <button
              onClick={goToPrevSubtopic}
              disabled={isFirstSubtopic}
              className={`flex items-center px-4 py-2 rounded-lg transition ${
                isFirstSubtopic
                  ? 'bg-gray-700/50 text-gray-500 cursor-not-allowed'
                  : 'bg-pink-600/30 text-pink-200 hover:bg-pink-600/50'
              }`}
            >
              <ChevronLeft className="w-5 h-5 mr-2" />
              Prev: Subtopic
            </button>

            <button
              onClick={goToNextSubtopic}
              disabled={isLastSubtopic}
              className={`flex items-center px-4 py-2 rounded-lg transition ${
                isLastSubtopic
                  ? 'bg-gray-700/50 text-gray-500 cursor-not-allowed'
                  : 'bg-cyan-600/30 text-cyan-200 hover:bg-cyan-600/50'
              }`}
            >
              Next: Subtopic
              <ChevronRight className="w-5 h-5 ml-2" />
            </button>
          </div>
        </main>
      </div>
    </div>
  );
}

/* --- SIDEBAR COMPONENT (No changes) --- */
function Sidebar({
  tutorials,
  activeMain,
  activeSub,
  openMain,
  setOpenMain,
  setActiveMain,
  setActiveSub,
}: any) {
  return (
    <div className="space-y-3 p-4">
      {tutorials.map((topic: MainTopic, i: number) => (
        <div key={topic.id}>
          <button
            onClick={() => setOpenMain(openMain === i ? null : i)}
            className={`w-full flex justify-between items-center px-3 py-2 rounded-lg text-left font-semibold transition-colors ${
              i === activeMain
                ? 'bg-gradient-to-r from-cyan-600/40 to-pink-600/30 text-white shadow-lg'
                : 'hover:bg-white/5 text-gray-400'
            }`}
          >
            <span>{topic.title}</span>
            {openMain === i ? (
              <ChevronUp className="w-4 h-4 text-cyan-400" />
            ) : (
              <ChevronDown className="w-4 h-4 text-cyan-400" />
            )}
          </button>

          {openMain === i && (
            <div className="ml-2 mt-1 space-y-1 border-l border-cyan-500/20 pl-2">
              {topic.subtopics?.map((sub: Subtopic, j: number) => (
                <button
                  key={sub.id}
                  onClick={() => {
                    setActiveMain(i);
                    setActiveSub(j);
                  }}
                  className={`w-full text-left px-3 py-1.5 rounded-md text-sm transition-all ${
                    activeMain === i && activeSub === j
                      ? 'bg-cyan-500/30 text-cyan-200 font-medium active-subtopic'
                      : 'hover:bg-white/5 text-gray-400'
                  }`}
                >
                  {sub.title}
                </button>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

/* --- CARD COMPONENTS (No changes) --- */
const getColorClasses = (color: string) => {
  switch (color) {
    case 'cyan':
      return { border: 'border-cyan-500', bg: 'bg-cyan-500/10', text: 'text-cyan-400', shadow: 'shadow-cyan-500/20' };
    case 'pink':
      return { border: 'border-pink-500', bg: 'bg-pink-500/10', text: 'text-pink-400', shadow: 'shadow-pink-500/20' };
    case 'yellow':
      return { border: 'border-yellow-500', bg: 'bg-yellow-500/10', text: 'text-yellow-400', shadow: 'shadow-yellow-500/20' };
    case 'green':
      return { border: 'border-green-500', bg: 'bg-green-500/10', text: 'text-green-400', shadow: 'shadow-green-500/20' };
    case 'red':
      return { border: 'border-red-500', bg: 'bg-red-500/10', text: 'text-red-400', shadow: 'shadow-red-500/20' };
    default:
      return {};
  }
};

function Card({ title, color, icon: Icon, children }: any) {
  if (!children) return null;
  const { border, text, shadow } = getColorClasses(color);
  return (
    <div className={`p-4 rounded-xl bg-black/50 border ${border} shadow-lg ${shadow} transition-all`}>
      <div className="flex items-center mb-3">
        {Icon && <Icon className={`w-5 h-5 mr-3 ${text}`} />}
        <h4 className={`text-lg font-semibold ${text}`}>{title.split(' ')[1]}</h4>
      </div>
      <p className="text-gray-300 ml-8">{children}</p>
    </div>
  );
}

function ListCard({ title, color, icon: Icon, items }: any) {
  if (!Array.isArray(items) || items.length === 0) return null;
  const { border, text, shadow } = getColorClasses(color);
  return (
    <div className={`p-4 rounded-xl bg-black/50 border ${border} shadow-lg ${shadow} transition-all`}>
      <div className="flex items-center mb-3">
        {Icon && <Icon className={`w-5 h-5 mr-3 ${text}`} />}
        <h4 className={`text-lg font-semibold ${text}`}>{title.split(' ')[1]}</h4>
      </div>
      <ul className="list-disc list-inside text-gray-300 space-y-2 ml-8">
        {items.map((item: string, i: number) => (
          <li key={i}>{item}</li>
        ))}
      </ul>
    </div>
  );
}

function NoteCard({ title, color, icon: Icon, children }: any) {
  if (!children) return null;
  const { border, bg, text } = getColorClasses(color);
  return (
    <div className={`p-4 rounded-xl ${bg} border ${border} shadow-inner shadow-black/50 transition-all`}>
      <div className="flex items-center mb-2">
        {Icon && <Icon className={`w-5 h-5 mr-3 ${text}`} />}
        <h4 className={`text-lg font-semibold ${text}`}>{title.split(' ')[1]}</h4>
      </div>
      <p className="text-gray-300 ml-8">{children}</p>
    </div>
  );
}

function CodeBlock({ code }: any) {
  if (!code) return null;
  return (
    <pre className="bg-black/80 border border-cyan-500/50 p-4 rounded-xl text-gray-200 text-sm overflow-x-auto whitespace-pre-wrap shadow-2xl">
      <code className="font-mono">{code}</code>
    </pre>
  );
}