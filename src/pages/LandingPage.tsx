import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck, BarChart3, FileText, ArrowRight, Layers, TrendingUp, Building2, Briefcase, UserCheck, CheckCircle2, Zap } from 'lucide-react';

export const LandingPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-white font-sans selection:bg-blue-100 text-slate-900">

      {/* Navigation */}
      <nav className="fixed w-full z-50 top-0 bg-white/90 backdrop-blur-lg border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-2.5">
              <img
                src={`${import.meta.env.BASE_URL}critera-icon.png`}
                alt="Critera"
                className="w-8 h-8 object-contain"
              />
              <span className="text-xl font-bold tracking-tight text-slate-900">Critera</span>
            </div>
            <div className="flex items-center gap-3">
              <Link to="/login" className="text-sm font-medium text-slate-500 hover:text-slate-900 transition-colors px-3 py-2">
                Sign in
              </Link>
              <Link to="/signup" className="text-sm font-semibold bg-slate-900 text-white px-4 py-2 rounded-lg hover:bg-slate-800 transition-colors">
                Book a Demo
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="pt-32 pb-20 sm:pt-40 sm:pb-28 lg:pb-32 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:grid lg:grid-cols-12 lg:gap-16 items-center">

            {/* Left */}
            <div className="lg:col-span-5 z-10 relative">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-100 text-slate-600 text-xs font-semibold mb-8 uppercase tracking-wider">
                Built for MSPs, consultancies, and AI advisory firms
              </div>
              <h1 className="text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl lg:text-[3.25rem] lg:leading-[1.15]">
                Turn AI governance into a repeatable advisory service.
              </h1>
              <p className="mt-6 text-lg text-slate-500 leading-relaxed max-w-xl">
                Run AI governance assessments against ISO/IEC 42001 and NIST AI RMF, generate C-suite ready reports, and track client maturity across your portfolio from one multitenant platform.
              </p>
              <div className="mt-10 flex flex-col sm:flex-row gap-4">
                <Link to="/signup" className="inline-flex items-center justify-center px-7 py-3.5 text-base font-semibold rounded-lg text-white bg-blue-600 hover:bg-blue-700 transition-all shadow-sm hover:shadow-md">
                  Book a Demo <ArrowRight className="ml-2 w-4 h-4" />
                </Link>
                <Link to="/login" className="inline-flex items-center justify-center px-7 py-3.5 text-base font-semibold rounded-lg text-slate-700 bg-white border border-slate-200 hover:bg-slate-50 transition-all">
                  Explore the Platform
                </Link>
              </div>
            </div>

            {/* Right: Dashboard Screenshot */}
            <div className="mt-16 lg:mt-0 lg:col-span-7 relative">
              <div className="absolute -inset-8 bg-gradient-to-tr from-blue-50 via-slate-50 to-indigo-50 rounded-3xl blur-2xl opacity-70 -z-10"></div>
              <div className="relative mx-auto w-full rounded-2xl shadow-2xl overflow-hidden border border-slate-200/80 lg:max-w-4xl transition-transform hover:-translate-y-1 duration-500 ease-out bg-white">
                <img
                  src={`${import.meta.env.BASE_URL}hero-dashboard.png`}
                  alt="Critera AI Governance Dashboard showing portfolio maturity, client assessments, and domain scores"
                  className="w-full h-auto object-cover"
                />
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Social Proof Bar */}
      <div className="border-y border-slate-100 bg-slate-50/50 py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-3 text-sm text-slate-400 font-medium">
            <span>ISO/IEC 42001 aligned</span>
            <span className="hidden sm:inline text-slate-200">|</span>
            <span>NIST AI RMF aligned</span>
            <span className="hidden sm:inline text-slate-200">|</span>
            <span>Multitenant architecture</span>
            <span className="hidden sm:inline text-slate-200">|</span>
            <span>Executive-grade reporting</span>
          </div>
        </div>
      </div>

      {/* Features */}
      <section id="features" className="py-24 sm:py-32 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-20">
            <p className="text-sm font-semibold text-blue-600 uppercase tracking-wider mb-3">Platform capabilities</p>
            <h2 className="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
              The platform for scalable AI governance advisory
            </h2>
            <p className="mt-4 text-lg text-slate-500">
              Move from manual workshops and static slide decks to a structured, scalable advisory workflow.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            <FeatureCard
              icon={<ShieldCheck className="w-6 h-6" />}
              iconBg="bg-blue-50 text-blue-600"
              title="Framework-aligned assessments"
              description="Assess against ISO/IEC 42001 and NIST AI RMF using a structured, repeatable methodology your team can deliver consistently."
            />
            <FeatureCard
              icon={<FileText className="w-6 h-6" />}
              iconBg="bg-indigo-50 text-indigo-600"
              title="Executive-ready reporting"
              description="Instantly generate board-level gap analysis and remediation reports that clients can act on. No more rebuilding slide decks."
            />
            <FeatureCard
              icon={<BarChart3 className="w-6 h-6" />}
              iconBg="bg-purple-50 text-purple-600"
              title="Portfolio intelligence"
              description="Track client maturity, systemic vulnerabilities, and AI pilot readiness across your entire advisory portfolio from one view."
            />
            <FeatureCard
              icon={<Layers className="w-6 h-6" />}
              iconBg="bg-sky-50 text-sky-600"
              title="Multitenant by design"
              description="Every consulting firm gets a secure, isolated environment to manage assessments across all client accounts."
            />
            <FeatureCard
              icon={<TrendingUp className="w-6 h-6" />}
              iconBg="bg-emerald-50 text-emerald-600"
              title="Revenue expansion engine"
              description="Turn each assessment into roadmap, remediation, governance, security, and advisory follow-on work for your firm."
            />
            <FeatureCard
              icon={<Zap className="w-6 h-6" />}
              iconBg="bg-amber-50 text-amber-600"
              title="12-month roadmap generation"
              description="Automatically produce a phased implementation plan your clients can use to prioritise remediation across four quarters."
            />
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-24 sm:py-32 bg-slate-50 border-y border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-20">
            <p className="text-sm font-semibold text-blue-600 uppercase tracking-wider mb-3">How it works</p>
            <h2 className="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
              From AI assessment to board-ready remediation planning
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-16">
            <StepCard
              step="01"
              title="Assess"
              description="Run a structured AI governance assessment aligned to ISO/IEC 42001 and NIST AI RMF. Score maturity across every governance domain."
            />
            <StepCard
              step="02"
              title="Report"
              description="Generate executive-ready gap analysis and remediation outputs. Export PDF reports your clients can take straight to their board."
            />
            <StepCard
              step="03"
              title="Expand"
              description="Use the findings to open follow-on roadmap, governance, risk, and implementation engagements. Each assessment creates pipeline."
            />
          </div>
        </div>
      </section>

      {/* Who It's For */}
      <section className="py-24 sm:py-32 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-20">
            <p className="text-sm font-semibold text-blue-600 uppercase tracking-wider mb-3">Who it's for</p>
            <h2 className="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
              Productise AI readiness assessments at scale
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <AudienceCard
              icon={<Building2 className="w-7 h-7" />}
              title="MSPs"
              description="Add AI governance assessments and roadmap services to your advisory stack. Deliver a new revenue line without building tooling from scratch."
            />
            <AudienceCard
              icon={<Briefcase className="w-7 h-7" />}
              title="IT Consultancies"
              description="Standardise AI readiness engagements and produce sharper executive outputs. Shorten time from workshop to deliverable."
            />
            <AudienceCard
              icon={<UserCheck className="w-7 h-7" />}
              title="Independent AI Advisors"
              description="Deliver premium governance assessments without building your own platform. Focus on advisory, not infrastructure."
            />
          </div>
        </div>
      </section>

      {/* Why Critera */}
      <section className="py-24 sm:py-32 bg-slate-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:grid lg:grid-cols-2 lg:gap-16 items-center">
            <div>
              <p className="text-sm font-semibold text-blue-400 uppercase tracking-wider mb-3">Why Critera</p>
              <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl">
                AI governance, operationalised for consultancies.
              </h2>
              <p className="mt-6 text-lg text-slate-400 leading-relaxed">
                Critera gives your firm a repeatable way to assess AI readiness, expose governance gaps, and create follow-on remediation work. Stop rebuilding assessments from scratch for every engagement.
              </p>
            </div>

            <div className="mt-12 lg:mt-0">
              <ul className="space-y-5">
                <BenefitItem text="Standardise your AI governance delivery across every consultant" />
                <BenefitItem text="Shorten time to executive-ready output from days to minutes" />
                <BenefitItem text="Create consistent, repeatable client engagements" />
                <BenefitItem text="Surface follow-on consulting opportunities faster" />
                <BenefitItem text="Manage AI governance across all clients from one place" />
                <BenefitItem text="Give your clients confidence in AI adoption" />
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-24 sm:py-32 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
            Ready to scale your AI governance practice?
          </h2>
          <p className="mt-6 text-lg text-slate-500 max-w-xl mx-auto">
            Give your clients executive-level clarity on AI risk, controls, readiness, and next steps. See how Critera works for your firm.
          </p>
          <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/signup" className="inline-flex items-center justify-center px-8 py-3.5 text-base font-semibold rounded-lg text-white bg-blue-600 hover:bg-blue-700 transition-all shadow-sm hover:shadow-md">
              Book a Demo <ArrowRight className="ml-2 w-4 h-4" />
            </Link>
            <Link to="/login" className="inline-flex items-center justify-center px-8 py-3.5 text-base font-semibold rounded-lg text-slate-700 bg-white border border-slate-200 hover:bg-slate-50 transition-all">
              Talk to Us
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 border-t border-slate-800 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-2.5">
            <img src={`${import.meta.env.BASE_URL}critera-icon.png`} alt="Critera" className="w-6 h-6 object-contain brightness-200" />
            <span className="font-bold text-white tracking-tight text-lg">Critera</span>
            <span className="text-slate-500 text-sm ml-2">by Quantum Leap</span>
          </div>
          <p className="text-slate-500 text-sm">
            &copy; {new Date().getFullYear()} Quantum Leap. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};


