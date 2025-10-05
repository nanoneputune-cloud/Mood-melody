import { GoogleGenAI, Type } from "@google/genai";
import type { AnalysisResult } from '../types';

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const analysisSchema = {
  type: Type.OBJECT,
  properties: {
    emotion: {
      type: Type.STRING,
      description: "The dominant emotion provided or detected (e.g., Happy, Sad, Romantic).",
    },
    reasoning: {
      type: Type.STRING,
      description: "A brief explanation of why the song was chosen based on the emotion.",
    },
    songName: {
      type: Type.STRING,
      description: "The name of the suggested Kannada song.",
    },
    artist: {
      type: Type.STRING,
      description: "The artist(s) of the song.",
    },
    youtubeVideoId: {
      type: Type.STRING,
      description: "The ID of the song's YouTube video.",
    },
  },
  required: ['emotion', 'reasoning', 'songName', 'artist', 'youtubeVideoId'],
};

function base64ToGenerativePart(base64Data: string, mimeType: string) {
  return {
    inlineData: {
      data: base64Data,
      mimeType,
    },
  };
}

async function getGeminiJsonResponse(contents: any): Promise<AnalysisResult> {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: contents,
      config: {
        responseMimeType: "application/json",
        responseSchema: analysisSchema,
      }
    });

    const jsonText = response.text.trim();
    const result = JSON.parse(jsonText) as AnalysisResult;
    return result;
  } catch (error) {
    console.error("Error analyzing input:", error);
    if (error instanceof Error) {
        throw new Error(`Failed to get song suggestion from Gemini API: ${error.message}`);
    }
    throw new Error("An unknown error occurred during analysis.");
  }
}

export async function analyzeImageForSongSuggestion(base64Image: string): Promise<AnalysisResult> {
  const imageMimeType = base64Image.substring(5, base64Image.indexOf(';'));
  const imageData = base64Image.split(',')[1];
  
  if (!imageData) {
      throw new Error("Invalid base64 image data");
  }

  const imagePart = base64ToGenerativePart(imageData, imageMimeType);
  
  const prompt = `Analyze the facial expression and dominant emotion in this image. Based on this analysis, suggest a Kannada song that perfectly matches the mood. The song can be new, old, popular, or a hidden gem. Your goal is to provide a diverse and interesting suggestion. Describe the detected emotion and provide a brief reason for your song choice. Finally, provide the song name, artist, and the YouTube video ID for the song. Respond ONLY with a JSON object matching the provided schema.`;

  const contents = { parts: [imagePart, { text: prompt }] };
  return getGeminiJsonResponse(contents);
}

export async function getSongSuggestionForEmotion(emotion: string): Promise<AnalysisResult> {
  const prompt = `Suggest a Kannada song that fits the feeling of '${emotion}'. The song can be new, old, popular, or a hidden gem. Your goal is to provide a diverse and interesting suggestion. The response 'emotion' field should be exactly '${emotion}'. Describe why this song fits the mood. Provide the song name, artist, and the YouTube video ID for the song. Respond ONLY with a JSON object matching the provided schema.`;
  return getGeminiJsonResponse(prompt);
}