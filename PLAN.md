# 📌 Planificación para Starter Kit (React + FastAPI + GCP + Firebase)

## 🎯 Objetivo
Crear un template listo para producción con:
- Frontend en React (Vite + TS) con Tailwind CSS.
- Backend en FastAPI (Python).
- Base de datos con Firestore.
- Autenticación con Firebase.
- Infraestructura en Google Cloud (Cloud Run, Artifact Registry, Secrets, Storage).
- CI/CD con GitHub Actions.
- Configuración como código con Terraform.

---

## 🗂 Estructura de carpetas

```
my-starter-kit/
├── frontend/        # React + Vite
├── backend/         # FastAPI + Docker
├── infra/           # Terraform + GitHub Actions
├── firebase/        # Hosting + Firestore
├── COMMANDS.md      # Comandos útiles
└── PLAN.md          # Planificación (este archivo)
```

---

## 🛠 Backend (FastAPI)
- API básica con un endpoint raíz (`/`).
- Integración con Google Secret Manager.
- Dockerfile optimizado (multistage build).
- Despliegue en Cloud Run mediante GitHub Actions.

---

## 🎨 Frontend (React + Vite)
- Configuración con Tailwind CSS.
- Configuración de Firebase (Auth + Firestore).
- Ejemplo de componente base con Tailwind.
- Configuración para `firebase deploy`.
- Variables en `.env` para Firebase.

---

## 🔑 Autenticación (Firebase Auth)
- Configuración de Firebase en `frontend/src/firebase.ts`.
- Ejemplo de login con `signInWithEmailAndPassword` (pendiente de implementar UI).
- Posibilidad de extender a Google Sign-In.

---

## ☁️ Infraestructura (Terraform + GCP)
1. Crear bucket de almacenamiento.
2. Crear secretos en Secret Manager.
3. Crear servicio en Cloud Run.
4. Crear repositorio en Artifact Registry.
5. Configurar IAM (Cloud Run con acceso a secretos).

---

## 🤖 CI/CD (GitHub Actions)
- Workflow para backend:
  - Construir imagen Docker.
  - Push a Google Artifact Registry.
  - Desplegar a Cloud Run.
- Workflow para frontend (pendiente):
  - Build con Vite.
  - Deploy a Firebase Hosting.

---

## 🚀 Flujo de uso del template
1. Clonar repo.
2. Copiar `.env.example` → `.env` en frontend y backend.
3. Inicializar Terraform y aplicar cambios.
4. Configurar secretos en GitHub (`GCP_CREDENTIALS`, `GCP_PROJECT_ID`, etc.).
5. Push a `main` → GitHub Actions despliega automáticamente el backend.
6. `firebase deploy` para desplegar el frontend.

---

## 📅 Roadmap de implementación
- [x] Crear backend base con FastAPI.
- [x] Crear frontend base con React+Vite+Firebase y Tailwind CSS.
- [x] Configurar Docker para backend.
- [x] Configurar Terraform (Cloud Run, Secrets, Storage, Artifact Registry).
- [x] Configurar GitHub Actions para backend.
- [x] Configurar Firebase Hosting y reglas de Firestore.
- [x] Crear archivo `COMMANDS.md` con comandos centralizados.
- [x] Documentación principal en `README.md`.
- [ ] Publicar como template en GitHub.

---

## ✅ Entregable final
Un repositorio que permita:
- Correr `terraform apply` y levantar toda la infraestructura.
- Hacer `git push` y desplegar el backend en Cloud Run automáticamente.
- Hacer `firebase deploy` y publicar el frontend en Firebase Hosting.
- Usar Firebase Auth listo desde el frontend.
