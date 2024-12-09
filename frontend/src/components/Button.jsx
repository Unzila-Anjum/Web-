import React from 'react';

const Button = ({ 
  children, 
  onClick, 
  disabled = false, 
  className = '',
  type = 'button'
}) => {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
        disabled 
          ? 'opacity-50 cursor-not-allowed' 
          : 'cursor-pointer'
      } ${className}`}
    >
      {children}
    </button>
  );
};

export default Button;