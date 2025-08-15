const dotenv = require('dotenv');
const { createClient } = require('matrix-js-sdk');

dotenv.config();

console.log('🤖 Test de connexion de bot-sage...');
console.log('Token présent:', !!process.env.MATRIX_ACCESS_TOKEN);
console.log('User ID:', process.env.MATRIX_USER_ID);
console.log('Room ID:', process.env.MATRIX_ROOM_ID);

const client = createClient({
    baseUrl: 'https://matrix.org',
    accessToken: process.env.MATRIX_ACCESS_TOKEN,
    userId: process.env.MATRIX_USER_ID
});

async function testConnection() {
    try {
        console.log('Démarrage du client...');
        await client.startClient({ initialSyncLimit: 1 });
        
        console.log('✅ bot-sage connecté avec succès !');
        
        // Test d'envoi d'un message
        await client.sendTextMessage(process.env.MATRIX_ROOM_ID, '🤖 Hello ! bot-sage est en ligne !');
        console.log('✅ Message de test envoyé !');
        
        client.stopClient();
        process.exit(0);
    } catch (err) {
        console.error('❌ Erreur:', err.message);
        process.exit(1);
    }
}

testConnection();
