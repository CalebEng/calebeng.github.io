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
        if(page ==="projects"){
            setTimeout(setUpPage, 0);
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


function setUpPage(){
    const buttons = document.querySelectorAll(".expandBut");
    const colContainer = document.getElementById("colContainer");
    const rightCol = document.querySelector(".rightCol");
    const allInfo = document.querySelectorAll(".projectInfo");

    buttons.forEach(button =>{
        button.addEventListener("click", () => {
            const projectId = button.getAttribute("data-project");

            allInfo.forEach(block => block.classList.add("hidden"));

            const selected = document.querySelector(`.projectInfo[data-project="${projectId}"]`);
            if(selected){
                selected.classList.remove("hidden");
                rightCol.classList.remove("hidden");
                colContainer.classList.add("expanded")
            }

            const closeBut = document.getElementById("closeBut");
            if(closeBut){
                closeBut.addEventListener("click",() => {
                    rightCol.classList.add("hidden");
                    colContainer.classList.remove("expanded");
                });
            }
        });
    });
}