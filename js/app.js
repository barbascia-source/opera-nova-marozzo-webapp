// js/app.js
/**
 * Entry point dell'applicazione Vue — Codex Spadae.
 * Configura il router, il componente root App, e monta l'istanza Vue.
 */

// ---- Utility globali PWA ----

/** Rileva se il dispositivo è iOS */
function isIos() {
    return /iphone|ipad|ipod/.test(window.navigator.userAgent.toLowerCase());
}

/** Rileva se l'app è già in modalità standalone (installata) */
function isInStandaloneMode() {
    return ('standalone' in window.navigator && window.navigator.standalone) ||
        window.matchMedia('(display-mode: standalone)').matches;
}

// ---- Router ----

const routes = [
    { path: '/', component: Home },
    { path: '/biografia', component: Biografia },
    { path: '/sds', component: SdS },
    { path: '/passeggio', component: Passeggio },
    { path: '/libro/:id', component: BookView, props: true },
    { path: '/lettura-pdf', component: LetturaPDF }
];

const router = VueRouter.createRouter({
    history: VueRouter.createWebHashHistory(),
    routes,
    /** Scroll-to-top automatico su ogni navigazione */
    scrollBehavior(to, from, savedPosition) {
        if (savedPosition) {
            return savedPosition;
        }
        return { top: 0, behavior: 'smooth' };
    }
});

// ---- Componente Root ----

