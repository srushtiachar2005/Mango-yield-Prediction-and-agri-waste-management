"use client"

import { Card } from "@/components/ui/card"
import { useState } from "react"

interface Suggestion {
  title: string
  description: string
  benefits: string[]
  icon: string
}

const wasteSuggestions: Suggestion[] = [
  {
    title: "Compost Production",
    description: "Convert mango leaves and branches into nutrient-rich compost",
    benefits: ["Reduces waste", "Improves soil health", "Cost-effective fertilizer"],
    icon: "🌱",
  },
  {
    title: "Biochar",
    description: "Process wood waste into biochar for soil amendment",
    benefits: ["Carbon sequestration", "Water retention", "Nutrient absorption"],
    icon: "⚫",
  },
  {
    title: "Animal Feed",
    description: "Process leaves and branches into livestock feed supplements",
    benefits: ["Additional income", "Reduces feed costs", "Sustainable practice"],
    icon: "🐄",
  },
  {
    title: "Biofuel Production",
    description: "Convert organic waste into renewable energy",
    benefits: ["Alternative energy source", "Waste reduction", "Environmental benefit"],
    icon: "⚡",
  },
  {
    title: "Packaging Material",
    description: "Create biodegradable packaging from mango waste",
    benefits: ["Reduces plastic use", "Premium packaging option", "Market opportunity"],
    icon: "📦",
  },
  {
    title: "Mulching",
    description: "Use waste materials for soil moisture retention",
    benefits: ["Water conservation", "Weed control", "Soil enrichment"],
    icon: "🌾",
  },
]

export function WasteSuggestions() {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null)

  return (
    <div className="space-y-4">
      <Card className="p-6 bg-card shadow-md">
        <h3 className="text-2xl font-bold mb-1 text-card-foreground">Waste Reuse</h3>
        <p className="text-sm text-muted-foreground mb-6">Solutions for agricultural waste</p>

        <div className="space-y-3 max-h-[800px] overflow-y-auto pr-2">
          {wasteSuggestions.map((suggestion, index) => (
            <div
              key={index}
              className="border border-border rounded-lg p-4 cursor-pointer hover:bg-accent/5 transition-colors"
              onClick={() => setExpandedIndex(expandedIndex === index ? null : index)}
            >
              <div className="flex items-start gap-3">
                <span className="text-2xl">{suggestion.icon}</span>
                <div className="flex-1">
                  <p className="font-semibold text-card-foreground">{suggestion.title}</p>
                  <p className="text-xs text-muted-foreground mt-1">{suggestion.description}</p>

                  {expandedIndex === index && (
                    <div className="mt-3 pt-3 border-t border-border">
                      <p className="text-xs font-semibold text-primary mb-2">Key Benefits:</p>
                      <ul className="space-y-1">
                        {suggestion.benefits.map((benefit, i) => (
                          <li key={i} className="text-xs text-muted-foreground flex items-center gap-2">
                            <span className="text-secondary">✓</span>
                            {benefit}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  )
}
