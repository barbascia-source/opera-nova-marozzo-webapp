// js/components/Strumenti.js
/**
 * Componente per la sezione Strumenti.
 * Accorpa il Lettore PDF integrato e la gestione dell'Installazione PWA.
 */
const Strumenti = {
    name: 'Strumenti',
    props: {
        tab: {
            type: String,
            default: 'pdf'
        }
    },
    data() {
        return {
            currentTab: this.tab || 'pdf'
        };
    },
    watch: {
        tab(newTab) {
            if (newTab) {
                this.currentTab = newTab;
            }
        }
    },
    methods: {
        setTab(tabName) {
            this.currentTab = tabName;
            window.scrollTo({ top: 0, behavior: 'smooth' });
        },
        triggerInstall() {
            // Chiama la funzione di installazione esposta sull'istanza root o emette un evento
            if (this.$root && typeof this.$root.installApp === 'function') {
                this.$root.installApp();
            } else {
                alert("Per installare la web app, usa l'opzione del tuo browser o il pulsante nella barra superiore.");
            }
        }
    },
    template: `
        <div class="strumenti-page bio-page">
            <header class="book-header">
                <h1 class="book-title">Strumenti</h1>
                <p class="site-subtitle">Utility digitali per lo studio ed il consulting offline</p>
            </header>

            <!-- Navigazione interna Schede -->
            <nav class="equip-tabs-nav" aria-label="Sezioni Strumenti">
                <button 
                    class="equip-tab-btn" 
                    :class="{ active: currentTab === 'pdf' }" 
                    @click="setTab('pdf')">
                    Lettore PDF
                </button>
                <button 
                    class="equip-tab-btn" 
                    :class="{ active: currentTab === 'install' }" 
                    @click="setTab('install')">
                    Installa l'App
                </button>
            </nav>

            <!-- 1. LETTORE PDF -->
            <div v-if="currentTab === 'pdf'" class="tab-content">
                <lettura-pdf></lettura-pdf>
            </div>

            <!-- 2. INSTALLA L'APP -->
            <div v-if="currentTab === 'install'" class="tab-content bio-section">
                <h2>Installa Codex Spadae</h2>
                <p><span class="drop-cap">C</span>odex Spadae è sviluppata come una <strong>Progressive Web App (PWA)</strong> moderna. Può essere installata direttamente sul tuo smartphone, tablet o computer per funzionare come un'applicazione nativa anche in assenza di connessione internet.</p>

                <div class="technical-focus">
                    <h4>Vantaggi dell'Installazione</h4>
                    <ul>
                        <li><strong>Consultazione Offline:</strong> Tutti i testi, le schede delle guardie ed i passeggi restano memorizzati sul dispositivo.</li>
                        <li><strong>Prestazioni Elevate:</strong> Caricamento istantaneo senza tempi d'attesa di rete.</li>
                        <li><strong>Icona Dedicata:</strong> Avvio rapido dalla schermata home del tuo dispositivo.</li>
                    </ul>
                </div>

                <div class="cta-section" style="margin-top: 2rem; text-align: center;">
                    <button class="cta-link btn-primary" @click="triggerInstall" style="font-size: 1.1rem; padding: 0.8rem 2rem;">
                        &#128241; Avvia Installazione App
                    </button>
                    <p style="margin-top: 1rem; font-size: 0.9rem; color: var(--color-gold);">
                        Su iOS (iPhone/iPad): Tocca "Condividi" nel browser Safari e seleziona "Aggiungi alla schermata Home".
                    </p>
                </div>
            </div>
        </div>
    `,
    components: {
        'lettura-pdf': LetturaPDF
    }
};
