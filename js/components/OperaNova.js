// js/components/OperaNova.js
/**
 * Componente per la sezione Opera Nova.
 * Raccoglie la consultazione del trattato di Achille Marozzo (1536):
 * Il trattato, Il passeggio di Marozzo, Guardie, Assalti e i 5 Libri dell'Opera Nova.
 */
const OperaNova = {
    name: 'OperaNova',
    props: {
        tab: {
            type: String,
            default: 'trattato'
        }
    },
    data() {
        return {
            currentTab: this.tab || 'trattato',
            books: booksData
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
        goToBook(id) {
            this.$router.push('/libro/' + id);
        },
        goToPasseggio() {
            this.$router.push('/passeggio');
        }
    },
    template: `
        <div class="opera-nova-page bio-page">
            <header class="book-header">
                <h1 class="book-title">Opera Nova</h1>
                <p class="site-subtitle">Achille Marozzo &bull; Bologna, MDXXXVI</p>
            </header>

            <!-- Navigazione interna Schede -->
            <nav class="equip-tabs-nav" aria-label="Sezioni Opera Nova">
                <button 
                    class="equip-tab-btn" 
                    :class="{ active: currentTab === 'trattato' }" 
                    @click="setTab('trattato')">
                    Il Trattato
                </button>
                <button 
                    class="equip-tab-btn" 
                    :class="{ active: currentTab === 'passeggio' }" 
                    @click="setTab('passeggio')">
                    Il Passeggio
                </button>
                <button 
                    class="equip-tab-btn" 
                    :class="{ active: currentTab === 'guardie' }" 
                    @click="setTab('guardie')">
                    Guardie
                </button>
                <button 
                    class="equip-tab-btn" 
                    :class="{ active: currentTab === 'assalti' }" 
                    @click="setTab('assalti')">
                    Assalti
                </button>
                <button 
                    class="equip-tab-btn" 
                    :class="{ active: currentTab === 'libri' }" 
                    @click="setTab('libri')">
                    I Cinque Libri
                </button>
            </nav>

            <!-- 1. IL TRATTATO -->
            <div v-if="currentTab === 'trattato'" class="tab-content bio-section">
                <p><span class="drop-cap">L</span>'<strong>Opera Nova Chiamata Duello</strong>, stampata a Modena nel 1536 dal maestro bolognese Achille Marozzo, rappresenta il capolavoro monumentale della tradizione schermistica italiana del Rinascimento.</p>
                <p>Suddiviso in cinque libri distinti, il trattato codifica con minuzia didattica e pragmatismo marziale l'arte del combattimento con la spada da lato, sola o accompagnata da brocchiere, daga, targa, rotella e mantello, fino allo spadone a due mani, alle armi d'asta ed alle regole del duello d'onore ("singolar tenzone").</p>

                <div class="technical-focus" style="margin-top: 2rem;">
                    <h4>Struttura Pedagogica del Trattato</h4>
                    <ul>
                        <li><strong>Progressione:</strong> Dalle forme fondamentali di spada e brocchiere fino alle armi pesanti ed alle cavalleresche regole di lizza.</li>
                        <li><strong>Xilografie originali:</strong> Corredato da oltre 80 dettagliate illustrazioni figurate del XVI secolo che ritraggono le posture ed i colpi.</li>
                        <li><strong>Terminologia:</strong> Codificazione rigorosa di guardie, colpi di taglio (mandritti e rovesci), colpi di punta (stoccate e imbroccate) e passeggi.</li>
                    </ul>
                </div>

                <div class="equip-grid" style="margin-top: 2rem;">
                    <div class="equip-card" @click="setTab('libri')">
                        <div class="card-icon">&#128214;</div>
                        <h3>I Cinque Libri</h3>
                        <p>Accedi direttamente alla trascrizione e consultazione guidata dei 5 libri del trattato.</p>
                        <span class="card-link">Esplora i Libri &rarr;</span>
                    </div>

                    <div class="equip-card" @click="goToPasseggio">
                        <div class="card-icon">&#128099;</div>
                        <h3>Il Passeggio</h3>
                        <p>Studio geometrico dei movimenti di piedi e corpo per il passaggio da guardia a guardia.</p>
                        <span class="card-link">Vai al Passeggio &rarr;</span>
                    </div>
                </div>
            </div>

            <!-- 2. IL PASSEGGIO -->
            <div v-if="currentTab === 'passeggio'" class="tab-content bio-section">
                <h2>Il Passeggio di Marozzo</h2>
                <p>Nel sistema di Achille Marozzo, il <strong>passeggio</strong> è la scienza del movimento tridimensionale. Esso unisce il gioco di gambe alla difesa ed all'offesa, permettendo al praticante di governare la distanza e gli angoli di attacco.</p>
                <p>Il passeggio si sviluppa lungo la linea direttrice (passi semplici, interi, ad accrescere) ed in forma circolare e triangolare (traverse e trapassi) per uscire dal filo del colpo nemico.</p>

                <div class="cta-section" style="margin-top: 2rem; text-align: center;">
                    <button class="cta-link" @click="goToPasseggio">
                        &#128099; Apri il modulo completo del Passeggio
                    </button>
                </div>
            </div>

            <!-- 3. GUARDIE -->
            <div v-if="currentTab === 'guardie'" class="tab-content bio-section">
                <h2>Le Guardie Marozziane</h2>
                <p>Le guardie nella Scuola Bolognese non sono posizioni statiche, bensì fasi dinamiche di transizione e risposte di parata o invito.</p>

                <div class="equip-sub-list">
                    <div class="equip-sub-item">
                        <h3>Guardia Alta</h3>
                        <p>Spada elevata sopra la testa con la punta rivolta all'indietro. Postura d'attacco devastante destinata a calare fendenti diretti (fendenti o mandritti).</p>
                    </div>
                    <div class="equip-sub-item">
                        <h3>Guardia di Faccia</h3>
                        <p>Lama distesa all'altezza del volto nemico con la punta minacciosa rivolta agli occhi. Invita l'attacco coprendo la linea alta.</p>
                    </div>
                    <div class="equip-sub-item">
                        <h3>Guardia di Testa</h3>
                        <p>Spada orizzontale sollevata a difesa del capo. Intercetta i fendenti calati dall'alto guidando il controattacco.</p>
                    </div>
                    <div class="equip-sub-item">
                        <h3>Porta di Ferro (Stretta / Larga)</h3>
                        <p>Guardia bassa fondamentale con la punta rivolta verso il suolo o verso il nemico. Offre una barriera invalicabile per i colpi inferiori.</p>
                    </div>
                    <div class="equip-sub-item">
                        <h3>Coda Lunga e Distesa</h3>
                        <p>Spada arretrata lungo il fianco destro, prolungando il corpo. Posizione di massimo invito e preparazione a passi esplosivi ad accrescere.</p>
                    </div>
                </div>
            </div>

            <!-- 4. ASSALTI -->
            <div v-if="currentTab === 'assalti'" class="tab-content bio-section">
                <h2>Gli Assalti dell'Opera Nova</h2>
                <p>Marozzo struttura la didattica attraverso sequenze ritmiche denominate <strong>Assalti</strong>. Si tratta di complessi moduli mnemonici da eseguire in palestra per interiorizzare combinazioni di passeggio, parate e risposte.</p>

                <div class="technical-focus">
                    <h4>Caratteristiche degli Assalti</h4>
                    <ul>
                        <li><strong>Primo e Secondo Assalto:</strong> Dedicati alla Spada e Brocchiere stretto (Libro I), insegnano la coordinazione perfetta tra offesa di spada e difesa di scudo.</li>
                        <li><strong>Terzo Assalto:</strong> Concentrato sulla Spada e Brocchiere largo (o Targa), ampliando le dinamiche di parata attiva.</li>
                        <li><strong>Assalti a Due Mani:</strong> Sequenze per lo Spadone incentrate sul continuo flusso di fendenti e rotazioni del busto.</li>
                    </ul>
                </div>
            </div>

            <!-- 5. LIBRI DELL'OPERA NOVA -->
            <div v-if="currentTab === 'libri'" class="tab-content bio-section">
                <h2>I Cinque Libri del Trattato</h2>
                <p>Seleziona uno dei volumi dell'<em>Opera Nova</em> per consultare la trascrizione delle guardie, degli assalti e dei foci tecnici pertinenti:</p>

                <div class="equip-grid">
                    <div v-for="b in books" :key="b.id" class="equip-card" @click="goToBook(b.id)">
                        <div class="card-icon">&#128214;</div>
                        <h3>{{ b.title }}</h3>
                        <p><strong>{{ b.subtitle }}</strong></p>
                        <p>{{ b.description ? b.description.substring(0, 110) + '...' : '' }}</p>
                        <span class="card-link">Leggi Libro {{ b.id }} &rarr;</span>
                    </div>
                </div>
            </div>
        </div>
    `
};
