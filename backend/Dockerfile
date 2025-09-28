# Stage 1: Build
FROM python:3.11-slim as builder

WORKDIR /app

# Instalar dependencias
COPY requirements.txt .
RUN pip wheel --no-cache-dir --wheel-dir /app/wheels -r requirements.txt

# Stage 2: Final
FROM python:3.11-slim

WORKDIR /app

# Copiar dependencias pre-compiladas
COPY --from=builder /app/wheels /wheels
RUN pip install --no-cache /wheels/*

# Copiar código de la aplicación
COPY ./app ./app

# Exponer puerto y ejecutar
EXPOSE 8000
CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8000"]