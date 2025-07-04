"use client"

import React, { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { CheckCircle, Building, User, Pill, Mail, Lock, Eye, EyeOff, Plus, Copy, AlertTriangle, FileText, Users, CreditCard, Package, Calendar, RefreshCw } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Checkbox } from "@/components/ui/checkbox"
import { Textarea } from "@/components/ui/textarea"

interface User {
  email: string
  password: string
  userType: 'provider' | 'facility' | 'dca-pharmacy'
  firstName?: string
  lastName?: string
  company?: string
  phone?: string
}

interface PrescribingProvider {
  id: string
  name: string
  npi: string
  dea: string
  specialty: string
  status: 'pending' | 'approved' | 'rejected'
  documents: string[]
}

interface Patient {
  id: string
  name: string
  dateOfBirth: string
  phone: string
  email: string
  address: string
}

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

interface Order {
  id: string
  patientName: string
  prescriptions: Prescription[]
  shipTo: 'SF/BP' | 'SF/BF' | 'SP/BF' | 'SP/BP'
  status: 'pending' | 'processing' | 'shipped' | 'delivered'
  createdAt: string
  totalAmount: number
}

interface UserSettings {
  provider: {
    title: string
    description: string
    icon: React.ComponentType<any>
    pages: Array<{
      id: string
      title: string
      description: string
      icon: React.ComponentType<any>
    }>
  }
  facility: {
    title: string
    description: string
    icon: React.ComponentType<any>
    pages: Array<{
      id: string
      title: string
      description: string
      icon: React.ComponentType<any>
    }>
  }
  'dca-pharmacy': {
    title: string
    description: string
    icon: React.ComponentType<any>
    pages: Array<{
      id: string
      title: string
      description: string
      icon: React.ComponentType<any>
    }>
  }
}

