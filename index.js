const form = document.querySelector('#countrySearchForm');
const countrySearch = document.querySelector('#countrySearch');
const searchResults = document.querySelector('#searchResults');

form.addEventListener('submit', async function(event) {
    event.preventDefault();

    const searchValue = countrySearch.value.toLowerCase();

    try {
        const response = await fetch(`https://restcountries.com/v3.1/name/${searchValue}`);
        const data = await response.json();

        console.log(data);
        if (data.length > 0) {
            const result = data[0];
            const cardHTML = `
        <div class="card">
            <h2>${result.name.common}</h2>
            <img src="${result.flags.png}" alt="${result.name.common} Flag">
            <p>Official Name: ${result.name.official}</p>
            <p>Geographic Location: ${result.latlng.join(', ')}</p>
            <p>Area: ${result.area} km²</p>
            <p>Population: ${result.population}</p>
            <p>Borders: ${result.borders.join(', ')}</p>
        </div>
    `;
    searchResults.innerHTML = cardHTML;
} else {
    searchResults.innerHTML = 'Country not found.';
}
    } catch (error) {
        console.error('Error:', error);
        searchResults.innerHTML = 'Something went wrong.';
    }
});
