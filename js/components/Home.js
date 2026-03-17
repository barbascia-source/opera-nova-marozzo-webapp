// js/components/Home.js
// Componente pagina iniziale

const Home = {
    template: `
        <div class="home-page">
            <div class="hero-section">
                <!-- A placeholder emblem/image with Renaissance feeling -->
                <div class="hero-image">
                    <img src="public/logo-codex-spadae.png" alt="Codex Spadae" style="width: 100%; height: auto; display: block;" />
                </div>
                <h2>Dell' Arte dell' Armi</h2>
                <p class="site-subtitle">Bologna, MDXXXVI</p>
            </div>
            
            <div class="bio-section">
                <p><span class="drop-cap">L</span>a Scherma Storica Europea, o <strong>HEMA</strong> (<em>Historical European Martial Arts</em>), è la ricostruzione metodica, l'addestramento e il combattimento basato sui trattati marziali giunti a noi dai maestri d'arme dal tardo Medioevo fino all'Età Moderna. Questa disciplina si discosta nettamente dalla scherma olimpica contemporanea, essendo incentrata sulla meccanica bellica realistica, sul pragmatismo da strada o da lizza e sull'uso di repliche storicamente accurate (spade da lato, brocchieri, spadoni a due mani, daghe).</p>
                <p>Nata come movimento di archeologia sperimentale, oggi la scherma storica HEMA è una fiorente arte marziale globale, che rigenera antichi sistemi di combattimento. L'intento di studiosi e atleti è tradurre antichi diagrammi e indicazioni pedagogiche dei maestri del Rinascimento, provandoli in palestra attraverso lo <em>sparring</em> a velocità reale con protezioni adeguate, ridando vita all'ingegno tattico dei grandi spadaccini europei del passato.</p>

                <div style="margin-top: 2rem; text-align: center; border-top: 1px dashed var(--color-gold); padding-top: 1.5rem;">
                    <router-link to="/libro/1" class="nav-link" style="display:inline-block; border: 2px solid var(--color-gold); padding: 0.8rem 2rem; color:var(--color-text); background-color:var(--color-bg-alt); margin-bottom: 1rem;">
                        &#9876; Esplora i Libri
                    </router-link>
                    <br>
                    <a href="https://www.arshistorica.it/" target="_blank" rel="noopener" style="font-size:0.9rem; text-decoration:underline;">
                        Sito Scherma Storica -> Arshistorica
                    </a>
                    <br>
                    <a href="https://www.amazon.it/%C2%ABOpera-nova%C2%BB-Antonio-Manciolino/dp/8884741769/ref=sr_1_2?crid=2RVA67HLMR94W&dib=eyJ2IjoiMSJ9.djzZ9pVdE3obswF_TPhLht_Xt6-Sy-gA5bR6lt_0qJUGgT80u4bSJVspjbKulkcOGUyZWgo-ATJwuYxP1aMxoBP34U73tJqV-U5xqfeGqGZkWWRltbDkfkv4Yf4H7zfE.vnAi34B3dD7xsYrscAUB0et4EsnInlbAsvlbuy0VCyM&dib_tag=se&keywords=opera+nova+achille+marozzo&qid=1773756524&sprefix=opera+nuova%2Caps%2C253&sr=8-2" target="_blank" rel="noopener" style="font-size:0.9rem; text-decoration:underline;">
                        Acquista l'Opera Nova su Amazon
                    </a>
                </div>
            </div>
        </div>
    `,
    components: {
        'parsed-text': ParsedText
    }
};
