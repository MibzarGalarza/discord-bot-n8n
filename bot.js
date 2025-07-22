require('dotenv').config();  // <-- esto debe ir lo primero

const { Client, GatewayIntentBits } = require('discord.js');
const axios = require('axios');

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ]
});

const DISCORD_TOKEN = process.env.TOKEN_BOT; // <-- Cambia esto
const N8N_WEBHOOK_URL = process.env.WEBHOOK_URL; // <-- Cambia esto

if (!DISCORD_TOKEN || !N8N_WEBHOOK_URL) {
  console.error('Faltan las variables de entorno TOKEN_BOT o WEBHOOK_URL');
  process.exit(1);
}

client.on('messageCreate', async (message) => {
  if (message.author.bot) return; // Ignora mensajes de bots

  try {
    await axios.post(N8N_WEBHOOK_URL, {
      content: message.content,
      author: {
        username: message.author.username,
        id: message.author.id
      },
      channel: {
        id: message.channel.id,
        name: message.channel.name
      }
    });
    console.log('Mensaje enviado a n8n');
  } catch (err) {
    console.error('Error al enviar mensaje a n8n:', err.message);
  }
});

client.login(DISCORD_TOKEN);
