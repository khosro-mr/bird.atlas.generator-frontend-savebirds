<h1 align="center">SaveBirds.app Bird Atlas Generator (BAG)</h1>

## 1. Overview

This project is the frontend implementation of the Bird Atlas Generator (BAG) for SaveBirds.app. The tool allows users to generate comprehensive bird atlases for specific geographic areas and time periods, providing valuable insights for conservation and research efforts.

## 2. Features

- Select date ranges from 1966 to present
- Choose from multiple geographic boundaries (BCR, LCC, USA, Canada, etc.)
- Interactive map visualization with Leaflet.js
- Generate detailed bird atlas reports

## 3. Project Structure

- `/src`: Source code directory
  - `/views`: Vue components for views/pages
  - `/components`: Reusable UI components
  - `/assets`: Static assets and resources
  - `/router`: Vue Router configuration
- `/public`: Static files for the application
- `/images`: Design mockups and visual references

## 4. Technology Stack

- Vue 3 (Composition API)
- Bootstrap 5
- Leaflet.js for interactive mapping
- Vue Router for navigation

## 5. Setup Instructions

### 5.1. Installation

```bash
# Install dependencies
npm install

# Serve with hot-reload for development
npm run serve

# Build for production
npm run build

# Lint and fix files
npm run lint
```

### 5.2. Configuration

The application uses standard Vue.js configuration. See `vue.config.js` for customization options if needed.

## 6. References

Refer to the detailed specification document at `5-bird-atlas-generator.md` for comprehensive information about the requirements and design specifications.