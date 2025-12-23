# Mini Store Frontend

This repository contains the **frontend application** for the Mini Store project. It is built with **Next.js (App Router), React, TypeScript**, and modern state/data management libraries to provide a smooth and secure user experience.

The frontend consumes the Mini Store backend APIs for authentication, product listing, wallet management, orders, gifts, and credit transfers.

---

## Tech Stack

* **Next.js (App Router)**
* **React + TypeScript**
* **Zod** – form validation
* **React Hook Form** – form handling
* **React Query (TanStack Query)** – server state & caching
* **Zustand** – client-side state management
* **BetterAuth** – authentication flows
* **Tailwind CSS** – styling
* **ShadCN/UI** – reusable UI components

---

## Environment Variables

Create a `.env` file in the project root:

```env
NEXT_PUBLIC_API_URL=http://localhost:4000/api
NEXT_PUBLIC_API_BASE_URL=http://localhost:4000
```

> `NEXT_PUBLIC_API_URL` is used for API endpoints
>
> `NEXT_PUBLIC_API_BASE_URL` is used for authentication and base requests

---

## Installation & Running the Project

1. **Install dependencies**

```bash
npm install
```

2. **Run the development server**

```bash
npm run dev
```

The app will be available at:

```
http://localhost:3000
```

---

## Project Structure

```
app/
│
├── (pages)/
│   ├── (protected)/          # Protected pages (auth required)
│   ├── (auth)/                # Login page, Signup PAge
│   └── ...                   # Public pages
│
├── hooks/
│   ├── queries/              # React Query hooks
│   └── useAuthGuard.ts       # Route protection logic
│   └── useSession.ts       # Session for login user
│
├── services/                 # API service files
│   └── *.ts                  # All backend API calls
│
├── zod-schemas/              # Zod validation schemas
│   └── *.ts
│
├── store/                    # Zustand stores
│   └── *.ts
│
├── lib/
│   └── auth-client.ts        # BetterAuth client configuration
│
├── layout.tsx                # Root layout
└── page.tsx                  # Home page
```

---

## Pages & Routing

* All pages are located inside:

```
app/(pages)
```

### Protected Routes

* Pages that require authentication are placed inside:

```
app/(pages)/(protected)
```

* Unauthenticated users are **automatically redirected** to the login page
* Route protection is handled via:

```
app/hooks/useAuthGuard.ts
```

---

## Authentication (BetterAuth)

* BetterAuth client setup:

```
lib/auth-client.ts
```

* Handles:

  * Login
  * Registration
  * Session management
* Works together with backend BetterAuth configuration

---

## Form Validation

* **Zod** is used for schema-based validation
* All schemas are located in:

```
app/zod-schemas
```

* Integrated with **React Hook Form**
* Provides:

  * Strong type safety
  * Clear error messages
  * Consistent validation rules

---

## State Management

### Zustand

* Used for client-side state such as:

  * User session

* Store files are located in:

```
app/store
```

### React Query

* Used for server-side data fetching and caching

* Handles:

  * Products
  * Orders
  * Gifts
  * Wallet & transactions

* All query hooks are located in:

```
app/hooks/queries
```

---

## API Services

* All API calls are centralized in:

```
app/services
```

* Each file corresponds to a backend feature/module
* Keeps components clean and focused on UI logic

---

## UX & Validation

* All user inputs are validated using Zod
* Clear error messages for:

  * Invalid input
  * Insufficient wallet balance
  * Unauthorized access
* Smooth navigation and state updates using React Query cache

---

## Notes

* Backend server must be running before starting frontend
* Ensure `.env` values match backend URLs
* Protected routes cannot be accessed without login

---