const factText = document.querySelector("#fact");
const factBtn = document.querySelector("#new-fact");
const loading = document.querySelector("#loading");
const tweetBtn = document.querySelector("#tweetBtn");

factBtn.addEventListener("click", getFact);

async function getFact() {
    try {
        loading.style.display = "block";
        factText.textContent = "";
        tweetBtn.style.display = "none";

        const randomId = Math.floor(Math.random() * 83) + 1;
        const response = await fetch(`https://swapi.dev/api/people/${randomId}/`);
        const data = await response.json();

        loading.style.display = "none";
        const fact = `${data.name} is ${data.height} cm tall, has ${data.hair_color} hair, and was born in ${data.birth_year}.`;
        factText.textContent = fact;

        // show tweet button
        tweetBtn.href = `https://twitter.com/intent/tweet?text=${encodeURIComponent(fact)}`;
        tweetBtn.style.display = "inline-block";
    } catch (error) {
        factText.textContent = "Error fetching Star Wars fact.";
        loading.style.display = "none";
    }
}