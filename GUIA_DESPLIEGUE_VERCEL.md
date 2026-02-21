# 🚀 Guía de Despliegue en Vercel

Esta guía te ayudará a desplegar el proyecto de Registro de Asistencia en Vercel.

## 📋 Pre-requisitos

1. Cuenta en [Vercel](https://vercel.com) (puedes usar GitHub para registrarte)
2. Proyecto subido a un repositorio Git (GitHub, GitLab o Bitbucket)
3. Variables de entorno configuradas localmente

## 🔧 Paso 1: Preparar el Proyecto

### Verificar que el proyecto esté listo

```bash
# Asegúrate de que el proyecto compile correctamente
npm run build
```

Si hay errores, corrígelos antes de continuar.

## 🌐 Paso 2: Crear Proyecto en Vercel

### Opción A: Desde el Dashboard de Vercel

1. Ve a [vercel.com](https://vercel.com) e inicia sesión
2. Haz clic en **"Add New Project"** o **"New Project"**
3. Conecta tu repositorio Git:
   - Si es la primera vez, autoriza a Vercel a acceder a tu cuenta de GitHub/GitLab
   - Selecciona el repositorio `registro_asistenciav2`
4. Vercel detectará automáticamente que es un proyecto Next.js

### Opción B: Desde la CLI de Vercel

```bash
# Instalar Vercel CLI globalmente
npm i -g vercel

# En el directorio del proyecto
cd C:\Users\lucasian\Downloads\registro_asistenciav2

# Iniciar despliegue
vercel
```

Sigue las instrucciones en la terminal.

## ⚙️ Paso 3: Configurar Variables de Entorno

**⚠️ CRÍTICO**: Debes configurar las variables de entorno en Vercel antes del despliegue.

### Desde el Dashboard de Vercel:

1. Ve a tu proyecto en Vercel
2. Haz clic en **"Settings"** → **"Environment Variables"**
3. Agrega las siguientes variables:

#### Variables Requeridas:

| Variable | Valor | Descripción |
|----------|-------|-------------|
| `GOOGLE_SERVICE_ACCOUNT_EMAIL` | `registro-asistencia-service@registro-asistencia-488121.iam.gserviceaccount.com` | Email de la cuenta de servicio |
| `GOOGLE_PRIVATE_KEY` | `"-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n"` | Clave privada completa (con comillas y \n) |
| `GOOGLE_SHEET_ID` | `1x0AFq3X__0zE-e3NdoJO9h4dAQs7vFOZsx1Nuay4LmA` | ID de la hoja de cálculo |
| `NODE_ENV` | `production` | Entorno de producción |

### Formato de GOOGLE_PRIVATE_KEY en Vercel:

**IMPORTANTE**: En Vercel, cuando ingreses `GOOGLE_PRIVATE_KEY`:

1. Copia TODO el valor del campo `private_key` del JSON (incluyendo `-----BEGIN PRIVATE KEY-----` y `-----END PRIVATE KEY-----`)
2. **Mantén los `\n` literales** - NO los reemplaces por saltos de línea reales
3. **Envuelve todo entre comillas dobles** en el campo de Vercel
4. Ejemplo:
   ```
   "-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQDm6qsHAROpmItW\n...\n-----END PRIVATE KEY-----\n"
   ```

### Configurar para cada entorno:

- **Production**: Marca todas las variables para Production
- **Preview**: Opcionalmente marca para Preview (para branches de desarrollo)
- **Development**: Opcionalmente marca para Development

## 🚀 Paso 4: Desplegar

### Desde el Dashboard:

1. Después de configurar las variables de entorno, ve a **"Deployments"**
2. Si ya hiciste un push al repositorio, Vercel debería detectarlo automáticamente
3. O haz clic en **"Redeploy"** si ya existe un deployment

### Desde la CLI:

```bash
# Desplegar a producción
vercel --prod

# O simplemente hacer push al repositorio (si tienes integración con Git)
git push origin main
```

## ✅ Paso 5: Verificar el Despliegue

1. Espera a que el build termine (puede tardar 2-5 minutos)
2. Vercel te dará una URL como: `https://tu-proyecto.vercel.app`
3. Visita la URL y verifica:
   - ✅ La página carga correctamente
   - ✅ Puedes iniciar sesión
   - ✅ Puedes registrar asistencias

## 🔍 Paso 6: Verificar Logs

Si hay problemas, revisa los logs:

### Desde el Dashboard:
1. Ve a **"Deployments"**
2. Haz clic en el deployment más reciente
3. Ve a la pestaña **"Logs"** o **"Functions"**

### Desde la CLI:
```bash
vercel logs
```

## 🐛 Solución de Problemas Comunes

### Error: "Faltan variables de entorno"

**Solución**:
- Verifica que todas las variables estén configuradas en Vercel
- Asegúrate de que están marcadas para "Production"
- Haz un nuevo deployment después de agregar las variables

### Error: "Invalid credentials" o "Authentication failed"

**Solución**:
- Verifica que `GOOGLE_PRIVATE_KEY` tiene los `\n` literales (no saltos de línea reales)
- Verifica que está entre comillas dobles
- Verifica que `GOOGLE_SERVICE_ACCOUNT_EMAIL` es correcto
- Verifica que la cuenta de servicio tiene acceso al Google Sheet

### Error: "Sheet not found" o 404

**Solución**:
- Verifica que `GOOGLE_SHEET_ID` es correcto (solo el ID, no la URL completa)
- Verifica que la cuenta de servicio tiene permisos de Editor en el Sheet
- Verifica que las hojas se llaman exactamente "Colaboradores" y "Asistentes"

### La aplicación funciona en local pero no en Vercel

**Solución**:
- Verifica que todas las variables de entorno están configuradas
- Revisa los logs de Vercel para ver errores específicos
- Asegúrate de que `NODE_ENV=production` está configurado

### Cookies no funcionan

**Solución**:
- En producción, las cookies requieren HTTPS (Vercel lo proporciona automáticamente)
- Verifica que `secure: process.env.NODE_ENV === 'production'` está en el código
- Las cookies deberían funcionar automáticamente con el dominio de Vercel

## 🔄 Actualizaciones Futuras

### Despliegue Automático (Recomendado):

Si conectaste tu repositorio Git a Vercel:
- Cada push a `main` desplegará automáticamente a producción
- Cada push a otras ramas creará un "Preview Deployment"

### Despliegue Manual:

```bash
# Desde la CLI
vercel --prod

# O desde el Dashboard: "Deployments" → "Redeploy"
```

## 📝 Configuración Adicional

### Dominio Personalizado (Opcional):

1. Ve a **"Settings"** → **"Domains"**
2. Agrega tu dominio personalizado
3. Sigue las instrucciones para configurar DNS

### Variables de Entorno por Entorno:

Puedes tener diferentes valores para Production, Preview y Development:
- Production: Variables de producción
- Preview: Variables de staging (opcional)
- Development: Variables de desarrollo (opcional)

## 🔒 Seguridad

### Buenas Prácticas:

- ✅ **NUNCA** subas `.env.local` al repositorio
- ✅ Usa variables de entorno de Vercel para credenciales
- ✅ Revisa regularmente los logs para detectar problemas
- ✅ Mantén las credenciales de Google Sheets seguras
- ✅ Usa HTTPS (Vercel lo proporciona automáticamente)

### Rotar Credenciales:

Si necesitas rotar las credenciales:
1. Genera nuevas credenciales en Google Cloud
2. Actualiza las variables de entorno en Vercel
3. Haz un nuevo deployment

## 📊 Monitoreo

Vercel proporciona:
- **Analytics**: Métricas de rendimiento (requiere plan de pago)
- **Logs**: Logs de funciones y builds
- **Deployments**: Historial de deployments

## 🎉 ¡Listo!

Una vez desplegado, tu aplicación estará disponible en:
- **Producción**: `https://tu-proyecto.vercel.app`
- **Preview**: `https://tu-proyecto-git-branch.vercel.app` (para otras ramas)

## 📞 Recursos Adicionales

- [Documentación de Vercel](https://vercel.com/docs)
- [Next.js en Vercel](https://vercel.com/docs/frameworks/nextjs)
- [Variables de Entorno en Vercel](https://vercel.com/docs/concepts/projects/environment-variables)

---

**Última actualización**: 2026-02-21
