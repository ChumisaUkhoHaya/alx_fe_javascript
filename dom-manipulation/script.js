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

    function showRandomQuote() {
        const randomIndex = Math.floor(Math.random() * quotes.length);
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

        quotes.push({ text, category });
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

    newQuoteButton.addEventListener('click', showRandomQuote);
    addQuoteButton.addEventListener('click', addQuote);
    exportQuotesButton.addEventListener('click', exportQuotes);
    importFileInput.addEventListener('change', importFromJsonFile);
    
    loadQuotes();
    
    // Initial random quote display
    showRandomQuote(); "innerHTML"
});
