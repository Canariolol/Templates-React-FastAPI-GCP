# Starter Kit (React + FastAPI + GCP + Firebase)

Este es un template listo para producción que incluye:
- Frontend: React (Vite), TypeScript, y Tailwind CSS (integrado vía plugin de Vite)
- Backend: FastAPI (Python)
- Base de datos: Firestore
- Autenticación: Firebase
- Infraestructura: Google Cloud (Cloud Run, Build, Secrets, Storage)
- CI/CD: GitHub Actions
- IaC: Terraform

## Primeros Pasos

### Configuración del Backend

Para levantar el servidor de backend en tu entorno local, sigue estos pasos:

1.  Navega a la carpeta `backend`.
2.  Crea un entorno virtual e instala las dependencias.
3.  Ejecuta el servidor de desarrollo.

Todos los comandos necesarios están documentados en el archivo [COMMANDS.md](COMMANDS.md).

Una vez ejecutado, la API estará disponible en `http://127.0.0.1:8000`.
Puedes probar el endpoint de prueba (y los que configures más adelante) entrando a `http://127.0.0.1:8000/docs`.

### Configuración del Frontend

Para levantar la aplicación de frontend en tu entorno local, sigue estos pasos:

1.  Navega a la carpeta `frontend`.
2.  Copia el archivo `.env.example` a `.env` y añade tus credenciales de Firebase.
3.  Instala las dependencias.
4.  Ejecuta el servidor de desarrollo.

Todos los comandos necesarios están documentados en el archivo [COMMANDS.md](COMMANDS.md).

### Infraestructura con Terraform

Este proyecto utiliza Terraform para gestionar la infraestructura en Google Cloud Platform (GCP) como código.

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
