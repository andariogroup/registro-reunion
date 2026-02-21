# Sistema de Registro de Asistencia v2

Aplicación web desarrollada con Next.js, React y Tailwind CSS para el registro de asistencia de empleados utilizando Google Sheets como base de datos.

## 🚀 Características

- **Autenticación de Colaboradores**: Sistema de login mediante cédula
- **Registro de Asistencia**: Búsqueda y actualización de asistencia de empleados
- **Integración con Google Sheets**: Base de datos en tiempo real usando Google Sheets
- **Interfaz Moderna**: Diseño responsive con Tailwind CSS
- **Notificaciones**: Feedback visual con Sonner

## 📋 Requisitos Previos

- Node.js 18+ instalado
- Cuenta de Google Cloud con servicio habilitado
- Google Sheet configurada con las hojas necesarias

## 🔧 Configuración

### 1. Instalación de Dependencias

```bash
npm install
```

### 2. Configuración de Google Sheets

1. Crea un proyecto en [Google Cloud Console](https://console.cloud.google.com/)
2. Habilita la API de Google Sheets
3. Crea una cuenta de servicio y descarga el archivo JSON de credenciales
4. Comparte tu Google Sheet con el email de la cuenta de servicio (dar permisos de Editor)
5. Obtén el ID de tu Google Sheet desde la URL:
   ```
   https://docs.google.com/spreadsheets/d/[SHEET_ID]/edit
   ```

### 3. Estructura de la Hoja de Cálculo

Tu Google Sheet debe tener dos hojas con las siguientes columnas:

#### Hoja "Colaboradores"
- `cedula` (texto)
- `nombre_completo` (texto)

#### Hoja "Asistentes"
- `cedula` (texto)
- `nombre_completo` (texto)
- `asistencia` (texto)
- `fecha_hora` (texto)
- `colaborador_registro` (texto)

### 4. Variables de Entorno

Crea un archivo `.env.local` en la raíz del proyecto:

```env
GOOGLE_SERVICE_ACCOUNT_EMAIL=tu-service-account@tu-proyecto.iam.gserviceaccount.com
GOOGLE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nTu clave privada aquí\n-----END PRIVATE KEY-----\n"
GOOGLE_SHEET_ID=tu-sheet-id-aqui
```

**Importante**: 
- La `GOOGLE_PRIVATE_KEY` debe incluir los caracteres `\n` literales para los saltos de línea
- Envuelve la clave privada entre comillas dobles
- El sistema reemplazará automáticamente `\n` por saltos de línea reales

## 🏃 Ejecución

### Modo Desarrollo

```bash
npm run dev
```

La aplicación estará disponible en [http://localhost:3000](http://localhost:3000)

### Modo Producción

```bash
npm run build
npm start
```

## 📁 Estructura del Proyecto

```
registro_asistenciav2/
├── app/
│   ├── api/
│   │   ├── auth/
│   │   │   └── route.ts          # API de autenticación
│   │   └── asistencia/
│   │       └── route.ts          # API de registro de asistencia
│   ├── login/
│   │   └── page.tsx              # Página de login
│   ├── registro/
│   │   └── page.tsx              # Dashboard de registro
│   ├── layout.tsx                # Layout principal
│   ├── page.tsx                  # Página principal (redirección)
│   └── globals.css               # Estilos globales
├── lib/
│   └── google-sheets.ts          # Funciones de integración con Google Sheets
├── .env.example                  # Ejemplo de variables de entorno
└── package.json
```

## 🔐 Flujo de Autenticación

1. El colaborador ingresa su cédula en la página de login
2. El sistema valida la cédula contra la hoja "Colaboradores"
3. Si es válida, se guarda la sesión en cookies HTTP-only
4. El colaborador es redirigido al dashboard de registro

## 📝 Flujo de Registro de Asistencia

1. El colaborador ingresa la cédula del empleado
2. El sistema busca el empleado en la hoja "Asistentes"
3. Si existe, se actualiza automáticamente:
   - `asistencia`: "Asistió"
   - `fecha_hora`: Fecha y hora actual (formato Colombia: DD/MM/YYYY HH:mm:ss)
   - `colaborador_registro`: Nombre del colaborador que registra

## 🛠️ Tecnologías Utilizadas

- **Next.js 14** - Framework React con App Router
- **React 18** - Biblioteca de UI
- **TypeScript** - Tipado estático
- **Tailwind CSS** - Framework de estilos
- **google-spreadsheet** - Cliente para Google Sheets API
- **google-auth-library** - Autenticación con Google
- **Sonner** - Sistema de notificaciones

## 📝 Notas

- Las cookies de sesión tienen una duración de 8 horas
- El formato de fecha y hora usa la zona horaria de Colombia (America/Bogota)
- Las cookies son HTTP-only para mayor seguridad
- En producción, las cookies se configuran como `secure` (requiere HTTPS)

## 🐛 Solución de Problemas

### Error: "Faltan variables de entorno"
- Verifica que el archivo `.env.local` existe y tiene todas las variables necesarias
- Asegúrate de que las variables están correctamente formateadas

### Error: "La hoja no existe"
- Verifica que las hojas se llaman exactamente "Colaboradores" y "Asistentes"
- Asegúrate de que la cuenta de servicio tiene permisos de edición en el Sheet

### Error de autenticación con Google
- Verifica que la cuenta de servicio tiene acceso al Sheet
- Revisa que la clave privada está correctamente formateada con los `\n`

## 📄 Licencia

Este proyecto es de uso interno.
