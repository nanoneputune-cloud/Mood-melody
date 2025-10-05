import React, { useRef, useEffect, useState, useCallback } from 'react';
import CameraIcon from './icons/CameraIcon';

interface CameraCaptureProps {
  onPhotoCapture: (base64Data: string) => void;
  onEmotionSelect: (emotion: string, emoji: string) => void;
  isProcessing: boolean;
}

const emotions = [
  { name: 'Happy', emoji: '😄' },
  { name: 'Sad', emoji: '😢' },
  { name: 'Romantic', emoji: '😍' },
  { name: 'Energetic', emoji: '🕺' },
  { name: 'Calm', emoji: '😌' },
  { name: 'Devotional', emoji: '🙏' },
  { name: 'Motivational', emoji: '🔥' },
  { name: 'Nostalgic', emoji: '🤔' },
  { name: 'Playful', emoji: '😜' },
  { name: 'Melancholic', emoji: '😔' },
  { name: 'Patriotic', emoji: '🇮🇳' },
  { name: 'Celebratory', emoji: '🎉' },
  { name: 'Thoughtful', emoji: '🧐' },
  { name: 'Angry', emoji: '😠' },
  { name: 'Hopeful', emoji: '✨' },
];

const CameraCapture = ({ onPhotoCapture, onEmotionSelect, isProcessing }: CameraCaptureProps) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [cameraError, setCameraError] = useState<string | null>(null);
  const [isCameraReady, setIsCameraReady] = useState(false);

  useEffect(() => {
    const enableCamera = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'user' } });
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
        setIsCameraReady(true);
      } catch (err) {
        console.error("Error accessing camera:", err);
        setCameraError("Camera access was denied. Please allow camera permissions in your browser settings to use this feature.");
      }
    };

    enableCamera();

    return () => {
      if (videoRef.current && videoRef.current.srcObject) {
        const stream = videoRef.current.srcObject as MediaStream;
        stream.getTracks().forEach(track => track.stop());
      }
    };
  }, []);

  const handleCapture = useCallback(() => {
    if (!videoRef.current || !canvasRef.current || isProcessing) return;
    
    const video = videoRef.current;
    const canvas = canvasRef.current;
    
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    
    const context = canvas.getContext('2d');
    if (context) {
        // Flip the image horizontally to create a mirror effect
        context.translate(canvas.width, 0);
        context.scale(-1, 1);
        context.drawImage(video, 0, 0, canvas.width, canvas.height);
        const dataUrl = canvas.toDataURL('image/jpeg');
        const base64Data = dataUrl.split(',')[1];
        onPhotoCapture(base64Data);
    }
  }, [onPhotoCapture, isProcessing]);

  return (
    <div className="flex flex-col items-center justify-center w-full max-w-4xl mx-auto p-4">
      <div className="w-full text-center">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">Find a Song for Your Mood</h2>
        <p className="text-gray-600 mb-8">Let our AI detect your mood from your camera, or select one manually.</p>

        <div className="w-full max-w-md mx-auto bg-gray-200 rounded-xl shadow-lg overflow-hidden relative mb-6 aspect-square flex items-center justify-center">
            <video ref={videoRef} autoPlay playsInline muted className="w-full h-full object-cover transform scale-x-[-1]" />
            <canvas ref={canvasRef} className="hidden" />
            
            {!isCameraReady && !cameraError && (
                <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col items-center justify-center text-white">
                    <div className="w-8 h-8 border-2 border-white border-t-transparent rounded-full animate-spin mb-4"></div>
                    <p className="text-lg">Starting camera...</p>
                </div>
            )}
            {cameraError && (
                 <div className="absolute inset-0 bg-red-800 bg-opacity-90 flex items-center justify-center p-4">
                    <p className="text-white text-center font-semibold">{cameraError}</p>
                </div>
            )}
        </div>

        <button
            onClick={handleCapture}
            disabled={!isCameraReady || isProcessing}
            className="bg-indigo-600 text-white font-bold py-4 px-8 rounded-full hover:bg-indigo-700 transition-all duration-300 flex items-center gap-3 text-lg shadow-lg disabled:bg-gray-400 disabled:cursor-not-allowed transform hover:scale-105"
            aria-label="Detect my mood from camera"
        >
            <CameraIcon />
            {isProcessing ? 'Analyzing...' : 'Detect My Mood'}
        </button>
        
        <div className="mt-12 w-full">
            <div className="relative flex py-5 items-center">
                <div className="flex-grow border-t border-gray-300"></div>
                <span className="flex-shrink mx-4 text-gray-500 uppercase">Or</span>
                <div className="flex-grow border-t border-gray-300"></div>
            </div>

            <p className="text-gray-600 mb-6 -mt-2">Choose your mood manually:</p>
            <div className="flex flex-wrap justify-center gap-4">
                {emotions.map(({ name, emoji }) => (
                <button
                    key={name}
                    onClick={() => onEmotionSelect(name, emoji)}
                    disabled={isProcessing}
                    className="bg-white text-gray-800 font-semibold py-3 px-4 rounded-lg hover:bg-gray-100 border border-gray-200 transition-all duration-300 flex flex-col items-center gap-2 w-28 h-28 justify-center shadow-md transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
                    aria-label={`Find a song for ${name} mood`}
                >
                    <span className="text-4xl" aria-hidden="true">{emoji}</span>
                    <span>{name}</span>
                </button>
                ))}
            </div>
        </div>
      </div>
    </div>
  );
};

export default CameraCapture;