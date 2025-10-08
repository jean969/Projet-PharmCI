// Encapsulation du code dans un objet pour éviter de polluer l'espace de noms global
const pharmacyApp = (() => {
    // Variables globales (maintenues à l'intérieur de cet objet)
    let currentPharmacies = [];
    let userLocation = null;
    const defaultData = []; // Tableau vide par défaut pour éviter les erreurs.

    // --- Fonctions d'initialisation et d'événements ---
    const init = () => {
        // Vérifier la disponibilité des données. Si elles ne sont pas présentes, utiliser un tableau par défaut.
        const data = typeof pharmaciesData !== 'undefined' ? pharmaciesData : defaultData;
        if (data.length === 0) {
            console.error('Les données des pharmacies ne sont pas disponibles. Assurez-vous que data.js est chargé.');
            return;
        }

        currentPharmacies = data;
        displayPharmacies(currentPharmacies);
        updateResultsCount(currentPharmacies.length);
        initializeCounters();
        setupEventListeners();
        getUserLocation();
    };

    const setupEventListeners = () => {
        const searchInput = document.getElementById('searchInput');
        if (searchInput) {
            searchInput.addEventListener('input', debounce(filterAndDisplayPharmacies, 300));
        }

        window.addEventListener('scroll', handleNavbarScroll);

        const filters = document.querySelectorAll('#cityFilter, #serviceFilter, #statusFilter, #gardeFilter');
        filters.forEach(filter => {
            filter.addEventListener('change', filterAndDisplayPharmacies);
        });
    };

    // --- Fonctions d'affichage et de rendu ---
    const displayPharmacies = (pharmacies) => {
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
                    ${pharmacies.map(createPharmacyCard).join('')}
                </div>
            `;
        }
        container.innerHTML = pharmaciesHTML;
    };

    const createPharmacyCard = (pharmacy) => {
        const status = getPharmacyStatus(pharmacy);
        const statusBadge = getStatusBadge(status);
        const statusClass = getPharmacyStatusClass(pharmacy);
        const todayHours = getTodayHours(pharmacy.hours);

        return `
            <div class="col-md-6 col-lg-4">
                <div class="pharmacy-card shadow-sm hover-effect ${statusClass}">
                    <div class="card-status-wrapper">
                        ${statusBadge}
                    </div><br>
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
                                <span class="fw-bold me-2">Aujourd'hui :</span>
                                <span>${todayHours}</span>
                            </div>
                        </div>

                        <div class="action-buttons d-flex gap-2 mt-4">
                            <button class="btn btn-primary flex-grow-1" onclick="pharmacyApp.showDirections('${pharmacy.coordinates.lat}', '${pharmacy.coordinates.lng}')">
                                <i class="fas fa-directions me-1"></i> Itinéraire
                            </button>
                            <button class="btn btn-outline-primary flex-grow-1" onclick="pharmacyApp.showPharmacyDetails('${pharmacy.id}')">
                                <i class="fas fa-info-circle me-1"></i> Détails
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        `;
    };

    const updateResultsCount = (count) => {
        const counter = document.getElementById('resultsCount');
        if (counter) {
            counter.textContent = `${count} pharmacie${count > 1 ? 's' : ''} trouvée${count > 1 ? 's' : ''}`;
        }
    };

    // --- Fonctions de filtrage et de recherche ---
    const filterAndDisplayPharmacies = () => {
        const data = typeof pharmaciesData !== 'undefined' ? pharmaciesData : defaultData;
        let results = [...data];
        const searchInput = document.getElementById('searchInput');
        const cityFilter = document.getElementById('cityFilter');
        const serviceFilter = document.getElementById('serviceFilter');
        const statusFilter = document.getElementById('statusFilter');
        const gardeFilter = document.getElementById('gardeFilter');
        
        const query = searchInput?.value.trim().toLowerCase() || '';
        const city = cityFilter?.value || '';
        const service = serviceFilter?.value || '';
        const status = statusFilter?.value || '';
        const isGarde = gardeFilter?.checked || false;

        // Appliquer la recherche par nom/adresse
        if (query) {
            results = results.filter(p =>
                p.name.toLowerCase().includes(query) || p.address.toLowerCase().includes(query)
            );
        }

        // Appliquer les filtres de sélection
        if (city) {
            results = results.filter(p => p.address.toLowerCase().includes(city.toLowerCase()));
        }
        if (service) {
            results = results.filter(p => p.services.includes(service));
        }
        if (status) {
            results = results.filter(p => getPharmacyStatus(p) === status);
        }
        if (isGarde) {
            results = results.filter(p => getPharmacyStatus(p) === 'garde');
        }
        currentPharmacies = results;
        displayPharmacies(currentPharmacies);
        updateResultsCount(currentPharmacies.length);
    };

    // --- Fonctions utilitaires ---
    const getPharmacyById = (id) => {
        const data = typeof pharmaciesData !== 'undefined' ? pharmaciesData : defaultData;
        return data.find(p => p.id == id);
    };
    
    // Correction de l'URL pour une navigation fiable
    const showDirections = (lat, lng) => {
        const url = `https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}`;
        window.open(url, '_blank');
    };

    const showPharmacyDetails = (id) => {
        const pharmacy = getPharmacyById(id);
        if (!pharmacy) return;

        const status = getPharmacyStatus(pharmacy);
        const modalContent = `
            <div class="card pharmacy-card shadow-sm p-3 mb-4 rounded-3">
                <div class="card-header bg-success text-white d-flex align-items-center justify-content-between">
                    <h6 class="mb-0">${pharmacy.name}</h6>
                </div>
                <div class="card-body">
                    <p class="mb-2">
                        <i class="fas fa-map-marker-alt text-primary"></i>
                        <strong> Adresse :</strong> ${pharmacy.address}
                    </p>
                    <p class="mb-2">
                        <i class="fas fa-phone text-success"></i>
                        <strong> Téléphone :</strong>
                        <a href="tel:${pharmacy.phone}" class="text-decoration-none text-dark">
                            ${pharmacy.phone}
                        </a>
                    </p>
                    <p class="mb-3">
                        <i class="fas fa-clock text-warning"></i>
                        <strong> Statut :</strong>
                        ${getStatusBadge(status)}
                    </p>
                    <div class="pharmacy-hours">
                        <h6 class="fw-bold mb-2"><i class="fas fa-calendar-alt text-info"></i> Horaires :</h6>
                        <ul class="list-group list-group-flush small">
                            <li class="list-group-item"><strong>Lundi :</strong> ${pharmacy.hours.lundi || 'Non spécifié'}</li>
                            <li class="list-group-item"><strong>Mardi :</strong> ${pharmacy.hours.mardi || 'Non spécifié'}</li>
                            <li class="list-group-item"><strong>Mercredi :</strong> ${pharmacy.hours.mercredi || 'Non spécifié'}</li>
                            <li class="list-group-item"><strong>Jeudi :</strong> ${pharmacy.hours.jeudi || 'Non spécifié'}</li>
                            <li class="list-group-item"><strong>Vendredi :</strong> ${pharmacy.hours.vendredi || 'Non spécifié'}</li>
                            <li class="list-group-item"><strong>Samedi :</strong> ${pharmacy.hours.samedi || 'Non spécifié'}</li>
                            <li class="list-group-item"><strong>Dimanche :</strong> ${pharmacy.hours.dimanche || 'Non spécifié'}</li>
                        </ul>
                    </div>
                </div>
                <div class="card-footer d-flex justify-content-between">
                    <button class="btn btn-primary" onclick="pharmacyApp.showDirections('${pharmacy.coordinates.lat}', '${pharmacy.coordinates.lng}')">
                        <i class="fas fa-directions"></i> Itinéraire
                    </button>
                    <a class="btn btn-success" href="tel:${pharmacy.phone}">
                        <i class="fas fa-phone"></i> Appeler
                    </a>
                </div>
            </div>
        `;
        showModal('Détails de la pharmacie', modalContent);
    };

    const showModal = (title, content) => {
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
        
        modal.querySelector('.modal-title').textContent = title;
        modal.querySelector('.modal-body').innerHTML = content;
        
        const bsModal = new bootstrap.Modal(modal);
        bsModal.show();
    };

    const getTodayHours = (hours) => {
        const days = ['dimanche', 'lundi', 'mardi', 'mercredi', 'jeudi', 'vendredi', 'samedi'];
        const today = new Date();
        const dayName = days[today.getDay()];
        return hours[dayName] || 'Non spécifié';
    };

    const getPharmacyStatus = (pharmacy) => {
        const now = new Date();
        const dayNames = ['dimanche', 'lundi', 'mardi', 'mercredi', 'jeudi', 'vendredi', 'samedi'];
        const today = dayNames[now.getDay()];
        const currentTimeInHours = now.getHours() + now.getMinutes() / 60;
        const todayHours = pharmacy.hours[today];

        // Gérer les cas où il n'y a pas d'horaires ou si elle est explicitement fermée
        if (!todayHours || todayHours.toLowerCase() === 'fermé') {
            return 'closed';
        }

        // Si la pharmacie est marquée "de garde" dans les données, c'est prioritaire
        if (pharmacy.isGarde) {
            return 'garde';
        }

        // Analyser et vérifier les horaires d'ouverture réguliers
        const [openTime, closeTime] = todayHours.split('-').map(t => {
            const [h, m] = t.split(':').map(Number);
            return h + (m || 0) / 60;
        });

        if (currentTimeInHours >= openTime && currentTimeInHours <= closeTime) {
            return 'open';
        }

        return 'closed';
    };

    const getPharmacyStatusClass = (pharmacy) => {
        const status = getPharmacyStatus(pharmacy);
        const classes = {
            'garde': 'pharmacy-card-garde',
            'open': 'pharmacy-card-open',
            'closed': 'pharmacy-card-closed'
        };
        return classes[status] || 'pharmacy-card-closed';
    };

    const getStatusBadge = (status) => {
        const badges = {
            open: '<span class="badge bg-success"><i class="fas fa-check-circle"></i> Ouvert</span>',
            closed: '<span class="badge bg-danger"><i class="fas fa-times-circle"></i> Fermé</span>',
            garde: '<span class="badge bg-warning"><i class="fas fa-shield-alt"></i> De garde</span>'
        };
        return badges[status] || badges.closed;
    };
    
    // Animation de compteur améliorée avec IntersectionObserver
    const initializeCounters = () => {
        const counters = document.querySelectorAll('.count-up');
        const observerOptions = {
            root: null,
            rootMargin: '0px',
            threshold: 0.5
        };

        const observer = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const counter = entry.target;
                    const target = +counter.getAttribute('data-target');
                    let currentCount = 0;
                    const increment = target / 200; // Vitesse de l'animation

                    const updateCount = () => {
                        currentCount += increment;
                        if (currentCount < target) {
                            counter.innerText = Math.ceil(currentCount);
                            requestAnimationFrame(updateCount);
                        } else {
                            counter.innerText = target;
                        }
                    };

                    updateCount();
                    observer.unobserve(counter); // Arrêter l'observation une fois l'animation terminée
                }
            });
        }, observerOptions);

        counters.forEach(counter => observer.observe(counter));
    };

    const handleNavbarScroll = () => {
        const navbar = document.querySelector('.navbar');
        if (navbar) {
            if (window.scrollY > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        }
    };

    const debounce = (func, wait) => {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    };

    const getUserLocation = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    userLocation = {
                        lat: position.coords.latitude,
                        lng: position.coords.longitude
                    };
                    
                    const nearby = getNearbyPharmacies(userLocation.lat, userLocation.lng);
                    if (nearby.length > 0) {
                        displayPharmacies(nearby);
                        updateResultsCount(nearby.length);
                    }
                },
                (error) => {
                    console.error("Erreur de géolocalisation:", error);
                    // On pourrait afficher un message à l'utilisateur ici
                }
            );
        }
    };

    const getNearbyPharmacies = (userLat, userLng) => {
        const data = typeof pharmaciesData !== 'undefined' ? pharmaciesData : defaultData;
        const pharmaciesWithDistance = data.map(pharmacy => {
            const distance = calculateDistance(userLat, userLng, pharmacy.coordinates.lat, pharmacy.coordinates.lng);
            return { ...pharmacy, distance };
        });
        
        return pharmaciesWithDistance.sort((a, b) => a.distance - b.distance);
    };

    const calculateDistance = (lat1, lon1, lat2, lon2) => {
        const R = 6371; // Rayon de la Terre en km
        const dLat = (lat2 - lat1) * Math.PI / 180;
        const dLon = (lon2 - lon1) * Math.PI / 180;
        const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
                  Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        return R * c;
    };

    // Exposer les fonctions publiques
    return {
        init,
        displayPharmacies,
        showPharmacyDetails,
        showDirections,
        filterAndDisplayPharmacies,
        getUserLocation,
    };
})();

// Fonction pour vérifier si une pharmacie est de garde
function isPharmacieDeGarde(horaires) {
  const aujourd_hui = new Date();
  const jourSemaine = aujourd_hui.getDay(); // 0 = Dimanche, 6 = Samedi
  
  // Vérifier si c'est samedi (6) ou dimanche (0)
  const estWeekend = jourSemaine === 0 || jourSemaine === 6;
  
  if (!estWeekend) {
    return false; // Pas de garde en semaine
  }
  
  const jourActuel = jourSemaine === 0 ? 'dimanche' : 'samedi';
  
  // Vérifier si la pharmacie a des horaires pour ce jour
  if (!horaires[jourActuel]) {
    return false;
  }
  
  // Si elle a des horaires pour ce jour, elle est de garde
  return horaires[jourActuel].ouvert;
}

// Fonction pour vérifier les horaires d'une pharmacie spécifique
function verifierPharmacieDeGarde(nomPharmacie, horaires) {
  const deGarde = isPharmacieDeGarde(horaires);
  
  console.log(`Pharmacie ${nomPharmacie}:`);
  console.log(deGarde ? "✅ DE GARDE" : "❌ Pas de garde");
  
  return deGarde;
}

// Exemples d'utilisation
const exemplesPharmacie = [
  {
    nom: "Pharmacie Central",
    horaires: {
      samedi: { ouvert: true, heures: "9h-18h" },
      dimanche: { ouvert: false }
    }
  },
  {
    nom: "Pharmacie du Soleil", 
    horaires: {
      samedi: { ouvert: true, heures: "9h-19h" },
      dimanche: { ouvert: true, heures: "9h-12h" }
    }
  },
  {
    nom: "Pharmacie de la Paix",
    horaires: {
      samedi: { ouvert: false },
      dimanche: { ouvert: false }
    }
  }
];

// Tester les pharmacies
console.log("=== VÉRIFICATION DES PHARMACIES DE GARDE ===");
console.log(`Aujourd'hui: ${new Date().toLocaleDateString('fr-FR', { weekday: 'long' })}`);
console.log("");

exemplesPharmacie.forEach(pharmacie => {
  verifierPharmacieDeGarde(pharmacie.nom, pharmacie.horaires);
  console.log("");
});

// Fonction utilitaire pour ajouter une nouvelle pharmacie
function ajouterPharmacie(nom, horairesSamedi, horairesDimanche) {
  return {
    nom: nom,
    horaires: {
      samedi: horairesSamedi,
      dimanche: horairesDimanche
    }
  };
}

// Exemple d'ajout d'une nouvelle pharmacie
const nouvellePharmacie = ajouterPharmacie(
  "Pharmacie de Garde Plus",
  { ouvert: true, heures: "8h-20h" },
  { ouvert: true, heures: "9h-17h" }
);

console.log("=== NOUVELLE PHARMACIE ===");
verifierPharmacieDeGarde(nouvellePharmacie.nom, nouvellePharmacie.horaires);


// Initialiser l'application une fois que le DOM est chargé
document.addEventListener('DOMContentLoaded', pharmacyApp.init);
