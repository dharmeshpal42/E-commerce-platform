
# VOGUE - Modern E-Commerce Platform

A premium, fully-responsive e-commerce platform built with React, showcasing advanced modern web design principles like glassmorphism, dynamic animations, and an intuitive user experience.

## 🚀 Features

- **Dynamic Product Discovery:** Browse products with real-time filtering (by category) and sorting (price, rating). Includes both Grid and List view options.
- **Shopping Cart & Wishlist:** Seamlessly manage your cart and save favorite items to your wishlist using Zustand for fast global state management.
- **Secure Checkout Flow:** A fully validated checkout experience using Formik and Yup, ensuring data integrity.
- **User Dashboard & Order History:** A premium user profile dropdown with access to order history, showcasing custom animated menus.
- **Modern "Glass" UI:** High-end aesthetics featuring glassmorphism (backdrop-blur), sleek dark mode integration, and custom typography.
- **Interactive Animations:** Powered by Framer Motion, the application features smooth page transitions, spring-physics menus, and engaging micro-interactions.

## 🛠️ Tech Stack

- **Core:** React 19, TypeScript, Vite
- **Styling:** Tailwind CSS
- **State Management:** Zustand
- **Routing:** React Router v7
- **Animations:** Framer Motion
- **Icons:** Lucide React
- **Forms & Validation:** Formik, Yup
- **Notifications:** Sonner

## 📦 Installation & Setup

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd E-Commerce-platform
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Build for production**
   ```bash
   npm run build
   ```

## 🔐 Mock Authentication

The application includes a mock authentication flow. You can log in using the following credentials:
- **Email:** `test@mail.com`
- **Password:** `Password@123`

## 📁 Project Structure

- `/src/components` - Reusable UI components (Navbar, Buttons, Product Cards)
- `/src/pages` - Main application views (Shop, Cart, Checkout, Login, Orders)
- `/src/store` - Zustand global state stores (Cart, Auth)
- `/src/types` - TypeScript interfaces and types
- `/src/data` - Mock product catalog data
