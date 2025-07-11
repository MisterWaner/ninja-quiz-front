# NINJA QUIZ - Frontend

Frontend de l'application **Ninja Quiz**, développé avec **React**, **ViteJS** et **TypeScript**. Utilisant **React Router 7**, **Zustand** pour le state management, **Zod** pour la validation des données, et **Tanstack React Query** pour la manipulation des données.

---

## 🚀 Fonctionnalités

-   Interface de quiz interactive
-   Authentification avec JWT via cookie HTTPOnly
-   Routes publiques et protégées via React Router 7
-   Gestion de l'état global avec Zustand
-   Chargement et manipulation des données avec Tanstack React Query
-   Affichage des scores et historique personel
-   Choix de thèmes et sujets variés
-   Intégration avec l'API backend Ninja Quiz

---

## 📦 Stack technique

-   [React](https://react.dev/)
-   [TypeScript](https://www.typescriptlang.org/)
-   [Vite](https://vitejs.dev/)
-   [React Router 7](https://reactrouter.com/en/main)
-   [Zustand](https://github.com/pmndrs/zustand)
-   [React Hook Form](https://react-hook-form.com/)
-   [Tailwind CSS](https://tailwindcss.com/)
-   [Shadcn/ui](https://ui.shadcn.com/)

---

## 🔄 Interaction avec le backend

Le frontend consomme l'API REST de Ninja Quiz Backend pour :
- Authentification utilisateur
- Récupération des thèmes et questions de quiz
- Envoie des réponses et calcul des scores
- Affichage des scores et moyennes

---

## 📖 Notes
- Les routes protégées redirigent vers ```/connexion``` si l'utilisateur n'est pas authentifié.
- Le timer des quiz est géré côté frontend avec possibilité de le stopper à la soumission.
- Les thèmes et sujets sont chargés dynamiquement depuis le backend.
- Les scores se mettent à jour en temps réel et sont remis à zéro automatiquement côté backend chaque mois via un cron.

## 📢 Auteur

Développé par [MisterWaner](https://github.com/MisterWaner)