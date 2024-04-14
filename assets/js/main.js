const navMenu = document.getElementById('nav-menu'),
      navToggle = document.getElementById('nav-toggle'),
      navClose = document.getElementById('nav-close')

if(navToggle){
    navToggle.addEventListener('click', () =>{
        navMenu.classList.add('show-menu')
    })
}

if(navClose){
    navClose.addEventListener('click', () =>{
        navMenu.classList.remove('show-menu')
    })
}

const navLink = document.querySelectorAll('.nav__link')

function linkAction(){
    const navMenu = document.getElementById('nav-menu')
    navMenu.classList.remove('show-menu')
}
navLink.forEach(n => n.addEventListener('click', linkAction))


function scrollHeader(){
    const header = document.getElementById('header')
    if(this.scrollY >= 100) header.classList.add('scroll-header'); else header.classList.remove('scroll-header')
}
window.addEventListener('scroll', scrollHeader)

let swiper = new Swiper(".why__container", {
    effect: "coverflow",
    grabCursor: true,
    centeredSlides: true,
    slidesPerView: "auto",
    loop: true,
    spaceBetween: 32,
    coverflowEffect: {
        rotate: 0,
    },
})

function scrollUp(){
    const scrollUp = document.getElementById('scroll-up');
    if(this.scrollY >= 200) scrollUp.classList.add('show-scroll'); else scrollUp.classList.remove('show-scroll')
}
window.addEventListener('scroll', scrollUp)

const sections = document.querySelectorAll('section[id]')

function scrollActive(){
    const scrollY = window.pageYOffset

    sections.forEach(current =>{
        const sectionHeight = current.offsetHeight
        const sectionTop = current.offsetTop - 50;
        const sectionId = current.getAttribute('id')

        if(scrollY > sectionTop && scrollY <= sectionTop + sectionHeight){
            const el=document.querySelector('.nav__menu a[href*=' + sectionId + ']')
            console.dir(el.classList)
            el.classList.add('active-link')
        }else{
            const el=document.querySelector('.nav__menu a[href*=' + sectionId + ']')
            el.classList.remove('active-link')
        }
    })
}
window.addEventListener('scroll', scrollActive)

const sr = ScrollReveal({
    distance: '60px',
    duration: 2800,
})


sr.reveal(`.home__data, .home__social-link, .home__info,
           .why__container,
           .sponsor__content,
           .footer__data, .footer__rights,.footer__link`,{
    origin: 'top',
    interval: 100,
})

sr.reveal(`.about__data, 
           .video__description,
           .subscribe__description`,{
    origin: 'left',
})

sr.reveal(`.about__img-overlay, 
           .video__content,
           .subscribe__form`,{
    origin: 'right',
    interval: 100,
})

const themeButton = document.getElementById('theme-button')
const darkTheme = 'dark-theme'
const iconTheme = 'ri-sun-line'

const selectedTheme = localStorage.getItem('selected-theme')
const selectedIcon = localStorage.getItem('selected-icon')

const getCurrentTheme = () => document.body.classList.contains(darkTheme) ? 'dark' : 'light'
const getCurrentIcon = () => themeButton.classList.contains(iconTheme) ? 'ri-moon-line' : 'ri-sun-line'

if (selectedTheme) {
  document.body.classList[selectedTheme === 'dark' ? 'add' : 'remove'](darkTheme)
  themeButton.classList[selectedIcon === 'ri-moon-line' ? 'add' : 'remove'](iconTheme)
}

themeButton.addEventListener('click', () => {
    document.body.classList.toggle(darkTheme)
    themeButton.classList.toggle(iconTheme)
    localStorage.setItem('selected-theme', getCurrentTheme())
    localStorage.setItem('selected-icon', getCurrentIcon())
})


const aqiBtn=document.querySelectorAll(".aqi");
const aqiToken="26bea2ae468321e6fa37cb7a8bb5241b496583ee"
aqiBtn.forEach(btn =>
btn.addEventListener('click',()=>{ 
    const city=btn.parentElement.parentElement.children[0].innerHTML;
    const apiUrl=`https://api.waqi.info/feed/${city}/?token=${aqiToken}`

    fetch(apiUrl)
    .then(response => {
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  })
  .then(data => {
    const aqiVal= data.data.aqi
    btn.innerHTML= aqiVal ;

    if (aqiVal>=0 && aqiVal<=50){
        btn.style.color="55A84F";
      } else if(aqiVal>=51 && aqiVal<=100){
        btn.style.color="#A3C853";
      } else if(aqiVal>=101 && aqiVal<=200){
        btn.style.color="#FFF833";
      } else if(aqiVal>=201 && aqiVal<=300){
        btn.style.color="#F29C33";
      } else if(aqiVal>=301 && aqiVal<=400){
        btn.style.color="#E93F33";
      } else if(aqiVal>=401 && aqiVal<=500){
        btn.style.color="#AF2D24";
      }
    
  })
  .catch(error => {
    console.error('There was a problem with the fetch operation:', error);
  });
}))

const whyHeadings = document.querySelector(".why-container-left");
const whyContents = document.querySelector(".why-container-right");
const whyParagraphs = whyContents.querySelectorAll('p');

whyHeadings.addEventListener('mouseover', (event) => {
  if (event.target.tagName === 'H2') {
    event.target.style.opacity='1';
    const index = Array.from(event.target.parentNode.children).indexOf(event.target);
    whyContents.style.setProperty('--index', index);
    whyParagraphs.forEach((paragraph, i) => {
      if (i === index) {
        paragraph.style.display = 'block';
      } else {
        paragraph.style.display = 'none';
      }
    });
  }
});

whyContents.style.setProperty('--index', 0);

for (let i = 0; i < whyParagraphs.length; i++) {
  whyParagraphs[i].style.display = 'none';
}

whyParagraphs[0].style.display = 'block';

const howHeadings = document.querySelector(".how-container-left");
const howContents = document.querySelector(".how-container-right");
const howParagraphs = howContents.querySelectorAll('p');

howHeadings.addEventListener('mouseover', (event) => {
  if (event.target.tagName === 'H2') {
    event.target.style.opacity='1';
    const index = Array.from(event.target.parentNode.children).indexOf(event.target);
    howContents.style.setProperty('--index', index);
    howParagraphs.forEach((paragraph, i) => {
      if (i === index) {
        paragraph.style.display = 'block';
      } else {
        paragraph.style.display = 'none';
      }
    });
  }
});

howContents.style.setProperty('--index', 0);

for (let i = 0; i < howParagraphs.length; i++) {
  howParagraphs[i].style.display = 'none';
}

howParagraphs[0].style.display = 'block';   