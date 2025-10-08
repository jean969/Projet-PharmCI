// Données des pharmacies pour PHARMCI

// Configuration globale
const CONFIG = {
    defaultImage: 'https://via.placeholder.com/300x200?text=Pharmacie',
    mapApiKey: 'YOUR_GOOGLE_MAPS_API_KEY',
    searchDebounceTime: 300,
    defaultRadius: 5000 // rayon de recherche en mètres
};

// Données des pharmacies
const pharmaciesData = [
    {
        id: 1,
        name: "Pharmacie Centrale d'Abidjan",
        address: "Boulevard de la République, Plateau, Abidjan",
        city: "Abidjan",
        phone: "+225 20 32 15 47",
        email: "contact@pharmaciecentrale.ci",
        coordinates: { lat: 5.3296, lng: -4.0226 },
        isGarde: false,
        services: ["consultation", "injection", "analyses"],
        hours: {
            lundi: "08:00-18:00",
            mardi: "08:00-18:00",
            mercredi: "08:00-18:00",
            jeudi: "08:00-18:00",
            vendredi: "08:00-18:00",
            samedi: "08:00-18:00",
            dimanche: "10:00-18:00"
        },
        description: "Pharmacie moderne située au cœur du Plateau, offrant tous les services pharmaceutiques.",
        rating: 4.5,
        specialties: ["Médicaments génériques", "Orthopédie", "Cosmétique"],
        director: "Dr. Kouassi Adjoua Marie"
    },
    {
        id: 2,
        name: "Pharmacie de la Paix",
        address: "Rue des Jardins, Cocody, Abidjan",
        city: "Abidjan",
        phone: "+225 27 22 45 78",
        email: "info@pharmaciepaix.ci",
        coordinates: { lat: 5.3556, lng: -3.9867 },
        isGarde: false,
        services: ["24h", "urgence", "injection"],
        hours: {
            lundi: "08:00-20:00",
            mardi: "08:00-20:00",
            mercredi: "08:00-20:00",
            jeudi: "08:00-20:00",
            vendredi: "08:00-20:00",
            samedi: "08:00-20:00",
            dimanche: "08:00-20:00"
        },
        description: "Pharmacie de garde disponible 24h/24 pour tous vos besoins urgents.",
        rating: 4.8,
        specialties: ["Urgences", "Pédiatrie", "Cardiologie"],
        director: "Dr. Bamba Seydou"
    },
    {
        id: 3,
        name: "Pharmacie Moderne",
        address: "Avenue Houphouët-Boigny, Marcory, Abidjan",
        city: "Abidjan",
        phone: "+225 21 35 62 89",
        email: "moderne@pharmci.ci",
        coordinates: { lat: 5.2878, lng: -3.9982 },
        isGarde: false,
        services: ["consultation", "analyses"],
        hours: {
            lundi: "07:30-19:30",
            mardi: "07:30-19:30",
            mercredi: "07:30-19:30",
            jeudi: "07:30-19:30",
            vendredi: "07:30-19:30",
            samedi: "08:00-17:00",
            dimanche: "Fermé"
        },
        description: "Pharmacie moderne avec équipements de pointe pour analyses médicales.",
        rating: 4.2,
        specialties: ["Analyses biologiques", "Dermatologie", "Nutrition"],
        director: "Dr. Traoré Fatou"
    },
    {
        id: 4,
        name: "Pharmacie Bouaké Centre",
        address: "Place du Marché, Centre-ville, Bouaké",
        city: "Bouaké",
        phone: "+225 31 63 25 14",
        email: "bouakecentre@pharmci.ci",
        coordinates: { lat: 7.6833, lng: -5.0300 },
        isGarde: false,
        services: ["consultation", "injection"],
        hours: {
            lundi: "08:00-19:00",
            mardi: "08:00-19:00",
            mercredi: "08:00-19:00",
            jeudi: "08:00-19:00",
            vendredi: "08:00-19:00",
            samedi: "08:00-16:00",
            dimanche: "09:00-15:00"
        },
        description: "Pharmacie située au centre de Bouaké, facilement accessible.",
        rating: 4.3,
        specialties: ["Médecine traditionnelle", "Gynécologie", "Ophtalmologie"],
        director: "Dr. Koné Mamadou"
    },
    {
        id: 5,
        name: "Pharmacie Yamoussoukro",
        address: "Boulevard Mamadou Coulibaly, Yamoussoukro",
        city: "Yamoussoukro",
        phone: "+225 30 64 18 25",
        email: "yamoussoukro@pharmci.ci",
        coordinates: { lat: 6.8206, lng: -5.2741 },
        isGarde: false,
        services: ["24h", "consultation", "injection", "analyses"],
        hours: {
            lundi: "08:00-20:00",
            mardi: "08:00-20:00",
            mercredi: "08:00-20:00",
            jeudi: "08:00-20:00",
            vendredi: "08:00-20:00",
            samedi: "08:00-20:00",
            dimanche: "08:00-20:00"
        },
        description: "Pharmacie de la capitale politique, service 24h/24.",
        rating: 4.6,
        specialties: ["Oncologie", "Rh24humatologie", "Psychiatrie"],
        director: "Dr. Ouattara Aïcha"
    },
    {
        id: 6,
        name: "Pharmacie du Nord",
        address: "Quartier Commerce, Korhogo",
        city: "Korhogo",
        phone: "+225 36 86 29 37",
        email: "nord@pharmci.ci",
        coordinates: { lat: 9.4582, lng: -5.6296 },
        isGarde: false,
        services: ["consultation", "injection"],
        hours: {
            lundi: "08:00-18:00",
            mardi: "08:00-18:00",
            mercredi: "08:00-18:00",
            jeudi: "08:00-18:00",
            vendredi: "08:00-18:00",
            samedi: "08:00-15:00",
            dimanche: "Fermé"
        },
        description: "Pharmacie desservant la région Nord de la Côte d'Ivoire.",
        rating: 4.1,
        specialties: ["Médecine tropicale", "Pédiatrie", "Vaccination"],
        director: "Dr. Silué Ibrahim"
    },
    {
        id: 7,
        name: "Pharmacie des Deux Plateaux",
        address: "Rue K127, Deux Plateaux, Abidjan",
        city: "Abidjan",
        phone: "+225 27 22 83 64",
        email: "deuxplateaux@pharmci.ci",
        coordinates: { lat: 5.3727, lng: -3.9902 },
        isGarde: false,
        services: ["consultation", "injection", "analyses"],
        hours: {
            lundi: "08:00-20:00",
            mardi: "08:00-20:00",
            mercredi: "08:00-20:00",
            jeudi: "08:00-20:00",
            vendredi: "08:00-20:00",
            samedi: "08:00-18:00",
            dimanche: "10:00-16:00"
        },
        description: "Pharmacie moderne dans le quartier résidentiel des Deux Plateaux.",
        rating: 4.4,
        specialties: ["Cosmétique", "Nutrition sportive", "Homéopathie"],
        director: "Dr. Yao Akissi Brigitte"
    },
    {
        id: 8,
        name: "Pharmacie Express",
        address: "Zone 4C, Marcory, Abidjan",
        city: "Abidjan",
        phone: "+225 21 26 74 15",
        email: "express@pharmci.ci",
        coordinates: { lat: 5.2756, lng: -4.0156 },
        isGarde: false,
        services: ["24h", "urgence", "injection"],
        hours: {
            lundi: "08:00-20:00",
            mardi: "08:00-20:00",
            mercredi: "08:00-20:00",
            jeudi: "08:00-20:00",
            vendredi: "08:00-20:00",
            samedi: "08:00-18:00",
            dimanche: "10:00-16:00"
        },
        description: "Service express 24h/24 pour tous vos besoins pharmaceutiques urgents.",
        rating: 4.7,
        specialties: ["Urgences", "Soins intensifs", "Réanimation"],
        director: "Dr. Diabaté Moussa"
    },
    {
        id: 9,
        name: "Pharmacie Vridi Palm-Beach ",
        address: "Vridi, Port-Bouêt, Abidjan",
        city: "Abidjan",
        phone: "+225 21 26 74 15",
        email: "palmbeach@pharmci.ci",
        coordinates: { lat: 5.258630352507231, lng: -3.9820000178291464 },
        isGarde: false,
        services: ["24h", "urgence", "injection"],
        hours: {
            lundi: "08:00-20:00",
            mardi: "08:00-20:00",
            mercredi: "08:00-20:00",
            jeudi: "08:00-20:00",
            vendredi: "08:00-20:00",
            samedi: "08:00-18:00",
            dimanche: "10:00-16:00"
        },
        description: "Service express 24h/24 pour tous vos besoins pharmaceutiques urgents.",
        rating: 4.7,
        specialties: ["Urgences", "Soins intensifs", "Réanimation"],
        director: "Dr. Tuan Liliane Epse Aka"
    },
    {
        id: 10,
        name: "Pharmacie Wharf Sarl",
        address: "centre, Port-Bouêt, Abidjan",
        city: "Abidjan",
        phone: "+225 07 57 24 12 56",
        email: "wharfsarl@pharmci.ci",
        coordinates: { lat: 5.253759581240701, lng: -3.942855578051957 },
        isGarde: false,
        services: ["24h", "urgence", "injection"],
        hours: {
            lundi: "08:00-20:00",
            mardi: "08:00-20:00",
            mercredi: "08:00-20:00",
            jeudi: "08:00-20:00",
            vendredi: "08:00-20:00",
            samedi: "08:00-18:00",
            dimanche: "10:00-16:00"
        },
        description: "Service express 24h/24 pour tous vos besoins pharmaceutiques urgents.",
        rating: 4.7,
        specialties: ["Urgences", "Soins intensifs", "Réanimation"],
        director: "Dr. Seke Attey Mboya Armelle"
    },
    {
        id: 11,
        name: "Pharmacie du Phare",
        address: "centre, Port-Bouêt, Abidjan",
        city: "Abidjan",
        phone: "+225 27 24 32 85 58",
        email: "pharmaciephare@pharmci.ci",
        coordinates: { lat: 5.254498863409115, lng: -3.958522278018503 },
        isGarde: false,
        services: ["24h", "urgence", "injection"],
        hours: {
            lundi: "08:00-19:30",
            mardi: "08:00-19:30",
            mercredi: "08:00-19:30",
            jeudi: "08:00-19:30",
            vendredi: "08:00-19:30",
            samedi: "08:00-19:30",
            dimanche: "Fermé"
        },
        description: "Service express 24h/24 pour tous vos besoins pharmaceutiques urgents.",
        rating: 4.7,
        specialties: ["Urgences", "Soins intensifs", "Réanimation"],
        director: "Dr.Angofi Marie-Ange "
    },
    {
        id: 12,
        name: "Pharmacie du Pont D'anoumabo",
        address: "Anoumabo, Marcory, Abidjan",
        city: "Abidjan",
        phone: "+225 27 21 26 15 11",
        email: "express@pharmci.ci",
        coordinates: { lat: 5.308690855369813, lng: -3.975938977621008 },
        isGarde: false,
        services: ["24h", "urgence", "injection"],
        hours: {
            lundi: "08:00-20:00",
            mardi: "08:00-20:00",
            mercredi: "08:00-20:00",
            jeudi: "08:00-20:00",
            vendredi: "08:00-20:00",
            samedi: "08:00-18:00",
            dimanche: "10:00-16:00"
        },
        description: "Service express 24h/24 pour tous vos besoins pharmaceutiques urgents.",
        rating: 4.7,
        specialties: ["Urgences", "Soins intensifs", "Réanimation"],
        director: "Dr.Kple Ahoure Limi Alexandre"
    },
    {
        id: 13,
        name: "Pharmacie des Lagunes",
        address: "Rue de la Paix, Face à la station Shell - Résidentiel, Marcory, Abidjan",
        city: "Abidjan",
        phone: "+225 27 21 26 12 40",
        email: "express@pharmci.ci",
        coordinates: { lat: 5.309231593855678, lng: -3.995218945790826 },
        isGarde: false,
        services: ["24h", "urgence", "injection"],
        hours: {
            lundi: "08:00-20:00",
            mardi: "08:00-20:00",
            mercredi: "08:00-20:00",
            jeudi: "08:00-20:00",
            vendredi: "08:00-20:00",
            samedi: "08:00-18:00",
            dimanche: "10:00-16:00"
        },
        description: "Service express 24h/24 pour tous vos besoins pharmaceutiques urgents.",
        rating: 4.7,
        specialties: ["Urgences", "Soins intensifs", "Réanimation"],
        director: "Dr.Ajami Akil Tarek"
    },
    {
        id: 14,
        name: "Pharmacie Fanny",
        address: "Terminus Bus 05 et 32 - Aklomiabla, Koumassi, Abidjan",
        city: "Abidjan",
        phone: "+225 07 89 23 66 82",
        email: "express@pharmci.ci",
        coordinates: { lat: 5.314947111426758, lng: -3.9476434003131655 },
        isGarde: false,
        services: ["24h", "urgence", "injection"],
        hours: {
            lundi: "08:00-20:00",
            mardi: "08:00-20:00",
            mercredi: "08:00-20:00",
            jeudi: "08:00-20:00",
            vendredi: "08:00-20:00",
            samedi: "08:00-18:00",
            dimanche: "10:00-16:00"
        },
        description: "Service express 24h/24 pour tous vos besoins pharmaceutiques urgents.",
        rating: 4.7,
        specialties: ["Urgences", "Soins intensifs", "Réanimation"],
        director: "Dr.Fanny Mama Toure "
    },
    {
        id: 15,
        name: "Pharmacie Prodomo",
        address: "Après Terrain Inch'allah, Carrefour Sopim-Prodomo 1,Koumassi, Abidjan",
        city: "Abidjan",
        phone: "+225 07 77 30 80 36",
        email: "prodomo@pharmci.ci",
        coordinates: { lat: 5.299337606392851, lng: -3.9529381754985886 },
        isGarde: false,
        services: ["24h", "urgence", "injection"],
        hours: {
            lundi: "08:00-20:00",
            mardi: "08:00-20:00",
            mercredi: "08:00-20:00",
            jeudi: "08:00-20:00",
            vendredi: "08:00-20:00",
            samedi: "08:00-20:00",
            dimanche: "Fermé"
        },
        description: "Service express 24h/24 pour tous vos besoins pharmaceutiques urgents.",
        rating: 4.7,
        specialties: ["Urgences", "Soins intensifs", "Réanimation"],
        director: "Dr.Oyourou Sophie" 
    },
    {
        id: 16,
        name: "Pharmacie M'pike",
        address: "Derrière la Mairie - Sicogi 1, Koumassi, Abidjan",
        city: "Abidjan",
        phone: "+225 27 21 36 25 75",
        email: "mpike@pharmci.ci",
        coordinates: { lat: 5.293035036247184, lng: -3.9685878004622523 },
        isGarde: false,
        services: ["24h", "urgence", "injection"],
        hours: {
            lundi: "08:00-20:00",
            mardi: "08:00-20:00",
            mercredi: "08:00-20:00",
            jeudi: "08:00-20:00",
            vendredi: "08:00-20:00",
            samedi: "08:00-18:00",
            dimanche: "10:00-16:00"
        },
        description: "Service express 24h/24 pour tous vos besoins pharmaceutiques urgents.",
        rating: 4.7,
        specialties: ["Urgences", "Soins intensifs", "Réanimation"],
        director: "Dr. Kouassi Nogbou Catherine"
    },
    {
        id: 17,
        name: "Pharmacie St George",
        address: "Près du Camp Commando - Sicogi 1, Koumassi, Abidjan",
        city: "Abidjan",
        phone: "+225 27 21 36 03 75",
        email: "stgeorge@pharmci.ci",
        coordinates: { lat: 5.290987730811988, lng: -3.9622523323266923},
        isGarde: false,
        services: ["24h", "urgence", "injection"],
        hours: {
            lundi: "08:00-20:00",
            mardi: "08:00-20:00",
            mercredi: "08:00-20:00",
            jeudi: "08:00-20:00",
            vendredi: "08:00-20:00",
            samedi: "08:00-18:00",
            dimanche: "10:00-16:00"
        },
        description: "Service express 24h/24 pour tous vos besoins pharmaceutiques urgents.",
        rating: 4.7,
        specialties: ["Urgences", "Soins intensifs", "Réanimation"],
        director: "Dr.Lokrou Martial"
    },
    {
        id: 18,
        name: "Pharmacie Des Pavillon",
        address: "Rue des Jardins, deux-plateaux-Vallon, Cocody, Abidjan",
        city: "Abidjan",
        phone: "+225 27 22 41 35 14",
        email: "pavillon@pharmci.ci",
        coordinates: { lat: 5.361955176977873, lng: -3.9879076480206717 },
        isGarde: false,
        services: ["24h", "urgence", "injection"],
        hours: {
            lundi: "08:00-20:00",
            mardi: "08:00-20:00",
            mercredi: "08:00-20:00",
            jeudi: "08:00-20:00",
            vendredi: "08:00-20:00",
            samedi: "08:00-18:00",
            dimanche: "10:00-16:00"
        },
        description: "Service express 24h/24 pour tous vos besoins pharmaceutiques urgents.",
        rating: 4.7,
        specialties: ["Urgences", "Soins intensifs", "Réanimation"],
        director: "Dr. Diaha Christiane"
    },
    {
        id: 19,
        name: "Pharmacie 7eme Tranche",
        address: "Rue L84-L139, II Plateaux, 7è tranche - Cocody, Cocody, Abidjan",
        city: "Abidjan",
        phone: "+225 27 22 52 55 83",
        email: "pavillon@pharmci.ci",
        coordinates: { lat: 5.393908383530141, lng: -3.9881163769703427 },
        isGarde: false,
        services: ["24h", "urgence", "injection"],
        hours: {
            lundi: "08:00-20:00",
            mardi: "08:00-20:00",
            mercredi: "08:00-20:00",
            jeudi: "08:00-20:00",
            vendredi: "08:00-20:00",
            samedi: "08:00-18:00",
            dimanche: "10:00-16:00"
        },
        description: "Service express 24h/24 pour tous vos besoins pharmaceutiques urgents.",
        rating: 4.7,
        specialties: ["Urgences", "Soins intensifs", "Réanimation"],
        director: "Dr. Dayato-Azan Comoe Pascale"
    },
    {
        id: 20,
        name: "Pharmacie des 220 logements",
        address: "Avenue Houphouet,Yamoussoukro",
        city: "Yamoussoukro",
        phone: "+225 27 22 52 56 83",
        email: "22àlgts@pharmci.ci",
        coordinates: { lat: 6.813258850288741, lng: -5.264771319399763 },
        isGarde: false,
        services: ["24h", "urgence", "injection"],
        hours: {
            lundi: "07:30-20:00",
            mardi: "07:30-20:00",
            mercredi: "07:30-20:00",
            jeudi: "07:30-20:00",
            vendredi: "07:30-20:00",
            samedi: "07:30-20:00",
            dimanche: "Fermé"
        },
        description: "Service express 24h/24 pour tous vos besoins pharmaceutiques urgents.",
        rating: 4.7,
        specialties: ["Urgences", "Soins intensifs", "Réanimation"],
        director: "Dr. Yao Akissi Brigitte"
    },
    {
        id: 21,
        name: "Pharmacie Elif groupe",
        address: "Yopougon, Abidjan",
        city: "Abidjan",
        phone: "+225 27 22 52 56 40",
        email: "elifgroupe.com",
        coordinates: { lat: 5.316149, lng: -4.0879446 },
        isGarde: false,
        services: ["24h", "urgence", "injection"],
        hours: {
            lundi: "08:30-17:00",
            mardi: "08:30-17:00",
            mercredi: "08:30-17:00",
            jeudi: "08:30-17:00",
            vendredi: "08:30-17:00",
            samedi: "Fermé",
            dimanche: "Fermé"
        },
        description: "Service express 24h/24 pour tous vos besoins pharmaceutiques urgents.",
        rating: 4.7,
        specialties: ["Urgences", "Soins intensifs", "Réanimation"],
        director: "Dr. kouassi Adjoua Marie"
    },
    {
        id: 22,
        name: "Pharmacie Bel'FAM",
        address: " Av. Crosson Duplessis, en face de MTN Plateau , Abidjan",
        city: "Abidjan",
        phone: "+225 27 20 33 03 30",
        email: "bel@pharmci.ci",
        coordinates: { lat: 5.3197086, lng: -4.0131452 },
        isGarde: false,
        services: ["24h", "urgence", "injection"],
        hours: {
            lundi: "07:30-18:00",
            mardi: "07:30-18:00",
            mercredi: "07:30-18:00",
            jeudi: "07:30-18:00",
            vendredi: "07:30-18:00",
            samedi: "Fermé",
            dimanche: "Fermé"
        },
        description: "Service express 24h/24 pour tous vos besoins pharmaceutiques urgents.",
        rating: 4.7,
        specialties: ["Urgences", "Soins intensifs", "Réanimation"],
        director: "Dr. Gbagnon Kouadio"
    },
    {
        id: 23,
        name: "Pharmacie de l'Autoroute",
        address: "Gesco Terminus de Bus 34, Yopougon, Abidjan",
        city: "Abidjan",
        phone: "+225 27 23 52 61 75",
        email: "autoroute@pharmci.ci",
        coordinates: { lat: 5.3670556, lng: -4.1019192 },
        isGarde: false,
        services: ["24h", "urgence", "injection"],
        hours: {
            lundi: "07:30-20:00",
            mardi: "07:30-20:00",
            mercredi: "07:30-20:00",
            jeudi: "07:30-20:00",
            vendredi: "07:30-20:00",
            samedi: "07:30-20:00",
            dimanche: "Fermé"
        },
        description: "Service express 24h/24 pour tous vos besoins pharmaceutiques urgents.",
        rating: 4.7,
        specialties: ["Urgences", "Soins intensifs", "Réanimation"],
        director: "Dr. Paulin Kouadio"
    },
    {
        id: 24,
        name: "Pharmacie des Lacs",
        address: "koumassi foyer des jeunes pres de l’eglise st etienne, Abidjan",
        city: "Abidjan",
        phone: "+225 27 21 28 56 24",
        email: "lacs@pharmci.ci",
        coordinates: { lat:5.2901992, lng: -3.9624834 },
        isGarde: false,
        services: ["24h", "urgence", "injection"],
        hours: {
            lundi: "07:30-20:00",
            mardi: "07:30-20:00",
            mercredi: "07:30-20:00",
            jeudi: "07:30-20:00",
            vendredi: "07:30-20:00",
            samedi: "07:30-20:00",
            dimanche: "Fermé"
        },
        description: "Service express 24h/24 pour tous vos besoins pharmaceutiques urgents.",
        rating: 4.7,
        specialties: ["Urgences", "Soins intensifs", "Réanimation"],
        director: "Dr.  Traoré Fatou"
    },

    {
        id: 25,
        name: "Pharmacie palais de justice korhogo",
        address: "Korhogo Résidentiel près du CHR Korhogo",
        city: "Korhogo",
        phone: "+225 07 87 70 20 33",
        email: "lacs@pharmci.ci",
        coordinates: { lat:9.580682729410906, lng: -5.603841787888383 },
        isGarde: false,
        services: ["24h", "urgence", "injection"],
        hours: {
            lundi: "08:00-20:00",
            mardi: "08:00-20:00",
            mercredi: "08:00-20:00",
            jeudi: "08:00-20:00",
            vendredi: "08:00-20:00",
            samedi: "08:00-12:00",
            dimanche: "Fermé"
        },
        description: "Service express 24h/24 pour tous vos besoins pharmaceutiques urgents.",
        rating: 4.7,
        specialties: ["Urgences", "Soins intensifs", "Réanimation"],
        director: "Dr. Silue Ibrahim"
    },

    {
        id: 26,
        name: "Pharmacie De La Grande Mosquee",
        address: "Korhogo en face de la grande mosquée Korhogo",
        city: "Korhogo",
        phone: " +225 27 36 86 06 40",
        email: "lacs@pharmci.ci",
        coordinates: { lat:9.46370923775863, lng:-5.636767157710625 },
        isGarde: false,
        services: ["24h", "urgence", "injection"],
        hours: {
            lundi: "08:00-20:00",
            mardi: "08:00-20:00",
            mercredi: "08:00-20:00",
            jeudi: "08:00-20:00",
            vendredi: "08:00-20:00",
            samedi: "08:00-12:00",
            dimanche: "Fermé"
        },
        description: "Service express 24h/24 pour tous vos besoins pharmaceutiques urgents.",
        rating: 4.7,
        specialties: ["Urgences", "Soins intensifs", "Réanimation"],
        director: "Dr.zoumana Coulibaly"
    },

    {
        id: 27,
        name: "Pharmacie Soba",
        address: "Korhogo quartier Soba",
        city: "Korhogo",
        phone: "+225 07 07 51 56 53",
        email: "lacs@pharmci.ci",
        coordinates: { lat:5.2901992, lng: -3.9624834 },
        isGarde: false,
        services: ["24h", "urgence", "injection"],
        hours: {
            lundi: "08:00-20:00",
            mardi: "08:00-20:00",
            mercredi: "08:00-20:00",
            jeudi: "08:00-20:00",
            vendredi: "08:00-20:00",
            samedi: "08:00-12:00",
            dimanche: "Fermé"
        },
        description: "Service express 24h/24 pour tous vos besoins pharmaceutiques urgents.",
        rating: 4.7,
        specialties: ["Urgences", "Soins intensifs", "Réanimation"],
        director: "Dr.  Traoré Fatou"
    },
    {
        id: 28,
        name: "Pharmacie Notre Dame de la Paix",
        address: "En face de la gare UTB, Grand Marché, Bouaké",
        city: "Bouaké",
        phone: "+225 27 31 64 85 85",
        email: "lacs@pharmci.ci",
        coordinates: { lat:7.692872148512681, lng:-5.024714201938622 },
        isGarde: false,
        services: ["24h", "urgence", "injection"],
        hours: {
            lundi: "07:30-20:00",
            mardi: "07:30-20:00",
            mercredi: "07:30-20:00",
            jeudi: "07:30-20:00",
            vendredi: "07:30-20:00",
            samedi: "07:30-12:30",
            dimanche: "Fermé"
        },
        description: "Service express 24h/24 pour tous vos besoins pharmaceutiques urgents.",
        rating: 4.7,
        specialties: ["Urgences", "Soins intensifs", "Réanimation"],
        director: "Dr. fatou kouame"
    },
    {
        id: 29,
        name: "Pharmacie du commerce Kodjo",
        address: "En face du Centre commercial, Grand Marché, Bouaké",
        city: "Bouaké",
        phone: "+225  27 31 63 35 73",
        email: "lacs@pharmci.ci",
        coordinates: { lat:7.68783244978325, lng: -5.027817247504899 },
        isGarde: false,
        services: ["24h", "urgence", "injection"],
        hours: {
            lundi: "07:30-19:15",
            mardi: "07:30-19:15",
            mercredi: "07:30-19:15",
            jeudi: "07:30-19:15",
            vendredi: "07:30-19:15",
            samedi: "07:30-13:00",
            dimanche: "Fermé"
        },
        description: "Service express 24h/24 pour tous vos besoins pharmaceutiques urgents.",
        rating: 4.7,
        specialties: ["Urgences", "Soins intensifs", "Réanimation"],
        director: "Dr. Yao Akissi Brigitte"
    },
    {
        id: 30,
        name: "Pharmacie Sanitas",
        address: "Habitat en face du Collège Konan, Yamoussoukro",
        city: "Yamoussoukro",
        phone: "+225 27 30 64 33 45",
        email: "lacs@pharmci.ci",
        coordinates: { lat:6.825237455865216, lng:-5.2770730794429594 },
        isGarde: false,
        services: ["24h", "urgence", "injection"],
        hours: {
            lundi: "09:00-18:00",
            mardi: "09:00-18:00",
            mercredi: "09:00-18:00",
            jeudi: "09:00-18:00",
            vendredi: "09:00-18:00",
            samedi: "09:00-17:00",
            dimanche: "Fermé"
        },
        description: "Service express 24h/24 pour tous vos besoins pharmaceutiques urgents.",
        rating: 4.7,
        specialties: ["Urgences", "Soins intensifs", "Réanimation"],
        director: "Dr. Kouadio Ahoua Rosine"
    },
    
    
      
];

