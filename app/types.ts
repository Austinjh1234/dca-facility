export type Patient = {
  id: number
  name: string
  email: string
  phone: string
  lastVisit: string
  status: string
}

export type Prescription = {
  rx: string
  patient: string
  medication: string
  prescriber: string
  date: string
  status: string
  strength: string
  quantity: string
  directions: string
  refills: string
  daw: boolean
  priority: string
  notes: string
}

export type PrescriptionFilters = {
  status: string
  search: string
  prescriber: string
  patient: string
  dateFrom: string
  dateTo: string
}

export type NewPatientData = {
  firstName: string
  lastName: string
  email: string
  phone: string
  dateOfBirth: string
  gender: string
  address1: string
  address2: string
  city: string
  state: string
  zip: string
  country: string
  notificationPreference: string
  emergencyContactName: string
  emergencyContactPhone: string
  emergencyContactRelation: string
  allergies: string
  medicalConditions: string
  currentMedications: string
  refillRenewStatus: string
  defaultPriority: string
  deliveryMethod: string
  bioImage: File | null
  driversLicenseState: string
  driversLicenseNumber: string
  driversLicenseExpiration: string
  driversLicenseFront: File | null
  driversLicenseBack: File | null
  mbi: string
  ssn: string
  alternateId: string
  identificationExpiration: string
  externalId: string
  paymentMethod: string
  creditCardType: string
  creditCardNumber: string
  creditCardExpiration: string
  creditCardCVV: string
  creditCardHolderName: string
  creditCardBillingAddress: string
  creditCardBillingCity: string
  creditCardBillingState: string
  creditCardBillingZip: string
  achAccountType: string
  achBankName: string
  achRoutingNumber: string
  achAccountNumber: string
  achAccountHolderName: string
  achBankAddress: string
  achBankCity: string
  achBankState: string
  achBankZip: string
  criticalComments: string
  facility: string
  rxHistory: any[]
}

export type Transaction = {
  id: string
  date: string
  patient: string
  type: string
  amount: string
  method: string
  status: string
  rxNumber: string
  priority: string
  transactionOrigin: string
  originReference: string
  prescriberGroup: string
  paymentRef: string
  statementDate: string
}

export type Appointment = {
  id: number
  time: string
  patient: string
  type: string
  duration: string
  status: string
  notes: string
}

export type FormulaCalculations = {
  patientWeight: string
  dosePerKg: string
  frequency: string
  calculatedDose: number
  quantity: string
  dailyDose: string
  daySupply: number
  desiredStrength: string
  availableStrength: string
  desiredVolume: string
  requiredVolume: number
  strongerPercent: string
  weakerPercent: string
  desiredPercent: string
  strongerParts: number
  weakerParts: number
  costPerUnit: string
  markup: string
  sellingPrice: number
  profit: number
}

export type BulkMedicationData = {
  medication: string
  dosage: string
  frequency: string
  duration: string
  instructions: string
  prescriber: string
}

export type EScriptData = {
  patient: string
  prescriber: string
  medication: string
  strength: string
  quantity: string
  directions: string
  refills: string
  daw: boolean
  priority: string
  notes: string
}

export type TransactionFilters = {
  activity: string
  dateFrom: string
  dateTo: string
  patient: string
  rxNumber: string
  include: string
  statementDate: string
  transactionType: string
  paymentType: string
  paymentRef: string
  amount: string
  transactionOrigin: string
  originReference: string
  prescriberGroup: string
  priority: string
}

export type PrescriptionPatient = {
  id: number
  name: string
  email: string
  phone: string
  prescribedDate: string
  dosage: string
  frequency: string
  status: string
}

// Rx Forms Data Model Types
export type Address = {
  address_line_1: string
  address_line_2: string
  city: string
  state: string
  zip_code: string
}

export type PatientRxForm = {
  first_name: string
  last_name: string
  gender: "male" | "female"
  date_of_birth: string
  phone_number: string
  email: string
}

export type Provider = {
  npi: string
  state_license_number?: string
  last_name: string
  first_name: string
  address: Address
  phone_number: string
  email: string
}

export type PharmacyFulfillmentRx = {
  medication: string
  dosage: string
  days_supply: number
  quantity: number
  instructions: string
  refills: number
  quantity_units: string
}

export type PharmacyFulfillment = {
  id?: string
  external_id: string
  patient: PatientRxForm
  provider: Provider
  address: Address
  prescription_pdf: string
  PharmacyFulfillmentRxs: PharmacyFulfillmentRx[]
  diagnosis: string
  allergies: string
  status?: string
  tracking_number?: string
} 