"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ArrowLeft, Loader2 } from "lucide-react"

interface YieldPredictionProps {
  onBack: () => void
}

interface PredictionResult {
  yield: number
  confidence: number
  analysis: string
}

export default function YieldPrediction({ onBack }: YieldPredictionProps) {
  const [formData, setFormData] = useState({
    region: "",
    season: "",
    area: "",
    rainfall: "",
    temperature: "",
    humidity: "",
  })

  const [result, setResult] = useState<PredictionResult | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setResult(null)

    if (
      !formData.region ||
      !formData.season ||
      !formData.area ||
      !formData.rainfall ||
      !formData.temperature ||
      !formData.humidity
    ) {
      setError("Please fill in all fields")
      return
    }

    setLoading(true)
    try {
      const response = await fetch("/api/predict-yield", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          region: formData.region,
          season: formData.season,
          area: Number.parseFloat(formData.area),
          rainfall: Number.parseFloat(formData.rainfall),
          temperature: Number.parseFloat(formData.temperature),
          humidity: Number.parseFloat(formData.humidity),
        }),
      })

      if (!response.ok) throw new Error("Prediction failed")
      const data = await response.json()
      setResult(data)
    } catch (err) {
      setError("Failed to generate prediction. Please try again.")
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
      <h2 className="text-3xl font-bold text-foreground mb-2">Mango Yield Prediction</h2>
      <p className="text-muted-foreground mb-8">Enter your farming parameters to get an AI-powered yield prediction</p>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Form */}
        <div className="lg:col-span-2">
          <Card className="p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Region */}
              <div className="space-y-2">
                <Label htmlFor="region">Region</Label>
                <Select value={formData.region} onValueChange={(value) => handleSelectChange("region", value)}>
                  <SelectTrigger id="region">
                    <SelectValue placeholder="Select region" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="maharashtra">Maharashtra</SelectItem>
                    <SelectItem value="karnataka">Karnataka</SelectItem>
                    <SelectItem value="tamil_nadu">Tamil Nadu</SelectItem>
                    <SelectItem value="andhra_pradesh">Andhra Pradesh</SelectItem>
                    <SelectItem value="telangana">Telangana</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Season */}
              <div className="space-y-2">
                <Label htmlFor="season">Season</Label>
                <Select value={formData.season} onValueChange={(value) => handleSelectChange("season", value)}>
                  <SelectTrigger id="season">
                    <SelectValue placeholder="Select season" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="summer">Summer</SelectItem>
                    <SelectItem value="monsoon">Monsoon</SelectItem>
                    <SelectItem value="winter">Winter</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Area */}
              <div className="space-y-2">
                <Label htmlFor="area">Farm Area (hectares)</Label>
                <Input
                  id="area"
                  name="area"
                  type="number"
                  step="0.1"
                  placeholder="Enter farm area"
                  value={formData.area}
                  onChange={handleInputChange}
                  className="h-11"
                />
              </div>

              {/* Rainfall */}
              <div className="space-y-2">
                <Label htmlFor="rainfall">Rainfall (mm)</Label>
                <Input
                  id="rainfall"
                  name="rainfall"
                  type="number"
                  step="0.1"
                  placeholder="Enter annual rainfall"
                  value={formData.rainfall}
                  onChange={handleInputChange}
                  className="h-11"
                />
              </div>

              {/* Temperature */}
              <div className="space-y-2">
                <Label htmlFor="temperature">Average Temperature (°C)</Label>
                <Input
                  id="temperature"
                  name="temperature"
                  type="number"
                  step="0.1"
                  placeholder="Enter temperature"
                  value={formData.temperature}
                  onChange={handleInputChange}
                  className="h-11"
                />
              </div>

              {/* Humidity */}
              <div className="space-y-2">
                <Label htmlFor="humidity">Humidity (%)</Label>
                <Input
                  id="humidity"
                  name="humidity"
                  type="number"
                  step="0.1"
                  min="0"
                  max="100"
                  placeholder="Enter humidity"
                  value={formData.humidity}
                  onChange={handleInputChange}
                  className="h-11"
                />
              </div>

              {error && (
                <div className="p-4 bg-destructive/10 border border-destructive/30 rounded-lg text-sm text-destructive">
                  {error}
                </div>
              )}

              <Button
                type="submit"
                disabled={loading}
                className="w-full h-11 bg-gradient-to-r from-primary to-secondary hover:opacity-90 text-primary-foreground font-semibold"
              >
                {loading ? (
                  <>
                    <Loader2 size={18} className="mr-2 animate-spin" />
                    Predicting...
                  </>
                ) : (
                  "Get Yield Prediction"
                )}
              </Button>
            </form>
          </Card>
        </div>

        {/* Results */}
        <div>
          {result && (
            <Card className="p-6 bg-gradient-to-br from-primary/5 to-secondary/5 border-2 border-primary/20">
              <h3 className="text-xl font-bold text-foreground mb-4">Prediction Result</h3>

              <div className="space-y-4">
                {/* Yield */}
                <div className="bg-background rounded-lg p-4 border border-border">
                  <p className="text-sm text-muted-foreground mb-1">Estimated Yield</p>
                  <p className="text-3xl font-bold text-primary">
                    {result.yield.toFixed(1)} <span className="text-lg text-muted-foreground">tonnes/ha</span>
                  </p>
                </div>

                {/* Confidence */}
                <div className="bg-background rounded-lg p-4 border border-border">
                  <p className="text-sm text-muted-foreground mb-1">Prediction Confidence</p>
                  <p className="text-2xl font-bold text-secondary">{result.confidence.toFixed(1)}%</p>
                </div>

                {/* Analysis */}
                <div className="bg-background rounded-lg p-4 border border-border">
                  <p className="text-sm text-muted-foreground mb-2">Analysis</p>
                  <p className="text-sm text-foreground leading-relaxed">{result.analysis}</p>
                </div>
              </div>
            </Card>
          )}
        </div>
      </div>
    </div>
  )
}
