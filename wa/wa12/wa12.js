const API_KEY = "bcf419ab163e4bd7a791b5d4877f4899";
const BASE_URL = "https://newsapi.org/v2/everything";
const PROXY = "https://api.allorigins.win/get?url=";

const buttons = {
  techBtn: "technology",
  sportsBtn: "sports",
  scienceBtn: "science",
  businessBtn: "business",
  healthBtn: "health"
};

let currentCategory = "";
let currentPage = 1;
let allArticles = [];

const status = document.getElementById("status");
const container = document.getElementById("articles");

// Create and style the "Load More" button
const loadMoreBtn = document.createElement("button");
loadMoreBtn.textContent = "Load More";
loadMoreBtn.style.display = "none";
loadMoreBtn.style.margin = "20px auto";
loadMoreBtn.style.padding = "10px 15px";
loadMoreBtn.style.borderRadius = "6px";
loadMoreBtn.style.backgroundColor = "#023c6b";
loadMoreBtn.style.color = "white";
loadMoreBtn.style.border = "none";
loadMoreBtn.style.cursor = "pointer";
loadMoreBtn.addEventListener("click", loadMoreArticles);
document.body.appendChild(loadMoreBtn);

// Assign category button handlers
for (let id in buttons) {
  document.getElementById(id).addEventListener("click", () => {
    currentCategory = buttons[id];
    currentPage = 1;
    allArticles = [];
    container.innerHTML = "";
    loadArticles(currentCategory, currentPage, true);
  });
}

async function loadArticles(category, page, replaceExisting = false) {
  status.textContent = "Loading " + category + " news...";
  loadMoreBtn.style.display = "none";

  try {
    const targetUrl = `${BASE_URL}?q=${encodeURIComponent(category)}&language=en&pageSize=20&page=${page}&sortBy=publishedAt&apiKey=${API_KEY}`;
    const finalUrl = `${PROXY}${encodeURIComponent(targetUrl)}`;

    const response = await fetch(finalUrl);
    if (!response.ok) throw new Error("HTTP Error " + response.status);

    const proxyData = await response.json();
    const data = JSON.parse(proxyData.contents);

    if (data.articles && data.articles.length > 0) {
      allArticles = replaceExisting ? data.articles : allArticles.concat(data.articles);
      status.textContent = `Showing ${category} articles (page ${page})`;
      displayArticles(allArticles);
      loadMoreBtn.style.display = "block";
    } else {
      status.textContent = "No more articles available.";
      loadMoreBtn.style.display = "none";
    }
  } catch (err) {
    console.error(err);
    alert("Failed to load news. Please check your connection or try again later.");
    status.textContent = "Error loading news.";
  }
}

function displayArticles(articles) {
  container.innerHTML = "";
  articles.forEach(a => {
    const card = document.createElement("article");
    card.innerHTML = `
      <img src="${a.urlToImage || 'https://via.placeholder.com/400x200?text=No+Image'}" alt="${a.title}">
      <h3>${a.title}</h3>
      <p>${a.description || 'No description available.'}</p>
      <a href="${a.url}" target="_blank">Read more about ${a.title}</a>
    `;
    container.appendChild(card);
  });
}

function loadMoreArticles() {
  currentPage++;
  loadArticles(currentCategory, currentPage, false);
}
