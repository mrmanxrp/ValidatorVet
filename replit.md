# Mr. Man Business Hub

## Overview

This is a full-stack web application for managing business finances, built with a React frontend and Express backend. The application provides a comprehensive dashboard for tracking expenses, revenue, and financial metrics for a business. It features receipt analysis using OpenAI's GPT-4 Vision API, automated expense categorization, and real-time financial reporting. The system is designed to help small businesses manage their finances efficiently with features like receipt upload and OCR processing, expense tracking by category, and integration with Mercury Bank for account balance monitoring.

## User Preferences

Preferred communication style: Simple, everyday language.
Business context: Portfolio dashboard for Mr. Man Business Hub with Mercury bank integration and Patreon revenue tracking.

## Recent Changes

### August 20, 2025 - Initial Portfolio Dashboard Setup
- ✓ Created business financial dashboard for Mr. Man Business Hub
- ✓ Mercury Bank account integration ($24,847.32 balance)
- ✓ Patreon revenue tracking system
- ✓ AI-powered receipt upload with OpenAI GPT-4 Vision API
- ✓ Expense categorization with 15 business categories aligned with creator business
- ✓ Real-time financial reporting and analytics
- ✓ Sample data added to demonstrate functionality
- ⚠️ OpenAI API quota exceeded - manual expense entry still fully functional

### August 20, 2025 - Camera Receipt Upload & Patreon Integration
- ✓ Implemented camera-based receipt upload in sidebar with real-time camera access
- ✓ Added category dropdown selection during camera capture
- ✓ Updated expense categories to match Mr. Man Business Hub needs (15 categories)
- ✓ Built comprehensive Patreon API integration service
- ✓ Created dedicated Revenue page with Patreon analytics
- ✓ Added Patreon data sync functionality with automatic revenue tracking
- ✓ Integrated top supporters display and lifetime revenue metrics
- ⚠️ Patreon integration ready - requires PATREON_ACCESS_TOKEN for activation

### August 20, 2025 - Cleanup & Delete Functionality
- ✓ Removed all placeholder data from storage - dashboard shows real data only
- ✓ Removed receipt upload section from dashboard for cleaner layout
- ✓ Added delete functionality for expense line items with garbage can icon
- ✓ Added delete functionality for revenue line items with garbage can icon  
- ✓ Implemented proper confirmation dialogs for deletions
- ✓ Updated API routes with DELETE endpoints for expenses and revenue
- ✓ Automatic cache invalidation after deletions to update all related views

### August 20, 2025 - Advanced Analytics & Currency Fix
- ✓ Built comprehensive expense analytics and reporting system with advanced data visualization
- ✓ Created filtering by date range, category, and client for detailed analysis
- ✓ Implemented AI-powered insights and recommendations engine with budget analysis
- ✓ Added trend analysis with growth calculations and business intelligence
- ✓ Integrated recharts and react-day-picker libraries for professional charts
- ✓ Fixed critical currency handling - Mercury bank balance correctly treated as USD
- ✓ Updated schema documentation to clarify currency assumptions (Mercury: USD, Expenses/Revenue: CAD)
- ✓ Analytics page accessible via sidebar navigation for comprehensive financial reporting

### August 27, 2025 - Authentication & Mercury Transaction Import
- ✓ Complete login/authentication system implemented with Replit Auth
- ✓ PostgreSQL database setup with all required tables (sessions, users, accounts, etc.)
- ✓ User sessions and protected routes working with persistent data storage
- ✓ Landing page for logged-out users with business information
- ✓ Sidebar shows user profile with logout button functionality
- ✓ Mercury transaction import feature - view and import bank transactions as expenses
- ✓ Smart filtering of outgoing Mercury transactions as potential business expenses
- ✓ Category selection and direct import to expense tracking system
- ✓ "Import from Mercury" button added to Expenses page for easy access

### August 27, 2025 - Manual Mercury Transaction Import Control
- ✓ Removed automatic Mercury sync for user control over expense selection
- ✓ Restored manual "Import from Mercury" button in expenses page header
- ✓ Preserves original currency amounts (USD) from Mercury transactions
- ✓ User manually selects which Mercury transactions to import as expenses
- ✓ Currency conversion only when explicitly choosing CAD as display currency
- ✓ Duplicate transaction prevention with Mercury transaction ID tracking
- ✓ Mercury account balance tracking still automatic for dashboard display
- ✓ Proper transaction categorization with user-selected categories during import

### August 27, 2025 - Currency System & Data Display Fix
- ✓ Added currency field to expenses table to track original transaction currency
- ✓ Fixed Mercury imports to properly store USD currency instead of assuming CAD
- ✓ Updated dashboard calculations to handle multi-currency expenses correctly
- ✓ Fixed expenses page data source issue - now fetches from correct /api/expenses endpoint
- ✓ Removed incorrect expense type filtering that was hiding imported Mercury transactions
- ✓ Currency conversion now works properly: USD expenses stay USD, convert when displaying CAD
- ✓ Dashboard shows accurate monthly expenses with proper currency conversion

