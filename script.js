async function getMatchData() {
    try {
        const response = await fetch("https://api.cricapi.com/v1/currentMatches?apikey=bef4b6e4-0fbb-4e11-9410-6e16e2ca5ab1&offset=0");
        const data = await response.json();

        if (data.status !== "success") return;

        const matchesList = data.data;

        if (!matchesList) return [];

        const relevantData = matchesList.filter(match => match.series_id === "76ae85e2-88e5-4e99-83e4-5f352108aebc").map(match => {
            const matchInfo = `<h4>${match.name}</h4><br>Match Status: ${match.status}<br>Venue: ${match.venue}`;

            const scores = match.score.map(score => `<span class="match-score">${score.inning}: ${score.r}/${score.w} in ${score.o} overs</span>`);

            return `<li>${matchInfo}<br>Scores: ${scores.join('; ')}</li>`;
        });

        document.getElementById("matches").innerHTML = relevantData.join('');
        return relevantData;
    } catch (error) {
        console.log('Error fetching match data:', error);
    }
}

getMatchData();

async function getSportsNews() {
    try {
        const response = await fetch("https://api.thenewsapi.com/v1/news/top?api_token=SdoCZ2b3ZLvnFF7QW8HgS1aVtvnOVc7dkaqguUVe&locale=us,in&limit=3&categories=sports");
        const data = await response.json();

        const newsList = data.data;

        const relevantData = newsList.map(news => {
            const newsInfo = `<h4><a href="${news.url}" target="_blank">${news.title}</a></h4><br>Description: ${news.description}<br>`;
            return `<li>${newsInfo}</li>`;
        });

        document.getElementById("sportsNews").innerHTML = relevantData.join('');
        return relevantData;
    } catch (error) {
        console.log('Error fetching sports news:', error);
    }
}
getSportsNews();
