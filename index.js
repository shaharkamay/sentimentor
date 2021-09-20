"use strict";

const TEXT_AREA_INPUT = "";
let displayResultDiv;

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
    const data = await response.json();
    console.log(data);
    return data;
}

( async () => {
    const sendSentimBut = document.querySelector("[id='sendSentiment']");
    sendSentimBut.addEventListener('click', (e) => { handleSendSentimEvent(e) });
    
})();

async function handleSendSentimEvent(e) {
    const text = e.target.previousElementSibling.value;
    const data = await fetchSentiment(text);

    const sentiment = data.result.type;

    const resultsSection = document.querySelector("[id='results']");
    resultsSection.classList = sentiment; // the class name is similar to the sentiment type

    const [, sentimentType, polarity] = resultsSection.children;
    sentimentType.textContent = `Sentiment: ${sentiment}`;
    polarity.textContent = `Polarity: ${data.result.polarity}`;
}