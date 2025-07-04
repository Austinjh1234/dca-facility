"use client"

import type React from "react"
import { features } from "@/data/features" // Declare the features variable

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Eye, EyeOff, AlertCircle, CheckCircle } from "lucide-react"
import { Checkbox } from "@/components/ui/checkbox"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface LoginPageProps {
  onLogin: () => void
}

export default function LoginPage({ onLogin }: LoginPageProps) {
  const [isLogin, setIsLogin] = useState(true)
  const [showPassword, setShowPassword] = useState(false)
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    firstName: "",
    lastName: "",
    pharmacyName: "",
    licenseNumber: "",
  })
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [isLoading, setIsLoading] = useState(false)
  const [showOnboarding, setShowOnboarding] = useState(false)
  const [onboardingStep, setOnboardingStep] = useState(0)
  const [onboardingData, setOnboardingData] = useState({
    profile: {},
    contacts: [],
    services: {},
    questions: {},
  })

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }))
    }
  }

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.email) {
      newErrors.email = "Email is required"
    } else if (isLogin && (formData.email.toLowerCase() === "demo" || formData.email === "Demo")) {
      // Allow "Demo" as username for login
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address"
    }

    if (!formData.password) {
      newErrors.password = "Password is required"
    } else if (!isLogin && formData.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters"
    }

    if (!isLogin) {
      if (!formData.firstName) newErrors.firstName = "First name is required"
      if (!formData.lastName) newErrors.lastName = "Last name is required"
      if (!formData.pharmacyName) newErrors.pharmacyName = "Pharmacy name is required"
      if (!formData.licenseNumber) newErrors.licenseNumber = "License number is required"

      if (formData.password !== formData.confirmPassword) {
        newErrors.confirmPassword = "Passwords do not match"
      }
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) return

    setIsLoading(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500))

    if (isLogin) {
      if (
        (formData.email.toLowerCase() === "demo" || formData.email === "Demo") &&
        formData.password === "Password123"
      ) {
        onLogin()
      } else {
        setErrors({ general: "Invalid credentials. Use 'Demo' and 'Password123' to log in." })
      }
    } else {
      // Start onboarding flow instead of immediately switching to login
      setIsLogin(false) // Keep in registration mode but start onboarding
      setShowOnboarding(true)
      setOnboardingStep(0)
      setErrors({})
    }

    setIsLoading(false)
  }

  // Onboarding flow steps
  const onboardingSteps = [
    { id: "profile", title: "Account Profile", description: "Set up your basic account information" },
    { id: "contacts", title: "Contacts", description: "Add key contacts for your facility" },
    { id: "services", title: "Services", description: "Select the services your facility provides" },
    { id: "questions", title: "Questions", description: "Answer some questions about your facility" },
    { id: "complete", title: "Complete", description: "Review and complete your setup" },
  ]

  const handleOnboardingNext = () => {
    if (onboardingStep < onboardingSteps.length - 1) {
      setOnboardingStep(onboardingStep + 1)
    } else {
      // Complete onboarding
      setShowOnboarding(false)
      setIsLogin(true)
      setFormData((prev) => ({ ...prev, password: "", confirmPassword: "" }))
      setErrors({ general: "Registration successful! Please log in with your credentials." })
    }
  }

  const handleOnboardingBack = () => {
    if (onboardingStep > 0) {
      setOnboardingStep(onboardingStep - 1)
    }
  }

  const renderOnboardingStep = () => {
    const currentStep = onboardingSteps[onboardingStep]

    switch (currentStep.id) {
      case "profile":
        return renderOnboardingProfile()
      case "contacts":
        return renderOnboardingContacts()
      case "services":
        return renderOnboardingServices()
      case "questions":
        return renderOnboardingQuestions()
      case "complete":
        return renderOnboardingComplete()
      default:
        return null
    }
  }

  const renderOnboardingProfile = () => (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label>Facility Name</Label>
        <Input
          value={onboardingData.profile.facilityName || formData.pharmacyName}
          onChange={(e) =>
            setOnboardingData((prev) => ({
              ...prev,
              profile: { ...prev.profile, facilityName: e.target.value },
            }))
          }
          placeholder="Your pharmacy/facility name"
        />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label>Primary Contact</Label>
          <Input
            value={onboardingData.profile.primaryContact || `${formData.firstName} ${formData.lastName}`}
            onChange={(e) =>
              setOnboardingData((prev) => ({
                ...prev,
                profile: { ...prev.profile, primaryContact: e.target.value },
              }))
            }
            placeholder="Primary contact name"
          />
        </div>
        <div className="space-y-2">
          <Label>License Number</Label>
          <Input
            value={onboardingData.profile.licenseNumber || formData.licenseNumber}
            onChange={(e) =>
              setOnboardingData((prev) => ({
                ...prev,
                profile: { ...prev.profile, licenseNumber: e.target.value },
              }))
            }
            placeholder="Pharmacy license number"
          />
        </div>
      </div>
      <div className="space-y-2">
        <Label>Street Address</Label>
        <Input
          value={onboardingData.profile.address || ""}
          onChange={(e) =>
            setOnboardingData((prev) => ({
              ...prev,
              profile: { ...prev.profile, address: e.target.value },
            }))
          }
          placeholder="123 Main Street"
        />
      </div>
      <div className="grid grid-cols-3 gap-4">
        <div className="space-y-2">
          <Label>City</Label>
          <Input
            value={onboardingData.profile.city || ""}
            onChange={(e) =>
              setOnboardingData((prev) => ({
                ...prev,
                profile: { ...prev.profile, city: e.target.value },
              }))
            }
            placeholder="City"
          />
        </div>
        <div className="space-y-2">
          <Label>State</Label>
          <Input
            value={onboardingData.profile.state || ""}
            onChange={(e) =>
              setOnboardingData((prev) => ({
                ...prev,
                profile: { ...prev.profile, state: e.target.value },
              }))
            }
            placeholder="State"
          />
        </div>
        <div className="space-y-2">
          <Label>ZIP Code</Label>
          <Input
            value={onboardingData.profile.zip || ""}
            onChange={(e) =>
              setOnboardingData((prev) => ({
                ...prev,
                profile: { ...prev.profile, zip: e.target.value },
              }))
            }
            placeholder="ZIP"
          />
        </div>
      </div>
      <div className="space-y-2">
        <Label>Phone Number</Label>
        <Input
          value={onboardingData.profile.phone || ""}
          onChange={(e) =>
            setOnboardingData((prev) => ({
              ...prev,
              profile: { ...prev.profile, phone: e.target.value },
            }))
          }
          placeholder="(555) 123-4567"
        />
      </div>
    </div>
  )

  const renderOnboardingContacts = () => {
    const contacts = onboardingData.contacts || []

    const addContact = () => {
      setOnboardingData((prev) => ({
        ...prev,
        contacts: [
          ...prev.contacts,
          { id: Date.now(), firstName: "", lastName: "", role: "Physician", email: "", phone: "" },
        ],
      }))
    }

    const updateContact = (id, field, value) => {
      setOnboardingData((prev) => ({
        ...prev,
        contacts: prev.contacts.map((contact) => (contact.id === id ? { ...contact, [field]: value } : contact)),
      }))
    }

    const removeContact = (id) => {
      setOnboardingData((prev) => ({
        ...prev,
        contacts: prev.contacts.filter((contact) => contact.id !== id),
      }))
    }

    return (
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <p className="text-sm text-gray-600">Add key contacts for your facility (optional)</p>
          <Button type="button" variant="outline" onClick={addContact}>
            Add Contact
          </Button>
        </div>

        {contacts.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            <p>No contacts added yet. You can add them later.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {contacts.map((contact) => (
              <div key={contact.id} className="p-4 border rounded-lg space-y-3">
                <div className="grid grid-cols-2 gap-3">
                  <Input
                    placeholder="First Name"
                    value={contact.firstName}
                    onChange={(e) => updateContact(contact.id, "firstName", e.target.value)}
                  />
                  <Input
                    placeholder="Last Name"
                    value={contact.lastName}
                    onChange={(e) => updateContact(contact.id, "lastName", e.target.value)}
                  />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <Select value={contact.role} onValueChange={(value) => updateContact(contact.id, "role", value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Role" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Physician">Physician</SelectItem>
                      <SelectItem value="Billing">Billing</SelectItem>
                      <SelectItem value="Ordering">Ordering</SelectItem>
                      <SelectItem value="Other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                  <Input
                    placeholder="Phone"
                    value={contact.phone}
                    onChange={(e) => updateContact(contact.id, "phone", e.target.value)}
                  />
                </div>
                <div className="flex gap-3">
                  <Input
                    placeholder="Email"
                    type="email"
                    value={contact.email}
                    onChange={(e) => updateContact(contact.id, "email", e.target.value)}
                    className="flex-1"
                  />
                  <Button type="button" variant="outline" onClick={() => removeContact(contact.id)}>
                    Remove
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    )
  }

  const renderOnboardingServices = () => {
    const services = onboardingData.services || {}

    const updateService = (service, value) => {
      setOnboardingData((prev) => ({
        ...prev,
        services: { ...prev.services, [service]: value },
      }))
    }

    return (
      <div className="space-y-4">
        <p className="text-sm text-gray-600">Select the services your facility provides (optional)</p>

        <div className="space-y-3">
          {[
            { id: "aestheticServices", label: "Aesthetic Services" },
            { id: "generalWellness", label: "General Wellness" },
            { id: "mensHealth", label: "Men's Health" },
            { id: "womensHealth", label: "Women's Health" },
            { id: "hormoneReplacement", label: "Hormone Replacement Therapy" },
            { id: "weightLoss", label: "Weight Loss" },
            { id: "thyroidBalance", label: "Thyroid Balance" },
            { id: "multiVitaminIV", label: "Multi-Vitamin I.V. Infusions" },
            { id: "sexualDysfunction", label: "Sexual Dysfunction" },
          ].map((service) => (
            <div key={service.id} className="flex items-center space-x-2">
              <Checkbox
                id={service.id}
                checked={services[service.id] || false}
                onCheckedChange={(checked) => updateService(service.id, checked)}
              />
              <Label htmlFor={service.id}>{service.label}</Label>
            </div>
          ))}
        </div>
      </div>
    )
  }

  const renderOnboardingQuestions = () => {
    const questions = onboardingData.questions || {}

    const updateQuestion = (field, value) => {
      setOnboardingData((prev) => ({
        ...prev,
        questions: { ...prev.questions, [field]: value },
      }))
    }

    return (
      <div className="space-y-6">
        <div className="space-y-3">
          <Label className="font-medium">Do you accept insurance for most services?</Label>
          <Select
            value={questions.acceptsInsurance || ""}
            onValueChange={(value) => updateQuestion("acceptsInsurance", value)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select an option" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="yes">Yes</SelectItem>
              <SelectItem value="some">Yes, some services only</SelectItem>
              <SelectItem value="no">No</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-3">
          <Label className="font-medium">
            Are there any products you currently use that we may be able to produce for you?
          </Label>
          <textarea
            value={questions.currentProducts || ""}
            onChange={(e) => updateQuestion("currentProducts", e.target.value)}
            placeholder="Please describe any products you currently use..."
            className="w-full min-h-[80px] p-3 border border-gray-300 rounded-md resize-vertical"
          />
        </div>

        <div className="space-y-3">
          <Label className="font-medium">What items should be billed to your facility account?</Label>
          <Input
            value={questions.facilityBilling || ""}
            onChange={(e) => updateQuestion("facilityBilling", e.target.value)}
            placeholder="e.g., Medical supplies, injection kits, etc."
          />
        </div>
      </div>
    )
  }

  const renderOnboardingComplete = () => (
    <div className="space-y-6">
      <div className="text-center">
        <CheckCircle className="h-16 w-16 text-green-600 mx-auto mb-4" />
        <h3 className="text-xl font-semibold mb-2">Setup Complete!</h3>
        <p className="text-gray-600">Your account has been configured successfully.</p>
      </div>

      <div className="bg-gray-50 p-4 rounded-lg">
        <h4 className="font-medium mb-3">Account Summary:</h4>
        <div className="space-y-2 text-sm">
          <div>
            <strong>Facility:</strong> {onboardingData.profile?.facilityName || formData.pharmacyName}
          </div>
          <div>
            <strong>Primary Contact:</strong> {formData.firstName} {formData.lastName}
          </div>
          <div>
            <strong>Email:</strong> {formData.email}
          </div>
          <div>
            <strong>Contacts Added:</strong> {onboardingData.contacts?.length || 0}
          </div>
          <div>
            <strong>Services Selected:</strong> {Object.values(onboardingData.services || {}).filter(Boolean).length}
          </div>
        </div>
      </div>

      <div className="bg-blue-50 p-4 rounded-lg">
        <p className="text-sm text-blue-800">
          <strong>Next Steps:</strong> You can now log in to access your facilities portal. You can always update your
          account information later in the Account section.
        </p>
      </div>
    </div>
  )

  if (showOnboarding) {
    const currentStep = onboardingSteps[onboardingStep]

    return (
      <div className="min-h-screen bg-gradient-to-br from-red-50 via-white to-indigo-50 flex items-center justify-center p-8">
        <div className="w-full max-w-4xl">
          <Card className="shadow-xl border-0">
            <CardHeader className="text-center pb-6">
              <div className="flex items-center justify-center mb-4">
                <img src="/images/dca-logo.jpg" alt="DCA Pharmacy" className="h-16 w-auto" />
              </div>
              <CardTitle className="text-2xl font-bold">Welcome to DCA Facilities Portal</CardTitle>
              <CardDescription>
                Let's set up your account - Step {onboardingStep + 1} of {onboardingSteps.length}
              </CardDescription>

              {/* Progress Bar */}
              <div className="mt-6">
                <div className="flex justify-between mb-2">
                  {onboardingSteps.map((step, index) => (
                    <div key={step.id} className="flex flex-col items-center">
                      <div
                        className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                          index <= onboardingStep ? "bg-red-800 text-white" : "bg-gray-200 text-gray-600"
                        }`}
                      >
                        {index < onboardingStep ? "✓" : index + 1}
                      </div>
                      <span className="text-xs mt-1 text-center max-w-20">{step.title}</span>
                    </div>
                  ))}
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-red-800 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${((onboardingStep + 1) / onboardingSteps.length) * 100}%` }}
                  ></div>
                </div>
              </div>
            </CardHeader>

            <CardContent>
              <div className="mb-6">
                <h3 className="text-lg font-semibold mb-2">{currentStep.title}</h3>
                <p className="text-gray-600 text-sm">{currentStep.description}</p>
              </div>

              {renderOnboardingStep()}

              <div className="flex justify-between mt-8 pt-6 border-t">
                <Button variant="outline" onClick={handleOnboardingBack} disabled={onboardingStep === 0}>
                  Back
                </Button>

                <Button onClick={handleOnboardingNext} className="bg-red-800 hover:bg-red-900">
                  {onboardingStep === onboardingSteps.length - 1 ? "Complete Setup" : "Continue"}
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-white to-indigo-50 flex">
      {/* Left Side - Features */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-red-800 to-red-900 p-12 flex-col justify-center relative overflow-hidden">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="relative z-10">
          <div className="mb-12">
            <h1 className="text-4xl font-bold text-white mb-4">DCA Facilities Portal</h1>
            <p className="text-xl text-red-100">
              Streamline your compounding pharmacy operations with our comprehensive management solution
            </p>
          </div>

          <div className="space-y-8">
            {features.map((feature, index) => {
              const IconComponent = feature.icon
              return (
                <div key={index} className="flex items-start space-x-4">
                  <div className="bg-white/20 p-3 rounded-lg">
                    <IconComponent className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-2">{feature.title}</h3>
                    <p className="text-red-100">{feature.description}</p>
                  </div>
                </div>
              )
            })}
          </div>

          <div className="mt-12 p-6 bg-white/10 rounded-lg backdrop-blur-sm">
            <div className="flex items-center space-x-2 mb-2">
              <CheckCircle className="h-5 w-5 text-green-300" />
              <span className="text-white font-medium">Demo Credentials</span>
            </div>
            <p className="text-red-100 text-sm">
              Username: <span className="font-mono bg-white/20 px-2 py-1 rounded">Demo</span>
            </p>
            <p className="text-red-100 text-sm mt-1">
              Password: <span className="font-mono bg-white/20 px-2 py-1 rounded">Password123</span>
            </p>
          </div>
        </div>

        {/* Decorative elements */}
        <div className="absolute top-20 right-20 w-32 h-32 bg-white/10 rounded-full blur-xl"></div>
        <div className="absolute bottom-20 left-20 w-24 h-24 bg-white/10 rounded-full blur-xl"></div>
      </div>

      {/* Right Side - Login/Register Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
        <div className="w-full max-w-md">
          <Card className="shadow-xl border-0">
            <CardHeader className="space-y-1 pb-6">
              <div className="flex items-center justify-center mb-4">
                <img src="/images/dca-logo.jpg" alt="DCA Pharmacy" className="h-16 w-auto" />
              </div>
              <CardTitle className="text-2xl font-bold text-center">
                {isLogin ? "Welcome Back" : "Create Account"}
              </CardTitle>
              <CardDescription className="text-center">
                {isLogin
                  ? "Sign in to access your facilities management portal"
                  : "Join thousands of pharmacies using our platform"}
              </CardDescription>
            </CardHeader>

            <CardContent>
              {errors.general && (
                <Alert
                  className={`mb-6 ${errors.general.includes("successful") ? "border-green-200 bg-green-50" : "border-red-200 bg-red-50"}`}
                >
                  <AlertCircle
                    className={`h-4 w-4 ${errors.general.includes("successful") ? "text-green-600" : "text-red-600"}`}
                  />
                  <AlertDescription
                    className={errors.general.includes("successful") ? "text-green-700" : "text-red-700"}
                  >
                    {errors.general}
                  </AlertDescription>
                </Alert>
              )}

              <form onSubmit={handleSubmit} className="space-y-4">
                {!isLogin && (
                  <>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="firstName">First Name</Label>
                        <Input
                          id="firstName"
                          type="text"
                          value={formData.firstName}
                          onChange={(e) => handleInputChange("firstName", e.target.value)}
                          className={errors.firstName ? "border-red-500" : ""}
                          placeholder="John"
                        />
                        {errors.firstName && <p className="text-sm text-red-600 mt-1">{errors.firstName}</p>}
                      </div>
                      <div>
                        <Label htmlFor="lastName">Last Name</Label>
                        <Input
                          id="lastName"
                          type="text"
                          value={formData.lastName}
                          onChange={(e) => handleInputChange("lastName", e.target.value)}
                          className={errors.lastName ? "border-red-500" : ""}
                          placeholder="Doe"
                        />
                        {errors.lastName && <p className="text-sm text-red-600 mt-1">{errors.lastName}</p>}
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="pharmacyName">Pharmacy Name</Label>
                      <Input
                        id="pharmacyName"
                        type="text"
                        value={formData.pharmacyName}
                        onChange={(e) => handleInputChange("pharmacyName", e.target.value)}
                        className={errors.pharmacyName ? "border-red-500" : ""}
                        placeholder="ABC Compounding Pharmacy"
                      />
                      {errors.pharmacyName && <p className="text-sm text-red-600 mt-1">{errors.pharmacyName}</p>}
                    </div>

                    <div>
                      <Label htmlFor="licenseNumber">License Number</Label>
                      <Input
                        id="licenseNumber"
                        type="text"
                        value={formData.licenseNumber}
                        onChange={(e) => handleInputChange("licenseNumber", e.target.value)}
                        className={errors.licenseNumber ? "border-red-500" : ""}
                        placeholder="IL-PH-2024-001234"
                      />
                      {errors.licenseNumber && <p className="text-sm text-red-600 mt-1">{errors.licenseNumber}</p>}
                    </div>
                  </>
                )}

                <div>
                  <Label htmlFor="email">{isLogin ? "Username or Email" : "Email Address"}</Label>
                  <Input
                    id="email"
                    type={isLogin ? "text" : "email"}
                    value={formData.email}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                    className={errors.email ? "border-red-500" : ""}
                    placeholder={isLogin ? "Demo" : "john@pharmacy.com"}
                  />
                  {errors.email && <p className="text-sm text-red-600 mt-1">{errors.email}</p>}
                </div>

                <div>
                  <Label htmlFor="password">Password</Label>
                  <div className="relative">
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      value={formData.password}
                      onChange={(e) => handleInputChange("password", e.target.value)}
                      className={errors.password ? "border-red-500 pr-10" : "pr-10"}
                      placeholder={isLogin ? "Password123" : "Enter a strong password"}
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? (
                        <EyeOff className="h-4 w-4 text-gray-400" />
                      ) : (
                        <Eye className="h-4 w-4 text-gray-400" />
                      )}
                    </Button>
                  </div>
                  {errors.password && <p className="text-sm text-red-600 mt-1">{errors.password}</p>}
                </div>

                {!isLogin && (
                  <div>
                    <Label htmlFor="confirmPassword">Confirm Password</Label>
                    <Input
                      id="confirmPassword"
                      type="password"
                      value={formData.confirmPassword}
                      onChange={(e) => handleInputChange("confirmPassword", e.target.value)}
                      className={errors.confirmPassword ? "border-red-500" : ""}
                      placeholder="Confirm your password"
                    />
                    {errors.confirmPassword && <p className="text-sm text-red-600 mt-1">{errors.confirmPassword}</p>}
                  </div>
                )}

                {isLogin && (
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <input
                        id="remember"
                        type="checkbox"
                        className="rounded border-gray-300 text-red-800 focus:ring-red-500"
                      />
                      <Label htmlFor="remember" className="text-sm">
                        Remember me
                      </Label>
                    </div>
                    <Button variant="link" className="px-0 text-sm">
                      Forgot password?
                    </Button>
                  </div>
                )}

                <Button type="submit" className="w-full bg-red-800 hover:bg-red-900" disabled={isLoading}>
                  {isLoading ? (
                    <div className="flex items-center space-x-2">
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      <span>{isLogin ? "Signing in..." : "Creating account..."}</span>
                    </div>
                  ) : isLogin ? (
                    "Sign In"
                  ) : (
                    "Create Account"
                  )}
                </Button>
              </form>

              <div className="mt-6">
                <Separator className="my-4" />
                <div className="text-center">
                  <span className="text-sm text-gray-600">
                    {isLogin ? "Don't have an account?" : "Already have an account?"}
                  </span>
                  <Button
                    variant="link"
                    className="ml-1 p-0 text-red-800 hover:text-red-900"
                    onClick={() => {
                      setIsLogin(!isLogin)
                      setErrors({})
                      setFormData({
                        email: "",
                        password: "",
                        confirmPassword: "",
                        firstName: "",
                        lastName: "",
                        pharmacyName: "",
                        licenseNumber: "",
                      })
                    }}
                  >
                    {isLogin ? "Sign up" : "Sign in"}
                  </Button>
                </div>
              </div>

              {isLogin && (
                <div className="mt-6 p-4 bg-red-50 rounded-lg">
                  <h4 className="text-sm font-medium text-red-800 mb-2">Demo Access</h4>
                  <p className="text-xs text-red-800">
                    Use the credentials shown on the left to explore the full pharmacy management portal.
                  </p>
                </div>
              )}
            </CardContent>
          </Card>

          <div className="mt-8 text-center">
            <p className="text-xs text-gray-500">
              By continuing, you agree to our{" "}
              <Button variant="link" className="p-0 h-auto text-xs">
                Terms of Service
              </Button>{" "}
              and{" "}
              <Button variant="link" className="p-0 h-auto text-xs">
                Privacy Policy
              </Button>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
