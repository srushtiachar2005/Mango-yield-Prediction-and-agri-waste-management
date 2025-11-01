"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card } from "@/components/ui/card"
import { ArrowLeft, Loader2 } from "lucide-react"

interface WasteRecommendationProps {
  onBack: () => void
}

interface Recommendation {
  use_case: string
  description: string
  benefits: string[]
  process: string
}

export default function WasteRecommendation({ onBack }: WasteRecommendationProps) {
  const [waste, setWaste] = useState("")
  const [recommendations, setRecommendations] = useState<Recommendation[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [searched, setSearched] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setRecommendations([])

    if (!waste.trim()) {
      setError("Please enter a type of waste")
      return
    }

    setLoading(true)
    setSearched(true)
    try {
      const response = await fetch("/api/waste-recommendations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ waste: waste.trim() }),
      })

      if (!response.ok) throw new Error("Failed to fetch recommendations")
      const data = await response.json()
      setRecommendations(data.recommendations)
    } catch (err) {
      setError("Failed to get recommendations. Please try again.")
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div>
      {/* Back Button */}
      <button
        onClick={onBack}
        className="flex items-center gap-2 text-primary hover:text-primary/80 mb-6 transition-colors"
      >
        <ArrowLeft size={20} />
        <span>Back to Dashboard</span>
      </button>

      {/* Title */}
      <h2 className="text-3xl font-bold text-foreground mb-2">Agricultural Waste Recommendations</h2>
      <p className="text-muted-foreground mb-8">
        Discover sustainable ways to reuse and repurpose your agricultural waste
      </p>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Input Form */}
        <div className="lg:col-span-1">
          <Card className="p-6 sticky top-24">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="waste">Type of Waste</Label>
                <Input
                  id="waste"
                  type="text"
                  placeholder="e.g., mango leaves, branches, seeds..."
                  value={waste}
                  onChange={(e) => setWaste(e.target.value)}
                  className="h-11"
                />
              </div>

              {error && (
                <div className="p-3 bg-destructive/10 border border-destructive/30 rounded-lg text-sm text-destructive">
                  {error}
                </div>
              )}

              <Button
                type="submit"
                disabled={loading}
                className="w-full h-11 bg-gradient-to-r from-secondary to-accent hover:opacity-90 text-secondary-foreground font-semibold"
              >
                {loading ? (
                  <>
                    <Loader2 size={18} className="mr-2 animate-spin" />
                    Searching...
                  </>
                ) : (
                  "Get Recommendations"
                )}
              </Button>

              {waste && (
                <p className="text-xs text-muted-foreground italic">
                  Searching for: <strong>{waste}</strong>
                </p>
              )}
            </form>
          </Card>
        </div>

        {/* Recommendations */}
        <div className="lg:col-span-2">
          {searched && loading && (
            <div className="flex flex-col items-center justify-center py-12 text-muted-foreground">
              <Loader2 size={32} className="animate-spin mb-4 text-primary" />
              <p>Finding recommendations for {waste}...</p>
            </div>
          )}

          {searched && !loading && recommendations.length === 0 && !error && (
            <div className="text-center py-12">
              <p className="text-muted-foreground mb-4">No specific recommendations found for "{waste}"</p>
              <p className="text-sm text-muted-foreground">Try entering a different waste type or be more specific</p>
            </div>
          )}

          {recommendations.length > 0 && (
            <div className="space-y-6">
              <p className="text-sm text-muted-foreground">
                Found {recommendations.length} way{recommendations.length !== 1 ? "s" : ""} to use{" "}
                <strong>{waste}</strong>
              </p>

              {recommendations.map((rec, index) => (
                <Card
                  key={index}
                  className="p-6 border-2 border-secondary/20 hover:border-secondary/50 transition-colors"
                >
                  <h3 className="text-xl font-bold text-foreground mb-2">{rec.use_case}</h3>
                  <p className="text-muted-foreground mb-4">{rec.description}</p>

                  {/* Process */}
                  <div className="mb-4">
                    <p className="text-sm font-semibold text-foreground mb-2">Process:</p>
                    <p className="text-sm text-muted-foreground bg-muted/30 p-3 rounded-lg">{rec.process}</p>
                  </div>

                  {/* Benefits */}
                  {rec.benefits.length > 0 && (
                    <div>
                      <p className="text-sm font-semibold text-foreground mb-2">Benefits:</p>
                      <ul className="space-y-2">
                        {rec.benefits.map((benefit, idx) => (
                          <li key={idx} className="flex items-start gap-2 text-sm text-muted-foreground">
                            <span className="text-secondary font-bold mt-0.5">✓</span>
                            <span>{benefit}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </Card>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
