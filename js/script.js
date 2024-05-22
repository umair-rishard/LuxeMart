let searchForm = document.querySelector('.search-form');


document.querySelector('#search-button').onclick = () =>
{
   
    searchForm.classList.toggle('active');
    shoppingCart.classList.remove('active');
    loginForm.classList.remove('active');
    navBar.classList.remove('active');
    
}


let shoppingCart = document.querySelector('.shopping-cart');


document.querySelector('#cart-button').onclick = () =>
{
    shoppingCart.classList.toggle('active');
    searchForm.classList.remove('active');
    loginForm.classList.remove('active');
    navBar.classList.remove('active');
    

}


let loginForm = document.querySelector('.login-form');


document.querySelector('#user-button').onclick = () =>
{
    loginForm.classList.toggle('active');
    shoppingCart.classList.remove('active');
    searchForm.classList.remove('active');
    navBar.classList.remove('active');
}



let navBar = document.querySelector('.navbar');


document.querySelector('#menu-button').onclick = () =>
{
    navBar.classList.toggle('active');
    loginForm.classList.remove('active');
    shoppingCart.classList.remove('active');
    searchForm.classList.remove('active');
}


window.onscroll = () =>
    {
        searchForm.classList.remove('active');
        shoppingCart.classList.remove('active');
        loginForm.classList.remove('active');
        navBar.classList.remove('active');
        
    }
    
    