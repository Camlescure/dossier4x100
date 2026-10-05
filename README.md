# DOSSIER 4X100

Jeu d’escape game web, conçu pour une utilisation mobile-first.

## Développement local

```powershell
npm ci
npm run dev
```

Ouvrez ensuite l’adresse affichée par Next.js, généralement <http://localhost:3000>.

Pour vérifier le projet avant un envoi :

```powershell
npm run lint
npm test
npm run build
```

## Déploiement GitHub Pages

Chaque `push` sur la branche `main` déploie automatiquement une version statique sur :

<https://camlescure.github.io/dossier4x100/>

Le workflow peut aussi être lancé manuellement depuis l’onglet **Actions** de GitHub. Il compile le projet avec le préfixe GitHub Pages `/dossier4x100`, tandis que `npm run dev` garde des URLs locales sans préfixe.

Pour reproduire ce build Pages en local avec PowerShell :

```powershell
$env:NEXT_PUBLIC_BASE_PATH = "/dossier4x100"
npm run build
Remove-Item Env:NEXT_PUBLIC_BASE_PATH
```

Avant le premier déploiement, dans **Settings → Pages** du dépôt, choisissez **GitHub Actions** comme source de déploiement.
