// Fonction pour gérer le filtrage des pharmacies par ville
document.addEventListener('DOMContentLoaded', () => {
    // Ajouter un élément pour afficher le nombre de résultats s'il n'existe pas
    if (!document.getElementById('resultsCount')) {
        const resultsCount = document.createElement('div');
        resultsCount.id = 'resultsCount';
        resultsCount.className = 'text-center mb-4';
        document.querySelector('.pharmacies-section .container').appendChild(resultsCount);
    }

    // Sélectionner tous les boutons de filtre de ville
    const cityButtons = document.querySelectorAll('.city-filter-container a.btn');
    
    // Afficher les erreurs dans la console pour le débogage
    console.log('Nombre de boutons trouvés:', cityButtons.length);
    
    // Variable pour stocker le bouton actif
    let activeButton = null;

    // Fonction pour filtrer les pharmacies par ville
    const filterPharmaciesByCity = (city) => {
        console.log('Filtrage pour la ville:', city);

        // Récupérer toutes les pharmacies depuis data.js
        if (typeof pharmaciesData === 'undefined') {
            console.error('pharmaciesData n\'est pas défini. Vérifiez que data.js est bien chargé.');
            return;
        }

        const pharmacies = pharmaciesData;
        console.log('Nombre total de pharmacies:', pharmacies.length);
        
        // Filtrer les pharmacies pour la ville sélectionnée
        let filteredPharmacies;
        if (city === 'all') {
            filteredPharmacies = pharmacies;
        } else {
            filteredPharmacies = pharmacies.filter(pharmacy => {
                const matchCity = pharmacy.city.toLowerCase() === city.toLowerCase();
                console.log(`Vérification de ${pharmacy.name} - ville: ${pharmacy.city} - match: ${matchCity}`);
                return matchCity;
            });
        }

        console.log('Pharmacies filtrées:', filteredPharmacies.length);

        // Vérifier si pharmacyApp existe et est correctement initialisé
        if (typeof pharmacyApp === 'undefined') {
            console.error('pharmacyApp n\'est pas défini. Vérifiez que script.js est bien chargé.');
            return;
        }

        if (!pharmacyApp.displayPharmacies) {
            console.error('La fonction displayPharmacies n\'existe pas dans pharmacyApp');
            return;
        }

        // Afficher les résultats
        pharmacyApp.displayPharmacies(filteredPharmacies);
        
        // Mettre à jour le compteur
        updateResultsCount(filteredPharmacies.length);
    };

    // Fonction pour mettre à jour l'apparence des boutons
    const updateButtonStyles = (selectedButton) => {
        // Réinitialiser tous les boutons
        cityButtons.forEach(button => {
            button.classList.remove('btn-primary');
            button.classList.add('btn-outline-primary');
        });

        // Mettre en évidence le bouton sélectionné
        if (selectedButton) {
            selectedButton.classList.remove('btn-outline-primary');
            selectedButton.classList.add('btn-primary');
        }
    };

    // Fonction pour mettre à jour le compteur de résultats
    const updateResultsCount = (count) => {
        const counter = document.getElementById('resultsCount');
        if (counter) {
            counter.textContent = `${count} pharmacie${count > 1 ? 's' : ''} trouvée${count > 1 ? 's' : ''}`;
        }
    };

    // Ajouter les écouteurs d'événements aux boutons
    cityButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            console.log('Clic sur le bouton:', button.textContent.trim());
            
            try {
                // Si on clique sur le même bouton, réinitialiser le filtre
                if (activeButton === button) {
                    console.log('Réinitialisation du filtre');
                    filterPharmaciesByCity('all');
                    updateButtonStyles(null);
                    activeButton = null;
                    return;
                }

                // Mettre à jour le bouton actif
                activeButton = button;
                
                // Récupérer le nom de la ville depuis le texte du bouton
                const city = button.textContent.trim();
                console.log('Ville sélectionnée:', city);
                
                // Appliquer le filtre
                filterPharmaciesByCity(city);
                
                // Mettre à jour les styles des boutons
                updateButtonStyles(button);

                // Animation de défilement doux vers la section des pharmacies
                const pharmaciesSection = document.getElementById('pharmacies');
                if (pharmaciesSection) {
                    pharmaciesSection.scrollIntoView({ behavior: 'smooth' });
                }
            } catch (error) {
                console.error('Erreur lors du filtrage:', error);
                // Afficher un message d'erreur à l'utilisateur
                const errorMessage = document.createElement('div');
                errorMessage.className = 'alert alert-danger mt-3';
                errorMessage.textContent = 'Une erreur est survenue lors du filtrage des pharmacies. Veuillez réessayer.';
                document.querySelector('.pharmacies-section .container').prepend(errorMessage);
                
                // Supprimer le message après 5 secondes
                setTimeout(() => {
                    errorMessage.remove();
                }, 5000);
            }
        });
    });

    // Fonction pour réinitialiser les filtres
    window.resetCityFilters = () => {
        filterPharmaciesByCity('all');
        updateButtonStyles(null);
        activeButton = null;
    };

    // Ajouter un bouton "Toutes les villes" au début de la liste
    const addAllCitiesButton = () => {
        const cityFilterContainer = document.querySelector('.city-filter-container ul');
        if (cityFilterContainer) {
            const allCitiesButton = document.createElement('li');
            allCitiesButton.className = 'list-inline-item';
            allCitiesButton.innerHTML = `
                <a href="#" class="btn btn-outline-primary rounded-pill mb-2">
                    Toutes les villes
                </a>
            `;
            
            // Ajouter le bouton au début de la liste
            cityFilterContainer.insertBefore(allCitiesButton, cityFilterContainer.firstChild);

            // Ajouter l'écouteur d'événements
            allCitiesButton.querySelector('a').addEventListener('click', (e) => {
                e.preventDefault();
                resetCityFilters();
            });
        }
    };

    // Initialiser le bouton "Toutes les villes"
    addAllCitiesButton();

    // Animation des boutons au survol
    cityButtons.forEach(button => {
        button.addEventListener('mouseenter', () => {
            if (button !== activeButton) {
                button.classList.add('btn-hover');
            }
        });

        button.addEventListener('mouseleave', () => {
            button.classList.remove('btn-hover');
        });
    });
});