### August 27, 2025 - Expense Editing & Currency Consistency Fix
- ✓ Fixed critical expense editing issue where converted amounts were shown instead of original amounts
- ✓ Updated edit form to display original amount and currency (e.g., $190.96 USD instead of $138.06 CAD)
- ✓ Fixed save functionality to preserve original currency when editing expenses
- ✓ Corrected SafePal expense to properly store as $190.96 USD (not CAD)
- ✓ Currency calculations now consistent: Replit $50.56 USD + SafePal $190.96 USD = $334.05 CAD total
- ✓ All expense totals now accurate across dashboard, expenses page, and analytics

### August 27, 2025 - Complete Multi-Client Management System
- ✓ Implemented comprehensive client management with create, edit, delete functionality
- ✓ Added client profile image upload capability with object storage integration
- ✓ Created ClientSelector component for dashboard filtering by specific clients or all clients
- ✓ Built client deletion with cascade protection and confirmation dialogs
- ✓ Updated database methods to support client-filtered financial queries
- ✓ Dashboard now respects client selection for expenses, revenue, and analytics
- ✓ Added proper error handling and user feedback for all client operations
- ✓ Navigation includes dedicated Clients page for managing all client relationships
- ✓ Per-client financial tracking with real-time filtering across the entire application

### August 27, 2025 - App Name Change to Avoid Client Confusion
- ✓ Changed application name from "Mr Man, LLC" to "Mr. Man Business Hub"
- ✓ Updated all references across landing page, dashboard, sidebar, and settings
- ✓ Preserved "Mr Man, LLC" as client record since it's an actual client in the system
- ✓ Updated documentation title and branding throughout application
- ✓ Maintains clear separation between the business hub app and individual client entities

### August 27, 2025 - Recent Transaction History & Income Statement Navigation
- ✓ Enhanced /api/transactions endpoint to provide unified recent transaction history
- ✓ Combined both expenses and revenue into single chronological transaction feed
- ✓ Added client filtering support to show transactions for selected clients only
- ✓ Added currency conversion for proper display in user's preferred currency
- ✓ Updated dashboard to fetch transactions with client and currency filters
- ✓ Improved number formatting in transaction list for better readability
- ✓ Added cache invalidation when new expenses/revenue are added for real-time updates
- ✓ Added "Income Statement" navigation link to sidebar between Analytics and Settings
- ✓ Built comprehensive Income Statement page using professional financial reporting format
- ✓ Integrated real revenue and expense data with proper categorization
- ✓ Added dynamic business name header from client data
- ✓ Implemented year-over-year comparison with calculated historical estimates
- ✓ Included EBITDA, tax calculations, and net income computations
- ✓ Added summary cards for key financial metrics

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Routing**: Wouter for client-side routing
- **State Management**: TanStack React Query for server state management
- **UI Components**: Shadcn/ui component library built on Radix UI primitives
- **Styling**: Tailwind CSS with CSS custom properties for theming
- **Build Tool**: Vite for development and bundling

### Backend Architecture
- **Framework**: Express.js with TypeScript
- **Database ORM**: Drizzle ORM with PostgreSQL dialect
- **File Upload**: Multer for handling multipart/form-data
- **Session Management**: Express sessions with PostgreSQL store
- **Development**: Hot module replacement with Vite middleware integration
- **API Design**: RESTful endpoints with JSON responses

### Database Schema
- **Accounts Table**: Stores business account information (Mercury, Patreon)
- **Expenses Table**: Expense records with OCR-extracted data from receipts
- **Revenue Table**: Revenue tracking from various sources
- **Transactions Table**: Unified transaction log for all financial activities
- **Data Types**: Uses PostgreSQL decimal type for precise financial calculations

### Authentication & Authorization
- Currently uses in-memory storage (MemStorage class) for development
- Session-based authentication prepared for future implementation
- No authentication required for current MVP version

### File Handling & Storage
- Receipt images processed through OpenAI GPT-4 Vision API
- Multer configured with memory storage and 10MB file size limit
- Base64 encoding for image transmission to OpenAI API
- Extracted data stored as JSONB in PostgreSQL

## External Dependencies

### Cloud Services
- **Neon Database**: PostgreSQL hosting service for production data storage
- **OpenAI API**: GPT-4 Vision model for receipt analysis and data extraction
- **Mercury Bank Integration**: Account balance and transaction data (planned)
- **Patreon API**: Revenue tracking from creator platform (planned)

### UI & Component Libraries
- **Radix UI**: Headless component primitives for accessibility
- **Shadcn/ui**: Pre-built component library with consistent theming
- **Lucide React**: Icon library for UI elements
- **TailwindCSS**: Utility-first CSS framework

### Development Tools
- **Drizzle Kit**: Database schema management and migrations
- **ESBuild**: Fast JavaScript bundler for production builds
- **Replit Integrations**: Development environment plugins and error handling
- **TypeScript**: Static type checking across the entire stack

### Data Processing
- **Date-fns**: Date manipulation and formatting
- **Zod**: Runtime type validation and schema parsing
- **React Hook Form**: Form state management and validation
- **Class Variance Authority**: Utility for managing component variants