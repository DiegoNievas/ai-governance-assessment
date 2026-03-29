# AI Governance Assessment Tool

An internal web application designed for consultants and practitioners to assess a customer's readiness to deploy AI agents. This tool provides a structured questionnaire that evaluates organizational maturity, highlights potential risks, and offers actionable recommendations based on established AI governance frameworks like **ISO/IEC 42001** and the **NIST AI RMF**.

## Features

- **Readiness Questionnaire:** A comprehensive assessment module focusing on AI Governance, Risk Management, Security, and Operational Readiness.
- **Interactive Dashboard:** Visualizes the assessment results with dynamic Radar charts, providing an immediate overview of maturity across different governance domains.
- **Executive Summary & Detailed Findings:** Generates professional-grade reports outlining risk ratings and tailored recommendations for the customer.
- **Export Capabilities:** Easily export the assessment results as a PDF or Markdown document to facilitate effective customer workshops and hand-offs.
- **Demo Mode:** Built-in capabilities to quickly populate the tool with sample data for demonstration purposes.

## How It Was Built

This project is built using a modern, fast, and scalable front-end technology stack designed for responsiveness and professional aesthetics:

- **Framework:** [React 19](https://react.dev/) with **TypeScript** for robust, type-safe UI component development.
- **Build Tool:** [Vite](https://vitejs.dev/) for extremely fast Hot Module Replacement (HMR) and optimized production builds.
- **State Management:** [Zustand](https://github.com/pmndrs/zustand) to handle the application's global state, including questionnaire progress, scoring, and data persistence.
- **Styling:** [Tailwind CSS 4](https://tailwindcss.com/) for rapid utility-first styling, providing a sleek, executive-friendly design. Utility functions like `clsx` and `tailwind-merge` are used to manage dynamic component classes smoothly.
- **Data Visualization:** [Recharts](https://recharts.org/) is used to render responsive and customizable Radar charts for the maturity score dashboard.
- **Icons:** [Lucide React](https://lucide.dev/) for clean and consistent iconography throughout the app.
- **Exports:** Integrated with `html2pdf.js` to enable seamless client-side PDF generation.

## Getting Started

To run this project locally on your machine:

### Prerequisites

You will need [Node.js](https://nodejs.org/) installed on your machine.

### Installation

1. Clone this repository (if you haven't already).
2. Navigate to the project directory in your terminal:
   ```bash
   cd ai-governance-assessment
   ```
3. Install the dependencies:
   ```bash
   npm install
   ```

### Running the Development Server

Start the local Vite development server by running:

```bash
npm run dev
```

This will launch the application locally (typically at `http://localhost:5173`). Have fun exploring the assessment modules and generating governance reports!