const App = {
    name: 'App',
    template: `
        <div class="app-container">
            <header class="site-header">
                <div class="logo-container">
                    <img src="public/logo-codex-spadae.png" alt="Codex Spadae Logo" class="logo-image" @click="handleLogoClick" style="cursor: pointer;">
                </div>
                
                <nav class="main-nav">
                    <router-link to="/" class="nav-link">Home</router-link>
                    <router-link to="/biografia" class="nav-link">Biografia</router-link>
                    
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
                    
                    <router-link to="/lettura-pdf" class="nav-link">Lettura Libro</router-link>
                    
                    <button class="nav-link install-btn" @click="installApp">Installa App</button>
                </nav>
            </header>
            
            <!-- Pannello Mobile -->
            <transition name="slide-fade">
                <div class="mobile-menu-overlay" v-if="mobileMenuOpen" @click.self="closeMobileMenu">
                    <div class="mobile-menu-panel">
                        <button class="mobile-close-btn" @click="closeMobileMenu">&times;</button>
                        <nav class="mobile-nav">
                            <router-link to="/" class="nav-link mobile-link" @click="closeMobileMenu">Home</router-link>
                            <router-link to="/biografia" class="nav-link mobile-link" @click="closeMobileMenu">Biografia</router-link>
                            
                            <div class="mobile-dropdown-container">
                                <div class="nav-link mobile-link" @click="toggleMobileSubmenu('basi')">Basi &nbsp; <span :class="{'rotate-up': mobileSubmenu === 'basi'}">&#9662;</span></div>
                                <div class="mobile-submenu" v-show="mobileSubmenu === 'basi'">
                                    <router-link to="/sds" class="dropdown-item mobile-subitem" @click="closeMobileMenu">Struttura della spada</router-link>
                                    <router-link to="/passeggio" class="dropdown-item mobile-subitem" @click="closeMobileMenu">Passeggio</router-link>
                                </div>
                            </div>
                            
                            <div class="mobile-dropdown-container">
                                <div class="nav-link mobile-link" @click="toggleMobileSubmenu('libri')">Libri &nbsp; <span :class="{'rotate-up': mobileSubmenu === 'libri'}">&#9662;</span></div>
                                <div class="mobile-submenu" v-show="mobileSubmenu === 'libri'">
                                    <router-link to="/libro/1" class="dropdown-item mobile-subitem" @click="closeMobileMenu">I: Spada + Brocchiere</router-link>
                                    <router-link to="/libro/2" class="dropdown-item mobile-subitem" @click="closeMobileMenu">II: Armi filo</router-link>
                                    <router-link to="/libro/3" class="dropdown-item mobile-subitem" @click="closeMobileMenu">III: Due mani</router-link>
                                    <router-link to="/libro/4" class="dropdown-item mobile-subitem" @click="closeMobileMenu">IV: Pugnale + Asta</router-link>
                                    <router-link to="/libro/5" class="dropdown-item mobile-subitem" @click="closeMobileMenu">V: Duello</router-link>
                                </div>
                            </div>
                            
                            <router-link to="/lettura-pdf" class="nav-link mobile-link" @click="closeMobileMenu">Lettura Libro</router-link>
                            
                            <button class="nav-link mobile-link install-btn" @click="installApp">Installa App</button>
                        </nav>
                    </div>
                </div>
            </transition>
            
            <main class="site-main">
                <router-view></router-view>
            </main>
            
            <button @click="scrollToTop" class="scroll-to-top" :class="{ 'show': showScrollBtn }" aria-label="Torna in cima">
                &#8593;
            </button>
            
            <footer class="site-footer">
                <p>Codex Spadae &bull; Ricostruzione marziale dell'Opera Nova (1536)</p>
                <p class="footer-credits">
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
            /** @type {Array} Dati dei libri importati da books.js */
            books: booksData,
            /** @type {boolean} Mostra/nascondi il pulsante scroll-to-top */
            showScrollBtn: false,
            /** @type {string|null} Nome del dropdown attualmente aperto (desktop) */
            openDropdown: null,
            /** @type {BeforeInstallPromptEvent|null} Evento PWA per l'installazione */
            deferredPrompt: null,
            /** @type {boolean} Mostra/nascondi il popup di installazione */
            showInstallPopup: false,
            /** @type {boolean} Stato del menu mobile */
            mobileMenuOpen: false,
            /** @type {string|null} Nome del submenu mobile aperto */
            mobileSubmenu: null
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
        /** Su mobile il logo apre il menu; su desktop naviga alla home */
        handleLogoClick() {
            if (window.innerWidth <= 768) {
                this.toggleMobileMenu();
            } else {
                this.$router.push('/');
            }
        },
        /** Toggle del menu mobile */
        toggleMobileMenu() {
            this.mobileMenuOpen = !this.mobileMenuOpen;
            if (!this.mobileMenuOpen) {
                this.mobileSubmenu = null;
            }
        },
        /** Chiude il menu mobile */
        closeMobileMenu() {
            this.mobileMenuOpen = false;
            this.mobileSubmenu = null;
        },
        /** Apre/chiude un submenu nel pannello mobile */
        toggleMobileSubmenu(name) {
            this.mobileSubmenu = this.mobileSubmenu === name ? null : name;
        },
        /** Gestisce il flusso di installazione PWA */
        installApp() {
            if (isInStandaloneMode()) {
                alert("L'app è già installata.");
                return;
            }

            if (this.deferredPrompt || (isIos() && !isInStandaloneMode())) {
                this.showInstallPopup = true;
            } else {
                alert("L'installazione automatica non è supportata dal tuo browser. Cerca l'opzione 'Installa app' o 'Aggiungi a schermata Home' nel menu del browser.");
            }
        },
        /** Annulla l'installazione */
        cancelInstall() {
            this.showInstallPopup = false;
        },
        /** Conferma e avvia l'installazione PWA */
        async confirmInstall() {
            this.showInstallPopup = false;

            if (this.deferredPrompt) {
                this.deferredPrompt.prompt();
                const { outcome } = await this.deferredPrompt.userChoice;
                console.log(outcome === 'accepted' ? 'User accepted the install prompt' : 'User dismissed the install prompt');
                this.deferredPrompt = null;
            } else if (isIos() && !isInStandaloneMode()) {
                alert("Per installare l'app su iOS: tocca il pulsante Condividi (icona col quadrato e freccia verso l'alto) e seleziona 'Aggiungi alla schermata Home'.");
            }
        },
        /** Listener scroll per mostrare/nascondere il pulsante scroll-to-top */
        handleScroll() {
            this.showScrollBtn = window.scrollY > 300;
        },
        /** Scrolla dolcemente alla cima della pagina */
        scrollToTop() {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        },
        /** Toggle dropdown desktop */
        toggleDropdown(name) {
            this.openDropdown = this.openDropdown === name ? null : name;
        },
        /** Chiude dropdown desktop */
        closeDropdown() {
            this.openDropdown = null;
        },
        /** Chiude dropdown quando si clicca fuori */
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

// ---- Inizializzazione e montaggio ----
const app = Vue.createApp(App);
app.use(router);
app.mount('#app');
