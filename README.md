# MehndiConnect

The current app is the Hindi-first Mehndi Services & Design Gallery. It uses
Next.js, TypeScript, and Tailwind CSS.

## Run locally

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Checks

```bash
npm test
npm run typecheck
npm run lint
npm run build
```

## Service catalog

The UI consumes typed entries from `lib/services/catalog.ts`. Replace
`sampleServices` with an approved catalog or connect a data loader without
changing the gallery components. All customer-facing copy is in
`lib/i18n/copy.ts`.

Catalog prices, packages, durations, and design art are illustrative
placeholders and need business approval before launch. Selecting a service
stores its ID in session storage under `mehndiconnect:selected-service`;
`getSelectedServiceId` in `lib/services/selection.ts` is the handoff for a
future booking step. This feature does not implement booking or payments.
