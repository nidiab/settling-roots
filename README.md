# Settling Roots

A small Vite + React application deployed to GitHub Pages using GitHub Actions artifacts (no built files committed).

## Scripts

- `npm run dev` — start Vite dev server
- `npm run build` — build to `dist/` (artifact uploaded by Pages workflow)
- `npm run preview` — preview production build locally
- `npm run lint` — run ESLint (flat config)
- `npm run format` — format with Prettier
- `npm run format:check` — check formatting

## Tooling

- ESLint (flat config) with `eslint-plugin-react` and `eslint-plugin-react-hooks`
- Prettier for formatting
- GitHub Actions CI (`.github/workflows/ci.yml`) runs lint, format check, and build on push/PR
- Deploy workflow (`.github/workflows/deploy.yml`) uploads `dist/` and deploys to GitHub Pages (no `docs/` committed)
- Husky + lint-staged run ESLint fix and Prettier on staged files at commit time

## Development

1. Install dependencies:
   ```bash
   npm install
   ```
2. Start dev server:
   ```bash
   npm run dev
   ```

## GitHub Pages

The Vite build outputs to `dist/`. The Pages workflow uploads it as an artifact and deploys it. The `docs/` folder is ignored and not committed.

## Environment Variables

`./.env.production` contains `VITE_GA_ID` used for GA4. It is safe to commit.

## Editor Setup (VS Code)

`.vscode/` is in `.gitignore`. You can add the following locally in `.vscode/settings.json` to enable format on save:

```json
{
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "editor.formatOnSave": true,
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true,
    "source.organizeImports": true
  }
}
```
