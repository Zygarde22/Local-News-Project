async function fetchRSS() {
    // Path to the local RSS feed file
    const rssFile = "nola-news.xml";

    try {
        const response = await fetch(rssFile); // Fetch the local RSS file
        if (!response.ok) throw new Error("Failed to fetch RSS feed");

        const text = await response.text(); // Get the raw XML content
        const parser = new DOMParser();
        const xmlDoc = parser.parseFromString(text, "application/xml");

        // Extract RSS feed items
        const items = xmlDoc.querySelectorAll("item");
        const feedContainer = document.getElementById("rss-feed");
        feedContainer.innerHTML = ""; // Clear existing content

        // Display the first 5 articles
        items.forEach((item, index) => {
            if (index >= 5) return; // Limit to 5 items

            const title = item.querySelector("title").textContent;
            const link = item.querySelector("link").textContent;
            const description = item.querySelector("description").textContent;
            const pubDate = item.querySelector("pubDate").textContent;

            const listItem = document.createElement("li");
            listItem.innerHTML = `
                <a href="${link}" target="_blank" rel="noopener">
                    ${title}
                </a>
                <p>${pubDate} - ${description}</p>
            `;
            feedContainer.appendChild(listItem);
        });
    } catch (error) {
        console.error("Failed to load RSS feed:", error);
        document.getElementById("rss-feed").innerHTML =
            "<li>Unable to load news. Please try again later.</li>";
    }
}

// Fetch RSS feed on page load
fetchRSS();
