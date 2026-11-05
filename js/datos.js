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
    { n: 9, titulo: "La carta astral: cómo se construye y cómo se lee", disponible: false },
    { n: 10, titulo: "Práctica: tarot, meditación, geometría sagrada y chakras", disponible: false },
    { n: 11, titulo: "Alquimia y otras tradiciones herméticas", disponible: false },
    { n: 12, titulo: "Simbolismo: cómo leer los símbolos", disponible: false }
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
      ] },
    { id: "consagracion", ritual: "consagracion", titulo: "Consagración de la baraja guiada", resumen: "Unos 30 minutos. De pie ante el altar, mirando al Este.",
      pasos: [
        { texto: "Bienvenido a la consagración de tu baraja. Comprueba que el altar está preparado: el incienso al Este, la vela al Sur, la copa de agua al Oeste y la sal al Norte. En el centro, los cinco montones de cartas y el paño de seda.", pausa: 20 },
        { texto: "Enciende la vela y el incienso. Después colócate al Oeste del altar, mirando al Este.", pausa: 60 },
        { texto: "Respira despacio por la nariz. Con cada espiración, deja atrás las preocupaciones del día.", pausa: 60 },
        { texto: "Vamos a abrir con la Cruz Cabalística. Imagina sobre tu cabeza la esfera de luz blanca.", pausa: 20 },
        { texto: "Llévate la mano a la frente y di: Atá.", pausa: 12 },
        { texto: "Baja la mano al pecho, la luz desciende hasta los pies. Di: Maljút.", pausa: 15 },
        { texto: "Hombro derecho: ve Guevurá.", pausa: 12 },
        { texto: "Hombro izquierdo: ve Guedulá.", pausa: 12 },
        { texto: "Manos juntas ante el pecho: le Olám. Amén.", pausa: 20 },
        { texto: "Pon las manos sobre la baraja y declara tu intención en voz alta: Consagro esta baraja como instrumento de estudio, de meditación y de conocimiento de mí mismo. Que sus imágenes me hablen con verdad.", pausa: 30 },
        { texto: "Fuego. Toma el montón de Bastos y pásalo despacio por encima de la llama, a un palmo de distancia. Di: Por el Fuego te consagro, palo de Bastos. Después déjalo a tu derecha, en el Sur.", pausa: 75 },
        { texto: "Agua. Toma el montón de Copas. Moja la punta de los dedos y deja caer unas gotas alrededor del montón, no encima. Di: Por el Agua te consagro, palo de Copas. Déjalo en el Oeste.", pausa: 75 },
        { texto: "Aire. Toma el montón de Espadas y pásalo despacio a través del humo del incienso. Di: Por el Aire te consagro, palo de Espadas. Déjalo en el Este.", pausa: 75 },
        { texto: "Tierra. Toma el montón de Oros y sostenlo sobre la sal. Esparce una pizca alrededor. Di: Por la Tierra te consagro, palo de Oros. Déjalo en el Norte.", pausa: 75 },
        { texto: "Ahora los veintidós arcanos mayores. Pásalos por los cuatro elementos en el mismo orden: Fuego, Agua, Aire y Tierra. Al terminar di: Por el Fuego, el Agua, el Aire y la Tierra os consagro, arcanos mayores.", pausa: 120 },
        { texto: "Reúne los cinco montones en una sola baraja. Sostenla con las dos manos ante el pecho y cierra los ojos.", pausa: 30 },
        { texto: "Imagina de nuevo la esfera de luz sobre tu cabeza. Deja que la luz baje por tus brazos hasta las cartas.", pausa: 45 },
        { texto: "Di despacio la invocación: Invoco al Altísimo, para que envíe a Hru, el gran ángel que preside las operaciones de esta sabiduría secreta, a poner su mano invisible sobre estas cartas consagradas, para que por ellas pueda obtener verdadero conocimiento de las cosas ocultas, para gloria de su nombre inefable. Amén.", pausa: 45 },
        { texto: "Quédate en silencio, sintiendo las cartas cargadas de luz.", pausa: 60 },
        { texto: "Abre los ojos y baraja muy despacio, mirando cada carta un instante. No las interpretes todavía: solo salúdalas.", pausa: 240 },
        { texto: "Envuelve la baraja en el paño de seda y guárdala en su caja.", pausa: 40 },
        { texto: "Cerramos con la Cruz Cabalística. Mano a la frente: Atá.", pausa: 12 },
        { texto: "Al pecho: Maljút.", pausa: 12 },
        { texto: "Hombro derecho: ve Guevurá. Hombro izquierdo: ve Guedulá.", pausa: 20 },
        { texto: "Manos juntas: le Olám. Amén.", pausa: 20 },
        { texto: "Apaga la vela sofocándola, sin soplar, y deja que el incienso se consuma. Más tarde vierte el agua en una planta y tira la sal con agua corriente.", pausa: 30 },
        { texto: "La baraja ya está consagrada. Cuando puedas, anota en tu diario la fecha, la hora y cómo te has sentido.", pausa: 5 }
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
    { nombre: "Consagración de la baraja", cuando: "Una sola vez, antes del primer uso", materiales: "Vela, agua, incienso, sal, seda, altar, brújula", estado: "Disponible", enlace: "#/ritual/consagracion" },
    { nombre: "Cruz Cabalística", cuando: "Mañana y noche; al empezar y terminar cada práctica", materiales: "Ninguno", estado: "Disponible en la lección 2", enlace: "#/leccion/2" },
    { nombre: "Ritual Menor de Destierro del Pentagrama", cuando: "Lección 3; antes de cada tirada o meditación", materiales: "Brújula; daga opcional", estado: "Lección 3" },
    { nombre: "Vibración de los nombres divinos", cuando: "Lección 4", materiales: "Ninguno", estado: "Lección 4" },
    { nombre: "Apertura y cierre de una lectura", cuando: "Cada vez que uses las cartas", materiales: "Seda, tapete; vela e incienso opcionales", estado: "Lección 5" },
    { nombre: "Pilar Medio", cuando: "Lección 10", materiales: "Silla de respaldo recto", estado: "Lección 10" },
    { nombre: "Ritual del Hexagrama", cuando: "Lección 10", materiales: "Brújula; daga opcional", estado: "Lección 10" }
  ]
};
