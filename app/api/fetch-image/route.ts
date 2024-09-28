import { NextResponse } from 'next/server';
import axios from 'axios';

export async function POST(req: Request) {
  try {
    const { imageUrl } = await req.json();

    if (!imageUrl) {
      return NextResponse.json({ error: 'Image URL is required' }, { status: 400 });
    }

    const response = await axios.get(imageUrl, {
      responseType: 'arraybuffer'
    });

    const buffer = Buffer.from(response.data, 'binary');
    return new NextResponse(buffer, {
      headers: {
        'Content-Type': 'image/jpeg'
      }
    });
  } catch (error) {
    console.error('Error in fetch-image API route:', error);
    if (axios.isAxiosError(error)) {
      return NextResponse.json({ 
        error: 'Failed to fetch image', 
        details: error.message,
        status: error.response?.status
      }, { status: 500 });
    }
    return NextResponse.json({ error: 'An unexpected error occurred' }, { status: 500 });
  }
}