import { useState } from 'react';
import { Trophy, Filter, MapPin, Award, Calendar, DollarSign, Target } from 'lucide-react';
import legendsData from '../data/legends.json';
import competitionsData from '../data/competitions.json';

interface Legend {
  id: string;
  name: string;
  rank: number;
  region: string;
  competition: string;
  achievement: string;
  strategy_snippet: string;
  quote: string;
  backstory: string;
  specialty: string;
  achievements_count: number;
  competitions_won: number;
}

interface Competition {
  id: string;
  name: string;
  region: string;
  date: string;
  prize: string;
  theme: string;
  description: string;
  status: string;
  registrationOpen: boolean;
}

export default function PromptLegendsNew() {
  const [selectedRegion, setSelectedRegion] = useState<string>('all');
  const [expandedLegend, setExpandedLegend] = useState<string | null>(null);

  const legends = legendsData as Legend[];
  const competitions = competitionsData as Competition[];

  const filteredLegends = selectedRegion === 'all'
    ? legends
    : legends.filter(l => l.region === selectedRegion);

  const regions = ['all', ...Array.from(new Set(legends.map(l => l.region)))];

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

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          <div className="lg:col-span-2">
            <h2 className="text-3xl font-bold text-white mb-6 flex items-center space-x-3">
              <span>🏆</span>
              <span>Legends Hall of Fame</span>
            </h2>

            {filteredLegends.length === 0 ? (
              <div className="text-center py-20 bg-white/5 border border-cyan-500/30 rounded-2xl">
                <p className="text-gray-400 text-lg">No legends found for this region.</p>
              </div>
            ) : (
              <div className="space-y-4">
                {filteredLegends.map((legend) => (
                  <div
                    key={legend.id}
                    className="group relative bg-gradient-to-br from-white/5 to-white/0 border border-cyan-500/30 rounded-xl backdrop-blur-sm hover:border-cyan-500/50 transition-all duration-300 cursor-pointer overflow-hidden"
                    onClick={() => setExpandedLegend(expandedLegend === legend.id ? null : legend.id)}
                  >
                    <div className={`absolute inset-0 blur-2xl bg-gradient-to-br ${getRankColor(legend.rank)} opacity-0 group-hover:opacity-20 transition-opacity`}></div>

                    <div className="relative z-10 p-6">
                      <div className="flex items-start justify-between">
                        <div className="flex items-start space-x-4 flex-1">
                          <div className={`w-16 h-16 rounded-full bg-gradient-to-br ${getRankColor(legend.rank)} flex items-center justify-center text-3xl font-bold text-white shadow-lg flex-shrink-0`}>
                            {getRankBadge(legend.rank)}
                          </div>

                          <div className="flex-1">
                            <div className="flex items-center space-x-3 mb-2">
                              <h3 className="text-2xl font-bold text-white">{legend.name}</h3>
                              <div className={`text-2xl font-bold bg-gradient-to-r ${getRankColor(legend.rank)} bg-clip-text text-transparent`}>
                                #{legend.rank}
                              </div>
                            </div>

                            <div className="flex flex-wrap items-center gap-3 mb-3">
                              <div className="flex items-center space-x-1 text-sm text-gray-400">
                                <MapPin className="w-4 h-4 text-cyan-400" />
                                <span>{legend.region}</span>
                              </div>
                              <div className="flex items-center space-x-1 text-sm text-gray-400">
                                <Award className="w-4 h-4 text-pink-400" />
                                <span>{legend.competition}</span>
                              </div>
                            </div>

                            <div className="bg-black/30 border border-yellow-500/20 rounded-lg p-3 mb-3">
                              <p className="text-yellow-400 font-semibold text-sm">{legend.achievement}</p>
                            </div>

                            <div className="flex items-center space-x-4 text-sm">
                              <div className="text-gray-400">
                                <span className="text-cyan-400 font-semibold">{legend.achievements_count}</span> Achievements
                              </div>
                              <div className="text-gray-400">
                                <span className="text-pink-400 font-semibold">{legend.competitions_won}</span> Wins
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      {expandedLegend === legend.id && (
                        <div className="mt-6 pt-6 border-t border-cyan-500/20 space-y-4 animate-fade-in">
                          <div className="bg-gradient-to-r from-cyan-500/10 to-pink-500/10 border border-cyan-500/30 rounded-lg p-4">
                            <p className="text-xs text-cyan-400 font-semibold mb-2">💡 Strategy Insight</p>
                            <p className="text-gray-300 italic leading-relaxed">"{legend.strategy_snippet}"</p>
                          </div>

                          <div className="bg-black/30 border border-pink-500/20 rounded-lg p-4">
                            <p className="text-xs text-pink-400 font-semibold mb-2">💬 Quote</p>
                            <p className="text-gray-300 italic">"{legend.quote}"</p>
                          </div>

                          <div className="bg-black/30 border border-yellow-500/20 rounded-lg p-4">
                            <p className="text-xs text-yellow-400 font-semibold mb-2">📖 Background</p>
                            <p className="text-gray-300 leading-relaxed">{legend.backstory}</p>
                          </div>

                          <div className="bg-gradient-to-r from-green-500/10 to-cyan-500/10 border border-green-500/30 rounded-lg p-4">
                            <p className="text-xs text-green-400 font-semibold mb-2">🎯 Specialty</p>
                            <p className="text-gray-300">{legend.specialty}</p>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="lg:col-span-1">
            <h2 className="text-2xl font-bold text-white mb-6 flex items-center space-x-3">
              <span>🚀</span>
              <span>Upcoming Competitions</span>
            </h2>

            <div className="space-y-4 lg:sticky lg:top-24">
              {competitions.map((comp) => (
                <div
                  key={comp.id}
                  className="bg-gradient-to-br from-white/5 to-white/0 border border-cyan-500/30 rounded-xl p-5 backdrop-blur-sm hover:border-cyan-500/50 transition-all"
                >
                  <h3 className="text-lg font-bold text-white mb-2">{comp.name}</h3>

                  <div className="space-y-2 mb-4">
                    <div className="flex items-center space-x-2 text-sm text-gray-400">
                      <MapPin className="w-4 h-4 text-cyan-400" />
                      <span>{comp.region}</span>
                    </div>
                    <div className="flex items-center space-x-2 text-sm text-gray-400">
                      <Calendar className="w-4 h-4 text-pink-400" />
                      <span>{new Date(comp.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</span>
                    </div>
                    <div className="flex items-center space-x-2 text-sm text-gray-400">
                      <DollarSign className="w-4 h-4 text-yellow-400" />
                      <span className="text-yellow-400 font-semibold">{comp.prize}</span>
                    </div>
                    <div className="flex items-center space-x-2 text-sm text-gray-400">
                      <Target className="w-4 h-4 text-green-400" />
                      <span>{comp.theme}</span>
                    </div>
                  </div>

                  <p className="text-gray-400 text-sm mb-4 leading-relaxed">{comp.description}</p>

                  {comp.registrationOpen ? (
                    <button className="w-full px-4 py-2 bg-gradient-to-r from-cyan-500 to-pink-500 rounded-lg font-semibold text-white hover:shadow-lg hover:shadow-cyan-500/30 transition-all text-sm">
                      Register Now
                    </button>
                  ) : (
                    <div className="w-full px-4 py-2 bg-white/5 border border-cyan-500/30 rounded-lg text-center text-gray-400 text-sm">
                      Registration Opens Soon
                    </div>
                  )}
                </div>
              ))}

              <div className="bg-gradient-to-r from-cyan-500/10 to-pink-500/10 border border-cyan-500/30 rounded-xl p-5 text-center">
                <p className="text-sm text-gray-300 mb-3">Want to become a legend?</p>
                <button className="w-full px-4 py-2 bg-white/10 border border-cyan-500/30 rounded-lg text-white hover:bg-white/20 transition-all text-sm font-medium">
                  View All Competitions
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-16 bg-gradient-to-r from-cyan-500/10 to-pink-500/10 border border-cyan-500/30 rounded-2xl p-8 backdrop-blur-sm text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Become a Legend</h2>
          <p className="text-gray-300 mb-6 max-w-2xl mx-auto leading-relaxed">
            Think you have what it takes? Upcoming competitions are announced monthly.
            Master your prompt engineering skills, compete globally, and earn your place in the Hall of Fame.
          </p>
          <button className="px-8 py-4 bg-gradient-to-r from-cyan-500 to-pink-500 rounded-lg font-semibold text-white hover:shadow-2xl hover:shadow-cyan-500/50 hover:scale-105 transition-all">
            Start Your Journey
          </button>
        </div>
      </div>
    </div>
  );
}
