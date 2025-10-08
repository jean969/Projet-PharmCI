// Liste des principales villes de Côte d'Ivoire
// Supposons que vous ayez une liste de pharmacies (par exemple, depuis script.js ou une API)
// Voici un exemple de structure de données pour les pharmacies
const pharmacies = [
  { nom: "Pharmacie du Progrès", ville: "Abidjan" },
  { nom: "Pharmacie Centrale", ville: "Yamoussoukro" },
  { nom: "Pharmacie de la Paix", ville: "Bouaké" },
  { nom: "Pharmacie St. Michel", ville: "Abidjan" },
  { nom: "Pharmacie de l'Indépendance", ville: "Daloa" },
  { nom: "Pharmacie du Nord", ville: "Korhogo" },
  { nom: "Pharmacie du Port", ville: "San Pedro" },
  { nom: "Pharmacie Nouvelle", ville: "Bouaké" },
];

// Liste des principales villes de Côte d'Ivoire
const villesCIV = [
  "Abidjan",
  "Yamoussoukro",
  "Bouaké",
  "Daloa",
  "San Pedro",
  "Korhogo",
];

// Parcourir chaque ville de la liste villesCIV
villesCIV.forEach(ville => {
  console.log(`Pharmacies à ${ville}:`);
  
  // Filtrer les pharmacies pour ne garder que celles de la ville actuelle
  const pharmaciesDeLaVille = pharmacies.filter(pharmacie => pharmacie.ville === ville);
  
  // Afficher les pharmacies trouvées pour cette ville
  if (pharmaciesDeLaVille.length > 0) {
    pharmaciesDeLaVille.forEach(pharmacie => {
      console.log(`  - ${pharmacie.nom}`);
    });
  } else {
    console.log("  Aucune pharmacie trouvée.");
  }
});
