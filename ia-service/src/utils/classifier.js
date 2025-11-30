// ai-service/src/utils/classifier.js
const natural = require('natural');
const classifier = new natural.BayesClassifier();

console.log("🧠 Entrenando a la IA...");

// 1. Coincide con <option>Poste de luz roto</option>
classifier.addDocument('la lampara no prende', 'Poste de luz roto');
classifier.addDocument('calle muy oscura sin luz', 'Poste de luz roto');
classifier.addDocument('foco fundido', 'Poste de luz roto');

// 2. Coincide con <option>Bache</option>
classifier.addDocument('hay un bache enorme', 'Bache');
classifier.addDocument('agujero en el pavimento', 'Bache');
classifier.addDocument('calle rota', 'Bache');

// 3. Coincide con <option>Fuga de agua</option>
classifier.addDocument('mucha agua tirada', 'Fuga de agua');
classifier.addDocument('tuberia rota en la calle', 'Fuga de agua');
classifier.addDocument('charco grande de agua limpia', 'Fuga de agua');

// 4. Coincide con <option>Árbol caído</option>
classifier.addDocument('arbol tirado', 'Árbol caído');
classifier.addDocument('ramas obstruyendo el paso', 'Árbol caído');
classifier.addDocument('tronco en medio de la calle', 'Árbol caído');

// 5. Coincide con <option>Grafiti</option>
classifier.addDocument('pared rayada', 'Grafiti');
classifier.addDocument('pintura en la fachada', 'Grafiti');
classifier.addDocument('vandalismo en el muro', 'Grafiti');

classifier.train();
console.log("✅ IA Entrenada con las categorías del HTML.");

module.exports = classifier;