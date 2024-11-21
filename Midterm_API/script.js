const apiBaseUrl = "https://restcountries.com/v3.1";

// Fetch and display the list of countries
async function fetchCountries() {
  try {
    const response = await fetch(`${apiBaseUrl}/all`);
    const countries = await response.json();
    displayCountries(countries);

    // Add a search event listener after loading the countries
    document.getElementById("search").addEventListener("input", (e) => {
      const query = e.target.value.toLowerCase();
      const filteredCountries = countries.filter(country =>
        country.name.common.toLowerCase().includes(query)
      );
      displayCountries(filteredCountries);
    });
  } catch (error) {
    console.error("Error fetching countries:", error);
    document.getElementById("countries").innerHTML = `
      <p class="text-danger">Unable to load countries. Please try again later.</p>
    `;
  }
}

// Display the list of countries on index.html
function displayCountries(countries) {
    const countriesContainer = document.getElementById("countries");
    countriesContainer.innerHTML = "";
  
    if (countries.length === 0) {
      countriesContainer.innerHTML = `
        <p class="text-warning">No countries match your search.</p>
      `;
      return;
    }
  
    countries.forEach(country => {
      const card = document.createElement("div");
      card.className = "col-md-4"; // Bootstrap grid for consistent layout
      card.innerHTML = `
        <div class="card">
          <img src="${country.flags.svg}" class="card-img-top" alt="${country.name.common}">
          <div class="card-body">
            <h5 class="card-title">${country.name.common}</h5>
            <a href="view.html?name=${encodeURIComponent(country.name.common)}" class="btn btn-primary d-block">View Details</a>
          </div>
        </div>
      `;
      countriesContainer.appendChild(card);
    });
  }  

// Fetch and display details for a specific country on view.html
async function fetchCountryDetails() {
  const params = new URLSearchParams(window.location.search);
  const countryName = params.get("name");

  if (countryName) {
    try {
      const response = await fetch(`${apiBaseUrl}/name/${encodeURIComponent(countryName)}?fullText=true`);
      if (!response.ok) throw new Error("Country not found");

      const country = await response.json();
      displayCountryDetails(country[0]);
    } catch (error) {
      console.error("Error fetching country details:", error);
      document.getElementById("country-details").innerHTML = `
        <p class="text-danger">Unable to load details. Please try again later.</p>
      `;
    }
  } else {
    document.getElementById("country-details").innerHTML = `
      <p class="text-danger">No country specified. Go back to the <a href="index.html">home page</a>.</p>
    `;
  }
}

// Display detailed information for a country
function displayCountryDetails(country) {
    const detailsContainer = document.getElementById("country-details");
  
    const flag = country.flags.svg;
    const name = country.name.common;
    const officialName = country.name.official || "N/A";
    const capital = country.capital ? country.capital[0] : "N/A";
    const region = country.region || "N/A";
    const subregion = country.subregion || "N/A";
    const population = country.population ? country.population.toLocaleString() : "N/A";
    const languages = country.languages ? Object.values(country.languages).join(", ") : "N/A";
    const currencies = country.currencies
      ? Object.values(country.currencies).map(c => `${c.name} (${c.symbol})`).join(", ")
      : "N/A";
    const borders = country.borders ? country.borders.join(", ") : "None";
    const area = country.area ? `${country.area.toLocaleString()} km²` : "N/A";
    const timezones = country.timezones ? country.timezones.join(", ") : "N/A";
  
    detailsContainer.innerHTML = `
      <div class="flag-container">
        <img src="${flag}" alt="${name}">
      </div>
      <h2>${name} (${officialName})</h2>
      <p><strong>Capital:</strong> ${capital}</p>
      <p><strong>Region:</strong> ${region}</p>
      <p><strong>Subregion:</strong> ${subregion}</p>
      <p><strong>Population:</strong> ${population}</p>
      <p><strong>Languages:</strong> ${languages}</p>
      <p><strong>Currencies:</strong> ${currencies}</p>
      <p><strong>Borders:</strong> ${borders}</p>
      <p><strong>Area:</strong> ${area}</p>
      <p><strong>Timezones:</strong> ${timezones}</p>
      <a href="index.html" class="btn btn-secondary">Back to List</a>
    `;
  }  

// Initialize functionality for each page
if (document.getElementById("countries")) {
  fetchCountries();
} else if (document.getElementById("country-details")) {
  fetchCountryDetails();
}
