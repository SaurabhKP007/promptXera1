import { useState } from 'react';
import { Search, Filter, ExternalLink, TrendingUp } from 'lucide-react';
import aiToolsData from '../data/aiTools.json';

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

const ITEMS_PER_PAGE = 12;

const CATEGORIES = [
  'All Categories',
  'Conversational AI',
  'Image Generation',
  'Code Assistant',
  'Content Writing',
  'Video Generation',
  'Productivity',
  'Voice AI',
  'AI Search / Research',
  'Developer Tools'
];

export default function AITools() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All Categories');
  const [currentPage, setCurrentPage] = useState(1);

  const filteredTools = (aiToolsData as AITool[]).filter(tool => {
    const matchesSearch = tool.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         tool.useCase.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All Categories' || tool.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const totalPages = Math.ceil(filteredTools.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedTools = filteredTools.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
    setCurrentPage(1);
  };

  const handleSearch = (term: string) => {
    setSearchTerm(term);
    setCurrentPage(1);
  };

  return (
    <div className="relative z-10 min-h-screen pt-20 px-4 pb-12">
      <div className="max-w-7xl mx-auto">
        <div className="mb-12 text-center">
          <h1 className="text-5xl font-bold bg-gradient-to-r from-cyan-400 to-pink-400 bg-clip-text text-transparent mb-4">
            AI Tools Directory
          </h1>
          <p className="text-gray-300 text-lg">Discover and explore the best AI tools for your needs</p>
        </div>

        <div className="mb-8 space-y-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search AI tools by name or use case..."
                value={searchTerm}
                onChange={(e) => handleSearch(e.target.value)}
                className="w-full pl-12 pr-4 py-3 bg-white/5 border border-cyan-500/30 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-cyan-500/50 transition-colors"
              />
            </div>

            <div className="relative">
              <Filter className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <select
                value={selectedCategory}
                onChange={(e) => handleCategoryChange(e.target.value)}
                className="w-full md:w-64 pl-12 pr-4 py-3 bg-white/5 border border-cyan-500/30 rounded-lg text-white focus:outline-none focus:border-cyan-500/50 transition-colors appearance-none cursor-pointer"
              >
                {CATEGORIES.map(category => (
                  <option key={category} value={category} className="bg-[#0B0C10]">
                    {category}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="flex items-center justify-between text-sm text-gray-400">
            <p>
              Showing {startIndex + 1}-{Math.min(startIndex + ITEMS_PER_PAGE, filteredTools.length)} of {filteredTools.length} tools
            </p>
            {selectedCategory !== 'All Categories' && (
              <button
                onClick={() => handleCategoryChange('All Categories')}
                className="text-cyan-400 hover:text-cyan-300 transition-colors"
              >
                Clear filters
              </button>
            )}
          </div>
        </div>

        {paginatedTools.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-gray-400 text-lg">No tools found matching your criteria.</p>
            <button
              onClick={() => {
                setSearchTerm('');
                setSelectedCategory('All Categories');
                setCurrentPage(1);
              }}
              className="mt-4 px-6 py-2 bg-cyan-500/20 text-cyan-400 border border-cyan-500/30 rounded-lg hover:bg-cyan-500/30 transition-all"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
              {paginatedTools.map((tool) => (
                <a
                  key={tool.id}
                  href={tool.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative bg-gradient-to-br from-white/5 to-white/0 border border-cyan-500/20 rounded-xl p-6 backdrop-blur-sm hover:border-cyan-500/50 hover:scale-105 transition-all duration-300"
                >
                  <div className="absolute inset-0 blur-xl bg-cyan-500/0 group-hover:bg-cyan-500/10 transition-all rounded-xl"></div>

                  <div className="relative z-10">
                    <div className="flex items-start justify-between mb-4">
                      <div className="text-5xl">{tool.logo}</div>
                      <div className="flex flex-col items-end space-y-2">
                        {tool.trending && (
                          <span className="flex items-center space-x-1 px-2 py-1 bg-pink-500/20 text-pink-400 text-xs rounded-full border border-pink-500/30">
                            <TrendingUp className="w-3 h-3" />
                            <span>Trending</span>
                          </span>
                        )}
                        <ExternalLink className="w-5 h-5 text-gray-400 group-hover:text-cyan-400 transition-colors" />
                      </div>
                    </div>

                    <h3 className="text-xl font-bold text-white mb-2 group-hover:text-cyan-400 transition-colors">
                      {tool.name}
                    </h3>

                    <p className="text-gray-400 text-sm mb-3 line-clamp-2">
                      {tool.useCase}
                    </p>

                    <div className="bg-black/30 border border-cyan-500/20 rounded-lg p-3 mb-4">
                      <p className="text-xs text-gray-400 mb-1">Why use it?</p>
                      <p className="text-gray-300 text-sm">{tool.motivation}</p>
                    </div>

                    <span className="inline-block px-3 py-1 rounded-full text-xs font-medium bg-cyan-500/20 text-cyan-400 border border-cyan-500/30">
                      {tool.category}
                    </span>
                  </div>
                </a>
              ))}
            </div>

            {totalPages > 1 && (
              <div className="flex items-center justify-center space-x-2">
                <button
                  onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                  disabled={currentPage === 1}
                  className="px-4 py-2 bg-white/5 border border-cyan-500/30 rounded-lg text-white hover:bg-white/10 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                >
                  Previous
                </button>

                <div className="flex space-x-2">
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                    <button
                      key={page}
                      onClick={() => setCurrentPage(page)}
                      className={`w-10 h-10 rounded-lg font-medium transition-all ${
                        currentPage === page
                          ? 'bg-gradient-to-r from-cyan-500 to-pink-500 text-white'
                          : 'bg-white/5 border border-cyan-500/30 text-gray-300 hover:bg-white/10'
                      }`}
                    >
                      {page}
                    </button>
                  ))}
                </div>

                <button
                  onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                  disabled={currentPage === totalPages}
                  className="px-4 py-2 bg-white/5 border border-cyan-500/30 rounded-lg text-white hover:bg-white/10 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                >
                  Next
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
