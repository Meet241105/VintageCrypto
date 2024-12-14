import { fetchCryptoData, searchCrypto } from './api.js';
import { createCryptoCard, showLoading, showError } from './ui.js';
import { debounce } from './utils.js';

class CryptoTracker {
    constructor() {
        this.cryptoGrid = document.querySelector('.crypto-grid');
        this.searchInput = document.querySelector('.search-input');
        this.initialize();
    }

    async initialize() {
        this.setupEventListeners();
        await this.loadCryptoData();
        this.startAutoRefresh();
    }

    setupEventListeners() {
        this.searchInput.addEventListener('input', 
            debounce(() => this.handleSearch(), 500)
        );
    }

    async loadCryptoData() {
        try {
            showLoading();
            const data = await fetchCryptoData();
            this.renderCryptoCards(data);
        } catch (error) {
            showError('Failed to load cryptocurrency data. Please try again later.');
        }
    }

    renderCryptoCards(cryptoData) {
        this.cryptoGrid.innerHTML = '';
        cryptoData.forEach(crypto => {
            const card = createCryptoCard(crypto);
            this.cryptoGrid.appendChild(card);
        });
    }

    async handleSearch() {
        const query = this.searchInput.value.trim();
        if (!query) {
            await this.loadCryptoData();
            return;
        }

        try {
            showLoading();
            const { coins } = await searchCrypto(query);
            const filteredCoins = coins.slice(0, 20);
            const detailedData = await fetchCryptoData(20);
            
            const matchedCoins = detailedData.filter(coin => 
                filteredCoins.some(searchCoin => searchCoin.id === coin.id)
            );
            
            this.renderCryptoCards(matchedCoins);
        } catch (error) {
            showError('Search failed. Please try again.');
        }
    }

    startAutoRefresh() {
        setInterval(() => this.loadCryptoData(), 60000);
    }
}

// Initialize the app when the DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new CryptoTracker();
});