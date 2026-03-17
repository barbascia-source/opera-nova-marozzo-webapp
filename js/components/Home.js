// js/components/Home.js
// Componente pagina iniziale

const Home = {
    template: `
        <div class="home-page">
            <div class="hero-section">
                <!-- A placeholder emblem/image with Renaissance feeling -->
                <div class="hero-image">
                    <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
                        <circle cx="50" cy="50" r="48" fill="none" stroke="var(--color-gold)" stroke-width="2"/>
                        <circle cx="50" cy="50" r="42" fill="none" stroke="var(--color-accent)" stroke-width="1"/>
                        <path d="M50 15 L80 85 L20 85 Z" fill="none" stroke="var(--color-text)" stroke-width="1.5"/>
                        <path d="M50 85 L20 15 L80 15 Z" fill="none" stroke="var(--color-text)" stroke-width="1.5"/>
                        <circle cx="50" cy="50" r="15" fill="var(--color-bg)" stroke="var(--color-gold)"/>
                        <text x="50" y="55" font-family="var(--font-heading)" font-size="20" text-anchor="middle" fill="var(--color-accent)">AM</text>
                    </svg>
                </div>
                <h2>Dell'Arte dell'Armi</h2>
                <p class="site-subtitle">Bologna, MDXXXVI</p>
            </div>
            
            <div class="bio-section">
                <p><span class="drop-cap">A</span>chille Marozzo (1484–1553) fu un celebre mastro di scherma bolognese, allievo del rinomato Guido Antonio de Luca. La sua opera maggiore, l'<em>Opera Nova Chiamata Duello, O Vero Fiore dell'Armi de Singulari Abattimenti Offensivi, & Diffensivi</em>, pubblicata a Modena nel 1536, è considerata il più importante trattato di scherma italiana del XVI secolo.</p>
                <p>Oltre a codificare le tecniche della scuola bolognese, l'<parsed-text text="Opera Nova"></parsed-text> rappresenta una transizione cruciale tra gli stili medievali (che prediligevano armi come la spada a due mani e lo scudo) e la scherma moderna, la quale si andava focalizzando sempre più sull'uso della spada da lato da sola o accompagnata da un brocchiere o da un pugnale.</p>
                <p>Il trattato è diviso in cinque libri, ciascuno dedicato a specifiche armi o contesti, culminando con le norme legali e cerimoniali del duello d'onore. Questa applicazione interattiva ti permetterà di esplorare i precetti, gli assalti e le intuizioni tecniche del maestro, avvalendoti di un glossario dinamico per i termini specialistici.</p>
            </div>
        </div>
    `,
    components: {
        'parsed-text': ParsedText
    }
};
