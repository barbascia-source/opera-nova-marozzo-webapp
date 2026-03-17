// js/app.js
// Entry point dell'applicazione Vue

// 1. Configurazione delle rotte
const routes = [
    { path: '/', component: Home },
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
                <h1 class="site-title">Opera Nova</h1>
                <p class="site-subtitle">Achille Marozzo, Maestro Bolognese (1536)</p>
            </header>
            
            <nav class="main-nav">
                <router-link to="/" class="nav-link">Introduzione</router-link>
                <router-link v-for="book in books" :key="book.id" :to="'/libro/' + book.id" class="nav-link">
                    {{ book.title }}
                </router-link>
            </nav>
            
            <main class="site-main">
                <router-view></router-view>
            </main>
            
            <footer class="site-footer">
                <p>Ricostruzione interattiva dell'Opera Nova &bull; Scuola Bolognese</p>
                <p style="font-size: 0.8em; margin-top: 0.5rem; color: var(--color-text); opacity: 0.7;">
                    Sviluppato con Vanilla CSS & Vue 3 
                </p>
            </footer>
        </div>
    `,
    data() {
        return {
            books: booksData
        }
    }
};

// 4. Inizializzazione e montaggio
const app = Vue.createApp(App);

// Registriamo il componente ParsedText globalmente (opzionale, ma lo abbiamo già nei components locals)
// app.component('parsed-text', ParsedText);

app.use(router);
app.mount('#app');
