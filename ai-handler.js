const dotenv = require('dotenv');
dotenv.config();

class AIHandler {
    constructor() {
        // Pour l'instant, on simule l'IA sans vraie clé API
        this.apiKey = process.env.OPENAI_API_KEY || 'simulation';
    }

    async analyzeMessage(userMessage) {
        console.log('🧠 IA analyse:', userMessage);
        
        // Simulation intelligente de l'IA
        const response = this.simulateAI(userMessage);
        
        console.log('🤖 IA répond:', response);
        return response;
    }

    simulateAI(message) {
        const lowerMessage = message.toLowerCase();
        
        // IMPORTANT: Vérifier TERMINÉ en premier !
        if (lowerMessage.includes('terminé') || lowerMessage.includes('fini') || 
            lowerMessage.includes('done') || lowerMessage.includes('complet')) {
            return {
                action: 'complete_task',
                data: { status: 'done' },
                confirmation: '✅ Je vais marquer cette tâche comme terminée'
            };
        }
        
        // Puis vérifier création de tâche
        if (lowerMessage.includes('tâche') || lowerMessage.includes('task') || 
            lowerMessage.includes('créer') || lowerMessage.includes('ajouter')) {
            return {
                action: 'create_task',
                data: {
                    title: this.extractTaskTitle(message),
                    priority: 'normal'
                },
                confirmation: `✅ Je vais créer la tâche: "${this.extractTaskTitle(message)}"`
            };
        }
        
        // Conversation normale
        return {
            action: 'chat',
            data: {},
            confirmation: `🤖 J'ai bien reçu: "${message}"`
        };
    }

    extractTaskTitle(message) {
        // Extraction simple du titre de tâche
        const patterns = [
            /(?:créer|ajouter|nouvelle?)\s+(?:une?\s+)?tâche\s+["']?([^"']+)["']?/i,
            /tâche\s*:\s*["']?([^"']+)["']?/i,
            /["']([^"']+)["']/,
        ];
        
        for (const pattern of patterns) {
            const match = message.match(pattern);
            if (match) return match[1].trim();
        }
        
        // Si rien trouvé, retourner le message complet
        return message.replace(/(?:créer|ajouter|nouvelle?)\s+(?:une?\s+)?tâche\s*/i, '').trim();
    }
}

module.exports = AIHandler;