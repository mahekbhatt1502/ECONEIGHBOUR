"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"

interface Message {
  id: number
  text: string
  isUser: boolean
  timestamp: Date
}

const predefinedResponses = {
  "high bill":
    "Your bill was high this month due to increased AC usage during the heatwave. Try setting your AC to 24°C instead of 22°C to save ₹200 next month. You'll earn 50 carbon credits for this action!",
  "save energy":
    "Here are 3 quick wins: 1) Unplug devices when not in use (save ₹30/month), 2) Use LED bulbs (save ₹50/month), 3) Set geyser timer for 30 mins before use (save ₹150/month). Complete these to earn 75 carbon credits!",
  "carbon credits":
    "You currently have 750 carbon credits! You can redeem them for: 🎁 ₹50 electricity bill discount (500 credits), 🌱 Plant a real tree (300 credits), or 🏆 Premium features unlock (200 credits).",
}

export function AIAssistant() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: "Hi! I'm your AI energy assistant. Ask me about your bills, energy-saving tips, or carbon credits!",
      isUser: false,
      timestamp: new Date(),
    },
  ])
  const [input, setInput] = useState("")

  const handleSend = () => {
    if (!input.trim()) return

    const userMessage: Message = {
      id: messages.length + 1,
      text: input,
      isUser: true,
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])

    // Simple AI response logic
    setTimeout(() => {
      let response = "I understand your question. Let me help you with that!"

      const lowerInput = input.toLowerCase()
      if (lowerInput.includes("bill") || lowerInput.includes("high")) {
        response = predefinedResponses["high bill"]
      } else if (lowerInput.includes("save") || lowerInput.includes("reduce")) {
        response = predefinedResponses["save energy"]
      } else if (lowerInput.includes("credit") || lowerInput.includes("points")) {
        response = predefinedResponses["carbon credits"]
      }

      const aiMessage: Message = {
        id: messages.length + 2,
        text: response,
        isUser: false,
        timestamp: new Date(),
      }

      setMessages((prev) => [...prev, aiMessage])
    }, 1000)

    setInput("")
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <svg className="w-5 h-5 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
            />
          </svg>
          <span>AI Assistant</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <ScrollArea className="h-48 w-full">
            <div className="space-y-3 p-2">
              {messages.map((message) => (
                <div key={message.id} className={`flex ${message.isUser ? "justify-end" : "justify-start"}`}>
                  <div
                    className={`max-w-[80%] p-3 rounded-lg text-sm ${
                      message.isUser ? "bg-primary text-primary-foreground" : "bg-secondary text-secondary-foreground"
                    }`}
                  >
                    {message.text}
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>

          <div className="flex space-x-2">
            <Input
              placeholder="Ask about your energy usage..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && handleSend()}
            />
            <Button onClick={handleSend}>Send</Button>
          </div>

          <div className="grid grid-cols-1 gap-2">
            <Button variant="outline" size="sm" onClick={() => setInput("Why was my bill high this month?")}>
              Why was my bill high?
            </Button>
            <Button variant="outline" size="sm" onClick={() => setInput("How can I save more energy?")}>
              Energy saving tips
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
