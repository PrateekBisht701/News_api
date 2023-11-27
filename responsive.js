

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