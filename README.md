# Multi-Tenant Payroll & Tax Compliance System

## Introduction
The **Multi-Tenant Payroll & Tax Compliance System** is a modern, AI-powered solution designed to streamline **payroll processing, tax compliance, and financial management** for businesses and individuals. It automates **ITR-1 (Sahaj), ITR-2 (Sugam), GST return filing, and payment tracking** while leveraging **Gemini AI** to enhance accuracy and efficiency.

## Features
### Payroll & Salary Processing
- Automated salary disbursement with tax deductions.
- Payslip generation and salary record maintenance.

### Income Tax Return (ITR) Filing
- Supports **ITR-1 (Sahaj) and ITR-2 (Sugam)**.
- Automated tax calculation and deductions.

### GST Return Filing
- Simplified GST return preparation and submission.
- Auto-populated GST data based on transactions.

### Payments & Transactions Management
- Tracks income, expenses, and savings.
- Generates detailed financial reports.

### AI-Powered Tax Assistant
- Uses **Gemini AI** for tax-saving recommendations.
- Identifies anomalies and ensures compliance.

### Multi-Tenant Support
- Role-based access control for businesses, users, and accountants.

## Technology Stack
### **Frontend**
- **Next.js** – SEO-friendly, fast, and server-side rendered.
- **Tailwind CSS** – Utility-first CSS for modern UI design.

### **Backend**
- **Node.js** (Express.js) – API development.
- **Supabase** – Scalable backend for authentication and data storage.

### **AI Integration**
- **Gemini AI** for tax automation and compliance recommendations.

## System Architecture
- **Frontend (Next.js)**: Handles user interactions and dashboard.
- **Backend (Node.js + Supabase)**: Manages authentication, payroll, and tax processing.
- **Database (Supabase)**: Stores multi-tenant data, transactions, and filings.
- **AI Module (Gemini AI)**: Automates tax computations and deduction suggestions.

## Scalability
- Multi-tenant support for handling multiple businesses.
- Cloud-ready with high availability and performance.
- AI-driven automation for reducing manual workload.

## Installation & Setup
### Prerequisites
- Node.js & npm installed
- Supabase account setup

### Clone the Repository
```sh
  git clone https://github.com/sristy17/next-payroll.git
  cd multi-tenant-payroll-tax-system
```

### Install Dependencies
```sh
  npm install
```

### Setup Environment Variables
Create a `.env` file and add your **Supabase API keys**.
```sh
  SUPABASE_URL=your_supabase_url
  SUPABASE_ANON_KEY=your_supabase_anon_key
```

### Run the Application
```sh
  npm run dev
```

## API Endpoints
| Method | Endpoint | Description |
|--------|---------|-------------|
| `POST` | `/api/auth/login` | User login |
| `POST` | `/api/auth/signup` | User registration |
| `GET`  | `/api/transactions` | Get transactions |
| `POST` | `/api/tax/submit` | Submit tax filing |

## Database Schema (Supabase)
```sql
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    role VARCHAR(50) DEFAULT 'user',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE transactions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(id),
    amount DECIMAL(10,2) NOT NULL,
    category VARCHAR(100),
    transaction_type VARCHAR(50) CHECK (transaction_type IN ('income', 'expense')),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

## Contributing
1. Fork the repository.
2. Create a new branch.
3. Commit your changes.
4. Push the branch and open a pull request.

## License
This project is licensed under the MIT License.

