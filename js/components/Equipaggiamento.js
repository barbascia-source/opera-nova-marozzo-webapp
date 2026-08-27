// js/components/Equipaggiamento.js
/**
 * Componente per la sezione Equipaggiamento (ex Basi).
 * Organizza le informazioni in 4 schede: Panoramica, Armi, Protezioni, Cura e manutenzione.
 */
const Equipaggiamento = {
    name: 'Equipaggiamento',
    props: {
        tab: {
            type: String,
            default: 'panoramica'
        }
    },
    data() {
        return {
            currentTab: this.tab || 'panoramica',
            openAccordion: null
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
            this.openAccordion = null;
            // Scroll dolcemente all'inizio della scheda
            window.scrollTo({ top: 0, behavior: 'smooth' });
        },
        toggleAccordion(index) {
            this.openAccordion = this.openAccordion === index ? null : index;
        }
    },
    template: `
        <div class="equip-page bio-page">
            <header class="book-header">
                <h1 class="book-title">Equipaggiamento</h1>
                <p class="site-subtitle">Strumenti e protezioni per la Scherma Storica Europea (HEMA)</p>
            </header>

            <!-- Navigazione interna Schede -->
            <nav class="equip-tabs-nav" aria-label="Sezioni Equipaggiamento">
                <button 
                    class="equip-tab-btn" 
                    :class="{ active: currentTab === 'panoramica' }" 
                    @click="setTab('panoramica')">
                    Panoramica
                </button>
                <button 
                    class="equip-tab-btn" 
                    :class="{ active: currentTab === 'armi' }" 
                    @click="setTab('armi')">
                    Armi
                </button>
                <button 
                    class="equip-tab-btn" 
                    :class="{ active: currentTab === 'protezioni' }" 
                    @click="setTab('protezioni')">
                    Protezioni
                </button>
                <button 
                    class="equip-tab-btn" 
                    :class="{ active: currentTab === 'manutenzione' }" 
                    @click="setTab('manutenzione')">
                    Cura e Manutenzione
                </button>
            </nav>

            <!-- 1. PANORAMICA -->
            <div v-if="currentTab === 'panoramica'" class="tab-content bio-section">
                <p><span class="drop-cap">L</span>'equipaggiamento nella scherma storica europea (HEMA) è l'anello di congiunzione fondamentale tra la ricostruzione teorica dei trattati d'arme del XVI secolo e la pratica marziale moderna. Ogni strumento di offesa e difesa è stato progettato per garantire il massimo realismo biomeccanico e la sicurezza in lizza.</p>
                <p>Nelle sezioni dedicate potrai esplorare in dettaglio le caratteristiche anatomiche delle spade rinascimentali, i presidi di protezione per la pratica a contatto pieno e le corrette procedure di manutenzione per conservare l'attrezzatura nel tempo.</p>

                <div class="equip-grid">
                    <div class="equip-card" @click="setTab('armi')">
                        <div class="card-icon">&#9876;</div>
                        <h3>Armi</h3>
                        <p>Anatomia della spada da lato, spadone a due mani, armi d'accompagnamento e simulatori da allenamento.</p>
                        <span class="card-link">Esplora Armi &rarr;</span>
                    </div>

                    <div class="equip-card" @click="setTab('protezioni')">
                        <div class="card-icon">&#128737;</div>
                        <h3>Protezioni</h3>
                        <p>Maschere 1600N, giubbe imbottite, guanti articolati pesanti e protezioni rigide per articolazioni.</p>
                        <span class="card-link">Esplora Protezioni &rarr;</span>
                    </div>

                    <div class="equip-card" @click="setTab('manutenzione')">
                        <div class="card-icon">&#9881;</div>
                        <h3>Cura e Manutenzione</h3>
                        <p>Pulizia della lama, rimozione ruggine, cura di tessuto e cuoio, stoccaggio e verifiche di sicurezza.</p>
                        <span class="card-link">Esplora Manutenzione &rarr;</span>
                    </div>
                </div>
            </div>

            <!-- 2. ARMI -->
            <div v-if="currentTab === 'armi'" class="tab-content bio-section">
                <h2>Anatomia della Spada Rinascimentale</h2>
                <p>
                    La spada si suddivide in due componenti principali: la <strong>Lama</strong> e l'<strong>Elsa</strong>. L'elsa ricomprende la <strong>Croce di Guardia</strong>, il <strong>Manico</strong> ed il <strong>Pomolo</strong>.
                </p>
                
                <div class="technical-focus">
                    <h4>Ripartizione della Lama</h4>
                    <ul>
                        <li><strong>Debole:</strong> Il terzo superiore vicino alla punta. Utilizzato per portare attacchi di taglio e di punta, richiedendo rapidità e precisione.</li>
                        <li><strong>Medio:</strong> La porzione centrale della lama. Impiegato negli incroci, legamenti e nelle azioni di deviazione.</li>
                        <li><strong>Forte:</strong> Il terzo inferiore vicino alla croce di guardia. Strutturalmente robusto, è la sezione deputata alle parate e alle prese di ferro.</li>
                    </ul>
                </div>

                <div class="technical-focus" style="margin-top: 1.5rem;">
                    <h4>Componenti dell'Elsa</h4>
                    <ul>
                        <li><strong>Croce di Guardia:</strong> Bracci metallici perpendicolari alla lama destinati alla difesa della mano. Nella spada da lato bolognese si arricchisce di anelli, ponticelli e archetti per proteggere l'indice avanzato.</li>
                        <li><strong>Manico:</strong> Impugnatura in legno rivestita in cuoio o treccia metallica, conformata per assicurare una presa salda e orientata.</li>
                        <li><strong>Pomolo:</strong> Massa metallica all'estremità dell'elsa. Risulta cruciale per bilanciare il baricentro e, nello spadone a due mani, funge da seconda leva di governo.</li>
                    </ul>
                </div>

                <figure class="sds-figure">
                    <img src="public/spada.png" alt="Anatomia della Spada" class="sds-image">
                    <figcaption class="sds-caption">Anatomia e ripartizione di una Feder / Spada da allenamento</figcaption>
                </figure>

                <h2>Tipologie di Armi & Simulatori</h2>
                <div class="equip-sub-list">
                    <div class="equip-sub-item">
                        <h3>Spada da Lato</h3>
                        <p>Lama diritta a doppio filo con elsa complessa caratteristica del primo Cinquecento. È l'arma principe affrontata nell'<em>Opera Nova</em> di Achille Marozzo, impiegata sia sola sia accompagnata da brocchiere, daga o mantello.</p>
                    </div>
                    <div class="equip-sub-item">
                        <h3>Spadone a Due Mani</h3>
                        <p>Arma monumentale dal lungo fendente, dotata di denti d'arresto (arresti) sopra la ricasso. Richiede dinamica di corpo fluida e continuo passeggio.</p>
                    </div>
                    <div class="equip-sub-item">
                        <h3>Armi d'Accompagnamento</h3>
                        <p>Il <strong>Brocchiero</strong> (piccolo scudo metallico con umbone centrale) ed il <strong>Pugnale da parata</strong> integrano la difesa attiva e la percussione ravvicinata.</p>
                    </div>
                    <div class="equip-sub-item">
                        <h3>Simulatori da Allenamento (Feder)</h3>
                        <p>Repliche moderne in acciaio armonico con flessibilità calibrata e bottone apicale di sicurezza per praticare lo sparring reale a pieno contatto.</p>
                    </div>
                </div>
            </div>

            <!-- 3. PROTEZIONI -->
            <div v-if="currentTab === 'protezioni'" class="tab-content bio-section">
                <h2>Protezioni per la Scherma Storica</h2>
                <p>La pratica marziale moderna richiede dispositivi di protezione ad alta resistenza in grado di assorbire impatti ad elevata energia senza limitare la mobilità schermistica.</p>

                <div class="timeline-container">
                    <div class="assault-item">
                        <div class="assault-header" @click="toggleAccordion(0)">
                            <span>Maschera e Coprimaschera (1600N)</span>
                            <span class="accordion-toggle-label">{{ openAccordion === 0 ? '▲ chiudi' : '▼ esplora' }}</span>
                        </div>
                        <div v-show="openAccordion === 0" class="assault-content">
                            <p>La maschera da scherma certificata 1600N (FIE/CE Nello standard di sicurezza) protegge il volto dalle stoccate di punta. Deve essere abbinata a un coprimaschera imbottito rigido con piastra rigida posteriore a protezione della nuca e delle vertebre cervicali.</p>
                        </div>
                    </div>

                    <div class="assault-item">
                        <div class="assault-header" @click="toggleAccordion(1)">
                            <span>Protezione Gola (Gorget)</span>
                            <span class="accordion-toggle-label">{{ openAccordion === 1 ? '▲ chiudi' : '▼ esplora' }}</span>
                        </div>
                        <div v-show="openAccordion === 1" class="assault-content">
                            <p>Il gorget rigido in polimero o acciaio si indossa sotto la giubba. Protegge laringe, carotidi e tr trachea da stoccate accidentali che potrebbero scivolare sotto la bavetta della maschera.</p>
                        </div>
                    </div>

                    <div class="assault-item">
                        <div class="assault-header" @click="toggleAccordion(2)">
                            <span>Giubba da Scherma (350N / 800N)</span>
                            <span class="accordion-toggle-label">{{ openAccordion === 2 ? '▲ chiudi' : '▼ esplora' }}</span>
                        </div>
                        <div v-show="openAccordion === 2" class="assault-content">
                            <p>Giacca schermistica in tessuto anti-perforazione (350N o 800N) dotata di imbottitura interna assorbente per smorzare la forza dei fendenti e delle stoccate sul torace e sulle braccia.</p>
                        </div>
                    </div>

                    <div class="assault-item">
                        <div class="assault-header" @click="toggleAccordion(3)">
                            <span>Guanti Articolati Pesanti</span>
                            <span class="accordion-toggle-label">{{ openAccordion === 3 ? '▲ chiudi' : '▼ esplora' }}</span>
                        </div>
                        <div v-show="openAccordion === 3" class="assault-content">
                            <p>I guanti articolati con scocche rigide (tipo "lobster" o a dita separate rinforzate) garantiscono la protezione delle falangi e dei polsi contro colpi diretti di spadone e spada da lato.</p>
                        </div>
                    </div>

                    <div class="assault-item">
                        <div class="assault-header" @click="toggleAccordion(4)">
                            <span>Protezioni per Articolazioni e Busto</span>
                            <span class="accordion-toggle-label">{{ openAccordion === 4 ? '▲ chiudi' : '▼ esplora' }}</span>
                        </div>
                        <div v-show="openAccordion === 4" class="assault-content">
                            <p>Gomitoliere rigide, ginocchiere con protezione laterale, conchiglia anatomica e paraseno/parastacco in plastica rigida completano la dotazione per lo sparring.</p>
                        </div>
                    </div>
                </div>
            </div>

            <!-- 4. CURA E MANUTENZIONE -->
            <div v-if="currentTab === 'manutenzione'" class="tab-content bio-section">
                <h2>Cura e Manutenzione dell'Equipaggiamento</h2>
                <p>Mantenere l'attrezzatura in perfette condizioni è indispensabile per la sicurezza propria e dei compagni d'arma, oltre che per prolungare la vita utile di lame e protezioni.</p>

                <div class="timeline-container">
                    <div class="assault-item">
                        <div class="assault-header" @click="toggleAccordion(10)">
                            <span>Pulizia e Lubrificazione della Lama</span>
                            <span class="accordion-toggle-label">{{ openAccordion === 10 ? '▲ chiudi' : '▼ esplora' }}</span>
                        </div>
                        <div v-show="openAccordion === 10" class="assault-content">
                            <p>Al termine di ogni sessione, asciugare la lama con un panno in microfibra per rimuovere sudore e umidità. Applicare uno strato sottile di olio protettivo (olio di camelia, olio minerale o olio di vaselina) per prevenire l'ossidazione.</p>
                        </div>
                    </div>

                    <div class="assault-item">
                        <div class="assault-header" @click="toggleAccordion(11)">
                            <span>Rimozione di Ruggine e Sbavature</span>
                            <span class="accordion-toggle-label">{{ openAccordion === 11 ? '▲ chiudi' : '▼ esplora' }}</span>
                        </div>
                        <div v-show="openAccordion === 11" class="assault-content">
                            <p>Ispezionare regolarmente i fili della lama. Eliminare immediatamente eventuali bave d'acciaio o intaccature taglienti utilizzando una lima fine da metallo. Rimuovere le macchie di ruggine superficiale con gomma abrasiva per metalli o lana d'acciaio 000.</p>
                        </div>
                    </div>

                    <div class="assault-item">
                        <div class="assault-header" @click="toggleAccordion(12)">
                            <span>Controllo Strutturale dell'Elsa</span>
                            <span class="accordion-toggle-label">{{ openAccordion === 12 ? '▲ chiudi' : '▼ esplora' }}</span>
                        </div>
                        <div v-show="openAccordion === 12" class="assault-content">
                            <p>Verificare il serraggio del pomolo e l'assenza di oscillazioni nella croce di guardia. Un'elsa allentata compromette il controllo della lama e può causare danni alla spina del codolo.</p>
                        </div>
                    </div>

                    <div class="assault-item">
                        <div class="assault-header" @click="toggleAccordion(13)">
                            <span>Igiene e Lavaggio delle Protezioni</span>
                            <span class="accordion-toggle-label">{{ openAccordion === 13 ? '▲ chiudi' : '▼ esplora' }}</span>
                        </div>
                        <div v-show="openAccordion === 13" class="assault-content">
                            <p>Lavare la giubba ed i tessuti imbottiti a freddo o a 30°C con detergente delicato, evitando l'uso di ammorbidenti. Far asciugare le protezioni all'aria aperta in luogo ombreggiato. Non utilizzare mai l'asciugatrice.</p>
                        </div>
                    </div>

                    <div class="assault-item">
                        <div class="assault-header" @click="toggleAccordion(14)">
                            <span>Trasporto e Conservazione</span>
                            <span class="accordion-toggle-label">{{ openAccordion === 14 ? '▲ chiudi' : '▼ esplora' }}</span>
                        </div>
                        <div v-show="openAccordion === 14" class="assault-content">
                            <p>Non riporre mai capi umidi all'interno di sacche chiuse. Utilizzare sacche da scherma traspiranti e conservare le spade in ambienti asciutti e a temperatura costante.</p>
                        </div>
                    </div>

                    <div class="assault-item">
                        <div class="assault-header" @click="toggleAccordion(15)">
                            <span>Verifica di Sicurezza Pre e Post Allenamento</span>
                            <span class="accordion-toggle-label">{{ openAccordion === 15 ? '▲ chiudi' : '▼ esplora' }}</span>
                        </div>
                        <div v-show="openAccordion === 15" class="assault-content">
                            <p>Prima di indossare la maschera, verificare la solidità della griglia metallica e l'assenza di deformazioni o crepe. Verificare la tenuta di cerniere, velcro e fibbie sulla giubba.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `
};
