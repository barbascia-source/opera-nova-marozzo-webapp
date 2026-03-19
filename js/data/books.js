// js/data/books.js
// Contengono le informazioni per i singoli libri

const booksData = [
    {
        id: 1,
        title: "Libro Primo",
        subtitle: "L'Arte della Spada e del Brocchiere Piccolo",
        description: "Il Libro Primo costituisce l'introduzione teorica e pratica all'arte cavalleresca secondo la disciplina bolognese. Marozzo apre il suo trattato delineando il ruolo sacro e didattico del maestro d'armi, e impartisce regole fondamentali su come avanzare, ritirarsi e mantenere l'equilibrio (i 'passi'). In questa sezione vengono dettagliati i primi fondamentali e complessi 'assalti' usando la spada a una mano accompagnata dal brocchiere piccolo.",
        weapons: ["Spada sola", "Spada e Brocchiere piccolo"],
        games: ["Gioco Largo", "Gioco Stretto", "Mezza Spada"],
        assaults: [
            {
                name: "Primo Assalto",
                description: "Familiarizzazione con le guardie principali. Il praticante esegue movimenti fluidi per passare da Coda Lunga e Alta a Porta di Ferro usando colpi come il fendente mandritto."
            },
            {
                name: "Secondo Assalto",
                description: "Progressione verso l'uso di risposte in tempo. Si enfatizza il passo obliquo e l'uso del falso dritto per deviare l'attacco avversario, entrando in gioco stretto."
            },
            {
                name: "Terzo Assalto",
                description: "Tecniche avanzate a chiusura di misura. Si entra a mezza spada e si studia come intrappolare o deviare la lama nemica con l'umbone del brocchiere, seguendo con prese."
            }
        ],
        technicalFocus: {
            title: "Il Ruolo del Brocchiere",
            points: [
                "Protezione attiva: il brocchiere non sta ad aspettare, ma avanza per incrociare il colpo avversario.",
                "Raccordo con la lama: le mani lavorano assieme, spada e brocchiere si uniscono in guardia (es. Guardia d'Alicorno).",
                "Uso in gioco stretto: blocca la visuale, devia l'arma avversaria o colpisce con il bordo o l'umbone."
            ]
        }
    },
    {
        id: 2,
        title: "Libro Secondo",
        subtitle: "Spada e Armi da Taglio Superiori",
        description: "Nel Libro Secondo, Marozzo estende l'uso della spada da lato includendo l'utilizzo di brocchieri più grandi (come il brocchiere largo o la targa) e introduce i pugnali lunghi a mano sinistra. Qui vengono approfonditi in maniera estensiva tutti gli 'abbattimenti' di taglio. La complessità tattica cresce e i giochi si focalizzano sull'uso del tempo e della provocazione.",
        weapons: ["Spada e Brocchiere largo", "Spada e Targa", "Spada e Rotella", "Spada e Pugnale"],
        games: ["Gioco Largo", "Gioco Stretto"],
        assaults: [
            {
                name: "Assalto con Targa",
                description: "Dinamiche di difesa con lo scudo quadrato da pugno (targa). La forma convessa favorisce lo scorrere del colpo avversario, permettendo rientri rapidi di mandritto."
            },
            {
                name: "Assalto con Pugnale",
                description: "Primo approccio alle armi doppie difensive asimmetriche. Il pugnale controlla (gioco stretto) mentre la spada colpisce a distanza (gioco largo)."
            }
        ],
        technicalFocus: {
            title: "Provocazione e Falso Dritto",
            points: [
                "L'invito: lasciare bersagli apparentemente e volutamente scoperti in una guardia bassa (es. Coda Lunga).",
                "Reazione: usare un movimento di falso dritto ascendente per respingere il taglio avversario aprendo la linea.",
                "Contrattacco: abbattere un colpo di filo dritto mentre l'avversario è fuori l'equilibrio."
            ]
        }
    },
    {
        id: 3,
        title: "Libro Terzo",
        subtitle: "L'Arte della Spada a Due Mani",
        description: "Il Libro Terzo è uno dei più celebri: verte integralmente sulla spada a due mani (o spadone). Diversamente dai sistemi nordeuropei coevi, le tecniche di Marozzo enfatizzano i passaggi fluidi tra svariate guardie alte, mezze e basse, con ampi mulinelli e colpi in rottura, atti sia al duello che all'affrontare gruppi avversari o armi inastate.",
        weapons: ["Spada a due mani"],
        games: ["Gioco Largo", "Misto", "Gioco Stretto", "Mezza Spada"],
        assaults: [
            {
                name: "Primo Assalto di due mani",
                description: "Combattimento in linea. Movimenti ampi come i tramazzoni usati per saggiare la distanza in gioco largo, per poi chiudere con le punte."
            },
            {
                name: "Secondo Assalto di due mani",
                description: "Alternanza fluida tra gioco largo e gioco stretto. Uso dei falsi riversi per sgombrare strada e inserimento in passate ravvicinate."
            },
            {
                name: "Terzo Assalto di due mani",
                description: "Situazioni critiche a mezza spada e avversari armati in maniera diversa. Implementazione formidabile delle 'prese' di lottamento, inclusi lanci a terra, torsioni dei polsi o placcaggi tenendo l'elsa e la fortezza della lama."
            }
        ],
        technicalFocus: {
            title: "Dinamiche della Spada a Due Mani",
            points: [
                "Leva biomeccanica: l'uso del pomolo per creare coppie di forza sui fendenti ed ottenere estrema velocità rotazionale.",
                "Parate al corpo a corpo: la guardia crociata ('elsa' e bracci della croce) funge da uncino attivo nel gioco stretto.",
                "Mezza spada offensiva: colpire il volto o la gola direttamente col tallone della spada e la riga, in transizioni strette."
            ]
        }
    },
    {
        id: 4,
        title: "Libro Quarto",
        subtitle: "Armi Varie e Combattimento a Cavallo",
        description: "Questo libro dimostra la vera versatilità dell'armigero rinascimentale, ampliando le competenze ad un arsenale vastissimo. Copre armi da strada o d'oppurtunità civile fino ad armi polari inastate. Mostra come i principi universali del passo e delle guardie (già assimilati nei primi 3 libri) si adattino ad oggetti e contesti radicalmente diversi.",
        weapons: ["Pugnale solo", "Pugnale e Cappa", "Partigiana e Rotella", "Lancia", "Alabarda", "Combattimento a Cavallo"],
        games: ["Stretto estremo (Pugnale)", "Misto (Armi in asta)"],
        assaults: [
            {
                name: "Pugnale e Cappa",
                description: "Difesa di strada contro improvvisi agguati. La cappa è avvolta al braccio sinistro per parare o buttata per accecare l'avversario nel gioco stretto aspro."
            },
            {
                name: "Le Inastate",
                description: "L'uso dell'Alabarda e della Partigiana. Combattimento basato molto sulle punte ed i colpi in ritirata sfruttando la grande massa dell'arma nel gioco misto."
            },
            {
                name: "A Cavallo",
                description: "Tecniche per lo scontro tra cavalieri. L'equilibrio sulla sella e l'uso dell'inerzia per calare tremendi abbattimenti discendenti o letali inserzioni di punta."
            }
        ],
        technicalFocus: {
            title: "Distanze Estreme",
            points: [
                "Pugnale: richiede immediatezza psicologica ed entrata nel fulcro dell'avversario tramite 'prese'. Non vi è finto riparo ma solo offesa o avvolgimento.",
                "Armi in asta: si basa sui giochi di leva delle braccia posteriori. Uso dell'asta stessa come arma da deflessione per liberare la linea di punta."
            ]
        }
    },
    {
        id: 5,
        title: "Libro Quinto",
        subtitle: "L'Onore, il Duello Giudiziario e i Cartelli",
        description: "Il Libro Quinto si discosta leggermente dalla tecnica fisica, offrendo un'affascinante prospettiva sociologica e legale dei duelli nel XVI secolo. Marozzo illustra le pratiche procedurali corrette per le dispute d'onore e il posizionamento all'interno dello steccato. Discute gli 'abbattimenti singolari' dal punto di vista degli arbitraggi, dei divieti, dei cerimoniali religiosi e civili e della validità legale dei 'Cartelli' di sfida.",
        weapons: ["Tutte le armi da lizza (es. spadone, spada sola)"],
        games: ["Lizza formale", "Arbitrato"],
        assaults: [
            {
                name: "Lo Steccato d'Onore",
                description: "Come entrare nell'arena (lizza o steccato). Le benedizioni necessarie, i testimoni paritari e la distribuzione del sole sul campo."
            },
            {
                name: "Il Cartello di Sfida",
                description: "Formule per ingaggiare il duello legale ed inviare la sfida senza subire il disonore di violazioni formali di fronte ad un Podestà."
            }
        ],
        technicalFocus: {
            title: "Codice e Preparazione",
            points: [
                "Parità di Sole: il campo di combattimento e la posizione garantiscono che nessuno abbia il sole in viso, influenzando l'orientamento.",
                "Abbigliamento del Duellante: norme stringenti sulle cuciture e sull'assenza di foderature corazzate occulte o talismani e 'brevia'.",
                "Ruolo del Padrino: i garanti che ispezionano le armi dell'avversario per garantire assoluta parità volumetrica."
            ]
        }
    }
];
