const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const twitterBtn = document.getElementById('twitter');
const newQuoteBtn = document.getElementById('new-quote');
const loader = document.getElementById('loader');

let apiQuote =[];

// show loading
function showLoadingSpinning(){
    loader.hidden = false;
    quoteContainer.hidden = true;
}

// hide loading
function completeLoadingSpinning(){
    quoteContainer.hidden = false;
    loader.hidden = true;
}

//Show new quote
function newQuote() {
    showLoadingSpinning();
    //Pick a random quote from apiQuotes
    const quote = apiQuote[Math.floor(Math.random() * apiQuote.length)];
    // if author blank that means unknown
    if(!quote.author){
        authorText.textContent = 'Unknown';
    } else{
        authorText.textContent = quote.author;
    }
    
    // check quote length to determine styling
    if(quote.text.length > 120){
        quoteText.classList.add('long-quote');
    } else{
        quoteText.classList.remove('long-quote')
    }

    // set quote, hide loader
    quoteText.textContent = quote.text;
    completeLoadingSpinning();
}

//Get Quotes from API

async function getQuotes() {
    showLoadingSpinning();
    const apiUrl = 'https://jacintodesign.github.io/quotes-api/data/quotes.json';
    try{
        const response = await fetch(apiUrl);
        apiQuote = await response.json();
        console.log(apiQuote);
        newQuote();
    } catch(error) {
        //Catch Error here
        console.log('whoops, no quote', error);
    }
}

function tweetQuote(){
    const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}`;
    window.open(twitterUrl, '_blank');
}

//Event Listeners
newQuoteBtn.addEventListener('click' , newQuote);
twitterBtn.addEventListener('click', tweetQuote);

getQuotes();