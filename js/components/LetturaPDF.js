// js/components/LetturaPDF.js

const LetturaPDF = {
    template: `
        <div class="pdf-page-wrapper">
            <header class="book-header">
                <h1 class="book-title">Lettura del tuo PDF</h1>
                <p class="site-subtitle">Carica un file PDF locale per consultarlo all'interno dell'app</p>
            </header>
            
            <div class="pdf-upload-section" style="margin-bottom: 2rem; text-align: center;">
                <label for="pdf-upload" class="btn btn-primary" style="cursor:pointer; display:inline-block; font-size: 1.1rem; padding: 0.8rem 2rem;">
                    Scegli il tuo PDF
                </label>
                <input id="pdf-upload" type="file" accept="application/pdf" @change="onFileChange" style="display: none;">
                
                <p v-if="!pdfUrl" style="font-size: 0.95rem; color: var(--color-gold); margin-top: 1rem;">
                    Nessun file selezionato.<br>Il file non viene inviato a nessun server, resta sul tuo dispositivo.
                </p>
                <p v-if="errorMsg" style="color: var(--color-accent); font-weight: bold; margin-top: 0.5rem;">
                    {{ errorMsg }}
                </p>
            </div>

            <div v-if="pdfUrl" class="pdf-viewer-container" style="padding: 0; overflow: hidden; border-radius: 4px;">
                <div style="padding: 1rem; text-align: center; border-bottom: 1px dashed var(--color-border); background-color: var(--color-bg-alt);">
                    <p style="margin: 0; font-family: var(--font-heading); color: var(--color-gold);">Stai leggendo: <strong>{{ fileName }}</strong></p>
                </div>
                
                <object :data="pdfUrl" type="application/pdf" width="100%" height="800" style="display: block;">
                    <iframe :src="pdfUrl" width="100%" height="800" style="border: none; display: block;">
                        <p>Il tuo browser non supporta la visualizzazione diretta dei PDF. <a :href="pdfUrl" target="_blank">Scarica il file PDF.</a></p>
                    </iframe>
                </object>
            </div>
        </div>
    `,
    data() {
        return {
            pdfUrl: null,
            fileName: '',
            errorMsg: ''
        }
    },
    methods: {
        onFileChange(event) {
            this.errorMsg = '';
            const file = event.target.files[0];
            
            if (!file) {
                return;
            }
            
            if (file.type !== 'application/pdf') {
                this.errorMsg = 'Il file selezionato non è un PDF valido.';
                return;
            }

            // Pulizia URL se esistente
            if (this.pdfUrl) {
                URL.revokeObjectURL(this.pdfUrl);
            }
            
            // Creazione Blob URL per il rendering nativo
            this.pdfUrl = URL.createObjectURL(file);
            this.fileName = file.name;
        }
    },
    beforeUnmount() {
        // Pulizia per evitare battery/memory drain se il componente viene dismesso
        if (this.pdfUrl) {
            URL.revokeObjectURL(this.pdfUrl);
        }
    }
};
