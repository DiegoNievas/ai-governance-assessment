import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer className="mt-auto py-6 border-t bg-gray-50 text-gray-500">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center text-sm">
          <p>
            &copy; {new Date().getFullYear()} Diego Nievas AI Advisory Tool. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};
