'use server'

import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});


export async function generateStories(kidsProfile: any, storyRequest: any) {

    const response = await openai.chat.completions.create({
        model: "gpt-4o-mini",
          messages: [
            {
              "role": "system",
              "content": [
                {
                  "type": "text",
                  "text": "kidsProfile: " + kidsProfile + " storyRequest: " + storyRequest
                }
              ]
            }
          ],
          temperature: 0.7,
          max_tokens: 2048,
          top_p: 1,
          frequency_penalty: 0,
          presence_penalty: 0,
          response_format: {
            "type": "text"
          },
        });
        
    console.log(response.choices[0].message.content);
    return response.choices[0].message.content;
}

export async function generateActivities(kidsProfile: any, storyRequest: any) {

  const response = await openai.chat.completions.create({
      model: "gpt-4o-mini",
        messages: [
          {
            "role": "system",
            "content": [
              {
                "type": "text",
                "text": "kidsProfile: " + kidsProfile + " storyRequest: " + storyRequest
              }
            ]
          }
        ],
        temperature: 0.7,
        max_tokens: 2048,
        top_p: 1,
        frequency_penalty: 0,
        presence_penalty: 0,
        response_format: {
          "type": "text"
        },
      });
      
  console.log(response.choices[0].message.content);
  return response.choices[0].message.content;
}