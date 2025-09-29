# 🚀 Starter Kit: React, FastAPI, GCP y Firebase

¡Bienvenido! Este es un template de proyecto listo para producción diseñado para acelerar tu desarrollo. Combina un frontend moderno con React, un backend robusto con FastAPI y un pipeline de despliegue automatizado a Google Cloud Platform y Firebase.

** Nota importante: Esta herramienta está en modo de pruebas. Si encuentras errores o posibilidades de mejora, por favor, déjame un mensaje con sugerencias o crea un PR :D **

## ✨ Tecnologías Principales

<p align="center">
  <img src="https://img.shields.io/badge/React-61DAFB?logo=react&logoColor=black&style=for-the-badge" alt="React"/>
  <img src="https://img.shields.io/badge/TypeScript-3178C6?logo=typescript&logoColor=white&style=for-the-badge" alt="TypeScript"/>
  <img src="https://img.shields.io/badge/FastAPI-009688?logo=fastapi&logoColor=white&style=for-the-badge" alt="FastAPI"/>
  <img src="https://img.shields.io/badge/Python-3776AB?logo=python&logoColor=white&style=for-the-badge" alt="Python"/>
  <img src="https://img.shields.io/badge/Google_Cloud-4285F4?logo=googlecloud&logoColor=white&style=for-the-badge" alt="Google Cloud"/>
  <img src="https://img.shields.io/badge/Terraform-7B42BC?logo=terraform&logoColor=white&style=for-the-badge" alt="Terraform"/>
  <img src="https://img.shields.io/badge/Firebase-FFCA28?logo=firebase&logoColor=black&style=for-the-badge" alt="Firebase"/>
  <img src="https://img.shields.io/badge/Docker-2496ED?logo=docker&logoColor=white&style=for-the-badge" alt="Docker"/>
  <img src="https://img.shields.io/badge/GitHub_Actions-2088FF?logo=githubactions&logoColor=white&style=for-the-badge" alt="GitHub Actions"/>
</p>

---

## 📋 Requisitos Previos

Antes de empezar, asegúrate de tener instaladas las siguientes herramientas:

1.  **Node.js** (v18 o superior)
2.  **Python** (v3.9 o superior)
3.  **Terraform CLI**
4.  **Google Cloud CLI (`gcloud`)**
5.  **Firebase CLI** (`npm install -g firebase-tools`)

---

## 🚀 Guía de Inicio Rápido

Sigue estos pasos para tener el entorno local y de producción funcionando.

### 🏠 Parte 1: Configuración del Entorno Local

#### Paso 1: Clonar y Preparar el Repositorio

```bash
# 1. Clona este repositorio
git clone <URL_DEL_REPO>
cd <NOMBRE_DEL_REPO>

# 2. Instala las dependencias del frontend
cd frontend
npm install

# 3. Regresa a la raíz e instala las dependencias del backend
cd ../backend
# (Opcional pero recomendado) Crea un entorno virtual
python -m venv venv
source venv/bin/activate # macOS/Linux
# .\venv\Scripts\activate # Windows

pip install -r requirements.txt
```

#### Paso 2: Configurar Variables de Entorno

Necesitas tus credenciales de un proyecto de Firebase para que la aplicación funcione. 

1.  Ve a la carpeta `frontend`.
2.  Copia el archivo `.env.example` y renómbralo a `.env`.
3.  Abre tu nuevo archivo `.env` y reemplaza los valores `your-...` con las credenciales reales de tu proyecto de Firebase. Las encontrarás en la configuración de tu proyecto en la consola de Firebase (`Project settings > General > Your apps > SDK setup and configuration`).

```env
# frontend/.env
VITE_API_KEY="tu-api-key"
VITE_AUTH_DOMAIN="tu-auth-domain"
# ... y el resto de variables
```

#### Paso 3: Ejecutar los Servidores Locales

¡Es hora de levantar la aplicación! Necesitarás dos terminales.

