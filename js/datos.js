// Datos del curso. Las lecciones viven en /lecciones/leccion-N.html.
window.CURSO = {
  lecciones: [
    { n: 1, titulo: "Fundamentos: las tres Cábalas, historia y masonería", disponible: true },
    { n: 2, titulo: "Metafísica hermética y cabalística", disponible: false },
    { n: 3, titulo: "El Árbol de la Vida y la geometría sagrada", disponible: false },
    { n: 4, titulo: "Las 22 letras hebreas a fondo", disponible: false },
    { n: 5, titulo: "Los 22 senderos y los Arcanos Mayores", disponible: false },
    { n: 6, titulo: "Los Arcanos Menores", disponible: false },
    { n: 7, titulo: "Numerología y gematría", disponible: false },
    { n: 8, titulo: "Astrología cabalística, simbolismo y religión comparada", disponible: false },
    { n: 9, titulo: "Práctica: tarot, meditación, geometría sagrada y chakras", disponible: false },
    { n: 10, titulo: "Alquimia y otras tradiciones herméticas", disponible: false }
  ],

  // Correspondencias de la Golden Dawn (sistema de la baraja Rider-Waite).
  // "leccion": en qué lección se aprende la letra (null = todavía no).
  letras: [
    { l: "א", nombre: "Alef", he: "אָלֶף",   valor: 1,   tipo: "madre", significado: "buey",          astro: "Aire",       arcano: "0 El Loco",            leccion: null },
    { l: "ב", nombre: "Bet", he: "בֵּית",    valor: 2,   tipo: "doble", significado: "casa",          astro: "Mercurio",   arcano: "I El Mago",            leccion: 1 },
    { l: "ג", nombre: "Guímel", he: "גִּימֶל", valor: 3,   tipo: "doble", significado: "camello",       astro: "Luna",       arcano: "II La Sacerdotisa",    leccion: null },
    { l: "ד", nombre: "Dálet", he: "דָּלֶת",  valor: 4,   tipo: "doble", significado: "puerta",        astro: "Venus",      arcano: "III La Emperatriz",    leccion: null },
    { l: "ה", nombre: "He", he: "הֵא",     valor: 5,   tipo: "simple", significado: "ventana",      astro: "Aries",      arcano: "IV El Emperador",      leccion: 1 },
    { l: "ו", nombre: "Vav", he: "וָו",    valor: 6,   tipo: "simple", significado: "clavo",        astro: "Tauro",      arcano: "V El Hierofante",      leccion: null },
    { l: "ז", nombre: "Záyin", he: "זַיִן",  valor: 7,   tipo: "simple", significado: "espada",       astro: "Géminis",    arcano: "VI Los Enamorados",    leccion: null },
    { l: "ח", nombre: "Jet", he: "חֵית",    valor: 8,   tipo: "simple", significado: "cerca",        astro: "Cáncer",     arcano: "VII El Carro",         leccion: null },
    { l: "ט", nombre: "Tet", he: "טֵית",    valor: 9,   tipo: "simple", significado: "serpiente",    astro: "Leo",        arcano: "VIII La Fuerza",       leccion: null },
    { l: "י", nombre: "Yod", he: "יוֹד",    valor: 10,  tipo: "simple", significado: "mano",         astro: "Virgo",      arcano: "IX El Ermitaño",       leccion: null },
    { l: "כ", nombre: "Kaf", he: "כַּף",    valor: 20,  tipo: "doble", significado: "palma",         astro: "Júpiter",    arcano: "X La Rueda de la Fortuna", leccion: null },
    { l: "ל", nombre: "Lamed", he: "לָמֶד",  valor: 30,  tipo: "simple", significado: "aguijada",     astro: "Libra",      arcano: "XI La Justicia",       leccion: 1 },
    { l: "מ", nombre: "Mem", he: "מֵם",    valor: 40,  tipo: "madre", significado: "agua",          astro: "Agua",       arcano: "XII El Colgado",       leccion: null },
    { l: "נ", nombre: "Nun", he: "נוּן",    valor: 50,  tipo: "simple", significado: "pez",          astro: "Escorpio",   arcano: "XIII La Muerte",       leccion: null },
    { l: "ס", nombre: "Sámej", he: "סָמֶךְ",  valor: 60,  tipo: "simple", significado: "puntal",       astro: "Sagitario",  arcano: "XIV La Templanza",     leccion: null },
    { l: "ע", nombre: "Áyin", he: "עַיִן",   valor: 70,  tipo: "simple", significado: "ojo",          astro: "Capricornio", arcano: "XV El Diablo",        leccion: null },
    { l: "פ", nombre: "Pe", he: "פֵּא",     valor: 80,  tipo: "doble", significado: "boca",          astro: "Marte",      arcano: "XVI La Torre",         leccion: null },
    { l: "צ", nombre: "Tsadi", he: "צָדִי",  valor: 90,  tipo: "simple", significado: "anzuelo",      astro: "Acuario",    arcano: "XVII La Estrella",     leccion: null },
    { l: "ק", nombre: "Qof", he: "קוֹף",    valor: 100, tipo: "simple", significado: "nuca",         astro: "Piscis",     arcano: "XVIII La Luna",        leccion: 1 },
    { l: "ר", nombre: "Resh", he: "רֵישׁ",   valor: 200, tipo: "doble", significado: "cabeza",        astro: "Sol",        arcano: "XIX El Sol",           leccion: null },
    { l: "ש", nombre: "Shin", he: "שִׁין",   valor: 300, tipo: "madre", significado: "diente",        astro: "Fuego",      arcano: "XX El Juicio",         leccion: null },
    { l: "ת", nombre: "Tav", he: "תָּו",    valor: 400, tipo: "doble", significado: "marca",         astro: "Saturno",    arcano: "XXI El Mundo",         leccion: null }
  ],

  materiales: [
    { id: "vela", texto: "Vela blanca y algo para encenderla (Fuego, Yod, Bastos)", imprescindible: true },
    { id: "agua", texto: "Copa o vaso con agua limpia (Agua, He, Copas)", imprescindible: true },
    { id: "incienso", texto: "Incienso de olíbano con su soporte (Aire, Vav, Espadas)", imprescindible: true },
    { id: "sal", texto: "Platito con sal gruesa o marina (Tierra, He final, Oros)", imprescindible: true },
    { id: "seda", texto: "Paño de seda de unos 50 × 50 cm, negro o morado", imprescindible: true },
    { id: "altar", texto: "Mesa pequeña con mantel blanco o negro como altar", imprescindible: true },
    { id: "brujula", texto: "Brújula o app para localizar el Este", imprescindible: true },
    { id: "diario", texto: "Diario de estudio", imprescindible: true },
    { id: "caja", texto: "Caja de madera para guardar la baraja", imprescindible: false },
    { id: "tapete", texto: "Tapete solo para tiradas", imprescindible: false },
    { id: "ropa", texto: "Ropa cómoda reservada para la práctica", imprescindible: false }
  ],

  rituales: [
    { nombre: "Consagración de la baraja", cuando: "Una sola vez, antes del primer uso", materiales: "Vela, agua, incienso, sal, seda, altar, brújula", estado: "Pendiente de redactar" },
    { nombre: "Cruz Cabalística", cuando: "Lección 2; al empezar y terminar cada práctica", materiales: "Ninguno", estado: "Lección 2" },
    { nombre: "Ritual Menor de Destierro del Pentagrama", cuando: "Lección 3; antes de cada tirada o meditación", materiales: "Brújula; daga opcional", estado: "Lección 3" },
    { nombre: "Vibración de los nombres divinos", cuando: "Lección 4", materiales: "Ninguno", estado: "Lección 4" },
    { nombre: "Apertura y cierre de una lectura", cuando: "Cada vez que uses las cartas", materiales: "Seda, tapete; vela e incienso opcionales", estado: "Lección 5" },
    { nombre: "Pilar Medio", cuando: "Lección 9", materiales: "Silla de respaldo recto", estado: "Lección 9" },
    { nombre: "Ritual del Hexagrama", cuando: "Lección 9", materiales: "Brújula; daga opcional", estado: "Lección 9" }
  ]
};
