// frontend/src/app/api/ai/[...path]/route.ts
import { NextRequest, NextResponse } from 'next/server';

const AI_SERVICE_INTERNAL = process.env.AI_SERVICE_INTERNAL_URL || 'http://ai-service:5050';

export const maxDuration = 120; // 2 minutos
export const dynamic = 'force-dynamic';

export async function POST(
  request: NextRequest,
  { params }: { params: { path: string[] } }
) {
  try {
    const path = params.path.join('/');
    const url = `${AI_SERVICE_INTERNAL}/${path}`;
    
    console.log('🔄 [API Proxy] POST:', url);
    
    const body = await request.json();
    console.log('📦 [API Proxy] Body keys:', Object.keys(body));
    
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });

    console.log('📡 [API Proxy] Response status:', response.status);

    if (!response.ok) {
      const errorText = await response.text();
      console.error('❌ [API Proxy] Error:', errorText);
      return NextResponse.json(
        { error: `AI Service error: ${response.status}`, details: errorText },
        { status: response.status }
      );
    }

    const data = await response.json();
    console.log('✅ [API Proxy] Success');
    
    return NextResponse.json(data, { status: 200 });
    
  } catch (error: any) {
    console.error('💥 [API Proxy] Exception:', error.message);
    return NextResponse.json(
      { 
        error: 'Proxy error', 
        details: error.message,
        ai_service: AI_SERVICE_INTERNAL 
      },
      { status: 502 }
    );
  }
}

export async function GET(
  request: NextRequest,
  { params }: { params: { path: string[] } }
) {
  try {
    const path = params.path.join('/');
    const searchParams = request.nextUrl.searchParams.toString();
    const url = `${AI_SERVICE_INTERNAL}/${path}${searchParams ? `?${searchParams}` : ''}`;

    console.log('🔄 [API Proxy] GET:', url);

    const response = await fetch(url, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    });

    const data = await response.json();
    return NextResponse.json(data, { status: response.status });
    
  } catch (error: any) {
    console.error('💥 [API Proxy] GET Exception:', error.message);
    return NextResponse.json(
      { error: 'Proxy error', details: error.message },
      { status: 502 }
    );
  }
}