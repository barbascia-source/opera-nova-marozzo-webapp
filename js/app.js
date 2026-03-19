// js/app.js
// Entry point dell'applicazione Vue

const routes = [
    { path: '/', component: Home },
    { path: '/biografia', component: Biografia },
    { path: '/sds', component: SdS },
    { path: '/passeggio', component: Passeggio },
    { path: '/libro/:id', component: BookView, props: true }
];

// 2. Creazione dell'istanza del router
const router = VueRouter.createRouter({
    // Utilizziamo WebHashHistory in modo che funzioni perfettamente anche aprendo il file HTML localmente
    history: VueRouter.createWebHashHistory(),
    routes
});

// 3. Definizione del componente Root
const App = {
    template: `
        <div class="app-container">
            <header class="site-header">
                <div class="logo-container">
                    <img src="public/logo-codex-spadae.png" alt="Codex Spadae Logo" class="logo-image">
                </div>
                
                <nav class="main-nav">
                    <router-link to="/" class="nav-link">Home</router-link>
                    <router-link to="/biografia" class="nav-link">Biografia</router-link>
                    
                    <div class="dropdown-container">
                        <span class="nav-link">Basi &nbsp; &#9662;</span>
                        <div class="dropdown-menu">
                            <router-link to="/sds" class="dropdown-item">Struttura della spada</router-link>
                            <router-link to="/passeggio" class="dropdown-item">Passeggio</router-link>
                        </div>
                    </div>
                    
                    <div class="dropdown-container">
                        <span class="nav-link">Libri &nbsp; &#9662;</span>
                        <div class="dropdown-menu">
                            <router-link to="/libro/1" class="dropdown-item">I: Spada + Brocchiere</router-link>
                            <router-link to="/libro/2" class="dropdown-item">II: Armi filo</router-link>
                            <router-link to="/libro/3" class="dropdown-item">III: Due mani</router-link>
                            <router-link to="/libro/4" class="dropdown-item">IV: Pugnale + Asta</router-link>
                            <router-link to="/libro/5" class="dropdown-item">V: Duello</router-link>
                        </div>
                    </div>
                </nav>
            </header>
            
            <main class="site-main">
                <router-view></router-view>
            </main>
            
            <button @click="scrollToTop" class="scroll-to-top" :class="{ 'show': showScrollBtn }" aria-label="Torna in cima">
                &#8593;
            </button>
            
            <footer class="site-footer">
                <p>Codex Spadae &bull; Ricostruzione marziale dell'Opera Nova (1536)</p>
                <p style="font-size: 0.8em; margin-top: 0.5rem; color: var(--color-border); opacity: 0.7;">
                    Sviluppato con Vanilla CSS & Vue 3 
                </p>
            </footer>
        </div>
    `,
    data() {
        return {
            books: booksData,
            showScrollBtn: false
        }
    },
    methods: {
        handleScroll() {
            this.showScrollBtn = window.scrollY > 300;
        },
        scrollToTop() {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    },
    mounted() {
        window.addEventListener('scroll', this.handleScroll);
    },
    unmounted() {
        window.removeEventListener('scroll', this.handleScroll);
    }
};

// 4. Inizializzazione e montaggio
const app = Vue.createApp(App);

// Registriamo il componente ParsedText globalmente (opzionale, ma lo abbiamo già nei components locals)
// app.component('parsed-text', ParsedText);

app.use(router);
app.mount('#app');
