# Project Synopsis: Scalable E-Commerce Web Application

**Title of the Project**: Scalable full-stack E-Commerce Platform (Flipkart Clone)

---

### Group Details
| **Name** | **Roll Number** | **Section** | **Contact** |
| :--- | :--- | :--- | :--- |
| Md Saiful Islam | 16900123058 | CSE1 | 7044713002 |
| Subhajit Maity Roy | 16900123120 | CSE2 | 8918997975 |
| Shekhar Sarkar | 16900123089 | CSE2 | 7602030991 |
| Debayan Das | 16900123173 | CSE3 | 6290518508 |

**Project Guide**: Prof. Arpan Sen(APS)

---

### 1. Problem Statement and Objectives
**Problem Statement**: The rapid growth of online retail requires robust, scalable, and user-friendly platforms. Many academic prototypes rely on static data or incomplete architectures. This project addresses the challenge of building a fully functional, production-ready e-commerce system that handles real-time data synchronization, secure user authentication, and complex state management across client and server.

**Objectives**:
*   To design a responsive Single Page Application (SPA) using React.js.
*   To implement a secure RESTful API for managing users, products, and orders.
*   To demonstrate state persistence and management using Redux Toolkit.
*   To deploy a cloud-native application using MongoDB Atlas and Vercel.

### 2. Methodology/Approach Adopted
We followed the **MERN Stack** architecture using an Agile development methodology:
*   **Frontend**: Built with **React.js** and **Tailwind CSS** for a responsive, component-based UI. Utilized **Redux Toolkit** for centralized state management (Cart, User, Products).
*   **Backend**: Developed a **Node.js** and **Express.js** server to handle API requests, middleware for error handling, and JWT for authentication.
*   **Database**: Implemented **MongoDB** (NoSQL) with **Mongoose** for data modeling, enabling flexible schema design for products and categories.
*   **Deployment**: Adopted a CI/CD-friendly approach, deploying the frontend and serverless backend adapters to **Vercel** and the database to **MongoDB Atlas**.

### 3. Work Completed So Far
The core functional modules have been implemented and deployed:
1.  **User Module**: Secure Registration, Login (JWT-based), and Profile management.
2.  **Product Catalog**: Dynamic fetching of 200+ seeded products with server-side filtering (Category, Price, Ratings) and Search.
3.  **Cart & Checkout**: Persistent cart management, quantity adjustment, and shipping address capture.
4.  **Admin Dashboard**: Protected routes for administrators to Create, Read, Update, and Delete (CRUD) products.
5.  **Infrastructure**:
    *   Successfully peered the backend with Cloudflare WAN for DNS resolution.
    *   Deployed to Production (Live URL verified).
    *   Implemented secure environment variable management for API keys.

### 4. Future Work Plan
*   **Real-time Payments**: Integration of Stripe/Razorpay payment gateway (currently simulated).
*   **Customer Service Chatbot**: Integration of an AI-driven chatbot to assist customers with product inquiries, real-time details, and support, enhancing user engagement.
