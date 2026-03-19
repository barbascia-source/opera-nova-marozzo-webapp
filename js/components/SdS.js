// js/components/SdS.js
// Componente pagina SdS

const SdS = {
    template: `
        <div class="bio-page">
            <header class="book-header">
                <h1 class="book-title">Basi</h1>
                <p class="site-subtitle">Fondamenti della scherma storica</p>
            </header>
            
            <div class="bio-section">
                <h3>Struttura della Spada</h3>
                <p>
                    La Spada di divide in 2 parti <strong>Lama</strong> ed <strong>Elsa</strong>, che a sua volta si suddivide in <strong>Croce di Guardia</strong>, <strong>Manico</strong> e <strong>Pomolo</strong>.
                </p>
                <p>
                    <strong>La Lama</strong>
                    <br>
                    La lama è strutturata in tre parti, la parte della punta chiamata Debole, la zone centrale Medio e infine, vicino alla croce di guardia Forte.
                    Il Debole viene utilizzato per offendere sia con attacchi di Punta sia con attacchi di taglio, il Debole per gli incroci e il Forte per le parate.
                    <br><br>
                    <strong>La croce di guardia</strong>
                    <br>
                    Struttura designata alla protezione nella mano dominante e del polso, nella spada da lato si è arricchita di anelli e ponticelli per proteggere l'indice.
                    <br><br>
                    <strong>Il Manico</strong>
                    <br>
                    è la parte dell'Elsa dove di impugna la spana, la mano dominante sta nella zona direttamente sotto alla croce di guardia.
                    <br><br>
                    <strong>Il Pomolo</strong>
                    <br>
                    Parte finale della spada, fondamentale per il bilanciamento, nella Spada a due mani si impugna con la mano secondaria si utilizza come Leva per guidare la spada.
                </p>
                
                <figure style="text-align: center; margin: 2rem 0;">
                    <img src="public/spada.png" alt="Schema della spada" style="max-width: 100%; height: auto; border: 1px solid var(--color-border); border-radius: 4px;">
                    <figcaption style="font-size: 0.9em; font-style: italic; color: var(--color-text-light); margin-top: 0.5rem;">Esempio di Feder (Spada a due mani)</figcaption>
                </figure>
            </div>
        </div>
    `
};
