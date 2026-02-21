# ✅ Validación de Variables de Entorno

Este documento valida que todas las variables de entorno estén correctamente configuradas.

---

## 📋 Variables Requeridas

### Variables Usadas en el Código

| Variable | Usada en | Propósito |
|----------|----------|-----------|
| `GOOGLE_SERVICE_ACCOUNT_EMAIL` | `lib/google-sheets.ts` | Email de la cuenta de servicio de Google |
| `GOOGLE_PRIVATE_KEY` | `lib/google-sheets.ts` | Clave privada de la cuenta de servicio |
| `GOOGLE_SHEET_ID` | `lib/google-sheets.ts` | ID de la hoja de cálculo de Google Sheets |
| `NODE_ENV` | `app/api/auth/route.ts` | Entorno de ejecución (development/production) |

---

## ✅ Validación de Coincidencias

### ✅ Todas las Variables Coinciden Correctamente

**Archivo `.env.example`** contiene:
- ✅ `GOOGLE_SERVICE_ACCOUNT_EMAIL`
- ✅ `GOOGLE_PRIVATE_KEY`
- ✅ `GOOGLE_SHEET_ID`
- ✅ `NODE_ENV`

**Código fuente** usa:
- ✅ `process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL` en `lib/google-sheets.ts:6`
- ✅ `process.env.GOOGLE_PRIVATE_KEY` en `lib/google-sheets.ts:7`
- ✅ `process.env.GOOGLE_SHEET_ID` en `lib/google-sheets.ts:8`
- ✅ `process.env.NODE_ENV` en `app/api/auth/route.ts:37,44`

**Resultado**: ✅ **Todas las variables coinciden correctamente**

---

## 🔍 Validación de Formato

### 1. GOOGLE_SERVICE_ACCOUNT_EMAIL

**Formato esperado**:
```
GOOGLE_SERVICE_ACCOUNT_EMAIL=nombre-cuenta@proyecto-id.iam.gserviceaccount.com
```

**Validación**:
- ✅ Debe terminar en `.iam.gserviceaccount.com`
- ✅ No debe tener comillas
- ✅ No debe tener espacios

**Ejemplo correcto**:
```env
GOOGLE_SERVICE_ACCOUNT_EMAIL=registro-asistencia-service@mi-proyecto.iam.gserviceaccount.com
```

**Ejemplo incorrecto**:
```env
GOOGLE_SERVICE_ACCOUNT_EMAIL="registro-asistencia-service@mi-proyecto.iam.gserviceaccount.com"
GOOGLE_SERVICE_ACCOUNT_EMAIL= registro-asistencia-service@mi-proyecto.iam.gserviceaccount.com
```

---

### 2. GOOGLE_PRIVATE_KEY

**Formato esperado**:
```env
GOOGLE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQC...\n-----END PRIVATE KEY-----\n"
```

**Validación**:
- ✅ Debe estar entre comillas dobles (`"`)
- ✅ Debe incluir `-----BEGIN PRIVATE KEY-----` al inicio
- ✅ Debe incluir `-----END PRIVATE KEY-----` al final
- ✅ Debe tener `\n` literales (NO saltos de línea reales)
- ✅ El código reemplazará automáticamente `\n` por saltos de línea reales

**Ejemplo correcto**:
```env
GOOGLE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQC1234567890abcdefghijklmnopqrstuvwxyz\n-----END PRIVATE KEY-----\n"
```

**Ejemplo incorrecto** (NO hacer esto):
```env
# ❌ Sin comillas
GOOGLE_PRIVATE_KEY=-----BEGIN PRIVATE KEY-----\n...

# ❌ Con saltos de línea reales
GOOGLE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----
MIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQC...
-----END PRIVATE KEY-----"

# ❌ Sin \n
GOOGLE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----MIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQC...-----END PRIVATE KEY-----"
```

**Nota**: El código en `lib/google-sheets.ts:7` hace:
```typescript
const privateKey = process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n');
```
Esto significa que los `\n` literales se convierten en saltos de línea reales automáticamente.

---

### 3. GOOGLE_SHEET_ID

**Formato esperado**:
```
GOOGLE_SHEET_ID=1aB2cD3eF4gH5iJ6kL7mN8oP9qR0sT1uV2w
```

