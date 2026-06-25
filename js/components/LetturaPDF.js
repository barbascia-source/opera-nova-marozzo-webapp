// js/components/LetturaPDF.js
/**
 * Componente per la visualizzazione di PDF locali caricati dall'utente.
 */
const LetturaPDF = {
    name: 'LetturaPDF',
    data() {
        return {
            /** @type {string|null} URL del blob per il file caricato */
            pdfUrl: null,
            /** @type {string} Nome del file originale */
            fileName: '',
            /** @type {string} Messaggio di errore se il file non è supportato */
            errorMsg: ''
        }
    },
    methods: {
        /** Gestisce l'upload del file PDF */
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
    },
    template: `
        <div class="pdf-page-wrapper">
            <header class="book-header">
                <h1 class="book-title">Lettura del tuo PDF</h1>
                <p class="site-subtitle">Carica un file PDF locale per consultarlo all'interno dell'app</p>
            </header>
            
            <div class="pdf-upload-section">
                <label for="pdf-upload" class="btn btn-primary pdf-upload-label">
                    Scegli il tuo PDF
                </label>
                <input id="pdf-upload" type="file" accept="application/pdf" @change="onFileChange" style="display: none;">
                
                <p v-if="!pdfUrl" class="pdf-info-text">
                    Nessun file selezionato.<br>Il file non viene inviato a nessun server, resta sul tuo dispositivo.
                </p>
                <p v-if="errorMsg" class="pdf-error-text">
                    {{ errorMsg }}
                </p>
            </div>

            <div v-if="pdfUrl" class="pdf-viewer-container">
                <div class="pdf-file-header">
                    <p class="pdf-file-name">Stai leggendo: <strong>{{ fileName }}</strong></p>
                </div>
                
                <object :data="pdfUrl" type="application/pdf" width="100%" height="800" style="display: block;">
                    <iframe :src="pdfUrl" width="100%" height="800" style="border: none; display: block;">
                        <p>Il tuo browser non supporta la visualizzazione diretta dei PDF. <a :href="pdfUrl" target="_blank">Scarica il file PDF.</a></p>
                    </iframe>
                </object>
            </div>
        </div>
    `
};
