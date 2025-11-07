# Les Petits Plats — Algorithme de recherche et interface (Bootstrap + JS)

[![CI](https://img.shields.io/badge/CI-none-lightgrey)]() [![Licence](https://img.shields.io/badge/Licence-MIT-blue)]()

> Projet : **Développez un algorithme de recherche en JavaScript** — Les Petits Plats.  
> **Objectif général :** concevoir et comparer deux versions d’un algorithme de recherche optimisé pour une plateforme de recettes (front Bootstrap + algorithme JS), analyser leurs performances et documenter le choix (Green Code).

## 📚 Table des matières
- [Description](#-description)
- [Objectifs pédagogiques](#-objectifs-p%C3%A9dagogiques)
- [Compétences & Preuves](#-comp%C3%A9tences--preuves)
- [Stack & Versions](#-stack--versions)
- [Structure du projet](#-structure-du-projet)
- [Fonctionnalités clés](#-fonctionnalit%C3%A9s-cl%C3%A9s)
- [Installation & Lancement](#-installation--lancement)
- [Available Scripts](#available-scripts)
- [Tests & Performance](#-tests--performance)
- [Démo & Captures](#-d%C3%A9mo--captures)
- [Roadmap](#-roadmap)
- [Licence](#-licence)
- [Contact](#-contact)
- [English version](#english-version)

---

## 🚀 Description
Les Petits Plats est un projet centré sur la **qualité algorithmique** : développer deux implémentations d’un moteur de recherche sur un dataset JSON de recettes, comparer performances (temps d’exécution) et choisir la meilleure approche en tenant compte des principes de **Green Code** (efficience énergétique / CPU). L’UI est basée sur Bootstrap pour la présentation et la validation manuelle.

> **Résultats clés** : deux algorithmes comparés • rapport de performance (JsBench / similar) • UI Bootstrap fonctionnelle.

## 🎯 Objectifs pédagogiques
- Concevoir et implémenter deux versions d’un algorithme de recherche (ex. boucle impérative vs approche fonctionnelle `filter/map/reduce`).  
- Mesurer et comparer les performances (benchmarking).  
- Documenter la solution choisie (justification technique et critères Green Code).  
- Implémenter l’interface front (Bootstrap) pour tester l’expérience utilisateur.

## 🧠 Compétences & Preuves
| Exigence pédagogique | Compétence recrutée | Mise en œuvre | Preuves |
|---|---|---:|---|
| Algorithmes | **Complexité & optimisation** | 2 implémentations comparées | `src/searchImperative.js`, `src/searchFunctional.js` |
| UI | **Bootstrap** | Interface responsive pour recherche | `index.html`, `css/bootstrap-custom.css` |
| Benchmarking | **Jsbench / jsben.ch** | Rapports performance (PDF / screenshots) | `reports/benchmark-*.pdf` |
| Green Code | **Efficience** | Choix basé sur perf & consommation CPU | Rapport technique (README / PDF) |

*(Les fichiers ci-dessus correspondent au livrable attendu : code, bench, rapport.)*

## 🧰 Stack & Versions
| Tech | Rôle |
|---|---|
| HTML5 + Bootstrap | Interface & layout |
| JavaScript (Vanilla) | Algorithme & interactions |
| Node/npm (optionnel) | Outils de bench / scripts |
| Jsben.ch / Benchmark tool | Mesure des performances |

## 🗂️ Structure du projet (exemple)
```txt
petits-plats/
├─ index.html
├─ css/
├─ js/
│  ├─ searchImperative.js
│  ├─ searchFunctional.js
│  └─ app.js
├─ data/
│  └─ recipes.json
├─ reports/
│  └─ benchmark-compare.pdf
└─ README.md
```

## ✅ Fonctionnalités clés
* [x] Interface Bootstrap pour lancer la recherche.  
* [x] Deux implémentations d’algorithme (boucles impératives vs fonctions tableau).  
* [x] Benchmarks et rapport de performance (JsBench / outils équivalents).  
* [x] Document technique expliquant le choix (incluant critères Green Code).

## ⚡ Installation & Lancement
```bash
# Cloner
git clone https://github.com/devchon2/petits-plats.git
cd petits-plats

# Option A — projet statique
# ouvrir index.html dans le navigateur
# Option B — servir localement
npx http-server -c-1 .
# ouvrir http://localhost:8080
```

### Si des scripts Node sont fournis (benchmark)
```bash
npm install
npm run bench    # script optionnel pour lancer les benchmarks
```

## 📜 Available Scripts
```bash
# Exemple (adapter selon package.json)
npm run bench
npm test
```

## 🧪 Tests & Performance
* Lancer les benchmarks : `npm run bench` (si script présent) ou exécuter les tests via jsben.ch (export PDF).  
* Critères : temps d’exécution moyen, variance, utilisation CPU.  
* Livrables : screenshots/PDF des runs (avant/après optimisations), document expliquant choix.

## 🎥 Démo & Captures
* Livrable : repo public + `reports/` contenant benchmarks et rapport technique.  
* Soutenance : démonstration des deux algorithmes, mesures et justification du choix.

## 🗺️ Roadmap
* Ajouter profiling énergie (si possible) • packaging du benchmark pour CI.

## 📝 Licence
MIT — ajouter `LICENSE` à la racine si nécessaire.

## 📫 Contact
Rachid Chon — `rchon@rchon-dev.fr`

---

## English version

<details>
<summary>🇬🇧 Click to expand</summary>

# Les Petits Plats — Search algorithm & UI (Bootstrap + JS)

> Training project: implement and compare two search algorithms on a recipes dataset, benchmark them (jsben.ch) and document the choice under Green Code constraints. See French version for full details.

</details>