//Structures de données supplémentaires
const cities = [
    { value: "Abidjan", name: "Abidjan", region: "Lagunes" },
    { value: "Bouak2", name: "Bouaké", region: "Gbêkê" },
    { value: "Yamoussoukro", name: "Yamoussoukro", region: "Lacs" },
    { value: "Korhogo", name: "Korhogo", region: "Poro" }
];

const services = [
    { value: "24h", name: "24h/24", icon: "fas fa-clock" },
    { value: "consultation", name: "Consultation", icon: "fas fa-user-md" },
    { value: "injection", name: "Injection", icon: "fas fa-syringe" },
    { value: "analyses", name: "Analyses", icon: "fas fa-microscope" },
    { value: "urgence", name: "Urgence", icon: "fas fa-ambulance" }
];

const statusLabels = {
    open: { text: "Ouverte", class: "status-open", icon: "fas fa-check-circle" },
    closed: { text: "Fermée", class: "status-closed", icon: "fas fa-times-circle" },
    garde: { text: "De garde", class: "status-garde", icon: "fas fa-shield-alt" }
};

// Fonction pour obtenir les horaires d'aujourd'hui
function getTodayHours(hours) {
    const dayNames = ['dimanche', 'lundi', 'mardi', 'mercredi', 'jeudi', 'vendredi', 'samedi'];
    const today = dayNames[new Date().getDay()];
    const todayHours = hours[today];
    return todayHours || 'Non spécifié';
}

