"use client"
import { useState, useEffect, ChangeEvent, useMemo } from "react"
import {
  Patient,
  Prescription,
  PrescriptionFilters,
  NewPatientData,
  Transaction,
  Appointment,
  FormulaCalculations,
  BulkMedicationData,
  EScriptData,
  TransactionFilters,
  PrescriptionPatient,
  PharmacyFulfillment,
  PharmacyFulfillmentRx,
  PatientRxForm,
  Provider,
  Address,
} from "./types"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Package,
  Pill,
  Users,
  LayoutDashboard,
  Clock,
  CheckCircle,
  AlertCircle,
  UserCheck,
  Search,
  Calendar,
  CreditCard,
  Workflow,
  Calculator,
  Plus,
  X,
  Wrench,
  Pause,
  FileText,
  Edit,
  Eye,
  Phone,
  Headphones,
} from "lucide-react"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { useIsMobile } from "@/hooks/use-mobile"
import ToolsPopup from "@/components/tools-popup"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { 
  User, 
  Stethoscope, 
  Building,
  Send,
  Copy,
  AlertTriangle,
  ArrowRight,
  ArrowLeft,
  Trophy,
  Medal,
  Crown,
  Star as StarIcon,
  Flag as FlagIcon,
  Bookmark as BookmarkIcon,
  Tag as TagIcon,
  Hash as HashIcon,
  AtSign as AtSignIcon,
  Percent as PercentIcon,
  PlusCircle,
  MinusCircle,
  XCircle,
  CheckCircle as CheckCircleIcon,
  AlertCircle as AlertCircleIcon,
  Info,
  HelpCircle,
  ExternalLink,
  Link,
  Link2,
  Unlink,
  Lock,
  Unlock,
  Eye as EyeIcon,
  EyeOff,
  Heart as HeartIcon,
  HeartOff,
  ThumbsUp,
  ThumbsDown,
  MessageCircle,
  MessageSquare,
  Send as SendIcon,
  Mail,
  Inbox,
  Archive,
  Trash,
  Save,
  Copy as CopyIcon,
  Undo,
  Redo,
  RotateCcw,
  RotateCw,
  ZoomIn,
  ZoomOut,
  Move,
  Crop,
  Type,
  Bold,
  Italic,
  Underline,
  Strikethrough,
  AlignLeft,
  AlignCenter,
  AlignRight,
  AlignJustify,
  List,
  ListOrdered,
  Quote,
  Code,
  Hash as HashIcon2,
  AtSign as AtSignIcon2,
  Percent as PercentIcon2,
  DollarSign as DollarSignIcon,
  Euro as EuroIcon,
  Bitcoin as BitcoinIcon,
  CreditCard as CreditCardIcon,
  Wallet as WalletIcon,
  PiggyBank as PiggyBankIcon,
  TrendingUp as TrendingUpIcon,
  TrendingDown as TrendingDownIcon,
  BarChart as BarChartIcon,
  LineChart as LineChartIcon,
  PieChart as PieChartIcon,
  ScatterChart as ScatterChartIcon,
  Activity as ActivityIcon2,
  Zap as ZapIcon2,
  Target as TargetIcon2,
  Award as AwardIcon,
  Trophy as TrophyIcon,
  Medal as MedalIcon,
  Crown as CrownIcon,
  Star as StarIcon2,
  Flag as FlagIcon2,
  Bookmark as BookmarkIcon2,
  Tag as TagIcon2,
  Hash as HashIcon3,
  AtSign as AtSignIcon3,
  Percent as PercentIcon3,
  PlusCircle as PlusCircleIcon,
  MinusCircle as MinusCircleIcon,
  XCircle as XCircleIcon,
  CheckCircle as CheckCircleIcon2,
  AlertCircle as AlertCircleIcon2,
  Info as InfoIcon,
  HelpCircle as HelpCircleIcon,
  ExternalLink as ExternalLinkIcon,
  Link as LinkIcon,
  Link2 as Link2Icon,
  Unlink as UnlinkIcon,
  Lock as LockIcon,
  Unlock as UnlockIcon,
  Eye as EyeIcon2,
  EyeOff as EyeOffIcon,
  Heart as HeartIcon2,
  HeartOff as HeartOffIcon,
  ThumbsUp as ThumbsUpIcon,
  ThumbsDown as ThumbsDownIcon,
  MessageCircle as MessageCircleIcon,
  MessageSquare as MessageSquareIcon,
  Send as SendIcon2,
  Mail as MailIcon,
  Inbox as InboxIcon,
  Archive as ArchiveIcon,
  Trash as TrashIcon,
  Save as SaveIcon,
  Edit as EditIcon,
  Copy as CopyIcon2,
  Undo as UndoIcon,
  Redo as RedoIcon,
  RotateCcw as RotateCcwIcon,
  RotateCw as RotateCwIcon,
  ZoomIn as ZoomInIcon,
  ZoomOut as ZoomOutIcon,
  Move as MoveIcon,
  Crop as CropIcon,
  Type as TypeIcon,
  Bold as BoldIcon,
  Italic as ItalicIcon,
  Underline as UnderlineIcon,
  Strikethrough as StrikethroughIcon,
  AlignLeft as AlignLeftIcon,
  AlignCenter as AlignCenterIcon,
  AlignRight as AlignRightIcon,
  AlignJustify as AlignJustifyIcon,
  List as ListIcon,
  ListOrdered as ListOrderedIcon,
  Quote as QuoteIcon,
  Code as CodeIcon,
  Hash as HashIcon4,
  AtSign as AtSignIcon4,
  Percent as PercentIcon4,
  DollarSign as DollarSignIcon2,
  Euro as EuroIcon2,
  Bitcoin as BitcoinIcon2,
  CreditCard as CreditCardIcon2,
  Wallet as WalletIcon2,
  PiggyBank as PiggyBankIcon2,
  TrendingUp as TrendingUpIcon2,
  TrendingDown as TrendingDownIcon2,
  BarChart as BarChartIcon2,
  LineChart as LineChartIcon2,
  PieChart as PieChartIcon2,
  ScatterChart as ScatterChartIcon2,
  Activity as ActivityIcon3,
  Zap as ZapIcon3,
  Target as TargetIcon3,
  Award as AwardIcon2,
  Trophy as TrophyIcon2,
  Medal as MedalIcon2,
  Crown as CrownIcon2,
  Star as StarIcon3,
  Flag as FlagIcon3,
  Bookmark as BookmarkIcon3,
  Tag as TagIcon3,
  Headphones as HeadphonesIcon,
  Phone as PhoneIcon,
  Paperclip as PaperclipIcon,
  Download as DownloadIcon,
} from "lucide-react"
import ContactForm from "@/components/contact-form"

const MAIN_HEADERS = [
  { id: "dashboard", title: "Dashboard", icon: LayoutDashboard },
  { id: "operations", title: "Operations", icon: Package },
  { id: "prescriptions", title: "Prescriptions", icon: Pill },
  { id: "patients", title: "Patients", icon: Users },
  { id: "account", title: "Account", icon: CreditCard },
  { id: "ar", title: "AR Management", icon: CreditCard },
  { id: "scheduling", title: "Scheduling", icon: Calendar },
  { id: "workflow", title: "Workflow", icon: Workflow },
  { id: "rxforms", title: "Rx Forms", icon: FileText },
  { id: "catalog", title: "Catalog", icon: BookmarkIcon },
  { id: "appointments", title: "Appointments", icon: Calendar },
  { id: "contact", title: "Contact", icon: MessageCircle },
]

