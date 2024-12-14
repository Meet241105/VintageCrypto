import { formatPrice, formatPercentage } from './utils.js';

export function createCryptoCard(crypto) {
    const card = document.createElement('div');
    card.className = 'crypto-card';
    
    const priceChange = crypto.price_change_percentage_24h;
    const changeClass = priceChange >= 0 ? 'positive' : 'negative';
    
    card.innerHTML = `
        <h2 class="retro-text">${crypto.name} (${crypto.symbol.toUpperCase()})</h2>
        <div class="price">${formatPrice(crypto.current_price)}</div>
        <div class="change ${changeClass}">
            ${formatPercentage(priceChange)}
        </div>
        <div>Market Cap: ${formatPrice(crypto.market_cap)}</div>
        <div>24h Volume: ${formatPrice(crypto.total_volume)}</div>
    `;
    
    return card;
}

export function showLoading() {
    const grid = document.querySelector('.crypto-grid');
    grid.innerHTML = '<div class="loading"></div>';
}

export function showError(message) {
    const grid = document.querySelector('.crypto-grid');
    grid.innerHTML = `<div class="error">${message}</div>`;
}