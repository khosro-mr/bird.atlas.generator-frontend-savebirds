<div align="center" style="font-size:24px; font-weight:bold">SaveBirds.app Bird Atlas Generator - Source Code</div>

## Source Code Structure

This directory contains the source code for the Bird Atlas Generator application. The structure includes:

### Core Files
- `main.js`: Application entry point that initializes Vue and imports global dependencies
- `App.vue`: Root Vue component that contains the router view
- `router/index.js`: Vue Router configuration with route definitions

### Views
- `views/BirdAtlasGeneratorView.vue`: Main component for the Bird Atlas Generator feature

### Assets
- `assets/`: Directory for static assets such as images and icons

### Components
- `components/`: Directory for reusable Vue components (currently empty as all functionality is in the main view)

## Implementation Notes
- The application uses Vue 3 Composition API
- Bootstrap 5 is used for styling and responsive layout
- Leaflet.js is implemented for interactive mapping capabilities
- Mock data is currently used for geographic boundaries visualization 