export default function FacilitiesPortal() {
  const isMobile = useIsMobile()
  const [activeHeader, setActiveHeader] = useState<string>("dashboard")
  const [showUserMenu, setShowUserMenu] = useState<boolean>(false)
  const [sidebarCollapsed, setSidebarCollapsed] = useState<boolean>(isMobile)
  const [showSettings, setShowSettings] = useState<boolean>(false)
  const [showTools, setShowTools] = useState<boolean>(false)
  const [activeARTab, setActiveARTab] = useState<string>("search")
  const [arSearchQuery, setArSearchQuery] = useState<string>("")
  const [selectedPatients, setSelectedPatients] = useState<number[]>([])
  const [showBulkMedication, setShowBulkMedication] = useState<boolean>(false)
  const [bulkMedicationData, setBulkMedicationData] = useState<BulkMedicationData>({
    medication: "",
    dosage: "",
    frequency: "",
    duration: "",
    instructions: "",
    prescriber: "",
  })
  const [showPatientDetails, setShowPatientDetails] = useState<boolean>(false)
  const [selectedPatientId, setSelectedPatientId] = useState<number | null>(null)
  const [activePatientTab, setActivePatientTab] = useState<string>("contact")
  const [showPrescriptionDetails, setShowPrescriptionDetails] = useState<boolean>(false)
  const [selectedPrescription, setSelectedPrescription] = useState<Prescription | null>(null)
  const [showPrescriptionPatients, setShowPrescriptionPatients] = useState<boolean>(false)
  const [prescriptionPatients, setPrescriptionPatients] = useState<PrescriptionPatient[]>([])
  const [showAddPatientToPrescription, setShowAddPatientToPrescription] = useState<boolean>(false)
  const [patientSearchQuery, setPatientSearchQuery] = useState<string>("")
  const [filteredPatients, setFilteredPatients] = useState<Patient[]>([])
  const [transactionFilters, setTransactionFilters] = useState<TransactionFilters>({
    activity: "all",
    dateFrom: "",
    dateTo: "",
    patient: "",
    rxNumber: "",
    include: "all",
    statementDate: "",
    transactionType: "",
    paymentType: "",
    paymentRef: "",
    amount: "",
    transactionOrigin: "",
    originReference: "",
    prescriberGroup: "",
    priority: "all",
  })
  const [showResults, setShowResults] = useState<boolean>(false)
  const [transactionResults, setTransactionResults] = useState<Transaction[]>([])
  const [formulaCalculations, setFormulaCalculations] = useState<FormulaCalculations>({
    patientWeight: "",
    dosePerKg: "",
    frequency: "1",
    calculatedDose: 0,
    quantity: "",
    dailyDose: "",
    daySupply: 0,
    desiredStrength: "",
    availableStrength: "",
    desiredVolume: "",
    requiredVolume: 0,
    strongerPercent: "",
    weakerPercent: "",
    desiredPercent: "",
    strongerParts: 0,
    weakerParts: 0,
    costPerUnit: "",
    markup: "",
    sellingPrice: 0,
    profit: 0,
  })

  const [prescriptionFilters, setPrescriptionFilters] = useState<PrescriptionFilters>({
    status: "all",
    search: "",
    prescriber: "",
    patient: "",
    dateFrom: "",
    dateTo: "",
  })
  const [showNewEScript, setShowNewEScript] = useState<boolean>(false)
  const [eScriptStep, setEScriptStep] = useState<number>(1)
  const [eScriptData, setEScriptData] = useState<EScriptData>({
    patient: "",
    prescriber: "",
    medication: "",
    strength: "",
    quantity: "",
    directions: "",
    refills: "",
    daw: false,
    priority: "routine",
    notes: "",
  })
  const [showNewPatient, setShowNewPatient] = useState<boolean>(false)
  const [currentStep, setCurrentStep] = useState<number>(1)
  const [canSend, setCanSend] = useState<boolean>(false)
  const [newPatientData, setNewPatientData] = useState<NewPatientData>({
    // Basic Info
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    dateOfBirth: "",
    gender: "",

    // Address
    address1: "",
    address2: "",
    city: "",
    state: "",
    zip: "",
    country: "USA",

    // Contact Preferences
    notificationPreference: "email", // email, sms, phone, mail
    emergencyContactName: "",
    emergencyContactPhone: "",
    emergencyContactRelation: "",

    // Medical Info
    allergies: "",
    medicalConditions: "",
    currentMedications: "",

    // Account Settings
    refillRenewStatus: "active", // active, inactive, suspended
    defaultPriority: "medium", // low, medium, high
    deliveryMethod: "pickup", // pickup, delivery, mail

    // Identification
    bioImage: null,
    driversLicenseState: "",
    driversLicenseNumber: "",
    driversLicenseExpiration: "",
    driversLicenseFront: null,
    driversLicenseBack: null,
    mbi: "",
    ssn: "",
    alternateId: "",
    identificationExpiration: "",
    externalId: "",

    // Financial Information
    paymentMethod: "credit", // credit, ach, cash
    // Credit Card Info
    creditCardType: "",
    'creditCardNumber': "",
    creditCardExpiration: "",
    creditCardCVV: "",
    creditCardHolderName: "",
    creditCardBillingAddress: "",
    creditCardBillingCity: "",
    creditCardBillingState: "",
    creditCardBillingZip: "",
    // ACH Info
    achAccountType: "", // checking, savings, business-checking, business-savings
    achBankName: "",
    achRoutingNumber: "",
    achAccountNumber: "",
    achAccountHolderName: "",
    achBankAddress: "",
    achBankCity: "",
    achBankState: "",
    achBankZip: "",

    // Additional Info
    criticalComments: "",
    facility: "Main Location",
    rxHistory: [],
  })

  const [selectedDate, setSelectedDate] = useState<string>(new Date().toISOString().split("T")[0])
  const [showDayAppointments, setShowDayAppointments] = useState<boolean>(false)
  const [dayAppointments, setDayAppointments] = useState<Appointment[]>([])
  const [showPatientMedications, setShowPatientMedications] = useState<boolean>(false)
  const [showPatientPrescriptions, setShowPatientPrescriptions] = useState<boolean>(false)
  const [showMissingInfoModal, setShowMissingInfoModal] = useState<boolean>(false)
  const [selectedMissingOrder, setSelectedMissingOrder] = useState<any>(null)
  const [showMissingDetails, setShowMissingDetails] = useState<boolean>(false)
  const [showNewRxModal, setShowNewRxModal] = useState<boolean>(false)
  const [newRxStep, setNewRxStep] = useState<number>(1)
  const [newRxData, setNewRxData] = useState({
    patientSearch: "",
    selectedPatient: null as Patient | null,
    isNewPatient: false,
    rxDetails: {
      medication: "",
      strength: "",
      quantity: "",
      directions: "",
      refills: "",
      prescriber: "",
      daw: false,
      priority: "routine",
      notes: ""
    },
    billShipPreference: "",
    existingPatientOption: ""
  })
  const [showInProgressRx, setShowInProgressRx] = useState<boolean>(false)
  const [selectedPrescriber, setSelectedPrescriber] = useState<string>("all")
  const [selectedStatus, setSelectedStatus] = useState<string>("all")
  const [inProgressDate, setInProgressDate] = useState<string>("today")
  const [showRxFormModal, setShowRxFormModal] = useState<boolean>(false)
  const [showContactForm, setShowContactForm] = useState<boolean>(false)
  const [rxFormData, setRxFormData] = useState<PharmacyFulfillment>({
    external_id: "",
    patient: {
      first_name: "",
      last_name: "",
      gender: "male",
      date_of_birth: "",
      phone_number: "",
      email: ""
    },
    provider: {
      npi: "",
      last_name: "",
      first_name: "",
      address: {
        address_line_1: "",
        address_line_2: "",
        city: "",
        state: "",
        zip_code: ""
      },
      phone_number: "",
      email: ""
    },
    address: {
      address_line_1: "",
      address_line_2: "",
      city: "",
      state: "",
      zip_code: ""
    },
    prescription_pdf: "",
    PharmacyFulfillmentRxs: [],
    diagnosis: "",
    allergies: ""
  })

  useEffect(() => {
    setSidebarCollapsed(isMobile)
  }, [isMobile])

  const userProfile = {
    name: "Amanda Rodriguez",
    role: "Pharmacy Manager",
    avatar: "/placeholder-user.jpg",
  }

  const statusCards = [
    { title: "Patient Rx", value: 47, status: "New", icon: Clock },
    { title: "Office Order", value: 23, status: "New", icon: CheckCircle },
    { title: "Missing Info Alert", value: 8, status: "Alert", icon: AlertCircle },
    { title: "Complete Track", value: 124, status: "Complete", icon: UserCheck },
  ]

  // Sample pharmacy orders with missing information
  const missingInfoOrders = [
    {
      id: "ORD-001",
      patientName: "John Smith",
      medication: "Metformin 500mg",
      orderDate: "12/18/2024",
      income: "$125.00",
      missingInfo: [
        { field: "Insurance ID", required: true, current: "", description: "Patient's insurance identification number" },
        { field: "Prior Authorization", required: false, current: "", description: "Prior authorization from insurance" },
        { field: "Prescriber NPI", required: true, current: "", description: "National Provider Identifier for prescriber" }
      ]
    },
    {
      id: "ORD-002", 
      patientName: "Sarah Johnson",
      medication: "Lisinopril 10mg",
      orderDate: "12/17/2024",
      income: "$89.50",
      missingInfo: [
        { field: "Patient Date of Birth", required: true, current: "", description: "Patient's date of birth for verification" },
        { field: "Emergency Contact", required: false, current: "", description: "Emergency contact information" }
      ]
    },
    {
      id: "ORD-003",
      patientName: "Mike Davis", 
      medication: "Atorvastatin 20mg",
      orderDate: "12/16/2024",
      income: "$156.75",
      missingInfo: [
        { field: "Allergies", required: true, current: "", description: "Patient's known drug allergies" },
        { field: "Current Medications", required: true, current: "", description: "List of current medications" },
        { field: "Insurance Group Number", required: true, current: "", description: "Insurance group number" }
      ]
    },
    {
      id: "ORD-004",
      patientName: "Lisa Wilson",
      medication: "Simvastatin 40mg", 
      orderDate: "12/15/2024",
      income: "$98.25",
      missingInfo: [
        { field: "Patient Address", required: true, current: "", description: "Current patient address" },
        { field: "Phone Number", required: true, current: "", description: "Patient's contact phone number" }
      ]
    },
    {
      id: "ORD-005",
      patientName: "Robert Brown",
      medication: "Amlodipine 5mg",
      orderDate: "12/14/2024", 
      income: "$112.00",
      missingInfo: [
        { field: "Insurance Policy Number", required: true, current: "", description: "Insurance policy number" },
        { field: "Prescriber Phone", required: true, current: "", description: "Prescriber's contact phone number" }
      ]
    },
    {
      id: "ORD-006",
      patientName: "Emily Green",
      medication: "Omeprazole 20mg",
      orderDate: "12/13/2024",
      income: "$67.80",
      missingInfo: [
        { field: "Patient Weight", required: false, current: "", description: "Patient's current weight for dosage calculation" },
        { field: "Insurance Card Front", required: true, current: "", description: "Front image of insurance card" }
      ]
    },
    {
      id: "ORD-007", 
      patientName: "David White",
      medication: "Losartan 50mg",
      orderDate: "12/12/2024",
      income: "$134.20",
      missingInfo: [
        { field: "Medical History", required: true, current: "", description: "Patient's medical history" },
        { field: "Insurance Card Back", required: true, current: "", description: "Back image of insurance card" }
      ]
    },
    {
      id: "ORD-008",
      patientName: "Ashley Black",
      medication: "Hydrochlorothiazide 25mg",
      orderDate: "12/11/2024",
      income: "$78.90",
      missingInfo: [
        { field: "Prescriber DEA Number", required: true, current: "", description: "Prescriber's DEA registration number" },
        { field: "Patient Email", required: false, current: "", description: "Patient's email address for notifications" }
      ]
    }
  ]

  // Sample in-progress prescriptions data
  const inProgressPrescriptions = [
    {
      id: "RX-001",
      patientName: "John Smith",
      medication: "Metformin 500mg",
      prescriber: "Dr. Johnson",
      date: "12/18/2024",
      status: "waiting for input",
      priority: "routine",
      quantity: "30",
      refills: "2",
      directions: "Take 1 tablet twice daily with meals",
      daw: false,
      notes: "Patient prefers generic"
    },
    {
      id: "RX-002",
      patientName: "Sarah Johnson", 
      medication: "Lisinopril 10mg",
      prescriber: "Dr. Williams",
      date: "12/18/2024",
      status: "waiting for payment",
      priority: "routine",
      quantity: "30",
      refills: "1",
      directions: "Take 1 tablet daily",
      daw: false,
      notes: ""
    },
    {
      id: "RX-003",
      patientName: "Mike Davis",
      medication: "Atorvastatin 20mg", 
      prescriber: "Dr. Brown",
      date: "12/18/2024",
      status: "missing information",
      priority: "urgent",
      quantity: "30",
      refills: "0",
      directions: "Take 1 tablet at bedtime",
      daw: true,
      notes: "Brand name only"
    },
    {
      id: "RX-004",
      patientName: "Lisa Wilson",
      medication: "Simvastatin 40mg",
      prescriber: "Dr. Johnson", 
      date: "12/18/2024",
      status: "pre-check",
      priority: "routine",
      quantity: "30",
      refills: "3",
      directions: "Take 1 tablet daily",
      daw: false,
      notes: ""
    },
    {
      id: "RX-005",
      patientName: "Robert Brown",
      medication: "Amlodipine 5mg",
      prescriber: "Dr. Davis",
      date: "12/18/2024", 
      status: "being filled",
      priority: "routine",
      quantity: "30",
      refills: "1",
      directions: "Take 1 tablet daily",
      daw: false,
      notes: ""
    },
    {
      id: "RX-006",
      patientName: "Emily Green",
      medication: "Omeprazole 20mg",
      prescriber: "Dr. Johnson",
      date: "12/18/2024",
      status: "complete",
      priority: "routine", 
      quantity: "30",
      refills: "2",
      directions: "Take 1 capsule daily before breakfast",
      daw: false,
      notes: ""
    },
    {
      id: "RX-007",
      patientName: "David White",
      medication: "Losartan 50mg",
      prescriber: "Dr. Williams",
      date: "12/17/2024",
      status: "waiting for input",
      priority: "routine",
      quantity: "30", 
      refills: "1",
      directions: "Take 1 tablet daily",
      daw: false,
      notes: ""
    },
    {
      id: "RX-008",
      patientName: "Ashley Black",
      medication: "Hydrochlorothiazide 25mg",
      prescriber: "Dr. Brown",
      date: "12/17/2024",
      status: "waiting for payment",
      priority: "routine",
      quantity: "30",
      refills: "0", 
      directions: "Take 1 tablet daily",
      daw: false,
      notes: ""
    }
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case "In Progress":
        return "bg-yellow-100 text-yellow-800"
      case "Ready":
        return "bg-green-100 text-green-800"
      case "Alert":
        return "bg-red-100 text-red-800"
      case "Verified":
        return "bg-blue-100 text-blue-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const inventoryItems = [
    { name: "Metformin 500mg", expiry: "06/20/2025", stock: 120, minimum: 50, status: "In Stock" },
    { name: "Lisinopril 10mg", expiry: "07/15/2025", stock: 35, minimum: 40, status: "Low Stock" },
    { name: "Atorvastatin 20mg", expiry: "08/01/2025", stock: 15, minimum: 20, status: "Out of Stock" },
    { name: "Simvastatin 40mg", expiry: "09/10/2025", stock: 80, minimum: 30, status: "In Stock" },
  ]

  const getStockColor = (status: string) => {
    switch (status) {
      case "In Stock":
        return "bg-green-100 text-green-800"
      case "Low Stock":
        return "bg-yellow-100 text-yellow-800"
      case "Out of Stock":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const recentSearches = [
    "Inspire Medical Group",
    "Serotonin Centers",
    "Direct Medical Care",
    "Home Therapeutics",
    "Wellness Institute",
  ]

  // All patients data for search functionality
  const allPatients: Patient[] = useMemo(
    () => [
      {
        id: 1,
        name: "John Smith",
        email: "john.smith@email.com",
        phone: "(555) 123-4567",
        lastVisit: "12/18/2024",
        status: "Active",
      },
      {
        id: 2,
        name: "Sarah Johnson",
        email: "sarah.j@email.com",
        phone: "(555) 234-5678",
        lastVisit: "12/17/2024",
        status: "Active",
      },
      {
        id: 3,
        name: "Mike Davis",
        email: "mike.davis@email.com",
        phone: "(555) 345-6789",
        lastVisit: "12/16/2024",
        status: "Active",
      },
      {
        id: 4,
        name: "Lisa Wilson",
        email: "lisa.w@email.com",
        phone: "(555) 456-7890",
        lastVisit: "12/15/2024",
        status: "Inactive",
      },
      {
        id: 5,
        name: "Robert Brown",
        email: "robert.b@email.com",
        phone: "(555) 567-8901",
        lastVisit: "12/14/2024",
        status: "Active",
      },
      {
        id: 6,
        name: "Emily Green",
        email: "emily.g@email.com",
        phone: "(555) 678-9012",
        lastVisit: "12/13/2024",
        status: "Active",
      },
      {
        id: 7,
        name: "David White",
        email: "david.w@email.com",
        phone: "(555) 789-0123",
        lastVisit: "12/12/2024",
        status: "Inactive",
      },
      {
        id: 8,
        name: "Ashley Black",
        email: "ashley.b@email.com",
        phone: "(555) 890-1234",
        lastVisit: "12/11/2024",
        status: "Active",
      },
      {
        id: 9,
        name: "Kevin Gray",
        email: "kevin.g@email.com",
        phone: "(555) 901-2345",
        lastVisit: "12/10/2024",
        status: "Active",
      },
      {
        id: 10,
        name: "Jessica Blue",
        email: "jessica.b@email.com",
        phone: "(555) 012-3456",
        lastVisit: "12/09/2024",
        status: "Inactive",
      },
    ],
    [],
  )

  const handleHeaderChange = (headerId: string) => {
    setActiveHeader(headerId)
    setShowUserMenu(false)
    setShowSettings(false)
  }

  const handleTransactionSearch = () => {
    const mockTransactions: Transaction[] = [
      {
        id: "TXN-001",
        date: "12/18/2024",
        patient: "John Smith",
        type: "Payment",
        amount: "$125.00",
        method: "Credit Card",
        status: "Completed",
        rxNumber: "RX001234",
        priority: "BFSP",
        transactionOrigin: "Online",
        originReference: "WEB-12345",
        prescriberGroup: "Endocrinology Associates",
        paymentRef: "CC-789012",
        statementDate: "12/15/2024",
      },
      {
        id: "TXN-002",
        date: "12/18/2024",
        patient: "Sarah Johnson",
        type: "Charge",
        amount: "$89.50",
        method: "Insurance",
        status: "Pending",
        rxNumber: "RX001235",
        priority: "BPSF",
        transactionOrigin: "In-Store",
        originReference: "POS-67890",
        prescriberGroup: "Women's Health Clinic",
        paymentRef: "INS-345678",
        statementDate: "12/15/2024",
      },
      {
        id: "TXN-003",
        date: "12/17/2024",
        patient: "Mike Davis",
        type: "Adjustment",
        amount: "-$15.00",
        method: "Credit Adjustment",
        status: "Completed",
        rxNumber: "RX001236",
        priority: "URGENT",
        transactionOrigin: "Phone",
        originReference: "CALL-11223",
        prescriberGroup: "Internal Medicine Group",
        paymentRef: "ADJ-901234",
        statementDate: "12/15/2024",
      },
      {
        id: "TXN-004",
        date: "12/16/2024",
        patient: "Lisa Wilson",
        type: "Refund",
        amount: "-$45.75",
        method: "ACH",
        status: "Processing",
        rxNumber: "RX001237",
        priority: "ROUTINE",
        transactionOrigin: "Online",
        originReference: "WEB-44556",
        prescriberGroup: "Pain Management Center",
        paymentRef: "ACH-567890",
        statementDate: "12/15/2024",
      },
    ]
    setTransactionResults(mockTransactions)
    setShowResults(true)
  }

  const handleShowPrescriptionDetails = (prescription: Prescription) => {
    setSelectedPrescription(prescription)
    setShowPrescriptionDetails(true)
  }

  const handleShowPrescriptionPatients = (prescription: Prescription) => {
    const mockPatients: PrescriptionPatient[] = [
      {
        id: 1,
        name: "John Smith",
        email: "john.smith@email.com",
        phone: "(555) 123-4567",
        prescribedDate: "12/18/2024",
        dosage: "200mg/ml",
        frequency: "Once daily",
        status: "Active",
      },
    ]
    setPrescriptionPatients(mockPatients)
    setShowPrescriptionPatients(true)
  }

  // Filter patients based on search query
  useEffect(() => {
    if (patientSearchQuery.trim() === "") {
      setFilteredPatients([])
    } else {
      const filtered = allPatients.filter(
        (patient) =>
          patient.name.toLowerCase().includes(patientSearchQuery.toLowerCase()) ||
          patient.email.toLowerCase().includes(patientSearchQuery.toLowerCase()) ||
          patient.phone.includes(patientSearchQuery),
      )
      setFilteredPatients(filtered)
    }
  }, [patientSearchQuery, allPatients])

  const handleAddPatientToPrescription = (patient: Patient) => {
    // Add patient to prescription patients list
    const newPatient: PrescriptionPatient = {
      ...patient,
      prescribedDate: new Date().toLocaleDateString(),
      dosage: selectedPrescription?.strength || "N/A",
      frequency: "As prescribed",
      status: "Active",
    }
    setPrescriptionPatients((prev: PrescriptionPatient[]) => [...prev, newPatient])
    setShowAddPatientToPrescription(false)
    setPatientSearchQuery("")
    setFilteredPatients([])
  }

  const handleDateClick = (date: string) => {
    setSelectedDate(date)
    // Mock appointments for the selected date
    const mockAppointments: Appointment[] = [
      {
        id: 1,
        time: "9:00 AM",
        patient: "John Smith",
        type: "Consultation",
        duration: "30 min",
        status: "Confirmed",
        notes: "Follow-up appointment",
      },
      {
        id: 2,
        time: "10:30 AM",
        patient: "Sarah Johnson",
        type: "Check-up",
        duration: "45 min",
        status: "Confirmed",
        notes: "Regular health check",
      },
      {
        id: 3,
        time: "2:00 PM",
        patient: "Mike Davis",
        type: "Prescription Review",
        duration: "20 min",
        status: "Pending",
        notes: "Medication adjustment needed",
      },
    ]
    setDayAppointments(mockAppointments)
    setShowDayAppointments(true)
  }

  const renderFormulaCalculator = () => {
    const calculateDosage = () => {
      const weight = Number.parseFloat(formulaCalculations.patientWeight) || 0
      const dosePerKg = Number.parseFloat(formulaCalculations.dosePerKg) || 0
      const frequency = Number.parseFloat(formulaCalculations.frequency) || 1
      const dose = weight * dosePerKg * frequency
      setFormulaCalculations((prev: FormulaCalculations) => ({ ...prev, calculatedDose: dose }))
    }

    const calculateDaySupply = () => {
      const quantity = Number.parseFloat(formulaCalculations.quantity) || 0
      const dailyDose = Number.parseFloat(formulaCalculations.dailyDose) || 0
      const daySupply = dailyDose > 0 ? quantity / dailyDose : 0
      setFormulaCalculations((prev: FormulaCalculations) => ({ ...prev, daySupply: daySupply }))
    }

    const calculateConcentration = () => {
      const desired = Number.parseFloat(formulaCalculations.desiredStrength) || 0
      const available = Number.parseFloat(formulaCalculations.availableStrength) || 0
      const volume = Number.parseFloat(formulaCalculations.desiredVolume) || 0
      const required = available > 0 ? (desired * volume) / available : 0
      setFormulaCalculations((prev: FormulaCalculations) => ({ ...prev, requiredVolume: required }))
    }

    const calculateAlligation = () => {
      const stronger = Number.parseFloat(formulaCalculations.strongerPercent) || 0
      const weaker = Number.parseFloat(formulaCalculations.weakerPercent) || 0
      const desired = Number.parseFloat(formulaCalculations.desiredPercent) || 0

      if (stronger > weaker && desired > weaker && desired < stronger) {
        const strongerParts = desired - weaker
        const weakerParts = stronger - desired
        setFormulaCalculations(
          (
            prev: FormulaCalculations,
          ): FormulaCalculations => ({
            ...prev,
            strongerParts: strongerParts,
            weakerParts: weakerParts,
          }),
        )
      }
    }

    const calculateBusiness = () => {
      const cost = Number.parseFloat(formulaCalculations.costPerUnit) || 0
      const markup = Number.parseFloat(formulaCalculations.markup) || 0
      const selling = cost * (1 + markup / 100)
      const profit = selling - cost
      setFormulaCalculations(
        (
          prev: FormulaCalculations,
        ): FormulaCalculations => ({
          ...prev,
          sellingPrice: selling,
          profit: profit,
        }),
      )
    }

    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-3xl font-bold">Formula Calculator</h2>
          <div className="flex items-center gap-4">
            <Button variant="outline" size="sm">
              <Calculator className="h-4 w-4 mr-2" />
              Save Calculations
            </Button>
            <Button variant="outline" size="sm">
              Print Results
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Dosage Calculator</CardTitle>
              <CardDescription>Calculate patient-specific dosages based on weight</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Patient Weight (kg)</Label>
                  <Input
                    type="number"
                    value={formulaCalculations.patientWeight}
                    onChange={(e: ChangeEvent<HTMLInputElement>) =>
                      setFormulaCalculations((prev: FormulaCalculations) => ({ ...prev, patientWeight: e.target.value }))
                    }
                    placeholder="70"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Dose per kg (mg/kg)</Label>
                  <Input
                    type="number"
                    value={formulaCalculations.dosePerKg}
                    onChange={(e: ChangeEvent<HTMLInputElement>) =>
                      setFormulaCalculations((prev: FormulaCalculations) => ({ ...prev, dosePerKg: e.target.value }))
                    }
                    placeholder="5"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Frequency (times/day)</Label>
                  <Select
                    value={formulaCalculations.frequency}
                    onValueChange={(value: string) =>
                      setFormulaCalculations((prev: FormulaCalculations) => ({ ...prev, frequency: value }))
                    }
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1">Once daily</SelectItem>
                      <SelectItem value="2">Twice daily</SelectItem>
                      <SelectItem value="3">Three times daily</SelectItem>
                      <SelectItem value="4">Four times daily</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Calculated Dose</Label>
                  <div className="p-3 bg-blue-50 rounded-md">
                    <span className="text-lg font-semibold text-blue-800">
                      {formulaCalculations.calculatedDose.toFixed(2)} mg/day
                    </span>
                  </div>
                </div>
              </div>
              <Button onClick={calculateDosage} className="w-full bg-red-800 hover:bg-red-900">
                Calculate Dosage
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Day Supply Calculator</CardTitle>
              <CardDescription>Calculate how many days a prescription will last</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Total Quantity</Label>
                  <Input
                    type="number"
                    value={formulaCalculations.quantity}
                    onChange={(e: ChangeEvent<HTMLInputElement>) =>
                      setFormulaCalculations((prev: FormulaCalculations) => ({ ...prev, quantity: e.target.value }))
                    }
                    placeholder="30"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Daily Dose</Label>
                  <Input
                    type="number"
                    value={formulaCalculations.dailyDose}
                    onChange={(e: ChangeEvent<HTMLInputElement>) =>
                      setFormulaCalculations((prev: FormulaCalculations) => ({ ...prev, dailyDose: e.target.value }))
                    }
                    placeholder="1"
                  />
                </div>
                <div className="space-y-2 col-span-2">
                  <Label>Day Supply</Label>
                  <div className="p-3 bg-green-50 rounded-md">
                    <span className="text-lg font-semibold text-green-800">
                      {formulaCalculations.daySupply.toFixed(0)} days
                    </span>
                  </div>
                </div>
              </div>
              <Button onClick={calculateDaySupply} className="w-full bg-red-800 hover:bg-red-900">
                Calculate Day Supply
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  const renderDashboard = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold bg-gradient-to-r from-red-800 to-red-600 bg-clip-text text-transparent">Dashboard</h2>
          <p className="text-gray-600 mt-1">Welcome back, {userProfile.name}</p>
        </div>
        <div className="flex items-center gap-4">
          <Button variant="outline" size="sm" className="border-red-300 text-red-700 hover:bg-red-50">
            <Calendar className="h-4 w-4 mr-2" />
            Today
          </Button>
          <Button className="bg-red-800 hover:bg-red-900 text-white">
            <DownloadIcon className="h-4 w-4 mr-2" />
            Export
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statusCards.map((card, index) => {
          const IconComponent = card.icon
          const cardColors = [
            "bg-gradient-to-br from-blue-500 to-blue-600",
            "bg-gradient-to-br from-green-500 to-green-600", 
            "bg-gradient-to-br from-orange-500 to-orange-600",
            "bg-gradient-to-br from-purple-500 to-purple-600"
          ]
          return (
            <Card 
              key={index} 
              className={`${card.title === "Missing Info Alert" ? "cursor-pointer hover:shadow-xl transition-all duration-300 transform hover:scale-105" : "hover:shadow-lg transition-all duration-300"} overflow-hidden`}
              onClick={() => {
                if (card.title === "Missing Info Alert") {
                  setShowMissingInfoModal(true)
                }
              }}
            >
              <div className={`h-2 ${cardColors[index % cardColors.length]}`}></div>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-gray-800">{card.title}</CardTitle>
                <div className={`p-2 rounded-lg ${cardColors[index % cardColors.length]} bg-opacity-10`}>
                  <IconComponent className={`h-4 w-4 ${cardColors[index % cardColors.length].includes('blue') ? 'text-blue-600' : cardColors[index % cardColors.length].includes('green') ? 'text-green-600' : cardColors[index % cardColors.length].includes('orange') ? 'text-orange-600' : 'text-purple-600'}`} />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-gray-800">{card.value}</div>
                <Badge className={`mt-2 ${getStatusColor(card.status)}`}>{card.status}</Badge>
                
                {/* Add New and In Progress links for Patient Rx and Office Order */}
                {(card.title === "Patient Rx" || card.title === "Office Order") && (
                  <div className="mt-4 pt-3 border-t border-gray-100">
                    <div className="flex gap-2 text-xs">
                      <button 
                        className="text-blue-600 hover:text-blue-800 font-medium hover:underline"
                        onClick={(e) => {
                          e.stopPropagation()
                          // Handle New link click
                          if (card.title === "Patient Rx") {
                            setShowNewRxModal(true)
                            setNewRxStep(1)
                            setNewRxData({
                              patientSearch: "",
                              selectedPatient: null,
                              isNewPatient: false,
                              rxDetails: {
                                medication: "",
                                strength: "",
                                quantity: "",
                                directions: "",
                                refills: "",
                                prescriber: "",
                                daw: false,
                                priority: "routine",
                                notes: ""
                              },
                              billShipPreference: "",
                              existingPatientOption: ""
                            })
                          } else {
                            console.log(`${card.title} - New clicked`)
                          }
                        }}
                      >
                        New
                      </button>
                      <span className="text-gray-300">|</span>
                      <button 
                        className="text-orange-600 hover:text-orange-800 font-medium hover:underline"
                        onClick={(e) => {
                          e.stopPropagation()
                          // Handle In Progress link click
                          if (card.title === "Patient Rx") {
                            setShowInProgressRx(true)
                            setSelectedPrescriber("all")
                            setSelectedStatus("all")
                            setInProgressDate("today")
                          } else {
                            console.log(`${card.title} - In Progress clicked`)
                          }
                        }}
                      >
                        In Progress
                      </button>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          )
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="overflow-hidden border-l-4 border-l-blue-500">
          <CardHeader className="bg-gradient-to-r from-blue-50 to-blue-100">
            <CardTitle className="text-blue-800">Recent Activity</CardTitle>
            <CardDescription className="text-blue-600">Latest prescription and order updates</CardDescription>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="space-y-4">
              {[
                { time: "2 min ago", action: "New prescription received", patient: "John Smith", color: "bg-green-500" },
                { time: "15 min ago", action: "Order ready for pickup", patient: "Sarah Johnson", color: "bg-blue-500" },
                { time: "1 hour ago", action: "Inventory alert", patient: "Low stock: Metformin", color: "bg-orange-500" },
                { time: "2 hours ago", action: "Payment processed", patient: "Mike Davis", color: "bg-purple-500" },
              ].map((activity, index) => (
                <div key={index} className="flex items-center space-x-4 p-3 rounded-lg hover:bg-gray-50 transition-colors">
                  <div className={`w-3 h-3 ${activity.color} rounded-full shadow-sm`}></div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-800">{activity.action}</p>
                    <p className="text-xs text-gray-600">{activity.patient}</p>
                  </div>
                  <span className="text-xs text-gray-500 font-medium">{activity.time}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="overflow-hidden border-l-4 border-l-green-500">
          <CardHeader className="bg-gradient-to-r from-green-50 to-green-100">
            <CardTitle className="text-green-800">Inventory Status</CardTitle>
            <CardDescription className="text-green-600">Current stock levels and alerts</CardDescription>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="space-y-4">
              {inventoryItems.map((item, index) => (
                <div key={index} className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 transition-colors">
                  <div>
                    <p className="text-sm font-medium text-gray-800">{item.name}</p>
                    <p className="text-xs text-gray-600">Expires: {item.expiry}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium text-gray-800">{item.stock} units</p>
                    <Badge className={`${getStockColor(item.status)} shadow-sm`}>{item.status}</Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )

  const renderOperations = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold">Operations</h2>
        <div className="flex items-center gap-4">
          <Button variant="outline" size="sm">
            <Package className="h-4 w-4 mr-2" />
            New Order
          </Button>
          <Button variant="outline" size="sm">
            Export
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Order Processing</CardTitle>
            <CardDescription>Current order status</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between">
                <span>Pending Orders</span>
                <Badge className="bg-yellow-100 text-yellow-800">12</Badge>
              </div>
              <div className="flex justify-between">
                <span>In Progress</span>
                <Badge className="bg-blue-100 text-blue-800">8</Badge>
              </div>
              <div className="flex justify-between">
                <span>Ready for Pickup</span>
                <Badge className="bg-green-100 text-green-800">15</Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Inventory Alerts</CardTitle>
            <CardDescription>Items requiring attention</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm">Low Stock Items</span>
                <Badge className="bg-orange-100 text-orange-800">5</Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Expired Items</span>
                <Badge className="bg-red-100 text-red-800">2</Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Expiring Soon</span>
                <Badge className="bg-yellow-100 text-yellow-800">8</Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Daily Summary</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-sm">Orders Processed</span>
                <span className="font-semibold">47</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm">Revenue</span>
                <span className="font-semibold">$12,450</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm">Avg Processing Time</span>
                <span className="font-semibold">2.3 hrs</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )

  const renderPrescriptions = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold">Prescriptions</h2>
        <div className="flex items-center gap-4">
          <Button variant="outline" size="sm" onClick={() => setShowNewEScript(true)}>
            <Pill className="h-4 w-4 mr-2" />
            DCA Script
          </Button>
          <Button variant="outline" size="sm" onClick={() => window.open("https://surescripts.com/", "_blank")}>
            SureScripts
          </Button>
          <Button variant="outline" size="sm">
            Import
          </Button>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Filter Prescriptions</CardTitle>
          <CardDescription>Search and filter prescription records</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4">
            <div className="space-y-2">
              <Label>Status</Label>
              <Select
                value={prescriptionFilters.status}
                onValueChange={(value: string) =>
                  setPrescriptionFilters((prev: PrescriptionFilters) => ({ ...prev, status: value }))
                }
              >
                <SelectTrigger>
                  <SelectValue
                    placeholder={prescriptionFilters.status === "all" ? "All Status" : prescriptionFilters.status}
                  />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="processing">Processing</SelectItem>
                  <SelectItem value="ready">Ready</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Search</Label>
              <Input
                placeholder="Patient name or Rx#"
                value={prescriptionFilters.search || ""}
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  setPrescriptionFilters((prev: PrescriptionFilters) => ({ ...prev, search: e.target.value }))
                }
              />
            </div>
            <div className="space-y-2">
              <Label>Prescriber</Label>
              <Input
                placeholder="Doctor name"
                value={prescriptionFilters.prescriber || ""}
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  setPrescriptionFilters((prev: PrescriptionFilters) => ({
                    ...prev,
                    prescriber: e.target.value,
                  }))
                }
              />
            </div>
            <div className="space-y-2">
              <Label>Date From</Label>
              <Input
                type="date"
                value={prescriptionFilters.dateFrom || ""}
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  setPrescriptionFilters((prev: PrescriptionFilters) => ({ ...prev, dateFrom: e.target.value }))
                }
              />
            </div>
            <div className="space-y-2">
              <Label>Date To</Label>
              <Input
                type="date"
                value={prescriptionFilters.dateTo || ""}
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  setPrescriptionFilters((prev: PrescriptionFilters) => ({ ...prev, dateTo: e.target.value }))
                }
              />
            </div>
            <div className="space-y-2">
              <Label>&nbsp;</Label>
              <Button className="w-full bg-red-800 hover:bg-red-900">Search</Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Recent Prescriptions</CardTitle>
          <CardDescription>Latest prescription activity</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[
              {
                rx: "RX001234",
                patient: "John Smith",
                medication: "Testosterone 200mg/ml",
                prescriber: "Dr. Johnson",
                date: "12/18/2024",
                status: "Ready",
                strength: "200mg/ml",
                quantity: "10ml vial",
                directions: "Inject 0.5ml intramuscularly once weekly",
                refills: "5",
                daw: false,
                priority: "Routine",
                notes: "Patient prefers morning injections",
              },
              {
                rx: "RX001235",
                patient: "Sarah Wilson",
                medication: "Estradiol Cream 0.1%",
                prescriber: "Dr. Brown",
                date: "12/18/2024",
                status: "Processing",
                strength: "0.1%",
                quantity: "30g tube",
                directions: "Apply thin layer to affected area twice daily",
                refills: "3",
                daw: true,
                priority: "Routine",
                notes: "Patient has sensitive skin",
              },
              {
                rx: "RX001236",
                patient: "Mike Davis",
                medication: "Thyroid T3/T4 Compound",
                prescriber: "Dr. Smith",
                date: "12/17/2024",
                status: "Completed",
                strength: "T3 25mcg/T4 100mcg",
                quantity: "90 capsules",
                directions: "Take 1 capsule by mouth once daily on empty stomach",
                refills: "2",
                daw: false,
                priority: "Urgent",
                notes: "Take 1 hour before breakfast",
              },
              {
                rx: "RX001237",
                patient: "Lisa Johnson",
                medication: "Pain Relief Gel",
                prescriber: "Dr. Wilson",
                date: "12/17/2024",
                status: "Pending",
                strength: "Custom compound",
                quantity: "60g tube",
                directions: "Apply to affected area 3-4 times daily as needed",
                refills: "1",
                daw: false,
                priority: "Routine",
                notes: "For chronic knee pain",
              },
            ].map((prescription, index) => (
              <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="grid grid-cols-4 gap-4 flex-1">
                  <div>
                    <p className="font-medium">{prescription.rx}</p>
                    <p className="text-sm text-gray-500">{prescription.patient}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium">{prescription.medication}</p>
                    <p className="text-xs text-gray-400">{prescription.prescriber}</p>
                  </div>
                  <div>
                    <p className="text-sm">{prescription.date}</p>
                  </div>
                  <div>
                    <Badge className={getStatusColor(prescription.status)}>{prescription.status}</Badge>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleShowPrescriptionDetails(prescription as Prescription)}
                  >
                    View Details
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleShowPrescriptionPatients(prescription as Prescription)}
                  >
                    Patients
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Prescription Details Modal */}
      {showPrescriptionDetails && selectedPrescription && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <Card className="w-full max-w-full sm:max-w-4xl mx-4 max-h-[90vh] overflow-y-auto">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Prescription Details - {selectedPrescription.rx}</CardTitle>
                  <CardDescription>Complete prescription information</CardDescription>
                </div>
                <Button variant="ghost" size="sm" onClick={() => setShowPrescriptionDetails(false)}>
                  ✕
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Patient Information */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Patient Information</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div>
                      <Label className="font-medium">Patient Name</Label>
                      <p className="text-sm">{selectedPrescription.patient}</p>
                    </div>
                    <div>
                      <Label className="font-medium">Prescription Number</Label>
                      <p className="text-sm">{selectedPrescription.rx}</p>
                    </div>
                    <div>
                      <Label className="font-medium">Date Prescribed</Label>
                      <p className="text-sm">{selectedPrescription.date}</p>
                    </div>
                    <div>
                      <Label className="font-medium">Status</Label>
                      <Badge className={getStatusColor(selectedPrescription.status)}>
                        {selectedPrescription.status}
                      </Badge>
                    </div>
                  </CardContent>
                </Card>

                {/* Prescriber Information */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Prescriber Information</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div>
                      <Label className="font-medium">Prescriber</Label>
                      <p className="text-sm">{selectedPrescription.prescriber}</p>
                    </div>
                    <div>
                      <Label className="font-medium">Priority</Label>
                      <p className="text-sm">{selectedPrescription.priority}</p>
                    </div>
                    <div>
                      <Label className="font-medium">DAW (Dispense as Written)</Label>
                      <p className="text-sm">{selectedPrescription.daw ? "Yes" : "No"}</p>
                    </div>
                  </CardContent>
                </Card>

                {/* Medication Details */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Medication Details</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div>
                      <Label className="font-medium">Medication</Label>
                      <p className="text-sm">{selectedPrescription.medication}</p>
                    </div>
                    <div>
                      <Label className="font-medium">Strength</Label>
                      <p className="text-sm">{selectedPrescription.strength}</p>
                    </div>
                    <div>
                      <Label className="font-medium">Quantity</Label>
                      <p className="text-sm">{selectedPrescription.quantity}</p>
                    </div>
                    <div>
                      <Label className="font-medium">Refills Remaining</Label>
                      <p className="text-sm">{selectedPrescription.refills}</p>
                    </div>
                  </CardContent>
                </Card>

                {/* Directions & Notes */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Directions & Notes</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div>
                      <Label className="font-medium">Directions for Use</Label>
                      <p className="text-sm">{selectedPrescription.directions}</p>
                    </div>
                    <div>
                      <Label className="font-medium">Special Notes</Label>
                      <p className="text-sm">{selectedPrescription.notes}</p>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Action Buttons */}
              <div className="flex justify-end gap-4 pt-4 border-t">
                <Button variant="outline">Print Prescription</Button>
                <Button variant="outline">Edit Prescription</Button>
                <Button className="bg-red-800 hover:bg-red-900">Process Order</Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Prescription Patients Modal */}
      {showPrescriptionPatients && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <Card className="w-full max-w-full sm:max-w-4xl mx-4 max-h-[90vh] overflow-y-auto">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Patients Prescribed This Medication</CardTitle>
                  <CardDescription>
                    Patients who have been prescribed {selectedPrescription?.medication}
                  </CardDescription>
                </div>
                <Button variant="ghost" size="sm" onClick={() => setShowPrescriptionPatients(false)}>
                  ✕
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {prescriptionPatients.map((patient, index) => (
                  <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="grid grid-cols-5 gap-4 flex-1">
                      <div>
                        <p className="font-medium">{patient.name}</p>
                        <p className="text-sm text-gray-500">{patient.email}</p>
                      </div>
                      <div>
                        <p className="text-sm">{patient.phone}</p>
                      </div>
                      <div>
                        <p className="text-sm">Prescribed: {patient.prescribedDate}</p>
                      </div>
                      <div>
                        <p className="text-sm">{patient.dosage}</p>
                        <p className="text-xs text-gray-400">{patient.frequency}</p>
                      </div>
                      <div>
                        <Badge
                          className={
                            patient.status === "Active" ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"
                          }
                        >
                          {patient.status}
                        </Badge>
                      </div>
                    </div>
                    <Button variant="outline" size="sm">
                      View Patient
                    </Button>
                  </div>
                ))}
              </div>

              <div className="flex justify-end gap-4 mt-6 pt-4 border-t">
                <Button variant="outline">Export List</Button>
                <Button className="bg-red-800 hover:bg-red-900" onClick={() => setShowAddPatientToPrescription(true)}>
                  Add New Patient
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Add Patient to Prescription Modal */}
      {showAddPatientToPrescription && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <Card className="w-full max-w-2xl mx-4 max-h-[90vh] overflow-y-auto">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Add Patient to Prescription</CardTitle>
                  <CardDescription>
                    Search and select a patient to add to {selectedPrescription?.medication}
                  </CardDescription>
                </div>
                <Button variant="ghost" size="sm" onClick={() => setShowAddPatientToPrescription(false)}>
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Search Patients</Label>
                <Input
                  placeholder="Search by name, email, or phone..."
                  value={patientSearchQuery}
                  onChange={(e: ChangeEvent<HTMLInputElement>) => setPatientSearchQuery(e.target.value)}
                  className="w-full"
                />
              </div>

              {filteredPatients.length > 0 && (
                <div className="space-y-2 max-h-60 overflow-y-auto border rounded-md p-2">
                  {filteredPatients.map((patient) => (
                    <div
                      key={patient.id}
                      className="flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50 cursor-pointer"
                      onClick={() => handleAddPatientToPrescription(patient)}
                    >
                      <div>
                        <p className="font-medium">{patient.name}</p>
                        <p className="text-sm text-gray-500">{patient.email}</p>
                        <p className="text-sm text-gray-500">{patient.phone}</p>
                      </div>
                      <div className="text-right">
                        <Badge
                          className={
                            patient.status === "Active" ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"
                          }
                        >
                          {patient.status}
                        </Badge>
                        <p className="text-xs text-gray-400 mt-1">Last visit: {patient.lastVisit}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {patientSearchQuery && filteredPatients.length === 0 && (
                <div className="text-center py-8 text-gray-500">
                  <p>No patients found matching "{patientSearchQuery}"</p>
                  <Button variant="outline" className="mt-2" onClick={() => setShowNewPatient(true)}>
                    <Plus className="h-4 w-4 mr-2" />
                    Create New Patient
                  </Button>
                </div>
              )}

              {!patientSearchQuery && (
                <div className="text-center py-8 text-gray-500">
                  <p>Start typing to search for patients</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )

  const renderPatients = () => {
    const patients = allPatients

    const handlePatientSelect = (patientId: number, isSelected: boolean) => {
      if (isSelected) {
        setSelectedPatients((prev: number[]) => [...prev, patientId])
      } else {
        setSelectedPatients((prev: number[]) => prev.filter((id) => id !== patientId))
      }
    }

    const handleSelectAllPatients = (isSelected: boolean) => {
      if (isSelected) {
        const allPatientIds = patients.map((patient) => patient.id)
        setSelectedPatients(allPatientIds)
      } else {
        setSelectedPatients([])
      }
    }

    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-3xl font-bold">Patients</h2>
          <div className="flex items-center gap-4">
            {selectedPatients.length > 0 && (
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowBulkMedication(true)}
                className="bg-blue-50 text-blue-700 border-blue-200"
              >
                <Pill className="h-4 w-4 mr-2" />
                Assign Medication ({selectedPatients.length})
              </Button>
            )}
            <Button variant="outline" size="sm" onClick={() => setShowNewPatient(true)}>
              <Users className="h-4 w-4 mr-2" />
              Add Patient
            </Button>
            <Button variant="outline" size="sm">
              Import Patients
            </Button>
          </div>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Patient Search</CardTitle>
            <CardDescription>Find and manage patient records</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex gap-4">
              <div className="flex-1">
                <Input placeholder="Search by name, email, or phone..." className="w-full" />
              </div>
              <Button className="bg-red-800 hover:bg-red-900">
                <Search className="h-4 w-4 mr-2" />
                Search
              </Button>
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Patient Statistics</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between">
                  <span>Total Patients</span>
                  <span className="font-semibold">{patients.length}</span>
                </div>
                <div className="flex justify-between">
                  <span>Active This Month</span>
                  <span className="font-semibold">342</span>
                </div>
                <div className="flex justify-between">
                  <span>New This Week</span>
                  <span className="font-semibold">18</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="text-sm">
                  <p className="font-medium">John Smith</p>
                  <p className="text-gray-500">Updated profile - 2 min ago</p>
                </div>
                <div className="text-sm">
                  <p className="font-medium">Sarah Johnson</p>
                  <p className="text-gray-500">New prescription - 15 min ago</p>
                </div>
                <div className="text-sm">
                  <p className="font-medium">Mike Davis</p>
                  <p className="text-gray-500">Payment processed - 1 hour ago</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <Button variant="outline" className="w-full justify-start">
                  <Users className="h-4 w-4 mr-2" />
                  Bulk Import
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Search className="h-4 w-4 mr-2" />
                  Advanced Search
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Package className="h-4 w-4 mr-2" />
                  Export Data
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Bulk Actions Section */}
        {selectedPatients.length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle>Bulk Actions ({selectedPatients.length} patients selected)</CardTitle>
              <CardDescription>Perform actions on selected patients</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-3">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setShowBulkMedication(true)}
                  className="bg-blue-50 text-blue-700 border-blue-200"
                >
                  <Pill className="h-4 w-4 mr-2" />
                  Add Prescription
                </Button>
                <Button variant="outline" size="sm">
                  <Users className="h-4 w-4 mr-2" />
                  Update Contact Info
                </Button>
                <Button variant="outline" size="sm">
                  <CreditCard className="h-4 w-4 mr-2" />
                  Update Payment Method
                </Button>
                <Button variant="outline" size="sm">
                  <Package className="h-4 w-4 mr-2" />
                  Export Selected
                </Button>
                <Button variant="outline" size="sm">
                  <AlertCircle className="h-4 w-4 mr-2" />
                  Send Notification
                </Button>
                <Button variant="outline" size="sm">
                  <Calendar className="h-4 w-4 mr-2" />
                  Schedule Appointment
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setSelectedPatients([])}
                  className="ml-auto text-gray-600"
                >
                  Clear Selection
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Patient List</CardTitle>
                <CardDescription>Recently added or updated patient records</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left p-3">
                      <div className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          id="selectAll"
                          checked={selectedPatients.length === patients.length && patients.length > 0}
                          onChange={(e: ChangeEvent<HTMLInputElement>) => handleSelectAllPatients(e.target.checked)}
                          className="rounded border-gray-300"
                        />
                        <span className="text-sm font-medium">Select All</span>
                      </div>
                    </th>
                    <th className="text-left p-3 font-medium">Patient Name</th>
                    <th className="text-left p-3 font-medium">Phone</th>
                    <th className="text-left p-3 font-medium">Last Visit</th>
                    <th className="text-left p-3 font-medium">Status</th>
                    <th className="text-left p-3 font-medium">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {patients.map((patient, index) => (
                    <tr key={index} className="border-b hover:bg-gray-50">
                      <td className="p-3">
                        <input
                          type="checkbox"
                          id={`patient-${patient.id}`}
                          checked={selectedPatients.includes(patient.id)}
                          onChange={() => {
                            const isChecked = !selectedPatients.includes(patient.id)
                            handlePatientSelect(patient.id, isChecked)
                          }}
                          className="rounded border-gray-300"
                        />
                      </td>
                      <td className="p-3">
                        <div>
                          <p className="font-medium">{patient.name}</p>
                          <p className="text-sm text-gray-500">{patient.email}</p>
                        </div>
                      </td>
                      <td className="p-3">
                        <p className="text-sm">{patient.phone}</p>
                      </td>
                      <td className="p-3">
                        <p className="text-sm">{patient.lastVisit}</p>
                      </td>
                      <td className="p-3">
                        <Badge
                          className={
                            patient.status === "Active" ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"
                          }
                        >
                          {patient.status}
                        </Badge>
                      </td>
                      <td className="p-3">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => {
                            setSelectedPatientId(patient.id)
                            setShowPatientDetails(true)
                          }}
                        >
                          View Profile
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        {/* Bulk Medication Assignment Modal */}
        {showBulkMedication && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <Card className="w-full max-w-2xl mx-4">
              <CardHeader>
                <CardTitle>Assign Medication to Selected Patients</CardTitle>
                <CardDescription>Assigning medication to {selectedPatients.length} selected patient(s)</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Medication</Label>
                    <Input
                      placeholder="Enter medication name"
                      value={bulkMedicationData.medication}
                      onChange={(e: ChangeEvent<HTMLInputElement>) =>
                        setBulkMedicationData((prev: BulkMedicationData) => ({ ...prev, medication: e.target.value }))
                      }
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Dosage</Label>
                    <Input
                      placeholder="e.g., 10mg"
                      value={bulkMedicationData.dosage}
                      onChange={(e: ChangeEvent<HTMLInputElement>) =>
                        setBulkMedicationData((prev: BulkMedicationData) => ({ ...prev, dosage: e.target.value }))
                      }
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Frequency</Label>
                    <Select
                      value={bulkMedicationData.frequency}
                      onValueChange={(value: string) =>
                        setBulkMedicationData((prev: BulkMedicationData) => ({ ...prev, frequency: value }))
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select frequency" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="once-daily">Once Daily</SelectItem>
                        <SelectItem value="twice-daily">Twice Daily</SelectItem>
                        <SelectItem value="three-times-daily">Three Times Daily</SelectItem>
                        <SelectItem value="four-times-daily">Four Times Daily</SelectItem>
                        <SelectItem value="as-needed">As Needed</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>Duration</Label>
                    <Input
                      placeholder="e.g., 30 days"
                      value={bulkMedicationData.duration}
                      onChange={(e: ChangeEvent<HTMLInputElement>) =>
                        setBulkMedicationData((prev: BulkMedicationData) => ({ ...prev, duration: e.target.value }))
                      }
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Prescriber</Label>
                    <Input
                      placeholder="Doctor name"
                      value={bulkMedicationData.prescriber}
                      onChange={(e: ChangeEvent<HTMLInputElement>) =>
                        setBulkMedicationData((prev: BulkMedicationData) => ({ ...prev, prescriber: e.target.value }))
                      }
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>Instructions</Label>
                  <textarea
                    placeholder="Special instructions for patients..."
                    value={bulkMedicationData.instructions}
                    onChange={(e: ChangeEvent<HTMLTextAreaElement>) =>
                      setBulkMedicationData((prev: BulkMedicationData) => ({ ...prev, instructions: e.target.value }))
                    }
                    className="w-full min-h-[80px] p-3 border border-gray-300 rounded-md resize-vertical"
                  />
                </div>
              </CardContent>
              <div className="flex justify-end gap-4 p-6 border-t">
                <Button variant="outline" onClick={() => setShowBulkMedication(false)}>
                  Cancel
                </Button>
                <Button
                  className="bg-red-800 hover:bg-red-900"
                  onClick={() => {
                    // Handle bulk medication assignment
                    console.log("Assigning medication to patients:", selectedPatients, bulkMedicationData)
                    setShowBulkMedication(false)
                    setSelectedPatients([])
                    setBulkMedicationData({
                      medication: "",
                      dosage: "",
                      frequency: "",
                      duration: "",
                      instructions: "",
                      prescriber: "",
                    })
                  }}
                >
                  Assign Medication
                </Button>
              </div>
            </Card>
          </div>
        )}

        {/* Patient Details Modal */}
        {showPatientDetails && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <Card className="w-full max-w-full sm:max-w-6xl mx-4 max-h-[90vh] overflow-y-auto">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Patient Profile</CardTitle>
                    <CardDescription>Complete patient information and history</CardDescription>
                  </div>
                  <Button variant="ghost" size="sm" onClick={() => setShowPatientDetails(false)}>
                    ✕
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Tab Navigation and Content - Side by Side */}
                <div className="flex gap-6">
                  {/* Left Sidebar with Tabs */}
                  <div className="w-48 space-y-2">
                    <button
                      onClick={() => setActivePatientTab("contact")}
                      className={`w-full text-left px-4 py-3 rounded-lg font-medium transition-colors ${
                        activePatientTab === "contact"
                          ? "bg-red-800 text-white"
                          : "bg-white text-gray-700 hover:bg-gray-50 border"
                      }`}
                    >
                      Contact Info
                    </button>
                    <button
                      onClick={() => setActivePatientTab("medical")}
                      className={`w-full text-left px-4 py-3 rounded-lg font-medium transition-colors ${
                        activePatientTab === "medical"
                          ? "bg-red-800 text-white"
                          : "bg-white text-gray-700 hover:bg-gray-50 border"
                      }`}
                    >
                      Medical History
                    </button>
                    <button
                      onClick={() => setActivePatientTab("prescriptions")}
                      className={`w-full text-left px-4 py-3 rounded-lg font-medium transition-colors ${
                        activePatientTab === "prescriptions"
                          ? "bg-red-800 text-white"
                          : "bg-white text-gray-700 hover:bg-gray-50 border"
                      }`}
                    >
                      Prescriptions
                    </button>
                    <button
                      onClick={() => setActivePatientTab("billing")}
                      className={`w-full text-left px-4 py-3 rounded-lg font-medium transition-colors ${
                        activePatientTab === "billing"
                          ? "bg-red-800 text-white"
                          : "bg-white text-gray-700 hover:bg-gray-50 border"
                      }`}
                    >
                      Billing
                    </button>
                  </div>

                  {/* Main Content Area */}
                  <div className="flex-1">
                    {/* Tab Content */}
                    {activePatientTab === "contact" && (
                      <ContactForm />
                    )}

                    {activePatientTab === "medical" && (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <Card>
                          <CardHeader>
                            <CardTitle className="text-lg">Medical History</CardTitle>
                          </CardHeader>
                          <CardContent className="space-y-3">
                            <div>
                              <Label className="font-medium">Allergies</Label>
                              <p className="text-sm">Penicillin, Shellfish</p>
                            </div>
                            <div>
                              <Label className="font-medium">Medical Conditions</Label>
                              <p className="text-sm">Hypertension, Diabetes</p>
                            </div>
                            <div>
                              <Label className="font-medium">Current Medications</Label>
                              <p className="text-sm">Lisinopril, Metformin</p>
                            </div>
                          </CardContent>
                        </Card>

                        <Card>
                          <CardHeader>
                            <CardTitle className="text-lg">Other Information</CardTitle>
                          </CardHeader>
                          <CardContent className="space-y-3">
                            <div>
                              <Label className="font-medium">Insurance Provider</Label>
                              <p className="text-sm">Blue Cross Blue Shield</p>
                            </div>
                            <div>
                              <Label className="font-medium">Policy Number</Label>
                              <p className="text-sm">1234567890</p>
                            </div>
                            <div>
                              <Label className="font-medium">Preferred Pharmacy</Label>
                              <p className="text-sm">Main Street Pharmacy</p>
                            </div>
                          </CardContent>
                        </Card>
                      </div>
                    )}

                    {activePatientTab === "prescriptions" && (
                      <Card>
                        <CardHeader>
                          <CardTitle className="text-lg">Prescription History</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-3">
                          {[
                            {
                              rx: "RX001234",
                              medication: "Testosterone 200mg/ml",
                              prescriber: "Dr. Johnson",
                              date: "12/18/2024",
                              status: "Ready",
                            },
                            {
                              rx: "RX001235",
                              medication: "Estradiol Cream 0.1%",
                              prescriber: "Dr. Brown",
                              date: "12/18/2024",
                              status: "Processing",
                            },
                            {
                              rx: "RX001236",
                              medication: "Thyroid T3/T4 Compound",
                              prescriber: "Dr. Smith",
                              date: "12/17/2024",
                              status: "Completed",
                            },
                          ].map((prescription, index) => (
                            <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                              <div className="grid grid-cols-3 gap-4 flex-1">
                                <div>
                                  <p className="font-medium">{prescription.rx}</p>
                                </div>
                                <div>
                                  <p className="text-sm font-medium">{prescription.medication}</p>
                                  <p className="text-xs text-gray-400">{prescription.prescriber}</p>
                                </div>
                                <div>
                                  <p className="text-sm">{prescription.date}</p>
                                </div>
                              </div>
                              <Badge className={getStatusColor(prescription.status)}>{prescription.status}</Badge>
                            </div>
                          ))}
                        </CardContent>
                      </Card>
                    )}

                    {activePatientTab === "billing" && (
                      <Card>
                        <CardHeader>
                          <CardTitle className="text-lg">Billing Information</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-3">
                          <div>
                            <Label className="font-medium">Outstanding Balance</Label>
                            <p className="text-sm">$50.00</p>
                          </div>
                          <div>
                            <Label className="font-medium">Last Payment Date</Label>
                            <p className="text-sm">12/01/2024</p>
                          </div>
                          <div>
                            <Label className="font-medium">Payment Method</Label>
                            <p className="text-sm">Credit Card</p>
                          </div>
                        </CardContent>
                      </Card>
                    )}
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex justify-end gap-4 pt-4 border-t">
                  <Button variant="outline">Edit Patient</Button>
                  <Button className="bg-red-800 hover:bg-red-900">Save Changes</Button>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    )
  }

  const renderAccount = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold">Account</h2>
        <div className="flex items-center gap-4">
          <Button variant="outline" size="sm">
            <CreditCard className="h-4 w-4 mr-2" />
            Update Payment
          </Button>
          <Button variant="outline" size="sm">
            Export
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Billing Information</CardTitle>
            <CardDescription>Manage your billing details and subscription</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between">
                <span>Current Plan</span>
                <span className="font-semibold">Premium</span>
              </div>
              <div className="flex justify-between">
                <span>Next Payment</span>
                <span className="font-semibold">01/15/2025</span>
              </div>
              <div className="flex justify-between">
                <span>Amount Due</span>
                <span className="font-semibold">$99.99</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Profile Settings</CardTitle>
            <CardDescription>Update your profile information</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between">
                <span>Name</span>
                <span className="font-semibold">Amanda Rodriguez</span>
              </div>
              <div className="flex justify-between">
                <span>Email</span>
                <span className="font-semibold">amanda.rodriguez@email.com</span>
              </div>
              <div className="flex justify-between">
                <span>Password</span>
                <span className="font-semibold">********</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )

  const renderAR = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold">A/R</h2>
        <div className="flex items-center gap-4">
          <Button variant="outline" size="sm">
            Export
          </Button>
        </div>
      </div>

      {/* Tab Navigation at the top */}
      <div className="flex gap-2 border-b">
        <button
          onClick={() => setActiveARTab("search")}
          className={`px-6 py-3 font-medium transition-colors ${
            activeARTab === "search"
              ? "bg-red-800 text-white rounded-t-lg"
              : "text-gray-700 hover:text-gray-900 hover:bg-gray-50"
          }`}
        >
          <Search className="h-4 w-4 inline mr-2" />
          Search
        </button>
        <button
          onClick={() => setActiveARTab("statements")}
          className={`px-6 py-3 font-medium transition-colors ${
            activeARTab === "statements"
              ? "bg-red-800 text-white rounded-t-lg"
              : "text-gray-700 hover:text-gray-900 hover:bg-gray-50"
          }`}
        >
          <Package className="h-4 w-4 inline mr-2" />
          Statements
        </button>
        <button
          onClick={() => setActiveARTab("transactions")}
          className={`px-6 py-3 font-medium transition-colors ${
            activeARTab === "transactions"
              ? "bg-red-800 text-white rounded-t-lg"
              : "text-gray-700 hover:text-gray-900 hover:bg-gray-50"
          }`}
        >
          <CreditCard className="h-4 w-4 inline mr-2" />
          Transactions
        </button>
      </div>

      {/* Main Content Area */}
      <div>
        {activeARTab === "search" && (
          <Card>
            <CardHeader>
              <CardTitle>Quick Search</CardTitle>
              <CardDescription>Find patient accounts quickly</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex gap-4">
                <div className="flex-1">
                  <Input
                    placeholder="Search by name, email, or phone..."
                    className="w-full"
                    value={arSearchQuery}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => setArSearchQuery(e.target.value)}
                  />
                </div>
                <Button className="bg-red-800 hover:bg-red-900">
                  <Search className="h-4 w-4 mr-2" />
                  Search
                </Button>
              </div>
              <div className="mt-4">
                <h3 className="text-lg font-medium">Recent Searches</h3>
                <div className="flex flex-wrap gap-2 mt-2">
                  {recentSearches.map((search, index) => (
                    <Badge key={index} variant="secondary" className="cursor-pointer hover:bg-gray-200">
                      {search}
                    </Badge>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {activeARTab === "statements" && (
          <Card>
            <CardHeader>
              <CardTitle>Patient Statements</CardTitle>
              <CardDescription>Generate and manage patient billing statements</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label>Statement Date</Label>
                    <Input type="date" />
                  </div>
                  <div className="space-y-2">
                    <Label>Patient</Label>
                    <Input placeholder="Search patient..." />
                  </div>
                  <div className="space-y-2">
                    <Label>Status</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="All statuses" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Statuses</SelectItem>
                        <SelectItem value="pending">Pending</SelectItem>
                        <SelectItem value="sent">Sent</SelectItem>
                        <SelectItem value="paid">Paid</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <Button className="bg-red-800 hover:bg-red-900">Generate Statements</Button>
              </div>
            </CardContent>
          </Card>
        )}

        {activeARTab === "transactions" && (
          <Card>
            <CardHeader>
              <CardTitle>Transaction Search</CardTitle>
              <CardDescription>Search and filter transaction records</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  <div className="space-y-2">
                    <Label>Activity</Label>
                    <Select
                      value={transactionFilters.activity}
                      onValueChange={(value: string) =>
                        setTransactionFilters((prev: TransactionFilters) => ({ ...prev, activity: value }))
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="All Activities" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Activities</SelectItem>
                        <SelectItem value="payment">Payment</SelectItem>
                        <SelectItem value="charge">Charge</SelectItem>
                        <SelectItem value="adjustment">Adjustment</SelectItem>
                        <SelectItem value="refund">Refund</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>Date From</Label>
                    <Input
                      type="date"
                      value={transactionFilters.dateFrom}
                      onChange={(e: ChangeEvent<HTMLInputElement>) =>
                        setTransactionFilters((prev: TransactionFilters) => ({ ...prev, dateFrom: e.target.value }))
                      }
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Date To</Label>
                    <Input
                      type="date"
                      value={transactionFilters.dateTo}
                      onChange={(e: ChangeEvent<HTMLInputElement>) =>
                        setTransactionFilters((prev: TransactionFilters) => ({ ...prev, dateTo: e.target.value }))
                      }
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Patient</Label>
                    <Input
                      placeholder="Patient name"
                      value={transactionFilters.patient}
                      onChange={(e: ChangeEvent<HTMLInputElement>) =>
                        setTransactionFilters((prev: TransactionFilters) => ({ ...prev, patient: e.target.value }))
                      }
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Rx Number</Label>
                    <Input
                      placeholder="Prescription number"
                      value={transactionFilters.rxNumber}
                      onChange={(e: ChangeEvent<HTMLInputElement>) =>
                        setTransactionFilters((prev: TransactionFilters) => ({ ...prev, rxNumber: e.target.value }))
                      }
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Transaction Type</Label>
                    <Select
                      value={transactionFilters.transactionType}
                      onValueChange={(value: string) =>
                        setTransactionFilters((prev: TransactionFilters) => ({ ...prev, transactionType: value }))
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="All types" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Types</SelectItem>
                        <SelectItem value="credit">Credit</SelectItem>
                        <SelectItem value="debit">Debit</SelectItem>
                        <SelectItem value="ach">ACH</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>Payment Type</Label>
                    <Select
                      value={transactionFilters.paymentType}
                      onValueChange={(value: string) =>
                        setTransactionFilters((prev: TransactionFilters) => ({ ...prev, paymentType: value }))
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="All types" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Types</SelectItem>
                        <SelectItem value="visa">Visa</SelectItem>
                        <SelectItem value="mastercard">Mastercard</SelectItem>
                        <SelectItem value="amex">Amex</SelectItem>
                        <SelectItem value="ach">ACH</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>Payment Ref</Label>
                    <Input
                      placeholder="Reference number"
                      value={transactionFilters.paymentRef}
                      onChange={(e: ChangeEvent<HTMLInputElement>) =>
                        setTransactionFilters((prev: TransactionFilters) => ({ ...prev, paymentRef: e.target.value }))
                      }
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Amount</Label>
                    <Input
                      placeholder="Enter amount"
                      value={transactionFilters.amount}
                      onChange={(e: ChangeEvent<HTMLInputElement>) =>
                        setTransactionFilters((prev: TransactionFilters) => ({ ...prev, amount: e.target.value }))
                      }
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Origin</Label>
                    <Select
                      value={transactionFilters.transactionOrigin}
                      onValueChange={(value: string) =>
                        setTransactionFilters((prev: TransactionFilters) => ({ ...prev, transactionOrigin: value }))
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="All origins" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Origins</SelectItem>
                        <SelectItem value="online">Online</SelectItem>
                        <SelectItem value="in-store">In-Store</SelectItem>
                        <SelectItem value="phone">Phone</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>Origin Ref</Label>
                    <Input
                      placeholder="Origin reference"
                      value={transactionFilters.originReference}
                      onChange={(e: ChangeEvent<HTMLInputElement>) =>
                        setTransactionFilters((prev: TransactionFilters) => ({ ...prev, originReference: e.target.value }))
                      }
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Prescriber Group</Label>
                    <Select
                      value={transactionFilters.prescriberGroup}
                      onValueChange={(value: string) =>
                        setTransactionFilters((prev: TransactionFilters) => ({ ...prev, prescriberGroup: value }))
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="All groups" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Groups</SelectItem>
                        <SelectItem value="group1">Group 1</SelectItem>
                        <SelectItem value="group2">Group 2</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>Priority</Label>
                    <Select
                      value={transactionFilters.priority}
                      onValueChange={(value: string) =>
                        setTransactionFilters((prev: TransactionFilters) => ({ ...prev, priority: value }))
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="All priorities" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Priorities</SelectItem>
                        <SelectItem value="urgent">Urgent</SelectItem>
                        <SelectItem value="routine">Routine</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <Button className="w-full bg-red-800 hover:bg-red-900" onClick={handleTransactionSearch}>
                  Search
                </Button>
              </div>

              {showResults && (
                <div className="mt-6">
                  <h3 className="text-lg font-medium">Search Results</h3>
                  <div className="overflow-x-auto mt-2">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b">
                          <th className="text-left p-3 font-medium">Date</th>
                          <th className="text-left p-3 font-medium">Patient</th>
                          <th className="text-left p-3 font-medium">Type</th>
                          <th className="text-left p-3 font-medium">Amount</th>
                          <th className="text-left p-3 font-medium">Status</th>
                          <th className="text-left p-3 font-medium">Rx #</th>
                          <th className="text-left p-3 font-medium">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {transactionResults.map((transaction, index) => (
                          <tr key={index} className="border-b hover:bg-gray-50">
                            <td className="p-3">{transaction.date}</td>
                            <td className="p-3">{transaction.patient}</td>
                            <td className="p-3">{transaction.type}</td>
                            <td className="p-3">{transaction.amount}</td>
                            <td className="p-3">
                              <Badge
                                className={
                                  transaction.status === "Completed"
                                    ? "bg-green-100 text-green-800"
                                    : "bg-yellow-100 text-yellow-800"
                                }
                              >
                                {transaction.status}
                              </Badge>
                            </td>
                            <td className="p-3">{transaction.rxNumber}</td>
                            <td className="p-3">
                              <Button variant="outline" size="sm">
                                View Details
                              </Button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )

  const renderWorkflow = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold">Workflow</h2>
        <div className="flex items-center gap-4">
          <Button variant="outline" size="sm">
            <Workflow className="h-4 w-4 mr-2" />
            New Workflow
          </Button>
          <Button variant="outline" size="sm">
            Export
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>To Do</CardTitle>
            <CardDescription>Tasks to be completed</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="p-4 border rounded-lg">
              <h3 className="font-semibold">Review Prescription</h3>
              <p className="text-sm text-gray-500">Patient: John Smith</p>
              <p className="text-sm text-gray-500">Due: 12/20/2024</p>
            </div>
            <div className="p-4 border rounded-lg">
              <h3 className="font-semibold">Verify Insurance</h3>
              <p className="text-sm text-gray-500">Patient: Sarah Johnson</p>
              <p className="text-sm text-gray-500">Due: 12/21/2024</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>In Progress</CardTitle>
            <CardDescription>Tasks currently being worked on</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="p-4 border rounded-lg">
              <h3 className="font-semibold">Prepare Medication</h3>
              <p className="text-sm text-gray-500">Patient: Mike Davis</p>
              <p className="text-sm text-gray-500">Started: 12/19/2024</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Completed</CardTitle>
            <CardDescription>Tasks that have been finished</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="p-4 border rounded-lg">
              <h3 className="font-semibold">Dispense Medication</h3>
              <p className="text-sm text-gray-500">Patient: Lisa Wilson</p>
              <p className="text-sm text-gray-500">Completed: 12/18/2024</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )

  const renderScheduling = () => {
    // Helper function to generate time slots
    const generateTimeSlots = () => {
      const slots = []
      for (let i = 8; i <= 17; i++) {
        slots.push(`${i}:00`)
        if (i < 17) slots.push(`${i}:30`)
      }
      return slots
    }
    const timeSlots = generateTimeSlots()

    // Helper function to handle file input
    const handleFileUpload = (e: ChangeEvent<HTMLInputElement>, field: keyof NewPatientData) => {
      if (e.target.files && e.target.files.length > 0) {
        setNewPatientData((prev: NewPatientData) => ({ ...prev, [field]: e.target.files?.[0] || null }))
      }
    }

    // A simple multi-step form within the scheduling view
    const renderNewPatientForm = () => {
      // Form Steps
      const steps = [
        "Basic Info",
        "Address",
        "Contact Prefs",
        "Medical Info",
        "Account Settings",
        "Identification",
        "Financial Info",
        "Additional Info",
      ]

      return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          {showNewPatient && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
              <Card className="w-full max-w-4xl mx-4 max-h-[90vh] overflow-y-auto">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle>Schedule New Appointment</CardTitle>
                      <CardDescription>Step {currentStep} of 8 - Patient Information</CardDescription>
                    </div>
                    <Button variant="ghost" size="sm" onClick={() => setShowNewPatient(false)}>
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                  {/* Progress Bar */}
                  <div className="w-full bg-gray-200 rounded-full h-2.5 mt-4">
                    <div
                      className="bg-red-800 h-2.5 rounded-full"
                      style={{ width: `${(currentStep / steps.length) * 100}%` }}
                    ></div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-6">
                  {currentStep === 1 && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label>First Name</Label>
                        <Input
                          placeholder="First Name"
                          value={newPatientData.firstName}
                          onChange={(e: ChangeEvent<HTMLInputElement>) =>
                            setNewPatientData((prev: NewPatientData) => ({ ...prev, firstName: e.target.value }))
                          }
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>Last Name</Label>
                        <Input
                          placeholder="Last Name"
                          value={newPatientData.lastName}
                          onChange={(e: ChangeEvent<HTMLInputElement>) =>
                            setNewPatientData((prev: NewPatientData) => ({ ...prev, lastName: e.target.value }))
                          }
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>Email</Label>
                        <Input
                          type="email"
                          placeholder="Email"
                          value={newPatientData.email}
                          onChange={(e: ChangeEvent<HTMLInputElement>) =>
                            setNewPatientData((prev: NewPatientData) => ({ ...prev, email: e.target.value }))
                          }
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>Phone Number</Label>
                        <Input
                          type="tel"
                          placeholder="Phone Number"
                          value={newPatientData.phone}
                          onChange={(e: ChangeEvent<HTMLInputElement>) =>
                            setNewPatientData((prev: NewPatientData) => ({ ...prev, phone: e.target.value }))
                          }
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>Date of Birth</Label>
                        <Input
                          type="date"
                          value={newPatientData.dateOfBirth}
                          onChange={(e: ChangeEvent<HTMLInputElement>) =>
                            setNewPatientData((prev: NewPatientData) => ({ ...prev, dateOfBirth: e.target.value }))
                          }
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>Gender</Label>
                        <Select
                          value={newPatientData.gender}
                          onValueChange={(value: string) =>
                            setNewPatientData((prev: NewPatientData) => ({ ...prev, gender: value }))
                          }
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select gender" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="male">Male</SelectItem>
                            <SelectItem value="female">Female</SelectItem>
                            <SelectItem value="other">Other</SelectItem>
                            <SelectItem value="prefer-not-to-say">Prefer not to say</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  )}

                  {currentStep === 2 && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label>Address Line 1</Label>
                        <Input
                          placeholder="Address Line 1"
                          value={newPatientData.address1}
                          onChange={(e: ChangeEvent<HTMLInputElement>) =>
                            setNewPatientData((prev: NewPatientData) => ({ ...prev, address1: e.target.value }))
                          }
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>Address Line 2</Label>
                        <Input
                          placeholder="Address Line 2"
                          value={newPatientData.address2}
                          onChange={(e: ChangeEvent<HTMLInputElement>) =>
                            setNewPatientData((prev: NewPatientData) => ({ ...prev, address2: e.target.value }))
                          }
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>City</Label>
                        <Input
                          placeholder="City"
                          value={newPatientData.city}
                          onChange={(e: ChangeEvent<HTMLInputElement>) =>
                            setNewPatientData((prev: NewPatientData) => ({ ...prev, city: e.target.value }))
                          }
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>State</Label>
                        <Input
                          placeholder="State"
                          value={newPatientData.state}
                          onChange={(e: ChangeEvent<HTMLInputElement>) =>
                            setNewPatientData((prev: NewPatientData) => ({ ...prev, state: e.target.value }))
                          }
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>ZIP Code</Label>
                        <Input
                          placeholder="ZIP Code"
                          value={newPatientData.zip}
                          onChange={(e: ChangeEvent<HTMLInputElement>) =>
                            setNewPatientData((prev: NewPatientData) => ({ ...prev, zip: e.target.value }))
                          }
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>Country</Label>
                        <Select
                          value={newPatientData.country}
                          onValueChange={(value: string) =>
                            setNewPatientData((prev: NewPatientData) => ({ ...prev, country: value }))
                          }
                        >
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="USA">United States</SelectItem>
                            <SelectItem value="Canada">Canada</SelectItem>
                            <SelectItem value="Mexico">Mexico</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  )}

                  {currentStep === 3 && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label>Notification Preference</Label>
                        <Select
                          value={newPatientData.notificationPreference}
                          onValueChange={(value: string) =>
                            setNewPatientData((prev: NewPatientData) => ({ ...prev, notificationPreference: value }))
                          }
                        >
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="email">Email</SelectItem>
                            <SelectItem value="sms">SMS</SelectItem>
                            <SelectItem value="phone">Phone</SelectItem>
                            <SelectItem value="mail">Mail</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label>Emergency Contact Name</Label>
                        <Input
                          placeholder="Emergency Contact Name"
                          value={newPatientData.emergencyContactName}
                          onChange={(e: ChangeEvent<HTMLInputElement>) =>
                            setNewPatientData((prev: NewPatientData) => ({ ...prev, emergencyContactName: e.target.value }))
                          }
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>Emergency Contact Phone</Label>
                        <Input
                          placeholder="Emergency Contact Phone"
                          value={newPatientData.emergencyContactPhone}
                          onChange={(e: ChangeEvent<HTMLInputElement>) =>
                            setNewPatientData((prev: NewPatientData) => ({
                              ...prev,
                              emergencyContactPhone: e.target.value,
                            }))
                          }
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>Emergency Contact Relation</Label>
                        <Input
                          placeholder="Emergency Contact Relation"
                          value={newPatientData.emergencyContactRelation}
                          onChange={(e: ChangeEvent<HTMLInputElement>) =>
                            setNewPatientData((prev: NewPatientData) => ({
                              ...prev,
                              emergencyContactRelation: e.target.value,
                            }))
                          }
                        />
                      </div>
                    </div>
                  )}

                  {currentStep === 4 && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label>Allergies</Label>
                        <Input
                          placeholder="Allergies"
                          value={newPatientData.allergies}
                          onChange={(e: ChangeEvent<HTMLInputElement>) =>
                            setNewPatientData((prev: NewPatientData) => ({ ...prev, allergies: e.target.value }))
                          }
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>Medical Conditions</Label>
                        <Input
                          placeholder="Medical Conditions"
                          value={newPatientData.medicalConditions}
                          onChange={(e: ChangeEvent<HTMLInputElement>) =>
                            setNewPatientData((prev: NewPatientData) => ({ ...prev, medicalConditions: e.target.value }))
                          }
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>Current Medications</Label>
                        <Input
                          placeholder="Current Medications"
                          value={newPatientData.currentMedications}
                          onChange={(e: ChangeEvent<HTMLInputElement>) =>
                            setNewPatientData((prev: NewPatientData) => ({ ...prev, currentMedications: e.target.value }))
                          }
                        />
                      </div>
                    </div>
                  )}

                  {currentStep === 5 && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label>Refill/Renew Status</Label>
                        <Select
                          value={newPatientData.refillRenewStatus}
                          onValueChange={(value: string) =>
                            setNewPatientData((prev: NewPatientData) => ({ ...prev, refillRenewStatus: value }))
                          }
                        >
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="active">Active</SelectItem>
                            <SelectItem value="inactive">Inactive</SelectItem>
                            <SelectItem value="suspended">Suspended</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label>Default Priority</Label>
                        <Select
                          value={newPatientData.defaultPriority}
                          onValueChange={(value: string) =>
                            setNewPatientData((prev: NewPatientData) => ({ ...prev, defaultPriority: value }))
                          }
                        >
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="low">Low</SelectItem>
                            <SelectItem value="medium">Medium</SelectItem>
                            <SelectItem value="high">High</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label>Delivery Method</Label>
                        <Select
                          value={newPatientData.deliveryMethod}
                          onValueChange={(value: string) =>
                            setNewPatientData((prev: NewPatientData) => ({ ...prev, deliveryMethod: value }))
                          }
                        >
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="pickup">Pickup</SelectItem>
                            <SelectItem value="delivery">Delivery</SelectItem>
                            <SelectItem value="mail">Mail</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  )}

                  {currentStep === 6 && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label>Bio Image</Label>
                        <Input type="file" onChange={(e) => handleFileUpload(e, "bioImage")} />
                      </div>
                      <div className="space-y-2">
                        <Label>Driver&apos;s License State</Label>
                        <Input
                          placeholder="State"
                          value={newPatientData.driversLicenseState}
                          onChange={(e: ChangeEvent<HTMLInputElement>) =>
                            setNewPatientData((prev: NewPatientData) => ({ ...prev, driversLicenseState: e.target.value }))
                          }
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>Driver&apos;s License Number</Label>
                        <Input
                          placeholder="License Number"
                          value={newPatientData.driversLicenseNumber}
                          onChange={(e: ChangeEvent<HTMLInputElement>) =>
                            setNewPatientData((prev: NewPatientData) => ({ ...prev, driversLicenseNumber: e.target.value }))
                          }
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>Driver&apos;s License Expiration</Label>
                        <Input
                          type="date"
                          value={newPatientData.driversLicenseExpiration}
                          onChange={(e: ChangeEvent<HTMLInputElement>) =>
                            setNewPatientData((prev: NewPatientData) => ({
                              ...prev,
                              driversLicenseExpiration: e.target.value,
                            }))
                          }
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>Driver&apos;s License Front</Label>
                        <Input type="file" onChange={(e) => handleFileUpload(e, "driversLicenseFront")} />
                      </div>
                      <div className="space-y-2">
                        <Label>Driver&apos;s License Back</Label>
                        <Input type="file" onChange={(e) => handleFileUpload(e, "driversLicenseBack")} />
                      </div>
                      <div className="space-y-2">
                        <Label>MBI</Label>
                        <Input
                          placeholder="MBI"
                          value={newPatientData.mbi}
                          onChange={(e: ChangeEvent<HTMLInputElement>) =>
                            setNewPatientData((prev: NewPatientData) => ({ ...prev, mbi: e.target.value }))
                          }
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>SSN</Label>
                        <Input
                          placeholder="SSN"
                          value={newPatientData.ssn}
                          onChange={(e: ChangeEvent<HTMLInputElement>) =>
                            setNewPatientData((prev: NewPatientData) => ({ ...prev, ssn: e.target.value }))
                          }
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>Alternate ID</Label>
                        <Input
                          placeholder="Alternate ID"
                          value={newPatientData.alternateId}
                          onChange={(e: ChangeEvent<HTMLInputElement>) =>
                            setNewPatientData((prev: NewPatientData) => ({ ...prev, alternateId: e.target.value }))
                          }
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>Identification Expiration</Label>
                        <Input
                          type="date"
                          value={newPatientData.identificationExpiration}
                          onChange={(e: ChangeEvent<HTMLInputElement>) =>
                            setNewPatientData((prev: NewPatientData) => ({
                              ...prev,
                              identificationExpiration: e.target.value,
                            }))
                          }
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>External ID</Label>
                        <Input
                          placeholder="External ID"
                          value={newPatientData.externalId}
                          onChange={(e: ChangeEvent<HTMLInputElement>) =>
                            setNewPatientData((prev: NewPatientData) => ({ ...prev, externalId: e.target.value }))
                          }
                        />
                      </div>
                    </div>
                  )}

                  {currentStep === 7 && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label>Payment Method</Label>
                        <Select
                          value={newPatientData.paymentMethod}
                          onValueChange={(value: string) =>
                            setNewPatientData((prev: NewPatientData) => ({ ...prev, paymentMethod: value }))
                          }
                        >
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="credit">Credit Card</SelectItem>
                            <SelectItem value="ach">ACH</SelectItem>
                            <SelectItem value="cash">Cash</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      {newPatientData.paymentMethod === "credit" && (
                        <>
                          <div className="space-y-2">
                            <Label>Credit Card Type</Label>
                            <Select
                              value={newPatientData.creditCardType}
                              onValueChange={(value: string) =>
                                setNewPatientData((prev: NewPatientData) => ({ ...prev, creditCardType: value }))
                              }
                            >
                              <SelectTrigger>
                                <SelectValue placeholder="Select card type" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="visa">Visa</SelectItem>
                                <SelectItem value="mastercard">Mastercard</SelectItem>
                                <SelectItem value="amex">American Express</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                          <div className="space-y-2">
                            <Label>Credit Card Number</Label>
                            <Input
                              placeholder="Credit Card Number"
                              value={newPatientData.creditCardNumber}
                              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                                setNewPatientData((prev: NewPatientData) => ({ ...prev, creditCardNumber: e.target.value }))
                              }
                            />
                          </div>
                          <div className="space-y-2">
                            <Label>Expiration Date</Label>
                            <Input
                              placeholder="MM/YYYY"
                              value={newPatientData.creditCardExpiration}
                              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                                setNewPatientData((prev: NewPatientData) => ({
                                  ...prev,
                                  creditCardExpiration: e.target.value,
                                }))
                              }
                            />
                          </div>
                          <div className="space-y-2">
                            <Label>CVV</Label>
                            <Input
                              placeholder="CVV"
                              value={newPatientData.creditCardCVV}
                              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                                setNewPatientData((prev: NewPatientData) => ({ ...prev, creditCardCVV: e.target.value }))
                              }
                            />
                          </div>
                          <div className="space-y-2">
                            <Label>Cardholder Name</Label>
                            <Input
                              placeholder="Cardholder Name"
                              value={newPatientData.creditCardHolderName}
                              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                                setNewPatientData((prev: NewPatientData) => ({
                                  ...prev,
                                  creditCardHolderName: e.target.value,
                                }))
                              }
                            />
                          </div>
                          <div className="space-y-2">
                            <Label>Billing Address</Label>
                            <Input
                              placeholder="Billing Address"
                              value={newPatientData.creditCardBillingAddress}
                              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                                setNewPatientData((prev: NewPatientData) => ({
                                  ...prev,
                                  creditCardBillingAddress: e.target.value,
                                }))
                              }
                            />
                          </div>
                          <div className="space-y-2">
                            <Label>Billing City</Label>
                            <Input
                              placeholder="Billing City"
                              value={newPatientData.creditCardBillingCity}
                              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                                setNewPatientData((prev: NewPatientData) => ({
                                  ...prev,
                                  creditCardBillingCity: e.target.value,
                                }))
                              }
                            />
                          </div>
                          <div className="space-y-2">
                            <Label>Billing State</Label>
                            <Input
                              placeholder="Billing State"
                              value={newPatientData.creditCardBillingState}
                              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                                setNewPatientData((prev: NewPatientData) => ({
                                  ...prev,
                                  creditCardBillingState: e.target.value,
                                }))
                              }
                            />
                          </div>
                          <div className="space-y-2">
                            <Label>Billing ZIP</Label>
                            <Input
                              placeholder="Billing ZIP"
                              value={newPatientData.creditCardBillingZip}
                              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                                setNewPatientData((prev: NewPatientData) => ({
                                  ...prev,
                                  creditCardBillingZip: e.target.value,
                                }))
                              }
                            />
                          </div>
                        </>
                      )}
                      {newPatientData.paymentMethod === "ach" && (
                        <>
                          <div className="space-y-2">
                            <Label>Account Type</Label>
                            <Select
                              value={newPatientData.achAccountType}
                              onValueChange={(value: string) =>
                                setNewPatientData((prev: NewPatientData) => ({ ...prev, achAccountType: value }))
                              }
                            >
                              <SelectTrigger>
                                <SelectValue placeholder="Select account type" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="checking">Checking</SelectItem>
                                <SelectItem value="savings">Savings</SelectItem>
                                <SelectItem value="business-checking">Business Checking</SelectItem>
                                <SelectItem value="business-savings">Business Savings</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                          <div className="space-y-2">
                            <Label>Bank Name</Label>
                            <Input
                              placeholder="Bank Name"
                              value={newPatientData.achBankName}
                              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                                setNewPatientData((prev: NewPatientData) => ({ ...prev, achBankName: e.target.value }))
                              }
                            />
                          </div>
                          <div className="space-y-2">
                            <Label>Routing Number</Label>
                            <Input
                              placeholder="Routing Number"
                              value={newPatientData.achRoutingNumber}
                              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                                setNewPatientData((prev: NewPatientData) => ({ ...prev, achRoutingNumber: e.target.value }))
                              }
                            />
                          </div>
                          <div className="space-y-2">
                            <Label>Account Number</Label>
                            <Input
                              placeholder="Account Number"
                              value={newPatientData.achAccountNumber}
                              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                                setNewPatientData((prev: NewPatientData) => ({ ...prev, achAccountNumber: e.target.value }))
                              }
                            />
                          </div>
                          <div className="space-y-2">
                            <Label>Account Holder Name</Label>
                            <Input
                              placeholder="Account Holder Name"
                              value={newPatientData.achAccountHolderName}
                              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                                setNewPatientData((prev: NewPatientData) => ({
                                  ...prev,
                                  achAccountHolderName: e.target.value,
                                }))
                              }
                            />
                          </div>
                          <div className="space-y-2">
                            <Label>Bank Address</Label>
                            <Input
                              placeholder="Bank Address"
                              value={newPatientData.achBankAddress}
                              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                                setNewPatientData((prev: NewPatientData) => ({ ...prev, achBankAddress: e.target.value }))
                              }
                            />
                          </div>
                          <div className="space-y-2">
                            <Label>Bank City</Label>
                            <Input
                              placeholder="Bank City"
                              value={newPatientData.achBankCity}
                              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                                setNewPatientData((prev: NewPatientData) => ({ ...prev, achBankCity: e.target.value }))
                              }
                            />
                          </div>
                          <div className="space-y-2">
                            <Label>Bank State</Label>
                            <Input
                              placeholder="Bank State"
                              value={newPatientData.achBankState}
                              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                                setNewPatientData((prev: NewPatientData) => ({ ...prev, achBankState: e.target.value }))
                              }
                            />
                          </div>
                          <div className="space-y-2">
                            <Label>Bank ZIP</Label>
                            <Input
                              placeholder="Bank ZIP"
                              value={newPatientData.achBankZip}
                              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                                setNewPatientData((prev: NewPatientData) => ({ ...prev, achBankZip: e.target.value }))
                              }
                            />
                          </div>
                        </>
                      )}
                    </div>
                  )}

                  {currentStep === 8 && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2 col-span-2">
                        <Label>Critical Comments</Label>
                        <textarea
                          placeholder="Critical comments about the patient"
                          value={newPatientData.criticalComments}
                          onChange={(e: ChangeEvent<HTMLTextAreaElement>) =>
                            setNewPatientData((prev: NewPatientData) => ({ ...prev, criticalComments: e.target.value }))
                          }
                          className="w-full min-h-[100px] p-3 border border-gray-300 rounded-md"
                        />
                      </div>
                      <div className="space-y-2 col-span-2">
                        <Label>Facility</Label>
                        <Select
                          value={newPatientData.facility}
                          onValueChange={(value: string) =>
                            setNewPatientData((prev: NewPatientData) => ({ ...prev, facility: value }))
                          }
                        >
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Main Location">Main Location</SelectItem>
                            <SelectItem value="Downtown Clinic">Downtown Clinic</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  )}
                </CardContent>
                <div className="flex justify-between p-6 border-t">
                  <Button variant="outline" onClick={() => setCurrentStep((prev: number) => Math.max(1, prev - 1))}>
                    Previous
                  </Button>
                  <Button
                    className="bg-red-800 hover:bg-red-900"
                    onClick={() => {
                      if (currentStep < 8) {
                        setCurrentStep((prev: number) => prev + 1)
                      } else {
                        // Final step, handle submission
                        console.log("New Patient Data:", newPatientData)
                        setShowNewPatient(false)
                      }
                    }}
                  >
                    {currentStep < 8 ? "Next" : "Save Patient"}
                  </Button>
                </div>
              </Card>
            </div>
          )}
        </div>
      )
    }

    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-bold bg-gradient-to-r from-green-800 to-green-600 bg-clip-text text-transparent">Scheduling</h2>
            <p className="text-gray-600 mt-1">Schedule and manage patient appointments</p>
          </div>
          <div className="flex items-center gap-4">
            <Button 
              className="bg-green-800 hover:bg-green-900 text-white"
              onClick={() => setShowNewPatient(true)}
            >
              <Plus className="h-4 w-4 mr-2" />
              Schedule Appointment
            </Button>
            <Button variant="outline" size="sm" className="border-green-300 text-green-700 hover:bg-green-50">
              <DownloadIcon className="h-4 w-4 mr-2" />
              Export Schedule
            </Button>
          </div>
        </div>

        {/* Appointment Scheduling Interface */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Calendar View */}
          <div className="lg:col-span-2">
            <Card className="overflow-hidden border-l-4 border-l-green-500">
              <CardHeader className="bg-gradient-to-r from-green-50 to-green-100">
                <CardTitle className="text-green-800">Calendar View</CardTitle>
                <CardDescription className="text-green-600">Select a date to schedule appointments</CardDescription>
              </CardHeader>
              <CardContent className="pt-6">
                <div className="grid grid-cols-7 gap-2 text-center text-sm font-medium mb-4">
                  {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
                    <div key={day} className="p-2 text-green-700 font-semibold">
                      {day}
                    </div>
                  ))}
                  {Array.from({ length: 35 }, (_, i) => {
                    const date = i - 5 // Start from a few days before the 1st
                    const fullDate = new Date(new Date().getFullYear(), new Date().getMonth(), date)
                    const isSelected = selectedDate === fullDate.toISOString().split("T")[0]
                    const isToday = fullDate.toDateString() === new Date().toDateString()
                    const hasAppointments = Math.random() > 0.7 // Simulate some dates having appointments
                    return (
                      <div
                        key={i}
                        onClick={() => handleDateClick(fullDate.toISOString().split("T")[0])}
                        className={`p-4 border rounded-lg cursor-pointer transition-all duration-200 ${
                          isSelected 
                            ? "bg-green-800 text-white shadow-lg transform scale-105" 
                            : isToday
                            ? "bg-green-100 border-green-300 text-green-800"
                            : hasAppointments
                            ? "bg-orange-50 border-orange-200 hover:bg-orange-100"
                            : "hover:bg-gray-50"
                        }`}
                      >
                        <div className="text-sm font-medium">{fullDate.getDate()}</div>
                        {hasAppointments && !isSelected && (
                          <div className="w-2 h-2 bg-orange-500 rounded-full mx-auto mt-1"></div>
                        )}
                      </div>
                    )
                  })}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Time Slots */}
          <div className="lg:col-span-1">
            <Card className="overflow-hidden border-l-4 border-l-blue-500">
              <CardHeader className="bg-gradient-to-r from-blue-50 to-blue-100">
                <CardTitle className="text-blue-800">Available Time Slots</CardTitle>
                <CardDescription className="text-blue-600">For {selectedDate || 'selected date'}</CardDescription>
              </CardHeader>
              <CardContent className="pt-6">
                <div className="space-y-2">
                  {timeSlots.map((slot, index) => {
                    const isBooked = Math.random() > 0.6 // Simulate some slots being booked
                    return (
                      <Button
                        key={index}
                        variant={isBooked ? "outline" : "default"}
                        className={`w-full justify-start ${
                          isBooked 
                            ? "border-gray-300 text-gray-500 cursor-not-allowed" 
                            : "bg-blue-600 hover:bg-blue-700 text-white"
                        }`}
                        disabled={isBooked}
                        onClick={() => {
                          if (!isBooked) {
                            setShowNewPatient(true)
                          }
                        }}
                      >
                        <Clock className="h-4 w-4 mr-2" />
                        {slot}
                        {isBooked && <span className="ml-auto text-xs">Booked</span>}
                      </Button>
                    )
                  })}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Selected Day Appointments */}
        {showDayAppointments && (
          <Card className="overflow-hidden border-l-4 border-l-purple-500">
            <CardHeader className="bg-gradient-to-r from-purple-50 to-purple-100">
              <CardTitle className="text-purple-800">Appointments for {selectedDate}</CardTitle>
              <CardDescription className="text-purple-600">Manage appointments for the selected day</CardDescription>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="space-y-4">
                {dayAppointments.map((appointment) => (
                  <div key={appointment.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition-colors">
                    <div className="grid grid-cols-4 gap-4 flex-1">
                      <div className="flex items-center">
                        <Clock className="h-4 w-4 mr-2 text-purple-600" />
                        <p className="font-medium">{appointment.time}</p>
                      </div>
                      <div className="flex items-center">
                        <User className="h-4 w-4 mr-2 text-blue-600" />
                        <p className="font-medium">{appointment.patient}</p>
                      </div>
                      <div className="flex items-center">
                        <FileText className="h-4 w-4 mr-2 text-green-600" />
                        <p className="text-sm">{appointment.type}</p>
                      </div>
                      <div>
                        <Badge
                          className={
                            appointment.status === "Confirmed"
                              ? "bg-green-100 text-green-800"
                              : "bg-yellow-100 text-yellow-800"
                          }
                        >
                          {appointment.status}
                        </Badge>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm" className="border-purple-300 text-purple-700 hover:bg-purple-50">
                        <Eye className="h-3 w-3 mr-1" />
                        View
                      </Button>
                      <Button variant="outline" size="sm" className="border-green-300 text-green-700 hover:bg-green-50">
                        <Edit className="h-3 w-3 mr-1" />
                        Edit
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card className="overflow-hidden border-l-4 border-l-green-500">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-800">Today's Appointments</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">8</div>
              <p className="text-xs text-gray-600 mt-1">+2 from yesterday</p>
            </CardContent>
          </Card>

          <Card className="overflow-hidden border-l-4 border-l-blue-500">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-800">Available Slots</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-600">12</div>
              <p className="text-xs text-gray-600 mt-1">Next 7 days</p>
            </CardContent>
          </Card>

          <Card className="overflow-hidden border-l-4 border-l-orange-500">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-800">Pending Confirmations</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-orange-600">3</div>
              <p className="text-xs text-gray-600 mt-1">Awaiting response</p>
            </CardContent>
          </Card>

          <Card className="overflow-hidden border-l-4 border-l-purple-500">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-800">Total This Week</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-purple-600">45</div>
              <p className="text-xs text-gray-600 mt-1">+5 from last week</p>
            </CardContent>
          </Card>
        </div>

        {renderNewPatientForm()}
      </div>
    )
  }

  const renderRxForms = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold">Rx Forms</h2>
          <p className="text-gray-600">Digital prescription forms and templates</p>
        </div>
        <div className="flex items-center gap-4">
          <Button variant="outline">
            <DownloadIcon className="h-4 w-4 mr-2" />
            Export Forms
          </Button>
          <Button 
            className="bg-red-800 hover:bg-red-900"
            onClick={() => setShowRxFormModal(true)}
          >
            <Plus className="h-4 w-4 mr-2" />
            New Rx Form
          </Button>
        </div>
      </div>

      {/* Form Templates */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[
          {
            title: "Standard Prescription",
            description: "Basic prescription form for routine medications",
            icon: FileText,
            color: "blue",
            count: 156
          },
          {
            title: "Controlled Substance",
            description: "DEA-compliant form for controlled medications",
            icon: AlertTriangle,
            color: "red",
            count: 23
          },
          {
            title: "Compound Prescription",
            description: "Specialized form for compounded medications",
            icon: Wrench,
            color: "purple",
            count: 8
          },
          {
            title: "Emergency Prescription",
            description: "Urgent care prescription template",
            icon: Clock,
            color: "orange",
            count: 12
          },
          {
            title: "Pediatric Prescription",
            description: "Child-specific dosing and instructions",
            icon: User,
            color: "green",
            count: 34
          },
          {
            title: "Geriatric Prescription",
            description: "Elderly patient considerations and dosing",
            icon: User,
            color: "gray",
            count: 28
          }
        ].map((form, index) => {
          const IconComponent = form.icon
          return (
            <Card key={index} className="cursor-pointer hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className={`w-12 h-12 bg-${form.color}-100 rounded-lg flex items-center justify-center`}>
                    <IconComponent className={`h-6 w-6 text-${form.color}-600`} />
                  </div>
                  <div>
                    <CardTitle className="text-lg">{form.title}</CardTitle>
                    <CardDescription>{form.description}</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <Badge variant="outline">{form.count} active</Badge>
                  <Button variant="ghost" size="sm">
                    <Eye className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* Recent Forms */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Rx Forms</CardTitle>
          <CardDescription>Recently created and modified prescriptions</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[
              {
                patient: "John Smith",
                medication: "Lisinopril 10mg",
                prescriber: "Dr. Sarah Johnson",
                date: "2024-01-15",
                status: "active"
              },
              {
                patient: "Mary Johnson",
                medication: "Metformin 500mg",
                prescriber: "Dr. Mike Rodriguez",
                date: "2024-01-14",
                status: "pending"
              },
              {
                patient: "Robert Davis",
                medication: "Oxycodone 5mg",
                prescriber: "Dr. Lisa Chen",
                date: "2024-01-13",
                status: "active"
              }
            ].map((form, index) => (
              <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
                    <FileText className="h-5 w-5 text-gray-600" />
                  </div>
                  <div>
                    <p className="font-medium">{form.patient}</p>
                    <p className="text-sm text-gray-600">{form.medication}</p>
                    <p className="text-xs text-gray-500">Prescribed by {form.prescriber}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm text-gray-600">{form.date}</p>
                  <Badge className={form.status === "active" ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"}>
                    {form.status}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )

  const renderCatalog = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold">Prescription Catalog</h2>
          <p className="text-gray-600">Comprehensive medication database</p>
        </div>
        <div className="flex items-center gap-4">
          <Button variant="outline">
            <DownloadIcon className="h-4 w-4 mr-2" />
            Export Catalog
          </Button>
          <Button className="bg-red-800 hover:bg-red-900">
            <Plus className="h-4 w-4 mr-2" />
            Add Medication
          </Button>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Search Medications</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input placeholder="Search by name or generic..." className="pl-10" />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Medication Categories</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { name: "Antibiotics", icon: Pill, count: 45 },
              { name: "Pain Management", icon: Pill, count: 32 },
              { name: "Cardiovascular", icon: HeartIcon, count: 28 },
              { name: "Diabetes", icon: Pill, count: 15 },
              { name: "Psychiatric", icon: Pill, count: 23 },
              { name: "Respiratory", icon: Pill, count: 18 },
              { name: "Gastrointestinal", icon: Pill, count: 22 },
              { name: "Controlled Substances", icon: AlertTriangle, count: 12 }
            ].map((category, index) => {
              const IconComponent = category.icon
              return (
                <Card key={index} className="cursor-pointer hover:shadow-lg transition-shadow">
                  <CardContent className="p-6 text-center">
                    <IconComponent className="h-8 w-8 mx-auto mb-3 text-red-600" />
                    <h3 className="font-semibold mb-1">{category.name}</h3>
                    <p className="text-sm text-gray-600">{category.count} medications</p>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Recent Medications</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              { name: "Amoxicillin", generic: "Amoxicillin", strength: "500mg", form: "Capsule", price: 15.99 },
              { name: "Lisinopril", generic: "Lisinopril", strength: "10mg", form: "Tablet", price: 8.50 },
              { name: "Metformin", generic: "Metformin", strength: "500mg", form: "Tablet", price: 12.75 },
              { name: "Albuterol", generic: "Albuterol", strength: "90mcg", form: "Inhaler", price: 35.00 },
              { name: "Sertraline", generic: "Sertraline", strength: "50mg", form: "Tablet", price: 18.25 },
              { name: "Oxycodone", generic: "Oxycodone", strength: "5mg", form: "Tablet", price: 45.00, controlled: true }
            ].map((med, index) => (
              <Card key={index} className="cursor-pointer hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg">{med.name}</CardTitle>
                    {med.controlled && <Badge className="bg-red-100 text-red-800">CII</Badge>}
                  </div>
                  <CardDescription>{med.generic}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <Pill className="h-4 w-4 text-gray-500" />
                      <span className="text-sm">{med.strength} {med.form}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <Badge variant="default">In Stock</Badge>
                      <span className="font-semibold">${med.price}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )

  const renderAppointments = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-800 to-blue-600 bg-clip-text text-transparent">Appointments</h2>
          <p className="text-gray-600 mt-1">Manage patient appointments and scheduling</p>
        </div>
        <div className="flex items-center gap-4">
          <Button variant="outline" size="sm" className="border-blue-300 text-blue-700 hover:bg-blue-50">
            <Calendar className="h-4 w-4 mr-2" />
            Today
          </Button>
          <Button className="bg-blue-800 hover:bg-blue-900 text-white">
            <Plus className="h-4 w-4 mr-2" />
            New Appointment
          </Button>
        </div>
      </div>

      {/* Appointment Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="overflow-hidden border-l-4 border-l-blue-500">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-800">Today's Appointments</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">12</div>
            <p className="text-xs text-gray-600 mt-1">+2 from yesterday</p>
          </CardContent>
        </Card>

        <Card className="overflow-hidden border-l-4 border-l-green-500">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-800">Confirmed</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">8</div>
            <p className="text-xs text-gray-600 mt-1">67% of total</p>
          </CardContent>
        </Card>

        <Card className="overflow-hidden border-l-4 border-l-orange-500">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-800">Pending</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-600">3</div>
            <p className="text-xs text-gray-600 mt-1">Awaiting confirmation</p>
          </CardContent>
        </Card>

        <Card className="overflow-hidden border-l-4 border-l-red-500">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-800">Cancelled</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">1</div>
            <p className="text-xs text-gray-600 mt-1">8% of total</p>
          </CardContent>
        </Card>
      </div>

      {/* Appointment Calendar and List */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="overflow-hidden border-l-4 border-l-blue-500">
          <CardHeader className="bg-gradient-to-r from-blue-50 to-blue-100">
            <CardTitle className="text-blue-800">Today's Schedule</CardTitle>
            <CardDescription className="text-blue-600">Appointments for December 18, 2024</CardDescription>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="space-y-4">
              {[
                { time: "9:00 AM", patient: "John Smith", type: "Consultation", status: "confirmed", color: "bg-green-500" },
                { time: "10:30 AM", patient: "Sarah Johnson", type: "Follow-up", status: "confirmed", color: "bg-green-500" },
                { time: "12:00 PM", patient: "Mike Davis", type: "New Patient", status: "pending", color: "bg-orange-500" },
                { time: "2:00 PM", patient: "Lisa Wilson", type: "Consultation", status: "confirmed", color: "bg-green-500" },
                { time: "3:30 PM", patient: "Robert Brown", type: "Follow-up", status: "cancelled", color: "bg-red-500" },
                { time: "5:00 PM", patient: "Emily Green", type: "New Patient", status: "pending", color: "bg-orange-500" },
              ].map((appointment, index) => (
                <div key={index} className="flex items-center space-x-4 p-3 rounded-lg hover:bg-gray-50 transition-colors">
                  <div className={`w-3 h-3 ${appointment.color} rounded-full shadow-sm`}></div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-800">{appointment.time} - {appointment.patient}</p>
                    <p className="text-xs text-gray-600">{appointment.type}</p>
                  </div>
                  <Badge className={`${
                    appointment.status === 'confirmed' ? 'bg-green-100 text-green-800' :
                    appointment.status === 'pending' ? 'bg-orange-100 text-orange-800' :
                    'bg-red-100 text-red-800'
                  }`}>
                    {appointment.status}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="overflow-hidden border-l-4 border-l-purple-500">
          <CardHeader className="bg-gradient-to-r from-purple-50 to-purple-100">
            <CardTitle className="text-purple-800">Upcoming Appointments</CardTitle>
            <CardDescription className="text-purple-600">Next 7 days</CardDescription>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="space-y-4">
              {[
                { date: "Dec 19", time: "9:00 AM", patient: "David White", type: "Consultation" },
                { date: "Dec 20", time: "11:00 AM", patient: "Ashley Black", type: "Follow-up" },
                { date: "Dec 21", time: "2:30 PM", patient: "James Wilson", type: "New Patient" },
                { date: "Dec 22", time: "10:00 AM", patient: "Maria Garcia", type: "Consultation" },
                { date: "Dec 23", time: "1:00 PM", patient: "Thomas Lee", type: "Follow-up" },
              ].map((appointment, index) => (
                <div key={index} className="flex items-center space-x-4 p-3 rounded-lg hover:bg-gray-50 transition-colors">
                  <div className="text-center min-w-[60px]">
                    <p className="text-sm font-bold text-purple-600">{appointment.date}</p>
                    <p className="text-xs text-gray-500">{appointment.time}</p>
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-800">{appointment.patient}</p>
                    <p className="text-xs text-gray-600">{appointment.type}</p>
                  </div>
                  <Button variant="outline" size="sm" className="border-purple-300 text-purple-700 hover:bg-purple-50">
                    <Eye className="h-3 w-3 mr-1" />
                    View
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card className="overflow-hidden border-l-4 border-l-green-500">
        <CardHeader className="bg-gradient-to-r from-green-50 to-green-100">
          <CardTitle className="text-green-800">Quick Actions</CardTitle>
          <CardDescription className="text-green-600">Common appointment tasks</CardDescription>
        </CardHeader>
        <CardContent className="pt-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Button variant="outline" className="h-20 flex flex-col items-center justify-center border-green-300 text-green-700 hover:bg-green-50">
              <Calendar className="h-6 w-6 mb-2" />
              <span className="text-sm">Schedule New</span>
            </Button>
            <Button variant="outline" className="h-20 flex flex-col items-center justify-center border-blue-300 text-blue-700 hover:bg-blue-50">
              <Users className="h-6 w-6 mb-2" />
              <span className="text-sm">Patient List</span>
            </Button>
            <Button variant="outline" className="h-20 flex flex-col items-center justify-center border-purple-300 text-purple-700 hover:bg-purple-50">
              <FileText className="h-6 w-6 mb-2" />
              <span className="text-sm">Reports</span>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )

  const renderContact = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold">Contact & Support</h2>
        <div className="flex items-center gap-4">
          <Button 
            className="bg-red-800 hover:bg-red-900"
            onClick={() => setShowContactForm(true)}
          >
            <Plus className="h-4 w-4 mr-2" />
            New Contact
          </Button>
          <Button variant="outline" size="sm">
            <Mail className="h-4 w-4 mr-2" />
            Send Message
          </Button>
        </div>
      </div>

      {/* Contact Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5 text-blue-600" />
              Total Contacts
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">24</div>
            <p className="text-sm text-gray-600">Active contacts</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MessageCircle className="h-5 w-5 text-green-600" />
              Recent Messages
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">8</div>
            <p className="text-sm text-gray-600">Last 7 days</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="h-5 w-5 text-yellow-600" />
              Pending
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">3</div>
            <p className="text-sm text-gray-600">Awaiting response</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CheckCircle className="h-5 w-5 text-green-600" />
              Resolved
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">156</div>
            <p className="text-sm text-gray-600">This month</p>
          </CardContent>
        </Card>
      </div>

      {/* Contact Categories */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Key Contacts */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User className="h-5 w-5 text-red-600" />
              Key Contacts
            </CardTitle>
            <CardDescription>Primary facility contacts</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                {
                  name: "Dr. Sarah Johnson",
                  role: "Medical Director",
                  email: "sarah.johnson@facility.com",
                  phone: "(555) 123-4567",
                  department: "Medical",
                  priority: "high"
                },
                {
                  name: "Mike Rodriguez",
                  role: "Pharmacy Manager",
                  email: "mike.rodriguez@facility.com",
                  phone: "(555) 234-5678",
                  department: "Pharmacy",
                  priority: "high"
                },
                {
                  name: "Lisa Chen",
                  role: "IT Administrator",
                  email: "lisa.chen@facility.com",
                  phone: "(555) 345-6789",
                  department: "IT",
                  priority: "medium"
                }
              ].map((contact, index) => (
                <div key={index} className="flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
                      <User className="h-5 w-5 text-red-600" />
                    </div>
                    <div>
                      <p className="font-medium">{contact.name}</p>
                      <p className="text-sm text-gray-600">{contact.role}</p>
                      <p className="text-xs text-gray-500">{contact.department}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <Badge className={contact.priority === "high" ? "bg-red-100 text-red-800" : "bg-yellow-100 text-yellow-800"}>
                      {contact.priority}
                    </Badge>
                    <div className="flex gap-2 mt-2">
                      <Button variant="outline" size="sm">
                        <Mail className="h-3 w-3" />
                      </Button>
                      <Button variant="outline" size="sm">
                        <PhoneIcon className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Support Team */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <HeadphonesIcon className="h-5 w-5 text-blue-600" />
              Support Team
            </CardTitle>
            <CardDescription>Technical and operational support</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                {
                  name: "Support Desk",
                  role: "24/7 Technical Support",
                  email: "support@facility.com",
                  phone: "(555) 999-0000",
                  status: "online",
                  response: "2-4 hours"
                },
                {
                  name: "Emergency Line",
                  role: "Critical Issues",
                  email: "emergency@facility.com",
                  phone: "(555) 911-0000",
                  status: "online",
                  response: "Immediate"
                },
                {
                  name: "System Admin",
                  role: "IT Infrastructure",
                  email: "admin@facility.com",
                  phone: "(555) 888-0000",
                  status: "online",
                  response: "1-2 hours"
                }
              ].map((contact, index) => (
                <div key={index} className="flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                      <HeadphonesIcon className="h-5 w-5 text-blue-600" />
                    </div>
                    <div>
                      <p className="font-medium">{contact.name}</p>
                      <p className="text-sm text-gray-600">{contact.role}</p>
                      <p className="text-xs text-gray-500">Response: {contact.response}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <Badge className="bg-green-100 text-green-800">
                      {contact.status}
                    </Badge>
                    <div className="flex gap-2 mt-2">
                      <Button variant="outline" size="sm">
                        <Mail className="h-3 w-3" />
                      </Button>
                      <Button variant="outline" size="sm">
                        <PhoneIcon className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* External Partners */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Building className="h-5 w-5 text-purple-600" />
              External Partners
            </CardTitle>
            <CardDescription>Vendors and service providers</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                {
                  name: "MedSupply Co.",
                  role: "Pharmaceutical Supplier",
                  email: "orders@medsupply.com",
                  phone: "(555) 777-0000",
                  type: "vendor",
                  status: "active"
                },
                {
                  name: "TechSupport Inc.",
                  role: "Software Support",
                  email: "help@techsupport.com",
                  phone: "(555) 666-0000",
                  type: "service",
                  status: "active"
                },
                {
                  name: "Insurance Partners",
                  role: "Claims Processing",
                  email: "claims@insurance.com",
                  phone: "(555) 555-0000",
                  type: "partner",
                  status: "active"
                }
              ].map((contact, index) => (
                <div key={index} className="flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                      <Building className="h-5 w-5 text-purple-600" />
                    </div>
                    <div>
                      <p className="font-medium">{contact.name}</p>
                      <p className="text-sm text-gray-600">{contact.role}</p>
                      <p className="text-xs text-gray-500">{contact.type}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <Badge className="bg-green-100 text-green-800">
                      {contact.status}
                    </Badge>
                    <div className="flex gap-2 mt-2">
                      <Button variant="outline" size="sm">
                        <Mail className="h-3 w-3" />
                      </Button>
                      <Button variant="outline" size="sm">
                        <PhoneIcon className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Contact Form */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Contact Form</CardTitle>
          <CardDescription>Send a message to any department or contact</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <Label>To</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select recipient" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="support">Support Desk</SelectItem>
                    <SelectItem value="medical">Medical Director</SelectItem>
                    <SelectItem value="pharmacy">Pharmacy Manager</SelectItem>
                    <SelectItem value="it">IT Administrator</SelectItem>
                    <SelectItem value="emergency">Emergency Line</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label>Subject</Label>
                <Input placeholder="Enter subject" />
              </div>
              <div>
                <Label>Priority</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select priority" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="low">Low</SelectItem>
                    <SelectItem value="medium">Medium</SelectItem>
                    <SelectItem value="high">High</SelectItem>
                    <SelectItem value="urgent">Urgent</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div>
              <Label>Message</Label>
              <Textarea 
                placeholder="Enter your message here..."
                className="h-32"
              />
            </div>
          </div>
          <div className="flex justify-end gap-4 mt-6">
            <Button variant="outline">
              <PaperclipIcon className="h-4 w-4 mr-2" />
              Attach File
            </Button>
            <Button className="bg-red-800 hover:bg-red-900">
              <Send className="h-4 w-4 mr-2" />
              Send Message
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Contact Directory */}
      <Card>
        <CardHeader>
          <CardTitle>Contact Directory</CardTitle>
          <CardDescription>Complete list of all contacts</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-4">
              <Input placeholder="Search contacts..." className="w-64" />
              <Select>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="Filter by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Contacts</SelectItem>
                  <SelectItem value="internal">Internal</SelectItem>
                  <SelectItem value="external">External</SelectItem>
                  <SelectItem value="support">Support</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <Button variant="outline">
              <DownloadIcon className="h-4 w-4 mr-2" />
              Export
            </Button>
          </div>
          
          <div className="space-y-2">
            {[
              { name: "Dr. Sarah Johnson", department: "Medical", email: "sarah.johnson@facility.com", phone: "(555) 123-4567", type: "Internal" },
              { name: "Mike Rodriguez", department: "Pharmacy", email: "mike.rodriguez@facility.com", phone: "(555) 234-5678", type: "Internal" },
              { name: "Lisa Chen", department: "IT", email: "lisa.chen@facility.com", phone: "(555) 345-6789", type: "Internal" },
              { name: "Support Desk", department: "Support", email: "support@facility.com", phone: "(555) 999-0000", type: "Support" },
              { name: "MedSupply Co.", department: "Vendor", email: "orders@medsupply.com", phone: "(555) 777-0000", type: "External" },
              { name: "TechSupport Inc.", department: "Service", email: "help@techsupport.com", phone: "(555) 666-0000", type: "External" }
            ].map((contact, index) => (
              <div key={index} className="flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50">
                <div className="flex items-center gap-4">
                  <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center">
                    <User className="h-4 w-4 text-gray-600" />
                  </div>
                  <div>
                    <p className="font-medium">{contact.name}</p>
                    <p className="text-sm text-gray-600">{contact.department}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="text-right">
                    <p className="text-sm">{contact.email}</p>
                    <p className="text-sm text-gray-600">{contact.phone}</p>
                  </div>
                  <Badge className={contact.type === "Internal" ? "bg-blue-100 text-blue-800" : contact.type === "Support" ? "bg-green-100 text-green-800" : "bg-purple-100 text-purple-800"}>
                    {contact.type}
                  </Badge>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">
                      <Mail className="h-3 w-3" />
                    </Button>
                    <Button variant="outline" size="sm">
                      <PhoneIcon className="h-3 w-3" />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )

  const renderToolsPopup = () => (
    <aside
      className={`fixed top-0 right-0 z-50 h-screen w-full max-w-xl bg-white shadow-lg transition-transform duration-300 ease-in-out ${
        showTools ? "translate-x-0" : "translate-x-full"
      }`}
    >
      <div className="flex items-center justify-between p-4 border-b bg-gray-50">
        <h2 className="text-xl font-bold">Tools</h2>
        <Button variant="ghost" size="icon" onClick={() => setShowTools(false)}>
          <X className="h-5 w-5" />
        </Button>
      </div>
      <div className="p-6 overflow-y-auto h-[calc(100vh-65px)]">{renderFormulaCalculator()}</div>
    </aside>
  )

  const getPageContent = () => {
    switch (activeHeader) {
      case "dashboard":
        return renderDashboard()
      case "operations":
        return renderOperations()
      case "prescriptions":
        return renderPrescriptions()
      case "patients":
        return renderPatients()
      case "account":
        return renderAccount()
      case "ar":
        return renderAR()
      case "scheduling":
        return renderScheduling()
      case "workflow":
        return renderWorkflow()
      case "rxforms":
        return renderRxForms()
      case "catalog":
        return renderCatalog()
      case "appointments":
        return renderAppointments()
      case "contact":
        return renderContact()
      default:
        return renderDashboard()
    }
  }

  return (
    <div className="flex h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Sidebar */}
      <aside
        className={`bg-gradient-to-b from-red-900 to-red-800 shadow-2xl transition-all duration-300 ease-in-out ${
          sidebarCollapsed ? "w-20" : "w-64"
        }`}
      >
        <div className="flex items-center justify-between p-4 border-b border-red-700">
          {!sidebarCollapsed && <h1 className="text-xl font-bold text-white">Facilities Portal</h1>}
          <Button variant="ghost" size="sm" onClick={() => setSidebarCollapsed(!sidebarCollapsed)} className="text-white hover:bg-red-700">
            {sidebarCollapsed ? "→" : "←"}
          </Button>
        </div>
        <nav className="flex-1 p-4 space-y-2">
          {MAIN_HEADERS.map((header) => {
            const IconComponent = header.icon
            return (
              <button
                key={header.id}
                onClick={() => handleHeaderChange(header.id)}
                className={`w-full flex items-center p-3 rounded-lg transition-all duration-200 ${
                  activeHeader === header.id
                    ? "bg-white text-red-800 shadow-lg transform scale-105"
                    : "text-red-100 hover:bg-red-700 hover:text-white hover:shadow-md"
                } ${sidebarCollapsed ? "justify-center" : ""}`}
              >
                <IconComponent className="h-6 w-6" />
                {!sidebarCollapsed && <span className="ml-4 font-medium">{header.title}</span>}
              </button>
            )
          })}
        </nav>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Top Bar */}
        <header className="flex items-center justify-between p-4 bg-white border-b shadow-lg">
          <div className="flex items-center">
            <h2 className="text-2xl font-semibold text-gray-800">
              {MAIN_HEADERS.find((h) => h.id === activeHeader)?.title}
            </h2>
          </div>
          <div className="flex items-center gap-6">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
              <Input placeholder="Search..." className="pl-10 w-64 border-gray-300 focus:border-red-500 focus:ring-red-500" />
            </div>
            <Button variant="ghost" size="icon" onClick={() => setShowTools(true)} className="hover:bg-red-50">
              <Wrench className="h-6 w-6 text-gray-600" />
            </Button>
            <div className="relative">
              <Button variant="ghost" size="icon" onClick={() => setShowUserMenu(!showUserMenu)} className="hover:bg-red-50">
                <img
                  src={userProfile.avatar}
                  alt="User Avatar"
                  className="h-10 w-10 rounded-full border-2 border-red-800 shadow-md"
                />
              </Button>
              {showUserMenu && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-xl z-50 border border-gray-200">
                  <div className="p-4 border-b bg-gradient-to-r from-red-50 to-red-100">
                    <p className="font-semibold text-gray-800">{userProfile.name}</p>
                    <p className="text-sm text-gray-600">{userProfile.role}</p>
                  </div>
                  <div className="py-2">
                    <button
                      onClick={() => handleHeaderChange("account")}
                      className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-red-50 hover:text-red-800 transition-colors"
                    >
                      My Profile
                    </button>
                    <button
                      onClick={() => setShowSettings(true)}
                      className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-red-50 hover:text-red-800 transition-colors"
                    >
                      Settings
                    </button>
                    <button className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-red-50 hover:text-red-800 transition-colors">
                      Logout
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 p-6 overflow-y-auto bg-gradient-to-br from-gray-50 to-gray-100">{getPageContent()}</main>
      </div>

      {/* Settings Modal */}
      {showSettings && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <Card className="w-full max-w-lg mx-4">
            <CardHeader>
              <CardTitle>Settings</CardTitle>
              <CardDescription>Manage your application settings</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Theme</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select theme" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="light">Light</SelectItem>
                    <SelectItem value="dark">Dark</SelectItem>
                    <SelectItem value="system">System</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Notifications</Label>
                <div className="flex items-center space-x-2">
                  <input type="checkbox" id="email-notifications" defaultChecked />
                  <Label htmlFor="email-notifications">Email Notifications</Label>
                </div>
              </div>
            </CardContent>
            <div className="flex justify-end gap-4 p-6 border-t">
              <Button variant="outline" onClick={() => setShowSettings(false)}>
                Cancel
              </Button>
              <Button className="bg-red-800 hover:bg-red-900">Save</Button>
            </div>
          </Card>
        </div>
      )}

      {/* DCA Script Modal */}
      {showNewEScript && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg w-full max-w-4xl max-h-[90vh] overflow-hidden">
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b bg-gradient-to-r from-red-800 to-red-600 text-white">
              <div>
                <h2 className="text-2xl font-bold">DCA Script</h2>
                <p className="text-red-100">Digital Controlled Access Prescription</p>
              </div>
              <Button variant="ghost" size="icon" onClick={() => setShowNewEScript(false)} className="text-white hover:bg-red-700">
                <X className="h-5 w-5" />
              </Button>
            </div>

            {/* Content */}
            <div className="p-6 overflow-y-auto max-h-[70vh]">
              <div className="text-center py-8">
                <Pill className="h-16 w-16 mx-auto mb-4 text-red-600" />
                <h3 className="text-xl font-semibold mb-2">DCA Script Form</h3>
                <p className="text-gray-600 mb-6">Comprehensive prescription form for controlled substances</p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-2xl mx-auto">
                  <Card className="p-4">
                    <div className="flex items-center gap-3 mb-3">
                      <User className="h-5 w-5 text-blue-600" />
                      <h4 className="font-semibold">Patient Information</h4>
                    </div>
                    <p className="text-sm text-gray-600">Enter patient details, contact information, and insurance</p>
                  </Card>
                  
                  <Card className="p-4">
                    <div className="flex items-center gap-3 mb-3">
                      <Stethoscope className="h-5 w-5 text-green-600" />
                      <h4 className="font-semibold">Prescriber Details</h4>
                    </div>
                    <p className="text-sm text-gray-600">Doctor information, NPI, DEA numbers, and practice details</p>
                  </Card>
                  
                  <Card className="p-4">
                    <div className="flex items-center gap-3 mb-3">
                      <Pill className="h-5 w-5 text-purple-600" />
                      <h4 className="font-semibold">Medication Details</h4>
                    </div>
                    <p className="text-sm text-gray-600">Drug information, dosage, directions, and special requirements</p>
                  </Card>
                  
                  <Card className="p-4">
                    <div className="flex items-center gap-3 mb-3">
                      <Building className="h-5 w-5 text-orange-600" />
                      <h4 className="font-semibold">Pharmacy Information</h4>
                    </div>
                    <p className="text-sm text-gray-600">Target pharmacy details and contact information</p>
                  </Card>
                </div>
                
                <div className="mt-8">
                  <Button 
                    className="bg-red-800 hover:bg-red-900 px-8 py-3"
                    onClick={() => {
                      // This would open the full form
                      alert("Full DCA Script form would open here with 5-step wizard")
                    }}
                  >
                    Start DCA Script
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Missing Information Alert Modal */}
      {showMissingInfoModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg w-full max-w-6xl max-h-[90vh] overflow-hidden">
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b bg-gradient-to-r from-red-800 to-red-600 text-white">
              <div>
                <h2 className="text-2xl font-bold">Missing Information Alert</h2>
                <p className="text-red-100">Pharmacy orders requiring additional information</p>
              </div>
              <Button variant="ghost" size="icon" onClick={() => setShowMissingInfoModal(false)} className="text-white hover:bg-red-700">
                <X className="h-5 w-5" />
              </Button>
            </div>

            {/* Content */}
            <div className="p-6 overflow-y-auto max-h-[70vh]">
              {!showMissingDetails ? (
                // Orders List View
                <div className="space-y-4">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-lg font-semibold">Orders with Missing Information ({missingInfoOrders.length})</h3>
                    <div className="flex items-center gap-2">
                      <Badge className="bg-red-100 text-red-800">Total Income: ${missingInfoOrders.reduce((sum, order) => sum + parseFloat(order.income.replace('$', '')), 0).toFixed(2)}</Badge>
                    </div>
                  </div>
                  
                  <div className="grid gap-4">
                    {missingInfoOrders.map((order) => (
                      <Card key={order.id} className="hover:shadow-md transition-shadow cursor-pointer" onClick={() => {
                        setSelectedMissingOrder(order)
                        setShowMissingDetails(true)
                      }}>
                        <CardContent className="p-4">
                          <div className="flex items-center justify-between">
                            <div className="flex-1">
                              <div className="flex items-center gap-3 mb-2">
                                <Badge variant="outline" className="text-xs">{order.id}</Badge>
                                <h4 className="font-semibold">{order.patientName}</h4>
                                <Badge className="bg-red-100 text-red-800 text-xs">{order.missingInfo.length} missing fields</Badge>
                              </div>
                              <p className="text-sm text-gray-600 mb-1">{order.medication}</p>
                              <p className="text-xs text-gray-500">Order Date: {order.orderDate}</p>
                            </div>
                            <div className="text-right">
                              <p className="text-lg font-bold text-green-600">{order.income}</p>
                              <p className="text-xs text-gray-500">Income</p>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              ) : (
                // Missing Details View
                <div className="space-y-6">
                  <div className="flex items-center gap-4 mb-6">
                    <Button variant="outline" size="sm" onClick={() => setShowMissingDetails(false)}>
                      <ArrowLeft className="h-4 w-4 mr-2" />
                      Back to Orders
                    </Button>
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold">Missing Information for {selectedMissingOrder?.patientName}</h3>
                      <p className="text-sm text-gray-600">{selectedMissingOrder?.medication} - {selectedMissingOrder?.id}</p>
                    </div>
                    <Badge className="bg-green-100 text-green-800">{selectedMissingOrder?.income}</Badge>
                  </div>

                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <AlertTriangle className="h-5 w-5 text-red-600" />
                        Required Information
                      </CardTitle>
                      <CardDescription>Complete the following information to process this order</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {selectedMissingOrder?.missingInfo.map((info: any, index: number) => (
                          <div key={index} className="border rounded-lg p-4">
                            <div className="flex items-center justify-between mb-2">
                              <div className="flex items-center gap-2">
                                <h4 className="font-medium">{info.field}</h4>
                                {info.required && <Badge className="bg-red-100 text-red-800 text-xs">Required</Badge>}
                                {!info.required && <Badge className="bg-yellow-100 text-yellow-800 text-xs">Optional</Badge>}
                              </div>
                            </div>
                            <p className="text-sm text-gray-600 mb-3">{info.description}</p>
                            <div className="space-y-2">
                              <Label htmlFor={`field-${index}`}>{info.field}</Label>
                              <Input 
                                id={`field-${index}`}
                                placeholder={`Enter ${info.field.toLowerCase()}`}
                                className="w-full"
                              />
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>

                  <div className="flex justify-end gap-4 pt-4 border-t">
                    <Button variant="outline" onClick={() => setShowMissingDetails(false)}>
                      Cancel
                    </Button>
                    <Button className="bg-red-800 hover:bg-red-900">
                      <CheckCircle className="h-4 w-4 mr-2" />
                      Complete Order
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* New Rx Order Modal */}
      {showNewRxModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg w-full max-w-4xl max-h-[90vh] overflow-hidden">
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b bg-gradient-to-r from-red-800 to-red-600 text-white">
              <div>
                <h2 className="text-2xl font-bold">New Rx Order</h2>
                <p className="text-red-100">Step {newRxStep} of 4</p>
              </div>
              <Button variant="ghost" size="icon" onClick={() => setShowNewRxModal(false)} className="text-white hover:bg-red-700">
                <X className="h-5 w-5" />
              </Button>
            </div>

            {/* Content */}
            <div className="p-6 overflow-y-auto max-h-[70vh]">
              {newRxStep === 1 && (
                // Step 1: Patient Search/New Patient
                <div className="space-y-6">
                  <div className="text-center mb-6">
                    <User className="h-12 w-12 mx-auto mb-4 text-red-600" />
                    <h3 className="text-xl font-semibold mb-2">Patient Information</h3>
                    <p className="text-gray-600">Search for existing patient or create a new one</p>
                  </div>

                  <Card>
                    <CardHeader>
                      <CardTitle>Patient Search</CardTitle>
                      <CardDescription>Search for existing patients or create a new one</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex gap-4">
                        <div className="flex-1">
                          <Label>Search Patients</Label>
                          <div className="flex gap-2 mt-2">
                            <Input
                              placeholder="Enter patient name, email, or phone"
                              value={newRxData.patientSearch}
                              onChange={(e) => setNewRxData(prev => ({ ...prev, patientSearch: e.target.value }))}
                            />
                            <Button variant="outline">
                              <Search className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                        <div className="flex items-end">
                          <Button 
                            variant="outline"
                            onClick={() => setNewRxData(prev => ({ ...prev, isNewPatient: true }))}
                          >
                            <Plus className="h-4 w-4 mr-2" />
                            New Patient
                          </Button>
                        </div>
                      </div>

                      {/* Sample search results */}
                      {newRxData.patientSearch && !newRxData.isNewPatient && (
                        <div className="border rounded-lg p-4">
                          <h4 className="font-medium mb-3">Search Results</h4>
                          <div className="space-y-2">
                            {allPatients.filter(p => 
                              p.name.toLowerCase().includes(newRxData.patientSearch.toLowerCase()) ||
                              p.email.toLowerCase().includes(newRxData.patientSearch.toLowerCase())
                            ).slice(0, 3).map((patient) => (
                              <div 
                                key={patient.id}
                                className="flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50 cursor-pointer"
                                onClick={() => setNewRxData(prev => ({ ...prev, selectedPatient: patient }))}
                              >
                                <div>
                                  <p className="font-medium">{patient.name}</p>
                                  <p className="text-sm text-gray-600">{patient.email}</p>
                                </div>
                                <Badge className={patient.status === "Active" ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"}>
                                  {patient.status}
                                </Badge>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* New Patient Form */}
                      {newRxData.isNewPatient && (
                        <div className="border rounded-lg p-4 bg-blue-50">
                          <h4 className="font-medium mb-3 text-blue-800">New Patient Information</h4>
                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <Label>First Name</Label>
                              <Input placeholder="First name" />
                            </div>
                            <div>
                              <Label>Last Name</Label>
                              <Input placeholder="Last name" />
                            </div>
                            <div>
                              <Label>Email</Label>
                              <Input placeholder="Email address" />
                            </div>
                            <div>
                              <Label>Phone</Label>
                              <Input placeholder="Phone number" />
                            </div>
                          </div>
                        </div>
                      )}

                      {newRxData.selectedPatient && (
                        <div className="border rounded-lg p-4 bg-green-50">
                          <h4 className="font-medium mb-2 text-green-800">Selected Patient</h4>
                          <p className="font-medium">{newRxData.selectedPatient.name}</p>
                          <p className="text-sm text-gray-600">{newRxData.selectedPatient.email}</p>
                        </div>
                      )}
                    </CardContent>
                  </Card>

                  <div className="flex justify-end">
                    <Button 
                      className="bg-red-800 hover:bg-red-900"
                      disabled={!newRxData.selectedPatient && !newRxData.isNewPatient}
                      onClick={() => setNewRxStep(2)}
                    >
                      Next: Add Rx
                      <ArrowRight className="h-4 w-4 ml-2" />
                    </Button>
                  </div>
                </div>
              )}

              {newRxStep === 2 && (
                // Step 2: Add Rx Details
                <div className="space-y-6">
                  <div className="text-center mb-6">
                    <Pill className="h-12 w-12 mx-auto mb-4 text-red-600" />
                    <h3 className="text-xl font-semibold mb-2">Prescription Details</h3>
                    <p className="text-gray-600">Enter medication and prescription information</p>
                  </div>

                  <Card>
                    <CardHeader>
                      <CardTitle>Prescription Information</CardTitle>
                      <CardDescription>Complete prescription details</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label>Medication</Label>
                          <Input 
                            placeholder="e.g., Metformin"
                            value={newRxData.rxDetails.medication}
                            onChange={(e) => setNewRxData(prev => ({ 
                              ...prev, 
                              rxDetails: { ...prev.rxDetails, medication: e.target.value }
                            }))}
                          />
                        </div>
                        <div>
                          <Label>Strength</Label>
                          <Input 
                            placeholder="e.g., 500mg"
                            value={newRxData.rxDetails.strength}
                            onChange={(e) => setNewRxData(prev => ({ 
                              ...prev, 
                              rxDetails: { ...prev.rxDetails, strength: e.target.value }
                            }))}
                          />
                        </div>
                        <div>
                          <Label>Quantity</Label>
                          <Input 
                            placeholder="e.g., 30"
                            value={newRxData.rxDetails.quantity}
                            onChange={(e) => setNewRxData(prev => ({ 
                              ...prev, 
                              rxDetails: { ...prev.rxDetails, quantity: e.target.value }
                            }))}
                          />
                        </div>
                        <div>
                          <Label>Refills</Label>
                          <Input 
                            placeholder="e.g., 2"
                            value={newRxData.rxDetails.refills}
                            onChange={(e) => setNewRxData(prev => ({ 
                              ...prev, 
                              rxDetails: { ...prev.rxDetails, refills: e.target.value }
                            }))}
                          />
                        </div>
                        <div className="col-span-2">
                          <Label>Directions</Label>
                          <Textarea 
                            placeholder="e.g., Take 1 tablet by mouth twice daily with meals"
                            value={newRxData.rxDetails.directions}
                            onChange={(e) => setNewRxData(prev => ({ 
                              ...prev, 
                              rxDetails: { ...prev.rxDetails, directions: e.target.value }
                            }))}
                          />
                        </div>
                        <div className="col-span-2">
                          <Label>Prescriber</Label>
                          <Input 
                            placeholder="e.g., Dr. Smith"
                            value={newRxData.rxDetails.prescriber}
                            onChange={(e) => setNewRxData(prev => ({ 
                              ...prev, 
                              rxDetails: { ...prev.rxDetails, prescriber: e.target.value }
                            }))}
                          />
                        </div>
                        <div className="col-span-2">
                          <div className="flex items-center space-x-2">
                            <Checkbox 
                              id="daw"
                              checked={newRxData.rxDetails.daw}
                              onCheckedChange={(checked) => setNewRxData(prev => ({ 
                                ...prev, 
                                rxDetails: { ...prev.rxDetails, daw: checked as boolean }
                              }))}
                            />
                            <Label htmlFor="daw">Dispense As Written (DAW)</Label>
                          </div>
                        </div>
                        <div className="col-span-2">
                          <Label>Priority</Label>
                          <Select 
                            value={newRxData.rxDetails.priority}
                            onValueChange={(value) => setNewRxData(prev => ({ 
                              ...prev, 
                              rxDetails: { ...prev.rxDetails, priority: value }
                            }))}
                          >
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="routine">Routine</SelectItem>
                              <SelectItem value="urgent">Urgent</SelectItem>
                              <SelectItem value="stat">STAT</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="col-span-2">
                          <Label>Notes</Label>
                          <Textarea 
                            placeholder="Additional notes or special instructions"
                            value={newRxData.rxDetails.notes}
                            onChange={(e) => setNewRxData(prev => ({ 
                              ...prev, 
                              rxDetails: { ...prev.rxDetails, notes: e.target.value }
                            }))}
                          />
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <div className="flex justify-between">
                    <Button variant="outline" onClick={() => setNewRxStep(1)}>
                      <ArrowLeft className="h-4 w-4 mr-2" />
                      Back
                    </Button>
                    <Button 
                      className="bg-red-800 hover:bg-red-900"
                      disabled={!newRxData.rxDetails.medication || !newRxData.rxDetails.strength}
                      onClick={() => setNewRxStep(3)}
                    >
                      Next: Bill/Ship Preference
                      <ArrowRight className="h-4 w-4 ml-2" />
                    </Button>
                  </div>
                </div>
              )}

              {newRxStep === 3 && (
                // Step 3: Bill/Ship Preference
                <div className="space-y-6">
                  <div className="text-center mb-6">
                    <CreditCard className="h-12 w-12 mx-auto mb-4 text-red-600" />
                    <h3 className="text-xl font-semibold mb-2">Bill/Ship Preference</h3>
                    <p className="text-gray-600">Choose billing and shipping preferences</p>
                  </div>

                  <Card>
                    <CardHeader>
                      <CardTitle>Select Preference</CardTitle>
                      <CardDescription>Choose how to handle billing and shipping</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <RadioGroup 
                        value={newRxData.billShipPreference}
                        onValueChange={(value) => setNewRxData(prev => ({ ...prev, billShipPreference: value }))}
                        className="space-y-4"
                      >
                        <div className="flex items-center space-x-2 p-4 border rounded-lg hover:bg-gray-50">
                          <RadioGroupItem value="bfsp" id="bfsp" />
                          <Label htmlFor="bfsp" className="flex-1 cursor-pointer">
                            <div className="font-medium">Bill First, Ship First (BF/SP)</div>
                            <div className="text-sm text-gray-600">Bill patient first, then ship when payment is received</div>
                          </Label>
                        </div>
                        <div className="flex items-center space-x-2 p-4 border rounded-lg hover:bg-gray-50">
                          <RadioGroupItem value="bssp" id="bssp" />
                          <Label htmlFor="bssp" className="flex-1 cursor-pointer">
                            <div className="font-medium">Bill Second, Ship First (BS/SP)</div>
                            <div className="text-sm text-gray-600">Ship first, then bill patient</div>
                          </Label>
                        </div>
                        <div className="flex items-center space-x-2 p-4 border rounded-lg hover:bg-gray-50">
                          <RadioGroupItem value="bssf" id="bssf" />
                          <Label htmlFor="bssf" className="flex-1 cursor-pointer">
                            <div className="font-medium">Bill Second, Ship Second (BS/SF)</div>
                            <div className="text-sm text-gray-600">Bill and ship after processing</div>
                          </Label>
                        </div>
                      </RadioGroup>
                    </CardContent>
                  </Card>

                  <div className="flex justify-between">
                    <Button variant="outline" onClick={() => setNewRxStep(2)}>
                      <ArrowLeft className="h-4 w-4 mr-2" />
                      Back
                    </Button>
                    <Button 
                      className="bg-red-800 hover:bg-red-900"
                      disabled={!newRxData.billShipPreference}
                      onClick={() => setNewRxStep(4)}
                    >
                      Next: Review & Complete
                      <ArrowRight className="h-4 w-4 ml-2" />
                    </Button>
                  </div>
                </div>
              )}

              {newRxStep === 4 && (
                // Step 4: Review and Routing
                <div className="space-y-6">
                  <div className="text-center mb-6">
                    <CheckCircle className="h-12 w-12 mx-auto mb-4 text-red-600" />
                    <h3 className="text-xl font-semibold mb-2">Review & Complete</h3>
                    <p className="text-gray-600">Review order details and complete routing</p>
                  </div>

                  <Card>
                    <CardHeader>
                      <CardTitle>Order Summary</CardTitle>
                      <CardDescription>Review the order details before completing</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <h4 className="font-medium mb-2">Patient Information</h4>
                          <p className="text-sm text-gray-600">
                            {newRxData.selectedPatient ? newRxData.selectedPatient.name : "New Patient"}
                          </p>
                        </div>
                        <div>
                          <h4 className="font-medium mb-2">Prescription</h4>
                          <p className="text-sm text-gray-600">
                            {newRxData.rxDetails.medication} {newRxData.rxDetails.strength}
                          </p>
                        </div>
                        <div>
                          <h4 className="font-medium mb-2">Quantity</h4>
                          <p className="text-sm text-gray-600">{newRxData.rxDetails.quantity}</p>
                        </div>
                        <div>
                          <h4 className="font-medium mb-2">Bill/Ship Preference</h4>
                          <p className="text-sm text-gray-600">{newRxData.billShipPreference}</p>
                        </div>
                      </div>

                      {/* BF/SP Specific Options */}
                      {newRxData.billShipPreference === "bfsp" && (
                        <div className="border rounded-lg p-4 bg-yellow-50">
                          <h4 className="font-medium mb-3 text-yellow-800">BF/SP Options</h4>
                          <RadioGroup 
                            value={newRxData.existingPatientOption}
                            onValueChange={(value) => setNewRxData(prev => ({ ...prev, existingPatientOption: value }))}
                            className="space-y-3"
                          >
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="existing" id="existing" />
                              <Label htmlFor="existing" className="cursor-pointer">
                                <div className="font-medium">Existing Patient</div>
                                <div className="text-sm text-gray-600">Put on hold and notify patient</div>
                              </Label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="new" id="new-patient" />
                              <Label htmlFor="new-patient" className="cursor-pointer">
                                <div className="font-medium">New Patient</div>
                                <div className="text-sm text-gray-600">Put on hold, welcome notify and payment outreach</div>
                              </Label>
                            </div>
                          </RadioGroup>
                        </div>
                      )}

                      {/* Routing Information */}
                      <div className="border rounded-lg p-4 bg-blue-50">
                        <h4 className="font-medium mb-2 text-blue-800">Routing Information</h4>
                        {newRxData.billShipPreference === "bfsp" ? (
                          <p className="text-sm text-blue-700">
                            Order will be put on hold with patient notification based on selection.
                          </p>
                        ) : (
                          <p className="text-sm text-blue-700">
                            Order will be auto-routed to Office Order Queue for processing.
                          </p>
                        )}
                      </div>
                    </CardContent>
                  </Card>

                  <div className="flex justify-between">
                    <Button variant="outline" onClick={() => setNewRxStep(3)}>
                      <ArrowLeft className="h-4 w-4 mr-2" />
                      Back
                    </Button>
                    <Button 
                      className="bg-red-800 hover:bg-red-900"
                      disabled={newRxData.billShipPreference === "bfsp" && !newRxData.existingPatientOption}
                      onClick={() => {
                        // Handle order completion
                        alert(`Order completed! Routing: ${newRxData.billShipPreference === "bfsp" ? "On Hold with Notification" : "Auto-routed to Office Order Queue"}`)
                        setShowNewRxModal(false)
                      }}
                    >
                      <CheckCircle className="h-4 w-4 mr-2" />
                      Complete Order
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* In Progress Rx Modal */}
      {showInProgressRx && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg w-full max-w-7xl max-h-[90vh] overflow-hidden">
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b bg-gradient-to-r from-red-800 to-red-600 text-white">
              <div>
                <h2 className="text-2xl font-bold">In Progress Prescriptions</h2>
                <p className="text-red-100">Patient Rx - Active Orders</p>
              </div>
              <Button variant="ghost" size="icon" onClick={() => setShowInProgressRx(false)} className="text-white hover:bg-red-700">
                <X className="h-5 w-5" />
              </Button>
            </div>

            {/* Content */}
            <div className="p-6 overflow-y-auto max-h-[70vh]">
              {/* Filters */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                <div>
                  <Label>Date Range</Label>
                  <Select value={inProgressDate} onValueChange={setInProgressDate}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="today">Today</SelectItem>
                      <SelectItem value="yesterday">Yesterday</SelectItem>
                      <SelectItem value="week">This Week</SelectItem>
                      <SelectItem value="month">This Month</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label>Prescriber</Label>
                  <Select value={selectedPrescriber} onValueChange={setSelectedPrescriber}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Prescribers</SelectItem>
                      <SelectItem value="Dr. Johnson">Dr. Johnson</SelectItem>
                      <SelectItem value="Dr. Williams">Dr. Williams</SelectItem>
                      <SelectItem value="Dr. Brown">Dr. Brown</SelectItem>
                      <SelectItem value="Dr. Davis">Dr. Davis</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label>Status</Label>
                  <Select value={selectedStatus} onValueChange={setSelectedStatus}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Status</SelectItem>
                      <SelectItem value="waiting for input">Waiting for Input</SelectItem>
                      <SelectItem value="waiting for payment">Waiting for Payment</SelectItem>
                      <SelectItem value="missing information">Missing Information</SelectItem>
                      <SelectItem value="pre-check">Pre-Check</SelectItem>
                      <SelectItem value="being filled">Being Filled</SelectItem>
                      <SelectItem value="complete">Complete</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex items-end">
                  <Button variant="outline" className="w-full">
                    <Search className="h-4 w-4 mr-2" />
                    Search
                  </Button>
                </div>
              </div>

              {/* Prescriptions Table */}
              <Card>
                <CardHeader>
                  <CardTitle>Prescriptions ({inProgressPrescriptions.filter(rx => 
                    (selectedPrescriber === "all" || rx.prescriber === selectedPrescriber) &&
                    (selectedStatus === "all" || rx.status === selectedStatus) &&
                    (inProgressDate === "today" ? rx.date === "12/18/2024" : true)
                  ).length})</CardTitle>
                  <CardDescription>Manage in-progress prescriptions</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {inProgressPrescriptions
                      .filter(rx => 
                        (selectedPrescriber === "all" || rx.prescriber === selectedPrescriber) &&
                        (selectedStatus === "all" || rx.status === selectedStatus) &&
                        (inProgressDate === "today" ? rx.date === "12/18/2024" : true)
                      )
                      .map((rx) => (
                        <div key={rx.id} className="border rounded-lg p-4 hover:bg-gray-50">
                          <div className="flex items-center justify-between mb-3">
                            <div className="flex items-center gap-3">
                              <Badge variant="outline" className="text-xs">{rx.id}</Badge>
                              <h4 className="font-semibold">{rx.patientName}</h4>
                              <Badge className={getStatusColor(rx.status)}>{rx.status}</Badge>
                              {rx.priority === "urgent" && (
                                <Badge className="bg-red-100 text-red-800">Urgent</Badge>
                              )}
                              {rx.daw && (
                                <Badge className="bg-purple-100 text-purple-800">DAW</Badge>
                              )}
                            </div>
                            <div className="text-right">
                              <p className="text-sm text-gray-600">{rx.prescriber}</p>
                              <p className="text-xs text-gray-500">{rx.date}</p>
                            </div>
                          </div>
                          
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-3">
                            <div>
                              <p className="text-sm font-medium">{rx.medication}</p>
                              <p className="text-xs text-gray-600">Qty: {rx.quantity} | Refills: {rx.refills}</p>
                            </div>
                            <div>
                              <p className="text-sm text-gray-600">{rx.directions}</p>
                            </div>
                            <div>
                              {rx.notes && (
                                <p className="text-xs text-gray-500 italic">"{rx.notes}"</p>
                              )}
                            </div>
                          </div>

                          {/* Action Buttons */}
                          <div className="flex flex-wrap gap-2 pt-3 border-t">
                            <Button variant="outline" size="sm">
                              <Edit className="h-3 w-3 mr-1" />
                              Edit
                            </Button>
                            <Button variant="outline" size="sm">
                              <User className="h-3 w-3 mr-1" />
                              Patient Updated
                            </Button>
                            <Button variant="outline" size="sm">
                              <Pill className="h-3 w-3 mr-1" />
                              Edit Rx
                            </Button>
                            <Button variant="outline" size="sm">
                              <CreditCard className="h-3 w-3 mr-1" />
                              Bill/Ship
                            </Button>
                            <Button variant="outline" size="sm">
                              <Pause className="h-3 w-3 mr-1" />
                              Cancel & Hold
                            </Button>
                            <Button variant="outline" size="sm">
                              <X className="h-3 w-3 mr-1" />
                              Discontinue
                            </Button>
                            <Button variant="outline" size="sm">
                              <Calendar className="h-3 w-3 mr-1" />
                              Future Fill
                            </Button>
                          </div>
                        </div>
                      ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      )}

      {/* Rx Forms Modal */}
      {showRxFormModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg w-full max-w-6xl max-h-[90vh] overflow-hidden">
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b bg-gradient-to-r from-red-800 to-red-600 text-white">
              <div>
                <h2 className="text-2xl font-bold">Electronic Prescription Form</h2>
                <p className="text-red-100">Pharmacy Fulfillment Request</p>
              </div>
              <Button variant="ghost" size="icon" onClick={() => setShowRxFormModal(false)} className="text-white hover:bg-red-700">
                <X className="h-5 w-5" />
              </Button>
            </div>

            {/* Content */}
            <div className="p-6 overflow-y-auto max-h-[70vh]">
              <div className="space-y-6">
                {/* External ID */}
                <Card>
                  <CardHeader>
                    <CardTitle>Form Identification</CardTitle>
                    <CardDescription>Unique identifier for this prescription request</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <Label>External ID</Label>
                        <Input 
                          placeholder="Enter external ID"
                          value={rxFormData.external_id}
                          onChange={(e) => setRxFormData(prev => ({ ...prev, external_id: e.target.value }))}
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Patient Information */}
                <Card>
                  <CardHeader>
                    <CardTitle>Patient Information</CardTitle>
                    <CardDescription>Patient details for the prescription</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label>First Name</Label>
                        <Input 
                          placeholder="First name"
                          value={rxFormData.patient.first_name}
                          onChange={(e) => setRxFormData(prev => ({ 
                            ...prev, 
                            patient: { ...prev.patient, first_name: e.target.value }
                          }))}
                        />
                      </div>
                      <div>
                        <Label>Last Name</Label>
                        <Input 
                          placeholder="Last name"
                          value={rxFormData.patient.last_name}
                          onChange={(e) => setRxFormData(prev => ({ 
                            ...prev, 
                            patient: { ...prev.patient, last_name: e.target.value }
                          }))}
                        />
                      </div>
                      <div>
                        <Label>Gender</Label>
                        <Select 
                          value={rxFormData.patient.gender}
                          onValueChange={(value) => setRxFormData(prev => ({ 
                            ...prev, 
                            patient: { ...prev.patient, gender: value as "male" | "female" }
                          }))}
                        >
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="male">Male</SelectItem>
                            <SelectItem value="female">Female</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label>Date of Birth</Label>
                        <Input 
                          type="date"
                          value={rxFormData.patient.date_of_birth}
                          onChange={(e) => setRxFormData(prev => ({ 
                            ...prev, 
                            patient: { ...prev.patient, date_of_birth: e.target.value }
                          }))}
                        />
                      </div>
                      <div>
                        <Label>Phone Number</Label>
                        <Input 
                          placeholder="Phone number"
                          value={rxFormData.patient.phone_number}
                          onChange={(e) => setRxFormData(prev => ({ 
                            ...prev, 
                            patient: { ...prev.patient, phone_number: e.target.value }
                          }))}
                        />
                      </div>
                      <div>
                        <Label>Email</Label>
                        <Input 
                          type="email"
                          placeholder="Email address"
                          value={rxFormData.patient.email}
                          onChange={(e) => setRxFormData(prev => ({ 
                            ...prev, 
                            patient: { ...prev.patient, email: e.target.value }
                          }))}
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Provider Information */}
                <Card>
                  <CardHeader>
                    <CardTitle>Provider Information</CardTitle>
                    <CardDescription>Prescriber details and contact information</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label>Provider First Name</Label>
                          <Input 
                            placeholder="First name"
                            value={rxFormData.provider.first_name}
                            onChange={(e) => setRxFormData(prev => ({ 
                              ...prev, 
                              provider: { ...prev.provider, first_name: e.target.value }
                            }))}
                          />
                        </div>
                        <div>
                          <Label>Provider Last Name</Label>
                          <Input 
                            placeholder="Last name"
                            value={rxFormData.provider.last_name}
                            onChange={(e) => setRxFormData(prev => ({ 
                              ...prev, 
                              provider: { ...prev.provider, last_name: e.target.value }
                            }))}
                          />
                        </div>
                        <div>
                          <Label>NPI Number</Label>
                          <Input 
                            placeholder="NPI number"
                            value={rxFormData.provider.npi}
                            onChange={(e) => setRxFormData(prev => ({ 
                              ...prev, 
                              provider: { ...prev.provider, npi: e.target.value }
                            }))}
                          />
                        </div>
                        <div>
                          <Label>State License Number (Optional)</Label>
                          <Input 
                            placeholder="State license number"
                            value={rxFormData.provider.state_license_number || ""}
                            onChange={(e) => setRxFormData(prev => ({ 
                              ...prev, 
                              provider: { ...prev.provider, state_license_number: e.target.value }
                            }))}
                          />
                        </div>
                        <div>
                          <Label>Provider Phone</Label>
                          <Input 
                            placeholder="Phone number"
                            value={rxFormData.provider.phone_number}
                            onChange={(e) => setRxFormData(prev => ({ 
                              ...prev, 
                              provider: { ...prev.provider, phone_number: e.target.value }
                            }))}
                          />
                        </div>
                        <div>
                          <Label>Provider Email</Label>
                          <Input 
                            type="email"
                            placeholder="Email address"
                            value={rxFormData.provider.email}
                            onChange={(e) => setRxFormData(prev => ({ 
                              ...prev, 
                              provider: { ...prev.provider, email: e.target.value }
                            }))}
                          />
                        </div>
                      </div>

                      {/* Provider Address */}
                      <div className="border-t pt-4">
                        <h4 className="font-medium mb-3">Provider Address</h4>
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <Label>Address Line 1</Label>
                            <Input 
                              placeholder="Street address"
                              value={rxFormData.provider.address.address_line_1}
                              onChange={(e) => setRxFormData(prev => ({ 
                                ...prev, 
                                provider: { 
                                  ...prev.provider, 
                                  address: { ...prev.provider.address, address_line_1: e.target.value }
                                }
                              }))}
                            />
                          </div>
                          <div>
                            <Label>Address Line 2</Label>
                            <Input 
                              placeholder="Apartment, suite, etc."
                              value={rxFormData.provider.address.address_line_2}
                              onChange={(e) => setRxFormData(prev => ({ 
                                ...prev, 
                                provider: { 
                                  ...prev.provider, 
                                  address: { ...prev.provider.address, address_line_2: e.target.value }
                                }
                              }))}
                            />
                          </div>
                          <div>
                            <Label>City</Label>
                            <Input 
                              placeholder="City"
                              value={rxFormData.provider.address.city}
                              onChange={(e) => setRxFormData(prev => ({ 
                                ...prev, 
                                provider: { 
                                  ...prev.provider, 
                                  address: { ...prev.provider.address, city: e.target.value }
                                }
                              }))}
                            />
                          </div>
                          <div>
                            <Label>State</Label>
                            <Input 
                              placeholder="State"
                              value={rxFormData.provider.address.state}
                              onChange={(e) => setRxFormData(prev => ({ 
                                ...prev, 
                                provider: { 
                                  ...prev.provider, 
                                  address: { ...prev.provider.address, state: e.target.value }
                                }
                              }))}
                            />
                          </div>
                          <div>
                            <Label>ZIP Code</Label>
                            <Input 
                              placeholder="ZIP code"
                              value={rxFormData.provider.address.zip_code}
                              onChange={(e) => setRxFormData(prev => ({ 
                                ...prev, 
                                provider: { 
                                  ...prev.provider, 
                                  address: { ...prev.provider.address, zip_code: e.target.value }
                                }
                              }))}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Pharmacy Address */}
                <Card>
                  <CardHeader>
                    <CardTitle>Pharmacy Address</CardTitle>
                    <CardDescription>Fulfillment pharmacy address</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label>Address Line 1</Label>
                        <Input 
                          placeholder="Street address"
                          value={rxFormData.address.address_line_1}
                          onChange={(e) => setRxFormData(prev => ({ 
                            ...prev, 
                            address: { ...prev.address, address_line_1: e.target.value }
                          }))}
                        />
                      </div>
                      <div>
                        <Label>Address Line 2</Label>
                        <Input 
                          placeholder="Apartment, suite, etc."
                          value={rxFormData.address.address_line_2}
                          onChange={(e) => setRxFormData(prev => ({ 
                            ...prev, 
                            address: { ...prev.address, address_line_2: e.target.value }
                          }))}
                        />
                      </div>
                      <div>
                        <Label>City</Label>
                        <Input 
                          placeholder="City"
                          value={rxFormData.address.city}
                          onChange={(e) => setRxFormData(prev => ({ 
                            ...prev, 
                            address: { ...prev.address, city: e.target.value }
                          }))}
                        />
                      </div>
                      <div>
                        <Label>State</Label>
                        <Input 
                          placeholder="State"
                          value={rxFormData.address.state}
                          onChange={(e) => setRxFormData(prev => ({ 
                            ...prev, 
                            address: { ...prev.address, state: e.target.value }
                          }))}
                        />
                      </div>
                      <div>
                        <Label>ZIP Code</Label>
                        <Input 
                          placeholder="ZIP code"
                          value={rxFormData.address.zip_code}
                          onChange={(e) => setRxFormData(prev => ({ 
                            ...prev, 
                            address: { ...prev.address, zip_code: e.target.value }
                          }))}
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Prescription PDF */}
                <Card>
                  <CardHeader>
                    <CardTitle>Prescription PDF</CardTitle>
                    <CardDescription>Upload or enter prescription PDF URL</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div>
                      <Label>Prescription PDF URL</Label>
                      <Input 
                        placeholder="Enter PDF URL or upload file"
                        value={rxFormData.prescription_pdf}
                        onChange={(e) => setRxFormData(prev => ({ ...prev, prescription_pdf: e.target.value }))}
                      />
                    </div>
                  </CardContent>
                </Card>

                {/* Medical Information */}
                <Card>
                  <CardHeader>
                    <CardTitle>Medical Information</CardTitle>
                    <CardDescription>Diagnosis and allergy information</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <Label>Diagnosis</Label>
                        <Textarea 
                          placeholder="Enter diagnosis information"
                          value={rxFormData.diagnosis}
                          onChange={(e) => setRxFormData(prev => ({ ...prev, diagnosis: e.target.value }))}
                        />
                      </div>
                      <div>
                        <Label>Allergies</Label>
                        <Textarea 
                          placeholder="Enter allergy information"
                          value={rxFormData.allergies}
                          onChange={(e) => setRxFormData(prev => ({ ...prev, allergies: e.target.value }))}
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Prescriptions */}
                <Card>
                  <CardHeader>
                    <CardTitle>Prescriptions</CardTitle>
                    <CardDescription>Add medications to this prescription request</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {rxFormData.PharmacyFulfillmentRxs.map((rx, index) => (
                        <div key={index} className="border rounded-lg p-4">
                          <div className="flex items-center justify-between mb-3">
                            <h4 className="font-medium">Medication {index + 1}</h4>
                            <Button 
                              variant="outline" 
                              size="sm"
                              onClick={() => {
                                const newRxs = [...rxFormData.PharmacyFulfillmentRxs]
                                newRxs.splice(index, 1)
                                setRxFormData(prev => ({ ...prev, PharmacyFulfillmentRxs: newRxs }))
                              }}
                            >
                              <X className="h-4 w-4" />
                            </Button>
                          </div>
                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <Label>Medication</Label>
                              <Input 
                                placeholder="Medication name"
                                value={rx.medication}
                                onChange={(e) => {
                                  const newRxs = [...rxFormData.PharmacyFulfillmentRxs]
                                  newRxs[index].medication = e.target.value
                                  setRxFormData(prev => ({ ...prev, PharmacyFulfillmentRxs: newRxs }))
                                }}
                              />
                            </div>
                            <div>
                              <Label>Dosage</Label>
                              <Input 
                                placeholder="e.g., 500mg"
                                value={rx.dosage}
                                onChange={(e) => {
                                  const newRxs = [...rxFormData.PharmacyFulfillmentRxs]
                                  newRxs[index].dosage = e.target.value
                                  setRxFormData(prev => ({ ...prev, PharmacyFulfillmentRxs: newRxs }))
                                }}
                              />
                            </div>
                            <div>
                              <Label>Days Supply</Label>
                              <Input 
                                type="number"
                                placeholder="30"
                                value={rx.days_supply}
                                onChange={(e) => {
                                  const newRxs = [...rxFormData.PharmacyFulfillmentRxs]
                                  newRxs[index].days_supply = parseInt(e.target.value) || 0
                                  setRxFormData(prev => ({ ...prev, PharmacyFulfillmentRxs: newRxs }))
                                }}
                              />
                            </div>
                            <div>
                              <Label>Quantity</Label>
                              <Input 
                                type="number"
                                placeholder="30"
                                value={rx.quantity}
                                onChange={(e) => {
                                  const newRxs = [...rxFormData.PharmacyFulfillmentRxs]
                                  newRxs[index].quantity = parseInt(e.target.value) || 0
                                  setRxFormData(prev => ({ ...prev, PharmacyFulfillmentRxs: newRxs }))
                                }}
                              />
                            </div>
                            <div>
                              <Label>Quantity Units</Label>
                              <Input 
                                placeholder="e.g., tablets, capsules"
                                value={rx.quantity_units}
                                onChange={(e) => {
                                  const newRxs = [...rxFormData.PharmacyFulfillmentRxs]
                                  newRxs[index].quantity_units = e.target.value
                                  setRxFormData(prev => ({ ...prev, PharmacyFulfillmentRxs: newRxs }))
                                }}
                              />
                            </div>
                            <div>
                              <Label>Refills</Label>
                              <Input 
                                type="number"
                                placeholder="2"
                                value={rx.refills}
                                onChange={(e) => {
                                  const newRxs = [...rxFormData.PharmacyFulfillmentRxs]
                                  newRxs[index].refills = parseInt(e.target.value) || 0
                                  setRxFormData(prev => ({ ...prev, PharmacyFulfillmentRxs: newRxs }))
                                }}
                              />
                            </div>
                            <div className="col-span-2">
                              <Label>Instructions</Label>
                              <Textarea 
                                placeholder="e.g., Take 1 tablet twice daily with meals"
                                value={rx.instructions}
                                onChange={(e) => {
                                  const newRxs = [...rxFormData.PharmacyFulfillmentRxs]
                                  newRxs[index].instructions = e.target.value
                                  setRxFormData(prev => ({ ...prev, PharmacyFulfillmentRxs: newRxs }))
                                }}
                              />
                            </div>
                          </div>
                        </div>
                      ))}
                      <Button 
                        variant="outline"
                        onClick={() => {
                          const newRx: PharmacyFulfillmentRx = {
                            medication: "",
                            dosage: "",
                            days_supply: 0,
                            quantity: 0,
                            instructions: "",
                            refills: 0,
                            quantity_units: ""
                          }
                          setRxFormData(prev => ({ 
                            ...prev, 
                            PharmacyFulfillmentRxs: [...prev.PharmacyFulfillmentRxs, newRx]
                          }))
                        }}
                      >
                        <Plus className="h-4 w-4 mr-2" />
                        Add Medication
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                {/* Submit Button */}
                <div className="flex justify-end gap-4 pt-4 border-t">
                  <Button variant="outline" onClick={() => setShowRxFormModal(false)}>
                    Cancel
                  </Button>
                  <Button 
                    className="bg-red-800 hover:bg-red-900"
                    onClick={() => {
                      // Handle form submission
                      console.log("Rx Form Data:", rxFormData)
                      alert("Rx Form submitted successfully!")
                      setShowRxFormModal(false)
                    }}
                  >
                    <Send className="h-4 w-4 mr-2" />
                    Submit Rx Form
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Contact Form Modal */}
      {showContactForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg w-full max-w-2xl max-h-[90vh] overflow-hidden">
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b bg-gradient-to-r from-red-800 to-red-600 text-white">
              <div>
                <h2 className="text-2xl font-bold">Add New Contact</h2>
                <p className="text-red-100">Create a new contact entry</p>
              </div>
              <Button variant="ghost" size="icon" onClick={() => setShowContactForm(false)} className="text-white hover:bg-red-700">
                <X className="h-5 w-5" />
              </Button>
            </div>

            {/* Content */}
            <div className="p-6 overflow-y-auto max-h-[70vh]">
              <div className="space-y-6">
                {/* Basic Information */}
                <Card>
                  <CardHeader>
                    <CardTitle>Basic Information</CardTitle>
                    <CardDescription>Contact details and role</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label>First Name</Label>
                        <Input placeholder="First name" />
                      </div>
                      <div>
                        <Label>Last Name</Label>
                        <Input placeholder="Last name" />
                      </div>
                      <div>
                        <Label>Email</Label>
                        <Input type="email" placeholder="Email address" />
                      </div>
                      <div>
                        <Label>Phone</Label>
                        <Input placeholder="Phone number" />
                      </div>
                      <div>
                        <Label>Role/Title</Label>
                        <Input placeholder="Job title or role" />
                      </div>
                      <div>
                        <Label>Department</Label>
                        <Select>
                          <SelectTrigger>
                            <SelectValue placeholder="Select department" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="medical">Medical</SelectItem>
                            <SelectItem value="pharmacy">Pharmacy</SelectItem>
                            <SelectItem value="it">IT</SelectItem>
                            <SelectItem value="support">Support</SelectItem>
                            <SelectItem value="admin">Administration</SelectItem>
                            <SelectItem value="external">External</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Contact Type */}
                <Card>
                  <CardHeader>
                    <CardTitle>Contact Type</CardTitle>
                    <CardDescription>Classify the contact type</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <RadioGroup defaultValue="internal">
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="internal" id="internal" />
                          <Label htmlFor="internal">Internal Contact</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="support" id="support" />
                          <Label htmlFor="support">Support Contact</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="external" id="external" />
                          <Label htmlFor="external">External Partner</Label>
                        </div>
                      </RadioGroup>
                    </div>
                  </CardContent>
                </Card>

                {/* Additional Information */}
                <Card>
                  <CardHeader>
                    <CardTitle>Additional Information</CardTitle>
                    <CardDescription>Notes and priority settings</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <Label>Priority Level</Label>
                        <Select>
                          <SelectTrigger>
                            <SelectValue placeholder="Select priority" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="low">Low</SelectItem>
                            <SelectItem value="medium">Medium</SelectItem>
                            <SelectItem value="high">High</SelectItem>
                            <SelectItem value="urgent">Urgent</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label>Notes</Label>
                        <Textarea placeholder="Additional notes about this contact" />
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Submit Buttons */}
                <div className="flex justify-end gap-4 pt-4 border-t">
                  <Button variant="outline" onClick={() => setShowContactForm(false)}>
                    Cancel
                  </Button>
                  <Button 
                    className="bg-red-800 hover:bg-red-900"
                    onClick={() => {
                      alert("Contact added successfully!")
                      setShowContactForm(false)
                    }}
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Add Contact
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <ToolsPopup showTools={showTools} setShowTools={setShowTools} />
    </div>
  )
}
