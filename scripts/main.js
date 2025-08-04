let timeInterval;
function load(page){
    fetch(`../views/${page}.html`)
    .then(response => response.text())
    .then(html => {
        if(timeInterval){
            clearInterval(timeInterval);
        }

        document.getElementById('content').innerHTML = html;
        if(page ==="home"){
            displayTime();
            timeInterval = setInterval(displayTime, 1000)
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