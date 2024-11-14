const dataUrl = https://github.com/switch91/autogen.git // URL sans token

async function loadArticles() {
    try {
        const response = await fetch(dataUrl);
        if (!response.ok) {
            throw new Error(`Erreur de chargement : ${response.statusText}`);
        }
        const articles = await response.json();
        const articlesContainer = document.getElementById("articles");

        articles.forEach(article => {
            if (article.title && article.content) {
                const articleElement = document.createElement("div");
                articleElement.classList.add("article");

                const title = document.createElement("h2");
                title.innerText = article.title;

                const content = document.createElement("p");
                content.innerText = article.content;

                articleElement.appendChild(title);
                articleElement.appendChild(content);
                articlesContainer.appendChild(articleElement);
            } else {
                console.warn("Article manquant de données :", article);
            }
        });
    } catch (error) {
        console.error("Erreur lors du chargement des articles :", error);
        document.getElementById("articles").innerHTML = "<p>Impossible de charger les articles.</p>";
    }
}

window.onload = loadArticles;
