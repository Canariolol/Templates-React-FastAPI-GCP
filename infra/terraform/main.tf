# Terraform config inicial (editar según necesidades)
terraform {
  required_providers {
    google = {
      source  = "hashicorp/google"
      version = ">= 5.0.0"
    }
  }
}

provider "google" {
  project = var.project_id
  region  = var.region
}

# Habilitar las APIs necesarias
resource "google_project_service" "run" {
  service = "run.googleapis.com"
}

resource "google_project_service" "secretmanager" {
  service = "secretmanager.googleapis.com"
}

resource "google_project_service" "storage" {
  service = "storage.googleapis.com"
}

resource "google_project_service" "artifactregistry" {
  service = "artifactregistry.googleapis.com"
}

# Crear un bucket de Cloud Storage
resource "google_storage_bucket" "bucket" {
  name          = "${var.project_id}-storage"
  location      = var.region
  force_destroy = true # Solo para desarrollo, considera cambiarlo en producción
  uniform_bucket_level_access = true

  depends_on = [google_project_service.storage]
}

# Crear un secreto en Secret Manager
resource "google_secret_manager_secret" "api_key_secret" {
  secret_id = "API_KEY"
  replication {
    automatic = true
  }

  depends_on = [google_project_service.secretmanager]
}

# Añadir la versión del secreto
resource "google_secret_manager_secret_version" "api_key_version" {
  secret      = google_secret_manager_secret.api_key_secret.id
  secret_data = var.api_key
}

# Repositorio de Artifact Registry para las imágenes de Docker
resource "google_artifact_registry_repository" "repository" {
  location      = var.region
  repository_id = var.artifact_registry_repository_name
  description   = "Docker repository for the starter kit backend"
  format        = "DOCKER"

  depends_on = [google_project_service.artifactregistry]
}

# Servicio de Cloud Run para el backend
resource "google_cloud_run_v2_service" "backend" {
  name     = var.backend_service_name
  location = var.region

  template {
    containers {
      image = "us-central1-docker.pkg.dev/your-project/your-repo/your-image:latest" # ¡Reemplazar en CI/CD!
      ports {
        container_port = 8000
      }
      env {
        name = "API_KEY"
        value_source {
          secret_key_ref {
            secret  = google_secret_manager_secret.api_key_secret.secret_id
            version = "latest"
          }
        }
      }
    }
  }

  depends_on = [google_project_service.run]
}

# Permitir invocaciones no autenticadas a Cloud Run
resource "google_cloud_run_service_iam_member" "noauth" {
  location = google_cloud_run_v2_service.backend.location
  service  = google_cloud_run_v2_service.backend.name
  role     = "roles/run.invoker"
  member   = "allUsers"
}

# Dar permisos a Cloud Run para leer el secreto
data "google_iam_policy" "noauth" {
  binding {
    role = "roles/secretmanager.secretAccessor"
    members = [
      "serviceAccount:${google_cloud_run_v2_service.backend.service_account}",
    ]
  }
}

resource "google_secret_manager_secret_iam_policy" "policy" {
  secret_id   = google_secret_manager_secret.api_key_secret.secret_id
  policy_data = data.google_iam_policy.noauth.policy_data
}

