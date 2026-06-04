// lpft_storage.js - LocalStorage Database Engine for Single User

// CRITICAL: Synchronized with purchasing page key to prevent profile load errors
const DEFAULT_STORAGE_KEY = "lpf_airline_db";

// Initial starting state structure
const defaultState = {
    airlineName: "Global Air Logistics",
    icao: "GAL",
    hub: "MDPC",
    mode: "admiral",
    balance: 5000000,
    stats: {
        totalFlights: 0,
        flightTimeHours: 0,
        flightTimeMinutes: 0,
        airmiles: 0,
        avgLandingRate: 0,
        activeSchedules: 0,
        crewCount: 0,
        fleetCount: 1
    },
    fleet: [
        {
            id: "c208",
            model: "Cessna Caravan 208B",
            registration: "GAL-101",
            purchasedOn: new Date().toISOString().split('T')[0],
            status: "Available"
        }
    ],
    flightLogs: [], // Array to hold completed flight objects
    topRoutes: []   // Array to hold calculated high-yield sectors
};

/**
 * Initialize or fetch storage matrix
 * @returns {Object} Current database state
 */
function loadDatabase() {
    let localData = localStorage.getItem(DEFAULT_STORAGE_KEY);
    if (!localData) {
        // If empty, commit defaultState to browser storage
        localStorage.setItem(DEFAULT_STORAGE_KEY, JSON.stringify(defaultState));
        return defaultState;
    }
    return JSON.parse(localData);
}

/**
 * Save current operational state back to browser storage
 * @param {Object} dataObject - The updated database structure
 */
function saveDatabase(dataObject) {
    // Dynamically maintain fleetCount statistic based on active array size
    if (dataObject && dataObject.fleet && dataObject.stats) {
        dataObject.stats.fleetCount = dataObject.fleet.length;
    }
    localStorage.setItem(DEFAULT_STORAGE_KEY, JSON.stringify(dataObject));
}

/**
 * Helper to determine mode capital limits dynamically
 * @param {string} mode - Selected difficulty tiered mode
 * @returns {number} Initial starting liquid cash balance
 */
function getStartingCapital(mode) {
    switch(mode) {
        case 'regional': return 50000;       
        case 'admiral':  return 5000000;     
        case 'tycoon':   return 150000000;   
        default:         return 5000000;
    }
}