document.addEventListener('DOMContentLoaded', () => {
    const quotes = [
        { text: "Life is what happens when you're busy making other plans.", category: "Life" },
        { text: "The greatest glory in living lies not in never falling, but in rising every time we fall.", category: "Motivation" },
        { text: "To be yourself in a world that is constantly trying to make you something else is the greatest accomplishment.", category: "Individuality" }
    ];

    const quoteDisplay = document.getElementById('quoteDisplay');
    const newQuoteButton = document.getElementById('newQuote');
    const addQuoteButton = document.getElementById('addQuote');
    const newQuoteText = document.getElementById('newQuoteText');
    const newQuoteCategory = document.getElementById('newQuoteCategory');

    function showRandomQuote() {
        const randomIndex = Math.floor(Math.random() * quotes.length);
        const selectedQuote = quotes[randomIndex];
        quoteDisplay.textContent = `"${selectedQuote.text}" - ${selectedQuote.category}`;
    }

    function addQuote() {
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

    newQuoteButton.addEventListener('click', showRandomQuote);
    addQuoteButton.addEventListener('click', addQuote);
    
    // Initial random quote display
    showRandomQuote();
});
