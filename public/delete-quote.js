const deleteButton = document.getElementById('delete-quote');
const responseContainer = document.getElementById('response-container');

deleteButton.addEventListener('click', () => {
    const quoteId = document.getElementById('quote-id').value;

    fetch(`api/quotes?id=${quoteId}`, {
        method: 'DELETE',
    })
    .then(response => response.json)
    .then(
        responseContainer.innerHTML = `<p>The quote with id ${quoteId} is successfuly delete.</p>`
    )

});