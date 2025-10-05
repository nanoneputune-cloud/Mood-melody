import React from 'react';

interface LoaderProps {
    message?: string;
}

const Loader = ({ message = "Analyzing your mood..." }: LoaderProps) => {
  return (
    <div className="fixed inset-0 bg-white bg-opacity-80 flex flex-col justify-center items-center z-50 backdrop-blur-sm">
      <div className="w-16 h-16 border-4 border-t-4 border-gray-400 border-t-blue-500 rounded-full animate-spin"></div>
      <p className="text-gray-800 text-lg mt-4 font-semibold">{message}</p>
    </div>
  );
};

export default Loader;