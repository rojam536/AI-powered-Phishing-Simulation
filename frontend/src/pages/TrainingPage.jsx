import React from 'react';
import { 
  ShieldAlert, 
  Search, 
  MousePointerClick, 
  AlertTriangle,
  Lightbulb,
  CheckCircle2,
  ChevronRight
} from 'lucide-react';

const TrainingPage = () => {
  return (
    <div className="max-w-4xl mx-auto space-y-12 pb-12">
      {/* Header Warning */}
      <div className="text-center space-y-4">
        <div className="inline-flex items-center justify-center p-4 bg-red-100 text-red-600 rounded-2xl mb-2">
          <ShieldAlert size={48} />
        </div>
        <h2 className="text-4xl font-black text-slate-900">It's a Phishing Simulation!</h2>
        <p className="text-slate-500 text-lg max-w-2xl mx-auto">
          You recently clicked on a link in a simulated phishing email. Don't worry—this was an internal test to help you stay safe.
        </p>
      </div>

      {/* Anatomy of the Attack */}
      <div className="bg-white rounded-3xl shadow-xl border border-slate-100 overflow-hidden">
        <div className="bg-slate-900 p-6 text-white">
          <h3 className="text-xl font-bold flex items-center gap-2">
            <Search className="text-blue-400" size={20} />
            Anatomy of the Phishing Email
          </h3>
        </div>
        <div className="p-8 space-y-8">
          <div className="relative border-2 border-slate-100 rounded-2xl p-6 bg-slate-50">
            {/* Mock Email View */}
            <div className="space-y-4">
              <div className="flex gap-2 text-sm">
                <span className="font-bold text-slate-600 w-16">From:</span>
                <span className="text-slate-500">IT Security <span className="bg-red-100 text-red-700 px-1 rounded">security-update@compnay-it.net</span></span>
                <span className="ml-auto flex items-center gap-1 text-red-600 font-bold text-xs">
                  <AlertTriangle size={14} /> FLAG: SENDER DOMAIN MISPELLED
                </span>
              </div>
              <div className="flex gap-2 text-sm border-b border-slate-200 pb-4">
                <span className="font-bold text-slate-600 w-16">Subject:</span>
                <span className="text-slate-800 font-semibold">URGENT: Your account has been compromised!</span>
              </div>
              <div className="py-4 space-y-4 text-slate-700 leading-relaxed">
                <p>Hello Employee,</p>
                <p>
                  We detected unusual login activity on your workstation. 
                  Failure to verify your identity within <span className="font-bold underline">1 hour</span> will result in immediate account lockout.
                </p>
                <div className="relative group inline-block">
                  <button className="bg-blue-600 text-white px-6 py-2 rounded-lg font-bold">
                    Verify Account Now
                  </button>
                  <div className="absolute -top-12 left-0 bg-red-600 text-white text-xs py-2 px-4 rounded shadow-lg">
                    HOVER: http://secure-login.verify-me.xyz/track/123
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex gap-4 p-4 rounded-2xl bg-orange-50 border border-orange-100">
              <MousePointerClick className="text-orange-500 shrink-0" size={24} />
              <div>
                <h4 className="font-bold text-orange-900 mb-1">Suspicious Links</h4>
                <p className="text-sm text-orange-800">
                  Always hover over buttons to see the real URL. In this case, the link leads to a non-company domain.
                </p>
              </div>
            </div>
            <div className="flex gap-4 p-4 rounded-2xl bg-red-50 border border-red-100">
              <AlertTriangle className="text-red-500 shrink-0" size={24} />
              <div>
                <h4 className="font-bold text-red-900 mb-1">Sense of Urgency</h4>
                <p className="text-sm text-red-800">
                  Phishers use threats (like account lockout) to stop you from thinking clearly.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Learning Tips */}
      <div className="space-y-6">
        <h3 className="text-2xl font-bold text-slate-900 text-center">How to Stay Safe</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { title: 'Check Sender', desc: 'Verify the email address, not just the display name.' },
            { title: 'Verify Source', desc: 'When in doubt, contact the department via a known channel.' },
            { title: 'Report Phish', desc: 'Use the official "Report Phish" button in your inbox.' }
          ].map((tip, i) => (
            <div key={i} className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm text-center space-y-3">
              <div className="mx-auto w-10 h-10 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center">
                <CheckCircle2 size={24} />
              </div>
              <h4 className="font-bold text-slate-800">{tip.title}</h4>
              <p className="text-sm text-slate-500">{tip.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Final Action */}
      <div className="bg-blue-600 rounded-3xl p-10 text-center text-white space-y-6 shadow-xl shadow-blue-200">
        <div className="mx-auto w-16 h-16 bg-white/20 rounded-full flex items-center justify-center">
          <Lightbulb size={32} />
        </div>
        <div className="space-y-2">
          <h3 className="text-2xl font-bold">Ready to complete your training?</h3>
          <p className="text-blue-100">Take a quick 2-minute quiz to earn your security badge.</p>
        </div>
        <button className="inline-flex items-center gap-2 bg-white text-blue-600 px-8 py-3 rounded-xl font-bold hover:bg-blue-50 transition-colors">
          Start Training Quiz
          <ChevronRight size={20} />
        </button>
      </div>
    </div>
  );
};

export default TrainingPage;
