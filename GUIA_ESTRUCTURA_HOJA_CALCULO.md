# 📊 Guía Detallada: Estructura de la Hoja de Cálculo

Esta guía te muestra paso a paso cómo configurar exactamente la estructura de tu Google Sheet para el sistema de registro de asistencia.

---

## 🎯 Objetivo

Configurar dos hojas en Google Sheets:
1. **Colaboradores**: Para autenticar a los usuarios que registran asistencia
2. **Asistentes**: Para almacenar y actualizar los registros de asistencia

---

## 📋 Paso 1: Crear la Hoja de Cálculo Base

### 1.1 Acceder a Google Sheets

1. Abre tu navegador
2. Ve a [https://sheets.google.com](https://sheets.google.com)
3. Inicia sesión con tu cuenta de Google

### 1.2 Crear Nueva Hoja

1. Haz clic en el botón **"+"** o en **"En blanco"**
2. Se abrirá una nueva hoja de cálculo en blanco

### 1.3 Nombrar la Hoja de Cálculo

1. Haz clic en el título en la parte superior izquierda (por defecto dice "Hoja de cálculo sin título")
2. Cambia el nombre a: **`Registro de Asistencia`** (o el nombre que prefieras)
3. Presiona Enter

### 1.4 Obtener el ID de la Hoja

**⚠️ IMPORTANTE**: Necesitarás este ID para configurar las variables de entorno.

1. Mira la URL en la barra de direcciones del navegador
2. La URL tiene este formato:
   ```
   https://docs.google.com/spreadsheets/d/[ID_AQUI]/edit
   ```
3. **Copia el ID** (la parte entre `/d/` y `/edit`)
4. Guárdalo en un lugar seguro - lo necesitarás para `GOOGLE_SHEET_ID`

**Ejemplo**:
- URL completa: `https://docs.google.com/spreadsheets/d/1aB2cD3eF4gH5iJ6kL7mN8oP9qR0sT1uV2w/edit`
- ID a copiar: `1aB2cD3eF4gH5iJ6kL7mN8oP9qR0sT1uV2w`

---

## 👥 Paso 2: Configurar la Hoja "Colaboradores"

### 2.1 Renombrar la Primera Hoja

1. En la parte inferior izquierda, verás una pestaña que dice **"Hoja 1"**
2. Haz **clic derecho** en la pestaña
3. Selecciona **"Renombrar"** (o haz doble clic en la pestaña)
4. Escribe exactamente: **`Colaboradores`** (con mayúscula inicial, sin espacios extra)
5. Presiona Enter

**✅ Verificación**: La pestaña ahora debe decir "Colaboradores"

### 2.2 Configurar los Encabezados

1. Haz clic en la celda **A1**
2. Escribe: **`cedula`** (todo en minúsculas, sin espacios)
3. Presiona Tab o haz clic en la celda **B1**
4. Escribe: **`nombre_completo`** (todo en minúsculas, con guión bajo)

**Estructura esperada**:

| Celda | Valor |
|-------|-------|
| A1 | `cedula` |
| B1 | `nombre_completo` |

### 2.3 Formatear los Encabezados (Opcional pero Recomendado)

1. Selecciona las celdas **A1** y **B1** (arrastra desde A1 hasta B1)
2. Haz clic en el botón **"B"** (Negrita) en la barra de herramientas
3. Opcional: Cambia el color de fondo:
   - Haz clic en el icono de **"Color de relleno"** (bote de pintura)
   - Selecciona un color claro (por ejemplo, azul claro o gris claro)

**Resultado visual esperado**:

```
┌─────────────┬──────────────────┐
│ cedula      │ nombre_completo   │  ← Fila 1 (Negrita, fondo coloreado)
├─────────────┼──────────────────┤
│             │                  │  ← Fila 2 (vacía, lista para datos)
│             │                  │
```

### 2.4 Agregar Datos de Ejemplo

**Para pruebas**, agrega algunos colaboradores:

1. En la celda **A2**, escribe: `1234567890`
2. En la celda **B2**, escribe: `Juan Pérez`
3. En la celda **A3**, escribe: `0987654321`
4. En la celda **B3**, escribe: `María García`

**Estructura completa**:

| A | B |
|---|---|
| **cedula** | **nombre_completo** |
| 1234567890 | Juan Pérez |
| 0987654321 | María García |

### 2.5 Ajustar Ancho de Columnas (Opcional)

1. Haz clic en el encabezado de la columna **A** (donde dice "A")
2. Mantén presionado y arrastra hasta la columna **B** para seleccionar ambas
3. Haz **doble clic** en el borde entre las columnas A y B
4. Las columnas se ajustarán automáticamente al contenido

**O manualmente**:
- Coloca el cursor entre las columnas A y B
- Cuando veas el cursor cambiar a una flecha bidireccional, arrastra para ajustar el ancho

---

## 📝 Paso 3: Configurar la Hoja "Asistentes"

### 3.1 Crear Nueva Hoja

1. En la parte inferior izquierda, busca el botón **"+"** (está al lado de las pestañas de las hojas)
2. Haz clic en el botón **"+"**
3. Se creará una nueva hoja llamada "Hoja 2" (o similar)

### 3.2 Renombrar la Nueva Hoja

1. Haz **clic derecho** en la pestaña de la nueva hoja
2. Selecciona **"Renombrar"**
3. Escribe exactamente: **`Asistentes`** (con mayúscula inicial, sin espacios extra)
4. Presiona Enter

**✅ Verificación**: Ahora deberías tener dos pestañas: "Colaboradores" y "Asistentes"

### 3.3 Configurar los Encabezados

1. Haz clic en la celda **A1**
2. Escribe: **`cedula`** (minúsculas)
3. Presiona Tab o haz clic en **B1**
4. Escribe: **`nombre_completo`** (minúsculas, con guión bajo)
5. Presiona Tab o haz clic en **C1**
6. Escribe: **`asistencia`** (minúsculas)
7. Presiona Tab o haz clic en **D1**
8. Escribe: **`fecha_hora`** (minúsculas, con guión bajo)
9. Presiona Tab o haz clic en **E1**
10. Escribe: **`colaborador_registro`** (minúsculas, con guión bajo)

**Estructura esperada**:

| Celda | Valor |
|-------|-------|
| A1 | `cedula` |
| B1 | `nombre_completo` |
| C1 | `asistencia` |
| D1 | `fecha_hora` |
| E1 | `colaborador_registro` |

### 3.4 Formatear los Encabezados

1. Selecciona las celdas desde **A1** hasta **E1** (arrastra o haz clic en A1 y Shift+clic en E1)
2. Haz clic en el botón **"B"** (Negrita)
3. Opcional: Cambia el color de fondo a un color diferente al de "Colaboradores" (por ejemplo, verde claro)

**Resultado visual esperado**:

```
┌─────────────┬──────────────────┬─────────────┬──────────────────┬──────────────────────┐
│ cedula      │ nombre_completo   │ asistencia  │ fecha_hora       │ colaborador_registro │  ← Fila 1
├─────────────┼──────────────────┼─────────────┼──────────────────┼──────────────────────┤
│             │                  │             │                  │                      │  ← Fila 2
```

### 3.5 Agregar Datos de Ejemplo (Opcional)

**Para pruebas**, agrega algunos empleados (sin llenar asistencia, fecha_hora ni colaborador_registro):

1. En la celda **A2**, escribe: `1111111111`
2. En la celda **B2**, escribe: `Carlos Rodríguez`
3. Deja **C2, D2, E2** vacías (se llenarán automáticamente)

4. En la celda **A3**, escribe: `2222222222`
5. En la celda **B3**, escribe: `Ana López`
6. Deja **C3, D3, E3** vacías

**Estructura completa**:

| A | B | C | D | E |
|---|---|---|---|---|
| **cedula** | **nombre_completo** | **asistencia** | **fecha_hora** | **colaborador_registro** |
| 1111111111 | Carlos Rodríguez | | | |
| 2222222222 | Ana López | | | |

**Nota**: Las columnas C, D y E se llenarán automáticamente cuando se registre la asistencia.

### 3.6 Ajustar Ancho de Columnas

1. Selecciona todas las columnas desde **A** hasta **E**
2. Haz doble clic en cualquier borde entre columnas para autoajustar
3. O ajusta manualmente cada columna según necesites

**Anchos sugeridos**:
- Columna A (cedula): ~120px
- Columna B (nombre_completo): ~200px
- Columna C (asistencia): ~100px
- Columna D (fecha_hora): ~180px
- Columna E (colaborador_registro): ~180px

---

## 🔐 Paso 4: Compartir la Hoja con la Cuenta de Servicio

### 4.1 Obtener el Email de la Cuenta de Servicio

Si aún no lo tienes, necesitas el email de la cuenta de servicio que creaste en Google Cloud (termina en `@...iam.gserviceaccount.com`).

Ejemplo: `registro-asistencia-service@tu-proyecto.iam.gserviceaccount.com`

### 4.2 Compartir la Hoja

1. En tu Google Sheet, haz clic en el botón **"Compartir"** (esquina superior derecha)
   - Es un botón azul con un ícono de persona y un "+"
2. Se abrirá un cuadro de diálogo "Compartir con personas y grupos"
3. En el campo de texto que dice **"Agregar personas y grupos"**, pega el email de la cuenta de servicio
4. Asegúrate de que el permiso sea **"Editor"** (no "Lector" ni "Comentarista")
   - Si dice "Lector", haz clic en el menú desplegable y cambia a "Editor"
5. **IMPORTANTE**: Desmarca la casilla **"Notificar a las personas"** (no es necesario notificar a una cuenta de servicio)
6. Haz clic en el botón **"Compartir"** o presiona Enter

### 4.3 Verificar el Acceso

1. Haz clic en **"Compartir"** nuevamente
2. En la lista de personas con acceso, deberías ver el email de la cuenta de servicio
3. Verifica que el rol sea **"Editor"**

**✅ Verificación exitosa**: 
- El email de la cuenta de servicio aparece en la lista
- El rol es "Editor"
- No hay errores

---

## 📋 Checklist de Verificación

Antes de continuar, verifica que todo esté correcto:

### Hoja "Colaboradores"
- [ ] La hoja se llama exactamente **"Colaboradores"** (con mayúscula inicial)
- [ ] La celda A1 contiene: **`cedula`** (minúsculas)
- [ ] La celda B1 contiene: **`nombre_completo`** (minúsculas, con guión bajo)
- [ ] Los encabezados están en negrita
- [ ] Hay al menos un colaborador de ejemplo en las filas 2+

### Hoja "Asistentes"
- [ ] La hoja se llama exactamente **"Asistentes"** (con mayúscula inicial)
- [ ] La celda A1 contiene: **`cedula`** (minúsculas)
- [ ] La celda B1 contiene: **`nombre_completo`** (minúsculas, con guión bajo)
- [ ] La celda C1 contiene: **`asistencia`** (minúsculas)
- [ ] La celda D1 contiene: **`fecha_hora`** (minúsculas, con guión bajo)
- [ ] La celda E1 contiene: **`colaborador_registro`** (minúsculas, con guión bajo)
- [ ] Los encabezados están en negrita
- [ ] Hay al menos un empleado de ejemplo en las filas 2+

### Permisos
- [ ] La hoja está compartida con la cuenta de servicio
- [ ] El rol de la cuenta de servicio es **"Editor"**
- [ ] Tienes guardado el ID de la hoja (de la URL)

### Datos de Prueba
- [ ] Hay al menos un colaborador en la hoja "Colaboradores" para probar el login
- [ ] Hay al menos un empleado en la hoja "Asistentes" para probar el registro

---

## 🎨 Formato Visual de Referencia

### Hoja "Colaboradores" - Vista Completa

```
┌─────────────────────────────────────────────────────────┐
│ Registro de Asistencia                                  │ ← Título de la hoja
├─────────────────────────────────────────────────────────┤
│                                                          │
│   A            │   B                                    │
│ ┌─────────────┐│ ┌──────────────────┐                  │
│ │ cedula      ││ │ nombre_completo   │                  │ ← Fila 1 (Encabezados)
│ ├─────────────┤│ ├──────────────────┤                  │
│ │ 1234567890  ││ │ Juan Pérez        │                  │ ← Fila 2 (Datos)
│ │ 0987654321  ││ │ María García      │                  │ ← Fila 3 (Datos)
│ └─────────────┘│ └──────────────────┘                  │
│                                                          │
└─────────────────────────────────────────────────────────┘
```

### Hoja "Asistentes" - Vista Completa

```
┌────────────────────────────────────────────────────────────────────────────────────────────┐
│ Registro de Asistencia                                                                    │
├────────────────────────────────────────────────────────────────────────────────────────────┤
│                                                                                            │
│   A            │   B              │   C          │   D            │   E                  │
│ ┌─────────────┐│ ┌──────────────┐│ ┌──────────┐│ ┌─────────────┐│ ┌──────────────────┐│
│ │ cedula      ││ │ nombre_...    ││ │ asist... ││ │ fecha_hora  ││ │ colaborador_...  ││ ← Fila 1
│ ├─────────────┤│ ├──────────────┤│ ├──────────┤│ ├─────────────┤│ ├──────────────────┤│
│ │ 1111111111  ││ │ Carlos R.    ││ │          ││ │             ││ │                  ││ ← Fila 2
│ │ 2222222222  ││ │ Ana López    ││ │          ││ │             ││ │                  ││ ← Fila 3
│ └─────────────┘│ └──────────────┘│ └──────────┘│ └─────────────┘│ └──────────────────┘│
│                                                                                            │
└────────────────────────────────────────────────────────────────────────────────────────────┘
```

**Nota**: Las columnas C, D y E se llenarán automáticamente cuando se registre la asistencia.

---

## ⚠️ Errores Comunes y Soluciones

### Error: "La hoja 'Colaboradores' no existe"

**Causa**: El nombre de la hoja no coincide exactamente.

**Solución**:
- Verifica que se llama **"Colaboradores"** (no "colaboradores", "Colaborador", etc.)
- Verifica que no hay espacios extra al inicio o final
- Verifica que estás usando la hoja correcta

### Error: "Empleado no encontrado"

**Causa**: El nombre de las columnas no coincide.

**Solución**:
- Verifica que los encabezados están exactamente como se especifica:
  - `cedula` (no "Cédula", "CEDULA", "cedula ", etc.)
  - `nombre_completo` (con guión bajo, no espacio ni guión)
- Verifica que los encabezados están en la fila 1
- Verifica que no hay espacios extra en los nombres de las columnas

### Error: "No se puede actualizar la asistencia"

**Causa**: La cuenta de servicio no tiene permisos.

**Solución**:
- Verifica que la hoja está compartida con la cuenta de servicio
- Verifica que el rol es **"Editor"** (no "Lector")
- Verifica que el email de la cuenta de servicio es correcto

### Los datos no se actualizan

**Causa**: Puede haber un problema con los nombres de las columnas o los permisos.

**Solución**:
- Verifica que todas las columnas existen y tienen los nombres correctos
- Verifica que la cuenta de servicio tiene permisos de Editor
- Revisa los logs del servidor para ver errores específicos

---

## ✅ Siguiente Paso

Una vez que hayas completado esta configuración, continúa con:

1. **Configurar las variables de entorno** (ver `GUIA_CONFIGURACION_GOOGLE_SHEETS.md`)
2. **Probar la aplicación** ejecutando `npm run dev`
3. **Verificar que el login funciona** con un colaborador de prueba
4. **Verificar que el registro de asistencia funciona** con un empleado de prueba

---

## 📞 Notas Adicionales

- **Nombres de columnas**: Son sensibles a mayúsculas/minúsculas. Usa exactamente los nombres especificados.
- **Nombres de hojas**: También son sensibles. "Colaboradores" ≠ "colaboradores"
- **Espacios**: No agregues espacios extra en los nombres de columnas o hojas
- **Formato de datos**: Las cédulas pueden ser números o texto, pero deben coincidir exactamente al buscar
- **Fecha y hora**: Se formatean automáticamente en formato Colombia (DD/MM/YYYY HH:mm:ss)

---

¡Listo! Tu hoja de cálculo está configurada correctamente. 🎉
