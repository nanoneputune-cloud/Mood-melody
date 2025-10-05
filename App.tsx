import React, { useState } from 'react';
import CameraCapture from './components/CameraCapture';
import EmotionAnalysis from './components/EmotionAnalysis';
import Loader from './components/Loader';
import { getSongSuggestionForEmotion, getEmotionFromImage } from './services/geminiService';
import type { AnalysisResult } from './types';

const App = () => {
  const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [loadingMessage, setLoadingMessage] = useState<string>("Analyzing your mood...");
  const [error, setError] = useState<string | null>(null);
  const [selectedEmoji, setSelectedEmoji] = useState<string | null>(null);

  const handleEmotionSelect = async (emotion: string, emoji: string) => {
    setLoadingMessage("Finding the perfect song...");
    setIsLoading(true);
    setError(null);
    setAnalysisResult(null);
    setSelectedEmoji(emoji);

    try {
      const result = await getSongSuggestionForEmotion(emotion);
      setAnalysisResult(result);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'An unexpected error occurred.';
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const handlePhotoCapture = async (base64Data: string) => {
    setLoadingMessage("Detecting your emotion...");
    setIsLoading(true);
    setError(null);
    setAnalysisResult(null);
    setSelectedEmoji(null);
    
    try {
      // Step 1: Detect emotion from the image
      const emotionResult = await getEmotionFromImage(base64Data);
      setSelectedEmoji(emotionResult.emoji);
      
      setLoadingMessage("Finding the perfect song...");
      // Step 2: Get song suggestion for the detected emotion
      const songResult = await getSongSuggestionForEmotion(emotionResult.emotion);
      setAnalysisResult(songResult);

    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'An unexpected error occurred.';
      setError(errorMessage);
    } finally {
        setIsLoading(false);
    }
  };


  const handleRetry = () => {
    setAnalysisResult(null);
    setError(null);
    setSelectedEmoji(null);
  };

  return (
    <div className="min-h-screen text-gray-800 flex flex-col items-center justify-center p-4">
      <header className="text-center mb-8 w-full">
        <img 
            src="https://ik.imagekit.io/y5m3udqts/Photoroom-20251005_030736517%20(1).png?updatedAt=1759614032227" 
            alt="Mood Melody Title" 
            className="w-full max-w-lg mx-auto h-auto object-contain"
        />
        <p className="text-gray-600 mt-2">Let AI find the perfect soundtrack for your emotions.</p>
      </header>
      
      <main className="w-full flex-grow flex items-center justify-center">
        {isLoading && <Loader message={loadingMessage} />}
        
        {error && !isLoading && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg relative max-w-md text-center" role="alert">
            <strong className="font-bold">Oops! Something went wrong.</strong>
            <span className="block sm:inline ml-2">{error}</span>
            <button
              onClick={handleRetry}
              className="mt-4 bg-red-500 text-white font-bold py-2 px-4 rounded hover:bg-red-600 transition-colors"
            >
              Try Again
            </button>
          </div>
        )}

        {!analysisResult && !error && (
            <CameraCapture 
                onPhotoCapture={handlePhotoCapture} 
                onEmotionSelect={handleEmotionSelect}
                isProcessing={isLoading}
            />
        )}

        {analysisResult && !isLoading && !error && (
            <EmotionAnalysis 
              emoji={selectedEmoji ?? undefined}
              analysis={analysisResult} 
              onRetry={handleRetry} 
            />
        )}
      </main>

       <footer className="text-center text-gray-600 text-sm mt-8">
          <p>Created by Srushti</p>
        </footer>
    </div>
  );
};

export default App;