**Terminal 1: Iniciar el Backend**
```bash
# Desde la carpeta 'backend'
# Asegúrate de tener el entorno virtual activado si lo creaste
uvicorn app.main:app --reload
```
> Verás el servidor corriendo en `http://127.0.0.1:8000`.
> **💡 Tip:** Puedes explorar la documentación interactiva de tu API en `http://127.0.0.1:8000/docs`.

**Terminal 2: Iniciar el Frontend**
```bash
# Desde la carpeta 'frontend'
npm run dev
```
> Verás el servidor corriendo en `http://localhost:5173` (o el puerto que indique Vite).

#### Paso 4: Probar la Aplicación Local

Abre tu navegador en `http://localhost:5173`.

- **Prueba de API**: Haz clic en el botón `Call / endpoint`. Deberías ver una respuesta del backend como `{"Hello": "World"}`.
- **Prueba de Autenticación**: Intenta iniciar sesión. 
  - **Error esperado:** Si no has configurado un usuario en Firebase Auth, verás un error como `(auth/invalid-credential)`. ¡Esto es normal! Significa que la conexión con Firebase funciona. Ve a tu consola de Firebase > Authentication > Users y crea un usuario para poder iniciar sesión.

---

### ☁️ Parte 2: Despliegue en la Nube

Ahora vamos a desplegar la aplicación a un entorno de producción real.

#### Paso 1: Desplegar la Infraestructura con Terraform

Esto creará todos los recursos necesarios en Google Cloud (Cloud Run, Artifact Registry, etc.).

1.  **Autentícate con Google Cloud:**
    ```bash
    gcloud auth application-default login
    ```
2.  **Ejecuta Terraform:**
    ```bash
    cd infra/terraform
    terraform init
    terraform apply -var="project_id=tu-gcp-project-id" -var="api_key=tu-api-key-secreta"
    ```
    > Reemplaza `tu-gcp-project-id` con tu ID de proyecto de GCP. `api_key` es un secreto de ejemplo.

#### Paso 2: Configurar Secretos para CI/CD en GitHub

El despliegue del backend es automático. Para que funcione, GitHub necesita autenticarse con Google Cloud de forma segura.

1.  Ve a tu repositorio en GitHub > `Settings` > `Secrets and variables` > `Actions`.
2.  Crea los siguientes secretos de repositorio:
    - `GCP_PROJECT_ID`: Tu ID de proyecto de Google Cloud.
    - `GCP_CREDENTIALS`: El contenido completo de tu archivo JSON de credenciales de una cuenta de servicio de GCP. La cuenta debe tener, como mínimo, los roles `Artifact Registry Writer` y `Cloud Run Admin`.
    - `GAR_REPOSITORY`: El nombre que le diste a tu repositorio en Artifact Registry (por defecto: `starter-kit-repo`).
    - `SERVICE_NAME`: El nombre de tu servicio de Cloud Run (por defecto: `starter-kit-backend`).

#### Paso 3: Desplegar el Backend

Simplemente haz un `push` a la rama `main` de tu repositorio. GitHub Actions se encargará de construir la imagen Docker, subirla a Artifact Registry y desplegarla en Cloud Run.

```bash
git push origin main
```

#### Paso 4: Desplegar el Frontend

El frontend se despliega en Firebase Hosting.

1.  **Autentícate y selecciona tu proyecto de Firebase:**
    ```bash
    firebase login
    firebase use tu-firebase-project-id
    ```
2.  **Construye y despliega la aplicación:**
    ```bash
    # Desde la carpeta 'frontend'
    npm run build

    # Desde la raíz del proyecto
    firebase deploy --only hosting
    ```

¡Y listo! Tu aplicación estará completamente desplegada en la nube.

---

## 🔧 Configuración de Archivos .gitignore

Los archivos `.gitignore` preconfigurados ignoran:

- 🚫 **Archivos sensibles**: Como claves de API, contraseñas o configuraciones locales
- 📦 **Dependencias**: Carpetas como `node_modules` o entornos virtuales Python
- 🗂️ **Archivos generados**: Builds, compilaciones y archivos temporales
- 💻 **Configuraciones locales**: Archivos específicos de tu máquina o IDE

