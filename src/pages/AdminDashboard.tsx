import React, { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';
import { FileText, Plus, ShieldAlert, LogOut, TrendingUp, BarChart3, AlertTriangle, Layers, Building2, MoreVertical, Download } from 'lucide-react';
import { useMemo } from 'react';

export const AdminDashboard: React.FC = () => {
  const { profile, signOut } = useAuth();
  const [assessments, setAssessments] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [openDropdownId, setOpenDropdownId] = useState<string | null>(null);
  
  // Close dropdown if clicking outside
  useEffect(() => {
    const handleClickOutside = () => setOpenDropdownId(null);
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  useEffect(() => {
    const fetchAssessments = async () => {
      // Don't fetch if profile is not loaded yet and auth is still initializing
      if (!profile) {
        setIsLoading(false);
        return;
      }
      
      try {
        const { data, error } = await supabase
          .from('assessments')
          .select('id, full_data, created_at, created_by')
          .order('created_at', { ascending: false });

        if (error) throw error;
        setAssessments(data || []);
      } catch (err) {
        console.error("Failed to load assessments", err);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchAssessments();
  }, [profile]);

  const analytics = useMemo(() => {
    if (assessments.length === 0) return null;

    const totalPipeline = assessments.length;
    let totalScore = 0;
    let readyForPilot = 0;
    const gapFrequencies: Record<string, number> = {};
    const industryScores: Record<string, { total: number, count: number }> = {};
    const funnel: Record<string, number> = {
      Initial: 0, Emerging: 0, Developing: 0, Managed: 0, Mature: 0
    };

    assessments.forEach(a => {
      const data = a.full_data || {};
      const results = data.results;
      const details = data.customerDetails;
      
      if (!results) return;

      totalScore += results.overallMaturityScore || 0;

      // Readiness
      if (results.riskRating === 'Low' || results.riskRating === 'Moderate') {
        if (results.overallMaturityScore >= 2.5) {
          readyForPilot++;
        }
      }

      // Top Gaps
      if (results.topGaps && Array.isArray(results.topGaps)) {
        results.topGaps.forEach((gap: any) => {
          gapFrequencies[gap.title] = (gapFrequencies[gap.title] || 0) + 1;
        });
      }

      // Industry Benchmarks
      const industry = details?.industry || 'Unknown';
      if (!industryScores[industry]) industryScores[industry] = { total: 0, count: 0 };
      industryScores[industry].total += results.overallMaturityScore || 0;
      industryScores[industry].count += 1;

      // Funnel
      if (results.maturityLevel) {
        funnel[results.maturityLevel] = (funnel[results.maturityLevel] || 0) + 1;
      }
    });

    const avgMaturity = Number((totalScore / totalPipeline).toFixed(2));
    const deploymentReadiness = Number(((readyForPilot / totalPipeline) * 100).toFixed(0));
    
    let topSystemicVulnerability = 'None found';
    let maxGap = 0;
    Object.entries(gapFrequencies).forEach(([title, count]) => {
        if (count > maxGap) {
            maxGap = count;
            topSystemicVulnerability = title;
        }
    });

    const industryBenchmarks = Object.entries(industryScores)
      .map(([industry, stats]) => ({ industry, avg: Number((stats.total / stats.count).toFixed(2)) }))
      .sort((a,b) => b.avg - a.avg);

    return {
      totalPipeline,
      avgMaturity,
      deploymentReadiness,
      topSystemicVulnerability,
      industryBenchmarks,
      funnel
    }

  }, [assessments]);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <header className="bg-slate-900 border-b border-slate-800 text-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <ShieldAlert className="w-6 h-6 text-blue-400" />
            <h1 className="font-semibold text-lg">Critera</h1>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-sm font-medium text-slate-300 hidden sm:inline-block">
              {profile?.full_name}
            </span>
            <button 
              onClick={() => signOut()} 
              className="text-sm flex items-center gap-2 text-slate-300 hover:text-white transition-colors"
            >
              <LogOut className="w-4 h-4" /> Sign Out
            </button>
          </div>
        </div>
      </header>

      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Your Assessments</h2>
            <p className="mt-1 text-sm text-gray-500">Analytics and history across your client portfolio.</p>
          </div>
          <Link 
            to="/assessment" 
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-md font-medium shadow-sm transition-colors"
          >
            <Plus className="w-4 h-4" /> New Assessment
          </Link>
        </div>

        {isLoading ? (
          <div className="bg-white rounded-lg border border-gray-200 p-8 text-center text-gray-500">Loading assessments...</div>
        ) : assessments.length === 0 ? (
          <div className="bg-white rounded-lg border border-gray-200 p-12 text-center shadow-sm">
            <FileText className="w-12 h-12 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900">No assessments found</h3>
            <p className="mt-1 text-sm text-gray-500 mb-6">Get started by running an AI Governance assessment for a client.</p>
            <Link 
              to="/assessment" 
              className="inline-flex items-center gap-2 bg-blue-50 text-blue-700 hover:bg-blue-100 border border-transparent px-4 py-2 rounded-md font-medium transition-colors"
            >
              Start First Assessment
            </Link>
          </div>
        ) : (
          <div className="space-y-8">
            {/* Strategy Tiles */}
            {analytics && (
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
                <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm flex flex-col">
                  <div className="flex items-center gap-3 text-gray-500 mb-3">
                    <Layers className="w-5 h-5 text-blue-500" />
                    <h3 className="text-sm font-medium">Total Pipeline</h3>
                  </div>
                  <div className="text-3xl font-bold text-gray-900">{analytics.totalPipeline}</div>
                  <p className="text-xs text-gray-500 mt-2">Assessments conducted</p>
                </div>
                
                <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm flex flex-col">
                  <div className="flex items-center gap-3 text-gray-500 mb-3">
                    <BarChart3 className="w-5 h-5 text-indigo-500" />
                    <h3 className="text-sm font-medium">Avg Portfolio Maturity</h3>
                  </div>
                  <div className="text-3xl font-bold text-gray-900">{analytics.avgMaturity} <span className="text-lg text-gray-400 font-normal">/ 4.0</span></div>
                  <p className="text-xs text-gray-500 mt-2">Mean maturity score</p>
                </div>

                <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm flex flex-col">
                  <div className="flex items-center gap-3 text-gray-500 mb-3">
                    <TrendingUp className="w-5 h-5 text-emerald-500" />
                    <h3 className="text-sm font-medium">Deployment Ready</h3>
                  </div>
                  <div className="text-3xl font-bold text-gray-900">{analytics.deploymentReadiness}%</div>
                  <p className="text-xs text-gray-500 mt-2">Clients safe for pilot</p>
                </div>

                <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm flex flex-col">
                  <div className="flex items-center gap-3 text-gray-500 mb-3">
                    <AlertTriangle className="w-5 h-5 text-rose-500" />
                    <h3 className="text-sm font-medium">Top Systemic Gap</h3>
                  </div>
                  <div className="text-lg font-bold text-gray-900 leading-tight">{analytics.topSystemicVulnerability}</div>
                  <p className="text-xs text-gray-500 mt-2">Most frequent client failure</p>
                </div>
              </div>
            )}

            {/* Deep Insights Row */}
            {analytics && (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                
                {/* Industry Benchmarks */}
                <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
                  <div className="px-6 py-4 border-b border-gray-100 flex items-center gap-2">
                    <Building2 className="w-4 h-4 text-gray-400" />
                    <h3 className="text-sm font-semibold text-gray-900">Industry Benchmarks</h3>
                  </div>
                  <div className="divide-y divide-gray-100 max-h-48 overflow-y-auto">
                    {analytics.industryBenchmarks.map((b, i) => (
                      <div key={i} className="px-6 py-3 flex justify-between items-center hover:bg-gray-50">
                        <span className="text-sm text-gray-600 font-medium">{b.industry}</span>
                        <span className="text-sm font-bold text-gray-900 bg-gray-100 px-2 py-1 rounded">{b.avg}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Maturity Funnel */}
                <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden flex flex-col">
                  <div className="px-6 py-4 border-b border-gray-100">
                    <h3 className="text-sm font-semibold text-gray-900">Client Maturity Funnel</h3>
                  </div>
                  <div className="p-6 flex-1 flex flex-col justify-center gap-2">
                    {['Initial', 'Emerging', 'Developing', 'Managed', 'Mature'].map(level => {
                      const count = analytics.funnel[level] || 0;
                      const pct = analytics.totalPipeline > 0 ? (count / analytics.totalPipeline) * 100 : 0;
                      return (
                        <div key={level} className="flex items-center gap-3">
                          <span className="text-xs font-medium text-gray-500 w-20 text-right">{level}</span>
                          <div className="flex-1 h-4 bg-gray-100 rounded-full overflow-hidden">
                            <div className="h-full bg-blue-500 rounded-full" style={{ width: `${pct}%` }}></div>
                          </div>
                          <span className="text-xs font-bold text-gray-700 w-6">{count}</span>
                        </div>
                      )
                    })}
                  </div>
                </div>

              </div>
            )}

            {/* Table */}
            <div className="bg-white shadow-sm overflow-hidden border border-gray-200 sm:rounded-xl">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Customer</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Industry</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Scope</th>
                  <th scope="col" className="relative px-6 py-3"><span className="sr-only">Actions</span></th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {assessments.map((a) => {
                  const data = a.full_data || {};
                  const date = new Date(a.created_at).toLocaleDateString();
                  
                  return (
                    <tr key={a.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="font-medium text-gray-900">{data.customerDetails?.customerName || 'Unknown Corp'}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {data.customerDetails?.industry || 'N/A'}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {date}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-500 max-w-xs truncate">
                        {data.customerDetails?.assessmentScope || 'No scope defined'}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <div className="relative inline-block text-left">
                          <button 
                            onClick={(e) => {
                              e.stopPropagation();
                              setOpenDropdownId(openDropdownId === a.id ? null : a.id);
                            }}
                            className="p-1 rounded-full text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-colors focus:outline-none"
                          >
                            <MoreVertical className="w-5 h-5" />
                          </button>
                          
                          {openDropdownId === a.id && (
                            <div 
                              className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-20 focus:outline-none overflow-hidden"
                              onClick={(e) => e.stopPropagation()}
                            >
                              <div className="py-1">
                                <Link 
                                  to={`/report/${a.id}`} 
                                  className="flex items-center gap-2 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 hover:text-blue-600 transition-colors"
                                >
                                  <BarChart3 className="w-4 h-4" /> Show Results
                                </Link>
                                <Link 
                                  to={`/report/${a.id}?autoDownload=true`} 
                                  className="flex items-center gap-2 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 hover:text-blue-600 transition-colors"
                                >
                                  <Download className="w-4 h-4" /> Download PDF
                                </Link>
                              </div>
                            </div>
                          )}
                        </div>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
          </div>
        )}
      </main>
    </div>
  );
};
