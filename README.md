# GenIA

Projet Next.js 16 pret pour Vercel, avec une landing premium et un parcours d'inscription utilisable tout de suite.

## Stack

- Next.js 16 App Router
- TypeScript
- Tailwind CSS v4
- Framer Motion
- Lucide React

## Lancer en local

```bash
npm install
npm run dev
```

## Variables d'environnement optionnelles

Creer un fichier `.env.local` si vous voulez brancher un vrai canal serveur:

```bash
GENIA_WHATSAPP_NUMBER=2290159037159
GENIA_REGISTRATION_WEBHOOK_URL=https://votre-endpoint.com/inscriptions
```

## Comportement du formulaire

- si `GENIA_REGISTRATION_WEBHOOK_URL` est defini, `/api/register` transfere la demande au webhook
- sinon, l'API retourne un lien WhatsApp pre-rempli

## Deploiement sur Vercel

1. pousser le projet sur GitHub
2. importer le repo dans Vercel
3. ajouter les variables d'environnement si necessaire
4. lancer le deploy

Le projet est configure comme une app Next.js standard, donc `vercel.json` n'est pas necessaire.
