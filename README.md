# Critera (by Quantum Leap)

**Critera** – a premium, multitenant SaaS platform that helps AI consultants assess, report, and roadmap AI governance for their clients.  The app provides a sleek landing page, secure authentication, a rich analytics dashboard, one‑click PDF export, historical report viewing, and a dynamically generated 12‑month implementation roadmap.

---

## Table of Contents
- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Installation & Development](#installation--development)
- [Deployment (GitHub Pages)](#deployment-github-pages)
- [Architecture Highlights](#architecture-highlights)
- [Usage Guide](#usage-guide)
- [Contributing](#contributing)
- [License](#license)

---

The **Critera** platform is designed for AI consultants and MSPs to:
1. Run ISO/IEC 42001‑aligned assessments for client organizations.
2. Instantly visualise maturity, risk, and industry benchmarks on a premium dashboard.
3. Export a fully‑styled PDF report (including a custom 12‑month implementation roadmap) for client delivery.
4. Store assessments in a **row‑level‑security** enabled Supabase backend, ensuring strict multitenancy.
5. Re‑visit historic assessments via a secure *Report Viewer* route.

---

## Features

- **Landing Page** – glass‑morphic, dark‑mode ready, with brand‑new **Critera** logo and a prominent **Log In** button.
- **Authentication** – sign‑up & login powered by Supabase Auth, with automatic organization UUID generation to bypass RLS read‑blocking.
- **Multitenant Data Isolation** – each consultant works within their own `organization_id`; all queries are scoped to the current user.
- **Analytics Dashboard** – four premium metric tiles (Total Pipeline, Avg Portfolio Maturity, Deployment Ready, Top Systemic Gap) plus:
  - Industry benchmark table.
  - Client maturity funnel visual.
  - Radar chart of domain scores.
  - Executive summary with strengths & gaps.
- **Action Dropdown** – three‑dot menu on each assessment row offering **Show Results** and **Download PDF**.
- **PDF Export** – one‑click export using `html2pdf.js` (dynamic import to avoid Vite bundling issues). The filename safely falls back to `Report` when the customer name is missing.
- **Historical Report Viewer** – `/report/:id` route renders a read‑only view of any saved assessment, with optional `?autoDownload=true` to trigger PDF generation automatically.
- **12‑Month Implementation Roadmap** – dynamically generated SOW based on the assessment’s top gaps and strengths, displayed beneath the executive summary.
- **Responsive & Accessible** – Tailwind‑styled components, dark‑mode support, keyboard‑friendly navigation.

---

## Tech Stack

- **Frontend** – React 19, TypeScript, Vite 5, Tailwind CSS, Lucide‑React icons.
- **PDF Generation** – `html2pdf.js` (lazy‑loaded on demand).
- **Backend** – Supabase (PostgreSQL) with Row‑Level Security.
- **State Management** – Zustand store for assessment data.
- **Routing** – `HashRouter` (compatible with GitHub Pages static hosting).

---

## Installation & Development

```bash
# Clone the repo
git clone https://github.com/DiegoNievas/ai-governance-assessment.git
cd ai-governance-assessment

# Install dependencies
npm install

# Set up Supabase env vars (create a .env file)
cp .env.example .env
# Fill in VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY

# Run the development server
npm run dev
```

The app will be available at `http://localhost:5173`.  Use the **Sign‑Up** flow to create a new organization; the UI automatically generates a UUID for the organization.

---

## Deployment (GitHub Pages)

The project is configured for static deployment via GitHub Pages:
1. Ensure the `homepage` field in `package.json` points to `https://<username>.github.io/ai-governance-assessment/`.
2. Push changes to `main`; the CI workflow runs `npm run build` and publishes the `dist/` folder.
3. The site is served from `https://DiegoNievas.github.io/ai-governance-assessment/`.

---

## Architecture Highlights

- **Row‑Level Security** – All tables (`organizations`, `user_profiles`, `assessments`) have policies that restrict reads/writes to the current `org_id`.
- **Organization UUID Generation** – During sign‑up we use `crypto.randomUUID()` on the client, avoiding a read‑after‑insert race.
- **Dashboard Refactor** – `Dashboard.tsx` now accepts an optional `data` prop and an `isReadOnly` flag, enabling reuse for both live assessments and historic snapshots.
- **Dynamic PDF Import** – The export handler lazily imports `html2pdf.js` (`await import('html2pdf.js')`) to prevent Vite build‑time crashes.
- **Report Viewer** – `/report/:id` fetches the frozen JSON (`full_data`) from Supabase and renders the same `Dashboard` component in read‑only mode.
- **Roadmap Component** – `ImplementationRoadmap.tsx` builds a quarterly plan using `topGaps` and `topStrengths` from the assessment results.

---

## Usage Guide

1. **Landing Page** – Click **Log In** to go to the authentication flow.
2. **Sign‑Up** – Provide name, email, and password. The app creates a new organization automatically.
3. **Dashboard** – After logging in you land on the admin dashboard where you can:
   - See the four metric tiles.
   - Browse the assessments table.
   - Use the three‑dot **Action** menu on each row:
     - **Show Results** – opens the historical report viewer.
     - **Download PDF** – triggers the PDF export (including the 12‑month roadmap).
4. **Export PDF** – The button is wired to `handleExportPDF`; it safely generates a filename and uses a dynamic import of `html2pdf.js`.
5. **Historical Report Viewer** – Accessible via `/report/:id`.  Adding `?autoDownload=true` automatically clicks the hidden export button after the component mounts.
6. **Implementation Roadmap** – Appears under the executive summary on every report, giving consultants a ready‑to‑present 12‑month plan.

---

## Contributing

Contributions are welcome!  Please follow these steps:
1. Fork the repository.
2. Create a feature branch (`git checkout -b feature/awesome‑feature`).
3. Ensure the code passes TypeScript checks (`npm run build`).
4. Open a Pull Request with a clear description of the change.
5. All new UI work should respect the existing design system (Tailwind utilities, dark‑mode colors, and glass‑morphism aesthetics).

---

## License

This project is licensed under the **MIT License**. See the `LICENSE` file for details.

---

*Critera by Quantum Leap. Built with love, glass‑morphism, and a dash of AI‑governance magic.*
