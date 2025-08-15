const AIHandler = require('./ai-handler');

const ai = new AIHandler();

async function testAI() {
    console.log('🧪 Test de l\'IA...\n');
    
    const testMessages = [
        "Créer une tâche réviser le rapport",
        "Ajouter une nouvelle tâche pour appeler le client",
        "Tâche: préparer la présentation",
        "La tâche est terminée",
        "C'est fini",
        "Bonjour comment ça va"
    ];
    
    for (const message of testMessages) {
        console.log(`📝 Message: "${message}"`);
        const result = await ai.analyzeMessage(message);
        console.log(`🤖 Action:`, result.action);
        console.log(`💬 Réponse:`, result.confirmation);
        console.log('---');
    }
    
    console.log('✅ Test terminé !');
}

testAI();