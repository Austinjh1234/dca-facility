import React from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"

export default function ContactForm() {
  const [form, setForm] = React.useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  })
  const [submitted, setSubmitted] = React.useState(false)
  const [error, setError] = React.useState("")

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Simple validation
    if (!form.name || !form.email || !form.subject || !form.message) {
      setError("Please fill in all required fields.")
      return
    }
    setError("")
    setSubmitted(true)
    // Here you would send the form data to your backend or email service
  }

  if (submitted) {
    return (
      <Card className="max-w-lg mx-auto mt-8">
        <CardHeader>
          <CardTitle>Thank You!</CardTitle>
        </CardHeader>
        <CardContent>
          <p>Your message has been sent. We will get back to you soon.</p>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="max-w-lg mx-auto mt-8">
      <CardHeader>
        <CardTitle>Contact Us</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="name">Name*</Label>
            <Input id="name" name="name" value={form.name} onChange={handleChange} required />
          </div>
          <div>
            <Label htmlFor="email">Email*</Label>
            <Input id="email" name="email" type="email" value={form.email} onChange={handleChange} required />
          </div>
          <div>
            <Label htmlFor="phone">Phone</Label>
            <Input id="phone" name="phone" value={form.phone} onChange={handleChange} />
          </div>
          <div>
            <Label htmlFor="subject">Subject*</Label>
            <Input id="subject" name="subject" value={form.subject} onChange={handleChange} required />
          </div>
          <div>
            <Label htmlFor="message">Message*</Label>
            <Textarea id="message" name="message" value={form.message} onChange={handleChange} required rows={4} />
          </div>
          {error && <div className="text-red-600 text-sm">{error}</div>}
          <Button type="submit" className="w-full">Send Message</Button>
        </form>
      </CardContent>
    </Card>
  )
} 