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

### Configuración del Frontend

Para levantar la aplicación de frontend en tu entorno local, sigue estos pasos:

1.  Navega a la carpeta `frontend`.
2.  Copia el archivo `.env.example` a `.env` y añade tus credenciales de Firebase.
3.  Instala las dependencias.
4.  Ejecuta el servidor de desarrollo.

Todos los comandos necesarios están documentados en el archivo [COMMANDS.md](COMMANDS.md).

### Infraestructura con Terraform

Este proyecto utiliza Terraform para gestionar la infraestructura en Google Cloud Platform (GCP) como código.

**Requisitos:**
- Tener [Terraform](https://learn.hashicorp.com/tutorials/terraform/install-cli) instalado.
- Tener el [CLI de Google Cloud](https://cloud.google.com/sdk/docs/install) instalado y autenticado (`gcloud auth application-default login`).

Para desplegar la infraestructura:

1.  Navega a la carpeta `infra/terraform`.
2.  Ejecuta los comandos de `init`, `plan` y `apply` como se indica en el archivo [COMMANDS.md](COMMANDS.md).

## CI/CD con GitHub Actions

El proyecto incluye un workflow de GitHub Actions para desplegar automáticamente el backend a Cloud Run cada vez que se hace un `push` a la rama `main`.

**Configuración de Secretos:**

Para que el workflow funcione, debes configurar los siguientes secretos en tu repositorio de GitHub (`Settings > Secrets and variables > Actions`):

- `GCP_PROJECT_ID`: Tu ID de proyecto de Google Cloud.
- `GCP_CREDENTIALS`: El contenido de tu archivo JSON de credenciales de una cuenta de servicio de GCP. La cuenta de servicio debe tener los roles necesarios (ej. `roles/artifactregistry.writer`, `roles/run.admin`).
- `GAR_REPOSITORY`: El nombre de tu repositorio en Artifact Registry (ej. `starter-kit-repo`).
- `SERVICE_NAME`: El nombre de tu servicio de Cloud Run (ej. `starter-kit-backend`).

## Despliegue del Frontend (Firebase)

El frontend está configurado para ser desplegado en Firebase Hosting.

**Requisitos:**
- Tener el [CLI de Firebase](https://firebase.google.com/docs/cli) instalado (`npm install -g firebase-tools`).
- Haber creado un proyecto en Firebase.

Para desplegar el frontend:

1.  Inicia sesión en Firebase y selecciona tu proyecto.
2.  Construye la aplicación de React.
3.  Despliega en Firebase Hosting.

Todos los comandos necesarios están documentados en el archivo [COMMANDS.md](COMMANDS.md), en la sección "Despliegue (Firebase)".