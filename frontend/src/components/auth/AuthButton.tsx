import React from 'react';

interface AuthButtonProps {
  type: "submit" | "button";
  text: string;
  disabled?: boolean; // Add optional disabled prop
  onClick?: () => void;
}

export default function AuthButton({ type, text, disabled, onClick }: AuthButtonProps) {
  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${
        disabled ? 'opacity-50 cursor-not-allowed' : ''
      }`}
    >
      {text}
    </button>
  );

}