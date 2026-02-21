# Guía para Subir el Proyecto a Git

Esta guía te ayudará a preparar y subir el proyecto a un repositorio Git.

## 📋 Pre-requisitos

1. Tener Git instalado en tu sistema
2. Tener una cuenta en GitHub, GitLab o el servicio Git que prefieras
3. Haber configurado Git con tu nombre y email:
   ```bash
   git config --global user.name "Tu Nombre"
   git config --global user.email "tu.email@ejemplo.com"
   ```

## 🚀 Pasos para Subir el Proyecto

### Paso 1: Inicializar el Repositorio Git

```bash
cd C:\Users\lucasian\Downloads\registro_asistenciav2
git init
```

### Paso 2: Verificar que .env.local NO se subirá

**⚠️ IMPORTANTE**: El archivo `.env.local` contiene credenciales sensibles y NO debe subirse a Git.

Verifica que está en `.gitignore`:
```bash
git check-ignore .env.local
```

Si devuelve `.env.local`, está correctamente ignorado. ✅

### Paso 3: Agregar Archivos al Staging

```bash
# Ver qué archivos se van a agregar
git status

# Agregar todos los archivos (excepto los ignorados)
git add .
```

### Paso 4: Verificar Archivos Agregados

```bash
# Ver qué archivos están en staging
git status

# Deberías ver:
# - ✅ Todos los archivos de código fuente (.ts, .tsx, .js, etc.)
# - ✅ Archivos de configuración (package.json, tsconfig.json, etc.)
# - ✅ Documentación (.md)
# - ❌ NO deberías ver: .env.local, node_modules, .next
```

### Paso 5: Crear el Primer Commit

```bash
git commit -m "Initial commit: Sistema de registro de asistencia con Next.js y Google Sheets"
```

### Paso 6: Crear Repositorio Remoto

1. Ve a GitHub/GitLab y crea un nuevo repositorio
2. **NO** inicialices con README, .gitignore o licencia (ya los tenemos)
3. Copia la URL del repositorio (ej: `https://github.com/tu-usuario/registro-asistenciav2.git`)

### Paso 7: Conectar con el Repositorio Remoto

```bash
git remote add origin https://github.com/tu-usuario/registro-asistenciav2.git
```

### Paso 8: Subir el Código

```bash
# Primera vez (establecer upstream)
git push -u origin main

# O si tu rama se llama 'master':
git branch -M main
git push -u origin main
```

## ✅ Verificación Post-Subida

Después de subir, verifica en GitHub/GitLab que:

- ✅ Todos los archivos de código están presentes
- ✅ El README.md se muestra correctamente
- ✅ **NO** aparece `.env.local` (debe estar ignorado)
- ✅ **NO** aparece `node_modules`
- ✅ **NO** aparece `.next`

## 🔒 Seguridad

### Archivos que NO deben subirse:

- ✅ `.env.local` - Contiene credenciales de Google Sheets
- ✅ `node_modules/` - Dependencias (se instalan con `npm install`)
- ✅ `.next/` - Archivos de build de Next.js
- ✅ Cualquier archivo con credenciales o claves privadas

### Archivos que SÍ deben subirse:

- ✅ `.env.example` - Ejemplo de variables de entorno (sin valores reales)
- ✅ `package.json` - Dependencias del proyecto
- ✅ Todo el código fuente (`app/`, `lib/`)
- ✅ Archivos de configuración (`tsconfig.json`, `tailwind.config.ts`, etc.)
- ✅ Documentación (`.md`)

## 📝 Comandos Útiles

### Ver qué archivos están siendo rastreados:
```bash
git ls-files
```

### Ver qué archivos están siendo ignorados:
```bash
git status --ignored
```

### Verificar si un archivo específico está ignorado:
```bash
git check-ignore -v .env.local
```

### Si accidentalmente agregaste .env.local:
```bash
# Remover del staging (pero mantener el archivo local)
git rm --cached .env.local

# Agregar al .gitignore (si no está ya)
echo ".env.local" >> .gitignore

# Hacer commit de la corrección
git commit -m "Remove .env.local from tracking"
```

## 🔄 Actualizaciones Futuras

Para subir cambios futuros:

```bash
# Ver cambios
git status

# Agregar cambios
git add .

# Hacer commit
git commit -m "Descripción de los cambios"

# Subir cambios
git push
```

## 🐛 Solución de Problemas

### Error: "fatal: remote origin already exists"
```bash
# Ver remotes actuales
git remote -v

# Remover el origin existente
git remote remove origin

# Agregar el nuevo origin
git remote add origin https://github.com/tu-usuario/registro-asistenciav2.git
```

### Error: "Updates were rejected"
```bash
# Si alguien más hizo cambios, primero hacer pull
git pull origin main --rebase

# Luego hacer push
git push
```

## 📚 Recursos Adicionales

- [Documentación de Git](https://git-scm.com/doc)
- [GitHub Guides](https://guides.github.com/)
- [Next.js Deployment](https://nextjs.org/docs/deployment)

---

**Nota**: Siempre verifica que `.env.local` NO esté en el repositorio antes de hacer push. Las credenciales expuestas pueden comprometer la seguridad de tu aplicación.
