import { NextRequest, NextResponse } from 'next/server';
import { buscarColaborador } from '@/lib/google-sheets';

export async function POST(request: NextRequest) {
  try {
    let cedula: string;
    
    try {
      const body = await request.json();
      cedula = body?.cedula;
    } catch (parseError) {
      return NextResponse.json(
        { success: false, message: 'Error al procesar la solicitud. Verifica que el cuerpo de la petición sea válido.' },
        { status: 400 }
      );
    }

    if (!cedula || typeof cedula !== 'string' || cedula.trim() === '') {
      return NextResponse.json(
        { success: false, message: 'La cédula es requerida' },
        { status: 400 }
      );
    }

    const colaborador = await buscarColaborador(cedula.trim());

    if (!colaborador) {
      return NextResponse.json(
        { success: false, message: 'Colaborador no encontrado' },
        { status: 404 }
      );
    }

    // Crear respuesta con cookie
    const response = NextResponse.json({
      success: true,
      colaborador: {
        cedula: colaborador.cedula,
        nombre_completo: colaborador.nombre_completo,
      },
    });

    // Guardar información del colaborador en cookie (válida por 8 horas)
    response.cookies.set('colaborador_cedula', colaborador.cedula, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 8, // 8 horas
      path: '/',
    });

    response.cookies.set('colaborador_nombre', colaborador.nombre_completo, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 8, // 8 horas
      path: '/',
    });

    return response;
  } catch (error) {
    console.error('Error en autenticación:', error);
    const errorMessage = error instanceof Error ? error.message : 'Error desconocido';
    
    // Mensaje más específico si falta el GOOGLE_SHEET_ID
    if (errorMessage.includes('GOOGLE_SHEET_ID')) {
      return NextResponse.json(
        { success: false, message: 'Error de configuración: ' + errorMessage },
        { status: 500 }
      );
    }
    
    // Mensaje si la hoja no existe (404)
    if (errorMessage.includes('404') || errorMessage.includes('not found')) {
      return NextResponse.json(
        { success: false, message: 'Error: La hoja de cálculo no existe o el GOOGLE_SHEET_ID es incorrecto. Verifica la configuración.' },
        { status: 500 }
      );
    }
    
    return NextResponse.json(
      { success: false, message: 'Error al autenticar colaborador: ' + errorMessage },
      { status: 500 }
    );
  }
}

// GET: Verificar sesión actual
export async function GET(request: NextRequest) {
  try {
    // Usar request.cookies directamente en lugar de cookies()
    const colaboradorCedula = request.cookies.get('colaborador_cedula')?.value;
    const colaboradorNombre = request.cookies.get('colaborador_nombre')?.value;

    if (!colaboradorCedula || !colaboradorNombre) {
      return NextResponse.json(
        { success: false, message: 'No hay sesión activa' },
        { status: 401 }
      );
    }

    return NextResponse.json({
      success: true,
      colaborador: {
        cedula: colaboradorCedula,
        nombre_completo: colaboradorNombre,
      },
    });
  } catch (error) {
    console.error('Error al verificar sesión:', error);
    const errorMessage = error instanceof Error ? error.message : 'Error desconocido';
    return NextResponse.json(
      { success: false, message: 'Error al verificar sesión: ' + errorMessage },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest) {
  const response = NextResponse.json({ success: true });
  response.cookies.delete('colaborador_cedula');
  response.cookies.delete('colaborador_nombre');
  return response;
}
