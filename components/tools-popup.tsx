"use client"

import { useState, ChangeEvent } from "react"
import { FormulaCalculations } from "@/app/types"
import { Card, CardContent, CardDescription, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { X, Mic, MicOff } from "lucide-react"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Textarea } from "@/components/ui/textarea"

interface ToolsPopupProps {
  showTools: boolean
  setShowTools: (show: boolean) => void
}

export default function ToolsPopup({ showTools, setShowTools }: ToolsPopupProps) {
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

  const [searchQuery, setSearchQuery] = useState("How much would X be if Y and Z?")
  const [searchOutput, setSearchOutput] = useState("")
  const [isRecording, setIsRecording] = useState(false)

  const handleSearch = () => {
    if (searchQuery === "How much would X be if Y and Z?") {
      setSearchOutput(
        "The answer based on Y and Z is that X would be [some calculated value]. This is a dummy response."
      )
    } else if (searchQuery.trim() === "") {
      setSearchOutput("")
    } else {
      setSearchOutput("This is a dummy response for your query.")
    }
  }

  const handleVoiceInput = () => {
    setIsRecording(!isRecording)
    // Simulate voice input - in a real implementation, this would use the Web Speech API
    if (!isRecording) {
      setTimeout(() => {
        setSearchQuery("Voice input: How much would X be if Y and Z?")
        setIsRecording(false)
      }, 2000)
    }
  }

  const calculateDosage = () => {
    const weight = Number.parseFloat(formulaCalculations.patientWeight) || 0
    const dosePerKg = Number.parseFloat(formulaCalculations.dosePerKg) || 0
    const frequency = Number.parseFloat(formulaCalculations.frequency) || 1
    const dose = weight * dosePerKg * frequency
    setFormulaCalculations((prev) => ({ ...prev, calculatedDose: dose }))
  }

  const calculateDaySupply = () => {
    const quantity = Number.parseFloat(formulaCalculations.quantity) || 0
    const dailyDose = Number.parseFloat(formulaCalculations.dailyDose) || 0
    const daySupply = dailyDose > 0 ? quantity / dailyDose : 0
    setFormulaCalculations((prev) => ({ ...prev, daySupply: daySupply }))
  }

  return (
    <aside
      className={`fixed top-0 right-0 z-50 h-screen w-full max-w-md bg-white shadow-lg transition-transform duration-300 ease-in-out dark:bg-gray-950 ${
        showTools ? "translate-x-0" : "translate-x-full"
      }`}
    >
      <div className="flex items-center justify-between p-4 border-b bg-gray-50 dark:bg-gray-900">
        <h2 className="text-xl font-bold">Tools</h2>
        <Button variant="ghost" size="icon" onClick={() => setShowTools(false)}>
          <X className="h-5 w-5" />
        </Button>
      </div>
      <div className="p-6 overflow-y-auto h-[calc(100vh-65px)] space-y-6">
        <div>
          <h3 className="text-lg font-semibold mb-2">AI Assistant</h3>
          <div className="border rounded-lg p-4 space-y-3">
            <div className="relative">
              <Textarea
                value={searchQuery}
                placeholder="Ask a question..."
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && !e.shiftKey && handleSearch()}
                className="min-h-[120px] pr-20 resize-none"
                style={{ height: "120px" }}
              />
              <div className="absolute bottom-2 right-2 flex gap-2">
                <Button
                  size="sm"
                  variant={isRecording ? "destructive" : "outline"}
                  onClick={handleVoiceInput}
                  className="h-8 w-8 p-0"
                >
                  {isRecording ? (
                    <MicOff className="h-4 w-4" />
                  ) : (
                    <Mic className="h-4 w-4" />
                  )}
                </Button>
                <Button
                  size="sm"
                  onClick={handleSearch}
                  className="h-8 px-3"
                >
                  Ask
                </Button>
              </div>
            </div>
            {searchOutput && (
              <Card>
                <CardContent className="p-3">
                  <p className="text-sm">{searchOutput}</p>
                </CardContent>
              </Card>
            )}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" className="w-full">
                Dosage Calculator
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-96">
              <Card>
                <CardHeader>
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
                          setFormulaCalculations((prev) => ({
                            ...prev,
                            patientWeight: e.target.value,
                          }))
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
                          setFormulaCalculations((prev) => ({ ...prev, dosePerKg: e.target.value }))
                        }
                        placeholder="5"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Frequency (times/day)</Label>
                      <Select
                        value={formulaCalculations.frequency}
                        onValueChange={(value: string) =>
                          setFormulaCalculations((prev) => ({ ...prev, frequency: value }))
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
                      <div className="p-3 bg-blue-50 rounded-md dark:bg-blue-900/20">
                        <span className="text-lg font-semibold text-blue-800 dark:text-blue-300">
                          {formulaCalculations.calculatedDose.toFixed(2)} mg/day
                        </span>
                      </div>
                    </div>
                  </div>
                  <Button onClick={calculateDosage} className="w-full">
                    Calculate Dosage
                  </Button>
                </CardContent>
              </Card>
            </PopoverContent>
          </Popover>

          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" className="w-full">
                Day Supply Calculator
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-96">
              <Card>
                <CardHeader>
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
                          setFormulaCalculations((prev) => ({ ...prev, quantity: e.target.value }))
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
                          setFormulaCalculations((prev) => ({ ...prev, dailyDose: e.target.value }))
                        }
                        placeholder="1"
                      />
                    </div>
                    <div className="space-y-2 col-span-2">
                      <Label>Day Supply</Label>
                      <div className="p-3 bg-green-50 rounded-md dark:bg-green-900/20">
                        <span className="text-lg font-semibold text-green-800 dark:text-green-300">
                          {formulaCalculations.daySupply.toFixed(0)} days
                        </span>
                      </div>
                    </div>
                  </div>
                  <Button onClick={calculateDaySupply} className="w-full">
                    Calculate Day Supply
                  </Button>
                </CardContent>
              </Card>
            </PopoverContent>
          </Popover>
        </div>
      </div>
    </aside>
  )
}