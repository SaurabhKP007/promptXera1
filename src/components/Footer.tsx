import { Github, Twitter, Linkedin, Mail } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="relative z-10 border-t border-cyan-500/20 bg-black/30 backdrop-blur-xl mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-xl font-bold bg-gradient-to-r from-cyan-400 to-pink-400 bg-clip-text text-transparent mb-4">
              PromptXera
            </h3>
            <p className="text-gray-400 text-sm leading-relaxed">
              Master the art of prompt engineering with hands-on practice, expert tutorials, and real-time feedback.
            </p>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-gray-400 text-sm">
              <li className="hover:text-cyan-400 transition-colors cursor-pointer">AI Tools</li>
              <li className="hover:text-cyan-400 transition-colors cursor-pointer">Practice Prompts</li>
              <li className="hover:text-cyan-400 transition-colors cursor-pointer">Tutorials</li>
              <li className="hover:text-cyan-400 transition-colors cursor-pointer">Legends</li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4">Connect With Us</h4>
            <div className="flex space-x-4 mb-4">
              <a href="#" className="text-gray-400 hover:text-cyan-400 transition-colors group">
                <Github className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-cyan-400 transition-colors group">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-cyan-400 transition-colors group">
                <Linkedin className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-cyan-400 transition-colors group">
                <Mail className="w-5 h-5" />
              </a>
            </div>
            <p className="text-gray-400 text-sm">
              Have feedback? Share your thoughts with us!
            </p>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-cyan-500/20 text-center text-gray-400 text-sm">
          <p>&copy; 2025 PromptXera. Built with cutting-edge tech for the future of AI.</p>
        </div>
      </div>
    </footer>
  );
}
