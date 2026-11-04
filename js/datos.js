// Datos del curso. Las lecciones viven en /lecciones/leccion-N.html.
window.CURSO = {
  lecciones: [
    { n: 1, titulo: "Fundamentos: las tres Cábalas, historia y masonería", disponible: true },
    { n: 2, titulo: "Del Kybalión a la Cábala: de dónde sale todo", disponible: true },
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
    { l: "א", nombre: "Alef", he: "אָלֶף",   valor: 1,   tipo: "madre", significado: "buey",          astro: "Aire",       arcano: "0 El Loco",            leccion: 2 },
    { l: "ב", nombre: "Bet", he: "בֵּית",    valor: 2,   tipo: "doble", significado: "casa",          astro: "Mercurio",   arcano: "I El Mago",            leccion: 1 },
    { l: "ג", nombre: "Guímel", he: "גִּימֶל", valor: 3,   tipo: "doble", significado: "camello",       astro: "Luna",       arcano: "II La Sacerdotisa",    leccion: null },
    { l: "ד", nombre: "Dálet", he: "דָּלֶת",  valor: 4,   tipo: "doble", significado: "puerta",        astro: "Venus",      arcano: "III La Emperatriz",    leccion: null },
    { l: "ה", nombre: "He", he: "הֵא",     valor: 5,   tipo: "simple", significado: "ventana",      astro: "Aries",      arcano: "IV El Emperador",      leccion: 1 },
    { l: "ו", nombre: "Vav", he: "וָו",    valor: 6,   tipo: "simple", significado: "clavo",        astro: "Tauro",      arcano: "V El Hierofante",      leccion: null },
    { l: "ז", nombre: "Záyin", he: "זַיִן",  valor: 7,   tipo: "simple", significado: "espada",       astro: "Géminis",    arcano: "VI Los Enamorados",    leccion: null },
    { l: "ח", nombre: "Jet", he: "חֵית",    valor: 8,   tipo: "simple", significado: "cerca",        astro: "Cáncer",     arcano: "VII El Carro",         leccion: null },
    { l: "ט", nombre: "Tet", he: "טֵית",    valor: 9,   tipo: "simple", significado: "serpiente",    astro: "Leo",        arcano: "VIII La Fuerza",       leccion: null },
    { l: "י", nombre: "Yod", he: "יוֹד",    valor: 10,  tipo: "simple", significado: "mano",         astro: "Virgo",      arcano: "IX El Ermitaño",       leccion: 2 },
    { l: "כ", nombre: "Kaf", he: "כַּף",    valor: 20,  tipo: "doble", significado: "palma",         astro: "Júpiter",    arcano: "X La Rueda de la Fortuna", leccion: null },
    { l: "ל", nombre: "Lamed", he: "לָמֶד",  valor: 30,  tipo: "simple", significado: "aguijada",     astro: "Libra",      arcano: "XI La Justicia",       leccion: 1 },
    { l: "מ", nombre: "Mem", he: "מֵם",    valor: 40,  tipo: "madre", significado: "agua",          astro: "Agua",       arcano: "XII El Colgado",       leccion: 2 },
    { l: "נ", nombre: "Nun", he: "נוּן",    valor: 50,  tipo: "simple", significado: "pez",          astro: "Escorpio",   arcano: "XIII La Muerte",       leccion: 2 },
    { l: "ס", nombre: "Sámej", he: "סָמֶךְ",  valor: 60,  tipo: "simple", significado: "puntal",       astro: "Sagitario",  arcano: "XIV La Templanza",     leccion: null },
    { l: "ע", nombre: "Áyin", he: "עַיִן",   valor: 70,  tipo: "simple", significado: "ojo",          astro: "Capricornio", arcano: "XV El Diablo",        leccion: null },
    { l: "פ", nombre: "Pe", he: "פֵּא",     valor: 80,  tipo: "doble", significado: "boca",          astro: "Marte",      arcano: "XVI La Torre",         leccion: null },
    { l: "צ", nombre: "Tsadi", he: "צָדִי",  valor: 90,  tipo: "simple", significado: "anzuelo",      astro: "Acuario",    arcano: "XVII La Estrella",     leccion: null },
    { l: "ק", nombre: "Qof", he: "קוֹף",    valor: 100, tipo: "simple", significado: "nuca",         astro: "Piscis",     arcano: "XVIII La Luna",        leccion: 1 },
    { l: "ר", nombre: "Resh", he: "רֵישׁ",   valor: 200, tipo: "doble", significado: "cabeza",        astro: "Sol",        arcano: "XIX El Sol",           leccion: null },
    { l: "ש", nombre: "Shin", he: "שִׁין",   valor: 300, tipo: "madre", significado: "diente",        astro: "Fuego",      arcano: "XX El Juicio",         leccion: null },
    { l: "ת", nombre: "Tav", he: "תָּו",    valor: 400, tipo: "doble", significado: "marca",         astro: "Saturno",    arcano: "XXI El Mundo",         leccion: null }
  ],


  // Meditaciones guiadas: cada paso se lee en voz alta y después deja "pausa" segundos de silencio.
  meditaciones: [
    { id: "cruz", leccion: 2, titulo: "Cruz Cabalística guiada", resumen: "Unos 5 minutos. De pie, mirando al Este.",
      pasos: [
        { texto: "Ponte de pie, mirando al Este. Deja los brazos sueltos a los lados del cuerpo. Respira despacio por la nariz, tres o cuatro veces, sin forzar.", pausa: 25 },
        { texto: "Imagina sobre tu cabeza una esfera de luz blanca y brillante, del tamaño de un balón. Tómate tu tiempo para verla con claridad.", pausa: 25 },
        { texto: "Llévate la mano a la frente, bajando un poco de esa luz, y di despacio, con voz grave: Atá.", pausa: 15 },
        { texto: "Baja la mano al pecho, señalando hacia los pies. Imagina que la luz desciende como un rayo por el centro de tu cuerpo hasta el suelo. Di: Maljút.", pausa: 20 },
        { texto: "Tócate el hombro derecho. Imagina allí un punto de luz. Di: ve Guevurá.", pausa: 15 },
        { texto: "Tócate el hombro izquierdo. Imagina que un rayo de luz cruza el pecho de un hombro al otro. Di: ve Guedulá.", pausa: 15 },
        { texto: "Junta las manos ante el pecho. Di: le Olám.", pausa: 10 },
        { texto: "Y para cerrar, di: Amén.", pausa: 10 },
        { texto: "Quédate así, sintiendo la cruz de luz dentro de ti: la línea vertical de la cabeza a los pies y la horizontal de hombro a hombro.", pausa: 45 },
        { texto: "Respira hondo una vez más. Deja que la imagen se disuelva poco a poco, mueve los dedos de las manos y de los pies, y vuelve con calma.", pausa: 10 }
      ] },
    { id: "luz", leccion: 2, titulo: "La luz que desciende", resumen: "Unos 10 minutos. Sentado, con la espalda recta.",
      pasos: [
        { texto: "Siéntate en una silla con la espalda recta y los pies apoyados en el suelo. Pon las manos sobre los muslos y cierra los ojos.", pausa: 15 },
        { texto: "Respira por la nariz. Inspira contando hasta cuatro, retén contando hasta dos, espira contando hasta cuatro. Repítelo a tu ritmo.", pausa: 60 },
        { texto: "Imagina que delante de ti no hay nada. Ni luz ni oscuridad. Es el Ain, la nada que está antes de todo. Descansa en ese silencio.", pausa: 40 },
        { texto: "Ahora esa nada se vuelve infinita, sin bordes, sin final. Es el Ain Soph.", pausa: 30 },
        { texto: "Y en ese infinito aparece una luz suave que lo llena todo. Es el Ain Soph Aur, la luz infinita.", pausa: 40 },
        { texto: "La luz se concentra en un punto brillante justo encima de tu cabeza. Obsérvalo: es el primer punto del Árbol, el origen.", pausa: 40 },
        { texto: "Desde ese punto, la luz empieza a bajar como el agua de un manantial. Entra por la coronilla y llena tu cabeza, tu frente, tus ojos.", pausa: 40 },
        { texto: "La luz sigue bajando por el cuello y llena el pecho. Siente el corazón bañado en luz.", pausa: 40 },
        { texto: "Baja por el vientre, la cadera y las piernas, hasta llegar a los pies. Todo tu cuerpo está lleno de luz.", pausa: 40 },
        { texto: "Bajo tus pies, la luz forma un punto más denso y oscuro, como la tierra. Es el décimo punto, el mundo material. Siente cómo te sostiene.", pausa: 40 },
        { texto: "Quédate en silencio, sintiendo la columna de luz que te une desde el origen hasta la tierra.", pausa: 90 },
        { texto: "Poco a poco, deja que la imagen se desvanezca. Respira hondo, mueve suavemente el cuerpo y, cuando quieras, abre los ojos.", pausa: 10 }
      ] }
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
    { nombre: "Cruz Cabalística", cuando: "Mañana y noche; al empezar y terminar cada práctica", materiales: "Ninguno", estado: "Disponible en la lección 2", enlace: "#/leccion/2" },
    { nombre: "Ritual Menor de Destierro del Pentagrama", cuando: "Lección 3; antes de cada tirada o meditación", materiales: "Brújula; daga opcional", estado: "Lección 3" },
    { nombre: "Vibración de los nombres divinos", cuando: "Lección 4", materiales: "Ninguno", estado: "Lección 4" },
    { nombre: "Apertura y cierre de una lectura", cuando: "Cada vez que uses las cartas", materiales: "Seda, tapete; vela e incienso opcionales", estado: "Lección 5" },
    { nombre: "Pilar Medio", cuando: "Lección 9", materiales: "Silla de respaldo recto", estado: "Lección 9" },
    { nombre: "Ritual del Hexagrama", cuando: "Lección 9", materiales: "Brújula; daga opcional", estado: "Lección 9" }
  ]
};
