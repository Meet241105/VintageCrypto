const API_BASE_URL = 'https://api.coingecko.com/api/v3';

export async function fetchCryptoData(limit = 20) {
    try {
        const response = await fetch(
            `${API_BASE_URL}/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=${limit}&page=1&sparkline=false`
        );
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return await response.json();
    } catch (error) {
        console.error('Error fetching crypto data:', error);
        throw error;
    }
}

export async function searchCrypto(query) {
    try {
        const response = await fetch(`${API_BASE_URL}/search?query=${query}`);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return await response.json();
    } catch (error) {
        console.error('Error searching crypto:', error);
        throw error;
    }
}