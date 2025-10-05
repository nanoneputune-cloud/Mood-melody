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

const emotionDetectionSchema = {
    type: Type.OBJECT,
    properties: {
        emotion: {
            type: Type.STRING,
            description: "The dominant emotion detected from the user's facial expression (e.g., Happy, Sad, Surprised)."
        },
        emoji: {
            type: Type.STRING,
            description: "An emoji that represents the detected emotion."
        }
    },
    required: ["emotion", "emoji"]
};

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

export async function getEmotionFromImage(base64ImageData: string): Promise<{ emotion: string; emoji: string; }> {
    const imagePart = {
        inlineData: {
            mimeType: 'image/jpeg',
            data: base64ImageData,
        },
    };
    const textPart = {
        text: "Analyze the facial expression in this image and identify the dominant emotion. Respond with the emotion and a corresponding emoji. Only choose from the following emotions: Happy, Sad, Romantic, Energetic, Calm, Devotional, Motivational, Nostalgic, Playful, Melancholic, Patriotic, Celebratory, Thoughtful, Angry, Hopeful. Respond ONLY with a JSON object matching the provided schema."
    };
    
    try {
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: { parts: [imagePart, textPart] },
            config: {
                responseMimeType: "application/json",
                responseSchema: emotionDetectionSchema,
            }
        });

        const jsonText = response.text.trim();
        const result = JSON.parse(jsonText);
        return result;
    } catch (error) {
        console.error("Error detecting emotion from image:", error);
        if (error instanceof Error) {
            throw new Error(`Failed to get emotion from Gemini API: ${error.message}`);
        }
        throw new Error("An unknown error occurred during emotion detection.");
    }
}

export async function getSongSuggestionForEmotion(emotion: string): Promise<AnalysisResult> {
  const prompt = `Suggest a Kannada song that fits the feeling of '${emotion}'. The song can be new, old, popular, or a hidden gem. Your goal is to provide a diverse and interesting suggestion. The response 'emotion' field should be exactly '${emotion}'. Describe why this song fits the mood. Provide the song name, artist, and the YouTube video ID for the song. Respond ONLY with a JSON object matching the provided schema.`;
  return getGeminiJsonResponse(prompt);
}