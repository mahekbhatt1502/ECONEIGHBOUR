// Email service configuration and setup instructions

export const emailSetupInstructions = {
  resend: {
    name: "Resend (Recommended)",
    steps: [
      "1. Go to https://resend.com and create an account",
      "2. Verify your domain or use resend.dev for testing",
      "3. Generate an API key from your dashboard",
      "4. Add RESEND_API_KEY to your environment variables",
    ],
    envVar: "RESEND_API_KEY",
  },

  gmail: {
    name: "Gmail SMTP",
    steps: [
      "1. Enable 2-factor authentication on your Gmail account",
      "2. Generate an App Password: Google Account > Security > App passwords",
      "3. Add GMAIL_USER (your email) and GMAIL_APP_PASSWORD to environment variables",
      "4. Use the 16-character app password, not your regular password",
    ],
    envVars: ["GMAIL_USER", "GMAIL_APP_PASSWORD"],
  },
}

export function getEmailServiceStatus() {
  const hasResend = !!process.env.RESEND_API_KEY
  const hasGmail = !!(process.env.GMAIL_USER && process.env.GMAIL_APP_PASSWORD)

  return {
    resend: hasResend,
    gmail: hasGmail,
    configured: hasResend || hasGmail,
    recommended: hasResend ? "resend" : hasGmail ? "gmail" : "none",
  }
}
