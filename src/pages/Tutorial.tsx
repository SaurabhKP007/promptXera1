import { useEffect, useState } from 'react';
import { BookOpen, ChevronRight } from 'lucide-react';

export default function Tutorial() {
  const [activeSection, setActiveSection] = useState('intro');

  const sections = [
    {
      id: 'intro',
      title: 'Introduction to Prompt Engineering',
      content: `
        <h3 class="text-2xl font-bold text-white mb-4">What is Prompt Engineering?</h3>
        <p class="text-gray-300 mb-4 leading-relaxed">
          Prompt engineering is the art and science of crafting effective instructions for AI language models.
          It's the bridge between human intent and AI understanding, enabling you to get better, more accurate,
          and more useful responses from AI systems.
        </p>
        <p class="text-gray-300 mb-4 leading-relaxed">
          Think of it as learning a new language - one that helps you communicate clearly with AI assistants
          like ChatGPT, Claude, and others. The better your prompts, the better the AI's responses.
        </p>
        <div class="bg-cyan-500/10 border border-cyan-500/30 rounded-lg p-4 mb-4">
          <p class="text-cyan-400 font-semibold mb-2">Key Benefits:</p>
          <ul class="text-gray-300 space-y-2">
            <li>• Get more accurate and relevant responses</li>
            <li>• Save time by reducing back-and-forth clarifications</li>
            <li>• Unlock advanced AI capabilities you didn't know existed</li>
            <li>• Increase productivity across writing, coding, analysis, and more</li>
          </ul>
        </div>
      `
    },
    {
      id: 'zero-shot',
      title: 'Zero-Shot Prompting',
      content: `
        <h3 class="text-2xl font-bold text-white mb-4">Zero-Shot Prompting</h3>
        <p class="text-gray-300 mb-4 leading-relaxed">
          Zero-shot prompting is the simplest form of prompt engineering. You give the AI a task without
          providing any examples. The model relies entirely on its pre-trained knowledge.
        </p>
        <div class="bg-black/30 border border-cyan-500/20 rounded-lg p-4 mb-4">
          <p class="text-sm text-gray-400 mb-2">Example:</p>
          <p class="text-gray-200 font-mono text-sm">
            "Translate this sentence to French: I love learning new things."
          </p>
        </div>
        <p class="text-gray-300 mb-4 leading-relaxed">
          <span class="text-cyan-400 font-semibold">When to use:</span> Simple tasks, straightforward questions,
          or when you want quick answers without providing context.
        </p>
        <div class="bg-pink-500/10 border border-pink-500/30 rounded-lg p-4">
          <p class="text-pink-400 font-semibold mb-2">Pro Tips:</p>
          <ul class="text-gray-300 space-y-2 text-sm">
            <li>• Be clear and specific about what you want</li>
            <li>• Use action verbs like "explain," "summarize," "create"</li>
            <li>• Keep it concise for better results</li>
          </ul>
        </div>
      `
    },
    {
      id: 'few-shot',
      title: 'Few-Shot Prompting',
      content: `
        <h3 class="text-2xl font-bold text-white mb-4">Few-Shot Prompting</h3>
        <p class="text-gray-300 mb-4 leading-relaxed">
          Few-shot prompting involves providing the AI with a few examples before asking it to perform a task.
          This helps the model understand the pattern or format you want.
        </p>
        <div class="bg-black/30 border border-cyan-500/20 rounded-lg p-4 mb-4">
          <p class="text-sm text-gray-400 mb-2">Example:</p>
          <div class="text-gray-200 font-mono text-sm space-y-2">
            <p>Positive review: This product is amazing! → Sentiment: Positive</p>
            <p>Negative review: Terrible experience → Sentiment: Negative</p>
            <p>Now classify: The quality exceeded my expectations → Sentiment: ?</p>
          </div>
        </div>
        <p class="text-gray-300 mb-4 leading-relaxed">
          <span class="text-cyan-400 font-semibold">When to use:</span> Complex tasks, specific formats,
          or when zero-shot results aren't accurate enough.
        </p>
        <div class="bg-yellow-500/10 border border-yellow-500/30 rounded-lg p-4">
          <p class="text-yellow-400 font-semibold mb-2">Best Practices:</p>
          <ul class="text-gray-300 space-y-2 text-sm">
            <li>• Provide 2-5 diverse examples</li>
            <li>• Ensure examples are representative of the task</li>
            <li>• Maintain consistent formatting across examples</li>
          </ul>
        </div>
      `
    },
    {
      id: 'chain-of-thought',
      title: 'Chain-of-Thought',
      content: `
        <h3 class="text-2xl font-bold text-white mb-4">Chain-of-Thought Prompting</h3>
        <p class="text-gray-300 mb-4 leading-relaxed">
          Chain-of-thought prompting encourages the AI to break down complex problems into steps,
          showing its reasoning process. This dramatically improves accuracy on complex tasks.
        </p>
        <div class="bg-black/30 border border-cyan-500/20 rounded-lg p-4 mb-4">
          <p class="text-sm text-gray-400 mb-2">Example:</p>
          <div class="text-gray-200 font-mono text-sm">
            <p class="mb-2">"Solve this problem step by step:</p>
            <p class="mb-2">A store has 15 apples. They sell 7 in the morning and 4 in the afternoon.</p>
            <p>How many apples are left? Show your work."</p>
          </div>
        </div>
        <p class="text-gray-300 mb-4 leading-relaxed">
          <span class="text-cyan-400 font-semibold">When to use:</span> Math problems, logical reasoning,
          complex analysis, or when you need to verify the AI's thinking process.
        </p>
        <div class="bg-green-500/10 border border-green-500/30 rounded-lg p-4">
          <p class="text-green-400 font-semibold mb-2">Key Phrases:</p>
          <ul class="text-gray-300 space-y-2 text-sm">
            <li>• "Let's think step by step"</li>
            <li>• "Show your reasoning"</li>
            <li>• "Break this down into parts"</li>
            <li>• "Explain your thought process"</li>
          </ul>
        </div>
      `
    },
    {
      id: 'role-prompting',
      title: 'Role Prompting',
      content: `
        <h3 class="text-2xl font-bold text-white mb-4">Role Prompting</h3>
        <p class="text-gray-300 mb-4 leading-relaxed">
          Role prompting assigns the AI a specific persona or expertise level. This helps tailor
          the response style, depth, and perspective to your needs.
        </p>
        <div class="bg-black/30 border border-cyan-500/20 rounded-lg p-4 mb-4">
          <p class="text-sm text-gray-400 mb-2">Example:</p>
          <div class="text-gray-200 font-mono text-sm">
            <p>"You are an experienced software architect. Explain microservices</p>
            <p>architecture to a junior developer."</p>
          </div>
        </div>
        <p class="text-gray-300 mb-4 leading-relaxed">
          <span class="text-cyan-400 font-semibold">Popular roles:</span> Expert, Teacher, Critic,
          Creative Writer, Data Analyst, Code Reviewer, and more.
        </p>
        <div class="bg-purple-500/10 border border-purple-500/30 rounded-lg p-4">
          <p class="text-purple-400 font-semibold mb-2">Effective Role Prompts:</p>
          <ul class="text-gray-300 space-y-2 text-sm">
            <li>• "As a [role], [task]"</li>
            <li>• "Act as a [profession] with [X] years of experience"</li>
            <li>• "Imagine you're a [character/expert]"</li>
          </ul>
        </div>
      `
    },
    {
      id: 'instruction',
      title: 'Instruction Prompting',
      content: `
        <h3 class="text-2xl font-bold text-white mb-4">Instruction Prompting</h3>
        <p class="text-gray-300 mb-4 leading-relaxed">
          Instruction prompting gives clear, direct commands about what you want and how you want it.
          It's about being explicit with format, length, style, and constraints.
        </p>
        <div class="bg-black/30 border border-cyan-500/20 rounded-lg p-4 mb-4">
          <p class="text-sm text-gray-400 mb-2">Example:</p>
          <div class="text-gray-200 font-mono text-sm">
            <p>"Summarize this article in 3 bullet points.</p>
            <p>Each bullet should be under 20 words.</p>
            <p>Focus on actionable insights only."</p>
          </div>
        </div>
        <p class="text-gray-300 mb-4 leading-relaxed">
          <span class="text-cyan-400 font-semibold">Components:</span> Task description, output format,
          constraints, tone, and any special requirements.
        </p>
        <div class="bg-blue-500/10 border border-blue-500/30 rounded-lg p-4">
          <p class="text-blue-400 font-semibold mb-2">Structure Template:</p>
          <ul class="text-gray-300 space-y-2 text-sm">
            <li>1. What to do (the task)</li>
            <li>2. How to do it (the method)</li>
            <li>3. What format (the output)</li>
            <li>4. Any constraints (limits, style, etc.)</li>
          </ul>
        </div>
      `
    },
    {
      id: 'advanced',
      title: 'Advanced Techniques',
      content: `
        <h3 class="text-2xl font-bold text-white mb-4">Advanced Prompt Engineering</h3>
        <p class="text-gray-300 mb-4 leading-relaxed">
          Once you master the basics, these advanced techniques will take your prompting to the next level.
        </p>

        <div class="space-y-4 mb-6">
          <div class="bg-gradient-to-r from-cyan-500/10 to-pink-500/10 border border-cyan-500/30 rounded-lg p-4">
            <h4 class="text-cyan-400 font-semibold mb-2">Meta Prompting</h4>
            <p class="text-gray-300 text-sm">Ask the AI to generate prompts for you or improve your existing prompts.</p>
          </div>

          <div class="bg-gradient-to-r from-pink-500/10 to-yellow-500/10 border border-pink-500/30 rounded-lg p-4">
            <h4 class="text-pink-400 font-semibold mb-2">Constrained Generation</h4>
            <p class="text-gray-300 text-sm">Set specific constraints like word count, format, or forbidden words.</p>
          </div>

          <div class="bg-gradient-to-r from-yellow-500/10 to-green-500/10 border border-yellow-500/30 rounded-lg p-4">
            <h4 class="text-yellow-400 font-semibold mb-2">Multi-Step Prompting</h4>
            <p class="text-gray-300 text-sm">Break complex tasks into a series of connected prompts.</p>
          </div>

          <div class="bg-gradient-to-r from-green-500/10 to-cyan-500/10 border border-green-500/30 rounded-lg p-4">
            <h4 class="text-green-400 font-semibold mb-2">Self-Consistency</h4>
            <p class="text-gray-300 text-sm">Ask the AI to generate multiple answers and synthesize the best one.</p>
          </div>
        </div>

        <div class="bg-black/30 border border-cyan-500/20 rounded-lg p-4">
          <p class="text-cyan-400 font-semibold mb-3">Pro Challenge:</p>
          <p class="text-gray-300 text-sm leading-relaxed">
            Combine multiple techniques in a single prompt. For example: Use role prompting + chain-of-thought +
            instruction prompting to create powerful, comprehensive prompts that leverage the strengths of each approach.
          </p>
        </div>
      `
    },
    {
      id: 'real-world',
      title: 'Real-World Applications',
      content: `
        <h3 class="text-2xl font-bold text-white mb-4">Real-World Applications</h3>
        <p class="text-gray-300 mb-4 leading-relaxed">
          Let's explore how prompt engineering applies to everyday tasks and professional scenarios.
        </p>

        <div class="space-y-6">
          <div>
            <h4 class="text-xl font-semibold text-cyan-400 mb-3">Content Creation</h4>
            <p class="text-gray-300 mb-2">Generate blog posts, social media content, marketing copy, and more.</p>
            <div class="bg-black/30 border border-cyan-500/20 rounded-lg p-3">
              <p class="text-gray-200 text-sm font-mono">
                "Write a LinkedIn post about AI trends in 2025. Tone: Professional yet approachable.
                Include 3 key insights and end with a thought-provoking question. Max 150 words."
              </p>
            </div>
          </div>

          <div>
            <h4 class="text-xl font-semibold text-pink-400 mb-3">Code Development</h4>
            <p class="text-gray-300 mb-2">Debug code, generate functions, explain complex algorithms.</p>
            <div class="bg-black/30 border border-pink-500/20 rounded-lg p-3">
              <p class="text-gray-200 text-sm font-mono">
                "Review this Python function for bugs and performance issues. Suggest optimizations
                and explain your recommendations."
              </p>
            </div>
          </div>

          <div>
            <h4 class="text-xl font-semibold text-yellow-400 mb-3">Data Analysis</h4>
            <p class="text-gray-300 mb-2">Interpret data, generate insights, create visualizations.</p>
            <div class="bg-black/30 border border-yellow-500/20 rounded-lg p-3">
              <p class="text-gray-200 text-sm font-mono">
                "Analyze this sales data and identify top 3 trends. Provide actionable recommendations
                for Q2. Format as executive summary."
              </p>
            </div>
          </div>

          <div>
            <h4 class="text-xl font-semibold text-green-400 mb-3">Learning & Education</h4>
            <p class="text-gray-300 mb-2">Create study guides, explain concepts, generate practice questions.</p>
            <div class="bg-black/30 border border-green-500/20 rounded-lg p-3">
              <p class="text-gray-200 text-sm font-mono">
                "Explain quantum computing to a high school student. Use analogies, avoid jargon,
                and include 3 real-world applications."
              </p>
            </div>
          </div>
        </div>
      `
    }
  ];

  useEffect(() => {
    const handleScroll = () => {
      const sectionElements = sections.map(s => document.getElementById(s.id));
      const scrollPosition = window.scrollY + 200;

      for (let i = sectionElements.length - 1; i >= 0; i--) {
        const element = sectionElements[i];
        if (element && element.offsetTop <= scrollPosition) {
          setActiveSection(sections[i].id);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  function scrollToSection(id: string) {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }

  return (
    <div className="relative z-10 min-h-screen pt-20 px-4 pb-12">
      <div className="max-w-7xl mx-auto">
        <div className="mb-12 text-center">
          <div className="flex items-center justify-center space-x-3 mb-4">
            <BookOpen className="w-10 h-10 text-cyan-400" />
            <h1 className="text-5xl font-bold bg-gradient-to-r from-cyan-400 to-pink-400 bg-clip-text text-transparent">
              Master Prompting
            </h1>
          </div>
          <p className="text-gray-300 text-lg">Your comprehensive guide to prompt engineering excellence</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <aside className="lg:sticky lg:top-24 h-fit bg-gradient-to-br from-white/5 to-white/0 border border-cyan-500/30 rounded-2xl p-6 backdrop-blur-sm">
            <h3 className="text-white font-semibold mb-4">Contents</h3>
            <nav className="space-y-2">
              {sections.map((section) => (
                <button
                  key={section.id}
                  onClick={() => scrollToSection(section.id)}
                  className={`w-full text-left px-4 py-2 rounded-lg transition-all flex items-center justify-between group ${
                    activeSection === section.id
                      ? 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/30'
                      : 'text-gray-400 hover:text-cyan-400 hover:bg-white/5'
                  }`}
                >
                  <span className="text-sm">{section.title}</span>
                  <ChevronRight className={`w-4 h-4 transition-transform ${
                    activeSection === section.id ? 'translate-x-1' : 'group-hover:translate-x-1'
                  }`} />
                </button>
              ))}
            </nav>
          </aside>

          <div className="lg:col-span-3 space-y-12">
            {sections.map((section) => (
              <section
                key={section.id}
                id={section.id}
                className="bg-gradient-to-br from-white/5 to-white/0 border border-cyan-500/30 rounded-2xl p-8 backdrop-blur-sm scroll-mt-24"
              >
                <div dangerouslySetInnerHTML={{ __html: section.content }} />
              </section>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
