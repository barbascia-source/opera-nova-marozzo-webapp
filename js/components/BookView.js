// js/components/BookView.js
/**
 * Componente dinamico per la visualizzazione dei singoli libri.
 */
const BookView = {
    name: 'BookView',
    props: {
        id: {
            type: [String, Number],
            required: true
        }
    },
    data() {
        return {
            /** @type {number|null} Indice dell'assalto attualmente aperto */
            openAssaultIndex: null,
            /** @type {number|null} ID della guardia attualmente aperta */
            expandedGuardia: null
        }
    },
    computed: {
        /** Recupera i dati del libro corrente tramite l'ID passato nelle props */
        book() {
            return booksData.find(b => b.id === parseInt(this.id)) || booksData[0];
        }
    },
    methods: {
        /** Apre/chiude un assalto */
        toggleAssault(index) {
            this.openAssaultIndex = this.openAssaultIndex === index ? null : index;
        },
        /** Apre/chiude una guardia */
        toggleGuardia(id) {
            this.expandedGuardia = this.expandedGuardia === id ? null : id;
        }
    },
    watch: {
        id() {
            // Reset dello stato quando si naviga verso un altro libro.
            // (Lo scroll to top è ora gestito globalmente dal router)
            this.openAssaultIndex = null;
            this.expandedGuardia = null;
        }
    },
    template: `
        <div class="book-page">
            <header class="book-header">
                <h1 class="book-title">{{ book.title }}</h1>
                <p class="site-subtitle">{{ book.subtitle }}</p>
            </header>
            
            <ul class="weapon-list">
                <li v-for="weapon in book.weapons" :key="'w-'+weapon" class="weapon-tag">
                    <parsed-text :text="weapon"></parsed-text>
                </li>
            </ul>
            
            <ul class="weapon-list">
                <li v-for="game in book.games" :key="'g-'+game" class="weapon-tag game-tag">
                    <parsed-text :text="game"></parsed-text>
                </li>
            </ul>
            
            <div class="book-intro">
                <p><parsed-text :text="book.description"></parsed-text></p>
            </div>
            
            <!-- Guardie Dinamiche -->
            <div v-if="book.guardie && book.guardie.length > 0" class="timeline-container">
                <h3>Le Guardie</h3>
                <div v-for="guardia in book.guardie" :key="guardia.id" class="assault-item">
                    <div class="assault-header" @click="toggleGuardia(guardia.id)">
                        <span>{{ guardia.titolo }}</span>
                        <span class="accordion-toggle-label">
                            {{ expandedGuardia === guardia.id ? '▲ chiudi' : '▼ esplora' }}
                        </span>
                    </div>
                    <div v-show="expandedGuardia === guardia.id" class="assault-content">
                        <p>{{ guardia.descrizione }}</p>
                        
                        <div v-if="guardia.immagini && guardia.immagini.length > 0" class="guardia-images">
                            <img v-for="(src, i) in guardia.immagini" 
                                 :key="i" 
                                 :src="src" 
                                 :alt="guardia.titolo + ' ' + (i+1)" 
                                 :class="guardia.immagini.length === 1 ? 'guardia-image-single' : ''">
                        </div>
                    </div>
                </div>
            </div>

            <!-- Assalti Principali -->
            <div class="timeline-container" v-if="book.assaults && book.assaults.length > 0">
                <h3>Gli Assalti Principali</h3>
                <div v-for="(assault, index) in book.assaults" :key="index" class="assault-item">
                    <div class="assault-header" @click="toggleAssault(index)">
                        <span><parsed-text :text="assault.name"></parsed-text></span>
                        <span class="accordion-toggle-label">
                            {{ openAssaultIndex === index ? '▲ chiudi' : '▼ esplora' }}
                        </span>
                    </div>
                    <div v-show="openAssaultIndex === index" class="assault-content">
                        <parsed-text :text="assault.description"></parsed-text>
                    </div>
                </div>
            </div>
            
            <div v-if="book.technicalFocus" class="technical-focus">
                <h4><parsed-text :text="book.technicalFocus.title"></parsed-text></h4>
                <ul>
                    <li v-for="(point, i) in book.technicalFocus.points" :key="i">
                        <parsed-text :text="point"></parsed-text>
                    </li>
                </ul>
            </div>
        </div>
    `,
    components: {
        'parsed-text': ParsedText
    }
};
