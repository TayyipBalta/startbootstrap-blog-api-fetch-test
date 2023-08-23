/*!
* Start Bootstrap - Clean Blog v6.0.9 (https://startbootstrap.com/theme/clean-blog)
* Copyright 2013-2023 Start Bootstrap
* Licensed under MIT (https://github.com/StartBootstrap/startbootstrap-clean-blog/blob/master/LICENSE)
*/
window.addEventListener('DOMContentLoaded', () => {
    let scrollPos = 0;
    const mainNav = document.getElementById('mainNav');
    const headerHeight = mainNav.clientHeight;
    window.addEventListener('scroll', function() {
        const currentTop = document.body.getBoundingClientRect().top * -1;
        if ( currentTop < scrollPos) {
            // Scrolling Up
            if (currentTop > 0 && mainNav.classList.contains('is-fixed')) {
                mainNav.classList.add('is-visible');
            } else {
                console.log(123);
                mainNav.classList.remove('is-visible', 'is-fixed');
            }
        } else {
            // Scrolling Down
            mainNav.classList.remove(['is-visible']);
            if (currentTop > headerHeight && !mainNav.classList.contains('is-fixed')) {
                mainNav.classList.add('is-fixed');
            }
        }
        scrollPos = currentTop;
    });
})

const servicePrefix = 'http://localhost:1337/api/posts/';
const img = 'http://localhost:1337/api/posts/10?populate=hero';

let post = [];
let resim = [];

const bgimg = document.querySelector('.masthead');
const contentEl = document.querySelector('.content');

window.addEventListener('hashchange', changeRoute);

function changeRoute() {
    const pageUrl = location.hash.substring(2);
    loadPage(pageUrl);
}

async function loadPage(url) {
    contentEl.innerHTML = 'Yükleniyor';
    if (url === '') {
        loadHomePage();
    } else {
        loadSubPage(servicePrefix + url);
    }
}

async function loadSubPage(url) {

    resim = await fetch(img).then(r => r.json());
    
    bgimg.innerHTML = `
    <header class="masthead" style="background-image: url('http://localhost:1337${resim.data.attributes.hero.data.attributes.url}')">
        `;
}

async function loadSubPage(url) {
    post = await fetch(url).then(r => r.json());
    
    contentEl.innerHTML = `
        
        <div class="post-preview">
                        <a href="">
                            <h2 class="post-title">${post.data.attributes.title}</h2>
                            <h3 class="post-subtitle">${post.data.attributes.summary}</h3>
                        </a>
                        <p class="post-meta">
                            Posted by
                            <a href="#!">${post.data.attributes.content}</a>
                        </p>
                    </div>
                    <!-- Divider-->
                    <hr class="my-4" />

        `;
}

async function loadHomePage() {
    const posts = await fetch(servicePrefix).then(r => r.json());


    contentEl.innerHTML = '';
    for(const post of posts.data) {
        contentEl.innerHTML += `
        <div class="post">
            <h3><a href="#/${post.id}">${post.attributes.title}</a></h3>
            <h4><a href="#/${post.id}">${post.attributes.summary}</a></h4>
            <hr>
        </div>
        `;
    }
}

changeRoute();