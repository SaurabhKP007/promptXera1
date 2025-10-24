import { useEffect, useState } from 'react';
import { Trophy, Filter, MapPin, Award } from 'lucide-react';
import { supabase, PromptLegend } from '../lib/supabase';

export default function PromptLegends() {
  const [legends, setLegends] = useState<PromptLegend[]>([]);
  const [filteredLegends, setFilteredLegends] = useState<PromptLegend[]>([]);
  const [selectedRegion, setSelectedRegion] = useState<string>('all');
  const [hoveredLegend, setHoveredLegend] = useState<string | null>(null);

  useEffect(() => {
    loadLegends();
  }, []);

  useEffect(() => {
    if (selectedRegion === 'all') {
      setFilteredLegends(legends);
    } else {
      setFilteredLegends(legends.filter(l => l.region === selectedRegion));
    }
  }, [selectedRegion, legends]);

  async function loadLegends() {
    const { data } = await supabase
      .from('prompt_legends')
      .select('*')
      .order('rank', { ascending: true });

    if (data) setLegends(data);
  }

  const regions = ['all', ...new Set(legends.map(l => l.region))];

  function getRankColor(rank: number) {
    if (rank === 1) return 'from-yellow-400 to-yellow-600';
    if (rank === 2) return 'from-gray-300 to-gray-500';
    if (rank === 3) return 'from-orange-400 to-orange-600';
    return 'from-cyan-400 to-pink-400';
  }

  function getRankBadge(rank: number) {
    if (rank === 1) return '🥇';
    if (rank === 2) return '🥈';
    if (rank === 3) return '🥉';
    return '🏆';
  }

  return (
    <div className="relative z-10 min-h-screen pt-20 px-4 pb-12">
      <div className="max-w-7xl mx-auto">
        <div className="mb-12 text-center">
          <div className="flex items-center justify-center space-x-3 mb-4">
            <Trophy className="w-10 h-10 text-yellow-400" />
            <h1 className="text-5xl font-bold bg-gradient-to-r from-yellow-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent">
              Prompt Legends
            </h1>
          </div>
          <p className="text-gray-300 text-lg">Hall of Fame: The world's top prompt engineers</p>
        </div>

        <div className="mb-8 flex flex-wrap items-center gap-4 justify-center">
          <div className="flex items-center space-x-2">
            <Filter className="w-5 h-5 text-cyan-400" />
            <span className="text-white font-medium">Filter by Region:</span>
          </div>
          {regions.map((region) => (
            <button
              key={region}
              onClick={() => setSelectedRegion(region)}
              className={`px-4 py-2 rounded-lg font-medium transition-all ${
                selectedRegion === region
                  ? 'bg-gradient-to-r from-cyan-500 to-pink-500 text-white shadow-lg shadow-cyan-500/30'
                  : 'bg-white/5 text-gray-300 border border-cyan-500/30 hover:bg-white/10'
              }`}
            >
              {region === 'all' ? 'All Regions' : region}
            </button>
          ))}
        </div>

        {filteredLegends.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-gray-400 text-lg">No legends found for this region.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredLegends.map((legend) => (
              <div
                key={legend.id}
                onMouseEnter={() => setHoveredLegend(legend.id)}
                onMouseLeave={() => setHoveredLegend(null)}
                className="group relative bg-gradient-to-br from-white/5 to-white/0 border border-cyan-500/30 rounded-2xl p-6 backdrop-blur-sm hover:border-cyan-500/50 hover:scale-105 transition-all duration-300 cursor-pointer"
              >
                <div className={`absolute inset-0 blur-2xl bg-gradient-to-br ${getRankColor(legend.rank)} opacity-0 group-hover:opacity-20 transition-opacity rounded-2xl`}></div>

                <div className="relative z-10">
                  <div className="flex items-start justify-between mb-4">
                    <div className={`w-16 h-16 rounded-full bg-gradient-to-br ${getRankColor(legend.rank)} flex items-center justify-center text-3xl font-bold text-white shadow-lg`}>
                      {getRankBadge(legend.rank)}
                    </div>
                    <div className="text-right">
                      <div className={`text-3xl font-bold bg-gradient-to-r ${getRankColor(legend.rank)} bg-clip-text text-transparent`}>
                        #{legend.rank}
                      </div>
                      <p className="text-gray-400 text-xs">Rank</p>
                    </div>
                  </div>

                  <h3 className="text-2xl font-bold text-white mb-2">{legend.name}</h3>

                  <div className="flex items-center space-x-2 mb-3">
                    <MapPin className="w-4 h-4 text-cyan-400" />
                    <span className="text-gray-300 text-sm">{legend.region}</span>
                  </div>

                  <div className="flex items-center space-x-2 mb-4">
                    <Award className="w-4 h-4 text-pink-400" />
                    <span className="text-gray-300 text-sm">{legend.competition}</span>
                  </div>

                  <div className="bg-black/30 border border-cyan-500/20 rounded-lg p-3 mb-4">
                    <p className="text-yellow-400 font-semibold text-sm">{legend.achievement}</p>
                  </div>

                  {legend.strategy_snippet && (
                    <div
                      className={`bg-gradient-to-r from-cyan-500/10 to-pink-500/10 border border-cyan-500/30 rounded-lg p-4 transition-all duration-300 ${
                        hoveredLegend === legend.id
                          ? 'opacity-100 max-h-96'
                          : 'opacity-0 max-h-0 overflow-hidden'
                      }`}
                    >
                      <p className="text-xs text-cyan-400 font-semibold mb-2">Strategy Insight:</p>
                      <p className="text-gray-300 text-sm italic leading-relaxed">"{legend.strategy_snippet}"</p>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="mt-16 bg-gradient-to-r from-cyan-500/10 to-pink-500/10 border border-cyan-500/30 rounded-2xl p-8 backdrop-blur-sm text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Become a Legend</h2>
          <p className="text-gray-300 mb-6 max-w-2xl mx-auto leading-relaxed">
            Think you have what it takes? Upcoming competitions are announced monthly.
            Master your prompt engineering skills, compete globally, and earn your place in the Hall of Fame.
          </p>
          <button className="px-8 py-4 bg-gradient-to-r from-cyan-500 to-pink-500 rounded-lg font-semibold text-white hover:shadow-2xl hover:shadow-cyan-500/50 hover:scale-105 transition-all">
            View Upcoming Competitions
          </button>
        </div>
      </div>
    </div>
  );
}
