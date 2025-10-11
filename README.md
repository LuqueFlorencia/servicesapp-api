# 🧩 ServicesApp – Backend (Firebase Functions + RTDB)

Backend del proyecto **ServicesApp**, desarrollado en **Node.js** utilizando **Firebase Cloud Functions** y **Realtime Database** (RTDB).
Este repositorio contiene la lógica de funciones, servicios y repositorios para la gestión de la app mobile *DILO*.  

---

## ⚙️ Requisitos

- **Node.js** v18 o superior  
- **npm**
- **Firebase CLI** instalada globalmente:
  ``` bash
  npm install -g firebase-tools
  firebase --version
  ```


## 🧾 Pasos para configurar el entorno

1️⃣ Clonar el repositorio
  ``` bash
  git clone https://github.com/<organizacion>/servicesapp.git
  cd servicesapp/functions
  npm install

  ## Iniciar sesión en Firebase CLI (solo la primera vez)
  firebase login
  ```

2️⃣ Descargar tus credenciales de Firebase

🔐 El proyecto Firebase ya existe. Solo necesitás tus propias credenciales de administrador para poder usar el RTDB y las Functions.

1. Ingresá a https://console.firebase.google.com → seleccioná el proyecto ServicesApp.
2. En la esquina superior izquierda, abrí ⚙️ Configuración del proyecto → Cuentas de servicio → SDK Admin.
3. Hacé clic en “Generar nueva clave privada”.
4. Se descargará un archivo .json (por ejemplo serviceapp-adminsdk-xxxx.json).
5. Guardá ese archivo dentro de la carpeta: **functions/permissions/**
6. Renombralo si querés, pero copiá ese nombre en la variable de entorno (ver paso siguiente).

3️⃣ Crear el archivo .env

Dentro de la carpeta functions/, creá un archivo llamado .env con el contenido del la plantilla *".env.dev"*:
Ajustá el valor de CREDENTIALS_FILE_NAME y CREDENTIALS_PATH_FILE_NAME con el nombre de tu .json.
La URL del RTDB ya es la del proyecto oficial, no la cambies.

4️⃣ Ejecutar en modo local (emuladores)

Para correr las funciones y probar la conexión al RTDB:
  ``` bash
  ## Inicialmente solo se necesita functions
  firebase emulators:start --only functions, database, auth
  ```

Esto levantará:
* Functions → http://localhost:5001
* Realtime Database → http://localhost:9000
* Auth → http://localhost:9099
* Emulator UI → http://localhost:4000

El proyecto está preparado para detectar automáticamente los emuladores (no se requiere configuración extra).


## 📁 Estructura del proyecto

```text
functions/
├── config/
│   └── environment.js
├── permissions/
│   └── *adminsdk*.json     # credenciales (local)
├── src/
│   ├── repositories/
│   │   └── entity.repository.js
│   ├── services/
│   │   └── entity/
│   │       ├── createEntity.service.js
│   │       ├── getEntity.service.js
│   │       ├── updateEntity.service.js
│   │       └── deleteEntity.service.js
│   └── utils/
│       ├── firebase.js
│       ├── httpsStatusCode.js
│       ├── middleware.js
│       └── utils.js
├── index.js
├── .env
└── firebase.json
```
