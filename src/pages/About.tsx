/*
import { Target, Users, Zap, MessageSquare } from 'lucide-react';

export default function About() {
  return (
    <div className="relative z-10 min-h-screen pt-20 px-4 pb-12">
      <div className="max-w-5xl mx-auto">
        <div className="mb-12 text-center">
          <h1 className="text-5xl font-bold bg-gradient-to-r from-cyan-400 to-pink-400 bg-clip-text text-transparent mb-4">
            About PromptLab
          </h1>
          <p className="text-gray-300 text-lg">Empowering the next generation of AI practitioners</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          <div className="group bg-gradient-to-br from-cyan-500/10 to-white/0 border border-cyan-500/30 rounded-2xl p-6 backdrop-blur-sm hover:border-cyan-500/50 hover:scale-105 transition-all">
            <div className="w-16 h-16 bg-gradient-to-br from-cyan-400 to-pink-400 rounded-lg flex items-center justify-center mb-4">
              <Target className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-xl font-bold text-white mb-3">Our Mission</h3>
            <p className="text-gray-300 leading-relaxed">
              To democratize prompt engineering education and make advanced AI skills accessible to everyone,
              from beginners to experts.
            </p>
          </div>

          <div className="group bg-gradient-to-br from-pink-500/10 to-white/0 border border-pink-500/30 rounded-2xl p-6 backdrop-blur-sm hover:border-pink-500/50 hover:scale-105 transition-all">
            <div className="w-16 h-16 bg-gradient-to-br from-pink-400 to-yellow-400 rounded-lg flex items-center justify-center mb-4">
              <Zap className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-xl font-bold text-white mb-3">Our Vision</h3>
            <p className="text-gray-300 leading-relaxed">
              A world where humans and AI collaborate seamlessly, powered by effective communication
              through expertly crafted prompts.
            </p>
          </div>

          <div className="group bg-gradient-to-br from-yellow-500/10 to-white/0 border border-yellow-500/30 rounded-2xl p-6 backdrop-blur-sm hover:border-yellow-500/50 hover:scale-105 transition-all">
            <div className="w-16 h-16 bg-gradient-to-br from-yellow-400 to-cyan-400 rounded-lg flex items-center justify-center mb-4">
              <Users className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-xl font-bold text-white mb-3">Our Community</h3>
            <p className="text-gray-300 leading-relaxed">
              Join thousands of prompt engineers learning, practicing, and sharing knowledge in our
              vibrant global community.
            </p>
          </div>
        </div>

        <div className="bg-gradient-to-br from-white/5 to-white/0 border border-cyan-500/30 rounded-2xl p-8 backdrop-blur-sm mb-12">
          <h2 className="text-3xl font-bold text-white mb-6">What We Offer</h2>

          <div className="space-y-6">
            <div className="flex items-start space-x-4">
              <div className="w-12 h-12 bg-cyan-500/20 rounded-lg flex items-center justify-center flex-shrink-0">
                <span className="text-cyan-400 text-xl font-bold">01</span>
              </div>
              <div>
                <h4 className="text-xl font-semibold text-white mb-2">Hands-On Practice</h4>
                <p className="text-gray-300 leading-relaxed">
                  Over 50 carefully designed prompts covering all major techniques from zero-shot to advanced
                  chain-of-thought reasoning. Get instant feedback with our 8-technique evaluation engine.
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <div className="w-12 h-12 bg-pink-500/20 rounded-lg flex items-center justify-center flex-shrink-0">
                <span className="text-pink-400 text-xl font-bold">02</span>
              </div>
              <div>
                <h4 className="text-xl font-semibold text-white mb-2">Expert Tutorials</h4>
                <p className="text-gray-300 leading-relaxed">
                  Comprehensive guides covering everything from basics to advanced techniques. Learn at your
                  own pace with real-world examples and best practices from industry leaders.
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <div className="w-12 h-12 bg-yellow-500/20 rounded-lg flex items-center justify-center flex-shrink-0">
                <span className="text-yellow-400 text-xl font-bold">03</span>
              </div>
              <div>
                <h4 className="text-xl font-semibold text-white mb-2">AI Tools Directory</h4>
                <p className="text-gray-300 leading-relaxed">
                  Discover and explore the latest AI tools and platforms. Stay updated with cutting-edge
                  technology and find the perfect tools for your projects.
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <div className="w-12 h-12 bg-green-500/20 rounded-lg flex items-center justify-center flex-shrink-0">
                <span className="text-green-400 text-xl font-bold">04</span>
              </div>
              <div>
                <h4 className="text-xl font-semibold text-white mb-2">Prompt Legends</h4>
                <p className="text-gray-300 leading-relaxed">
                  Learn from the best. Get inspired by top prompt engineers worldwide and discover their
                  winning strategies and techniques.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-r from-cyan-500/10 to-pink-500/10 border border-cyan-500/30 rounded-2xl p-8 backdrop-blur-sm">
          <div className="flex items-center space-x-3 mb-6">
            <MessageSquare className="w-8 h-8 text-cyan-400" />
            <h2 className="text-3xl font-bold text-white">We Value Your Feedback</h2>
          </div>

          <p className="text-gray-300 mb-6 leading-relaxed">
            Your input helps us improve and grow. Whether you have suggestions, found a bug, or just want to
            share your experience, we'd love to hear from you.
          </p>

          <div className="bg-black/30 border border-cyan-500/20 rounded-lg p-6">
            <h3 className="text-white font-semibold mb-4">Share Your Thoughts</h3>

            <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
              <div>
                <label className="block text-gray-300 text-sm mb-2">Name</label>
                <input
                  type="text"
                  className="w-full px-4 py-3 bg-white/5 border border-cyan-500/30 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-cyan-500/50 transition-colors"
                  placeholder="Your name"
                />
              </div>

              <div>
                <label className="block text-gray-300 text-sm mb-2">Email</label>
                <input
                  type="email"
                  className="w-full px-4 py-3 bg-white/5 border border-cyan-500/30 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-cyan-500/50 transition-colors"
                  placeholder="your.email@example.com"
                />
              </div>

              <div>
                <label className="block text-gray-300 text-sm mb-2">Feedback Type</label>
                <select className="w-full px-4 py-3 bg-white/5 border border-cyan-500/30 rounded-lg text-white focus:outline-none focus:border-cyan-500/50 transition-colors">
                  <option value="suggestion">Suggestion</option>
                  <option value="bug">Bug Report</option>
                  <option value="feature">Feature Request</option>
                  <option value="general">General Feedback</option>
                </select>
              </div>

              <div>
                <label className="block text-gray-300 text-sm mb-2">Message</label>
                <textarea
                  rows={5}
                  className="w-full px-4 py-3 bg-white/5 border border-cyan-500/30 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-cyan-500/50 transition-colors resize-none"
                  placeholder="Tell us what you think..."
                ></textarea>
              </div>

              <button
                type="submit"
                className="w-full px-8 py-4 bg-gradient-to-r from-cyan-500 to-pink-500 rounded-lg font-semibold text-white hover:shadow-2xl hover:shadow-cyan-500/50 hover:scale-105 transition-all"
              >
                Submit Feedback
              </button>
            </form>
          </div>

          <div className="mt-6 text-center">
            <p className="text-gray-400 text-sm">
              You can also reach us at{' '}
              <a href="mailto:hello@promptlab.ai" className="text-cyan-400 hover:underline">
                hello@promptlab.ai
              </a>
            </p>
          </div>
        </div>

        <div className="mt-12 text-center">
          <p className="text-gray-400 leading-relaxed max-w-3xl mx-auto">
            Built with passion by AI enthusiasts, for AI enthusiasts. PromptLab is an open platform
            dedicated to advancing the field of prompt engineering through education, practice, and community.
          </p>
        </div>
      </div>
    </div>
  );
}
*/

