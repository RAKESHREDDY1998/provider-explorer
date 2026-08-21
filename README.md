# Provider Directory Explorer

A comparative repository showcasing a mobile-first, Section 508-compliant single-page application for searching the NPPES provider registry. The project features two implementations—one in Ember.js and another in React—to demonstrate the architectural, routing, data fetching, and tooling differences between the two ecosystems.

## Project Structure

- **`/ember-app`**: The Ember.js implementation utilizing Ember Data, custom adapters, and Gulp build hooks.
- **`/react-app`**: The React implementation utilizing Vite, React Router, and direct `fetch` calls.
- **`/shared-styles`**: BEM-based Sass styling system and SVG sprites shared across both applications.

## Comparison Report

### Architecture
- **Ember.js**: Embraces a convention-over-configuration structure. It uses nested routes, controllers, and templates that separate logical concerns strictly by file type and path. 
- **React**: A component-driven architecture using Vite as the bundler. Uses JSX and collocated logic/styles within functional components.

### Routing
- **Ember.js**: The routing is centrally defined in `router.ts`, offering nested UI capabilities out-of-the-box via the `{{outlet}}` component.
- **React**: Relies on `react-router-dom` in `main.tsx` to handle route definitions, providing a more explicit and code-centric routing topology.

### Data Fetching
- **Ember.js**: Uses `@ember-data/store` to retrieve data. A custom `ProviderAdapter` intercepts requests and appends custom query parameters specific to the NPPES registry. A `ProviderSerializer` normalizes the non-standard JSON response.
- **React**: Employs direct `fetch` calls wrapped in `useEffect` hooks. Data is manually typed using TypeScript interfaces and stored in component state using `useState`.

### Styling & Assets
- **Shared**: Both stacks consume the `shared-styles` directory which contains BEM-structured SCSS and SVG assets.
- **Ember.js**: Gulp is wired into `ember-cli-build.js` to synchronously generate the SVG sprite during the build pipeline.
- **React**: The global `styles.scss` is imported at the `main.tsx` entry point. 

## Getting Started

To run either application locally, navigate into the respective folder (`ember-app` or `react-app`), install dependencies, and start the development server.

```bash
# Example for Ember
cd ember-app
npm install
npm run start

# Example for React
cd react-app
npm install
npm run dev
```
