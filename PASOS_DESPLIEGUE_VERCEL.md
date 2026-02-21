# 🚀 Despliegue en Vercel - Paso a Paso

Guía visual y detallada para desplegar tu aplicación en Vercel.

---

## 📋 ANTES DE EMPEZAR

### Requisitos:
- ✅ Proyecto funcionando en local
- ✅ Repositorio Git creado (GitHub, GitLab o Bitbucket)
- ✅ Cuenta en Vercel (puedes crear una con GitHub)

### Verificar que el proyecto compile:
```bash
cd C:\Users\lucasian\Downloads\registro_asistenciav2
npm run build
```

Si hay errores, corrígelos antes de continuar.

---

## PASO 1: Subir el Proyecto a Git

Si aún no lo has hecho:

```bash
# 1. Inicializar Git
git init

# 2. Agregar todos los archivos
git add .

# 3. Hacer commit
git commit -m "Initial commit: Sistema de registro de asistencia"

# 4. Crear repositorio en GitHub/GitLab y agregar remote
git remote add origin https://github.com/TU-USUARIO/TU-REPOSITORIO.git

# 5. Subir código
git push -u origin main
```

**⚠️ IMPORTANTE**: Verifica que `.env.local` NO se suba (debe estar en `.gitignore`)

---

## PASO 2: Crear Cuenta en Vercel

