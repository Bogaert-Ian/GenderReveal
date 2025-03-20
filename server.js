// script.js
const repo = 'Bogaert-Ian/GenderReveal';
const token = 'YOUR_PERSONAL_ACCESS_TOKEN';

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
            jq ".girl = $new_count" clicks.json > temp.json && mv temp.json clicks.json
          fi

      - name: Commit and push changes
        run: |
          git config user.name "github-actions"
          git config user.email "github-actions@github.com"
          git add clicks.json
          git commit -m "Update click counts"
          git push
