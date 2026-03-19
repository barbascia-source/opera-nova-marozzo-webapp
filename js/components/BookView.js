// js/components/BookView.js
// Componente dinamico per la visualizzazione dei singoli libri

const BookView = {
    props: ['id'],
    data() {
        return {
            openAssaultIndex: null,
            expandedGuardia: null,
            guardie: [
                {
                    id: 1,
                    titolo: 'Cinghiara Porta di Ferro Stretta',
                    preview: 'Guardia bassa fondamentale della tradizione bolognese.',
                    descrizione: 'Lama verticale davanti al corpo, con punta rivolta al petto dell\u2019avversario. Posizione difensiva perfetta per nascondere le intenzioni e invitare l\u2019attacco in basso.',
                    immagine: 'public/cinghiara_porta_di_ferro_stretta.png'
                },
                {
                    id: 2,
                    titolo: 'cinghiara porta di ferro larga',
                    preview: 'WIP.',
                    descrizione: 'WIP.',
                    immagine: 'public/cinghiara_porta_di_ferro_larga.png'
                },
                {
                    id: 3,
                    titolo: 'guardia dintrare in largo passo',
                    preview: 'WIP.',
                    descrizione: 'WIP.',
                    immagine: 'public/guardia_dintrare_in_largo_passo.png'
                },
                {
                    id: 4,
                    titolo: 'porta di ferro stretta',
                    preview: 'WIP.',
                    descrizione: 'WIP.',
                    immagine: 'public/porta_di_ferro_stretta.png'
                },
                {
                    id: 5,
                    titolo: 'guardia di testa',
                    preview: 'WIP.',
                    descrizione: 'WIP.',
                    immagine: 'public/guardia_di_testa.png'
                },
                {
                    id: 6,
                    titolo: 'guardia di faccia',
                    preview: 'WIP.',
                    descrizione: 'WIP.',
                    immagine: 'public/guardia_di_testa.png'
                },
                {
                    id: 7,
                    titolo: 'varianti alte',
                    preview: 'WIP.',
                    descrizione: 'WIP.',
                    immagini: ['public/varianti_alte_1.png', 'public/varianti_alte_2.png']
                },
                {
                    id: 8,
                    titolo: 'varianti basse',
                    preview: 'WIP.',
                    descrizione: 'WIP.',
                    immagine: 'public/varianti_basse_1.png'
                },
            ]
        }
    },
    computed: {
        book() {
            return booksData.find(b => b.id === parseInt(this.id)) || booksData[0];
        }
    },
    methods: {
        toggleAssault(index) {
            this.openAssaultIndex = this.openAssaultIndex === index ? null : index;
        },
        toggleGuardia(id) {
            this.expandedGuardia = this.expandedGuardia === id ? null : id;
        }
    },
    watch: {
        id() {
            // Reset state when navigating to another book
            this.openAssaultIndex = null;
            this.expandedGuardia = null;
            window.scrollTo({ top: 0, behavior: 'smooth' });
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
            
            <ul class="weapon-list" style="margin-top:-1rem;">
                <li v-for="game in book.games" :key="'g-'+game" class="weapon-tag" style="background:var(--color-bg); border-color:var(--color-text); color:var(--color-text);">
                    <parsed-text :text="game"></parsed-text>
                </li>
            </ul>
            
            <div class="book-intro">
                <p><parsed-text :text="book.description"></parsed-text></p>
            </div>
            
            <!-- Guardie: sezione nuova, solo per Libro III -->
            <div v-if="book.id === 3" class="timeline-container" style="margin-bottom: 0;">
                <h3>Le Guardie Principali</h3>
                <div v-for="guardia in guardie" :key="guardia.id" class="assault-item">
                    <div class="assault-header" @click="toggleGuardia(guardia.id)">
                        <span>{{ guardia.titolo }}</span>
                        <span style="font-size: 0.8em; color: var(--color-gold);">
                            {{ expandedGuardia === guardia.id ? '\u25b2 chiudi' : '\u25bc esplora' }}
                        </span>
                    </div>
                    <div v-show="expandedGuardia === guardia.id" class="assault-content">
                        <p>{{ guardia.descrizione }}</p>
                        <div v-if="guardia.immagini" style="display:flex; gap:1rem; flex-wrap:wrap; margin-top:1rem;">
                            <img v-for="(src, i) in guardia.immagini" :key="i" :src="src" :alt="guardia.titolo + ' ' + (i+1)" style="flex:1 1 45%; max-width:48%; height:auto; border-radius:4px; border:1px solid var(--color-border);">
                        </div>
                        <img v-else :src="guardia.immagine" :alt="guardia.titolo" style="max-width:30%; height:auto; margin-top:1rem; border-radius:4px; border:1px solid var(--color-border);">
                    </div>
                </div>
            </div>
            
            <div class="timeline-container" v-if="book.assaults && book.assaults.length > 0">
                <h3>Gli Assalti Principali</h3>
                <div v-for="(assault, index) in book.assaults" :key="index" class="assault-item">
                    <div class="assault-header" @click="toggleAssault(index)">
                        <span><parsed-text :text="assault.name"></parsed-text></span>
                        <span style="font-size: 0.8em; color: var(--color-gold);">
                            {{ openAssaultIndex === index ? '\u25b2 chiudi' : '\u25bc esplora' }}
                        </span>
                    </div>
                    <!-- Transition per l'apertura -->
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
