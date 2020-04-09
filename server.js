const express = require('express');
const app = express();

const { quotes } = require('./data');
const { getRandomElement } = require('./utils');

const PORT = process.env.PORT || 4001;

app.use(express.static('public'));


app.get('/api/quotes/random', (req, res, next) => {
    let quote = getRandomElement(quotes);
    res.send({quote});
});

app.get('/api/quotes', (req, res, next) => {
    let authorName = req.query.person;
    let quoteId = req.query.id;
    let quote = [];

    if(authorName){
        quotes.map(item => {
            if(item.person === authorName){
                quote.push(item);
            }
        });
        res.send({quotes: quote});
    }else if(quoteId){
        quotes.map(item => {
            if(item.id === quoteId){
                quote.push(item);
            }
        })
        res.send({quotes: quote});
    }else {
        res.send({quotes});
    } 
});

app.get('/api/quotes/update-quote', (req, res, next) => {
    let quoteId = req.query.id;
    quote = [];
    
    if(quoteId){
        quotes.map(item => {
            if(item.id === quoteId){
                quote.push(item);
            }
        })
        res.send({quotes: quote});
    }else {
        res.send({quotes});
    }
});

app.put('/api/quotes', (req, res, next) => {
    let quoteId = req.query.id;
    let newQuote = req.query.quote;
    let newPerson = req.query.person;
    let updatedQuote = [];

    if(quoteId && newQuote && newPerson){
        let oldQuoteIndex = quotes.findIndex(item => item.id === quoteId);
        if(oldQuoteIndex != -1){
            quotes[oldQuoteIndex].quote = newQuote;
            quotes[oldQuoteIndex].person = newPerson;
            res.status(200).send();
        }else {
            res.status(404).send();
        }
    }else {
        res.status(404).send();
    }
})

app.post('/api/quotes', (req, res, next) => {
    let quote = req.query.quote;
    let person = req.query.person;
    let quotesItemsNum = quotes.length + 1;

    if(quote && person) {
        let newQuote = {
            id: quotesItemsNum.toString(),
            quote: quote,
            person: person
        }
        quotes.push(newQuote);
        res.status(201).send({quote: newQuote});
    }else {
        res.status(400).send('Not correct values entered');
    }
})

app.listen(PORT, () => {
    console.log(`Server is listening on http://localhost:${PORT}`);
});

app.delete('/api/quotes', (req, res, next) => {
    let quoteId = req.query.id;

    if(quoteId) {
        let quoteIndex = quotes.findIndex(item => item.id === quoteId);
        quotes.splice(quoteIndex, 1);
        res.status(202).send();
    }else {
        res.status(404).send();
    }
})