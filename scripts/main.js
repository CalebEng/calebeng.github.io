function load(page){
    fetch(`../views/${page}.html`)
    .then(response => response.text())
    .then(html => {
        document.getElementById('content').innerHTML = html;
    })
    .catch(()=> {
        document.getElementById('content').innerHTML ="<p>Page not found.</p>";
    });
}