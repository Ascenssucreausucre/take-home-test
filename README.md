# URL Shortener MVP

Ce projet est un **raccourcisseur d’URL minimal** développé dans le cadre d’un test technique. Il permet de soumettre une URL longue et de générer une version courte qui redirige vers l’originale.

Ce MVP est conçu pour être **fonctionnel rapidement**, avec stockage en mémoire et interface simple.

---

## 🚀 Stack technique

- **Next.js (App Router)** avec TypeScript pour le front et le back
- **React + Tailwind CSS** pour l’interface
- **Axios** pour les appels API
- **In-memory store** (Map) pour les URLs raccourcies
- Pas de base de données externe ni d’authentification

---

## 📦 Structure du projet

/app
/api
/shorten/route.ts ← Endpoint POST pour créer une URL courte
/[code]/route.ts ← Endpoint GET pour rediriger vers l’URL originale
/page.tsx ← Page principale avec formulaire
/lib
store.ts ← Store en mémoire pour les URLs
generator.ts ← Génération de codes courts aléatoires


---

## ⚡ Fonctionnalités

- Soumettre une URL et recevoir une version courte
- Vérification basique du format de l’URL
- Gestion des collisions de codes courts
- Redirection automatique via `/[code]`
- Feedback visuel côté frontend (chargement, succès, erreur)

---

## 📌 Limitations connues

- Stockage uniquement en mémoire (les URLs sont perdues au redémarrage du serveur)
- Pas de gestion des URLs personnalisées
- Pas de modération ou filtrage d’URLs malveillantes
- Pas de suivi des clics

---

## 🔧 Installation & démarrage

1. Cloner le repo :

```bash
git clone https://github.com/Ascenssucreausucre/take-home-test.git
cd take-home-test
```
2. Installer les dépendances :
```bash
npm install
```
3. Lancer le serveur de développement
```bash
npm run dev
```
4. Ouvrir l'application dans votre navigateur :
   [http://localhost:3000]
   
---

## 📝 Utilisation
**Créer une URL courte**
POST /api/shorten
Body JSON :
```json{
  "originalUrl": "https://example.com"
}
```
Réponse : 
```json{
  "shortUrl": "http://localhost:3000/abc123",
  "code": "abc123",
  "originalUrl": "https://example.com"
}
```
**Redirection via code**
GET /abc123 -> Redirige automatiquement

**Obtention de l'URL original via code**
/api/redirect/abc123
Réponse :
```json{
    "originalUrl": {
        "originalUrl": "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
        "shortCode": "ASlQ1B"
    }
}
```
(oublions la typo)

**Visualisation du storage pour debug**
GET /api/reflect

---

## 🛠️ Décisions techniques

- Next.js + TypeScript : un seul framework pour front et back, simplifie le routing et le typage.

- Map en mémoire : rapide à mettre en place pour un MVP.

- Codes courts aléatoires : génération simple avec vérification de collisions.

- API REST simple : POST pour créer, GET pour rediriger.

---

## 🔮 Améliorations futures

- Si le projet devait être développé plus loin :

- Persistance avec une base de données (SQLite, Postgres, Redis…)

- Authentification et gestion des utilisateurs

- Codes personnalisés payants

- Modération et filtrage d’URLs malveillantes

- Suivi des clics et analytics

- Interface utilisateur plus complète avec historique des URLs

---

## 👨‍💻 Auteur

Florian Amiot – Test technique pour Platane.io
