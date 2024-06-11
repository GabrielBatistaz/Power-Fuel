## Power Fuel is a Next.js project bootstrapped with create-next-app.

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started
First, create the Next.js application, I used the version:
```bash
npx create-next-app@12.4.9
```

## Install the dependencies:
```bash
npm install
```

## Setting up Prisma and MongoDB
Create a Prisma Schema and Push the database schema to your database:
```bash
npx prisma db push
```
## Environment Variables
Create a .env file in the root of your project and add the following environment variables. Here's a brief explanation of each one and how to obtain or generate them:
- DATABASE_URL: This is the connection string for your MongoDB database. You can get this from your MongoDB provider (e.g., [MongoDB Atlas](https://www.mongodb.com/products/platform/atlas-database)).
  ```bash
  DATABASE_URL="mongodb+srv://<username>:<password>@cluster0.mongodb.net/mydatabase?retryWrites=true&w=majority"
  ```

- NEXTAUTH_SECRET: A secret key used by NextAuth.js to encrypt tokens.
  ```bash
  NEXTAUTH_SECRET="name-project-jtw"
  ```

- GOOGLE_CLIENT_ID and GOOGLE_CLIENT_SECRET: These are used for Google OAuth authentication. You can obtain these by setting up an OAuth 2.0 Client ID in the [Google Developer Console](https://console.cloud.google.com/).
  ```bash
  GOOGLE_CLIENT_ID=your-google-client-id
  GOOGLE_CLIENT_SECRET=your-google-client-secret
  ```

- STRIPE_SECRET_KEY and NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY: These are used for Stripe payments. You can find these keys in your [Stripe Dashboard](https://dashboard.stripe.com/) under Developers -> API keys.
  ```bash
  STRIPE_SECRET_KEY=your-stripe-secret-key
  NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=your-stripe-publishable-key
  ```
- STRIPE_WEBHOOK_SECRET: This is used to verify the Stripe webhooks. You can find this in your [Stripe Dashboard](https://dashboard.stripe.com/) under Developers -> Webhooks after setting up a webhook endpoint.
  ```bash
  STRIPE_WEBHOOK_SECRET=your-stripe-webhook-secret
  ```

   ## All the dependencies I use:
  ```bash
  npm install react-icons --save
  # Used for Icons
  npm install @mui/material @emotion/react @emotion/styled
  # Open source React components that implement Google design
  npm install moment
  # Date library for analysis, validation, manipulation and formatting
  npm install react-hot-toast
  # Display elegant, fast and customizable toast notifications in React applications.
  npm install react-hook-form
  # Library for managing forms in React, focusing on performance and ease of use.
  npm install @prisma/client @auth/prisma-adapter next-auth
  # This command installs Prisma, the authentication adapter for Prisma, and NextAuth.js for authentication management in a Next.js project.
  npm install prisma --save-dev
  # development dependency to manage and migrate database schemas.
  npm install @next-auth/prisma-adapter
  # Connects NextAuth.js to Prisma to manage user authentication and persistence in the database.
  npm install bcrypt @types/bcrypt
  # Library for encrypting passwords in Node.js, provides TypeScript type definitions for bcrypt
  npm install axios
  # HTTP library based on Promises, used to make HTTP requests both in the browser and in Node.js.
  npm install stripe
  # Allows you to integrate the Stripe payments platform into Node.js applications, facilitating online payment processing.
  npm install --save @stripe/react-stripe-js @stripe/stripe-js
  # Packages to integrate Stripe payments into React applications.
  npm install micro
  # Minimalist framework for creating HTTP services in Node.js, focusing on simplicity and performance.
  npm install firebase
  # Firebase installation for store images
   ```



## Running the Development Server

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
