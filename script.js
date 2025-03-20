const repo = 'Bogaert-Ian/GenderReveal';  // Your GitHub username/repo

async function fetchResults() {
    try {
        const response = await fetch(`https://api.github.com/repos/${repo}/contents/clicks.json`, {
            headers: {
                'Accept': 'application/vnd.github.v3+json'
            }
        });

        if (!response.ok) {
            throw new Error('Failed to fetch results.');
        }

        const data = await response.json();
        const content = JSON.parse(atob(data.content));  // Decode Base64 content
        document.getElementById('results').innerText = `Boy: ${content.boy} | Girl: ${content.girl}`;
    } catch (error) {
        console.error('Error fetching results:', error);
    }
}

async function vote(gender) {
    try {
        const response = await fetch(`https://api.github.com/repos/${repo}/actions/workflows/update-votes.yml/dispatches`, {
            method: 'POST',
            headers: {
                'Accept': 'application/vnd.github.v3+json'
               // 'Authorization': `Bearer YOUR_PERSONAL_ACCESS_TOKEN`  // REMOVE this in production!
            },
            body: JSON.stringify({
                ref: 'main',  // Branch name
                inputs: { gender }
            })
        });

        if (!response.ok) {
            throw new Error('Error voting.');
        }

        setTimeout(fetchResults, 2000);  // Allow some time for the workflow to process
    } catch (error) {
        console.error('Error voting:', error);
    }
}

window.onload = fetchResults;
