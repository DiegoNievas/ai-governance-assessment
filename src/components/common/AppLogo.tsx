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
    <div className={`flex items-center gap-2.5 ${className}`}>
      <img
        src={`${import.meta.env.BASE_URL}critera-icon.png`}
        alt="Critera"
        className={`${sizeClasses[size]} object-contain drop-shadow-sm`}
      />
      <span className="font-bold text-gray-900 tracking-tight">Critera</span>
    </div>
  );
};
