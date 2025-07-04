# Login System Documentation

## Overview
The Facilities Portal includes a comprehensive login system with three user types and a complete provider onboarding flow.

## User Types

### 1. Provider
- **Login Flow**: Multi-step onboarding process
- **Access**: Full prescription management capabilities
- **Features**: Patient management, prescription submission, status tracking

### 2. Facility
- **Login Flow**: Simple email/password authentication
- **Access**: Facility-specific features (to be implemented)
- **Features**: Facility management tools

### 3. DCA Pharmacy
- **Login Flow**: Simple email/password authentication
- **Access**: Pharmacy-specific features (to be implemented)
- **Features**: Pharmacy management tools

## Provider Onboarding Flow

### Screen 1: Account Creation
- Email address
- Password and confirmation
- First name and last name
- Company name
- Phone number
- Form validation and submission

### Screen 2: Email Verification
- Email validation link/code entry
- Verification process
- Security confirmation

### Screen 3: Document Authentication
- Medical License upload
- DEA Registration upload
- Professional Liability Insurance upload
- Document verification status
- 24-48 hour processing timeline

### Screen 4: Staff Permissions
- View Patients permission
- Create Prescriptions permission
- Manage Appointments permission
- Role-based access control setup

### Screen 5: Welcome & Setup
- Welcome message with user's name
- Platform Walkthrough option
- Get Started button

## Provider Workflow

### Patient Selection
- Search existing patients
- Create new patient
- Patient information management

### Prescription Submission
Four submission methods:
1. **DCA E-Script**: Direct electronic prescription submission
2. **SureScript**: Industry standard e-prescribing
3. **Upload**: Upload existing prescription files
4. **Library**: Choose from saved prescriptions

### Prescription Details
- Medication name and dosage
- Frequency and quantity
- Special instructions
- Patient-specific notes

### Status Tracking
- Real-time prescription status
- "Order Sent to Patient for Order / Pay" confirmation
- Submission history
- Status badges (pending, sent, approved, rejected)

## Technical Implementation

### Components
- `LoginPage`: Main login component with all flows
- `app/login/page.tsx`: Login route
- Integration with main app via navigation

### State Management
- User type selection
- Onboarding step tracking
- Form data management
- Patient and prescription state

### Navigation
- Back to Main button on all login screens
- Step-by-step navigation in onboarding
- Breadcrumb-style progress indicators

## Security Features
- Password confirmation validation
- Email verification process
- Document authentication
- Role-based permissions
- Secure form handling

## UI/UX Features
- Responsive design for all screen sizes
- Progress indicators for multi-step flows
- Clear visual feedback for actions
- Consistent styling with main application
- Accessibility considerations

## Future Enhancements
- Real email verification integration
- Document upload functionality
- Database integration for user management
- Session management and authentication
- Password reset functionality
- Two-factor authentication
- Audit logging for compliance 