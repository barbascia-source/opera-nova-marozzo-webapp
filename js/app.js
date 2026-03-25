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
                    <router-link to="/" class="nav-link" style="font-family:'IM Fell English',serif; font-weight:600; color: var(--color-gold);">Home</router-link>
                    <router-link to="/biografia" class="nav-link" style="font-family:'IM Fell English',serif; font-weight:600; color: var(--color-gold);">Biografia</router-link>
                    
                    <div class="dropdown-container" :class="{ 'is-open': openDropdown === 'basi' }" @click.stop="toggleDropdown('basi')">
                         <button class="dropdown-trigger" :class="{ active: $route.path === '/sds' || $route.path === '/passeggio' }">Basi &nbsp; &#9662;</button>
                        <div class="dropdown-menu">
                            <router-link to="/sds" class="dropdown-item" @click="closeDropdown">Struttura della spada</router-link>
                            <router-link to="/passeggio" class="dropdown-item" @click="closeDropdown">Passeggio</router-link>
                        </div>
                    </div>
                    
                    <div class="dropdown-container" :class="{ 'is-open': openDropdown === 'libri' }" @click.stop="toggleDropdown('libri')">
                        <span class="dropdown-trigger" :class="{ active: $route.path.startsWith('/libro') }">Libri &nbsp; &#9662;</span>
                        <div class="dropdown-menu">
                            <router-link to="/libro/1" class="dropdown-item" @click="closeDropdown">I: Spada + Brocchiere</router-link>
                            <router-link to="/libro/2" class="dropdown-item" @click="closeDropdown">II: Armi filo</router-link>
                            <router-link to="/libro/3" class="dropdown-item" @click="closeDropdown">III: Due mani</router-link>
                            <router-link to="/libro/4" class="dropdown-item" @click="closeDropdown">IV: Pugnale + Asta</router-link>
                            <router-link to="/libro/5" class="dropdown-item" @click="closeDropdown">V: Duello</router-link>
                        </div>
                    </div>
                    
                    <button class="nav-link install-btn" @click="installApp"style="background:none; border:none; cursor:pointer; font-family:'IM Fell English',serif; font-weight:600; color: var(--color-gold);">Installa App</button>
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

            <!-- Popup Installazione -->
            <div class="modal-overlay" v-if="showInstallPopup" @click.self="cancelInstall">
                <div class="modal-content">
                    <h3>Installazione App</h3>
                    <p>Vuoi scaricare e installare Codex Spadae sul tuo dispositivo per usarlo offline?</p>
                    <div class="modal-actions">
                        <button class="btn btn-secondary" @click="cancelInstall">No</button>
                        <button class="btn btn-primary" @click="confirmInstall">Sì</button>
                    </div>
                </div>
            </div>
        </div>
    `,
    data() {
        return {
            books: booksData,
            showScrollBtn: false,
            openDropdown: null,
            deferredPrompt: null,
            showInstallPopup: false
        }
    },
    created() {
        window.addEventListener('beforeinstallprompt', (e) => {
            e.preventDefault();
            this.deferredPrompt = e;
        });
        window.addEventListener('appinstalled', () => {
            this.deferredPrompt = null;
            console.log('PWA was installed');
        });
    },
    methods: {
        installApp() {
            const isIos = () => {
                const userAgent = window.navigator.userAgent.toLowerCase();
                return /iphone|ipad|ipod/.test(userAgent);
            }
            const isInStandaloneMode = () => ('standalone' in window.navigator) && (window.navigator.standalone);

            if (isInStandaloneMode() || window.matchMedia('(display-mode: standalone)').matches) {
                alert("L'app è già installata.");
                return;
            }

            if (this.deferredPrompt || (isIos() && !isInStandaloneMode())) {
                this.showInstallPopup = true;
            } else {
                alert("L'installazione automatica non è supportata dal tuo browser. Cerca l'opzione 'Installa app' o 'Aggiungi a schermata Home' nel menu del browser.");
            }
        },
        cancelInstall() {
            this.showInstallPopup = false;
        },
        async confirmInstall() {
            this.showInstallPopup = false;

            if (this.deferredPrompt) {
                this.deferredPrompt.prompt();
                const { outcome } = await this.deferredPrompt.userChoice;
                if (outcome === 'accepted') {
                    console.log('User accepted the install prompt');
                } else {
                    console.log('User dismissed the install prompt');
                }
                this.deferredPrompt = null;
            } else {
                const isIos = () => {
                    const userAgent = window.navigator.userAgent.toLowerCase();
                    return /iphone|ipad|ipod/.test(userAgent);
                }
                const isInStandaloneMode = () => ('standalone' in window.navigator) && (window.navigator.standalone);

                if (isIos() && !isInStandaloneMode()) {
                    alert("Per installare l'app su iOS: tocca il pulsante Condividi (icona col quadrato e freccia verso l'alto) e seleziona 'Aggiungi alla schermata Home'.");
                }
            }
        },
        handleScroll() {
            this.showScrollBtn = window.scrollY > 300;
        },
        scrollToTop() {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        },
        toggleDropdown(name) {
            this.openDropdown = this.openDropdown === name ? null : name;
        },
        closeDropdown() {
            this.openDropdown = null;
        },
        handleOutsideClick() {
            this.openDropdown = null;
        }
    },
    mounted() {
        window.addEventListener('scroll', this.handleScroll);
        document.addEventListener('click', this.handleOutsideClick);
    },
    unmounted() {
        window.removeEventListener('scroll', this.handleScroll);
        document.removeEventListener('click', this.handleOutsideClick);
    }
};

// 4. Inizializzazione e montaggio
const app = Vue.createApp(App);

// Registriamo il componente ParsedText globalmente (opzionale, ma lo abbiamo già nei components locals)
// app.component('parsed-text', ParsedText);

app.use(router);
app.mount('#app');
