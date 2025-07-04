# Facility Workflow Documentation

## Overview
Enhanced facility user experience designed to support facilities in paying for patient orders, managing prescribing providers, and creating/managing patient orders with pharmacy protocol compliance.

## Facility User Journey

### 1. **Login & Account Setup**
- **User Type Selection**: Choose "Facility Manager" from dropdown
- **Account Setup Flow**: 3-step guided setup process
- **Authentication**: Email/password login with demo mode

### 2. **Facility Account Setup (3 Steps)**

#### Step 1: Facility Information
- Facility name and type selection
- Address and contact information
- Facility type options: Hospital, Clinic, Nursing Home, Assisted Living

#### Step 2: Prescribing Providers
- Add prescribing providers with authentication documents
- Provider information: Name, NPI, DEA, Specialty
- Document upload for verification (Medical License, DEA Registration)
- Status tracking: Pending, Approved, Rejected
- View documents functionality

#### Step 3: Office Staff Permissions
- Configure staff access and permissions
- **Create Orders**: Allow staff to create patient orders
- **View Patient Information**: Allow staff to view patient records
- **Manage Prescriptions**: Allow staff to manage prescriptions
- **Process Payments**: Allow staff to process payments

### 3. **Facility Dashboard**

#### Quick Stats Overview
- **Total Orders**: 24 orders
- **Pending Payment**: $1,247
- **Active Patients**: 18 patients
- **Prescriptions**: 42 prescriptions

#### Recent Orders Section
- Order history with patient names
- Prescription count and ship-to preferences
- Order status badges (pending, processing, shipped, delivered)
- **Duplicate Order** functionality
- **View Details** option

### 4. **Order Creation Workflow**

#### Patient Selection/Creation
- Patient name, date of birth, phone, email
- Create new patient or select existing
- Patient information management

#### Prescription Management
- Add multiple prescriptions per patient
- Prescription details: medication, dosage, frequency, quantity
- **Prescription Status Tracking**:
  - **Active**: Available for use
  - **Expired**: Past expiration date
  - **Out of Refills**: No refills remaining
- **Renewal Process**: Automatic prompt for expired/out-of-refill prescriptions
- **Renew Button**: Adds 3 refills and extends expiration to 2025-12-31

#### Ship To Preferences
Four shipping/billing combinations:
- **SF/BP**: Ship From, Bill Patient
- **SF/BF**: Ship From, Bill Facility
- **SP/BF**: Ship Patient, Bill Facility
- **SP/BP**: Ship Patient, Bill Patient

#### Order Summary
- Patient information
- Prescription count
- Ship-to preference
- Estimated total calculation

### 5. **Pharmacy Protocol Compliance**

#### Prescription Renewal System
- **Automatic Detection**: System identifies expired or out-of-refill prescriptions
- **Renewal Prompt**: Clear indication when renewal is needed
- **One-Click Renewal**: Easy renewal process with updated refills and expiration
- **Status Updates**: Real-time status changes after renewal

#### Order Duplication
- **Recent Orders**: Access to previous orders
- **Duplicate Function**: Copy patient and prescription data
- **Efficient Workflow**: Quick reordering for repeat patients

## Technical Features

### State Management
- User authentication and session management
- Facility setup progress tracking
- Prescribing provider management
- Patient and prescription data
- Order history and status
- Ship-to preference configuration

### UI/UX Features
- **Progress Indicators**: Step-by-step setup with visual progress
- **Status Badges**: Color-coded status indicators
- **Responsive Design**: Works on all device sizes
- **Interactive Elements**: Hover effects and smooth transitions
- **Form Validation**: Real-time validation and error handling

### Data Models

#### PrescribingProvider
```typescript
interface PrescribingProvider {
  id: string
  name: string
  npi: string
  dea: string
  specialty: string
  status: 'pending' | 'approved' | 'rejected'
  documents: string[]
}
```

#### Patient
```typescript
interface Patient {
  id: string
  name: string
  dateOfBirth: string
  phone: string
  email: string
  address: string
}
```

#### Prescription
```typescript
interface Prescription {
  id: string
  medication: string
  dosage: string
  frequency: string
  quantity: string
  refills: number
  expiresAt: string
  status: 'active' | 'expired' | 'out-of-refills'
}
```

#### Order
```typescript
interface Order {
  id: string
  patientName: string
  prescriptions: Prescription[]
  shipTo: 'SF/BP' | 'SF/BF' | 'SP/BF' | 'SP/BP'
  status: 'pending' | 'processing' | 'shipped' | 'delivered'
  createdAt: string
  totalAmount: number
}
```

## User Experience Flow

### Complete Workflow
1. **Login** → Select "Facility Manager" → Enter credentials
2. **Account Setup** → Complete 3-step facility setup
3. **Dashboard** → View stats and recent orders
4. **Create Order** → Select/create patient → Add prescriptions → Set ship-to preference
5. **Order Management** → Track orders → Duplicate as needed → Renew prescriptions

### Key Benefits
- **Streamlined Setup**: Guided 3-step account configuration
- **Provider Management**: Easy prescribing provider onboarding
- **Order Efficiency**: Quick order creation and duplication
- **Compliance**: Automatic prescription renewal prompts
- **Flexibility**: Multiple ship-to/bill-to options
- **Transparency**: Clear order status and payment tracking

## Future Enhancements
- Real document upload for provider verification
- Integration with pharmacy systems
- Advanced payment processing
- Automated prescription renewal workflows
- Patient portal integration
- Advanced reporting and analytics
- Multi-facility management
- Inventory tracking and alerts 