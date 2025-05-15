# Promotion Management Prototype

A React-based prototype for managing product promotions with an intuitive user interface.

## Features

- Select product lines to apply promotions
- Configure promotion details including timeframes and discount types
- Conflict detection and resolution for overlapping promotions
- Visual feedback for user actions through toasts and modals

## Project Structure

- `src/components/`: Reusable UI components
- `src/pages/`: Main application views
- `src/styles/`: CSS stylesheets

## Technology Stack

- React 18
- Vite for build tooling
- CSS Modules for styling

## Getting Started

1. Clone the repository
2. Install dependencies:
   ```
   npm install
   ```
3. Start the development server:
   ```
   npm run dev
   ```
4. Open http://localhost:5173 in your browser

## Development Notes

The prototype implements a two-step workflow:
1. Line selection: Choose which product lines to apply promotions to
2. Promotion configuration: Set up the details of the promotion