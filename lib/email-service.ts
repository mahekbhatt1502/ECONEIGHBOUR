// Email service utility functions
export interface EmailData {
  totalConsumption?: number
  carbonFootprint?: number
  totalCost?: number
  efficiencyScore?: number
  goalProgress?: number
  energySaved?: number
  ranking?: number
  alertMessage?: string
  achievementName?: string
  achievementDescription?: string
  reward?: string
  message?: string
}

export interface EmailRequest {
  to: string
  subject: string
  type: "daily_report" | "weekly_goals" | "energy_alert" | "achievement" | "custom"
  data: EmailData
}

export async function sendEmail(
  emailRequest: EmailRequest,
): Promise<{ success: boolean; message: string; preview?: string }> {
  try {
    const response = await fetch("/api/send-email", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(emailRequest),
    })

    const result = await response.json()
    return result
  } catch (error) {
    console.error("[v0] Email service error:", error)
    return { success: false, message: "Failed to send email" }
  }
}

// Predefined email templates
export const emailTemplates = {
  dailyReport: (data: EmailData) => ({
    subject: "🌱 Your Daily Energy Report",
    type: "daily_report" as const,
    data,
  }),

  weeklyGoals: (data: EmailData) => ({
    subject: "🎯 Weekly Goals Update",
    type: "weekly_goals" as const,
    data,
  }),

  energyAlert: (data: EmailData) => ({
    subject: "⚡ Energy Usage Alert",
    type: "energy_alert" as const,
    data,
  }),

  achievement: (data: EmailData) => ({
    subject: "🏆 New Achievement Unlocked!",
    type: "achievement" as const,
    data,
  }),
}

// Auto-generate sample data for testing
export function generateSampleData(type: string): EmailData {
  switch (type) {
    case "daily_report":
      return {
        totalConsumption: Math.round(Math.random() * 50 + 10),
        carbonFootprint: Math.round(Math.random() * 25 + 5),
        totalCost: Math.round((Math.random() * 15 + 3) * 100) / 100,
        efficiencyScore: Math.round(Math.random() * 40 + 60),
      }

    case "weekly_goals":
      return {
        goalProgress: Math.round(Math.random() * 100),
        energySaved: Math.round(Math.random() * 100 + 20),
        ranking: Math.round(Math.random() * 50 + 1),
      }

    case "energy_alert":
      return {
        alertMessage: "Your energy usage is 25% higher than usual today. Consider checking your appliances.",
      }

    case "achievement":
      const achievements = [
        {
          name: "Energy Saver",
          description: "Reduced energy consumption by 20% this week!",
          reward: "100 Guardian Points",
        },
        {
          name: "Green Warrior",
          description: "Maintained low carbon footprint for 7 days straight!",
          reward: "150 Guardian Points",
        },
        {
          name: "Efficiency Master",
          description: "Achieved 90+ efficiency score for 3 consecutive days!",
          reward: "200 Guardian Points",
        },
      ]
      const achievement = achievements[Math.floor(Math.random() * achievements.length)]
      return {
        achievementName: achievement.name,
        achievementDescription: achievement.description,
        reward: achievement.reward,
      }

    default:
      return { message: "Energy tracker notification" }
  }
}