import { motion } from 'framer-motion';
import { Zap, Target, Heart, MessageSquare } from 'lucide-react';
import { GlassCard } from '@/components/shared/GlassCard';
import { NeonButton } from '@/components/shared/NeonButton';

export default function About() {
  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="container mx-auto px-4 max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 mb-6">
            <Zap className="w-12 h-12 text-neon-cyan animate-pulse-glow" />
            <h1 className="text-5xl md:text-6xl font-space font-bold text-gradient-cyber">
              PromptXera
            </h1>
          </div>
          
          <p className="text-2xl text-gradient-cyan-pink font-medium">
            The Future of AI Communication
          </p>
        </motion.div>

        {/* Vision */}
        <GlassCard className="mb-8">
          <div className="flex items-start gap-4">
            <Target className="w-8 h-8 text-neon-cyan flex-shrink-0" />
            <div>
              <h2 className="text-2xl font-space font-bold mb-4">Our Vision</h2>
              <p className="text-foreground/90 mb-4">
                PromptXera envisions a world where every individual can effectively communicate with AI systems, 
                unlocking unprecedented levels of creativity, productivity, and innovation. We believe prompt 
                engineering is not just a technical skill—it's the literacy of the AI age.
              </p>
              <p className="text-foreground/90">
                By democratizing access to world-class prompt engineering education and practice, we're empowering 
                the next generation of AI communicators to shape the future of human-AI collaboration.
              </p>
            </div>
          </div>
        </GlassCard>

        {/* Mission */}
        <GlassCard className="mb-8">
          <div className="flex items-start gap-4">
            <Heart className="w-8 h-8 text-neon-pink flex-shrink-0" />
            <div>
              <h2 className="text-2xl font-space font-bold mb-4">Our Mission</h2>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <span className="text-primary text-xl">•</span>
                  <span className="text-foreground/90">
                    <strong>Educate:</strong> Provide comprehensive, accessible tutorials that transform beginners 
                    into prompt engineering experts.
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-primary text-xl">•</span>
                  <span className="text-foreground/90">
                    <strong>Practice:</strong> Offer hands-on challenges that build real-world skills through 
                    interactive learning and instant feedback.
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-primary text-xl">•</span>
                  <span className="text-foreground/90">
                    <strong>Inspire:</strong> Celebrate the pioneers and innovators who are pushing the boundaries 
                    of what's possible with AI.
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-primary text-xl">•</span>
                  <span className="text-foreground/90">
                    <strong>Connect:</strong> Build a global community of prompt engineers sharing knowledge, 
                    techniques, and breakthroughs.
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </GlassCard>

        {/* What Makes Us Different */}
        <GlassCard className="mb-8">
          <h2 className="text-2xl font-space font-bold mb-6 text-center">What Makes PromptXera Different</h2>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div className="p-4 bg-primary/10 border border-primary/30 rounded-lg">
              <h3 className="text-lg font-semibold text-primary mb-2">🎯 Practice-First Approach</h3>
              <p className="text-sm text-foreground/90">
                Learn by doing. Every concept comes with hands-on challenges and real-time feedback.
              </p>
            </div>

            <div className="p-4 bg-secondary/10 border border-secondary/30 rounded-lg">
              <h3 className="text-lg font-semibold text-secondary mb-2">🚀 Cutting-Edge Content</h3>
              <p className="text-sm text-foreground/90">
                Stay current with the latest AI tools, techniques, and industry developments.
              </p>
            </div>

            <div className="p-4 bg-accent/10 border border-accent/30 rounded-lg">
              <h3 className="text-lg font-semibold text-accent mb-2">🏆 Community Recognition</h3>
              <p className="text-sm text-foreground/90">
                Showcase your skills, compete in challenges, and join the hall of fame.
              </p>
            </div>

            <div className="p-4 bg-neon-purple/10 border border-neon-purple/30 rounded-lg">
              <h3 className="text-lg font-semibold text-neon-purple mb-2">💡 Zero to Hero Path</h3>
              <p className="text-sm text-foreground/90">
                Structured learning path from beginner basics to advanced techniques.
              </p>
            </div>
          </div>
        </GlassCard>

        {/* Feedback Form */}
        <GlassCard className="text-center">
          <div className="flex flex-col items-center">
            <MessageSquare className="w-12 h-12 text-neon-gold mb-4" />
            <h2 className="text-2xl font-space font-bold mb-3">We Value Your Feedback</h2>
            <p className="text-foreground/90 mb-6 max-w-2xl">
              Help us improve PromptXera! Share your suggestions, report issues, or let us know what features 
              you'd like to see next.
            </p>
            
            <a
              href="https://forms.google.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <NeonButton variant="accent" size="lg">
                Submit Feedback
              </NeonButton>
            </a>
          </div>
        </GlassCard>

        {/* Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-center mt-12 text-sm text-muted-foreground"
        >
          <p>Built with 💙 by the PromptXera Team</p>
          <p className="mt-2">© 2025 PromptXera. Empowering AI Communication.</p>
        </motion.div>
      </div>
    </div>
  );
}
