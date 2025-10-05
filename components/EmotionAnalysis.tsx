import React from 'react';
import type { AnalysisResult } from '../types';
import RetryIcon from './icons/RetryIcon';

interface EmotionAnalysisProps {
<<<<<<< HEAD
<<<<<<< HEAD
  imageSrc?: string;
=======
>>>>>>> a0786f6 (Add)
=======
>>>>>>> 76a6268 (Initial commit)
  emoji?: string;
  analysis: AnalysisResult;
  onRetry: () => void;
}

<<<<<<< HEAD
<<<<<<< HEAD
const EmotionAnalysis: React.FC<EmotionAnalysisProps> = ({ imageSrc, emoji, analysis, onRetry }) => {
  const youtubeEmbedUrl = `https://www.youtube.com/embed/${analysis.youtubeVideoId}?autoplay=1`;

  return (
    <div className="w-full max-w-4xl mx-auto p-4 flex flex-col items-center">
        <div className="w-full flex flex-col md:flex-row gap-8 items-start">

            <div className="w-full md:w-1/2 flex flex-col items-center order-2 md:order-1 mt-8 md:mt-0">
                {imageSrc ? (
                    <>
                        <h2 className="text-2xl font-bold text-gray-900 mb-4">Your Captured Moment</h2>
                        <img src={imageSrc} alt="Captured expression" className="rounded-lg shadow-xl w-full max-w-sm" />
                    </>
                ) : (
                    <>
                        <h2 className="text-2xl font-bold text-gray-900 mb-4">Your Chosen Mood</h2>
                         <div className="w-full max-w-sm aspect-square bg-gray-100 rounded-lg shadow-xl flex items-center justify-center">
                            <span className="text-9xl" aria-label={analysis.emotion}>{emoji}</span>
                        </div>
                    </>
                )}
            </div>
            
            <div className="w-full md:w-1/2 bg-white/70 backdrop-blur-md p-6 rounded-xl shadow-lg order-1 md:order-2">
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

=======
const EmotionAnalysis: React.FC<EmotionAnalysisProps> = ({ emoji, analysis, onRetry }) => {
=======
const EmotionAnalysis = ({ emoji, analysis, onRetry }: EmotionAnalysisProps) => {
>>>>>>> 76a6268 (Initial commit)
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
<<<<<<< HEAD
>>>>>>> a0786f6 (Add)
=======
>>>>>>> 76a6268 (Initial commit)
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

<<<<<<< HEAD
<<<<<<< HEAD
export default EmotionAnalysis;
=======
export default EmotionAnalysis;
>>>>>>> a0786f6 (Add)
=======
export default EmotionAnalysis;
>>>>>>> 76a6268 (Initial commit)
