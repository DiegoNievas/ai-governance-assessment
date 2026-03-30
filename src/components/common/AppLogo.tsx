import React from 'react';

interface AppLogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
}

export const AppLogo: React.FC<AppLogoProps> = ({ className = '', size = 'md' }) => {
  const sizeClasses = {
    sm: 'w-6 h-6',
    md: 'w-8 h-8',
    lg: 'w-12 h-12',
    xl: 'w-16 h-16',
  };

  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <img 
        src={`${import.meta.env.BASE_URL}app-icon.png`} 
        alt="Quantum Leap AI Logo" 
        className={`${sizeClasses[size]} object-contain drop-shadow-sm`}
      />
      <span className="font-bold text-gray-900 tracking-tight">Quantum<span className="text-blue-600">Leap</span></span>
    </div>
  );
};
