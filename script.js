// const fullUrl = 'https://newsapi.org/v2/everything?q=tesla&from=2023-05-05&sortBy=publishedAt&apiKey=9ed508aa7287459c856261113f396604'

// my api = "9ed508aa7287459c856261113f396604"

const apiKey = "9ed508aa7287459c856261113f396604";
const url = 'https://newsapi.org/v2/everything?q=';


window.addEventListener('load', () => fetchNews("world"))

async function fetchNews(query){
    const response = await fetch(`${url}${query}&apiKey=${apiKey}`);
    const data = await response.json();
    // console.log(data);
    showNewsArticles(data.articles);
}

const cardsContainer = document.getElementById("cards-container");
const newsCardTemplate = document.getElementById("template-news-card");

function showNewsArticles(articles){
    cardsContainer.innerHTML = '';
    articles.forEach(article => {
        if(!article.urlToImage) return;
        const cardClone = newsCardTemplate.content.cloneNode(true);
        fillDataInCard(cardClone, article);
        cardsContainer.append(cardClone);
    });
}

function fillDataInCard(cardClone, article){
    const newsImg = cardClone.querySelector("#news-img");
    const newsTitle = cardClone.querySelector("#news-title");
    const newsSource = cardClone.querySelector("#news-source");
    const newDesc = cardClone.querySelector("#news-desc");

    newsImg.src = article.urlToImage;
    newsTitle.innerHTML = article.title;
    newDesc.innerHTML = article.description;

    const date = new Date(article.publishedAt).toLocaleString("en-US", {
        timeZone: "Asia/Jakarta"
    });

    newsSource.innerHTML = `${article.source.name} • ${date}`;

    cardClone.firstElementChild.addEventListener('click', () => {
        window.open(article.url, "_blank");
    });
}


// this is for clicking one of the nav link. if it is clicked color should change 
let currSelectedNav = null;
function clickOnNavItem(specificQuery){
    fetchNews(specificQuery);
    const navItem = document.getElementById(specificQuery);
    currSelectedNav?.classList.remove('active'); // if not null current selected tag remove active class
    currSelectedNav = navItem; // if click on another nav item current nav tag will become that new tag
    currSelectedNav.classList.add('active'); // if it is clicked it should be in different color..
}

// making search input and button workable..
const searchInput = document.getElementById("search-news");
const searchBtn = document.getElementById("search-btn");

searchBtn.addEventListener('click', () => {
    const query = searchInput.value;
    if(!query) return;
    fetchNews(query);
    currSelectedNav?.classList.remove('active');
    currSelectedNav = null;
})