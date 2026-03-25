// js/components/BookView.js
// Componente dinamico per la visualizzazione dei singoli libri

const BookView = {
    props: ['id'],
    data() {
        return {
            openAssaultIndex: null,
            expandedGuardia: null
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
            
            <!-- Guardie Dinamiche -->
            <div v-if="book.guardie && book.guardie.length > 0" class="timeline-container" style="margin-bottom: 0;">
                <h3>Le Guardie</h3>
                <div v-for="guardia in book.guardie" :key="guardia.id" class="assault-item">
                    <div class="assault-header" @click="toggleGuardia(guardia.id)">
                        <span>{{ guardia.titolo }}</span>
                        <span style="font-size: 0.8em; color: var(--color-gold);">
                            {{ expandedGuardia === guardia.id ? '\u25b2 chiudi' : '\u25bc esplora' }}
                        </span>
                    </div>
                    <div v-show="expandedGuardia === guardia.id" class="assault-content">
                        <p>{{ guardia.descrizione }}</p>
                        <div v-if="guardia.immagini && guardia.immagini.length > 0" style="display:flex; gap:1rem; flex-wrap:wrap; margin-top:1rem;">
                            <img v-for="(src, i) in guardia.immagini" :key="i" :src="src" :alt="guardia.titolo + ' ' + (i+1)" style="flex:1 1 45%; max-width:48%; height:auto; border-radius:4px; border:1px solid var(--color-border);">
                        </div>
                        <img v-else-if="guardia.immagine" :src="guardia.immagine" :alt="guardia.titolo" style="max-width:30%; height:auto; margin-top:1rem; border-radius:4px; border:1px solid var(--color-border);">
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
