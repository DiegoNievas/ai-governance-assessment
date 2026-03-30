import React, { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';
import { FileText, Plus, ShieldAlert, LogOut } from 'lucide-react';

export const AdminDashboard: React.FC = () => {
  const { profile, signOut } = useAuth();
  const [assessments, setAssessments] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchAssessments = async () => {
      if (!profile) return;
      
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

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <header className="bg-slate-900 border-b border-slate-800 text-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <ShieldAlert className="w-6 h-6 text-blue-400" />
            <h1 className="font-semibold text-lg">AI Governance Dashboard</h1>
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
        <div className="flex justify-between items-center mb-8">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Your Assessments</h2>
            <p className="mt-1 text-sm text-gray-500">View past governance assessments or conduct a new one.</p>
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
          <div className="bg-white shadow-sm overflow-hidden border border-gray-200 sm:rounded-lg">
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
                        {/* Currently we don't have a viewing UI built, but we will soon */}
                        <button className="text-blue-600 hover:text-blue-900" disabled>View Details</button>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        )}
      </main>
    </div>
  );
};
