'use server';

import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI(
  process.env.GEMINI_API_KEY
);
const wait = (ms) =>
  new Promise((resolve) => setTimeout(resolve, ms));


export async function askAI(chartContext, question) {

  try {
    const model = genAI.getGenerativeModel({
      model: 'gemini-2.5-flash',
    });

    const prompt = `
You are an professional western astrologer. 

Answer questions in detail from the provided chart data.
Use only chart factors strictly relevant to the question.

No introductions or self-reference.
Use markdown bullets and headings.

If the topic is "Natal & Transit-Comparison Chart", ignore Natal Signs and Planets in Transit Chart and 
analyze only Transit Signs and Planets in Natal Chart and Natal & Transit Comparison Aspects.

Be insightful, concise and easy to understand.
Include detailed examples when relevant.

Answer in the questioned language.

CHART:
${chartContext}

CONVERSATION:
${question}

ASSISTANT:
`;


let retries = 3;
    let delay = 3000;

    while (retries > 0) {
      try {
        const result = await model.generateContent(prompt);
// 👇 SAFE LOGGING
console.log("TOKEN USAGE:", {
  input: result?.response?.usageMetadata?.promptTokenCount,
  output: result?.response?.usageMetadata?.candidatesTokenCount,
  total: result?.response?.usageMetadata?.totalTokenCount,
});
        return {
          success: true,
          content: result.response.text(),
        };

      } catch (err) {

        if (err?.status === 429) {
          return {
            success: false,
            content:
              "Lia is receiving too many requests right now 🌙 Please try again in a few minutes.",
          };
        }

        if (err?.status === 503) {
          retries--;

          if (retries === 0) {
            return {
              success: false,
              content:
                "Lia is a bit overwhelmed right now 🌙 Please try again shortly.",
            };
          }

          await wait(delay);
          delay *= 2;
          continue;
        }

        throw err;
      }
    }
  } catch (err) {
    console.error('Gemini Error:', err);

    return {
      success: false,
      content:
        "I'm unable to read the chart right now 🌙 Please try again later.",
    };
  }
}