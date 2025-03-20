const repo = 'Bogaert-Ian/GenderReveal';  // Adjust this to your GitHub username/repo

async function fetchResults() {
    try {
        const response = await fetch(`https://api.github.com/repos/${repo}/contents/clicks.json`, {
            headers: {
                'Accept': 'application/vnd.github.v3+json'
            }
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
        // GitHub Actions workflow trigger URL
        const dispatchUrl = `https://api.github.com/repos/${repo}/actions/workflows/update-votes.yml/dispatches`;

        await fetch(dispatchUrl, {
            method: 'POST',
            headers: {
                'Accept': 'application/vnd.github.v3+json',
                // No token needed since it's handled by GitHub Actions Secrets
            },
            body: JSON.stringify({
                ref: 'main', // Branch name
                inputs: { gender }
            })
        });

        // Wait a bit to allow the workflow to update
        setTimeout(fetchResults, 2000);
    } catch (error) {
        console.error('Error voting:', error);
    }
}

window.onload = fetchResults;
