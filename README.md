# Facebook Creatives UI

A React TypeScript application built with Vite, Material UI, and Tailwind CSS to display creative data from the Facebook Creatives API. This UI allows users to view creatives, filter by labels, and interact with performance metrics.

## Table of Contents

- [Features](#features)
- [Installation](#installation)
  - [Local Installation](#local-installation)
- [Configuration](#configuration)
- [Usage](#usage)
- [Live Demo](#live-demo)
- [Future Improvements](#future-improvements)
- [Additional Notes](#additional-notes)

## Features

- **Fast Development:** Built with Vite for rapid development and optimized builds.
- **Modern UI:** Utilizes Material UI components and Tailwind CSS for a responsive, attractive interface.
- **Creative Display:** Shows creative cards with images, hashtags for labels, and performance metrics.
- **Filtering:** Provides a beautiful filter bar to filter creatives by labels.
- **Load More Functionality:** Supports incremental loading of creatives.
- **Interactivity:** Buttons to view detailed performance metrics via a popover.

## Installation

### Local Installation

1. **Clone the Repository:**

   ```bash
   git clone https://github.com/milaana1988/facebook-creatives-ui.git
   cd facebook-creatives-ui

2. **Install Dependencies:**
  ```bash
  npm install
3. **Run the Development Server:**
  ```bash
  npm run dev

## Configuration
This project uses environment variables to configure API endpoints. In a Vite project, environment variables must be prefixed with VITE_ to be accessible in the code.

1. **Create a .env file in the project root:**

  ```dotenv
  VITE_API_BASE_URL="http://localhost:8000/api"

2. **Restart the Development Server:**

  After editing the .env file, restart the dev server to ensure the changes take effect.

## Usage
- **Viewing Creatives:**
  The main dashboard displays creative cards with images, hashtags for labels, and buttons for performance metrics.

- **Filtering:**
  Use the filter bar (implemented with Material UI’s ToggleButtonGroup) at the top to select label filters. The dashboard updates to display only creatives that match the selected filters.

- **Load More:**
  Click the "Load More" button at the bottom of the dashboard to fetch additional creatives from the backend API.

- **Performance Metrics:** 
  Click the "Show Metrics" button on any creative card to view detailed performance metrics via a popover.

## Live Demo
  https://creatives-ui-9f021aba052c.herokuapp.com/

## Future Improvements
- **Enhanced Filtering:** 
  Add additional filtering options and search functionality for creatives.

- **User Authentication:**
  Integrate API authentication (Cognito, OAuth2, JWT, or API keys) to secure access to sensitive endpoints.

- **Testing:**
  Develop a comprehensive test suite, including integration and E2E tests, to ensure the UI behaves as expected.

- **Features**
  Implement more engaging features 

## Additional Notes
  This project uses Vite for fast builds and Hot Module Replacement (HMR) during development.

  Material UI and Tailwind CSS are integrated for rapid, customizable UI development.

  Make sure the backend API (FastAPI) is running and accessible via the URL specified in your environment variables.

  Remember to add your .env file to .gitignore to prevent sensitive information from being committed.

