import React from 'react';

export const Footer: React.FC<{ isAtturraBranded: boolean }> = ({ isAtturraBranded }) => {
  return (
    <footer className={`mt-auto py-6 border-t ${isAtturraBranded ? 'bg-gray-50 text-gray-600' : 'bg-gray-50 text-gray-500'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center text-xs">
          <p className="mb-2 md:mb-0">
            © {new Date().getFullYear()} {isAtturraBranded ? 'Atturra' : 'Assessment Tool'}. All rights reserved.
          </p>
          <div className="max-w-2xl text-right">
            <p className="font-semibold text-gray-700">Disclaimer</p>
            <p>
              The output of this readiness assessment is advisory only. It is intended as a maturity and readiness assessment aid aligned loosely to recognised governance principles (such as ISO/IEC 42001 and NIST AI RMF). It does not constitute formal compliance, an official audit, or legal advice.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};
