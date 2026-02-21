# Guía Completa de Configuración - Google Sheets

Esta guía te llevará paso a paso para configurar Google Sheets como base de datos para el sistema de registro de asistencia.

---

## 📋 Índice

1. [Configuración de Google Cloud Platform](#1-configuración-de-google-cloud-platform)
2. [Creación de Cuenta de Servicio](#2-creación-de-cuenta-de-servicio)
3. [Configuración de la Hoja de Cálculo](#3-configuración-de-la-hoja-de-cálculo)
4. [Configuración de Variables de Entorno](#4-configuración-de-variables-de-entorno)
5. [Verificación y Pruebas](#5-verificación-y-pruebas)

---

## 1. Configuración de Google Cloud Platform

### Paso 1.1: Crear un Proyecto en Google Cloud

1. Ve a [Google Cloud Console](https://console.cloud.google.com/)
2. Si no tienes cuenta, crea una cuenta de Google (o usa una existente)
3. En la parte superior, haz clic en el selector de proyectos
4. Haz clic en **"Nuevo Proyecto"**
5. Completa el formulario:
   - **Nombre del proyecto**: `registro-asistencia` (o el nombre que prefieras)
   - **Organización**: Déjalo como está (si aplica)
   - **Ubicación**: Selecciona la organización o carpeta
6. Haz clic en **"Crear"**
7. Espera unos segundos y selecciona el proyecto recién creado

### Paso 1.2: Habilitar la API de Google Sheets

1. En el menú lateral izquierdo, ve a **"APIs y servicios"** > **"Biblioteca"**
2. En el buscador, escribe: **"Google Sheets API"**
3. Haz clic en **"Google Sheets API"**
4. Haz clic en el botón **"Habilitar"**
5. Espera a que se habilite (puede tardar unos segundos)
6. Verás un mensaje de confirmación cuando esté habilitada

**✅ Verificación**: Deberías ver "API habilitada" en verde en la parte superior

---

## 2. Creación de Cuenta de Servicio

### Paso 2.1: Crear la Cuenta de Servicio

1. En el menú lateral, ve a **"APIs y servicios"** > **"Credenciales"**
2. En la parte superior, haz clic en **"+ Crear credenciales"**
3. Selecciona **"Cuenta de servicio"**
4. Completa el formulario:
   - **Nombre**: `registro-asistencia-service` (o el nombre que prefieras)
   - **ID de cuenta de servicio**: Se genera automáticamente (puedes dejarlo así)
   - **Descripción**: `Cuenta de servicio para registro de asistencia`
5. Haz clic en **"Crear y continuar"**

### Paso 2.2: Asignar Roles (Opcional)

1. En la sección **"Otorgar acceso a este proyecto a la cuenta de servicio"**:
   - Puedes dejar los roles vacíos (no es necesario para este caso)
   - O asignar el rol **"Editor"** si quieres dar permisos amplios
2. Haz clic en **"Continuar"**
3. En la siguiente pantalla, haz clic en **"Listo"**

### Paso 2.3: Generar Clave JSON

1. En la lista de cuentas de servicio, busca la que acabas de crear
2. Haz clic en el **email de la cuenta de servicio** (termina en `@...iam.gserviceaccount.com`)
3. Ve a la pestaña **"Claves"**
4. Haz clic en **"Agregar clave"** > **"Crear nueva clave"**
5. Selecciona el formato **"JSON"**
6. Haz clic en **"Crear"**
7. **⚠️ IMPORTANTE**: Se descargará automáticamente un archivo JSON. **Guárdalo en un lugar seguro** (no lo subas a Git)

### Paso 2.4: Extraer Información del JSON

Abre el archivo JSON descargado. Debería verse así:

```json
{
  "type": "service_account",
  "project_id": "tu-proyecto-id",
  "private_key_id": "abc123...",
  "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQC...\n-----END PRIVATE KEY-----\n",
  "client_email": "registro-asistencia-service@tu-proyecto.iam.gserviceaccount.com",
  "client_id": "123456789",
  "auth_uri": "https://accounts.google.com/o/oauth2/auth",
  "token_uri": "https://oauth2.googleapis.com/token",
  "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
  "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/..."
}
```

**Necesitarás estos valores**:
- `client_email` → Será tu `GOOGLE_SERVICE_ACCOUNT_EMAIL`
- `private_key` → Será tu `GOOGLE_PRIVATE_KEY`

---

## 3. Configuración de la Hoja de Cálculo

### Paso 3.1: Crear la Hoja de Cálculo

1. Ve a [Google Sheets](https://sheets.google.com/)
2. Haz clic en **"En blanco"** para crear una nueva hoja
3. Nombra la hoja: `Registro de Asistencia` (o el nombre que prefieras)
4. **Guarda el ID de la hoja** desde la URL:
   ```
   https://docs.google.com/spreadsheets/d/[ESTE_ES_EL_ID]/edit
   ```
   Ejemplo: Si la URL es `https://docs.google.com/spreadsheets/d/1aB2cD3eF4gH5iJ6kL7mN8oP9qR0sT1uV2w/edit`
   El ID es: `1aB2cD3eF4gH5iJ6kL7mN8oP9qR0sT1uV2w`

### Paso 3.2: Crear la Hoja "Colaboradores"

1. En la parte inferior de la hoja, verás una pestaña que dice "Hoja 1"
2. Haz clic derecho en la pestaña y selecciona **"Renombrar"**
3. Cambia el nombre a: **`Colaboradores`** (exactamente así, con mayúscula inicial)
4. En la fila 1, ingresa los encabezados de las columnas:

| A | B |
|---|---|
| **cedula** | **nombre_completo** |

5. **Formato de los encabezados**:
   - Selecciona la fila 1
   - Haz clic en **"Formato"** > **"Texto"** > **"Negrita"**
   - Opcional: Colorea el fondo de la fila para distinguirla

6. **Agregar datos de ejemplo** (opcional, para pruebas):

| cedula | nombre_completo |
|--------|----------------|
| 1234567890 | Juan Pérez |
| 0987654321 | María García |

### Paso 3.3: Crear la Hoja "Asistentes"

1. Haz clic en el botón **"+"** en la parte inferior izquierda para crear una nueva hoja
2. Renombra la nueva hoja a: **`Asistentes`** (exactamente así, con mayúscula inicial)
3. En la fila 1, ingresa los encabezados:

| A | B | C | D | E |
|---|---|---|---|---|
| **cedula** | **nombre_completo** | **asistencia** | **fecha_hora** | **colaborador_registro** |

4. **Formato de los encabezados**:
   - Selecciona la fila 1
   - Haz clic en **"Formato"** > **"Texto"** > **"Negrita"**
   - Opcional: Colorea el fondo de la fila

5. **Agregar datos de ejemplo** (opcional, para pruebas):

| cedula | nombre_completo | asistencia | fecha_hora | colaborador_registro |
|--------|----------------|------------|------------|---------------------|
| 1111111111 | Carlos Rodríguez | | | |
| 2222222222 | Ana López | | | |

**Nota**: Las columnas `asistencia`, `fecha_hora` y `colaborador_registro` se llenarán automáticamente cuando se registre la asistencia.

### Paso 3.4: Ajustar Ancho de Columnas (Opcional)

1. Selecciona todas las columnas (haz clic en el encabezado de la columna y arrastra)
2. Haz doble clic en el borde entre dos columnas para autoajustar el ancho
3. O manualmente arrastra los bordes para ajustar el ancho

### Paso 3.5: Compartir la Hoja con la Cuenta de Servicio

**⚠️ ESTE PASO ES CRÍTICO**: Sin esto, la aplicación no podrá acceder a la hoja.

1. En tu Google Sheet, haz clic en el botón **"Compartir"** (esquina superior derecha)
2. En el campo "Agregar personas y grupos", pega el **email de la cuenta de servicio** que obtuviste en el Paso 2.4 (`client_email`)
   - Ejemplo: `registro-asistencia-service@tu-proyecto.iam.gserviceaccount.com`
3. Asegúrate de que el permiso sea **"Editor"** (no "Lector")
4. **Desmarca** la casilla "Notificar a las personas" (no es necesario notificar a una cuenta de servicio)
5. Haz clic en **"Compartir"**
6. Verás un mensaje de confirmación

**✅ Verificación**: 
- Ve a "Compartir" nuevamente
- Deberías ver el email de la cuenta de servicio en la lista con rol "Editor"

---

## 4. Configuración de Variables de Entorno

### Paso 4.1: Crear el Archivo .env.local

1. En la raíz del proyecto (`registro_asistenciav2`), crea un archivo llamado `.env.local`
2. Si ya existe `.env.example`, puedes copiarlo y renombrarlo

### Paso 4.2: Configurar las Variables

Abre el archivo `.env.local` y completa las siguientes variables:

```env
# Email de la cuenta de servicio (del JSON, campo "client_email")
GOOGLE_SERVICE_ACCOUNT_EMAIL=registro-asistencia-service@tu-proyecto.iam.gserviceaccount.com

# Clave privada (del JSON, campo "private_key")
# IMPORTANTE: Mantén las comillas dobles y los \n
GOOGLE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQC...\n-----END PRIVATE KEY-----\n"

# ID de la hoja de cálculo (de la URL)
GOOGLE_SHEET_ID=1aB2cD3eF4gH5iJ6kL7mN8oP9qR0sT1uV2w

# Entorno (development o production)
NODE_ENV=development
```

### Paso 4.3: Formato Correcto de GOOGLE_PRIVATE_KEY

**⚠️ MUY IMPORTANTE**: La clave privada debe tener este formato exacto:

1. **Copia TODO el valor del campo `private_key` del JSON** (incluyendo `-----BEGIN PRIVATE KEY-----` y `-----END PRIVATE KEY-----`)
2. **Mantén los `\n` literales** - NO los reemplaces por saltos de línea reales
3. **Envuelve todo entre comillas dobles**
4. El código automáticamente reemplazará `\n` por saltos de línea reales

**Ejemplo correcto**:
```env
GOOGLE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQC...\n-----END PRIVATE KEY-----\n"
```

**Ejemplo incorrecto** (NO hagas esto):
```env
GOOGLE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----
MIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQC...
-----END PRIVATE KEY-----"
```

### Paso 4.4: Verificar que el Archivo Está en .gitignore

Abre `.gitignore` y verifica que contenga:
```
.env*.local
.env
```

Esto asegura que tus credenciales no se suban a Git por accidente.

---

## 5. Verificación y Pruebas

### Paso 5.1: Instalar Dependencias

```bash
cd C:\Users\lucasian\Downloads\registro_asistenciav2
npm install
```

### Paso 5.2: Ejecutar la Aplicación

```bash
npm run dev
```

Deberías ver:
```
  ▲ Next.js 14.x.x
  - Local:        http://localhost:3000
```

### Paso 5.3: Probar el Login

1. Abre tu navegador en `http://localhost:3000`
2. Deberías ser redirigido a `/login`
3. Ingresa una cédula que exista en la hoja "Colaboradores"
4. Si todo está bien configurado, deberías:
   - Ver un mensaje de éxito
   - Ser redirigido al dashboard de registro
   - Ver tu nombre en la parte superior

### Paso 5.4: Probar el Registro de Asistencia

1. En el dashboard, ingresa una cédula que exista en la hoja "Asistentes"
2. Haz clic en "Registrar Asistencia"
3. Si todo está bien:
   - Verás un mensaje de éxito
   - En tu Google Sheet, la fila del empleado debería actualizarse con:
     - `asistencia`: "Asistió"
     - `fecha_hora`: Fecha y hora actual (formato DD/MM/YYYY HH:mm:ss)
     - `colaborador_registro`: Tu nombre

### Paso 5.5: Verificar en Google Sheets

1. Abre tu Google Sheet
2. Ve a la hoja "Asistentes"
3. Verifica que los datos se actualizaron correctamente

---

## 🔧 Solución de Problemas Comunes

### Error: "Faltan variables de entorno"

**Solución**:
- Verifica que el archivo `.env.local` existe en la raíz del proyecto
- Verifica que todas las variables están escritas correctamente
- Reinicia el servidor de desarrollo (`Ctrl+C` y luego `npm run dev`)

### Error: "La hoja 'Colaboradores' no existe"

**Solución**:
- Verifica que las hojas se llaman exactamente "Colaboradores" y "Asistentes" (con mayúscula inicial)
- Verifica que el `GOOGLE_SHEET_ID` es correcto
- Verifica que la cuenta de servicio tiene acceso al Sheet

### Error: "Colaborador no encontrado"

**Solución**:
- Verifica que la cédula existe en la hoja "Colaboradores"
- Verifica que la columna se llama exactamente "cedula" (minúsculas)
- Verifica que no hay espacios extra en la cédula

### Error de Autenticación con Google

**Solución**:
- Verifica que la API de Google Sheets está habilitada
- Verifica que la cuenta de servicio tiene acceso al Sheet (rol "Editor")
- Verifica que el `GOOGLE_PRIVATE_KEY` está correctamente formateado con los `\n`
- Verifica que el `GOOGLE_SERVICE_ACCOUNT_EMAIL` es correcto

### Error: "Empleado no encontrado"

**Solución**:
- Verifica que la cédula existe en la hoja "Asistentes"
- Verifica que la columna se llama exactamente "cedula" (minúsculas)
- Verifica que no hay espacios extra en la cédula

---

## 📝 Checklist Final

Antes de considerar la configuración completa, verifica:

- [ ] Proyecto creado en Google Cloud Platform
- [ ] API de Google Sheets habilitada
- [ ] Cuenta de servicio creada
- [ ] Clave JSON descargada y guardada de forma segura
- [ ] Hoja de cálculo creada con ID guardado
- [ ] Hoja "Colaboradores" creada con columnas correctas
- [ ] Hoja "Asistentes" creada con columnas correctas
- [ ] Hoja compartida con la cuenta de servicio (rol Editor)
- [ ] Archivo `.env.local` creado con todas las variables
- [ ] `GOOGLE_PRIVATE_KEY` correctamente formateado
- [ ] Aplicación ejecutándose sin errores
- [ ] Login funcionando correctamente
- [ ] Registro de asistencia funcionando correctamente

---

## 🎉 ¡Listo!

Si completaste todos los pasos y el checklist, tu aplicación debería estar funcionando correctamente. 

**Próximos pasos**:
- Agrega más colaboradores a la hoja "Colaboradores"
- Agrega más empleados a la hoja "Asistentes"
- Personaliza los estilos si lo deseas
- Despliega la aplicación en producción (Vercel, etc.)

---

## 📞 Soporte

Si encuentras algún problema que no está cubierto en esta guía, verifica:
1. Los logs de la consola del navegador (F12)
2. Los logs del servidor en la terminal
3. Los permisos de la cuenta de servicio en Google Sheets
