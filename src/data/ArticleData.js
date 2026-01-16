export const SENTENCES = [
    // DETERMINADOS (el, la, los, las)
    { id: 1, before: "", after: "perro juega en el parque.", article: "El", type: "DEFINITE" },
    { id: 2, before: "Me gusta", after: "comida que prepara mi abuela.", article: "la", type: "DEFINITE" },
    { id: 3, before: "", after: "árboles son muy altos.", article: "Los", type: "DEFINITE" },
    { id: 4, before: "Mira", after: "estrellas en el cielo.", article: "las", type: "DEFINITE" },
    { id: 5, before: "", after: "sol brilla mucho hoy.", article: "El", type: "DEFINITE" },
    { id: 6, before: "Cierra", after: "puerta, por favor.", article: "la", type: "DEFINITE" },
    { id: 7, before: "", after: "niños corren por el patio.", article: "Los", type: "DEFINITE" },
    { id: 8, before: "Limpia", after: "ventanas de tu habitación.", article: "las", type: "DEFINITE" },
    { id: 9, before: "Dame", after: "libro rojo.", article: "el", type: "DEFINITE" },
    { id: 10, before: "", after: "mesa está puesta.", article: "La", type: "DEFINITE" },
    { id: 11, before: "¿Dónde están", after: "llaves del coche?", article: "las", type: "DEFINITE" },
    { id: 12, before: "Hoy es", after: "mejor día de la semana.", article: "el", type: "DEFINITE" },
    { id: 13, before: "", after: "gatos duermen en el sofá.", article: "Los", type: "DEFINITE" },
    { id: 14, before: "Apaga", after: "luz antes de salir.", article: "la", type: "DEFINITE" },
    { id: 15, before: "", after: "invierno es muy frío.", article: "El", type: "DEFINITE" },

    // INDETERMINADOS (un, una, unos, unas)
    { id: 16, before: "He visto", after: "pájaro azul.", article: "un", type: "INDEFINITE" },
    { id: 17, before: "Quiero comprar", after: "bicicleta nueva.", article: "una", type: "INDEFINITE" },
    { id: 18, before: "Hay", after: "caramelos en la bolsa.", article: "unos", type: "INDEFINITE" },
    { id: 19, before: "Tengo", after: "preguntas para ti.", article: "unas", type: "INDEFINITE" },
    { id: 20, before: "Necesito", after: "lápiz para escribir.", article: "un", type: "INDEFINITE" },
    { id: 21, before: "Es", after: "historia muy divertida.", article: "una", type: "INDEFINITE" },
    { id: 22, before: "Vienen", after: "amigos a cenar.", article: "unos", type: "INDEFINITE" },
    { id: 23, before: "He cogido", after: "flores del jardín.", article: "unas", type: "INDEFINITE" },
    { id: 24, before: "Dame", after: "ejemplo, por favor.", article: "un", type: "INDEFINITE" },
    { id: 25, before: "Había", after: "nube con forma de dragón.", article: "una", type: "INDEFINITE" },
    { id: 26, before: "Compró", after: "regalos para la fiesta.", article: "unos", type: "INDEFINITE" },
    { id: 27, before: "Necesito", after: "vacaciones pronto.", article: "unas", type: "INDEFINITE" },
    { id: 28, before: "Es", after: "día perfecto para pasear.", article: "un", type: "INDEFINITE" },
    { id: 29, before: "Busco", after: "camiseta de color verde.", article: "una", type: "INDEFINITE" },
    { id: 30, before: "Tengo", after: "dudas sobre el examen.", article: "unas", type: "INDEFINITE" }
];

export const getRandomSentences = (count, type) => {
    let pool = SENTENCES;
    if (type !== 'BOTH') {
        pool = SENTENCES.filter(s => s.type === type);
    }

    // Shuffle and slice
    const shuffled = [...pool].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
};
