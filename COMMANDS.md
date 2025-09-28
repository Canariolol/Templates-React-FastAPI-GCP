# Comandos Útiles

## Backend (FastAPI)

### Entorno Local

1. **Crear y activar entorno virtual (recomendado):**
   ```bash
   # Desde la carpeta 'backend'
   python -m venv venv
   # Windows
   .\venv\Scripts\activate
   # macOS/Linux
   source venv/bin/activate
   ```

2. **Instalar dependencias:**
   ```bash
   # Desde la carpeta 'backend'
   pip install -r requirements.txt
   ```

3. **Ejecutar servidor de desarrollo (con hot-reload):**
   ```bash
   # Desde la carpeta 'backend'
   uvicorn app.main:app --reload
   ```
   El servidor estará disponible en `http://127.0.0.1:8000`.

## Frontend (React + Vite)

### Entorno Local

1. **Instalar dependencias:**
   ```bash
   # Desde la carpeta 'frontend'
   npm install
   ```

2. **Ejecutar servidor de desarrollo:**
   ```bash
   # Desde la carpeta 'frontend'
   npm run dev
   ```
   El servidor estará disponible en `http://localhost:5173` (o el puerto que indique Vite).

## Infraestructura (Terraform)

1. **Inicializar Terraform:**
   ```bash
   # Desde la carpeta 'infra/terraform'
   terraform init
   ```

2. **Planificar los cambios:**
   ```bash
   # Desde la carpeta 'infra/terraform'
   terraform plan -var="project_id=tu-gcp-project-id" -var="api_key=tu-api-key-secreta"
   ```

3. **Aplicar los cambios:**
   ```bash
   # Desde la carpeta 'infra/terraform'
   terraform apply -var="project_id=tu-gcp-project-id" -var="api_key=tu-api-key-secreta"
   ```

## Despliegue (Firebase)

1. **Iniciar sesión en Firebase:**
   ```bash
   firebase login
   ```

2. **Seleccionar el proyecto de Firebase:**
   ```bash
   # Reemplaza 'your-firebase-project-id' con el ID de tu proyecto
   firebase use your-firebase-project-id
   ```
   Esto actualizará el archivo `.firebaserc`.

3. **Construir el proyecto de frontend:**
   ```bash
   # Desde la carpeta 'frontend'
   npm run build
   ```

4. **Desplegar a Firebase Hosting:**
   ```bash
   # Desde la raíz del proyecto
   firebase deploy --only hosting
   ```

5. **(Opcional) Desplegar reglas de Firestore:**
    ```bash
    # Desde la raíz del proyecto
    firebase deploy --only firestore
    ```
