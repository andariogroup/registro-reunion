import { NextRequest, NextResponse } from 'next/server';
import { buscarAsistente, actualizarAsistencia } from '@/lib/google-sheets';

// GET: Buscar asistente por cédula
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const cedula = searchParams.get('cedula');

    if (!cedula) {
      return NextResponse.json(
        { success: false, message: 'La cédula es requerida' },
        { status: 400 }
      );
    }

    const asistente = await buscarAsistente(cedula);

    if (!asistente) {
      return NextResponse.json(
        { success: false, message: 'Empleado no encontrado' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      asistente: {
        cedula: asistente.cedula,
        nombre_completo: asistente.nombre_completo,
        asistencia: asistente.asistencia,
        fecha_hora: asistente.fecha_hora,
        colaborador_registro: asistente.colaborador_registro,
      },
    });
  } catch (error) {
    console.error('Error al buscar asistente:', error);
    return NextResponse.json(
      { success: false, message: 'Error al buscar empleado' },
      { status: 500 }
    );
  }
}

// POST: Actualizar asistencia
export async function POST(request: NextRequest) {
  try {
    const colaboradorNombre = request.cookies.get('colaborador_nombre')?.value;
    const colaboradorCedula = request.cookies.get('colaborador_cedula')?.value;

    if (!colaboradorNombre || !colaboradorCedula) {
      return NextResponse.json(
        { success: false, message: 'No hay sesión activa. Por favor, inicia sesión.' },
        { status: 401 }
      );
    }

    const { cedula } = await request.json();

    if (!cedula) {
      return NextResponse.json(
        { success: false, message: 'La cédula es requerida' },
        { status: 400 }
      );
    }

    const resultado = await actualizarAsistencia(cedula, colaboradorNombre);

    if (!resultado.success) {
      return NextResponse.json(
        { success: false, message: resultado.message },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: resultado.message,
      nombre: resultado.nombre,
    });
  } catch (error) {
    console.error('Error al actualizar asistencia:', error);
    return NextResponse.json(
      { success: false, message: 'Error al registrar asistencia' },
      { status: 500 }
    );
  }
}
