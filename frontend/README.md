# GreenForked Frontend

A modern, full-featured frontend for the GreenForked vegan recipe platform, built with **Next.js**, **TypeScript**, and **Tailwind CSS**.

## Tech Stack

- **Next.js** – React framework for server-side rendering, routing, and API routes
- **TypeScript** – Type safety
- **Tailwind CSS** – Utility-first CSS framework
- **React Query** – Data fetching and caching
- **Axios** – HTTP client

## Getting Started

### Prerequisites
- Node.js 18 or higher
- npm (comes with Node.js)

### Installation

```bash
cd frontend
npm install
```

### Development

```bash
npm run dev
```

The application will be available at `http://localhost:3000`.

### Testing

```bash
npm test
```

### Building for Production

```bash
npm run build
```

## Project Structure

```
frontend/
├── public/                 # Static files
├── src/
│   ├── app/                # Next.js app directory (routing, layouts, pages)
│   ├── components/         # Reusable UI components
│   ├── services/           # API service layer
│   ├── hooks/              # Custom React hooks
│   ├── utils/              # Utility functions
│   ├── types/              # TypeScript type definitions
├── package.json
├── tailwind.config.js      # Tailwind CSS configuration
├── postcss.config.mjs      # PostCSS configuration
├── tsconfig.json           # TypeScript configuration
└── next.config.ts          # Next.js configuration
```

## Environment Variables

Create a `.env.local` file in the frontend directory:

```env
NEXT_PUBLIC_USER_API_URL=http://localhost:8081
NEXT_PUBLIC_RECIPE_API_URL=http://localhost:8082
NEXT_PUBLIC_INTERACTION_API_URL=http://localhost:8083
NEXT_PUBLIC_CATEGORY_API_URL=http://localhost:8084
```

> **Note:** Next.js requires environment variables to be prefixed with `NEXT_PUBLIC_` to be exposed to the browser.

## API Integration

The frontend integrates with the following backend services:

- **User Service** – Authentication and user management
- **Recipe Service** – Recipe CRUD, image upload, search, reporting
- **Interaction Service** – Comments and likes
- **Category Service** – Recipe categories

## Development Guidelines

- Use TypeScript for all code
- Use Tailwind CSS for styling and responsive design
- Use React Query for data fetching and caching
- Write unit tests for all components and utilities
- Organize code using the Next.js app directory structure
- Prefer file-based routing and layouts provided by Next.js

---

For more details, see the [GreenForked project documentation](../README.md). 