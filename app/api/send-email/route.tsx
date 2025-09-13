import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const { to, subject, type, data } = await request.json()

    console.log("[v0] Email request received:", { to, subject, type })

    // Generate email content based on type
    let emailContent = ""
    let emailSubject = subject

    switch (type) {
      case "daily_report":
        emailContent = generateDailyReportEmail(data)
        emailSubject = "🌱 Your Daily Energy Report"
        break
      case "weekly_goals":
        emailContent = generateWeeklyGoalsEmail(data)
        emailSubject = "🎯 Weekly Goals Update"
        break
      case "energy_alert":
        emailContent = generateEnergyAlertEmail(data)
        emailSubject = "⚡ Energy Usage Alert"
        break
      case "achievement":
        emailContent = generateAchievementEmail(data)
        emailSubject = "🏆 New Achievement Unlocked!"
        break
      default:
        emailContent = `<p>${data.message || "Energy tracker notification"}</p>`
    }

    const RESEND_API_KEY = process.env.RESEND_API_KEY

    if (RESEND_API_KEY && RESEND_API_KEY !== "demo_key") {
      console.log("[v0] Sending email via Resend API...")

      const emailResponse = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${RESEND_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from: "Energy Guardians <noreply@energyguardians.app>",
          to: [to],
          subject: emailSubject,
          html: emailContent,
        }),
      })

      if (!emailResponse.ok) {
        const errorData = await emailResponse.json()
        console.error("[v0] Resend API error:", errorData)
        throw new Error(`Resend API error: ${errorData.message}`)
      }

      const result = await emailResponse.json()
      console.log("[v0] Email sent successfully via Resend:", result.id)

      return NextResponse.json({
        success: true,
        message: "Email sent successfully via Resend",
        emailId: result.id,
        preview: emailContent,
      })
    } else {
      console.log("[v0] No Resend API key found, running in simulation mode")
      console.log("[v0] Email would be sent to:", to)
      console.log("[v0] Subject:", emailSubject)

      return NextResponse.json({
        success: true,
        message: "Email sent successfully (simulation mode - configure RESEND_API_KEY for real emails)",
        preview: emailContent,
        simulation: true,
      })
    }
  } catch (error) {
    console.error("[v0] Email sending error:", error)
    return NextResponse.json(
      {
        success: false,
        message: `Failed to send email: ${error instanceof Error ? error.message : "Unknown error"}`,
      },
      { status: 500 },
    )
  }
}

function generateDailyReportEmail(data: any) {
  return `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <h2 style="color: #10b981;">🌱 Daily Energy Report</h2>
      <p>Hello Energy Guardian!</p>
      <p>Here's your daily energy consumption summary:</p>
      
      <div style="background: #f0fdf4; padding: 20px; border-radius: 8px; margin: 20px 0;">
        <h3>Today's Stats</h3>
        <ul>
          <li><strong>Total Consumption:</strong> ${data.totalConsumption || "0"} kWh</li>
          <li><strong>Carbon Footprint:</strong> ${data.carbonFootprint || "0"} kg CO₂</li>
          <li><strong>Cost:</strong> $${data.totalCost || "0.00"}</li>
          <li><strong>Efficiency Score:</strong> ${data.efficiencyScore || "0"}/100</li>
        </ul>
      </div>
      
      <p>Keep up the great work protecting our planet! 🌍</p>
      <p>Best regards,<br>Your Energy Guardians Team</p>
    </div>
  `
}

function generateWeeklyGoalsEmail(data: any) {
  return `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <h2 style="color: #3b82f6;">🎯 Weekly Goals Update</h2>
      <p>Hello Energy Guardian!</p>
      <p>Here's your weekly progress update:</p>
      
      <div style="background: #eff6ff; padding: 20px; border-radius: 8px; margin: 20px 0;">
        <h3>This Week's Progress</h3>
        <ul>
          <li><strong>Goal Progress:</strong> ${data.goalProgress || "0"}% complete</li>
          <li><strong>Energy Saved:</strong> ${data.energySaved || "0"} kWh</li>
          <li><strong>Ranking:</strong> #${data.ranking || "N/A"} in your neighborhood</li>
        </ul>
      </div>
      
      <p>You're making a real difference! Keep going! 💪</p>
      <p>Best regards,<br>Your Energy Guardians Team</p>
    </div>
  `
}

function generateEnergyAlertEmail(data: any) {
  return `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <h2 style="color: #f59e0b;">⚡ Energy Alert</h2>
      <p>Hello Energy Guardian!</p>
      <p><strong>Alert:</strong> ${data.alertMessage || "High energy usage detected"}</p>
      
      <div style="background: #fef3c7; padding: 20px; border-radius: 8px; margin: 20px 0;">
        <h3>Quick Actions</h3>
        <ul>
          <li>Check your highest consuming appliances</li>
          <li>Consider adjusting your thermostat</li>
          <li>Turn off unused devices</li>
        </ul>
      </div>
      
      <p>Small changes make a big impact! 🌱</p>
      <p>Best regards,<br>Your Energy Guardians Team</p>
    </div>
  `
}

function generateAchievementEmail(data: any) {
  return `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <h2 style="color: #8b5cf6;">🏆 Achievement Unlocked!</h2>
      <p>Congratulations, Energy Guardian!</p>
      <p>You've earned a new achievement: <strong>${data.achievementName || "Energy Saver"}</strong></p>
      
      <div style="background: #f3e8ff; padding: 20px; border-radius: 8px; margin: 20px 0; text-align: center;">
        <h3>🎉 ${data.achievementName || "Energy Saver"}</h3>
        <p>${data.achievementDescription || "You've successfully reduced your energy consumption!"}</p>
        <p><strong>Reward:</strong> ${data.reward || "50 Guardian Points"}</p>
      </div>
      
      <p>Keep up the amazing work! 🌟</p>
      <p>Best regards,<br>Your Energy Guardians Team</p>
    </div>
  `
}
