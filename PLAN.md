# 📌 Planificación para Starter Kit (React + FastAPI + GCP + Firebase)

## 🎯 Objetivo
Crear un template listo para producción con:
- Frontend en React (Vite + TS).
- Backend en FastAPI (Python).
- Base de datos con Firestore.
- Autenticación con Firebase.
- Infraestructura en Google Cloud (Cloud Run, Build, Secrets, Storage).
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
└── PLAN.md          # Planificación (este archivo)
```

---

## 🛠 Backend (FastAPI)
- API básica con un endpoint raíz (`/`).
- Integración con Google Secret Manager.
- Dockerfile optimizado (multistage build opcional).
- Despliegue en Cloud Run mediante GitHub Actions.

---

## 🎨 Frontend (React + Vite)
- Configuración de Firebase (Auth + Firestore).
- Ejemplo de login con email/password.
- Configuración para `firebase deploy`.
- Variables en `.env` para Firebase.

---

## 🔑 Autenticación (Firebase Auth)
- Configuración de Firebase en `frontend/src/firebase.ts`.
- Ejemplo de login con `signInWithEmailAndPassword`.
- Posibilidad de extender a Google Sign-In.

---

## ☁️ Infraestructura (Terraform + GCP)
1. Crear bucket de almacenamiento (para archivos estáticos).
2. Crear secretos en Secret Manager (ej. `API_KEY`).
3. Crear servicio en Cloud Run (backend).
4. Configurar IAM (Cloud Run con acceso a secretos).
5. (Opcional) Configurar estado remoto de Terraform en bucket.

---

## 🤖 CI/CD (GitHub Actions)
- Workflow para backend:
  - Construir imagen Docker.
  - Push a Google Container Registry (GCR).
  - Desplegar a Cloud Run.
- Workflow para frontend:
  - Build con Vite.
  - Deploy a Firebase Hosting.

---

## 🚀 Flujo de uso del template
1. Clonar repo.
2. Copiar `.env.example` → `.env` en frontend y backend.
3. Inicializar Terraform:
   ```bash
   cd infra/terraform
   terraform init
   terraform apply -var="project_id=XXX" -var="api_key=YYY"
   ```
4. Configurar secretos en GitHub (`GCP_CREDENTIALS`, `GCP_PROJECT_ID`).
5. Push a `main` → GitHub Actions despliega automáticamente.
6. `firebase deploy` para frontend.

---

## 📅 Roadmap de implementación
- [ ] Crear backend base con FastAPI.
- [ ] Crear frontend base con React+Vite+Firebase.
- [ ] Configurar Docker para backend.
- [ ] Configurar Terraform (Cloud Run, Secrets, Storage).
- [ ] Configurar GitHub Actions para backend.
- [ ] Configurar Firebase Hosting y reglas de Firestore.
- [ ] Documentación en README.md.
- [ ] Publicar como template en GitHub.

---

## ✅ Entregable final
Un repositorio que permita:
- Correr `terraform apply` y levantar toda la infraestructura.
- Hacer `git push` y desplegar el backend en Cloud Run automáticamente.
- Hacer `firebase deploy` y publicar el frontend en Firebase Hosting.
- Usar Firebase Auth listo desde el frontend.
