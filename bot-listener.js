const dotenv = require('dotenv');
const { createClient } = require('matrix-js-sdk');

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
        // Écouter TOUS les événements pour debug
        client.on('Room.timeline', (event, room) => {
            console.log(`🔍 Événement reçu dans salon ${room.roomId}`);
            console.log(`   Type: ${event.getType()}`);
            console.log(`   Sender: ${event.getSender()}`);
            
            if (event.getType() === 'm.room.message') {
                const message = event.getContent().body;
                console.log(`   Message: "${message}"`);
                
                // Répondre à TOUS les messages (pour test)
                if (true) {
                    console.log('📤 Envoi de réponse...');
                    client.sendTextMessage(room.roomId, `🤖 J'ai reçu: "${message}"`);
                }
            }
        });

        await client.startClient({ initialSyncLimit: 1 });
        console.log('✅ bot-sage en écoute debug !');
        console.log('💬 Écrivez n\'importe quel message pour tester');
        
    } catch (err) {
        console.error('❌ Erreur:', err.message);
    }
}

startBot();