variable "project_id" {
  description = "The GCP project ID."
  type        = string
}

variable "region" {
  description = "The GCP region to deploy resources."
  type        = string
  default     = "us-central1"
}

variable "backend_service_name" {
  description = "The name for the backend Cloud Run service."
  type        = string
  default     = "starter-kit-backend"
}

variable "api_key" {
  description = "An example API key to be stored in Secret Manager."
  type        = string
  sensitive   = true
}

variable "artifact_registry_repository_name" {
  description = "The name for the Artifact Registry repository."
  type        = string
  default     = "starter-kit-repo"
}
