import { GoogleSpreadsheet } from 'google-spreadsheet';
import { JWT } from 'google-auth-library';

// Configuración de autenticación con Google Sheets
export async function getGoogleSheet() {
  const serviceAccountEmail = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL;
  const privateKey = process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n');
  const sheetId = process.env.GOOGLE_SHEET_ID;

  if (!serviceAccountEmail || !privateKey || !sheetId) {
    throw new Error('Faltan variables de entorno para Google Sheets');
  }

  if (sheetId === 'tu-sheet-id-aqui' || sheetId.includes('tu-sheet')) {
    throw new Error('GOOGLE_SHEET_ID no está configurado. Por favor, actualiza el archivo .env.local con el ID real de tu hoja de cálculo.');
  }

  // Autenticación con JWT
  const auth = new JWT({
    email: serviceAccountEmail,
    key: privateKey,
    scopes: ['https://www.googleapis.com/auth/spreadsheets'],
  });

  // Inicializar el documento
  const doc = new GoogleSpreadsheet(sheetId, auth);
  await doc.loadInfo();

  return doc;
}

// Obtener hoja por nombre
export async function getSheetByName(sheetName: string) {
  const doc = await getGoogleSheet();
  const sheet = doc.sheetsByTitle[sheetName];
  
  if (!sheet) {
    throw new Error(`La hoja "${sheetName}" no existe`);
  }

  await sheet.loadHeaderRow();
  return sheet;
}

// Buscar colaborador por cédula
export async function buscarColaborador(cedula: string) {
  try {
    const sheet = await getSheetByName('Colaboradores');
    const rows = await sheet.getRows();
    
    const colaborador = rows.find(row => row.get('cedula') === cedula);
    
    if (colaborador) {
      return {
        cedula: colaborador.get('cedula'),
        nombre_completo: colaborador.get('nombre_completo'),
      };
    }
    
    return null;
  } catch (error) {
    console.error('Error al buscar colaborador:', error);
    throw error;
  }
}

// Buscar asistente por cédula
export async function buscarAsistente(cedula: string) {
  try {
    const sheet = await getSheetByName('Asistentes');
    const rows = await sheet.getRows();
    
    const asistente = rows.find(row => row.get('cedula') === cedula);
    
    if (asistente) {
      return {
        cedula: asistente.get('cedula'),
        nombre_completo: asistente.get('nombre_completo'),
        asistencia: asistente.get('asistencia'),
        fecha_hora: asistente.get('fecha_hora'),
        colaborador_registro: asistente.get('colaborador_registro'),
        rowIndex: asistente.rowNumber - 1, // Índice de la fila (0-based)
      };
    }
    
    return null;
  } catch (error) {
    console.error('Error al buscar asistente:', error);
    throw error;
  }
}

// Actualizar asistencia de un empleado
export async function actualizarAsistencia(
  cedula: string,
  colaboradorRegistro: string
) {
  try {
    const sheet = await getSheetByName('Asistentes');
    const rows = await sheet.getRows();
    
    const asistente = rows.find(row => row.get('cedula') === cedula);
    
    if (!asistente) {
      return { success: false, message: 'Empleado no encontrado' };
    }

    // Formatear fecha y hora en formato Colombia (DD/MM/YYYY HH:mm:ss)
    const now = new Date();
    const fechaHora = new Intl.DateTimeFormat('es-CO', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false,
      timeZone: 'America/Bogota',
    }).format(now).replace(',', '');

    // Actualizar los campos
    asistente.set('asistencia', 'Asistió');
    asistente.set('fecha_hora', fechaHora);
    asistente.set('colaborador_registro', colaboradorRegistro);
    
    await asistente.save();

    return {
      success: true,
      message: `Asistencia registrada para ${asistente.get('nombre_completo')}`,
      nombre: asistente.get('nombre_completo'),
    };
  } catch (error) {
    console.error('Error al actualizar asistencia:', error);
    throw error;
  }
}
