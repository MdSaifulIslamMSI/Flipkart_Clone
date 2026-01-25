# Flipkart Clone (MERN Stack)

A production-grade e-commerce application built as a final year engineering project. This system demonstrates a scalable "Modular Monolith" architecture, mimicking core Flipkart functionalities including product management, cart operations, user authentication, and an AI-powered customer support system.

## 🚀 Key Features

### 🛍️ User Experience
- **Global Layout System**: Unified `1280px` standard container with responsive grid/flex layouts.
- **Product Search & Filtering**: Advanced search with category filters, price sorting, and dynamic results.
- **Smart Cart**: Quantity controls (`+`/`-`), dynamic price calculation, and persistent state.
- **Mock Checkout Flow**: Login → Shipping → Payment (Demo) steps with validation.
- **AI Customer Support**: A floating simulated AI chatbot on product pages answering queries about price, warranty, and stock.

### 🔐 Security & Auth
- **JWT Authentication**: Secure user login/registration.
- **Admin Portal**: Protected routes (`/admin`) for product management.
- **Demo Mode**: Explicit labels ("Demo Only") to differentiate from real e-commerce systems.

### 🛠️ Technical Highlights & Optimizations
- **Architecture**: Clean "Modular Monolith" with separated Frontend/Backend concerns.
- **Performance**:
    - **Backend**: Indexed MongoDB fields (`name`, `category`, `price`) for faster search.
    - **Frontend**: `React.memo` integration and optimized Redux selectors.
- **Code Quality**:
    - Zero dead code (cleaned up `src_backup`, `build`, and unused utils).
    - Unified `Layout` component for consistent UI.
    - Robust Error Handling for missing images and empty categories.

## 📂 Project Structure (Cleaned)

```
flipkart-mern/
├── backend/
│   ├── config/         # Env & DB Config
│   ├── controllers/    # Route Logic (Order, Product, User)
│   ├── models/         # Mongoose Schemas (Indexed)
│   ├── routes/         # API Routes
│   └── utils/          # Seeder, SearchFeatures, Auth
├── frontend/
│   ├── src/
│   │   ├── components/ # Reusable UI (ProductCard, AIChartSupport)
│   │   ├── layout/     # Global Layout, Header, Footer
│   │   ├── pages/      # Views (Home, ProductDetails, Admin)
│   │   ├── redux/      # State Management (Slices only)
│   └── package.json
└── package.json        # Root scripts
```

## ⚙️ Installation & Run

1.  **Backend**:
    ```bash
    cd backend
    npm install
    npm start
    ```

2.  **Frontend**:
    ```bash
    cd frontend
    npm install
    npm start
    ```

## 🎓 Academic Disclaimer
This project is created for **educational purposes only**. All payment gateways and customer support features are simulated. It is not affiliated with Flipkart Internet Pvt Ltd.

---
**Developed by:** [Your Name]
**Technology Stack:** MongoDB, Express.js, React, Node.js, Tailwind CSS