**Validación**:
- ✅ Debe ser una cadena alfanumérica
- ✅ No debe tener comillas
- ✅ No debe tener espacios
- ✅ Se obtiene de la URL de Google Sheets

**Ejemplo correcto**:
```env
GOOGLE_SHEET_ID=1aB2cD3eF4gH5iJ6kL7mN8oP9qR0sT1uV2w
```

**Ejemplo incorrecto**:
```env
GOOGLE_SHEET_ID="1aB2cD3eF4gH5iJ6kL7mN8oP9qR0sT1uV2w"
GOOGLE_SHEET_ID= 1aB2cD3eF4gH5iJ6kL7mN8oP9qR0sT1uV2w
GOOGLE_SHEET_ID=https://docs.google.com/spreadsheets/d/1aB2cD3eF4gH5iJ6kL7mN8oP9qR0sT1uV2w/edit
```

---

### 4. NODE_ENV

**Formato esperado**:
```
NODE_ENV=development
```
o
```
NODE_ENV=production
```

**Validación**:
- ✅ Debe ser `development` o `production`
- ✅ No debe tener comillas
- ✅ No debe tener espacios

**Ejemplo correcto**:
```env
NODE_ENV=development
NODE_ENV=production
```

**Ejemplo incorrecto**:
```env
NODE_ENV="development"
NODE_ENV= development
NODE_ENV=dev
```

**Uso en el código**:
- En `app/api/auth/route.ts:37,44` se usa para configurar cookies seguras:
  ```typescript
  secure: process.env.NODE_ENV === 'production'
  ```
- En producción, las cookies solo se envían por HTTPS

---

## 📝 Ejemplo de Archivo .env.local Completo

```env
# Google Sheets Configuration
GOOGLE_SERVICE_ACCOUNT_EMAIL=registro-asistencia-service@mi-proyecto-123456.iam.gserviceaccount.com
GOOGLE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQC1234567890abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ\n-----END PRIVATE KEY-----\n"
GOOGLE_SHEET_ID=1aB2cD3eF4gH5iJ6kL7mN8oP9qR0sT1uV2w

# Next.js Environment
NODE_ENV=development
```

---

## 🧪 Script de Validación

Puedes usar este script para validar tus variables de entorno:

### Para Windows PowerShell:

```powershell
# Validar que el archivo existe
if (Test-Path ".env.local") {
    Write-Host "✅ Archivo .env.local existe" -ForegroundColor Green
    
    # Cargar variables
    Get-Content .env.local | ForEach-Object {
        if ($_ -match '^([^#][^=]+)=(.*)$') {
            $name = $matches[1].Trim()
            $value = $matches[2].Trim()
            
            Write-Host "`nVariable: $name" -ForegroundColor Cyan
            
            # Validaciones específicas
            if ($name -eq "GOOGLE_SERVICE_ACCOUNT_EMAIL") {
                if ($value -match '@.*\.iam\.gserviceaccount\.com$') {
                    Write-Host "  ✅ Formato correcto" -ForegroundColor Green
                } else {
                    Write-Host "  ❌ Debe terminar en .iam.gserviceaccount.com" -ForegroundColor Red
                }
            }
            
            if ($name -eq "GOOGLE_PRIVATE_KEY") {
                if ($value -match '^".*BEGIN PRIVATE KEY.*\\n.*END PRIVATE KEY.*\\n"$') {
                    Write-Host "  ✅ Formato correcto (con comillas y \n)" -ForegroundColor Green
                } else {
                    Write-Host "  ⚠️  Verifica que tenga comillas dobles y \n literales" -ForegroundColor Yellow
                }
            }
            
            if ($name -eq "GOOGLE_SHEET_ID") {
                if ($value -match '^[a-zA-Z0-9_-]+$') {
                    Write-Host "  ✅ Formato correcto" -ForegroundColor Green
                } else {
                    Write-Host "  ❌ Debe ser alfanumérico" -ForegroundColor Red
                }
            }
            
            if ($name -eq "NODE_ENV") {
                if ($value -match '^(development|production)$') {
                    Write-Host "  ✅ Valor válido" -ForegroundColor Green
                } else {
                    Write-Host "  ❌ Debe ser 'development' o 'production'" -ForegroundColor Red
                }
            }
        }
    }
} else {
    Write-Host "❌ Archivo .env.local NO existe" -ForegroundColor Red
    Write-Host "Crea el archivo copiando .env.example a .env.local" -ForegroundColor Yellow
}
```

### Para Linux/Mac (Bash):

```bash
#!/bin/bash

