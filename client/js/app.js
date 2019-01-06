let form = document.querySelector('.form');
const url = 'http://localhost:3000';

form.onsubmit = (e) => {
    e.preventDefault();
    fetch(url, {
        method: 'GET', 
        headers: {
            "Content-Type": "text/json",
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
            "Access-Control-Allow-Headers": "Content-Type"
        }
    });
}