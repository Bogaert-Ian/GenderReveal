// script.js
const repo = 'Bogaert-Ian/GenderReveal';
const token = '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';

async function fetchResults() {
    try {
        const response = await fetch(`https://api.github.com/repos/${repo}/contents/clicks.json`, {
            headers: { 'Accept': 'application/vnd.github.v3+json' }
        });
        const data = await response.json();
        const content = JSON.parse(atob(data.content));
        document.getElementById('results').innerText = `Boy: ${content.boy} | Girl: ${content.girl}`;
    } catch (error) {
        console.error('Error fetching results:', error);
    }
}

async function vote(gender) {
    try {
        await fetch(`https://api.github.com/repos/${repo}/actions/workflows/update-votes.yml/dispatches`, {
            method: 'POST',
            headers: {
                'Authorization': `token ${token}`,
                'Accept': 'application/vnd.github.v3+json'
            },
            body: JSON.stringify({
                ref: 'main',
                inputs: { gender }
            })
        });
        setTimeout(fetchResults, 2000);  // Wait for GitHub Action to complete
    } catch (error) {
        console.error('Error voting:', error);
    }
}

window.onload = fetchResults;