/* ------------------------------------------------------------------ */
/*  Sub-components                                                     */
/* ------------------------------------------------------------------ */

const FeatureCard: React.FC<{ icon: React.ReactNode; iconBg: string; title: string; description: string }> = ({ icon, iconBg, title, description }) => (
  <div className="group bg-white rounded-2xl p-8 border border-slate-100 shadow-sm hover:shadow-lg hover:border-slate-200 transition-all duration-300">
    <div className={`w-12 h-12 rounded-xl ${iconBg} flex items-center justify-center mb-5`}>
      {icon}
    </div>
    <h3 className="text-lg font-bold text-slate-900 mb-2">{title}</h3>
    <p className="text-slate-500 leading-relaxed text-[0.95rem]">{description}</p>
  </div>
);

const StepCard: React.FC<{ step: string; title: string; description: string }> = ({ step, title, description }) => (
  <div className="text-center md:text-left">
    <div className="text-5xl font-extrabold text-slate-200 mb-4">{step}</div>
    <h3 className="text-xl font-bold text-slate-900 mb-3">{title}</h3>
    <p className="text-slate-500 leading-relaxed">{description}</p>
  </div>
);

const AudienceCard: React.FC<{ icon: React.ReactNode; title: string; description: string }> = ({ icon, title, description }) => (
  <div className="bg-slate-50 rounded-2xl p-8 border border-slate-100 hover:border-slate-200 hover:shadow-md transition-all duration-300">
    <div className="w-14 h-14 rounded-xl bg-white border border-slate-100 text-slate-700 flex items-center justify-center mb-6 shadow-sm">
      {icon}
    </div>
    <h3 className="text-xl font-bold text-slate-900 mb-3">{title}</h3>
    <p className="text-slate-500 leading-relaxed">{description}</p>
  </div>
);

const BenefitItem: React.FC<{ text: string }> = ({ text }) => (
  <li className="flex items-start gap-3">
    <CheckCircle2 className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
    <span className="text-slate-300 leading-relaxed">{text}</span>
  </li>
);
