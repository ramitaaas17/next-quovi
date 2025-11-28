// frontend/src/app/api/ai/[...path]/route.ts
import { NextRequest, NextResponse } from 'next/server';

// ✅ URL CORRECTA: Usar el nombre del contenedor en Docker
const AI_SERVICE_INTERNAL = process.env.AI_SERVICE_INTERNAL_URL || 'http://quovi_ai_service:5050';

export const maxDuration = 120; // 2 minutos para ML
export const dynamic = 'force-dynamic';

export async function POST(
  request: NextRequest,
  { params }: { params: { path: string[] } }
) {
  try {
    const path = params.path.join('/');
    const url = `${AI_SERVICE_INTERNAL}/api/ai/${path}`;
    
    console.log('🔄 [AI Proxy] POST:', url);
    
    const body = await request.json();
    console.log('📦 [AI Proxy] Body:', JSON.stringify(body, null, 2));
    
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
      signal: AbortSignal.timeout(120000), // 120s timeout
    });

    console.log('📡 [AI Proxy] Response status:', response.status);

    if (!response.ok) {
      const errorText = await response.text();
      console.error('❌ [AI Proxy] Error:', errorText);
      return NextResponse.json(
        { 
          error: `AI Service error: ${response.status}`, 
          details: errorText,
          ai_service_url: AI_SERVICE_INTERNAL
        },
        { status: response.status }
      );
    }

    const data = await response.json();
    console.log('✅ [AI Proxy] Success - Recommendations:', data.recomendaciones?.length || 0);
    
    return NextResponse.json(data, { status: 200 });
    
  } catch (error: any) {
    console.error('💥 [AI Proxy] Exception:', error.message);
    
    // Detectar tipo de error
    if (error.name === 'AbortError') {
      return NextResponse.json(
        { 
          error: 'Request timeout', 
          details: 'El servidor de IA tardó demasiado en responder. Intenta de nuevo.',
          ai_service: AI_SERVICE_INTERNAL 
        },
        { status: 504 }
      );
    }
    
    if (error.message.includes('ECONNREFUSED') || error.message.includes('fetch failed')) {
      return NextResponse.json(
        { 
          error: 'AI Service unavailable', 
          details: 'No se pudo conectar con el servicio de IA. Verifica que Docker esté corriendo.',
          ai_service: AI_SERVICE_INTERNAL,
          hint: 'Ejecuta: docker-compose ps para verificar que ai-service esté UP'
        },
        { status: 503 }
      );
    }
    
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
    const url = `${AI_SERVICE_INTERNAL}/api/ai/${path}${searchParams ? `?${searchParams}` : ''}`;

    console.log('🔄 [AI Proxy] GET:', url);

    const response = await fetch(url, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
      signal: AbortSignal.timeout(30000), // 30s timeout
    });

    const data = await response.json();
    return NextResponse.json(data, { status: response.status });
    
  } catch (error: any) {
    console.error('💥 [AI Proxy] GET Exception:', error.message);
    return NextResponse.json(
      { error: 'Proxy error', details: error.message },
      { status: 502 }
    );
  }
}