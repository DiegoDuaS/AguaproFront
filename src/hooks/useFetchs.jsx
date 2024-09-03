const API_URL = 'https://aguapro-back-git-main-villafuerte-mas-projects.vercel.app'; // Replace with your actual API URL

// Helper function to make API requests
const fetchFromAPI = async (endpoint, options = {}) => {
    try {
        const response = await fetch(`${API_URL}${endpoint}`, options);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    } catch (error) {
        console.error('API Error:', error);
        throw error;
    }
};

// Functions for API calls
export const getSizeIndex = async (minGpm, maxGpm, range) => {
    try {
        // Fetch data from the API
        const response = await fetchFromAPI('/size');
        
        // Access the data array from the response
        const sizes = response.data;
        
        // Ensure sizes is an array
        if (!Array.isArray(sizes)) {
            throw new Error('Expected an array from /size');
        }

        // Find the matching size object
        const size = sizes.find(s => s.min_gpm === minGpm && s.max_gpm === maxGpm && s.range === range);
        
        if (size) {
            return size.size; // Adjusted to return the correct field
        }

        // If no matching size, create a new one
        const newSize = await fetchFromAPI('/size', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ min_gpm: minGpm, max_gpm: maxGpm, range })
        });

        // Return the new size's ID
        return newSize.size; // Adjusted to return the correct field
    } catch (error) {
        console.error('Error in getSizeIndex:', error);
        throw error;
    }
};


export const getEnergiaIndex = async (minHp, maxHp, capacitor) => {
    try {
        // Fetch data from the API
        const response = await fetchFromAPI('/energia');
        
        // Access the data array from the response
        const energias = response.data;
        
        // Ensure energias is an array
        if (!Array.isArray(energias)) {
            throw new Error('Expected an array from /energia');
        }

        // Find the matching energia object
        const energia = energias.find(e => e.min_hp === minHp && e.max_hp === maxHp && e.capacitor === capacitor);
        
        if (energia) {
            return energia.energia; // Adjusted to return the correct field
        }

        // If no matching energia, create a new one
        const newEnergia = await fetchFromAPI('/energia', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ min_hp: minHp, max_hp: maxHp, capacitor })
        });

        // Return the new energia's ID
        return newEnergia.energia; // Adjusted to return the correct field
    } catch (error) {
        console.error('Error in getEnergiaIndex:', error);
        throw error;
    }
};


export const getCondicionesIndex = async (temperaturaLiquidaMin, temperaturaLiquidaMax, temperaturaAmbiente, presion) => {
    try {
        // Fetch data from the API
        const response = await fetchFromAPI('/condiciones');
        
        // Access the data array from the response
        const condiciones = response.data;
        
        // Ensure condiciones is an array
        if (!Array.isArray(condiciones)) {
            throw new Error('Expected an array from /condiciones');
        }

        // Find the matching condition object
        const condicion = condiciones.find(c =>
            c.temperatura_liquida_min === temperaturaLiquidaMin &&
            c.temperatura_liquida_max === temperaturaLiquidaMax &&
            c.temperatura_ambiente === temperaturaAmbiente &&
            c.presion === presion
        );
        
        if (condicion) {
            return condicion.condiciones; // Adjusted to return the correct field
        }

        // If no matching condition, create a new one
        const newCondicion = await fetchFromAPI('/condiciones', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ temperatura_liquida_min: temperaturaLiquidaMin, temperatura_liquida_max: temperaturaLiquidaMax, temperatura_ambiente: temperaturaAmbiente, presion })
        });

        // Return the new condicion's ID
        return newCondicion.condiciones; // Adjusted to return the correct field
    } catch (error) {
        console.error('Error in getCondicionesIndex:', error);
        throw error;
    }
};


export const getTipoIndex = async (tipoProducto) => {
    try {
        // Fetch data from the API
        const response = await fetchFromAPI('/tipos_producto');
        
        // Access the data array from the response
        const tipos = response.data;
        
        // Ensure tipos is an array
        if (!Array.isArray(tipos)) {
            throw new Error('Expected an array from /tipos_producto');
        }

        // Find the matching type object
        const tipo = tipos.find(t => t.nombre === tipoProducto);
        
        if (tipo) {
            return tipo.id_tipo; // Adjusted to return the correct field
        }

        // If no matching type, create a new one
        const newTipo = await fetchFromAPI('/tipos_producto', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ tipo: tipoProducto })
        });

        // Return the new tipo's ID
        return newTipo.id_tipo; // Adjusted to return the correct field
    } catch (error) {
        console.error('Error in getTipoIndex:', error);
        throw error;
    }
};

