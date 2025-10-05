<<<<<<< HEAD
import React, { useRef, useEffect, useState, useCallback } from 'react';
import CameraIcon from './icons/CameraIcon';

interface CameraCaptureProps {
  onCapture: (imageSrc: string) => void;
=======
import React from 'react';

interface CameraCaptureProps {
>>>>>>> a0786f6 (Add)
  onEmotionSelect: (emotion: string, emoji: string) => void;
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


<<<<<<< HEAD
const CameraCapture: React.FC<CameraCaptureProps> = ({ onCapture, onEmotionSelect }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [error, setError] = useState<string | null>(null);

  const startCamera = useCallback(async () => {
    try {
      setError(null);
      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: 'user' },
        audio: false,
      });
      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream;
      }
      setStream(mediaStream);
    } catch (err) {
      console.error('Error accessing camera:', err);
      setError('Could not access the camera. Please check permissions and try again.');
    }
  }, []);

  const stopCamera = useCallback(() => {
    if (stream) {
      stream.getTracks().forEach(track => track.stop());
      setStream(null);
    }
  }, [stream]);

  useEffect(() => {
    return () => {
      stopCamera();
    };
  }, [stopCamera]);

  const handleCapture = () => {
    if (videoRef.current && canvasRef.current) {
      const video = videoRef.current;
      const canvas = canvasRef.current;
      const context = canvas.getContext('2d');
      
      if (context) {
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        context.drawImage(video, 0, 0, video.videoWidth, video.videoHeight);
        const dataUrl = canvas.toDataURL('image/jpeg');
        onCapture(dataUrl);
        stopCamera();
      }
    }
  };

  return (
    <div className="flex flex-col items-center justify-center w-full max-w-4xl mx-auto p-4">
      {!stream ? (
        <div className="w-full text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-2">Find a Song for Your Mood</h2>
            <p className="text-gray-600 mb-6">Capture your expression and we'll find the perfect Kannada song for you.</p>
            <button
                onClick={startCamera}
                className="bg-blue-600 text-white font-bold py-3 px-6 rounded-lg hover:bg-blue-700 transition-colors duration-300 flex items-center gap-2 mx-auto"
            >
                <CameraIcon /> Start Camera
            </button>
            {error && <p className="text-red-500 mt-4">{error}</p>}
            
            <div className="my-12 flex items-center w-full max-w-2xl mx-auto">
              <div className="flex-grow border-t border-gray-300"></div>
              <span className="flex-shrink mx-4 text-gray-500 font-semibold">OR</span>
              <div className="flex-grow border-t border-gray-300"></div>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Pick a mood instead</h2>
              <div className="flex flex-wrap justify-center gap-4">
                {emotions.map(({ name, emoji }) => (
                  <button
                    key={name}
                    onClick={() => onEmotionSelect(name, emoji)}
                    className="bg-white text-gray-800 font-semibold py-3 px-4 rounded-lg hover:bg-gray-100 border border-gray-200 transition-all duration-300 flex flex-col items-center gap-2 w-28 h-28 justify-center shadow-md transform hover:scale-105"
                    aria-label={`Find a song for ${name} mood`}
                  >
                    <span className="text-4xl" aria-hidden="true">{emoji}</span>
                    <span>{name}</span>
                  </button>
                ))}
              </div>
            </div>
        </div>
      ) : (
        <div className="flex flex-col items-center w-full">
            <div className="w-full aspect-video bg-gray-200 rounded-lg overflow-hidden shadow-lg border-2 border-gray-300 mb-6">
                <video ref={videoRef} autoPlay playsInline className="w-full h-full object-cover transform -scale-x-100"></video>
            </div>
          
            <button
                onClick={handleCapture}
                className="bg-green-500 text-white font-bold py-3 px-8 rounded-full hover:bg-green-600 transition-colors duration-300 flex items-center gap-2 shadow-lg"
            >
                <CameraIcon /> Capture Photo
            </button>
        </div>
      )}
      <canvas ref={canvasRef} className="hidden"></canvas>
=======
const CameraCapture: React.FC<CameraCaptureProps> = ({ onEmotionSelect }) => {
  return (
    <div className="flex flex-col items-center justify-center w-full max-w-4xl mx-auto p-4">
      <div className="w-full text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">Find a Song for Your Mood</h2>
          <p className="text-gray-600 mb-12">Pick a mood and we'll find the perfect Kannada song for you.</p>
          
          <div className="flex flex-wrap justify-center gap-4">
            {emotions.map(({ name, emoji }) => (
              <button
                key={name}
                onClick={() => onEmotionSelect(name, emoji)}
                className="bg-white text-gray-800 font-semibold py-3 px-4 rounded-lg hover:bg-gray-100 border border-gray-200 transition-all duration-300 flex flex-col items-center gap-2 w-28 h-28 justify-center shadow-md transform hover:scale-105"
                aria-label={`Find a song for ${name} mood`}
              >
                <span className="text-4xl" aria-hidden="true">{emoji}</span>
                <span>{name}</span>
              </button>
            ))}
          </div>
      </div>
>>>>>>> a0786f6 (Add)
    </div>
  );
};

export default CameraCapture;
