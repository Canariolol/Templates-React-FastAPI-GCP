# 🚀 Starter Kit: React, FastAPI, GCP y Firebase

¡Bienvenido! Este es un template de proyecto listo para producción diseñado para acelerar tu desarrollo. Combina un frontend moderno con React, un backend robusto con FastAPI y un pipeline de despliegue automatizado a Google Cloud Platform y Firebase.

## ✨ Tecnologías Principales

- **Frontend**: React (con Vite), TypeScript, y Tailwind CSS (integrado vía plugin de Vite).
- **Backend**: FastAPI (Python 3.11) y Docker.
- **Base de Datos y Auth**: Google Firestore y Firebase Authentication.
- **Infraestructura (IaC)**: Terraform para gestionar los recursos de Google Cloud.
- **Cloud**: Google Cloud (Cloud Run, Artifact Registry, Secret Manager, Storage).
- **CI/CD**: GitHub Actions para despliegue continuo del backend.
- **Hosting**: Firebase Hosting para el frontend.

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

### Parte 1: Configuración del Entorno Local

#### Paso 1: Clonar y Preparar el Repositorio

```bash
# 1. Clona este repositorio
git clone <https://github.com/Canariolol/Templates-React-FastAPI-GCP>
cd <Templates-React-FastAPI-GCP>

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

### Parte 2: Despliegue en la Nube

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

## 🔧 Solución de Problemas Comunes

- **Error: `(auth/invalid-api-key)` en el navegador:**
  - **Causa:** Las variables de entorno en `frontend/.env` son incorrectas o no se han configurado.
  - **Solución:** Verifica que copiaste las credenciales correctas desde la consola de Firebase a tu archivo `.env`.

- **Errores de Vite o Tailwind CSS al iniciar:**
  - **Causa:** La caché de Vite puede haberse quedado corrupta.
  - **Solución:** Detén el servidor y reinícialo con `npm run dev -- --force` para limpiar la caché.

## 📚 Referencia de Comandos

Para una lista completa y rápida de todos los comandos, consulta el archivo [COMMANDS.md](COMMANDS.md).
