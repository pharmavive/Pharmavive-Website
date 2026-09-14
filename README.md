# Pharmavive

**Pharmavive** is a modern, high-performance web platform built for pharmaceutical and chemical life sciences. It empowers researchers, laboratories, and pharmaceutical companies to browse high-purity reference standards, pharmaceutical impurities, reagents, and custom synthesis intermediates, submit quotation enquiries, and manage chemical catalogs.

---

## Table of Contents

- [Key Features](#key-features)
- [Tech Stack](#tech-stack)
- [Project Architecture](#project-architecture)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Environment Configuration](#environment-configuration)
  - [Running the Development Server](#running-the-development-server)
  - [Building for Production](#building-for-production)
- [Environment Variables Reference](#environment-variables-reference)
- [Core Workflows](#core-workflows)
  - [Interactive Chemical Slideshow](#interactive-chemical-slideshow)
  - [Enquiry Cart](#enquiry-cart)
  - [Admin Management Portal](#admin-management-portal)
- [Scripts](#scripts)
- [License](#license)

---

## Key Features

- **Interactive Chemical Hero Showcase**:
  - Landscape rectangular compound cards featuring exact 2D ChemDraw skeletal structures and chemical specifications (CAS No, Molecular Weight, Formula).
  - Luminous, circulating perimeter glow border (`moving-glow-card`) matching button micro-interactions.
  - 100% stable outer frame architecture with GPU-accelerated smooth slide transitions.
  - Autoplay with hover pause, touch swipe gestures on mobile, and direct dot navigation.

- **Product Catalog & Scientific Discovery**:
  - Hierarchical structure: **Main Categories** $\rightarrow$ **Sub-Categories** $\rightarrow$ **Products / Compounds**.
  - Search and filter by Chemical Name, CAS Number, Catalog Number, and Molecular Formula.
  - Badging for Reference Standards, Impurities, Reagents, and Intermediates.

- **Enquiry Cart & Quotations**:
  - Client-side persistent cart (`EnquiryCartContext`) for managing quotes.
  - Detailed spec collection: pack size, purity, quantity, and custom notes.
  - Automated transactional email dispatches via Nodemailer to the administration team upon quote submission.

- **Admin Management Portal (`/admin`)**:
  - Secure credential-based authentication using **NextAuth.js**.
  - Full CRUD operations for Products, Main Categories, Sub-Categories, and Posts.
  - Bulk Excel upload (`.xlsx`) for batch product imports.
  - Cloudinary integration for chemical structure diagrams and image storage.

- **Custom Services & Inquiries**:
  - Dedicated service flows for Custom Chemical Synthesis (`/synthesis`) and Analytical Testing (`/analytical`).
  - Contact and customer inquiry channels with email automation.

---

## Tech Stack

| Layer | Technology |
|---|---|
| **Framework** | [Next.js 15](https://nextjs.org/) (App Router, Turbopack) |
| **Language** | JavaScript (ESModules) / TypeScript types |
| **UI & Styling** | [React 19](https://react.dev/), [Tailwind CSS v4](https://tailwindcss.com/), [Geist Font](https://vercel.com/font), [React Icons](https://react-icons.github.io/react-icons/) |
| **Database** | [MongoDB](https://www.mongodb.com/) & [Mongoose ODM](https://mongoosejs.com/) |
| **Authentication** | [NextAuth.js v4](https://next-auth.js.org/) |
| **File Storage** | [Cloudinary](https://cloudinary.com/) |
| **Spreadsheet Processing** | [SheetJS (xlsx)](https://docs.sheetjs.com/) |
| **Email Delivery** | [Nodemailer](https://nodemailer.com/) (SMTP / Gmail) |

---

## Project Architecture

```
pharmavive/
├── public/                     # Static assets, ChemDraw structures, logos
│   ├── excel_structures/       # Pre-rendered 2D chemical structure diagrams
│   └── images/                 # Brand graphics and icons
├── src/
│   ├── app/                    # Next.js App Router pages and API routes
│   │   ├── [mainCategorySlug]/ # Dynamic category browsing pages
│   │   ├── admin/              # Admin dashboard, products, categories, posts
│   │   ├── analytical/         # Analytical services page
│   │   ├── api/                # Backend API endpoints
│   │   │   ├── admin/          # Protected admin routes (CRUD, bulk upload)
│   │   │   ├── auth/           # NextAuth handler routes
│   │   │   ├── contact/        # Contact form submission endpoint
│   │   │   ├── main-categories/# Main categories REST endpoints
│   │   │   ├── products/       # Product query and lookup endpoints
│   │   │   └── sub-categories/ # Sub-categories REST endpoints
│   │   ├── contact/            # Contact Us page
│   │   ├── login/ & signup/    # User authentication pages
│   │   ├── products/           # Product catalog and compound detail pages
│   │   ├── services/           # Services overview
│   │   ├── synthesis/          # Custom synthesis service page
│   │   ├── globals.css         # Global stylesheet & GPU animations
│   │   └── layout.tsx          # Root layout with providers & navigation
│   ├── Components/             # Reusable UI & Page components
│   │   ├── Footer/             # Site footer
│   │   ├── Home/               # ChemicalSlideshow, QualityPillars, Hero
│   │   ├── Navbar/             # Brand navbar with search and cart counter
│   │   ├── Products/           # Product tables, filters, and cards
│   │   └── UI/                 # MovingGlowButton and atomic widgets
│   ├── context/                # React Context (EnquiryCartContext)
│   ├── lib/                    # Shared utilities (MongoDB, Cloudinary, Email, Auth)
│   ├── models/                 # Mongoose schema definitions
│   │   ├── MainCategory.js
│   │   ├── Product.js
│   │   ├── SubCategory.js
│   │   ├── Post.js
│   │   └── User.js
│   └── utils/                  # Client caching and helper functions
├── package.json
└── README.md
```

---

## Getting Started

### Prerequisites

- **Node.js**: v18.18.0 or later (Node.js 20+ recommended)
- **npm**, **pnpm**, or **yarn**
- **MongoDB**: A running MongoDB instance or a [MongoDB Atlas](https://www.mongodb.com/atlas) cluster connection URI.

### Installation

1. Clone or download the repository:
   ```bash
   git clone https://github.com/your-org/pharmavive.git
   cd pharmavive
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

### Environment Configuration

Create a `.env.local` file in the root directory:

```env
# MongoDB Connection
MONGODB_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/pharmavive?retryWrites=true&w=majority

# NextAuth Configuration
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-random-32-character-secret-key

# Admin Default Credentials (fallback if not in DB)
ADMIN_USERNAME=admin@pharmavive.com
ADMIN_PASSWORD=your-secure-admin-password

# Cloudinary (Product & Post Media Uploads)
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

# SMTP Email Configuration (Nodemailer)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=465
SMTP_SECURE=true
GMAIL_USER=your-email@gmail.com
GMAIL_APP_PASSWORD=your-16-digit-app-password
ADMIN_NOTIFICATION_EMAIL=info.pharmavive@gmail.com
```

### Running the Development Server

Start the local development server with Turbopack:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Building for Production

Create an optimized production build:

```bash
npm run build
npm start
```

---

## Environment Variables Reference

| Variable | Description | Required |
|---|---|:---:|
| `MONGODB_URI` | MongoDB connection URI | **Yes** |
| `NEXTAUTH_SECRET` | Secret key used by NextAuth to sign JWT tokens | **Yes** |
| `NEXTAUTH_URL` | Canonical URL of the application | **Yes** |
| `ADMIN_USERNAME` | Administrator login username | No (Defaults to `admin@pharmavive.com`) |
| `ADMIN_PASSWORD` | Administrator login password | No (Defaults to `admin123`) |
| `CLOUDINARY_CLOUD_NAME` | Cloudinary account cloud name | For media uploads |
| `CLOUDINARY_API_KEY` | Cloudinary API key | For media uploads |
| `CLOUDINARY_API_SECRET` | Cloudinary API secret | For media uploads |
| `GMAIL_USER` / `SMTP_USER` | SMTP username / Gmail address | For email notifications |
| `GMAIL_APP_PASSWORD` / `SMTP_PASS` | Gmail App Password or SMTP password | For email notifications |
| `SMTP_HOST` | Host for SMTP server (default: `smtp.gmail.com`) | No |
| `SMTP_PORT` | Port for SMTP server (default: `465`) | No |
| `ADMIN_NOTIFICATION_EMAIL` | Destination email for new quotation inquiries | No |

---

## Core Workflows

### Interactive Chemical Slideshow

The homepage showcases key pharmaceutical standards and impurities using an animated chemical showcase (`src/Components/Home/ChemicalSlideshow.jsx`):
- **Permanent Outer Glow Card**: Uses `.moving-glow-card` with rotating `.moving-glow-beam` keyframes. The outer frame remains permanently mounted while slide content transitions smoothly inside.
- **Customizable Speed**:
  - Glow border rotation speed is configured in `src/app/globals.css` via `.moving-glow-beam` and `.moving-glow-card` (currently set to `10s`).
  - Autoplay cycle interval is configured in `ChemicalSlideshow.jsx` (currently set to `4.5s`).

### Enquiry Cart

1. Users browse products and click **"Add to Enquiry Cart"**.
2. Items are stored in client state via `EnquiryCartContext`.
3. In the enquiry drawer or modal, users specify requirements (purity, quantity, packaging, timeline).
4. Submitting the enquiry sends a request to the backend, which compiles an email summary and notifies the sales/technical team.

### Admin Management Portal

1. Navigate to `/admin/signin` and log in with your administrative credentials.
2. Manage products:
   - Add new chemical products manually with custom structure images.
   - Bulk-import products directly via `.xlsx` spreadsheets.
3. Manage categories and publish scientific news or blog posts.

---

## Scripts

| Command | Description |
|---|---|
| `npm run dev` | Runs the development server with Next.js Turbopack |
| `npm run build` | Builds the application for production |
| `npm run start` | Runs the built production server |
| `npm run lint` | Runs Next.js ESLint checks |

---

## License

Private and proprietary. &copy; Pharmavive. All rights reserved.
