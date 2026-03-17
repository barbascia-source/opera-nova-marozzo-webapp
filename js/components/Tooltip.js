// js/components/Tooltip.js
// Componente per parsare il testo e inserire dinamicamente i tooltip per i termini del glossario

const ParsedText = {
    props: ['text'],
    computed: {
        segments() {
            if (!this.text) return [];
            
            const terms = Object.keys(glossaryData);
            // Ordina per lunghezza decrescente per evitare conflitti (es. "spada" e "mezza spada")
            terms.sort((a, b) => b.length - a.length);
            
            // Crea un'espressione regolare per i termini, ignorando maiuscole/minuscole
            // \b assicura il match solo di parole intere
            const regex = new RegExp(`\\b(${terms.join('|')})\\b`, 'gi');
            
            const parts = [];
            let lastIndex = 0;
            let match;
            
            while ((match = regex.exec(this.text)) !== null) {
                // Aggiunge il testo normale prima del match
                if (match.index > lastIndex) {
                    parts.push({ 
                        type: 'text', 
                        content: this.text.substring(lastIndex, match.index) 
                    });
                }
                
                // Aggiunge il termine col tooltip
                const termLower = match[0].toLowerCase();
                parts.push({ 
                    type: 'term', 
                    content: match[0], // Mantiene la capitalizzazione originale
                    definition: glossaryData[termLower]
                });
                
                lastIndex = regex.lastIndex;
            }
            
            // Aggiunge il testo rimanente
            if (lastIndex < this.text.length) {
                parts.push({ 
                    type: 'text', 
                    content: this.text.substring(lastIndex) 
                });
            }
            
            return parts;
        }
    },
    template: `
        <span>
            <span v-for="(seg, idx) in segments" :key="idx" 
                  :class="{ 'glossary-term': seg.type === 'term' }">
                {{ seg.content }}
                <span v-if="seg.type === 'term'" class="tooltip-container">{{ seg.definition }}</span>
            </span>
        </span>
    `
};
