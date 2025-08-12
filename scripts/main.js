let timeInterval;

let slideIndex = 0;
let slideshowTimer = null;


function load(page){
    fetch(`../views/${page}.html`)
    .then(response => response.text())
    .then(html => {
        if(timeInterval){
            clearInterval(timeInterval);
        }
        if (slideshowTimer) {
            clearTimeout(slideshowTimer);
            slideshowTimer = null;
            slideIndex = 0; 
        }

        document.getElementById('content').innerHTML = html;
        if(page ==="home"){
            displayTime();
            timeInterval = setInterval(displayTime, 1000)
        }
        if(page ==="aboutMe"){
            showSlides();
        }
    })
    .catch(()=> {
        document.getElementById('content').innerHTML ="<p>Page not found.</p>";
    });
}

function displayTime(){
   const timeElement = document.getElementById('time');
  if (timeElement) {
    const rawTime = new Date();
    timeElement.textContent = rawTime.toLocaleTimeString();
  }
}


function plusSlides(n){
    showSlides(slideIndex +=n);
}
function currentSlide(n){
    showSlides(slideIndex =n);
}
function showSlides(n){
    let i;
    let slides = document.getElementsByClassName("slides");
    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }
    slideIndex++;
    if(slideIndex>slides.length){
        slideIndex=1;
    }
    slides[slideIndex-1].style.display = "block";

    clearTimeout(slideshowTimer);
    slideshowTimer = setTimeout(showSlides, 4500);
}
