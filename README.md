# 🏘️ Neighbor AI

Une application communautaire moderne pour connecter les habitants d'un quartier, signaler les problèmes et collaborer pour améliorer le voisinage.

## 🎯 Fonctionnalités

### 📱 Feed Social
- **6 Catégories** : Sécurité, Infrastructure, Événements, Communauté, Affaires, Environnement
- **Système de Likes & Commentaires** : Engagez-vous avec la communauté
- **Analyse de Sentiment** : Détection automatique du sentiment des posts
- **Vérification** : Badges pour les utilisateurs vérifiés
- **Priorités** : Marquage des alertes critiques

### 📊 Dashboard Maire
- **Statistiques en Temps Réel** : Posts, utilisateurs, alertes
- **Graphiques d'Activité** : Tendances hebdomadaires
- **Gestion des Alertes** : Suivi des problèmes critiques
- **Rapports** : Export de données pour l'analyse

### 🗺️ Carte Interactive
- **Géolocalisation** : Marqueurs sur la carte
- **Filtrage** : Par catégorie et sévérité
- **Détails** : Informations complètes des marqueurs
- **Statistiques** : Résumé des marqueurs affichés

### 🔔 Notifications
- **Slack Integration** : Alertes en temps réel
- **Email Digests** : Résumés hebdomadaires
- **In-App Notifications** : Mises à jour instantanées

## 🛠️ Stack Technique

### Frontend
- **React 19** - Interface utilisateur
- **Tailwind CSS 4** - Styling moderne
- **Recharts** - Graphiques interactifs
- **Lucide React** - Icônes
- **Wouter** - Routage léger

### Backend
- **Express 4** - Serveur web
- **tRPC 11** - API type-safe
- **Drizzle ORM** - Gestion de base de données
- **MySQL/TiDB** - Base de données

### Intégrations
- **Manus OAuth** - Authentification
- **Slack** - Notifications
- **Google Maps** - Géolocalisation
- **LLM** - Analyse de sentiment

## 🚀 Déploiement

### Vercel
```bash
# Le projet est configuré pour Vercel
# Connectez votre repo GitHub et déployez automatiquement
```

### Variables d'Environnement
```
DATABASE_URL=mysql://...
JWT_SECRET=your_secret
SLACK_WEBHOOK_URL=https://hooks.slack.com/...
VITE_APP_ID=your_app_id
```

## 📦 Installation

```bash
# Installer les dépendances
pnpm install

# Lancer le serveur de développement
pnpm dev

# Lancer les tests
pnpm test

# Build production
pnpm build
```

## 📝 Licence

MIT

## 👥 Contributeurs

- Manus AI - Développement initial

---

Créé avec ❤️ pour les communautés locales
