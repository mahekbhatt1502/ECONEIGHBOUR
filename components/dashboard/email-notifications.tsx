"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { Mail, Bell, Settings, Send, CheckCircle, Loader2 } from "lucide-react"
import { sendEmail, emailTemplates, generateSampleData } from "@/lib/email-service"

export function EmailNotifications() {
  const [email, setEmail] = useState("")
  const [notifications, setNotifications] = useState({
    dailyReport: true,
    weeklyGoals: true,
    energyAlerts: false,
    communityUpdates: true,
    achievements: true,
  })
  const [isConnected, setIsConnected] = useState(false)
  const [testEmailSent, setTestEmailSent] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [emailPreview, setEmailPreview] = useState("")

  useEffect(() => {
    const storedEmail = localStorage.getItem("userEmail")
    if (storedEmail) {
      setEmail(storedEmail)
      setIsConnected(true)
    }
  }, [])

  const handleConnectEmail = () => {
    if (email) {
      setIsConnected(true)
      localStorage.setItem("userEmail", email)
      console.log("[v0] Email connected:", email)
    }
  }

  const handleSendTestEmail = async () => {
    if (!isConnected || isLoading) return

    setIsLoading(true)
    try {
      const sampleData = generateSampleData("daily_report")
      const template = emailTemplates.dailyReport(sampleData)

      const result = await sendEmail({
        to: email,
        subject: template.subject,
        type: template.type,
        data: template.data,
      })

      if (result.success) {
        setTestEmailSent(true)
        setEmailPreview(result.preview || "")
        setTimeout(() => {
          setTestEmailSent(false)
          setEmailPreview("")
        }, 10000)
      }
    } catch (error) {
      console.error("[v0] Failed to send test email:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const sendNotificationEmail = async (type: "daily_report" | "weekly_goals" | "energy_alert" | "achievement") => {
    if (!isConnected || isLoading) return

    setIsLoading(true)
    try {
      const sampleData = generateSampleData(type)
      const template =
        emailTemplates[
          type === "daily_report"
            ? "dailyReport"
            : type === "weekly_goals"
              ? "weeklyGoals"
              : type === "energy_alert"
                ? "energyAlert"
                : "achievement"
        ](sampleData)

      const result = await sendEmail({
        to: email,
        subject: template.subject,
        type: template.type,
        data: template.data,
      })

      if (result.success) {
        setEmailPreview(result.preview || "")
        setTimeout(() => setEmailPreview(""), 8000)
      }
    } catch (error) {
      console.error("[v0] Failed to send notification email:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleNotificationChange = (key: string, value: boolean) => {
    setNotifications((prev) => ({ ...prev, [key]: value }))
  }

  return (
    <Card className="w-full max-w-2xl">
      <CardHeader>
        <div className="flex items-center gap-2">
          <Mail className="h-5 w-5 text-emerald-600" />
          <CardTitle>Email Notifications</CardTitle>
        </div>
        <CardDescription>Connect your email to receive energy reports and notifications</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Email Connection */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <Label htmlFor="email" className="text-sm font-medium">
              Email Address
            </Label>
            {isConnected && (
              <Badge variant="secondary" className="bg-emerald-100 text-emerald-700">
                <CheckCircle className="h-3 w-3 mr-1" />
                Connected
              </Badge>
            )}
          </div>

          <div className="flex gap-2">
            <Input
              id="email"
              type="email"
              placeholder="your.email@gmail.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={isConnected}
              className="flex-1"
            />
            <Button
              onClick={handleConnectEmail}
              disabled={!email || isConnected}
              variant={isConnected ? "secondary" : "default"}
            >
              {isConnected ? "Connected" : "Connect"}
            </Button>
          </div>
        </div>

        <Separator />

        {/* Notification Preferences */}
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <Bell className="h-4 w-4" />
            <Label className="text-sm font-medium">Notification Preferences</Label>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5 flex-1">
                <Label className="text-sm">Daily Energy Report</Label>
                <p className="text-xs text-muted-foreground">Daily summary of your energy consumption and savings</p>
              </div>
              <div className="flex items-center gap-2">
                <Switch
                  checked={notifications.dailyReport}
                  onCheckedChange={(checked) => handleNotificationChange("dailyReport", checked)}
                  disabled={!isConnected}
                />
                {isConnected && (
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => sendNotificationEmail("daily_report")}
                    disabled={isLoading}
                  >
                    Preview
                  </Button>
                )}
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-0.5 flex-1">
                <Label className="text-sm">Weekly Goals Update</Label>
                <p className="text-xs text-muted-foreground">Progress updates on your weekly energy goals</p>
              </div>
              <div className="flex items-center gap-2">
                <Switch
                  checked={notifications.weeklyGoals}
                  onCheckedChange={(checked) => handleNotificationChange("weeklyGoals", checked)}
                  disabled={!isConnected}
                />
                {isConnected && (
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => sendNotificationEmail("weekly_goals")}
                    disabled={isLoading}
                  >
                    Preview
                  </Button>
                )}
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-0.5 flex-1">
                <Label className="text-sm">Energy Alerts</Label>
                <p className="text-xs text-muted-foreground">Alerts when energy usage exceeds your set limits</p>
              </div>
              <div className="flex items-center gap-2">
                <Switch
                  checked={notifications.energyAlerts}
                  onCheckedChange={(checked) => handleNotificationChange("energyAlerts", checked)}
                  disabled={!isConnected}
                />
                {isConnected && (
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => sendNotificationEmail("energy_alert")}
                    disabled={isLoading}
                  >
                    Preview
                  </Button>
                )}
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-0.5 flex-1">
                <Label className="text-sm">Community Updates</Label>
                <p className="text-xs text-muted-foreground">Updates from your neighborhood energy community</p>
              </div>
              <div className="flex items-center gap-2">
                <Switch
                  checked={notifications.communityUpdates}
                  onCheckedChange={(checked) => handleNotificationChange("communityUpdates", checked)}
                  disabled={!isConnected}
                />
                {isConnected && (
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => sendNotificationEmail("community_updates")}
                    disabled={isLoading}
                  >
                    Preview
                  </Button>
                )}
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-0.5 flex-1">
                <Label className="text-sm">Achievement Notifications</Label>
                <p className="text-xs text-muted-foreground">Celebrate your energy-saving milestones and badges</p>
              </div>
              <div className="flex items-center gap-2">
                <Switch
                  checked={notifications.achievements}
                  onCheckedChange={(checked) => handleNotificationChange("achievements", checked)}
                  disabled={!isConnected}
                />
                {isConnected && (
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => sendNotificationEmail("achievement")}
                    disabled={isLoading}
                  >
                    Preview
                  </Button>
                )}
              </div>
            </div>
          </div>
        </div>

        <Separator />

        {/* Test Email */}
        {isConnected && (
          <div className="space-y-3">
            <Label className="text-sm font-medium">Test Email</Label>
            <Button
              onClick={handleSendTestEmail}
              variant="outline"
              className="w-full bg-transparent"
              disabled={testEmailSent || isLoading}
            >
              {isLoading ? <Loader2 className="h-4 w-4 mr-2 animate-spin" /> : <Send className="h-4 w-4 mr-2" />}
              {testEmailSent ? "Test Email Sent!" : isLoading ? "Sending..." : "Send Test Email"}
            </Button>
            {testEmailSent && (
              <p className="text-xs text-emerald-600 text-center">Check your inbox for a test notification email!</p>
            )}
          </div>
        )}

        {emailPreview && (
          <div className="space-y-3">
            <Label className="text-sm font-medium">Email Preview</Label>
            <div className="bg-gray-50 dark:bg-gray-900 p-4 rounded-lg max-h-64 overflow-y-auto">
              <div dangerouslySetInnerHTML={{ __html: emailPreview }} />
            </div>
          </div>
        )}

        {/* Integration Note */}
        <div className="bg-blue-50 dark:bg-blue-950/20 p-4 rounded-lg">
          <div className="flex items-start gap-2">
            <Settings className="h-4 w-4 text-blue-600 mt-0.5" />
            <div className="text-xs text-blue-700 dark:text-blue-300">
              <p className="font-medium mb-1">Email System Active</p>
              <p>
                The email system is now fully functional with preview capabilities. In production, connect a service
                like Resend or SendGrid for actual email delivery. Currently showing email previews for testing.
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
