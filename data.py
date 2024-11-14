import openai
import requests
import json

# Clés d'API
openai.api_key = "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"
github_token = "votre_jeton_github"

# Fonction pour générer un article via l'API OpenAI
def generer_article(titre):
    response = openai.ChatCompletion.create(
        model="gpt-4",
        messages=[
            {"role": "system", "content": "Tu es un rédacteur d'articles de blog."},
            {"role": "user", "content": f"Écris un article sur le sujet : {titre}."}
        ],
        max_tokens=500
    )
    return response.choices[0].message['content']

# Générer des articles avec une liste de sujets
sujets = ["Les bienfaits de la méditation", "Conseils pour un mode de vie sain", "Les tendances de la technologie en 2024"]
articles = [{"title": sujet, "content": generer_article(sujet)} for sujet in sujets]

# Mise à jour de data.json avec les nouveaux articles
data = json.dumps(articles, indent=4, ensure_ascii=False)

# URL du fichier sur GitHub
url_github = "https://api.github.com/repos/switch91/BlogAuto/contents/data.json"
headers = {
    "Authorization": f"token {github_token}",
    "Accept": "application/vnd.github.v3+json"
}

# Obtenir le SHA actuel de data.json pour la mise à jour
response = requests.get(url_github, headers=headers)
sha = response.json()['sha']

# Préparer la requête pour mettre à jour data.json
payload = {
    "message": "Mise à jour automatique des articles",
    "content": data.encode('utf-8').decode('utf-8'),
    "sha": sha
}

# Envoyer la requête PUT à GitHub pour mettre à jour data.json
response = requests.put(url_github, headers=headers, json=payload)

if response.status_code == 200:
    print("data.json mis à jour avec succès.")
else:
    print("Échec de la mise à jour de data.json :", response.text)
