# 🏛️ Prometeus

**Prometeus** sistema de pruebas desarrollado en **Laravel + React**, orientado a la gestión de solicitudes internas (permisos, vacaciones, documentos, etc.), con foco en trazabilidad, control y una experiencia de usuario clara y profesional.

---

## 🧱 Stack Tecnológico

- **Backend:** Laravel  
- **Frontend:** React + Vite  
- **Estilos:** TailwindCSS  
- **Base de datos:** MySQL / MariaDB  
- **Autenticación:** Sesiones (Laravel)  
- **Control de versiones:** Git + GitHub  

---

## 📋 Requisitos Previos

Antes de instalar el proyecto, asegúrate de contar con:

- PHP **>= 8.1**
- Composer
- Node.js **>= 18**
- NPM
- MySQL o MariaDB
- Git

---

## 🚀 Instalación Paso a Paso

### 1️⃣ Clonar el repositorio

```bash
git clone https://github.com/NelsonAraya/prometeus.git
cd prometeus
```

---

### 2️⃣ Instalar dependencias de Laravel

```bash
composer install
```

---

### 3️⃣ Instalar dependencias del frontend

```bash
npm install
```

---

### 4️⃣ Configurar variables de entorno

Copia el archivo de ejemplo:

```bash
cp .env.example .env
```

Edita el archivo `.env` y configura al menos lo siguiente:

```env
APP_NAME=Prometeus
APP_ENV=local
APP_KEY=
APP_DEBUG=true
APP_URL=http://localhost:8000

DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=prometeus
DB_USERNAME=tu_usuario
DB_PASSWORD=tu_password
```

---

### 5️⃣ Generar la clave de la aplicación

```bash
php artisan key:generate
```

---

### 6️⃣ Ejecutar migraciones y Seeder

```bash
php artisan migrate --seed
```

> ⚠️ Asegúrate de que la base de datos exista antes de ejecutar este comando.

---

### 7️⃣ Levantar el backend (Laravel)

```bash
php artisan serve
```

El backend quedará disponible por defecto en:

```text
http://localhost:8000
```

---

### 8️⃣ Levantar el frontend (React)

En otra terminal, ejecuta:

```bash
npm run dev
```
## 📂 Estructura General del Proyecto

```text
prometeus/
├── app/                # Backend Laravel
├── database/           # Migraciones y seeders
├── resources/
│   ├── js/             # React (componentes, vistas, layouts)
│   └── css/            # TailwindCSS
├── routes/
│   └── web.php         # Rutas principales
├── public/
├── .env.example
├── composer.json
├── package.json
└── README.md
```

---