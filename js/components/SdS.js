// js/components/SdS.js
/**
 * Componente "Struttura della Spada".
 * Mostra l'anatomia della spada e sezione manutenzione con accordion.
 */
const SdS = {
    name: 'SdS',
    data() {
        return {
            /** @type {number|null} Indice della sezione manutenzione aperta */
            openSection: null,
            /** Dati per le sezioni manutenzione (accordion) */
            manutenzione: [
                {
                    titolo: 'Pulizia della lama',
                    contenuto: 'Dopo ogni utilizzo rimuovere residui di sudore e umidità con un panno morbido.<br>Applicare olio protettivo (es. olio di camelia) per prevenire la ruggine.<br>Conservare in luogo asciutto.'
                },
                {
                    titolo: 'Controllo della struttura',
                    contenuto: 'Verificare periodicamente che il pomolo sia ben fissato.<br>Controllare la solidità della croce di guardia.<br>Ispezionare il manico per eventuali allentamenti.'
                },
                {
                    titolo: 'Affilatura',
                    contenuto: 'Per le feder da allenamento mantenere il filo smussato per sicurezza.<br>Rimuovere eventuali sbavature con una lima fine.<br>Non affilare mai una feder da addestramento.'
                }
            ]
        }
    },
    methods: {
        /** Apre/chiude una sezione manutenzione */
        toggleSection(index) {
            this.openSection = this.openSection === index ? null : index;
        }
    },
    template: `
        <div class="bio-page">
            <header class="book-header">
                <h1 class="book-title">Basi</h1>
                <p class="site-subtitle">Fondamenti della scherma storica</p>
            </header>
            
            <div class="bio-section">
                <h3>Struttura della Spada</h3>
                <p>
                    La Spada di divide in 2 parti <strong>Lama</strong> ed <strong>Elsa</strong>, che a sua volta si suddivide in <strong>Croce di Guardia</strong>, <strong>Manico</strong> e <strong>Pomolo</strong>.
                </p>
                <p>
                    <strong>La Lama</strong><br>
                    La lama è strutturata in tre parti, la parte della punta chiamata Debole, la zona centrale Medio e infine, vicino alla croce di guardia Forte.
                    Il Debole viene utilizzato per offendere sia con attacchi di Punta sia con attacchi di taglio, il Medio per gli incroci e il Forte per le parate.
                    <br><br>
                    <strong>La croce di guardia</strong><br>
                    Struttura designata alla protezione della mano dominante e del polso, nella spada da lato si è arricchita di anelli e ponticelli per proteggere l'indice.
                    <br><br>
                    <strong>Il Manico</strong><br>
                    È la parte dell'Elsa dove si impugna la spada, la mano dominante sta nella zona direttamente sotto alla croce di guardia.
                    <br><br>
                    <strong>Il Pomolo</strong><br>
                    Parte finale della spada, fondamentale per il bilanciamento, nella Spada a due mani si impugna con la mano secondaria e si utilizza come leva per guidare la spada.
                </p>
                
                <figure class="sds-figure">
                    <img src="public/spada.png" alt="Schema della spada" class="sds-image">
                    <figcaption class="sds-caption">Esempio di Feder (Spada a due mani)</figcaption>
                </figure>
            </div>

            <!-- Sezione Manutenzione -->
            <div class="timeline-container">
                <h3>Manutenzione</h3>
                <div v-for="(item, index) in manutenzione" :key="index" class="assault-item">
                    <div class="assault-header" @click="toggleSection(index)">
                        <span>{{ item.titolo }}</span>
                        <span class="accordion-toggle-label">
                            {{ openSection === index ? '▲ chiudi' : '▼ esplora' }}
                        </span>
                    </div>
                    <div v-show="openSection === index" class="assault-content">
                        <p v-html="item.contenuto"></p>
                    </div>
                </div>
            </div>
        </div>
    `
};
