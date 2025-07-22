**Tremenda Discord Logger**

Este proyecto es un bot de Discord que escucha mensajes en servidores y los envía a un webhook de n8n.

---

## 📋 Prerrequisitos

* [Node.js](https://nodejs.org/) v16 o superior
* [npm](https://www.npmjs.com/) (viene con Node.js)
* Una cuenta de Discord y un bot creado con su token
* Un flujo de n8n con un webhook configurado

---

## 🚀 Instalación

1. Clona el repositorio o crea una carpeta nueva:

   ```bash
   git clone <url-del-repositorio> tremenda-discord-logger
   cd tremenda-discord-logger
   ```

2. Inicializa un proyecto de Node.js (si aún no existe `package.json`):

   ```bash
   npm init -y
   ```

3. Instala las dependencias necesarias:

   ```bash
   npm install discord.js axios dotenv
   ```

4. Crea el archivo `.env` en la raíz del proyecto y define tus variables de entorno:

   ```dotenv
   TOKEN_BOT=<tu-token-de-discord>
   WEBHOOK_URL=<tu-webhook-de-n8n>
   ```

5. Añade `.env` a tu `.gitignore` para evitar subir credenciales al repositorio:

   ```gitignore
   node_modules/
   .env
   ```

---

## 🔧 Estructura del proyecto

```text
.
├── index.js       # Punto de entrada de la aplicación
├── .env           # Variables de entorno (no en el repositorio)
├── .gitignore     # Ignora node_modules y .env
└── package.json   # Dependencias y scripts
```

---

## ⚙️ Uso

1. Asegúrate de haber configurado correctamente `.env`.
2. Ejecuta el bot:

   ```bash
   node index.js
   ```
3. El bot se conectará a Discord y comenzará a escuchar mensajes.
4. Cada vez que se detecte un mensaje (que no sea de un bot), se enviará al webhook de n8n.

---

## 📄 index.js (Resumen del código)

```js
require('dotenv').config();
const { Client, GatewayIntentBits } = require('discord.js');
const axios = require('axios');

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ]
});

const DISCORD_TOKEN = process.env.TOKEN_BOT;
const N8N_WEBHOOK_URL = process.env.WEBHOOK_URL;

if (!DISCORD_TOKEN || !N8N_WEBHOOK_URL) {
  console.error('Faltan las variables de entorno TOKEN_BOT o WEBHOOK_URL');
  process.exit(1);
}

client.on('messageCreate', async (message) => {
  if (message.author.bot) return;

  try {
    await axios.post(N8N_WEBHOOK_URL, {
      content: message.content,
      author: { username: message.author.username, id: message.author.id },
      channel: { id: message.channel.id, name: message.channel.name }
    });
    console.log('Mensaje enviado a n8n');
  } catch (err) {
    console.error('Error al enviar mensaje a n8n:', err.message);
  }
});

client.login(DISCORD_TOKEN);
```

---

## 📦 Scripts útiles

Puedes agregar estos scripts a tu `package.json`:

```json
"scripts": {
  "start": "node bot.js"
}
```

Entonces podrás iniciar con:

```bash
npm start
```

---

## 🤝 Contribuciones

Si deseas contribuir, haz un fork, crea una rama con tu feature o fix, y abre un Pull Request.

---

## 📜 Licencia

Este proyecto está bajo la Licencia MIT.
