"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { CheckCircle, ExternalLink, Mail, Settings } from "lucide-react"
import { emailSetupInstructions } from "@/lib/email-config"

export function EmailSetupGuide() {
  const [selectedService, setSelectedService] = useState<"resend" | "gmail">("resend")

  return (
    <Card className="w-full max-w-2xl">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Settings className="h-5 w-5" />
          Email Service Setup
        </CardTitle>
        <CardDescription>Configure an email service to send notifications to your Gmail account</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Service Selection */}
        <div className="space-y-3">
          <h3 className="font-medium">Choose Email Service:</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <Button
              variant={selectedService === "resend" ? "default" : "outline"}
              className="h-auto p-4 justify-start"
              onClick={() => setSelectedService("resend")}
            >
              <div className="text-left">
                <div className="flex items-center gap-2">
                  <Mail className="h-4 w-4" />
                  Resend
                  <Badge variant="secondary">Recommended</Badge>
                </div>
                <p className="text-xs text-muted-foreground mt-1">Modern email API, easy setup</p>
              </div>
            </Button>

            <Button
              variant={selectedService === "gmail" ? "default" : "outline"}
              className="h-auto p-4 justify-start"
              onClick={() => setSelectedService("gmail")}
            >
              <div className="text-left">
                <div className="flex items-center gap-2">
                  <Mail className="h-4 w-4" />
                  Gmail SMTP
                </div>
                <p className="text-xs text-muted-foreground mt-1">Use your existing Gmail account</p>
              </div>
            </Button>
          </div>
        </div>

        {/* Setup Instructions */}
        <div className="space-y-4">
          <h3 className="font-medium">Setup Instructions for {emailSetupInstructions[selectedService].name}:</h3>
          <div className="space-y-2">
            {emailSetupInstructions[selectedService].steps.map((step, index) => (
              <div key={index} className="flex items-start gap-3 p-3 bg-muted/50 rounded-lg">
                <CheckCircle className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                <span className="text-sm">{step}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Environment Variables */}
        <Alert>
          <Settings className="h-4 w-4" />
          <AlertDescription>
            <strong>Environment Variables Needed:</strong>
            <br />
            {selectedService === "resend" ? (
              <code className="text-xs bg-muted px-2 py-1 rounded mt-1 inline-block">
                RESEND_API_KEY=your_api_key_here
              </code>
            ) : (
              <div className="space-y-1 mt-1">
                <code className="text-xs bg-muted px-2 py-1 rounded block">GMAIL_USER=your-email@gmail.com</code>
                <code className="text-xs bg-muted px-2 py-1 rounded block">
                  GMAIL_APP_PASSWORD=your_16_character_app_password
                </code>
              </div>
            )}
          </AlertDescription>
        </Alert>

        {/* Quick Links */}
        <div className="flex gap-2">
          {selectedService === "resend" && (
            <Button variant="outline" size="sm" asChild>
              <a href="https://resend.com" target="_blank" rel="noopener noreferrer">
                <ExternalLink className="h-3 w-3 mr-1" />
                Open Resend
              </a>
            </Button>
          )}
          {selectedService === "gmail" && (
            <Button variant="outline" size="sm" asChild>
              <a href="https://myaccount.google.com/apppasswords" target="_blank" rel="noopener noreferrer">
                <ExternalLink className="h-3 w-3 mr-1" />
                Generate App Password
              </a>
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
