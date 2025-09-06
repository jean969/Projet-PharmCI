// Variables globales
let currentPharmacies = [];
let userLocation = null;

// Fonction d'initialisation
document.addEventListener('DOMContentLoaded', () => {
    // Vérifier que les données sont disponibles
    if (typeof pharmaciesData === 'undefined') {
        console.error('Les données des pharmacies ne sont pas disponibles. Assurez-vous que data.js est chargé avant app.js');
        return;
    }
    
    // Initialiser l'affichage des pharmacies
    currentPharmacies = pharmaciesData;
    displayPharmacies(currentPharmacies);
    
    // Initialiser les animations de comptage
    initializeCounters();
    
    // Écouteur pour la barre de recherche
    const searchInput = document.getElementById('searchInput');
    if (searchInput) {
        searchInput.addEventListener('input', debounce(handleSearch, 300));
    }
    
    // Animation du navbar au scroll
    window.addEventListener('scroll', handleNavbarScroll);
    
    // Initialiser les filtres si ils existent
    initializeFilters();
});

// Fonction pour gérer la recherche
function handleSearch(event) {
    const query = event.target.value.trim();
    
    if (query === '') {
        currentPharmacies = pharmaciesData;
    } else {
        currentPharmacies = searchPharmacies(query);
    }
    
    displayPharmacies(currentPharmacies);
    updateResultsCount(currentPharmacies.length);
}

// Fonction pour afficher les pharmacies
function displayPharmacies(pharmacies) {
    const container = document.querySelector('#pharmacies-container');
    if (!container) return;
    
    let pharmaciesHTML = '';
    
    if (pharmacies.length === 0) {
        pharmaciesHTML = `
            <div class="no-results text-center p-5">
                <i class="fas fa-search-minus fa-3x mb-3 text-muted"></i>
                <h4 class="text-muted">Aucun résultat trouvé</h4>
                <p class="text-muted">Aucune pharmacie ne correspond à vos critères de recherche.</p>
            </div>
        `;
    } else {
        pharmaciesHTML = `
            <div class="row g-4 mt-4">
                ${pharmacies.map(pharmacy => createPharmacyCard(pharmacy)).join('')}
            </div>
        `;
    }
    
    container.innerHTML = pharmaciesHTML;
}

// Fonction pour créer une carte de pharmacie
function createPharmacyCard(pharmacy) {
    const status = getPharmacyStatus(pharmacy);
    const statusBadge = getStatusBadge(status);
    const statusClass = getPharmacyStatusClass(pharmacy);
    const todayHours = getTodayHours(pharmacy.hours);
    
    return `
        <div class="col-md-6 col-lg-4">
            <div class="pharmacy-card shadow-sm hover-effect ${statusClass}"><br>
                <div class="card-status-wrapper">
                    ${statusBadge}
                </div>
                <div class="card-body">
                    <h6 class="card-title fw-bold">${pharmacy.name}</h6>
                    
                    <div class="card-info-group">
                        <div class="info-item">
                            <i class="fas fa-map-marker-alt text-primary me-2"></i>
                            <p class="mb-0 text-muted">${pharmacy.address}</p>
                        </div>
                        <div class="info-item">
                            <i class="fas fa-phone text-success me-2"></i>
                            <a href="tel:${pharmacy.phone}" class="text-decoration-none text-dark">${pharmacy.phone}</a>
                        </div>
                    </div>

                    <div class="hours-info my-3 p-2 bg-light rounded">
                        <div class="d-flex align-items-center">
                            <i class="fas fa-clock text-primary me-2"></i>
                            <span class="fw-bold me-2">Aujoud'hui :</span>
                            <span>${todayHours}</span>
                        </div>
                    </div>

                    <div class="action-buttons d-flex gap-2 mt-4">
                        <button class="btn btn-primary flex-grow-1" onclick="showDirections('${pharmacy.coordinates.lat}', '${pharmacy.coordinates.lng}')">
                            <i class="fas fa-directions me-1"></i> Itinéraire
                        </button>
                        <button class="btn btn-outline-primary flex-grow-1" onclick="showPharmacyDetails('${pharmacy.id}')">
                            <i class="fas fa-info-circle me-1"></i> Détails
                        </button>
                    </div>
                </div>
            </div>
        </div>
    `;
}

// Fonction pour obtenir la classe CSS du statut
function getPharmacyStatusClass(pharmacy) {
    const status = getPharmacyStatus(pharmacy);
    const classes = {
        'garde': 'pharmacy-card-garde',
        'open': 'pharmacy-card-open',
        'closed': 'pharmacy-card-closed'
    };
    return classes[status] || 'pharmacy-card-closed';
}

// Fonction pour obtenir le badge de statut
function getStatusBadge(status) {
    const badges = {
        open: '<span class="badge bg-success"><i class="fas fa-check-circle"></i> Ouvert</span>',
        closed: '<span class="badge bg-danger"><i class="fas fa-times-circle"></i> Fermé</span>',
        garde: '<span class="badge bg-warning"><i class="fas fa-shield-alt"></i> De garde</span>'
    };
    return badges[status] || badges.closed;
}

// Fonction pour afficher les directions
function showDirections(lat, lng) {
    const url = `https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}`;
    window.open(url, '_blank');
}

