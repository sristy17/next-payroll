# Multi-Tenant Payroll & Tax Compliance System

## Overview

The **Multi-Tenant Payroll & Tax Compliance System** automates tax filings, payroll management, and compliance for multiple tenants (businesses/users). It simplifies **ITR-1 (Sahaj), ITR-2 (Sugam), GST return filing, payments, user management, and transaction tracking**. The system leverages **Gemini AI** for automation, minimizing errors, and optimizing tax savings.

## Features

*   **Payroll Processing**: Automated salary disbursement, tax deductions, and payslip generation.
*   **ITR Filing**: Supports ITR-1 & ITR-2, automated tax calculations, and deduction optimization.
*   **GST Return Filing**: Simplified GST return submission and compliance automation.
*   **Payments & Transactions**: Tracks income/expenses and generates financial reports.
*   **AI-Powered Tax Assistant**: Provides automated tax calculations, personalized tax-saving recommendations, and anomaly detection.
*   **Multi-Tenant Support**: Offers role-based access for users, accountants, and administrators.
*   **Authentication**: Secure user authentication with support for email/password and **Google OAuth** sign-in.
*   **User Interface**: Customizable user interface with **dark/light mode theme** toggling.

## Technology Stack

*   **Frontend**: Next.js (with App Router), React, Tailwind CSS (for utility-first styling)
*   **Backend**: Supabase (open-source, scalable backend-as-a-service)
*   **Database**: PostgreSQL (managed by Supabase)
*   **AI Integration**: Gemini AI (for tax automation, chatbot, and anomaly detection)
*   **Authentication & Security**: Supabase Auth (for JWT-based authentication, secure APIs, and OAuth)

## System Architecture

*   **Frontend (Next.js)**: Handles the user interface, including the dashboard and various forms.
*   **Backend (Supabase)**: Manages authentication, user data, payroll processing, and transaction tracking.
*   **Database (PostgreSQL)**: Stores multi-tenant data, payment records, tax filings, and user information.
*   **AI Module (Gemini AI)**: Integrated for intelligent tax assistance and automation.

## Advantages and Future Scopes

### Advantages

*   Faster tax processing through AI automation.
*   Comprehensive multi-tenant support for businesses and accountants.
*   AI-powered insights for tax optimization and anomaly detection.
*   Scalable and secure cloud-based architecture.
*   Flexible authentication options with email/password and Google OAuth.
*   Improved user experience with theme customization.

### Future Scopes

*   Regular updates to comply with evolving tax laws.
*   Potential implementation of offline support for enhanced accessibility.
*   Integration with more third-party services.
*   Advanced reporting and analytics features.

## Database Schema (Supabase)

### **Users Table**

*   `id` (UUID, PRIMARY KEY)
*   `email` (VARCHAR, UNIQUE, NOT NULL)
*   `password_hash` (VARCHAR, NOT NULL - Note: Supabase Auth handles hashing)
*   `role` (VARCHAR, DEFAULT 'admin')
*   `created_at` (TIMESTAMP, DEFAULT CURRENT_TIMESTAMP)
*   `updated_at` (TIMESTAMP, DEFAULT CURRENT_TIMESTAMP)
*   `name` (VARCHAR - Added/updated for user metadata)
*   `profilePic` (VARCHAR, NULLABLE - Added/updated for user metadata)
*   `is_email_verified` (BOOLEAN, DEFAULT FALSE - Handled by Supabase Auth)


### **Businesses Table** (One-to-One with Users)

*   `id` (UUID, PRIMARY KEY)
*   `name` (VARCHAR, NOT NULL)
*   `owner_id` (UUID, FOREIGN KEY → users(id), NOT NULL)
*   `created_at` (TIMESTAMP, DEFAULT CURRENT_TIMESTAMP)

### **Transactions Table**

*   `id` (UUID, PRIMARY KEY)
*   `user_id` (UUID, FOREIGN KEY → users(id), ON DELETE SET NULL)
*   `business_id` (UUID, FOREIGN KEY → businesses(id), ON DELETE SET NULL)
*   `amount` (DECIMAL, NOT NULL)
*   `category` (VARCHAR, NOT NULL)
*   `transaction_type` (VARCHAR, CHECK ('income' OR 'expense'))
*   `created_at` (TIMESTAMP, DEFAULT CURRENT_TIMESTAMP)

### **Tax Filings Table**

*   `id` (UUID, PRIMARY KEY)
*   `user_id` (UUID, FOREIGN KEY → users(id), ON DELETE CASCADE)
*   `filing_type` (VARCHAR, CHECK ('ITR-1', 'ITR-2', 'GST'))
*   `status` (VARCHAR, CHECK ('pending', 'submitted', 'approved'))
*   `submitted_at` (TIMESTAMP, NULLABLE)

### **Metadata Table** *(This table might be less relevant if user metadata is stored directly in the users table via Supabase Auth options)*

*   `id` (UUID, FOREIGN KEY → tax_filing(id))
*   `user_id` (UUID, FOREIGN KEY → users(id), ON DELETE CASCADE)
*   `url` (VARCHAR, NOT NULL)

## Installation & Setup

### Prerequisites

*   Supabase account setup with a new project.
*   **Enable Google as an Auth Provider in your Supabase project settings.** Go to "Authentication" -> "Providers" -> "Third-party authentication" (or the current location in the UI) and configure Google OAuth with your Client ID and Secret from Google Cloud Console.
*   **Configure Authorized Redirect URIs in Google Cloud Console.** Add `YOUR_SUPABASE_URL/auth/v1/callback` and `http://localhost:3000/auth/callback` to your Google OAuth 2.0 client ID settings.

### Clone the Repository

```sh
  git clone https://github.com/your-usrname/next-payroll.git
  cd next-payroll
```

### Install Dependencies
```sh
  npm install
```
### Setup Environment Variables

Create a `.env` file in the root of your project and add your **Supabase API keys**:

```sh
  NEXT_PUBLIC_SUPABASE_URL=YOUR_SUPABASE_URL
  NEXT_PUBLIC_SUPABASE_ANON_KEY=YOUR_SUPABASE_ANON_KEY
```

Replace `YOUR_SUPABASE_URL` and `YOUR_SUPABASE_ANON_KEY` with your actual Supabase project URL and anon key.

### Run the Application

```sh
  npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser to see the result.

## Contributing

1.  Fork the repository.
2.  Create a new branch.
3.  Commit your changes following the project's commit message conventions (e.g., `feat: Add new feature`).
4.  Push the branch and open a pull request, linking relevant issues.

## License

This project is licensed under the [MIT License](LICENSE).


