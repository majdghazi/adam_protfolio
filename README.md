# Adam Benali — Portfolio Génie Civil

Portfolio statique pour un étudiant ingénieur en Génie Civil (3ème année).
Site multi-pages en HTML / CSS / JavaScript vanilla, sans framework, déployable sur Vercel.

## 🧱 Structure

```
adam_portfolio/
├── index.html          # Page d'accueil (hero + expertise + projets phares)
├── about.html          # CV : formation, expérience, compétences
├── projects.html       # Galerie de projets avec filtres
├── contact.html        # Formulaire et coordonnées
├── css/
│   └── style.css       # Styles complets (responsive)
├── js/
│   └── main.js         # Nav mobile, filtres, animations
├── files/              # CV PDF (à ajouter)
├── images/             # Photos de projets (à ajouter)
├── vercel.json         # Config Vercel
└── README.md
```

## 🚀 Démarrage local

Aucun build requis. Ouvrir directement `index.html` dans un navigateur, ou servir via :

```bash
python3 -m http.server 8000
# puis ouvrir http://localhost:8000
```

## ☁️ Déploiement Vercel

1. Push ce repo sur GitHub (déjà configuré : `git@github.com:majdghazi/adam_protfolio.git`)
2. Aller sur [vercel.com](https://vercel.com) → New Project → Importer le repo
3. Framework Preset : **Other** (site statique)
4. Build Command : *laisser vide*
5. Output Directory : *laisser vide*
6. Cliquer sur **Deploy**

Vercel détecte automatiquement le site statique et le déploie en quelques secondes.

## ✏️ Personnalisation

- **Textes** : modifier directement les fichiers HTML
- **Couleurs** : variables CSS en haut de [css/style.css](css/style.css) (`:root`)
- **Photos de projets** : ajouter les images dans `images/` et remplacer les `background: linear-gradient(...)` dans les blocs `.project-image` par `background-image: url(...)`
- **CV PDF** : déposer le fichier dans `files/CV_Adam_Benali.pdf`

## ⚠️ Note

Le contenu actuel est **fictif** (étudiant inventé pour la démo). À remplacer par les vraies informations.

---

*Site construit from scratch — vanilla HTML/CSS/JS, sans dépendances.*