### 📁 Estructura de .gitignore en este Proyecto

Este template incluye **tres archivos .gitignore**:

#### 1. **`.gitignore` (raíz del proyecto)**
```bash
# Archivos globales del proyecto
.vscode/          # Configuración de VS Code
.idea/            # Configuración de IntelliJ IDEA
.DS_Store         # Archivos del sistema macOS
**/.terraform/    # Archivos de Terraform
.firebase/        # Archivos de Firebase
```

**¿Qué hace?**  
Ignora archivos que son comunes a todo el proyecto, sin importar si son del frontend o backend. Piensa en él como el "guardián general" del repositorio.

#### 2. **`frontend/.gitignore`**
```bash
# Archivos específicos del frontend
node_modules/     # Dependencias de npm/yarn
dist/            # Build de producción de Vite
.env.local       # Variables de entorno locales
.vite/           # Caché de Vite
*.tsbuildinfo    # Archivos de compilación TypeScript
```

**¿Qué hace?**  
Se especializa en ignorar archivos generados por el ecosistema JavaScript/React. Sin este archivo, tu repositorio se llenaría de miles de archivos de dependencias y builds que no necesitan versionarse.

#### 3. **`backend/.gitignore`**
```bash
# Archivos específicos del backend
__pycache__/     # Archivos compilados de Python
*.pyc            # Archivos bytecode Python
venv/            # Entorno virtual Python
*.sqlite         # Bases de datos locales
.env             # Variables de entorno del backend
```

**¿Qué hace?**  
Protege tu repositorio de archivos generados por Python y FastAPI. Los archivos `__pycache__` y `*.pyc` se crean automáticamente al ejecutar código Python y no deben compartirse.

### 💡 ¿Por qué tres archivos en lugar de uno?

En teoría podrías tener solo un archivo .gitignore para tu proyecto. Sin embargo, por orden y limpieza de tu espacio de trabajo, una buena idea es utilizar varios, especialmente para proyectos de mayor tamaño o escalables.

#### Por Ejemplo:
- **.gitignore raíz**: Es como las reglas generales de uso de una caja de herramientas
- **frontend/.gitignore**: Reglas específicas para las herramientas de carpintería
- **backend/.gitignore**: Reglas específicas para las herramientas de mecánica

Esta separación hace que:
- ✅ Sea más fácil mantener y actualizar cada archivo
- ✅ Cada .gitignore se enfoque en su tecnología específica
- ✅ Evitemos conflictos entre reglas de diferentes tecnologías
- ✅ El proyecto sea más organizado y profesional

### 🔍 ¿Qué pasa si olvido agregar algo al .gitignore?

Si accidentalmente subes un archivo que debería estar en .gitignore:
1. **Agrega el archivo/patrón al .gitignore correspondiente**
2. **Ejecuta estos comandos:**
   ```bash
   git rm --cached nombre_del_archivo  # Quita del repositorio pero no de tu sistema
   git commit -m "Remove sensitive file from git tracking" # O el mensaje que desees para identificar el motivo del commit
   ```

> **⚠️ Importante**: Si subiste información sensible (como claves de API), considera que ya está expuesta y deberías rotar esas claves inmediatamente.

---

## 🔧 Solución de Problemas Comunes

- **Error: `(auth/invalid-api-key)` en el navegador:**
  - **Causa:** Las variables de entorno en `frontend/.env` son incorrectas o no se han configurado.
  - **Solución:** Verifica que copiaste las credenciales correctas desde la consola de Firebase a tu archivo `.env`.
  - **Esto ocurrirá inevitablemente si decides desplegar el proyecto sin antes configurar tus claves**

- **Errores de Vite o Tailwind CSS al iniciar:**
  - **Causa:** La caché de Vite puede haberse quedado corrupta.
  - **Solución:** Detén el servidor y reinícialo con `npm run dev -- --force` para limpiar la caché.

## 📚 Referencia de Comandos

Para una lista completa y rápida de todos los comandos, consulta el archivo [COMMANDS.md](COMMANDS.md).
