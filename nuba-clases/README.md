# Nuba — Control de Clases

App web para control de clases, seguimiento de paquetes y cobros de socios de Nuba Club Social para el Adulto Mayor.

---

## Cómo publicar esta app en internet (sin saber programar)

Tiempo estimado: **20 minutos**. Solo necesitas una computadora y conexión a internet.

---

### PASO 1 — Crear cuenta en GitHub (gratis)

1. Ve a **https://github.com**
2. Haz clic en **"Sign up"**
3. Crea una cuenta con tu correo
4. Confirma tu correo cuando llegue el mensaje de verificación

---

### PASO 2 — Subir el código a GitHub

1. Inicia sesión en GitHub
2. Haz clic en el botón verde **"New"** para crear un repositorio
3. Ponle nombre: `nuba-clases`
4. Déjalo en **Public**
5. Haz clic en **"Create repository"**
6. Busca **"uploading an existing file"** y haz clic
7. Arrastra **todos los archivos y carpetas** de este ZIP al área de carga
8. Escribe `"Primera versión"` en el campo de mensaje
9. Haz clic en **"Commit changes"**

> ⚠️ Asegúrate de subir la carpeta `src/` con `App.jsx` y `main.jsx` dentro.

---

### PASO 3 — Crear cuenta en Vercel (gratis)

1. Ve a **https://vercel.com**
2. Haz clic en **"Sign Up"**
3. Elige **"Continue with GitHub"**
4. Autoriza los permisos que pide

---

### PASO 4 — Publicar la app

1. En Vercel, haz clic en **"Add New Project"**
2. Selecciona el repositorio `nuba-clases`
3. **No cambies nada** — deja todos los campos como están
4. Haz clic en **"Deploy"**
5. Espera ~2 minutos
6. Vercel te da una URL como:

```
https://nuba-clases.vercel.app
```

Comparte esa URL con tu equipo administrativo.

---

### PASO 5 — Guardar como acceso directo en tablet

**iPad / iPhone:**
1. Abre Safari y entra a la URL
2. Toca el ícono de compartir (cuadrado con flecha ↑)
3. Toca **"Añadir a pantalla de inicio"**
4. Ponle nombre: `Nuba Clases`

**Android:**
1. Abre Chrome y entra a la URL
2. Toca los tres puntos del navegador
3. Toca **"Añadir a pantalla de inicio"**

La app aparece como ícono igual que una app nativa — sin necesidad de App Store.

---

## Paquetes configurados

| Paquete   | Clases | Precio     |
|-----------|--------|------------|
| Paquete 4 | 4      | $800 MXN   |
| Paquete 8 | 8      | $1,200 MXN |
| Paquete 12| 12     | $1,800 MXN |
| Paquete 16| 16     | $2,200 MXN |
| Paquete 40| 40     | $4,000 MXN |

---

## Clases registradas

Tai Chi · Activación Física · Yoga · Baile · Mindfulness · Cerámica · Pintura · Tejido · Estimulación Cognitiva

---

## Nota sobre los datos

Los datos se guardan en el navegador del dispositivo (localStorage).

- ✅ Funciona sin internet una vez cargada
- ✅ Sin costo de servidor ni base de datos
- ⚠️ Los datos no se sincronizan entre dispositivos
- ⚠️ Si se borra la caché del navegador, los datos se pierden

**Recomendación:** usar siempre el mismo dispositivo (tablet de administración) para registrar clases. Para sincronización entre dispositivos, el siguiente paso es agregar una base de datos — eso se puede hacer cuando el volumen de socios lo justifique.

---

## Estructura del proyecto

```
nuba-clases/
├── index.html
├── package.json
├── vite.config.js
├── vercel.json
├── .gitignore
├── public/
│   └── favicon.svg
└── src/
    ├── main.jsx
    └── App.jsx
```

---

Nuba Club Social para el Adulto Mayor · Dr. Armando — Director Médico
