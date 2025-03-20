// script.js
async function fetchResults() {
    try {
        const response = await fetch('http://localhost:3000/results');
        const data = await response.json();
        document.getElementById('results').innerText = `Boy: ${data.boy} | Girl: ${data.girl}`;
    } catch (error) {
        console.error('Error fetching results:', error);
    }
}

async function vote(gender) {
    try {
        await fetch(`http://localhost:3000/vote/${gender}`, { method: 'POST' });
        fetchResults();
    } catch (error) {
        console.error('Error voting:', error);
    }
}

window.onload = fetchResults;
