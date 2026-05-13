# Configuration Slack & Vercel pour Neighbor AI

Ce document explique comment configurer l'intégration Slack et Vercel pour Neighbor AI.

## Configuration Slack

### 1. Créer un Incoming Webhook

1. Allez sur [https://api.slack.com/apps](https://api.slack.com/apps)
2. Créez une nouvelle application ou sélectionnez-en une existante
3. Allez dans **Incoming Webhooks** et activez-le
4. Cliquez sur **Add New Webhook to Workspace**
5. Sélectionnez le canal où envoyer les notifications
6. Copiez l'URL du webhook (commence par `https://hooks.slack.com/...`)

### 2. Configurer les variables d'environnement

Utilisez `webdev_request_secrets` pour ajouter les variables suivantes :

```
SLACK_WEBHOOK_URL=https://hooks.slack.com/services/YOUR/WEBHOOK/URL
SLACK_CHANNEL=#alerts
SLACK_DEPLOYMENT_CHANNEL=#deployments
SLACK_MODERATION_CHANNEL=#moderation
SLACK_SUMMARY_CHANNEL=#weekly-summary
```

### 3. Endpoints disponibles

**Envoyer une notification personnalisée :**
```bash
POST /api/slack/notify
Content-Type: application/json

{
  "channel": "#alerts",
  "text": "Message simple",
  "attachments": [{
    "color": "#FF0000",
    "title": "Alerte",
    "text": "Description de l'alerte"
  }]
}
```

**Envoyer une notification de déploiement :**
```bash
POST /api/slack/deploy
Content-Type: application/json

{
  "status": "success",
  "version": "v1.2.3",
  "details": "Deployment completed successfully"
}
```

## Configuration Vercel

### 1. Créer un token d'accès Vercel

1. Allez sur [https://vercel.com/account/tokens](https://vercel.com/account/tokens)
2. Cliquez sur **Create Token**
3. Donnez-lui un nom (ex: "Neighbor AI Deployment")
4. Copiez le token

### 2. Configurer les variables d'environnement

Utilisez `webdev_request_secrets` pour ajouter :

```
VERCEL_TOKEN=your_token_here
VERCEL_PROJECT_ID=your_project_id_here
```

### 3. Déployer sur Vercel

**Option 1 : Déploiement automatique depuis GitHub**

1. Connectez votre repo GitHub à Vercel
2. Vercel détectera automatiquement le `vercel.json`
3. Configurez les variables d'environnement dans Vercel
4. Chaque push déclenche un déploiement automatique

**Option 2 : Déploiement manuel**

```bash
npm install -g vercel
vercel login
vercel deploy --prod
```

## Intégration avec les événements métier

Les fonctions Slack peuvent être appelées depuis n'importe quel endpoint tRPC ou Express :

```typescript
import { sendCriticalAlert, sendDeploymentNotification } from "./server/_core/slack";

// Envoyer une alerte
await sendCriticalAlert(
  "Database Error",
  "Connection failed",
  "high"
);

// Envoyer une notification de déploiement
await sendDeploymentNotification(
  "success",
  "v1.2.3",
  "All tests passed"
);
```

## Monitoring et Alertes

### Alertes de déploiement

Une notification Slack est automatiquement envoyée au démarrage du serveur en production.

### Alertes critiques

Pour envoyer une alerte critique depuis votre code :

```typescript
import { sendCriticalAlert } from "./server/_core/slack";

await sendCriticalAlert(
  "Critical Event",
  "Description détaillée",
  "high" // ou "medium" / "low"
);
```

### Résumés hebdomadaires

Pour envoyer un résumé hebdomadaire :

```typescript
import { sendWeeklySummary } from "./server/_core/slack";

await sendWeeklySummary({
  totalPosts: 150,
  totalComments: 450,
  totalUsers: 50,
  topCategory: "Safety",
  engagementRate: 0.75
});
```

## Tests

Tous les tests sont dans `server/_core/slack.test.ts`. Lancez-les avec :

```bash
pnpm test
```

## Dépannage

### Webhook URL non configurée

Si vous voyez `[Slack] Webhook URL not configured`, vérifiez que `SLACK_WEBHOOK_URL` est défini dans les variables d'environnement.

### Erreur de connexion Slack

Vérifiez que :
1. L'URL du webhook est correcte
2. Le webhook n'a pas expiré
3. Le canal existe et est accessible

### Déploiement Vercel échoue

Vérifiez que :
1. Le `vercel.json` est correct
2. Les variables d'environnement sont configurées dans Vercel
3. Le build réussit localement avec `pnpm build`
