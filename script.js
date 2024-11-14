// URL brute du fichier data.json hébergé sur GitHub
const dataUrl = "https://raw.githubusercontent.com/switch91/BlogAuto/main/data.json?token=GHSAT0AAAAAAC2IAHCBXVAFK3LAZMY5VEV6ZZQ4OYA";

// Charger les articles depuis le fichier JSON sur GitHub
async function loadArticles() {
    try {
        const response = await fetch(dataUrl);
        if (!response.ok) {
            throw new Error(`Erreur de chargement : ${response.statusText}`);
        }
        const articles = await response.json();

        const articlesContainer = document.getElementById("articles");

        // Créer un élément pour chaque article
        articles.forEach(article => {
            const articleElement = document.createElement("div");
            articleElement.classList.add("article");

            const title = document.createElement("h2");
            title.innerText = article.title;

            const content = document.createElement("p");
            content.innerText = article.content;

            articleElement.appendChild(title);
            articleElement.appendChild(content);
            articlesContainer.appendChild(articleElement);
        });
    } catch (error) {
        console.error("Erreur lors du chargement des articles :", error);
    }
}

// Charger les articles au chargement de la page
window.onload = loadArticles;
