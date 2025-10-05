import React from 'react';
import type { AnalysisResult } from '../types';
import RetryIcon from './icons/RetryIcon';

interface EmotionAnalysisProps {
  emoji?: string;
  analysis: AnalysisResult;
  onRetry: () => void;
}

const EmotionAnalysis = ({ emoji, analysis, onRetry }: EmotionAnalysisProps) => {
  const youtubeEmbedUrl = `https://www.youtube.com/embed/${analysis.youtubeVideoId}?autoplay=1`;

  return (
    <div className="w-full max-w-2xl mx-auto p-4 flex flex-col items-center">

        <div className="w-full bg-white/70 backdrop-blur-md p-6 rounded-xl shadow-lg">
            
            <h2 className="text-2xl font-bold text-gray-900 mb-4 text-center">Your Chosen Mood</h2>
            <div className="w-full max-w-sm aspect-square bg-gray-100 rounded-lg shadow-xl flex items-center justify-center mx-auto mb-6">
                <span className="text-9xl" aria-label={analysis.emotion}>{emoji}</span>
            </div>
            
            <div className="aspect-video w-full mb-4">
                <iframe
                    src={youtubeEmbedUrl}
                    title="YouTube video player"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="w-full h-full rounded-lg"
                ></iframe>
            </div>

            <h4 className="text-lg font-semibold text-gray-800 mb-2">Song Suggestion:</h4>
            <p className="text-2xl font-bold text-green-600">{analysis.songName}</p>
            <p className="text-gray-500 mb-4">by {analysis.artist}</p>

            <hr className="border-gray-300 my-4" />

            <h3 className="text-xl font-bold text-blue-600 mb-2">Emotion: <span className="text-gray-900">{analysis.emotion}</span></h3>
            <p className="text-gray-700 italic">"{analysis.reasoning}"</p>
        </div>

        <button
            onClick={onRetry}
            className="mt-8 bg-indigo-600 text-white font-bold py-3 px-6 rounded-lg hover:bg-indigo-700 transition-colors duration-300 flex items-center gap-2"
        >
            <RetryIcon /> Try Another Mood
        </button>
    </div>
  );
};

export default EmotionAnalysis;
