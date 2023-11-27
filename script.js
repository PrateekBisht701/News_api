const API_KEY = "c489491eea52402d843d4dd679e5b827"  ;
const url = "https://newsapi.org/v2/everything?q=" ;

window.addEventListener('load',()=> fetchNews('India')) ;

function reload() {
    window.location.reload()
}

async function fetchNews (query) {
    const res = await fetch(`${url}${query}&apiKey=${API_KEY}`)
    const data = await res.json()
    console.log(data)
    bindData(data.articles)
}
function bindData(articles) {
    const cardsContainer = document.getElementById('cards-container') ;
    const newsCardTemplate = document.getElementById('template-news-card') ; 
    
    cardsContainer.innerHTML ="" ;

    articles.forEach(article => {
        if(!article.urlToImage) return ;
        
        const cardClone = newsCardTemplate.content.cloneNode(true) ;
        fillDataInCard(article, cardClone) ; 
        cardsContainer.appendChild(cardClone) ;
    });
}

function fillDataInCard ( article, cardClone){
    
    const newsImg = cardClone.querySelector('#news-img') ;
    const newsTitle = cardClone.querySelector('#news-title') ;
    const newsSource = cardClone.querySelector('#news-source') ;
    const newsDesc = cardClone.querySelector('#news-desc') ;

    newsImg.src = article.urlToImage ;
    newsTitle.innerHTML = article.title ;
    newsDesc.innerHTML = article.description ;

    const date =new Date(article.publishedAt).toLocaleString("en-US", {
        timeZone: 'Asia/Jakarta'
    }) ;
    
    newsSource.innerHTML = `${article.source.name}${date}`

    cardClone.firstElementChild.addEventListener('click', () => {
        window.open(article.url, '_blank')
    })
}

let currentSelectedNav = null ;

function onNavItemClick (id) {
    fetchNews(id) ; 

    const navItem = document.getElementById(id) ;
    currentSelectedNav?.classList.remove('active') ;
    currentSelectedNav = navItem ;
    currentSelectedNav.classList.add('active') ;
}

const searchButton = document.getElementById('search-button') ;
const searchText = document.getElementById('search-text') ;

searchButton.addEventListener('click', () => {
    const query = searchText.value ;
    if(!query) return ; 
    fetchNews(query) ;
    currentSelectedNav?.classList.remove('active')
})


// For responsive Navbar part of the website.

const searchIcon = document.querySelector('.search-icon')
const closeIcon = document.querySelector('.close-icon')
const navbar = document.querySelector('.nav')

searchIcon.addEventListener('click', () => {
    const query = searchText.value ;
    console.log(query)
    if(!query) return ; 
    fetchNews(query) ;
    currentSelectedNav?.classList.remove('active')
})

searchIcon.addEventListener('click', () => {
    // console.log(navbar.classList.contains('actives'))
    if(navbar.classList.contains('actives')){
        searchText.value = ''
      }
      else {
        navbar.classList.add('actives');
        searchText.focus();
      }

})

closeIcon.addEventListener('click',() => {
    navbar.classList.remove('actives');
    searchText.value = '';
})