export default function ModernLogin() {
  const [currentView, setCurrentView] = useState<'login' | 'platform' | 'settings' | 'facility-setup' | 'facility-orders' | 'facility-dashboard' | 'provider-workflow'>('login')
  const [user, setUser] = useState<User>({
    email: '',
    password: '',
    userType: 'provider'
  })
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [selectedSettingsPage, setSelectedSettingsPage] = useState<string>('')
  const [facilitySetupStep, setFacilitySetupStep] = useState(1)
  const [prescribingProviders, setPrescribingProviders] = useState<PrescribingProvider[]>([])
  const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null)
  const [selectedPrescriptions, setSelectedPrescriptions] = useState<Prescription[]>([])
  const [shipToPreference, setShipToPreference] = useState<'SF/BP' | 'SF/BF' | 'SP/BF' | 'SP/BP'>('SF/BP')
  const [recentOrders, setRecentOrders] = useState<Order[]>([
    {
      id: '1',
      patientName: 'John Smith',
      prescriptions: [
        {
          id: '1',
          medication: 'Lisinopril 10mg',
          dosage: '1 tablet',
          frequency: 'daily',
          quantity: '30 tablets',
          refills: 2,
          expiresAt: '2024-12-31',
          status: 'active'
        }
      ],
      shipTo: 'SF/BP',
      status: 'delivered',
      createdAt: '2024-01-15',
      totalAmount: 45.99
    }
  ])
  const [providerStep, setProviderStep] = useState<1 | 2 | 3>(1)
  const [providerPatient, setProviderPatient] = useState<Patient | null>(null)
  const [providerPrescriptions, setProviderPrescriptions] = useState<Prescription[]>([])
  const [showLibraryModal, setShowLibraryModal] = useState(false)
  const [showCreatePatient, setShowCreatePatient] = useState(false)
  const [newPatient, setNewPatient] = useState<Patient & { practice?: string }>({ id: '', name: '', dateOfBirth: '', phone: '', email: '', address: '', practice: '' })
  const [newPatientPrescriptions, setNewPatientPrescriptions] = useState<Prescription[]>([])
  const exampleScripts = [
    { id: 'ex1', medication: 'Amoxicillin 500mg', dosage: '1 capsule', frequency: '3x daily', quantity: '21 capsules', refills: 0, expiresAt: '2025-01-01', status: 'active' },
    { id: 'ex2', medication: 'Atorvastatin 20mg', dosage: '1 tablet', frequency: 'once daily', quantity: '30 tablets', refills: 2, expiresAt: '2025-01-01', status: 'active' },
    { id: 'ex3', medication: 'Metformin 1000mg', dosage: '1 tablet', frequency: 'twice daily', quantity: '60 tablets', refills: 3, expiresAt: '2025-01-01', status: 'active' },
  ]

  const userSettings: UserSettings = {
    provider: {
      title: "Provider Dashboard",
      description: "Manage patients, prescriptions, and medical operations",
      icon: User,
      pages: [
        {
          id: 'profile',
          title: 'Provider Profile',
          description: 'Manage your professional information and credentials',
          icon: User
        },
        {
          id: 'patients',
          title: 'Patient Management',
          description: 'View and manage patient records and information',
          icon: User
        },
        {
          id: 'prescriptions',
          title: 'Prescription Settings',
          description: 'Configure prescription defaults and preferences',
          icon: Pill
        },
        {
          id: 'staff',
          title: 'Staff Permissions',
          description: 'Manage office staff access and permissions',
          icon: User
        },
        {
          id: 'notifications',
          title: 'Notifications',
          description: 'Configure email and SMS notification preferences',
          icon: Mail
        },
        {
          id: 'security',
          title: 'Security Settings',
          description: 'Password, 2FA, and account security settings',
          icon: Lock
        }
      ]
    },
    facility: {
      title: "Facility Dashboard",
      description: "Manage facility operations, staff, and resources",
      icon: Building,
      pages: [
        {
          id: 'facility-info',
          title: 'Facility Information',
          description: 'Update facility details and contact information',
          icon: Building
        },
        {
          id: 'staff-management',
          title: 'Staff Management',
          description: 'Manage facility staff and their roles',
          icon: User
        },
        {
          id: 'inventory',
          title: 'Inventory Settings',
          description: 'Configure inventory tracking and alerts',
          icon: Pill
        },
        {
          id: 'scheduling',
          title: 'Scheduling Settings',
          description: 'Manage appointment and scheduling preferences',
          icon: Mail
        },
        {
          id: 'billing',
          title: 'Billing & Payments',
          description: 'Configure billing and payment processing',
          icon: Lock
        },
        {
          id: 'reports',
          title: 'Reports & Analytics',
          description: 'Customize reports and analytics settings',
          icon: Building
        }
      ]
    },
    'dca-pharmacy': {
      title: "DCA Pharmacy Dashboard",
      description: "Manage pharmacy operations and prescription processing",
      icon: Pill,
      pages: [
        {
          id: 'pharmacy-info',
          title: 'Pharmacy Information',
          description: 'Update pharmacy details and licensing information',
          icon: Building
        },
        {
          id: 'prescription-processing',
          title: 'Prescription Processing',
          description: 'Configure prescription processing workflows',
          icon: Pill
        },
        {
          id: 'inventory-management',
          title: 'Inventory Management',
          description: 'Manage medication inventory and stock levels',
          icon: Pill
        },
        {
          id: 'staff-pharmacy',
          title: 'Pharmacy Staff',
          description: 'Manage pharmacy staff and their certifications',
          icon: User
        },
        {
          id: 'compliance',
          title: 'Compliance Settings',
          description: 'DEA compliance and regulatory settings',
          icon: Lock
        },
        {
          id: 'billing-pharmacy',
          title: 'Pharmacy Billing',
          description: 'Configure pharmacy billing and insurance settings',
          icon: Building
        }
      ]
    }
  }

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    
    // Simulate login process
    setTimeout(() => {
      setIsLoading(false)
      if (user.userType === 'facility') {
        setCurrentView('facility-setup')
      } else {
        setCurrentView('platform')
      }
    }, 1500)
  }

  const handleLogout = () => {
    setCurrentView('login')
    setUser({ email: '', password: '', userType: 'provider' })
    setSelectedSettingsPage('')
    setFacilitySetupStep(1)
  }

  const handleSettingsClick = (pageId: string) => {
    setSelectedSettingsPage(pageId)
    setCurrentView('settings')
  }

  const handleFacilitySetupComplete = () => {
    setCurrentView('facility-dashboard')
  }

  const handleCreateOrder = () => {
    setCurrentView('facility-orders')
  }

  const handleDuplicateOrder = (order: Order) => {
    setSelectedPatient({
      id: 'duplicate',
      name: order.patientName,
      dateOfBirth: '',
      phone: '',
      email: '',
      address: ''
    })
    setSelectedPrescriptions(order.prescriptions)
    setShipToPreference(order.shipTo)
    setCurrentView('facility-orders')
  }

  const handleRenewPrescription = (prescription: Prescription) => {
    // Simulate prescription renewal
    const renewedPrescription = {
      ...prescription,
      refills: prescription.refills + 3,
      expiresAt: '2025-12-31',
      status: 'active' as const
    }
    setSelectedPrescriptions(prev => 
      prev.map(p => p.id === prescription.id ? renewedPrescription : p)
    )
  }

  // Helper to create a full Patient object
  function makePatient(partial: Partial<Patient>): Patient {
    return {
      id: partial.id || Date.now().toString(),
      name: partial.name || '',
      dateOfBirth: partial.dateOfBirth || '',
      phone: partial.phone || '',
      email: partial.email || '',
      address: partial.address || '',
    }
  }

  if (currentView === 'login') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 flex items-center justify-center p-4">
        <div className="absolute top-4 left-4">
          <Button 
            variant="outline" 
            onClick={() => window.location.href = '/'}
            className="border-gray-300 text-gray-700 hover:bg-gray-50"
          >
            ← Back to Main Portal
          </Button>
        </div>
        <div className="w-full max-w-md">
          {/* Logo/Brand */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full mb-4">
              <Building className="h-8 w-8 text-white" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Facilities Portal</h1>
            <p className="text-gray-600">Sign in to your account</p>
          </div>

          {/* Login Form */}
          <Card className="shadow-xl border-0">
            <CardContent className="p-8">
              <form onSubmit={handleLogin} className="space-y-6">
                {/* User Type Selection */}
                <div className="space-y-2">
                  <Label htmlFor="userType" className="text-sm font-medium text-gray-700">
                    I am a...
                  </Label>
                  <Select 
                    value={user.userType} 
                    onValueChange={(value) => setUser({...user, userType: value as any})}
                  >
                    <SelectTrigger className="h-12">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="provider">
                        <div className="flex items-center space-x-3">
                          <User className="h-4 w-4" />
                          <span>Healthcare Provider</span>
                        </div>
                      </SelectItem>
                      <SelectItem value="facility">
                        <div className="flex items-center space-x-3">
                          <Building className="h-4 w-4" />
                          <span>Facility Manager</span>
                        </div>
                      </SelectItem>
                      <SelectItem value="dca-pharmacy">
                        <div className="flex items-center space-x-3">
                          <Pill className="h-4 w-4" />
                          <span>DCA Pharmacy</span>
                        </div>
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Email */}
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-sm font-medium text-gray-700">
                    Email Address
                  </Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <Input
                      id="email"
                      type="email"
                      value={user.email}
                      onChange={(e) => setUser({...user, email: e.target.value})}
                      className="pl-10 h-12"
                      placeholder="Enter your email"
                      required
                    />
                  </div>
                </div>

                {/* Password */}
                <div className="space-y-2">
                  <Label htmlFor="password" className="text-sm font-medium text-gray-700">
                    Password
                  </Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      value={user.password}
                      onChange={(e) => setUser({...user, password: e.target.value})}
                      className="pl-10 pr-10 h-12"
                      placeholder="Enter your password"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    >
                      {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  </div>
                </div>

                {/* Login Button */}
                <Button 
                  type="submit" 
                  className="w-full h-12 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-medium"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <div className="flex items-center space-x-2">
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      <span>Signing in...</span>
                    </div>
                  ) : (
                    "Sign In"
                  )}
                </Button>

                {/* Demo Info */}
                <Alert className="bg-blue-50 border-blue-200">
                  <CheckCircle className="h-4 w-4 text-blue-600" />
                  <AlertDescription className="text-blue-800">
                    <strong>Demo Mode:</strong> Use any email/password to sign in
                  </AlertDescription>
                </Alert>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  if (currentView === 'facility-setup') {
    return (
      <div className="min-h-screen bg-gray-50">
        <header className="bg-white shadow-sm border-b">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              <div className="flex items-center space-x-4">
                <Building className="h-8 w-8 text-blue-600" />
                <h1 className="text-xl font-semibold text-gray-900">Facility Account Setup</h1>
              </div>
              <Button variant="outline" onClick={handleLogout} size="sm">
                Sign Out
              </Button>
            </div>
          </div>
        </header>

        <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-2xl font-bold text-gray-900">Welcome to Facilities Portal</h2>
              <div className="flex space-x-2">
                <div className={`w-3 h-3 rounded-full ${facilitySetupStep >= 1 ? 'bg-blue-600' : 'bg-gray-300'}`}></div>
                <div className={`w-3 h-3 rounded-full ${facilitySetupStep >= 2 ? 'bg-blue-600' : 'bg-gray-300'}`}></div>
                <div className={`w-3 h-3 rounded-full ${facilitySetupStep >= 3 ? 'bg-blue-600' : 'bg-gray-300'}`}></div>
              </div>
            </div>
            <p className="text-gray-600">Let's set up your facility account to start managing patient orders</p>
          </div>

          <Card className="shadow-sm border-0">
            <CardContent className="p-8">
              {facilitySetupStep === 1 && (
                <div className="space-y-6">
                  <div className="text-center">
                    <Building className="h-12 w-12 mx-auto text-blue-600 mb-4" />
                    <h3 className="text-lg font-semibold mb-2">Facility Information</h3>
                    <p className="text-gray-600">Please provide your facility details</p>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="facilityName">Facility Name</Label>
                      <Input id="facilityName" placeholder="Enter facility name" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="facilityType">Facility Type</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="hospital">Hospital</SelectItem>
                          <SelectItem value="clinic">Clinic</SelectItem>
                          <SelectItem value="nursing-home">Nursing Home</SelectItem>
                          <SelectItem value="assisted-living">Assisted Living</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="address">Address</Label>
                      <Input id="address" placeholder="Enter facility address" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone</Label>
                      <Input id="phone" placeholder="Enter phone number" />
                    </div>
                  </div>

                  <div className="flex justify-end">
                    <Button onClick={() => setFacilitySetupStep(2)} className="bg-blue-600 hover:bg-blue-700">
                      Continue
                    </Button>
                  </div>
                </div>
              )}

              {facilitySetupStep === 2 && (
                <div className="space-y-6">
                  <div className="text-center">
                    <User className="h-12 w-12 mx-auto text-blue-600 mb-4" />
                    <h3 className="text-lg font-semibold mb-2">Prescribing Providers</h3>
                    <p className="text-gray-600">Add prescribing providers who can write prescriptions for your facility</p>
                  </div>

                  <div className="space-y-4">
                    {prescribingProviders.map((provider) => (
                      <Card key={provider.id} className="p-4">
                        <div className="flex justify-between items-center">
                          <div>
                            <h4 className="font-medium">{provider.name}</h4>
                            <p className="text-sm text-gray-600">NPI: {provider.npi} | DEA: {provider.dea}</p>
                            <Badge className={provider.status === 'approved' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}>
                              {provider.status}
                            </Badge>
                          </div>
                          <Button variant="outline" size="sm">
                            View Documents
                          </Button>
                        </div>
                      </Card>
                    ))}

                    <Button variant="outline" className="w-full" onClick={() => {
                      const newProvider: PrescribingProvider = {
                        id: Date.now().toString(),
                        name: 'Dr. Jane Smith',
                        npi: '1234567890',
                        dea: 'BS1234567',
                        specialty: 'Internal Medicine',
                        status: 'pending',
                        documents: ['license.pdf', 'dea.pdf']
                      }
                      setPrescribingProviders([...prescribingProviders, newProvider])
                    }}>
                      <Plus className="h-4 w-4 mr-2" />
                      Add Prescribing Provider
                    </Button>
                  </div>

                  <div className="flex justify-between">
                    <Button variant="outline" onClick={() => setFacilitySetupStep(1)}>
                      Back
                    </Button>
                    <Button onClick={() => setFacilitySetupStep(3)} className="bg-blue-600 hover:bg-blue-700">
                      Continue
                    </Button>
                  </div>
                </div>
              )}

              {facilitySetupStep === 3 && (
                <div className="space-y-6">
                  <div className="text-center">
                    <Users className="h-12 w-12 mx-auto text-blue-600 mb-4" />
                    <h3 className="text-lg font-semibold mb-2">Office Staff Permissions</h3>
                    <p className="text-gray-600">Configure access for your office staff</p>
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 border rounded-lg">
                      <div>
                        <h4 className="font-medium">Create Orders</h4>
                        <p className="text-sm text-gray-600">Allow staff to create patient orders</p>
                      </div>
                      <Checkbox defaultChecked />
                    </div>
                    <div className="flex items-center justify-between p-4 border rounded-lg">
                      <div>
                        <h4 className="font-medium">View Patient Information</h4>
                        <p className="text-sm text-gray-600">Allow staff to view patient records</p>
                      </div>
                      <Checkbox defaultChecked />
                    </div>
                    <div className="flex items-center justify-between p-4 border rounded-lg">
                      <div>
                        <h4 className="font-medium">Manage Prescriptions</h4>
                        <p className="text-sm text-gray-600">Allow staff to manage prescriptions</p>
                      </div>
                      <Checkbox />
                    </div>
                    <div className="flex items-center justify-between p-4 border rounded-lg">
                      <div>
                        <h4 className="font-medium">Process Payments</h4>
                        <p className="text-sm text-gray-600">Allow staff to process payments</p>
                      </div>
                      <Checkbox />
                    </div>
                  </div>

                  <div className="flex justify-between">
                    <Button variant="outline" onClick={() => setFacilitySetupStep(2)}>
                      Back
                    </Button>
                    <Button onClick={handleFacilitySetupComplete} className="bg-blue-600 hover:bg-blue-700">
                      Complete Setup
                    </Button>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </main>
      </div>
    )
  }

  if (currentView === 'facility-dashboard') {
    return (
      <div className="min-h-screen bg-gray-50">
        <header className="bg-white shadow-sm border-b">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              <div className="flex items-center space-x-4">
                <Building className="h-8 w-8 text-blue-600" />
                <h1 className="text-xl font-semibold text-gray-900">Facility Dashboard</h1>
              </div>
              <div className="flex items-center space-x-4">
                <span className="text-sm text-gray-600">Welcome, {user.email}</span>
                <Button variant="outline" onClick={handleLogout} size="sm">
                  Sign Out
                </Button>
              </div>
            </div>
          </div>
        </header>

        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="mb-8">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold text-gray-900">Patient Order Management</h2>
              <Button onClick={handleCreateOrder} className="bg-blue-600 hover:bg-blue-700">
                <Plus className="h-4 w-4 mr-2" />
                Create New Order
              </Button>
            </div>
            <p className="text-gray-600">Manage patient orders and payments for your facility</p>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <Card className="p-6">
              <div className="flex items-center">
                <Package className="h-8 w-8 text-blue-600 mr-4" />
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Orders</p>
                  <p className="text-2xl font-bold text-gray-900">24</p>
                </div>
              </div>
            </Card>
            <Card className="p-6">
              <div className="flex items-center">
                <CreditCard className="h-8 w-8 text-green-600 mr-4" />
                <div>
                  <p className="text-sm font-medium text-gray-600">Pending Payment</p>
                  <p className="text-2xl font-bold text-gray-900">$1,247</p>
                </div>
              </div>
            </Card>
            <Card className="p-6">
              <div className="flex items-center">
                <User className="h-8 w-8 text-purple-600 mr-4" />
                <div>
                  <p className="text-sm font-medium text-gray-600">Active Patients</p>
                  <p className="text-2xl font-bold text-gray-900">18</p>
                </div>
              </div>
            </Card>
            <Card className="p-6">
              <div className="flex items-center">
                <Pill className="h-8 w-8 text-orange-600 mr-4" />
                <div>
                  <p className="text-sm font-medium text-gray-600">Prescriptions</p>
                  <p className="text-2xl font-bold text-gray-900">42</p>
                </div>
              </div>
            </Card>
          </div>

          {/* Recent Orders */}
          <Card className="shadow-sm border-0">
            <CardHeader>
              <CardTitle>Recent Orders</CardTitle>
              <CardDescription>Your recent patient orders and their status</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentOrders.map((order) => (
                  <div key={order.id} className="flex justify-between items-center p-4 border rounded-lg">
                    <div className="flex-1">
                      <div className="flex items-center space-x-4">
                        <div>
                          <h4 className="font-medium">{order.patientName}</h4>
                          <p className="text-sm text-gray-600">
                            {order.prescriptions.length} prescription(s) • {order.shipTo}
                          </p>
                          <p className="text-xs text-gray-500">
                            Created: {order.createdAt} • Total: ${order.totalAmount}
                          </p>
                        </div>
                        <Badge className={
                          order.status === 'delivered' ? 'bg-green-100 text-green-800' :
                          order.status === 'shipped' ? 'bg-blue-100 text-blue-800' :
                          order.status === 'processing' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-gray-100 text-gray-800'
                        }>
                          {order.status}
                        </Badge>
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => handleDuplicateOrder(order)}
                      >
                        <Copy className="h-4 w-4 mr-1" />
                        Duplicate
                      </Button>
                      <Button variant="outline" size="sm">
                        View Details
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </main>
      </div>
    )
  }

  if (currentView === 'facility-orders') {
    return (
      <div className="min-h-screen bg-gray-50">
        <header className="bg-white shadow-sm border-b">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              <div className="flex items-center space-x-4">
                <Button 
                  variant="ghost" 
                  onClick={() => setCurrentView('facility-dashboard')}
                  className="text-gray-600 hover:text-gray-900"
                >
                  ← Back to Dashboard
                </Button>
                <Package className="h-6 w-6 text-blue-600" />
                <h1 className="text-xl font-semibold text-gray-900">Create Patient Order</h1>
              </div>
              <Button variant="outline" onClick={handleLogout} size="sm">
                Sign Out
              </Button>
            </div>
          </div>
        </header>

        <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Card className="shadow-sm border-0">
            <CardHeader>
              <CardTitle>Patient & Prescription Selection</CardTitle>
              <CardDescription>Select or create a patient and add their prescriptions</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Patient Selection */}
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Patient Information</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="patientName">Patient Name</Label>
                    <Input 
                      id="patientName" 
                      placeholder="Enter patient name"
                      value={selectedPatient?.name || ''}
                      onChange={(e) => setSelectedPatient(prev => ({...prev!, name: e.target.value}))}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="patientDOB">Date of Birth</Label>
                    <Input 
                      id="patientDOB" 
                      type="date"
                      value={selectedPatient?.dateOfBirth || ''}
                      onChange={(e) => setSelectedPatient(prev => ({...prev!, dateOfBirth: e.target.value}))}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="patientPhone">Phone</Label>
                    <Input 
                      id="patientPhone" 
                      placeholder="Enter phone number"
                      value={selectedPatient?.phone || ''}
                      onChange={(e) => setSelectedPatient(prev => ({...prev!, phone: e.target.value}))}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="patientEmail">Email</Label>
                    <Input 
                      id="patientEmail" 
                      type="email"
                      placeholder="Enter email address"
                      value={selectedPatient?.email || ''}
                      onChange={(e) => setSelectedPatient(prev => ({...prev!, email: e.target.value}))}
                    />
                  </div>
                </div>
              </div>

              {/* Prescriptions */}
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-medium">Prescriptions</h3>
                  <Button variant="outline" size="sm">
                    <Plus className="h-4 w-4 mr-2" />
                    Add Prescription
                  </Button>
                </div>
                
                {selectedPrescriptions.map((prescription, index) => (
                  <Card key={prescription.id} className="p-4">
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-2">
                          <h4 className="font-medium">{prescription.medication}</h4>
                          <Badge className={
                            prescription.status === 'active' ? 'bg-green-100 text-green-800' :
                            prescription.status === 'expired' ? 'bg-red-100 text-red-800' :
                            'bg-yellow-100 text-yellow-800'
                          }>
                            {prescription.status}
                          </Badge>
                        </div>
                        <p className="text-sm text-gray-600">
                          {prescription.dosage} • {prescription.frequency} • {prescription.quantity}
                        </p>
                        <p className="text-xs text-gray-500">
                          Refills: {prescription.refills} • Expires: {prescription.expiresAt}
                        </p>
                      </div>
                      <div className="flex space-x-2">
                        {prescription.status !== 'active' && (
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => handleRenewPrescription(prescription)}
                          >
                            <RefreshCw className="h-4 w-4 mr-1" />
                            Renew
                          </Button>
                        )}
                        <Button variant="outline" size="sm">
                          Edit
                        </Button>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>

              {/* Ship To Preference */}
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Ship To Preference</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Ship From</Label>
                    <Select value={shipToPreference.split('/')[0]} onValueChange={(value) => setShipToPreference(`${value}/${shipToPreference.split('/')[1]}` as any)}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="SF">Ship From (SF)</SelectItem>
                        <SelectItem value="SP">Ship From (SP)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>Bill To</Label>
                    <Select value={shipToPreference.split('/')[1]} onValueChange={(value) => setShipToPreference(`${shipToPreference.split('/')[0]}/${value}` as any)}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="BP">Bill Patient (BP)</SelectItem>
                        <SelectItem value="BF">Bill Facility (BF)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <p className="text-sm text-gray-600">
                  Current setting: {shipToPreference} - {shipToPreference === 'SF/BP' ? 'Ship From, Bill Patient' :
                  shipToPreference === 'SF/BF' ? 'Ship From, Bill Facility' :
                  shipToPreference === 'SP/BF' ? 'Ship Patient, Bill Facility' :
                  'Ship Patient, Bill Patient'}
                </p>
              </div>

              {/* Order Summary */}
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Order Summary</h3>
                <Card className="p-4 bg-gray-50">
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span>Patient:</span>
                      <span className="font-medium">{selectedPatient?.name || 'Not selected'}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Prescriptions:</span>
                      <span className="font-medium">{selectedPrescriptions.length}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Ship To:</span>
                      <span className="font-medium">{shipToPreference}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Estimated Total:</span>
                      <span className="font-medium">${(selectedPrescriptions.length * 25.99).toFixed(2)}</span>
                    </div>
                  </div>
                </Card>
              </div>

              <div className="flex justify-end space-x-3">
                <Button variant="outline" onClick={() => setCurrentView('facility-dashboard')}>
                  Cancel
                </Button>
                <Button className="bg-blue-600 hover:bg-blue-700">
                  Create Order
                </Button>
              </div>
            </CardContent>
          </Card>
        </main>
      </div>
    )
  }

  if (user.userType === 'provider' && (currentView === 'platform' || currentView === 'provider-workflow')) {
    // Provider workflow: patient selection, prescription entry, status
    if (providerStep === 1) {
      return (
        <div className="min-h-screen bg-gray-50">
          <header className="bg-white shadow-sm border-b">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center h-16">
              <div className="flex items-center space-x-4">
                <User className="h-8 w-8 text-blue-600" />
                <h1 className="text-xl font-semibold text-gray-900">Select or Create Patient</h1>
              </div>
              <Button variant="outline" onClick={handleLogout} size="sm">Sign Out</Button>
            </div>
          </header>
          <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <Card className="shadow-sm border-0">
              <CardHeader>
                <CardTitle>Patient Selection</CardTitle>
                <CardDescription>Choose an existing patient or create a new one</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Existing patient fields */}
                <div className="space-y-2">
                  <Label>Patient Name</Label>
                  <Input value={providerPatient?.name || ''} onChange={e => setProviderPatient(makePatient({ ...(providerPatient || {}), name: e.target.value }))} placeholder="Enter patient name" />
                </div>
                <div className="space-y-2">
                  <Label>Date of Birth</Label>
                  <Input type="date" value={providerPatient?.dateOfBirth || ''} onChange={e => setProviderPatient(makePatient({ ...(providerPatient || {}), dateOfBirth: e.target.value }))} />
                </div>
                <div className="space-y-2">
                  <Label>Phone</Label>
                  <Input value={providerPatient?.phone || ''} onChange={e => setProviderPatient(makePatient({ ...(providerPatient || {}), phone: e.target.value }))} placeholder="Enter phone number" />
                </div>
                <div className="space-y-2">
                  <Label>Email</Label>
                  <Input value={providerPatient?.email || ''} onChange={e => setProviderPatient(makePatient({ ...(providerPatient || {}), email: e.target.value }))} placeholder="Enter email address" />
                </div>
                <div className="flex justify-between items-center">
                  <Button className="bg-blue-600 hover:bg-blue-700" onClick={() => setProviderStep(2)} disabled={!providerPatient?.name}>Continue</Button>
                  <Button variant="outline" onClick={() => setShowCreatePatient(true)}>Create New</Button>
                </div>
                {/* Create New Patient Modal */}
                {showCreatePatient && (
                  <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
                    <div className="bg-white rounded-lg shadow-lg w-full max-w-lg p-6">
                      <h2 className="text-xl font-bold mb-4">Create New Patient</h2>
                      <div className="space-y-3 mb-4">
                        <div className="space-y-2">
                          <Label>Name</Label>
                          <Input value={newPatient.name} onChange={e => setNewPatient({ ...newPatient, name: e.target.value })} placeholder="Full name" />
                        </div>
                        <div className="space-y-2">
                          <Label>Date of Birth</Label>
                          <Input type="date" value={newPatient.dateOfBirth} onChange={e => setNewPatient({ ...newPatient, dateOfBirth: e.target.value })} />
                        </div>
                        <div className="space-y-2">
                          <Label>Phone</Label>
                          <Input value={newPatient.phone} onChange={e => setNewPatient({ ...newPatient, phone: e.target.value })} placeholder="Phone number" />
                        </div>
                        <div className="space-y-2">
                          <Label>Email</Label>
                          <Input value={newPatient.email} onChange={e => setNewPatient({ ...newPatient, email: e.target.value })} placeholder="Email address" />
                        </div>
                        <div className="space-y-2">
                          <Label>Address</Label>
                          <Input value={newPatient.address} onChange={e => setNewPatient({ ...newPatient, address: e.target.value })} placeholder="Address" />
                        </div>
                        <div className="space-y-2">
                          <Label>Practice</Label>
                          <Input value={newPatient.practice || ''} onChange={e => setNewPatient({ ...newPatient, practice: e.target.value })} placeholder="Practice/Clinic" />
                        </div>
                        {/* Prescriptions for new patient */}
                        <div className="space-y-2">
                          <Label>Prescriptions</Label>
                          {newPatientPrescriptions.map((rx, idx) => (
                            <div key={idx} className="flex space-x-2 mb-2">
                              <Input value={rx.medication} onChange={e => setNewPatientPrescriptions(prescs => prescs.map((p, i) => i === idx ? { ...p, medication: e.target.value } : p))} placeholder="Medication" className="flex-1" />
                              <Input value={rx.dosage} onChange={e => setNewPatientPrescriptions(prescs => prescs.map((p, i) => i === idx ? { ...p, dosage: e.target.value } : p))} placeholder="Dosage" className="flex-1" />
                              <Button variant="outline" size="icon" onClick={() => setNewPatientPrescriptions(prescs => prescs.filter((_, i) => i !== idx))}>×</Button>
                            </div>
                          ))}
                          <Button variant="outline" size="sm" onClick={() => setNewPatientPrescriptions(prescs => [...prescs, { id: Date.now().toString(), medication: '', dosage: '', frequency: '', quantity: '', refills: 0, expiresAt: '', status: 'active' }])}>Add Prescription</Button>
                        </div>
                      </div>
                      <div className="flex justify-end space-x-2">
                        <Button variant="outline" onClick={() => setShowCreatePatient(false)}>Cancel</Button>
                        <Button className="bg-blue-600 hover:bg-blue-700" onClick={() => {
                          const patient = { ...newPatient, id: Date.now().toString() }
                          setProviderPatient(patient)
                          setProviderPrescriptions(newPatientPrescriptions)
                          setShowCreatePatient(false)
                        }} disabled={!newPatient.name}>Save & Select</Button>
                      </div>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </main>
        </div>
      )
    }
    if (providerStep === 2) {
      return (
        <div className="min-h-screen bg-gray-50">
          <header className="bg-white shadow-sm border-b">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center h-16">
              <div className="flex items-center space-x-4">
                <Pill className="h-8 w-8 text-blue-600" />
                <h1 className="text-xl font-semibold text-gray-900">Prescription Entry</h1>
              </div>
              <Button variant="outline" onClick={handleLogout} size="sm">Sign Out</Button>
            </div>
          </header>
          <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <Card className="shadow-sm border-0">
              <CardHeader>
                <CardTitle>Prescription Method</CardTitle>
                <CardDescription>Select how you want to enter the prescription</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <Button variant="outline" onClick={() => {/* DCA E-Script logic */}}>DCA E-Script</Button>
                  <Button variant="outline" onClick={() => {/* SureScript logic */}}>SureScript</Button>
                  <Button variant="outline" onClick={() => {/* Upload logic */}}>Upload</Button>
                  <Button variant="outline" onClick={() => setShowLibraryModal(true)}>Library</Button>
                </div>
                {/* Library Modal */}
                {showLibraryModal && (
                  <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
                    <div className="bg-white rounded-lg shadow-lg w-full max-w-lg p-6">
                      <h2 className="text-xl font-bold mb-4">Example Scripts Library</h2>
                      <div className="space-y-3 mb-6">
                        {exampleScripts.map(script => (
                          <Card key={script.id} className="p-4 cursor-pointer hover:bg-blue-50" onClick={() => { setProviderPrescriptions([{...script, status: script.status as 'active' | 'expired' | 'out-of-refills'}]); setShowLibraryModal(false); }}>
                            <div className="flex flex-col">
                              <span className="font-medium">{script.medication}</span>
                              <span className="text-sm text-gray-600">{script.dosage} • {script.frequency} • {script.quantity}</span>
                            </div>
                          </Card>
                        ))}
                      </div>
                      <div className="flex justify-end">
                        <Button variant="outline" onClick={() => setShowLibraryModal(false)}>Close</Button>
                      </div>
                    </div>
                  </div>
                )}
                {/* Prescription Form (if not using library) */}
                {providerPrescriptions.length === 0 && (
                  <div className="space-y-2">
                    <Label>Medication</Label>
                    <Input placeholder="Enter medication name" />
                  </div>
                )}
                <div className="flex justify-end">
                  <Button className="bg-blue-600 hover:bg-blue-700" onClick={() => setProviderStep(3)} disabled={providerPrescriptions.length === 0}>Submit Prescription</Button>
                </div>
              </CardContent>
            </Card>
          </main>
        </div>
      )
    }
    if (providerStep === 3) {
      return (
        <div className="min-h-screen bg-gray-50">
          <header className="bg-white shadow-sm border-b">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center h-16">
              <div className="flex items-center space-x-4">
                <CheckCircle className="h-8 w-8 text-green-600" />
                <h1 className="text-xl font-semibold text-gray-900">Prescription Status</h1>
              </div>
              <Button variant="outline" onClick={handleLogout} size="sm">Sign Out</Button>
            </div>
          </header>
          <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <Card className="shadow-sm border-0">
              <CardHeader>
                <CardTitle>Order Sent to Patient for Order / Pay</CardTitle>
                <CardDescription>Your prescription has been submitted and sent to the patient for review and payment.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <h3 className="text-lg font-medium">Recent Submission</h3>
                  {providerPrescriptions.map((rx, idx) => (
                    <Card key={rx.id} className="p-4">
                      <div className="flex flex-col">
                        <span className="font-medium">{rx.medication}</span>
                        <span className="text-sm text-gray-600">{rx.dosage} • {rx.frequency} • {rx.quantity}</span>
                      </div>
                    </Card>
                  ))}
                </div>
                <div className="flex space-x-3">
                  <Button variant="outline" onClick={() => { setProviderStep(1); setProviderPatient(null); setProviderPrescriptions([]); }}>Submit Another Prescription</Button>
                  <Button className="bg-blue-600 hover:bg-blue-700" onClick={() => setProviderStep(1)}>Back to Dashboard</Button>
                </div>
              </CardContent>
            </Card>
          </main>
        </div>
      )
    }
  }

  if (currentView === 'platform') {
    const currentUserSettings = userSettings[user.userType]
    const IconComponent = currentUserSettings.icon

    return (
      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <header className="bg-white shadow-sm border-b">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-3">
                  <IconComponent className="h-8 w-8 text-blue-600" />
                  <h1 className="text-xl font-semibold text-gray-900">{currentUserSettings.title}</h1>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <span className="text-sm text-gray-600">Welcome, {user.email}</span>
                <Button variant="outline" onClick={handleLogout} size="sm">
                  Sign Out
                </Button>
              </div>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Welcome to your dashboard</h2>
            <p className="text-gray-600">{currentUserSettings.description}</p>
          </div>

          {/* Settings Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {currentUserSettings.pages.map((page) => {
              const PageIcon = page.icon
              return (
                <Card 
                  key={page.id}
                  className="cursor-pointer hover:shadow-lg transition-shadow duration-200 border-0 shadow-sm"
                  onClick={() => handleSettingsClick(page.id)}
                >
                  <CardContent className="p-6">
                    <div className="flex items-start space-x-4">
                      <div className="flex-shrink-0">
                        <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                          <PageIcon className="h-5 w-5 text-blue-600" />
                        </div>
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="text-lg font-medium text-gray-900 mb-1">{page.title}</h3>
                        <p className="text-sm text-gray-600">{page.description}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </main>
      </div>
    )
  }

  if (currentView === 'settings') {
    const currentUserSettings = userSettings[user.userType]
    const currentPage = currentUserSettings.pages.find(p => p.id === selectedSettingsPage)
    const PageIcon = currentPage?.icon || User

    return (
      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <header className="bg-white shadow-sm border-b">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              <div className="flex items-center space-x-4">
                <Button 
                  variant="ghost" 
                  onClick={() => setCurrentView('platform')}
                  className="text-gray-600 hover:text-gray-900"
                >
                  ← Back to Dashboard
                </Button>
                <div className="flex items-center space-x-3">
                  <PageIcon className="h-6 w-6 text-blue-600" />
                  <h1 className="text-xl font-semibold text-gray-900">{currentPage?.title}</h1>
                </div>
              </div>
              <Button variant="outline" onClick={handleLogout} size="sm">
                Sign Out
              </Button>
            </div>
          </div>
        </header>

        {/* Settings Content */}
        <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Card className="shadow-sm border-0">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <PageIcon className="h-5 w-5 text-blue-600" />
                <span>{currentPage?.title}</span>
              </CardTitle>
              <CardDescription>{currentPage?.description}</CardDescription>
            </CardHeader>
            <CardContent className="p-6">
              <div className="space-y-6">
                <div className="text-center py-12">
                  <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <PageIcon className="h-8 w-8 text-blue-600" />
                  </div>
                  <h3 className="text-lg font-medium text-gray-900 mb-2">{currentPage?.title} Settings</h3>
                  <p className="text-gray-600 max-w-md mx-auto">
                    This page would contain the specific settings and configuration options for {currentPage?.title.toLowerCase()}.
                  </p>
                </div>
                
                <div className="flex justify-end space-x-3">
                  <Button variant="outline" onClick={() => setCurrentView('platform')}>
                    Cancel
                  </Button>
                  <Button className="bg-blue-600 hover:bg-blue-700">
                    Save Changes
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </main>
      </div>
    )
  }

  return null
} 