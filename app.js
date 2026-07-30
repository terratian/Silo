document.getElementById('searchBtn').addEventListener('click', performSearch);
document.getElementById('searchInput').addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
        performSearch();
    }
});

function performSearch() {
    const query = document.getElementById('searchInput').value.trim();
    const container = document.getElementById('resultsContainer');
    
    if (!query) return;

    container.innerHTML = `
        <div class="result-card">
            <div class="result-title">Mock Match: Index Record for "${query}"</div>
            <div class="result-snippet">This is a structural placeholder showing how local document matches render inside the Silo interface framework...</div>
        </div>
    `;
}
