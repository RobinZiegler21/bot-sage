const dotenv = require('dotenv');
const { createClient } = require('matrix-js-sdk');
const AIHandler = require('./ai-handler');

dotenv.config();

console.log('🤖 Démarrage de bot-sage (mode debug)...');
console.log('Room ID cible:', process.env.MATRIX_ROOM_ID);

const client = createClient({
    baseUrl: 'https://matrix.org',
    accessToken: process.env.MATRIX_ACCESS_TOKEN,
    userId: process.env.MATRIX_USER_ID
});

async function startBot() {
    try {
        const ai = new AIHandler();
        // Écouter TOUS les événements pour debug
        client.on('Room.timeline', async (event, room) => {
            // Ignorer nos propres messages
    if (event.getSender() === process.env.MATRIX_USER_ID) return;
    
    // Seulement les messages texte
    if (event.getType() !== 'm.room.message') return;
    
    const message = event.getContent().body;
    
    // IMPORTANT: Ignorer les messages qui commencent par 🤖 pour éviter la boucle
    if (message && message.startsWith('🤖')) return;
    
    console.log(`📥 Message reçu de ${event.getSender()}: "${message}"`);
    
    // Répondre seulement aux autres utilisateurs
    console.log('📤 Analyse avec IA...');
const aiResponse = await ai.analyzeMessage(message);
client.sendTextMessage(room.roomId, aiResponse.confirmation);
        });

        await client.startClient({ initialSyncLimit: 1 });
        console.log('✅ bot-sage en écoute debug !');
        console.log('💬 Écrivez n\'importe quel message pour tester');
        
    } catch (err) {
        console.error('❌ Erreur:', err.message);
    }
}

startBot();