1. Ve a [https://vercel.com](https://vercel.com)
2. Haz clic en **"Sign Up"** o **"Log In"**
3. Elige **"Continue with GitHub"** (recomendado) o crea cuenta con email
4. Autoriza a Vercel a acceder a tu cuenta de GitHub (si usas GitHub)

---

## PASO 3: Crear Nuevo Proyecto en Vercel

### Opción A: Desde el Dashboard (Recomendado)

1. **Inicia sesión** en Vercel
2. En el dashboard, haz clic en **"Add New..."** → **"Project"**
   - O haz clic en el botón grande **"Add New Project"**
3. **Conecta tu repositorio**:
   - Si es la primera vez, verás un botón **"Import Git Repository"**
   - Haz clic y autoriza a Vercel a acceder a tu cuenta de GitHub/GitLab
   - Busca y selecciona el repositorio `registro_asistenciav2`
4. **Configuración del proyecto**:
   - **Framework Preset**: Vercel detectará automáticamente "Next.js" ✅
   - **Root Directory**: Déjalo vacío (si el proyecto está en la raíz)
   - **Build Command**: `npm run build` (ya viene por defecto)
   - **Output Directory**: `.next` (ya viene por defecto)
   - **Install Command**: `npm install` (ya viene por defecto)
5. **NO hagas clic en "Deploy" todavía** - Primero necesitamos configurar las variables de entorno

---

## PASO 4: Configurar Variables de Entorno

**⚠️ CRÍTICO**: Debes hacer esto ANTES del primer deploy.

### En la página de configuración del proyecto:

1. Antes de hacer clic en "Deploy", busca la sección **"Environment Variables"**
2. O después de crear el proyecto, ve a **"Settings"** → **"Environment Variables"**

### Agregar cada variable:

#### Variable 1: `GOOGLE_SERVICE_ACCOUNT_EMAIL`

1. Haz clic en **"Add New"** o **"Add Environment Variable"**
2. **Key**: `GOOGLE_SERVICE_ACCOUNT_EMAIL`
3. **Value**: `registro-asistencia-service@registro-asistencia-488121.iam.gserviceaccount.com`
4. Marca las casillas:
   - ✅ **Production**
   - ✅ **Preview** (opcional)
   - ✅ **Development** (opcional)
5. Haz clic en **"Save"**

#### Variable 2: `GOOGLE_PRIVATE_KEY`

**⚠️ MUY IMPORTANTE - Formato correcto:**

1. Haz clic en **"Add New"**
2. **Key**: `GOOGLE_PRIVATE_KEY`
3. **Value**: Copia TODO el valor del campo `private_key` de tu JSON, incluyendo:
   ```
   "-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQDm6qsHAROpmItW\ncQTAIuP+KbtArqEiQ6NFqMEsmnWds/Drj6brw26NaJdXLajqglCdbVZ7Mt2KOu79\nLqM00noQRau0uNMwpyvmcyIHk7jaFFPwlmfMpd3GpQmWXJRv8EZnlCByDXCxbkAG\n1RNHnzNxTYRmvIk42IO20s+lmPy0+lK/pUAVERiMTkWN01etryPcv4eFQ9AvQton\npVBS+Jkwuz9o4KKrg/DRSkef3DUHHoKDYz6XxcAVd2dv0SnbpDTzyzWJaqD6ySsB\n5PuPsJgxhRd6LzsqSihQiiFk2ycGNvJsLCdM3FaJqJqmhZkf6BAUHzPhxseypz7X\nzlKubU3/AgMBAAECggEACih6m5VFiyllv8i6/8TJKM4nKaJE/l/hV9gjn1WwJN7c\nk1A/dJGlVF0sgy5EBwTyjOpZapQDQOh0yPh7P4Ce1AZslkenKrW/7aRU8+ZgtF8+\njg/fwxXs2qc5875g3UfBoR7YCoxiz7tc37AR6A2t0qcpUueqVbDYontFnTBMtZ1U\nECV/Z2QBeW3x8TfnRQpAZKPGJ5FlababP2CLVMjn52wRsFqPbOMXWcdyJWAfKDj9\nFZDCMDLuTknb0tQdh0gHTKoBCJDd3+7RpPw7rYz9gjnqio2iXHoSUyUvjWJAbndH\n/WC8ikViGQPfWV1DGE/U/M5+gmhZTlBoQGhxbXfuQQKBgQD1G9J0vx39WIoebhdf\nbN8cpdqQALPlWk+g6XctNqGzS7v1++MeMq1cMUB1cgJ6tuB/AKmkGz1XE8Eg2v/W\nCMmb95imdvJ50Ov4Pn3uTMoK3PdokgG8biI6QndPfG0memLcaV8D6Z4nvRAVm27F\naCOFnjIOZsTy33kfFElEB/wxnwKBgQDxLWh0xOij6PZg6nhaM1uqnATGNJi1uMzH\nOtMO1f3c5Z8FjDl5gqYTnZHz2UrlWWAVk27FHMy9E8/W0H6JmVpprxhkC0kj/BKD\nfyEFd2iiLZ92kX8yAUo5EZR9UryDuTqa+CuJPIjT7NTecLTuv/GIt4ENml1n5tRj\ntZsX5JFHoQKBgCYm235SlT9u/ai46ChxUNUrt7Z8dYP4p7ZbQLKn80luO2aRe4ui\nxbs461ick2g4eP8rwjwKBWU9bO1JSVMucPs28erPTvTJIUG1sHJcP4KrXFNJjr2e\nwvMgj2Ou8Wpw2FyIhkKcpYJ3+j3ywK43hHfy5MW7F2LaiAbfaHwPZiDvAoGBAKR0\n00K0tvJ2O/MwT2sqlDpNc0/4s51O64x7R0pZj2deyMYOrW53MWo0yz6dkF2+SS/N\nPf55Of9AkDwqJe8MPEPOmvI1Y+V+0N0MBmdk2lukgpVmd3aQvJ0XqMqgbV3hI95i\nlcVaGu9wEmOwNSCMkFYq03yEI2djVra7MovjV1GhAoGAVcGQFHRkrDF/y1o2vkrM\nvA8tWtf2QPU/Z/IIH+Em6EHbctrnSFDvn9sVgJNLLNmVrj8Hqo7iDlnYKmRgTIkP\nJwx7q7S28YkPRNHS9PH0s56M5jAflHX5aKXAy4gCKMXhn1hopmb9pUdNRoaMnD4I\nyEE5p5jy7TCZFSs+RxNbAhY=\n-----END PRIVATE KEY-----\n"
   ```
   **IMPORTANTE**:
   - Mantén las comillas dobles al inicio y final
   - Mantén los `\n` literales (NO los reemplaces por saltos de línea reales)
   - Copia TODO desde `-----BEGIN` hasta `-----END PRIVATE KEY-----`
4. Marca las casillas:
   - ✅ **Production**
   - ✅ **Preview** (opcional)
   - ✅ **Development** (opcional)
5. Haz clic en **"Save"**

#### Variable 3: `GOOGLE_SHEET_ID`

1. Haz clic en **"Add New"**
2. **Key**: `GOOGLE_SHEET_ID`
3. **Value**: `1x0AFq3X__0zE-e3NdoJO9h4dAQs7vFOZsx1Nuay4LmA`
   - Solo el ID, NO la URL completa
4. Marca las casillas:
   - ✅ **Production**
   - ✅ **Preview** (opcional)
   - ✅ **Development** (opcional)
5. Haz clic en **"Save"**

#### Variable 4: `NODE_ENV`

1. Haz clic en **"Add New"**
2. **Key**: `NODE_ENV`
3. **Value**: `production`
4. Marca las casillas:
   - ✅ **Production**
   - ⬜ **Preview** (opcional, puede ser `development`)
   - ⬜ **Development** (opcional, puede ser `development`)
5. Haz clic en **"Save"**

### Verificar Variables:

Deberías ver 4 variables en la lista:
- ✅ `GOOGLE_SERVICE_ACCOUNT_EMAIL`
- ✅ `GOOGLE_PRIVATE_KEY`
- ✅ `GOOGLE_SHEET_ID`
- ✅ `NODE_ENV`

---

## PASO 5: Desplegar

### Opción A: Desde la Página de Configuración

1. Después de agregar todas las variables de entorno
2. Haz clic en el botón **"Deploy"** (esquina inferior derecha)
3. Espera a que el build termine (2-5 minutos)

### Opción B: Si ya creaste el proyecto

1. Ve a **"Deployments"** en el menú lateral
2. Haz clic en **"Redeploy"** en el último deployment
3. O haz un nuevo push a tu repositorio Git:
   ```bash
   git push origin main
   ```
   Vercel desplegará automáticamente

---

## PASO 6: Verificar el Despliegue

### Durante el Build:

1. Verás un log en tiempo real del proceso de build
2. Busca mensajes como:
   - ✅ "Installing dependencies..."
   - ✅ "Building application..."
   - ✅ "Build completed"

### Después del Build:

1. Verás una URL como: `https://registro-asistencia-v2-xxxxx.vercel.app`
2. Haz clic en la URL o en **"Visit"**
3. Prueba la aplicación:
   - ✅ Debe cargar la página de login
   - ✅ Debe permitir iniciar sesión
   - ✅ Debe permitir registrar asistencias

---

## PASO 7: Verificar Logs (Si hay Problemas)

### Si algo no funciona:

1. Ve a **"Deployments"** → Haz clic en el deployment más reciente
2. Ve a la pestaña **"Logs"** o **"Functions"**
3. Busca errores en rojo
4. Errores comunes:
   - "Faltan variables de entorno" → Verifica que todas las variables estén configuradas
   - "Invalid credentials" → Verifica el formato de `GOOGLE_PRIVATE_KEY`
   - "Sheet not found" → Verifica `GOOGLE_SHEET_ID`

---

## ✅ CHECKLIST FINAL

Antes de considerar el despliegue completo:

- [ ] Proyecto compila sin errores (`npm run build`)
- [ ] Repositorio Git creado y código subido
- [ ] Cuenta Vercel creada
- [ ] Proyecto conectado a repositorio Git
- [ ] Variables de entorno configuradas:
  - [ ] `GOOGLE_SERVICE_ACCOUNT_EMAIL`
  - [ ] `GOOGLE_PRIVATE_KEY` (con formato correcto)
  - [ ] `GOOGLE_SHEET_ID`
  - [ ] `NODE_ENV`
- [ ] Deployment completado exitosamente
- [ ] Aplicación funciona en la URL de Vercel
- [ ] Login funciona correctamente
- [ ] Registro de asistencias funciona correctamente

---

## 🔄 ACTUALIZACIONES FUTURAS

### Despliegue Automático (Recomendado):

Si conectaste tu repositorio Git:
- Cada push a `main` → Despliega automáticamente a producción
- Cada push a otras ramas → Crea un "Preview Deployment"

### Despliegue Manual:

1. Desde el Dashboard: **"Deployments"** → **"Redeploy"**
2. O desde CLI:
   ```bash
   npm i -g vercel
   vercel --prod
   ```

---

## 🐛 PROBLEMAS COMUNES

### Error: "Build Failed"

**Solución**:
- Revisa los logs en Vercel
- Verifica que `npm run build` funciona en local
- Asegúrate de que todas las dependencias están en `package.json`

### Error: "Faltan variables de entorno"

**Solución**:
- Ve a **Settings** → **Environment Variables**
- Verifica que todas las 4 variables estén configuradas
- Asegúrate de que están marcadas para **Production**
- Haz un nuevo deployment después de agregar variables

### Error: "Invalid credentials" o "Authentication failed"

**Solución**:
- Verifica que `GOOGLE_PRIVATE_KEY` tiene los `\n` literales (no saltos de línea reales)
- Verifica que está entre comillas dobles
- Verifica que `GOOGLE_SERVICE_ACCOUNT_EMAIL` es correcto
- Verifica que la cuenta de servicio tiene acceso al Google Sheet

### La aplicación funciona en local pero no en Vercel

**Solución**:
- Verifica que todas las variables de entorno están configuradas
- Revisa los logs de Vercel
- Verifica que `NODE_ENV=production` está configurado

---

## 📞 AYUDA ADICIONAL

- [Documentación de Vercel](https://vercel.com/docs)
- [Next.js en Vercel](https://vercel.com/docs/frameworks/nextjs)
- [Variables de Entorno](https://vercel.com/docs/concepts/projects/environment-variables)

---

**¡Listo!** Tu aplicación debería estar funcionando en Vercel. 🎉