// Fonction pour afficher les détails d'une pharmacie
function showPharmacyDetails(id) {
    const pharmacy = getPharmacyById(id);
    if (!pharmacy) return;
    
    const status = getPharmacyStatus(pharmacy);
    const modalContent = `
        <div class="pharmacy-details">
            <h4>${pharmacy.name}</h4>
            <div class="mb-2">
                <strong><i class="fas fa-map-marker-alt text-primary"></i> Adresse :</strong> ${pharmacy.address}
            </div>
            <div class="mb-2">
                <strong><i class="fas fa-phone text-success"></i> Téléphone :</strong> 
                <a href="tel:${pharmacy.phone}">${pharmacy.phone}</a>
            </div>
            <div class="mb-2">
                <strong><i class="fas fa-clock"></i> Statut :</strong> 
                ${getStatusBadge(status)}
            </div>
            <div class="mb-3">
                <strong><i class="fas fa-calendar-alt"></i> Horaires :</strong>
                <div class="mt-2">
                    <small>
                        <div><strong>Lundi :</strong> ${pharmacy.hours.monday || 'Non spécifié'}</div>
                        <div><strong>Mardi :</strong> ${pharmacy.hours.tuesday || 'Non spécifié'}</div>
                        <div><strong>Mercredi :</strong> ${pharmacy.hours.wednesday || 'Non spécifié'}</div>
                        <div><strong>Jeudi :</strong> ${pharmacy.hours.thursday || 'Non spécifié'}</div>
                        <div><strong>Vendredi :</strong> ${pharmacy.hours.friday || 'Non spécifié'}</div>
                        <div><strong>Samedi :</strong> ${pharmacy.hours.saturday || 'Non spécifié'}</div>
                        <div><strong>Dimanche :</strong> ${pharmacy.hours.sunday || 'Non spécifié'}</div>
                    </small>
                </div>
            </div>
            
            </div>
            <div class="d-flex gap-2">
                <button class="btn btn-primary" onclick="showDirections('${pharmacy.coordinates.lat}', '${pharmacy.coordinates.lng}')">
                    <i class="fas fa-directions"></i> Itinéraire
                </button>
                <button class="btn btn-success" onclick="window.open('tel:${pharmacy.phone}')">
                    <i class="fas fa-phone"></i> Appeler
                </button>
            </div>
        </div>
    `;
    
    showModal('Détails de la pharmacie', modalContent);
}

// Fonction pour afficher une modale
function showModal(title, content) {
    // Créer la modale si elle n'existe pas
    let modal = document.getElementById('pharmacyModal');
    if (!modal) {
        const modalHTML = `
            <div class="modal fade" id="pharmacyModal" tabindex="-1">
                <div class="modal-dialog modal-lg">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title"></h5>
                            <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
                        </div>
                        <div class="modal-body"></div>
                    </div>
                </div>
            </div>
        `;
        document.body.insertAdjacentHTML('beforeend', modalHTML);
        modal = document.getElementById('pharmacyModal');
    }
    
    // Mettre à jour le contenu
    modal.querySelector('.modal-title').textContent = title;
    modal.querySelector('.modal-body').innerHTML = content;
    
    // Afficher la modale
    const bsModal = new bootstrap.Modal(modal);
    bsModal.show();
}



// Fonction pour mettre à jour le compteur de résultats
function updateResultsCount(count) {
    const counter = document.getElementById('resultsCount');
    if (counter) {
        counter.textContent = `${count} pharmacie${count > 1 ? 's' : ''} trouvée${count > 1 ? 's' : ''}`;
    }
}


// Fonction debounce pour optimiser les performances
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Fonction pour obtenir la localisation de l'utilisateur
function getUserLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                userLocation = {
                    lat: position.coords.latitude,
                    lng: position.coords.longitude
                };
                
                // Afficher les pharmacies proches
                const nearby = getNearbyPharmacies(userLocation.lat, userLocation.lng);
                if (nearby.length > 0) {
                    displayPharmacies(nearby);
                    updateResultsCount(nearby.length);
                }
            },
            (error) => {
                console.warn('Impossible d\'obtenir la localisation:', error);
            }
        );
    }
}

// Fonctions utilitaires exportées globalement
window.pharmacyApp = {
    displayPharmacies,
    showPharmacyDetails,
    showDirections,
    applyFilters,
    getUserLocation,
    searchPharmacies: handleSearch
};
//  fonction de vérification pharmacie ouverte ou fermé 
function verifierStatutPharmacie(pharmacie) {
    // Obtenir le jour de la semaine et l'heure actuelle
    const joursDeLaSemaine = ['dimanche', 'lundi', 'mardi', 'mercredi', 'jeudi', 'vendredi', 'samedi'];
    const dateActuelle = new Date();
    const jourActuel = joursDeLaSemaine[dateActuelle.getDay()];
    const heureActuelle = dateActuelle.getHours() * 60 + dateActuelle.getMinutes();

    // Récupérer les horaires pour le jour actuel
    const horairesAujourdhui = pharmacie.horaires[jourActuel];

    // Vérifier si la pharmacie est fermée ce jour-là
    if (!horairesAujourdhui || horairesAujourdhui.toLowerCase() === "fermé") {
        return "Fermé";
    }

    // Extraire les heures d'ouverture et de fermeture
    const [heureOuvertureStr, heureFermetureStr] = horairesAujourdhui.split('-');
    const [hOuverture, mOuverture] = heureOuvertureStr.split(':').map(Number);
    const [hFermeture, mFermeture] = heureFermetureStr.split(':').map(Number);

    const heureOuverture = hOuverture * 60 + mOuverture;
    const heureFermeture = hFermeture * 60 + mFermeture;

    // Comparer l'heure actuelle avec les horaires
    if (heureActuelle >= heureOuverture && heureActuelle < heureFermeture) {
        return "Ouvert";
    } else {
        return "Fermé";
    }
}


// --- IGNORE ---   
