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
    httpCatDisplay(response.status);
    const data = await response.json();
    return data;
}

( async () => {
    const sendSentimBut = document.querySelector("[id='sendSentiment']");
    sendSentimBut.addEventListener('click', (e) => { handleSendSentimEvent(e) });
    
})();

async function handleSendSentimEvent(e) {
    const loadImg = document.querySelector(".loading");
    loadImg.style.display = 'block';

    const text = e.target.previousElementSibling.value;
    const data = await fetchSentiment(text);

    const sentiment = data.result.type;
    loadImg.style.display = 'none';
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