if [ -f .env.local ]; then
    echo "✅ Archivo .env.local existe"
    
    # Validar cada variable
    source .env.local
    
    echo ""
    echo "Validando variables..."
    
    # GOOGLE_SERVICE_ACCOUNT_EMAIL
    if [[ $GOOGLE_SERVICE_ACCOUNT_EMAIL == *".iam.gserviceaccount.com" ]]; then
        echo "✅ GOOGLE_SERVICE_ACCOUNT_EMAIL: Formato correcto"
    else
        echo "❌ GOOGLE_SERVICE_ACCOUNT_EMAIL: Formato incorrecto"
    fi
    
    # GOOGLE_PRIVATE_KEY
    if [[ $GOOGLE_PRIVATE_KEY == *"BEGIN PRIVATE KEY"* ]] && [[ $GOOGLE_PRIVATE_KEY == *"\\n"* ]]; then
        echo "✅ GOOGLE_PRIVATE_KEY: Formato correcto"
    else
        echo "⚠️  GOOGLE_PRIVATE_KEY: Verifica formato"
    fi
    
    # GOOGLE_SHEET_ID
    if [[ $GOOGLE_SHEET_ID =~ ^[a-zA-Z0-9_-]+$ ]]; then
        echo "✅ GOOGLE_SHEET_ID: Formato correcto"
    else
        echo "❌ GOOGLE_SHEET_ID: Formato incorrecto"
    fi
    
    # NODE_ENV
    if [[ $NODE_ENV == "development" ]] || [[ $NODE_ENV == "production" ]]; then
        echo "✅ NODE_ENV: Valor válido"
    else
        echo "❌ NODE_ENV: Debe ser 'development' o 'production'"
    fi
else
    echo "❌ Archivo .env.local NO existe"
    echo "Crea el archivo copiando .env.example a .env.local"
fi
```

---

## ✅ Checklist de Validación

Antes de ejecutar la aplicación, verifica:

- [ ] El archivo `.env.local` existe en la raíz del proyecto
- [ ] `GOOGLE_SERVICE_ACCOUNT_EMAIL` está configurado y termina en `.iam.gserviceaccount.com`
- [ ] `GOOGLE_PRIVATE_KEY` está entre comillas dobles y contiene `\n` literales
- [ ] `GOOGLE_SHEET_ID` está configurado y es solo el ID (no la URL completa)
- [ ] `NODE_ENV` está configurado como `development` o `production`
- [ ] No hay espacios extra alrededor del signo `=`
- [ ] No hay comillas innecesarias (excepto en `GOOGLE_PRIVATE_KEY`)
- [ ] El archivo `.env.local` está en `.gitignore` (no se sube a Git)

---

## 🐛 Errores Comunes

### Error: "Faltan variables de entorno para Google Sheets"

**Causa**: Una o más variables no están definidas.

**Solución**:
1. Verifica que el archivo `.env.local` existe
2. Verifica que todas las variables están escritas correctamente
3. Reinicia el servidor de desarrollo (`npm run dev`)

### Error: "Invalid credentials"

**Causa**: La clave privada está mal formateada.

**Solución**:
1. Verifica que `GOOGLE_PRIVATE_KEY` está entre comillas dobles
2. Verifica que tiene `\n` literales (no saltos de línea reales)
3. Verifica que incluye `-----BEGIN PRIVATE KEY-----` y `-----END PRIVATE KEY-----`

### Error: "Sheet not found"

**Causa**: El `GOOGLE_SHEET_ID` es incorrecto o la cuenta de servicio no tiene acceso.

**Solución**:
1. Verifica que el ID es correcto (solo el ID, no la URL completa)
2. Verifica que la hoja está compartida con la cuenta de servicio
3. Verifica que la cuenta de servicio tiene rol "Editor"

---

## 📞 Próximos Pasos

Una vez validadas las variables:

1. ✅ Ejecuta `npm install` para instalar dependencias
2. ✅ Ejecuta `npm run dev` para iniciar el servidor
3. ✅ Prueba el login con un colaborador de prueba
4. ✅ Prueba el registro de asistencia con un empleado de prueba

---

**Última actualización**: 2026-02-21
