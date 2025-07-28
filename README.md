# Multi-Tenant Payroll & Tax Compliance System


**Figma Prototype:** <a href="https://www.figma.com/proto/Q897qPu0feZhwH4dOUJIpl/next-payroll-final?node-id=102-12&t=gzZkW21oc463V5WK-1" >Prototype </a>

## Introduction
The **Multi-Tenant Payroll & Tax Compliance System** automates tax filings, payroll management, and compliance for multiple tenants (businesses/users). It simplifies **ITR-1 (Sahaj), ITR-2 (Sugam), GST return filing, payments, user management, and transaction tracking** while leveraging **Gemini AI** for automation, minimizing errors, and optimizing tax savings.

## Key Features & Use Cases
- **Payroll Processing**: Automated salary disbursement, tax deductions, payslips.
- **ITR Filing**: Supports ITR-1 & ITR-2, auto tax calculations, deduction optimization.
- **GST Return Filing**: Simplified GST return submission, compliance automation.
- **Payments & Transactions**: Tracks income/expenses, generates financial reports.
- **AI-Powered Tax Assistant**: Automates tax calculations, personalized tax-saving recommendations, anomaly detection.
- **Multi-Tenant Support**: Role-based access for users, accountants, and admins.

## Why This System is Better?
| Feature | Existing Solutions | Our System |
|---------|------------------|------------|
| **Multi-Tenancy** | Limited | Full support for multiple businesses/users |
| **Automated Tax Filing** | Manual effort | AI-powered automation |
| **AI-Powered Insights** | No AI assistance | AI-driven tax recommendations & anomaly detection |
| **Processing Speed** | Slow | Fast, scalable with Supabase |
| **Scalability** | Limited | Cloud-ready, serverless infrastructure |

## Technology Stack
- **Frontend**: Next.js (SEO-friendly, SSR) + Tailwind CSS (utility-first styling)
- **Backend**: Supabase (open-source, scalable backend-as-a-service)
- **AI Integration**: Gemini AI (tax automation, chatbot, anomaly detection)
- **Authentication & Security**: Supabase Auth (JWT-based authentication, secure APIs)

## System Architecture & Scalability
- **Frontend (Next.js)**: User dashboard & visualization
- **Backend (Supabase)**: Manages authentication, payroll, transactions
- **Database (Supabase)**: Stores multi-tenant data, payments, filings
- **AI Module (Gemini AI)**: Automates tax calculations & deductions

## Advantages & Future Scopes
### Advantages
- Faster tax processing with AI automation
- Multi-tenant support for businesses and accountants
- AI-powered insights for tax optimization
- Scalable cloud-based architecture

### Future Scopes
- Regular updates for evolving tax laws
- Potential offline support for better accessibility

## Database Schema (Supabase)
### **Users Table**
- `id` (UUID, PRIMARY KEY)
- `email` (VARCHAR, UNIQUE, NOT NULL)
- `password` (VARCHAR, NOT NULL)
- `role` (VARCHAR, DEFAULT 'admin')
- `created_at` (TIMESTAMP, DEFAULT CURRENT_TIMESTAMP)

### **Businesses Table** (One-to-One with Users)
- `id` (UUID, PRIMARY KEY)
- `name` (VARCHAR, NOT NULL)
- `owner_id` (UUID, FOREIGN KEY → users(id), NOT NULL)
- `created_at` (TIMESTAMP, DEFAULT CURRENT_TIMESTAMP)

### **Transactions Table**
- `id` (UUID, PRIMARY KEY)
- `user_id` (UUID, FOREIGN KEY → users(id), ON DELETE SET NULL)
- `business_id` (UUID, FOREIGN KEY → businesses(id), ON DELETE SET NULL)
- `amount` (DECIMAL, NOT NULL)
- `category` (VARCHAR, NOT NULL)
- `transaction_type` (VARCHAR, CHECK ('income' OR 'expense'))
- `created_at` (TIMESTAMP, DEFAULT CURRENT_TIMESTAMP)

### **Tax Filings Table**
- `id` (UUID, PRIMARY KEY)
- `user_id` (UUID, FOREIGN KEY → users(id), ON DELETE CASCADE)
- `filing_type` (VARCHAR, CHECK ('ITR-1', 'ITR-2', 'GST'))
- `status` (VARCHAR, CHECK ('pending', 'submitted', 'approved'))
- `submitted_at` (TIMESTAMP, NULLABLE)

### **Metadata Table**
- `id` (UUID, FOREIGN KEY → tax_filing(id))
- `user_id` (UUID, FOREIGN KEY → users(id), ON DELETE CASCADE)
- `url` (VARCHAR, NOT NULL)

## Installation & Setup
### Prerequisites
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
  NEXT_PUBLIC_SUPABASE_URL=https://akcuqzqsubmwzydpdikp.supabase.co
  NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### Run the Application
```sh
  npm run dev
```

## Contributing
1. Fork the repository.
2. Create a new branch.
3. Commit your changes.
4. Push the branch and open a pull request.

## License
This project is licensed under the [MIT License](LICENSE).

