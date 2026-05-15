# Export vers GitHub

## Instructions pour exporter le projet sur GitHub

### Option 1 : Utiliser le Management UI (Recommandé)

1. Allez dans le Management UI du projet
2. Cliquez sur "Settings" → "GitHub"
3. Sélectionnez votre compte GitHub
4. Entrez le nom du repository: `neighbor-ai`
5. Cliquez sur "Export"

### Option 2 : Utiliser la ligne de commande

```bash
# Ajouter le remote GitHub
git remote add origin https://github.com/YOUR_USERNAME/neighbor-ai.git

# Pousser le code
git branch -M main
git push -u origin main
```

### Option 3 : Utiliser les connecteurs Manus

Les connecteurs GitHub sont déjà configurés. Utilisez le Management UI pour exporter directement.

## Après l'export

1. Vérifiez que le code est bien sur GitHub
2. Configurez Vercel pour le déploiement automatique
3. Ajoutez les secrets dans Vercel:
   - `DATABASE_URL`
   - `JWT_SECRET`
   - `SLACK_WEBHOOK_URL`
   - `VITE_APP_ID`

## Commits disponibles

- `25ce61a` - Add README and .gitignore
- `890838f` - Initial commit: Neighbor AI with new design and features
- `9ff768c` - Checkpoint: Phase 5 - Interface Utilisateur Complète
- `36c8185` - Checkpoint: Phase 4 - Slack & Vercel Integration
- `952dea3` - Initial project bootstrap

