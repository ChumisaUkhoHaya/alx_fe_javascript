document.addEventListener('DOMContentLoaded', () => {
    const quotes = JSON.parse(localStorage.getItem('quotes')) ||[
        { text: "Life is what happens when you're busy making other plans.", category: "Life" },
        { text: "The greatest glory in living lies not in never falling, but in rising every time we fall.", category: "Motivation" },
        { text: "To be yourself in a world that is constantly trying to make you something else is the greatest accomplishment.", category: "Individuality" }
    ];

    const quoteDisplay = document.getElementById('quoteDisplay');
    const newQuoteButton = document.getElementById('newQuote');
    const addQuoteButton = document.getElementById('addQuote');
    const newQuoteText = document.getElementById('newQuoteText');
    const newQuoteCategory = document.getElementById('newQuoteCategory');
    const importFileInput = document.getElementById('importFile');
    const exportQuotesButton = document.getElementById('exportQuotes');
    const quoteList = document.getElementById('quoteList');
    const categoryFilter = document.getElementById('categoryFilter');
    const notificationContainer = document.getElementById('notificationContainer');

    function showRandomQuote() {
        const filteredQuotes = getFilteredQuotes();
        const randomIndex = Math.floor(Math.random() * filteredquotes.length);
        const selectedQuote = quotes[randomIndex];
        quoteDisplay.textContent = `"${selectedQuote.text}" - ${selectedQuote.category}`;
        sessionStorage.setItem('lastViewedQuote', JSON.stringify(selectedQuote));
    }

    function addQuote() {"createAddQuoteForm"
        const text = newQuoteText.value.trim();
        const category = newQuoteCategory.value.trim();
        
        if (text === "" || category === "") {
            alert("Please enter both a quote and a category.");
            return;
        }

        const newQuote = { text, category };
        quotes.push({ text, category });
        quotes.push(newQuote);
        saveQuotes();
        displayNewQuote(newQuote);
        populateCategories();

        newQuoteText.value = '';
        newQuoteCategory.value = '';
        alert("Quote added successfully!");
    }
    function displayNewQuote(quote) {
       const quoteContainer = document.createElement('div');
       quoteContainer.className = 'quote-container';
    
       const quoteText = document.createElement('p');
       quoteText.textContent = `"${quote.text}" - ${quote.category}`;
       quoteContainer.appendChild(quoteText);
    
       const quoteList = document.getElementById('quoteList');
       quoteList.appendChild(quoteContainer);
    }

function saveQuotes() {
    localStorage.setItem('quotes', JSON.stringify(quotes));
    syncWithServer();
}

function exportQuotes() {
    const blob = new Blob([JSON.stringify(quotes, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'quotes.json';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
}

function importFromJsonFile(event) {
    const fileReader = new FileReader();
    fileReader.onload = function(event) {
        const importedQuotes = JSON.parse(event.target.result);
        quotes.push(...importedQuotes);
        saveQuotes();
        importedQuotes.forEach(displayNewQuote);
        populateCategories();
        alert('Quotes imported successfully!');
    };
    fileReader.readAsText(event.target.files[0]);
}

function loadQuotes() {
    quotes.forEach(displayNewQuote);
    const lastViewedQuote = JSON.parse(sessionStorage.getItem('lastViewedQuote'));
    if (lastViewedQuote) {
        quoteDisplay.textContent = `"${lastViewedQuote.text}" - ${lastViewedQuote.category}`;
    } else {
        showRandomQuote();
    }
}

function getFilteredQuotes() {
    const selectedCategory = categoryFilter.value;
    if (selectedCategory === 'all') {
        return quotes;
    }
    return quotes.filter(quote => quote.category === selectedCategory);
}

function filterQuotes() {
    const selectedCategory = categoryFilter.value;
    localStorage.setItem('selectedCategory', selectedCategory);
    const filteredQuotes = getFilteredQuotes();
    quoteList.innerHTML = '';
    filteredQuotes.forEach(displayNewQuote);
}

function populateCategories() {
    const categories = [...new Set(quotes.map(quote => quote.category))];
    categoryFilter.innerHTML = '<option value="all">All Categories</option>';
    categories.forEach(category => {
        const option = document.createElement('option');
        option.value = category;
        option.textContent = category;
        categoryFilter.appendChild(option);
    });

    const selectedCategory = localStorage.getItem('selectedCategory') || 'all';
    categoryFilter.value = selectedCategory;
    filterQuotes();

}

function fetchQuotesFromServer() {
    fetch('https://jsonplaceholder.typicode.com/posts')
        .then(response => response.json())
        .then(serverQuotes => {
            // Simulating server response by extracting only the title and body
            const serverData = serverQuotes.slice(0, quotes.length).map((quote, index) => ({
                text: quote.title,
                category: quote.body.substring(0, 10) // Simulated category
            }));

            let conflict = false;

            serverData.forEach((serverQuote, index) => {
                if (quotes[index].text !== serverQuote.text) {
                    conflict = true;
                    quotes[index] = serverQuote; // Server's data takes precedence
                }
            });

            if (conflict) {
                saveQuotes();
                notifyUser('Conflicts were found and resolved with server data.');
            }
        });
}

function syncWithServer() {
    fetchQuotesFromServer();
}


function notifyUser(message) {
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.textContent = message;
    notificationContainer.appendChild(notification);

    setTimeout(() => {
        notificationContainer.removeChild(notification);
    }, 3000);
}

    newQuoteButton.addEventListener('click', showRandomQuote);
    addQuoteButton.addEventListener('click', addQuote);
    exportQuotesButton.addEventListener('click', exportQuotes);
    importFileInput.addEventListener('change', importFromJsonFile);
    
    loadQuotes();
    setInterval(syncWithServer, 30000); // Sync with the server every 30 seconds
    
    // Initial random quote display
    showRandomQuote(); "innerHTML"
});
