const submitButton = document.getElementById('submit-quote');
const fetchButton = document.getElementById('fetch-quote');
const newQuoteContainer = document.getElementById('up-quote');

const resetQuotes = () => {
  newQuoteContainer.innerHTML = '';
}

const renderQuotes = (quotes = []) => {
  resetQuotes();
  if (quotes.length > 0) {
    quotes.forEach(quote => {
      const newQuote = document.createElement('div');
      newQuote.className = 'single-quote';
      newQuote.innerHTML = `<div class="quote-text">${quote.quote}</div>
      <div class="attribution">- ${quote.person}</div>`;
      newQuoteContainer.appendChild(newQuote);
    });
  } else {
    newQuoteContainer.innerHTML = '<p>Your request returned no quotes.</p>';
  }
}

fetchButton.addEventListener('click', () => {
  let quoteId = document.getElementById('quote-id').value;
  
  fetch(`/api/quotes/update-quote?id=${quoteId}`)
  .then(response => {
    if(response.ok){
      return response.json();
    }else {
      newQuoteContainer.innerHTML = `<p>Your request returned an error from the server: </p>
      <p>Code: ${response.status}</p>
      <p>${response.statusText}</p>`;
    }
  })
  .then(response => {
    renderQuotes(response.quotes);
  });

});

submitButton.addEventListener('click', () => {
  let quoteId = document.getElementById('quote-id').value;
  let newQuote = document.getElementById('new-quote').value;
  let newPerson = document.getElementById('new-person').value;

  if(quoteId && newQuote && newPerson) {
    console.log(`id: ${quoteId}, quote: ${newQuote}, person: ${newPerson}`);

    fetch(`/api/quotes?id=${quoteId}&quote=${newQuote}&person=${newPerson}`, {
      method: 'PUT',
    })
    .then(response => {
      debugger;
      if(response.ok){
        return response.json()
      }
    })
    // .then((quote) => {
    //   console.log(quote);
    //   const updatedQuote = document.createElement('div');
    //   updatedQuote.innerHTML = `
    //   <h3>Congrats, your quote was updated!</h3>
    //   <div class="quote-text">${quote.id}: ${quote.quote}</div>
    //   <div class="attribution">- ${quote.person}</div>
    //   <p>Go to the <a href="index.html">home page</a> to request and view all quotes.</p>
    //   `
    //   newQuoteContainer.appendChild(updatedQuote);
    // })
  }else {

    newQuoteContainer.innerHTML = `<p>All the inputs are required! Please enter a value for Quote ID, New Quote and New Person. </p>`
  }
});