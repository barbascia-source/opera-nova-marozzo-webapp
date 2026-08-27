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

    // Equipaggiamento (Sostituisce Basi, con alias per retrocompatibilità)
    {
        path: '/equipaggiamento',
        component: Equipaggiamento,
        props: route => ({ tab: route.query.tab || 'panoramica' })
    },
    { path: '/sds', redirect: '/equipaggiamento' },

    // Opera Nova (Hub centrale per trattato, passeggio, guardie, assalti, libri)
    {
        path: '/opera-nova',
        component: OperaNova,
        props: route => ({ tab: route.query.tab || 'trattato' })
    },
    { path: '/libri', redirect: '/opera-nova' },
    { path: '/passeggio', component: Passeggio },
    { path: '/libro/:id', component: BookView, props: true },

    // Strumenti (Lettore PDF e Installa l'app)
    {
        path: '/strumenti',
        component: Strumenti,
        props: route => ({ tab: route.query.tab || 'pdf' })
    },
    { path: '/lettura-pdf', component: LetturaPDF },

    // Fallback per rotte sconosciute -> Home
    { path: '/:pathMatch(.*)*', redirect: '/' }
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
                    <img 
                        src="public/logo-codex-spadae.png" 
                        alt="Codex Spadae Logo" 
                        class="logo-image" 
                        @click="handleLogoClick" 
                        style="cursor: pointer;"
                        tabindex="0"
                        @keydown.enter="handleLogoClick"
                    >
                </div>
                
                <nav class="main-nav" aria-label="Navigazione Principale Desktop">
                    <router-link to="/" class="nav-link">Home</router-link>
                    <router-link to="/biografia" class="nav-link">Biografia</router-link>
                    
                    <!-- Dropdown Equipaggiamento -->
                    <div 
                        class="dropdown-container" 
                        :class="{ 'is-open': openDropdown === 'equip' }" 
                        @click.stop="toggleDropdown('equip')"
                        @mouseenter="openDropdown = 'equip'"
                        @mouseleave="openDropdown = null"
                    >
                        <button 
                            class="dropdown-trigger" 
                            :class="{ active: isEquipActive }"
                            aria-haspopup="true"
                            :aria-expanded="openDropdown === 'equip' ? 'true' : 'false'"
                        >
                            Equipaggiamento &nbsp; &#9662;
                        </button>
                        <div class="dropdown-menu" role="menu">
                            <router-link to="/equipaggiamento?tab=panoramica" class="dropdown-item" @click="closeDropdown" role="menuitem">Panoramica</router-link>
                            <router-link to="/equipaggiamento?tab=armi" class="dropdown-item" @click="closeDropdown" role="menuitem">Armi & Anatomia</router-link>
                            <router-link to="/equipaggiamento?tab=protezioni" class="dropdown-item" @click="closeDropdown" role="menuitem">Protezioni</router-link>
                            <router-link to="/equipaggiamento?tab=manutenzione" class="dropdown-item" @click="closeDropdown" role="menuitem">Cura e Manutenzione</router-link>
                        </div>
                    </div>
                    
                    <!-- Dropdown Opera Nova -->
                    <div 
                        class="dropdown-container" 
                        :class="{ 'is-open': openDropdown === 'operanova' }" 
                        @click.stop="toggleDropdown('operanova')"
                        @mouseenter="openDropdown = 'operanova'"
                        @mouseleave="openDropdown = null"
                    >
                        <button 
                            class="dropdown-trigger" 
                            :class="{ active: isOperaNovaActive }"
                            aria-haspopup="true"
                            :aria-expanded="openDropdown === 'operanova' ? 'true' : 'false'"
                        >
                            Opera Nova &nbsp; &#9662;
                        </button>
                        <div class="dropdown-menu" role="menu">
                            <router-link to="/opera-nova?tab=trattato" class="dropdown-item" @click="closeDropdown" role="menuitem">Il Trattato</router-link>
                            <router-link to="/passeggio" class="dropdown-item" @click="closeDropdown" role="menuitem">Il Passeggio</router-link>
                            <router-link to="/opera-nova?tab=guardie" class="dropdown-item" @click="closeDropdown" role="menuitem">Guardie</router-link>
                            <router-link to="/opera-nova?tab=assalti" class="dropdown-item" @click="closeDropdown" role="menuitem">Assalti</router-link>
                            <div class="dropdown-divider" role="separator"></div>
                            <router-link to="/libro/1" class="dropdown-item" @click="closeDropdown" role="menuitem">Libro I: Spada + Brocchiere</router-link>
                            <router-link to="/libro/2" class="dropdown-item" @click="closeDropdown" role="menuitem">Libro II: Armi di filo</router-link>
                            <router-link to="/libro/3" class="dropdown-item" @click="closeDropdown" role="menuitem">Libro III: Due mani</router-link>
                            <router-link to="/libro/4" class="dropdown-item" @click="closeDropdown" role="menuitem">Libro IV: Pugnale + Asta</router-link>
                            <router-link to="/libro/5" class="dropdown-item" @click="closeDropdown" role="menuitem">Libro V: Duello</router-link>
                        </div>
                    </div>
                    
                    <!-- Dropdown Strumenti -->
                    <div 
                        class="dropdown-container" 
                        :class="{ 'is-open': openDropdown === 'strumenti' }" 
                        @click.stop="toggleDropdown('strumenti')"
                        @mouseenter="openDropdown = 'strumenti'"
                        @mouseleave="openDropdown = null"
                    >
                        <button 
                            class="dropdown-trigger" 
                            :class="{ active: isStrumentiActive }"
                            aria-haspopup="true"
                            :aria-expanded="openDropdown === 'strumenti' ? 'true' : 'false'"
                        >
                            Strumenti &nbsp; &#9662;
                        </button>
                        <div class="dropdown-menu" role="menu">
                            <router-link to="/lettura-pdf" class="dropdown-item" @click="closeDropdown" role="menuitem">Lettore PDF</router-link>
                            <router-link to="/strumenti?tab=install" class="dropdown-item" @click="closeDropdown" role="menuitem">Installa l'App</router-link>
                        </div>
                    </div>

                </nav>
            </header>
            
            <!-- Pannello Mobile Side Menu -->
            <transition name="slide-fade">
                <div 
                    class="mobile-menu-overlay" 
                    v-if="mobileMenuOpen" 
                    @click.self="closeMobileMenu"
                    role="dialog"
                    aria-modal="true"
                    aria-label="Menu Mobile"
                >
                    <div class="mobile-menu-panel">
                        <div class="mobile-menu-header">
                            <img src="public/logo-codex-spadae.png" alt="Codex Spadae" class="mobile-logo">
                            <button class="mobile-close-btn" @click="closeMobileMenu" aria-label="Chiudi menu">&times;</button>
                        </div>
                        
                        <nav class="mobile-nav" aria-label="Navigazione Mobile">
                            <router-link to="/" class="nav-link mobile-link" @click="closeMobileMenu">Home</router-link>
                            <router-link to="/biografia" class="nav-link mobile-link" @click="closeMobileMenu">Biografia</router-link>
                            
                            <!-- Accordion Equipaggiamento Mobile -->
                            <div class="mobile-dropdown-container">
                                <button 
                                    class="nav-link mobile-link mobile-accordion-trigger" 
                                    @click="toggleMobileSubmenu('equip')"
                                    :aria-expanded="mobileSubmenu === 'equip' ? 'true' : 'false'"
                                >
                                    <span>Equipaggiamento</span>
                                    <span :class="{'rotate-up': mobileSubmenu === 'equip'}">&#9662;</span>
                                </button>
                                <div class="mobile-submenu" v-show="mobileSubmenu === 'equip'">
                                    <router-link to="/equipaggiamento?tab=panoramica" class="dropdown-item mobile-subitem" @click="closeMobileMenu">Panoramica</router-link>
                                    <router-link to="/equipaggiamento?tab=armi" class="dropdown-item mobile-subitem" @click="closeMobileMenu">Armi & Anatomia</router-link>
                                    <router-link to="/equipaggiamento?tab=protezioni" class="dropdown-item mobile-subitem" @click="closeMobileMenu">Protezioni</router-link>
                                    <router-link to="/equipaggiamento?tab=manutenzione" class="dropdown-item mobile-subitem" @click="closeMobileMenu">Cura e Manutenzione</router-link>
                                </div>
                            </div>
                            
                            <!-- Accordion Opera Nova Mobile -->
                            <div class="mobile-dropdown-container">
                                <button 
                                    class="nav-link mobile-link mobile-accordion-trigger" 
                                    @click="toggleMobileSubmenu('operanova')"
                                    :aria-expanded="mobileSubmenu === 'operanova' ? 'true' : 'false'"
                                >
                                    <span>Opera Nova</span>
                                    <span :class="{'rotate-up': mobileSubmenu === 'operanova'}">&#9662;</span>
                                </button>
                                <div class="mobile-submenu" v-show="mobileSubmenu === 'operanova'">
                                    <router-link to="/opera-nova?tab=trattato" class="dropdown-item mobile-subitem" @click="closeMobileMenu">Il Trattato</router-link>
                                    <router-link to="/passeggio" class="dropdown-item mobile-subitem" @click="closeMobileMenu">Il Passeggio</router-link>
                                    <router-link to="/opera-nova?tab=guardie" class="dropdown-item mobile-subitem" @click="closeMobileMenu">Guardie</router-link>
                                    <router-link to="/opera-nova?tab=assalti" class="dropdown-item mobile-subitem" @click="closeMobileMenu">Assalti</router-link>
                                    <div class="mobile-subgroup-title">Libri dell'Opera Nova</div>
                                    <router-link to="/libro/1" class="dropdown-item mobile-subitem" @click="closeMobileMenu">Libro I: Spada + Brocchiere</router-link>
                                    <router-link to="/libro/2" class="dropdown-item mobile-subitem" @click="closeMobileMenu">Libro II: Armi di filo</router-link>
                                    <router-link to="/libro/3" class="dropdown-item mobile-subitem" @click="closeMobileMenu">Libro III: Due mani</router-link>
                                    <router-link to="/libro/4" class="dropdown-item mobile-subitem" @click="closeMobileMenu">Libro IV: Pugnale + Asta</router-link>
                                    <router-link to="/libro/5" class="dropdown-item mobile-subitem" @click="closeMobileMenu">Libro V: Duello</router-link>
                                </div>
                            </div>
                            
                            <!-- Accordion Strumenti Mobile -->
                            <div class="mobile-dropdown-container">
                                <button 
                                    class="nav-link mobile-link mobile-accordion-trigger" 
                                    @click="toggleMobileSubmenu('strumenti')"
                                    :aria-expanded="mobileSubmenu === 'strumenti' ? 'true' : 'false'"
                                >
                                    <span>Strumenti</span>
                                    <span :class="{'rotate-up': mobileSubmenu === 'strumenti'}">&#9662;</span>
                                </button>
                                <div class="mobile-submenu" v-show="mobileSubmenu === 'strumenti'">
                                    <router-link to="/lettura-pdf" class="dropdown-item mobile-subitem" @click="closeMobileMenu">Lettore PDF</router-link>
                                    <router-link to="/strumenti?tab=install" class="dropdown-item mobile-subitem" @click="closeMobileMenu">Installa l'App</router-link>
                                </div>
                            </div>
                            
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

            <!-- Popup Installazione PWA -->
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
            /** @type {string|null} Nome del sottomenu mobile aperto (apertura singola) */
            mobileSubmenu: null
        }
    },
    computed: {
        isEquipActive() {
            return this.$route.path.startsWith('/equipaggiamento') || this.$route.path === '/sds';
        },
        isOperaNovaActive() {
            return this.$route.path.startsWith('/opera-nova') ||
                this.$route.path === '/passeggio' ||
                this.$route.path.startsWith('/libro');
        },
        isStrumentiActive() {
            return this.$route.path.startsWith('/strumenti') || this.$route.path === '/lettura-pdf';
        }
    },
    created() {
        window.addEventListener('beforeinstallprompt', (e) => {
            e.preventDefault();
            this.deferredPrompt = e;
        });
        window.addEventListener('appinstalled', () => {
            this.deferredPrompt = null;
            console.log('PWA installed successfully');
        });
    },
    methods: {
        /** Su mobile il logo apre/chiude il menu; su desktop naviga alla home */
        handleLogoClick() {
            if (window.innerWidth <= 768) {
                this.toggleMobileMenu();
            } else {
                this.$router.push('/');
            }
        },
        /** Toggle del menu mobile con gestione scroll del body */
        toggleMobileMenu() {
            this.mobileMenuOpen = !this.mobileMenuOpen;
            if (!this.mobileMenuOpen) {
                this.mobileSubmenu = null;
                document.body.classList.remove('body-scroll-lock');
            } else {
                document.body.classList.add('body-scroll-lock');
            }
        },
        /** Chiude il menu mobile e ripristina lo scroll */
        closeMobileMenu() {
            this.mobileMenuOpen = false;
            this.mobileSubmenu = null;
            document.body.classList.remove('body-scroll-lock');
        },
        /** Apre/chiude un sottomenu nel pannello mobile (fisarmonica a sezione singola) */
        toggleMobileSubmenu(name) {
            this.mobileSubmenu = this.mobileSubmenu === name ? null : name;
        },
        /** Gestisce il flusso di installazione PWA */
        installApp() {
            if (isInStandaloneMode()) {
                alert("L'app è già installata sul tuo dispositivo.");
                return;
            }

            if (this.deferredPrompt || (isIos() && !isInStandaloneMode())) {
                this.showInstallPopup = true;
            } else {
                alert("L'installazione automatica non è supportata dal tuo browser. Cerca l'opzione 'Installa app' o 'Aggiungi a schermata Home' nel menu del tuo browser.");
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
                console.log(outcome === 'accepted' ? 'User accepted install' : 'User dismissed install');
                this.deferredPrompt = null;
            } else if (isIos() && !isInStandaloneMode()) {
                alert("Per installare l'app su iOS: tocca il pulsante Condividi nel browser Safari (icona col quadrato e freccia in alto) e seleziona 'Aggiungi alla schermata Home'.");
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
        },
        /** Listener tastiera per chiudere menu mobile/dropdown con Escape */
        handleKeyDown(e) {
            if (e.key === 'Escape') {
                if (this.mobileMenuOpen) {
                    this.closeMobileMenu();
                }
                if (this.openDropdown) {
                    this.closeDropdown();
                }
            }
        }
    },
    mounted() {
        window.addEventListener('scroll', this.handleScroll);
        document.addEventListener('click', this.handleOutsideClick);
        window.addEventListener('keydown', this.handleKeyDown);
    },
    unmounted() {
        window.removeEventListener('scroll', this.handleScroll);
        document.removeEventListener('click', this.handleOutsideClick);
        window.removeEventListener('keydown', this.handleKeyDown);
        document.body.classList.remove('body-scroll-lock');
    }
};

// ---- Inizializzazione e montaggio ----
const app = Vue.createApp(App);
app.use(router);
app.mount('#app');
