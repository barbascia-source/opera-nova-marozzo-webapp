// js/components/Passeggio.js
/**
 * Componente per la sezione passeggio.
 * Mostra l'introduzione, l'immagine del passeggio e l'elenco delle guardie con accordion.
 */
const Passeggio = {
    name: 'Passeggio',
    data() {
        return {
            /** @type {boolean} Stato dello zoom dell'immagine hero */
            isZoomed: false,
            /** @type {string|null} ID della guardia attualmente aperta nell'accordion */
            openGuardId: null,
            /** Dati per i passi schermistici divisi in sezioni */
            sections: [
                {
                    id: 'distanza-piedi',
                    titolo: 'Distanza tra i Piedi',
                    descrizione: 'La “distanza tra i piedi” è la misura orizzontale fra piede avanzato e piede retrocesso in guardia: modificandola cambi la misura rispetto all\'avversario.',
                    passi: [
                        {
                            id: 'piccolo-passo',
                            name: 'Piccolo passo',
                            descrizione: 'È un avanzamento o arretramento di breve ampiezza: il piede che si muove si sposta poco e la distanza tra i piedi varia di pochi centimetri.\n' + 'Serve per piccoli aggiustamenti di misura mantenendo sempre la stessa guardia e una postura stabile.',
                            immagini: ['public/wip.png']
                        },
                        {
                            id: 'medio-passo',
                            name: 'Medio passo',
                            descrizione: 'È il passo “standard” di lavoro: dal piede avanti (o indietro) si compie uno spostamento più marcato, sufficiente a cambiare sensibilmente la distanza dall’avversario ma senza rompere la guardia né richiedere una spinta esplosiva.\n' + 'È utilizzato per entrare o uscire dalla misura di offesa, mantenendo continuità nel gioco di gambe.',
                            immagini: ['public/wip.png']
                        },
                        {
                            id: 'largo-passo',
                            name: 'Largo passo',
                            descrizione: 'È un passo ampio che porta il corpo molto avanti o indietro, avvicinandosi rapidamente al bersaglio o rompendo bruscamente la misura.\n' + 'Spesso è collegato a azioni più impegnative come affondi lunghi o salti.',
                            immagini: ['public/wip.png']
                        }
                    ]
                },
                {
                    id: 'passi-linea',
                    titolo: 'Passi sulla linea e concetto di linea direttrice',
                    descrizione: 'La linea direttrice è la linea immaginaria che unisce i talloni dei due schermitori in guardia, passando per i loro piedi avanzati; rappresenta l\'asse principale lungo cui si sviluppa l\'assalto',
                    passi: [
                        {
                            id: 'affondo',
                            name: 'Passo ad accrescere / affondo',
                            descrizione: 'Il passo ad accrescere è un passo avanti che termina in affondo, cioè con una forte estensione della gamba avanti e una spinta decisa della gamba dietro per portare il corpo in avanti, mantenendo il busto bilanciato.\n' + 'Tecnicamente: si avanza con il piede avanti, quindi si distende la gamba e il busto scivola in avanti, mentre il piede posteriore resta appoggiato e funge da punto di spinta; è il passo tipico per portare un colpo diritto in misura.',
                            immagini: ['public/wip.png']
                        },
                        {
                            id: 'p-semplice',
                            name: 'Passo semplice',
                            descrizione: 'Il passo semplice è un passo avanti o indietro eseguito dalla guardia e concluso di nuovo in guardia.\n' + 'In avanti: si solleva il piede anteriore, lo si porta avanti spingendo con la gamba posteriore, poi si riporta in avanti il piede posteriore per ripristinare la guardia.\n' + 'In indietro: si solleva prima il piede posteriore, poi quello anteriore.',
                            immagini: ['public/wip.png']
                        },
                        {
                            id: 'p-intero',
                            name: 'Passo intero',
                            descrizione: 'Il passo intero è descritto come il passo più naturale e simile alla camminata: si fa perno sul piede avanzato e si porta in avanti quello arretrato, cambiando la guardia (da destra a sinistra o viceversa).\n' + 'Può essere in avanti o indietro e si usa quando si vuole avanzare o retrocedere di misura più ampia, cambiando la guardia.',
                            immagini: ['public/wip.png']
                        },
                        {
                            id: 'p-riunire',
                            name: 'Passo a riunire',
                            descrizione: 'Il passo a riunire consiste nel portare il piede arretrato verso il piede avanzato, riducendo la distanza tra i piedi e spesso riportando il corpo in una posizione più raccolta.\n' + 'È utilizzato per “chiudere” la base d’appoggio dopo un passo ampio, per recuperare equilibrio o per preparare un nuovo cambio di direzione senza cambiare la guardia.',
                            immagini: ['public/wip.png']
                        },
                        {
                            id: 'levata',
                            name: 'Gamba levata',
                            descrizione: 'La gamba levata è un’azione in cui uno dei piedi viene sollevato senza subito posarsi in nuova guardia, fungendo da preparazione o da finta di spostamento.\n' + 'Serve per spezzare il ritmo, simulare un passo o pre-disporre un cambio di direzione, mantenendo però il baricentro centralizzato e pronto a spostarsi.',
                            immagini: ['public/wip.png']
                        },
                        {
                            id: 'balzo-indietro',
                            name: 'Balzo all’indietro',
                            descrizione: 'Il balzo all’indietro è un arretramento eseguito non con un semplice passo, ma con un piccolo salto: entrambi i piedi si staccano dal suolo e atterrano più indietro mantenendo la struttura di guardia.\n' + 'È utilizzato per rompere rapidamente la misura quando l’avversario entra in affondo o avanza con decisione, creando spazio per parare o per preparare un attacco.',
                            immagini: ['public/wip.png']
                        },
                    ]
                },
                {
                    id: 'cerchio',
                    titolo: 'Passi sul cerchio e concetto di triangolo',
                    descrizione: 'Quando si lavora “sul cerchio”, il rapporto di piedi e corpo non segue solo la linea direttrice ma anche linee oblique e laterali che, complessivamente, disegnano triangoli attorno all’avversario.\n' + 'Questo tipo di passeggio serve a ottenere angoli di attacco differenti , sfruttando l’angolazione.',
                    passi: [
                        {
                            id: 'p-traverso',
                            name: 'Passo di traverso',
                            descrizione: 'Il passo di traverso è un passo laterale che porta il corpo fuori dalla linea direttrice, a destra o a sinistra, mantenendo però il volto rivolto verso l’avversario.',
                            immagini: ['public/wip.png']
                        },
                        {
                            id: 'Passo incrociatop-incrociato',
                            name: 'Passo incrociato',
                            descrizione: 'Il passo incrociato modifica notevolmente la distanza: il piede arretrato attraversa la linea e passa davanti al piede avanzato (incrociandolo), oppure il piede avanzato passa dietro al piede arretrato per arretrare molto.\n' + 'In avanti: si porta il piede posteriore davanti al piede anteriore, poi si riposiziona il piede anteriore in nuova guardia; indietro si fa il contrario, portando il piede anteriore dietro al posteriore e poi ripristinando la guardia.',
                            immagini: ['public/wip.png']
                        },
                        {
                            id: 'p-trangolare',
                            name: 'Passo triangolare',
                            descrizione: 'Il passo triangolare è un passo diagonale che, sommato ad altre due posizioni, descrive un triangolo rispetto all’avversario.\n' + 'Permette di colpire da angoli sfalsati e di uscire dalla linea del colpo avversario, sfruttando contemporaneamente passo e taglio.',
                            immagini: ['public/wip.png']
                        },
                        {
                            id: 'p-semplice-diagonale',
                            name: 'Passo semplice diagonale',
                            descrizione: 'Il passo semplice diagonale è analogo al passo semplice, ma invece di avanzare o arretrare lungo la linea direttrice si procede su una linea obliqua.\n' + 'Serve a cambiare contemporaneamente distanza e angolazione, preparando colpi che sfruttano la variazione di linea (botte dritta angolata, cavazioni, ecc.).',
                            immagini: ['public/wip.png']
                        },
                        {
                            id: 'p-accrescere-diagonale',
                            name: 'Passo ad accrescere diagonale',
                            descrizione: 'Il passo ad accrescere diagonale combina affondo e angolazione: si avanza lungo una diagonale rispetto alla linea direttrice e si termina in affondo verso un bersaglio non direttamente frontale.\n' + 'È utilizzato per colpire bersagli laterali o interni evitando la lama avversaria, approfittando della variazione di angolo per rendere più difficile la parata.',
                            immagini: ['public/wip.png']
                        },
                        {
                            id: 'p-inter-diagonale',
                            name: 'Passo inter diagonale',
                            descrizione: 'Il passo inter diagonale unisce la logica del passo intero (cambio di guardia) con la direzione obliqua: il piede arretrato passa avanti su una diagonale, cambiando guardia e posizione laterale rispetto all’avversario.\n' + 'È un movimento più ampio, spesso usato per riorganizzare completamente lo spazio, ad esempio per girare attorno all’avversario o cambiare lato di attacco.',
                            immagini: ['public/wip.png']
                        },
                        {
                            id: 'trapassare-dei-piedi',
                            name: 'Trapassare dei piedi',
                            descrizione: '“Trapassare dei piedi” indica in generale il passaggio di un piede oltre l’altro durante il movimento, includendo quindi forme di passo incrociato e di passo triangolare esteso.\n' + 'Nella pratica di sala viene spesso utilizzato come termine-ombrello per movimenti che portano il corpo a ruotare attorno all’avversario o a cambiare fronte, incrociando ripetutamente i piedi durante la sequenza di passi.',
                            immagini: ['public/wip.png']
                        },
                    ]
                }
            ]
        }
    },
    methods: {
        /** Apre/chiude la spiegazione di una guardia */
        toggleGuard(id) {
            this.openGuardId = this.openGuardId === id ? null : id;
        }
    },
    template: `
        <div class="passeggio-page">
            <header class="book-header">
                <h1 class="book-title">Il Passeggio</h1>
                <p class="site-subtitle">Achille Marozzo</p>
            </header>
            
            <div class="book-intro">
                <p>Nel trattato di Achille Marozzo il passeggio è l'arte del muoversi con ordine fra le guardie, mantenendo misura, stabilità e intenzione offensiva. Non indica soltanto il passo in senso fisico, ma una progressione tecnica in cui piedi, busto, spada e linea del corpo cooperano per accompagnare il passaggio da una guardia all'altra senza perdere equilibrio né presenza offensiva.</p>
                <p>Il passeggio rappresenta il movimento fondamentale della scuola bolognese. <parsed-text text="Marozzo"></parsed-text> descrive il "passeggiare di guardia in guarding" come transizione fluida e controllata tra le varie guardie, mantenendo sempre il controllo della distanza e la minaccia verso l'avversario.</p>
                
                <p>Nel contesto dell'Opera Nova, il passeggio ha una funzione didattica e marziale insieme: educa il praticante a conoscere la geometria del combattimento, a riconoscere i tempi di transizione e a rendere ogni spostamento già utile all'azione. Per questo il movimento non è mai neutro: ogni passo prepara una copertura, un invito, una traversa, una percussione o l'ingresso in una nuova guardia da cui continuare il gioco schermistico.</p>                
                
                <p>Marozzo costruisce il combattimento come una catena coerente di posture e azioni, e il passeggio è il principio che unisce questa catena. Passare da guardia a guardia significa imparare a governare distanza, lato forte e lato debole, orientamento delle anche e disposizione della lama, così che il corpo resti sempre pronto a ferire o a difendersi nello stesso istante.</p>                
                
                <p>Dal punto di vista tecnico, il passeggio esprime una mobilità disciplinata: non corsa, non arretramento confuso, ma avanzare, traversare o voltarsi secondo una logica precisa. Il suo scopo è conservare struttura e misura mentre si modifica l'angolo d'azione, rendendo possibile un combattimento fluido nel quale ogni mutazione di guardia conserva continuità tattica.</p>
            </div>
            
            <div class="passeggio-hero-wrapper">
                <img src="public/passeggio-marozziano.png" alt="Passeggio Marozziano" @click="isZoomed = true" class="passeggio-hero-img" />
                <p class="passeggio-caption">Utilizza il proprio piede predominante come principale</p>
            </div>
            
            <!-- SEZIONE: Passeggio Schermistico (Diviso in sezioni) -->
            <div class="passeggio-section" v-for="section in sections" :key="section.id">

                <h2>{{ section.titolo }}</h2>
                <p class="passeggio-section-desc">{{ section.descrizione }}</p>

                <div class="timeline-container">

                    <div
                        class="assault-item"
                        v-for="passo in section.passi"
                        :key="passo.id"
                    >

                        <div
                            class="assault-header"
                            @click="toggleGuard(passo.id)"
                            role="button"
                            tabindex="0"
                            @keydown.enter="toggleGuard(passo.id)"
                            @keydown.space.prevent="toggleGuard(passo.id)"
                            :aria-expanded="openGuardId === passo.id ? 'true' : 'false'"
                        >
                            {{ passo.name }}
                            <span class="accordion-toggle-label">
                                {{ openGuardId === passo.id ? '▲ chiudi ' : '▼ esplora' }}
                            </span>
                        </div>

                        <div class="assault-content" v-if="openGuardId === passo.id">
                            <p style="white-space: pre-line;">{{ passo.descrizione }}</p>
                            <img
                                v-for="(img, i) in passo.immagini"
                                :key="i"
                                :src="img"
                                :alt="passo.name"
                                style="max-width:100%; height:auto; margin-top:1rem;"
                            />
                        </div>

                    </div>

                </div>

            </div>
            
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

            <!-- Zoom Modal Overlay -->
            <transition name="fade">
                <div v-if="isZoomed" class="modal-overlay" @click="isZoomed = false" style="cursor: zoom-out; z-index: 3000;">
                    <div class="zoom-modal-container" @click.stop>
                        <img src="public/passeggio-marozziano.png" alt="Passeggio Marozziano Zoomed" class="zoom-modal-img" />
                        <button @click="isZoomed = false" class="zoom-modal-close">&times;</button>
                    </div>
                </div>
            </transition>
        </div>
    `,
    components: {
        'parsed-text': ParsedText
    }
};