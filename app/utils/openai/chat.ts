'use server'

import { OpenAI }from "openai";

const openai_for_stories = new OpenAI({
  apiKey: process.env.OPENAI_STORY_API_KEY,
});

const openai_for_activities = new OpenAI({
  apiKey: process.env.OPENAI_ACTIVITY_API_KEY,
});

export async function generateStories(name: string, ageGroup: string, likes: string, dislikes: string, storyRequest: string, language: string) {

    console.log("kidsProfile:", name, ageGroup, likes, dislikes)
    console.log("storyRequest:", storyRequest)
    console.log("language:", language)

    const response = await openai_for_stories.chat.completions.create({
        model: "gpt-4o-mini",
        messages: [
            {
                "role": "user",
                "content": [
                    {
                        "type": "text",
                        "text": `Name: ${name}\nAge Group: ${ageGroup}\nLikes: ${likes}\nDislikes: ${dislikes}\nStory Request: ${storyRequest}\n in this Language: ${language}`
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

export async function generateImage (storyTitle: string) {
    const response = await openai_for_stories.images.generate({
        prompt: storyTitle,
        model: "dall-e-2",
        n: 1,
        size: "512x512"
    });
    return response.data[0].url;
}

export async function generateActivities(name: string, ageGroup: string, likes: string, dislikes: string, activityRequest: string, language: string) {

    console.log("kidsProfile:", name, ageGroup, likes, dislikes)
    console.log("activityRequest:", activityRequest)
    console.log("language:", language)

    const response = await openai_for_activities.chat.completions.create({
        model: "gpt-4o-mini",
        messages: [
            {
                "role": "user",
                "content": [
                    {
                        "type": "text",
                        "text": `Name: ${name}\nAge Group: ${ageGroup}\nLikes: ${likes}\nDislikes: ${dislikes}\nActivity Request: ${activityRequest}\n in this Language: ${language}`
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