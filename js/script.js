// Hardcoded dataset for search results
const dataset = [
    { title: "What is JavaScript?", content: "JavaScript is a programming language used for web development." },
    { title: "Introduction to HTML", content: "HTML is the standard markup language for creating web pages." },
    { title: "CSS Basics", content: "CSS is used to style and layout web pages." },
    { title: "How to build a website?", content: "Learn how to build a website using HTML, CSS, and JavaScript." },
];

// Search history
let searchHistory = [];

// Function to search the dataset
function search(query) {
    return dataset.filter(item => 
        item.title.toLowerCase().includes(query.toLowerCase()) || 
        item.content.toLowerCase().includes(query.toLowerCase())
    );
}

// Display autocomplete suggestions
function showAutocomplete(query) {
    const autocomplete = document.getElementById('autocomplete');
    if (query.length > 0) {
        const suggestions = dataset.filter(item => 
            item.title.toLowerCase().includes(query.toLowerCase())
        );
        autocomplete.innerHTML = suggestions.map(item => 
            `<div onclick="selectSuggestion('${item.title}')">${item.title}</div>`
        ).join('');
        autocomplete.style.display = 'block';
    } else {
        autocomplete.style.display = 'none';
    }
}

// Select a suggestion
function selectSuggestion(suggestion) {
    document.getElementById('searchInput').value = suggestion;
    document.getElementById('autocomplete').style.display = 'none';
}

// Clear search input and results
document.getElementById('clearButton').addEventListener('click', function () {
    document.getElementById('searchInput').value = '';
    document.getElementById('results').innerHTML = '';
    document.getElementById('autocomplete').style.display = 'none';
});

// Handle form submission
document.getElementById('searchForm').addEventListener('submit', function (event) {
    event.preventDefault(); // Prevent form from submitting

    const query = document.getElementById('searchInput').value;
    const results = search(query);

    // Display results
    const resultsContainer = document.getElementById('results');
    resultsContainer.innerHTML = ''; // Clear previous results

    if (results.length > 0) {
        results.forEach(result => {
            const resultItem = document.createElement('div');
            resultItem.className = 'result-item';
            resultItem.innerHTML = `
                <h3>${result.title}</h3>
                <p>${result.content}</p>
            `;
            resultsContainer.appendChild(resultItem);
        });
    } else {
        resultsContainer.innerHTML = '<p>No results found.</p>';
    }

    // Add to search history
    if (query && !searchHistory.includes(query)) {
        searchHistory.push(query);
        updateSearchHistory();
    }
});

// Update search history
function updateSearchHistory() {
    const historyList = document.getElementById('historyList');
    historyList.innerHTML = searchHistory.map(item => 
        `<li onclick="selectSuggestion('${item}')">${item}</li>`
    ).join('');
}

// Toggle dark mode
document.getElementById('darkModeToggle').addEventListener('click', function () {
    document.body.classList.toggle('dark-mode');
});

// Show autocomplete as user types
document.getElementById('searchInput').addEventListener('input', function () {
    showAutocomplete(this.value);
});