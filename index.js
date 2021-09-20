"use strict";

async function fetchSentiment(text) {
    const url = "https://sentim-api.herokuapp.com/api/v1/";
    const body = JSON.stringify({text});
    const response = await fetch(url, {
        method: 'POST',
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
        },
        body,
    });

    httpCatDisplay(response.status); // run the function to display cat HTTP error

    /*
    check if response status is ok, if not,
    append an error in the result section
    */
    if(!response.ok) {
        const errorP = document.createElement('p');
        errorP.style.color = "red";
        errorP.textContent = "Invalid text!";
        const resultsSection = document.querySelector("[id='results']");
        resultsSection.append(errorP);
        return;
    }
    const data = await response.json();
    return data;
}

/* 
anonymous asynchronous function to insert event listener to the 'send' button
*/
( async () => {
    const sendSentimBut = document.querySelector("[id='sendSentiment']");
    sendSentimBut.addEventListener('click', (e) => { handleSendSentimEvent(e) });
    
})();

/*
asynchronous function to handle the mouse click event
this function gets the fetched data from an API and
display it in the DOM
*/
async function handleSendSentimEvent(e) {
    const loadImg = document.querySelector(".loading");
    loadImg.style.display = 'block';

    const text = e.target.previousElementSibling.value;
    const data = await fetchSentiment(text);

    loadImg.style.display = 'none';
    
    if(!data) return;

    const sentiment = data.result.type;
    const resultsSection = document.querySelector("[id='results']");
    resultsSection.classList = sentiment; // the class name is similar to the sentiment type

    const [, , sentimentType, polarity] = resultsSection.children;
    sentimentType.textContent = `Sentiment: ${sentiment}`;
    polarity.textContent = `Polarity: ${data.result.polarity}`;
}

function httpCatDisplay(status) {
    const img = document.querySelector("[id='statusImg']");
    img.src = `https://http.cat/${status}`;
    img.hidden = false;
}