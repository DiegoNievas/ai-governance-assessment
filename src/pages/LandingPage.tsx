import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck, BarChart3, FileText, ArrowRight } from 'lucide-react';
import { AppLogo } from '../components/common/AppLogo';

export const LandingPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-slate-50 font-sans selection:bg-blue-200">
      
      {/* Navigation Bar */}
      <nav className="fixed w-full z-50 top-0 bg-white/80 backdrop-blur-md border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <AppLogo size="md" />
            <div className="flex items-center gap-4">
              <Link to="/login" className="text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors">
                Sign in
              </Link>
              <Link to="/signup" className="text-sm font-medium bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors shadow-sm">
                Get Started
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <main className="pt-28 pb-16 sm:pt-40 sm:pb-24 lg:pb-32 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          
          <div className="lg:grid lg:grid-cols-12 lg:gap-16 items-center">
            
            {/* Left Content */}
            <div className="sm:text-center md:max-w-2xl md:mx-auto lg:col-span-5 lg:text-left z-10 relative">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-sm font-semibold mb-6 border border-blue-100">
                <span className="flex h-2 w-2 relative">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
                </span>
                AI Readiness Platform
              </div>
              <h1 className="text-4xl tracking-tight font-extrabold text-slate-900 sm:text-5xl md:text-6xl lg:leading-[1.1]">
                Govern AI With <br className="hidden lg:block"/>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">Confidence</span>
              </h1>
              <p className="mt-6 text-base text-slate-600 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-8 md:text-xl lg:mx-0">
                Assess your organization's AI maturity, identify compliance risks, and generate executive-ready reports aligned with the ISO/IEC 42001 and NIST AI standards.
              </p>
              <div className="mt-8 sm:max-w-lg sm:mx-auto sm:text-center lg:text-left lg:mx-0 flex flex-col sm:flex-row gap-4">
                <Link to="/signup" className="flex items-center justify-center w-full sm:w-auto px-8 py-3.5 border border-transparent text-base font-medium rounded-xl text-white bg-blue-600 hover:bg-blue-700 md:text-lg md:px-10 transition-all shadow-md hover:shadow-lg">
                  Start Assessment <ArrowRight className="ml-2 w-5 h-5" />
                </Link>
                <Link to="/login" className="flex items-center justify-center w-full sm:w-auto px-8 py-3.5 border border-slate-300 text-base font-medium rounded-xl text-slate-700 bg-white hover:bg-slate-50 md:text-lg md:px-10 transition-all shadow-sm">
                  Client Portal
                </Link>
              </div>
            </div>

            {/* Right Image Container */}
            <div className="mt-16 sm:mt-24 lg:mt-0 lg:col-span-7 relative">
              {/* Decorative absolute blur blobs */}
              <div className="absolute -inset-4 bg-gradient-to-r from-blue-100 to-indigo-100 rounded-full blur-3xl opacity-50 -z-10"></div>
              
              <div className="relative mx-auto w-full rounded-2xl shadow-2xl overflow-hidden border border-slate-200 lg:max-w-4xl transition-transform hover:-translate-y-1 duration-500 ease-out flex bg-slate-900 items-center justify-center">
                <img 
                  src={`${import.meta.env.BASE_URL}hero-dashboard.png`} 
                  alt="AI Governance Dashboard" 
                  className="w-full h-auto object-cover opacity-90 brightness-110"
                />
              </div>
            </div>
            
          </div>
        </div>
      </main>

      {/* Feature Section */}
      <div className="bg-white py-24 sm:py-32 border-t border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-base text-blue-600 font-semibold tracking-wide uppercase">The Standard</h2>
            <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-slate-900 sm:text-4xl">
              Enterprise-grade assessments
            </p>
            <p className="mt-4 max-w-2xl text-xl text-slate-500 mx-auto">
              Equip your advisory teams with the tools they need to evaluate AI deployments across global regulatory landscapes.
            </p>
          </div>

          <div className="mt-20">
            <div className="grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-3">
              
              <div className="bg-slate-50 rounded-2xl p-8 border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
                <div className="w-12 h-12 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center mb-6">
                  <ShieldCheck className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">Identify Core Risks</h3>
                <p className="text-slate-600 leading-relaxed">
                  Map implementations against security, privacy, and bias vectors to catch regulatory exposure before models hit production.
                </p>
              </div>

              <div className="bg-slate-50 rounded-2xl p-8 border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
                <div className="w-12 h-12 rounded-xl bg-indigo-100 text-indigo-600 flex items-center justify-center mb-6">
                  <BarChart3 className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">Maturity Scoring</h3>
                <p className="text-slate-600 leading-relaxed">
                  Dynamically calculate comprehensive capability metrics across dozens of structured domains to benchmark organizational readiness.
                </p>
              </div>

              <div className="bg-slate-50 rounded-2xl p-8 border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
                <div className="w-12 h-12 rounded-xl bg-purple-100 text-purple-600 flex items-center justify-center mb-6">
                  <FileText className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">Executive Reporting</h3>
                <p className="text-slate-600 leading-relaxed">
                  Instantly output highly-formatted, C-Suite ready action plans documenting gaps and targeted remediation steps.
                </p>
              </div>

            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-slate-900 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-3 grayscale opacity-70">
            <img src={`${import.meta.env.BASE_URL}app-icon.png`} alt="Logo" className="w-6 h-6 object-contain" />
            <span className="font-bold text-white tracking-tight text-lg">QuantumLeap</span>
          </div>
          <p className="text-slate-400 text-sm">
            &copy; 2026 Diego Nievas AI Advisory Tool. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};
