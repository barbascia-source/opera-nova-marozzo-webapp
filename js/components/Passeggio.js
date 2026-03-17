// js/components/Passeggio.js
// Componente per la sezione passeggio

const Passeggio = {
    data() {
        return {
            activeGuard: null,
            guards: [
                { id: 'coda-lunga', name: 'Guardia Coda Lunga', position: 'Piede destro avanti o indietro, spada tenuta bassa sul fianco destro con la punta rivolta all\'indietro.',  attack: 'Falso dritto ascendente o mandritto montante.', x: 50, y: 90 },
                { id: 'alta', name: 'Guardia Alta', position: 'Piede destro avanti, spada alzata sopra la spalla destra pronta a calare un fendente.', attack: 'Fendente mandritto o fendente riverso.', x: 15, y: 65 },
                { id: 'testa', name: 'Guardia di Testa', position: 'Piedi in guardia larga, spada tenuta orizzontale o leggermente inclinata sopra la testa a protezione del capo.', attack: 'Risposta di taglio sul tempo.', x: 15, y: 35 },
                { id: 'faccia', name: 'Guardia di Faccia', position: 'Spada distesa in avanti all\'altezza del volto dell\'avversario per tenere la distanza e minacciare di punta.', attack: 'Punta dritta al volto o al petto.', x: 50, y: 10 },
                { id: 'punto', name: 'Guardia di Punto (o Porta di Ferro)', position: 'Piede destro o sinistro avanti, mano bassa e punta della spada rivolta verso il volto o petto dell\'avversario.', attack: 'Stoccata o imbroccata.', x: 85, y: 35 },
                { id: 'piedi-dritti', name: 'Guardia di Piedi Dritti', position: 'Piedi vicini o allineati, corpo ritratto, spada che copre la linea centrale.', attack: 'Preparazione per ritirata o scatto rapido.', x: 85, y: 65 }
            ],
            // Definizione archi (SVG path data) che collegano le guardie per mostrare il passeggio
            // Start: Coda Lunga(1) -> Alta(2) -> Testa(3) -> Faccia(4) -> Punto(5) -> Coda Lunga(1)
            // Piedi Dritti(6) è una variante/punto di partenza.
            connections: [
                { path: "M 48 85 L 20 68", from: 'coda-lunga', to: 'alta' },
                { path: "M 15 60 L 15 40", from: 'alta', to: 'testa' },
                { path: "M 20 32 L 48 15", from: 'testa', to: 'faccia' },
                { path: "M 52 15 L 80 32", from: 'faccia', to: 'punto' },
                { path: "M 80 40 L 52 85", from: 'punto', to: 'coda-lunga' },
                { path: "M 85 60 L 85 40", from: 'piedi-dritti', to: 'punto', dashed: true },
                { path: "M 80 68 L 55 85", from: 'piedi-dritti', to: 'coda-lunga', dashed: true }
            ]
        }
    },
    methods: {
        setActive(id) {
            this.activeGuard = this.activeGuard === id ? null : id;
        }
    },
    template: `
        <div class="passeggio-page">
            <header class="book-header">
                <h1 class="book-title">Il Passeggio di Guardia in Guardia</h1>
                <p class="site-subtitle">Achille Marozzo</p>
            </header>
            
            <div class="book-intro">
                <p>Il passeggio rappresenta il movimento fondamentale della scuola bolognese. <parsed-text text="Marozzo"></parsed-text> descrive il "passeggiare di guardia in guardia" come transizione fluida e controllata tra le varie guardie, mantenendo sempre il controllo della distanza e la minaccia verso l'avversario.</p>
                
                <p>Il passeggio inizia sempre da Guardia <parsed-text text="Coda Lunga"></parsed-text> o Guardia di Piedi Dritti, le posizioni più sicure per il movimento. Ogni passo mantiene la spada in minaccia attiva.</p>
                
                <p>Le transizioni seguono una sequenza codificata: Coda Lunga &rarr; Guardia Alta &rarr; Guardia di Testa &rarr; Guardia di Faccia &rarr; Guardia di Punto &rarr; ritorno a Coda Lunga.</p>
                
                <p>Il movimento è circolare, non lineare: si passa "passeggiando" mantenendo il triangolo dei piedi e il peso ben distribuito.</p>
            </div>
            
            <div class="diagram-section">
                <h3>Diagramma del Passeggio</h3>
                <div class="passeggio-diagram">
                    <svg viewBox="0 0 100 100" class="diagram-svg">
                        <defs>
                            <!-- Marker per la punta delle frecce -->
                            <marker id="arrow" viewBox="0 0 10 10" refX="8" refY="5"
                                markerWidth="6" markerHeight="6"
                                orient="auto-start-reverse">
                                <path d="M 0 0 L 10 5 L 0 10 z" fill="var(--color-gold)" />
                            </marker>
                        </defs>
                        
                        <!-- Linee di connessione animate -->
                        <path v-for="(conn, idx) in connections" :key="'conn-'+idx"
                              :d="conn.path" 
                              :class="['diagram-path', { 'dashed-path': conn.dashed }]"
                              marker-end="url(#arrow)" />
                    </svg>
                    
                    <!-- Nodi interattivi delle guardie -->
                    <div v-for="guard in guards" :key="guard.id"
                         class="guard-node"
                         :class="{ 'active': activeGuard === guard.id }"
                         :style="{ left: guard.x + '%', top: guard.y + '%' }"
                         @click="setActive(guard.id)">
                        <span class="guard-dot"></span>
                        <span class="guard-label">{{ guard.name }}</span>
                    </div>
                </div>
            </div>
            
            <!-- Popup per la guardia selezionata -->
            <transition name="fade">
                <div v-if="activeGuard" class="technical-focus guard-details" style="margin-top: 1rem;">
                    <template v-for="g in guards">
                        <div v-if="g.id === activeGuard" :key="'det-'+g.id">
                            <h4 style="color: #1a4f76;"><parsed-text :text="g.name"></parsed-text></h4>
                            <p><strong>Posizione:</strong> <parsed-text :text="g.position"></parsed-text></p>
                            <p><strong>Colpo Tipico:</strong> <parsed-text :text="g.attack"></parsed-text></p>
                            <button @click="activeGuard=null" class="close-btn">Chiudi</button>
                        </div>
                    </template>
                </div>
            </transition>
            
            <div class="collapsible-sections">
                <details class="collapsible-panel">
                    <summary class="assault-header">Sequenza completa del passeggio</summary>
                    <div class="assault-content">
                        <ol>
                            <li>Si parte da <strong>Guardia Coda Lunga</strong>, provocando l'avversario.</li>
                            <li>Avanzando un passo, si monta in <strong>Guardia Alta</strong> pronti a calare.</li>
                            <li>Ricevendo l'assalto, si devia in <strong>Guardia di Testa</strong>.</li>
                            <li>Da lì si spinge la punta verso il nemico in <strong>Guardia di Faccia</strong>.</li>
                            <li>Si cala poi in <strong>Guardia di Punto</strong> coprendo la linea bassa.</li>
                            <li>Si fa un passo obliquo e si ritorna riposando in <strong>Coda Lunga</strong> o <strong>Piedi Dritti</strong>.</li>
                        </ol>
                    </div>
                </details>
                
                <details class="collapsible-panel">
                    <summary class="assault-header">Errori comuni nel passeggio</summary>
                    <div class="assault-content">
                        <ul>
                            <li><strong>Linearità eccessiva:</strong> Camminare solo avanti e indietro "su un binario" senza variare l'angolo di attacco.</li>
                            <li><strong>Spada non minacciosa:</strong> Muovere i piedi lasciando la lama inerte. Ogni passo deve corrispondere a una parata o a un taglio.</li>
                            <li><strong>Sbilanciamento:</strong> Perdere la forma ("il triangolo") e allungare troppo i passi finendo fuori asse.</li>
                        </ul>
                    </div>
                </details>
                
                <details class="collapsible-panel">
                    <summary class="assault-header">Video dimostrativo</summary>
                    <div class="assault-content video-placeholder">
                        <div class="embed-container">
                            <!-- Placeholder YouTube iframe -->
                            <div style="background:#000; width:100%; aspect-ratio:16/9; display:flex; align-items:center; justify-content:center; color:#fff; border: 2px solid var(--color-gold);">
                                <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="var(--color-accent)" stroke="var(--color-gold)" stroke-width="1" stroke-linecap="round" stroke-linejoin="round"><path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33 2.78 2.78 0 0 0 1.94 2c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.33 29 29 0 0 0-.46-5.33z"></path><polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02" fill="#fff"></polygon></svg>
                                <span style="margin-left:10px; font-family:var(--font-heading)">Video Dimostrativo (Placeholder)</span>
                            </div>
                        </div>
                    </div>
                </details>
            </div>
        </div>
    `,
    components: {
        'parsed-text': ParsedText
    }
};
