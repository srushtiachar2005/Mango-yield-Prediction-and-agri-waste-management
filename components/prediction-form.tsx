"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { PredictionResult } from "./prediction-result"

interface PredictionData {
  region: string
  season: string
  area: number
  rainfall: number
  temperature: number
  humidity: number
}

interface PredictionResponse {
  estimated_yield: number
  confidence: number
  analysis: string
}

export function PredictionForm() {
  const [formData, setFormData] = useState<PredictionData>({
    region: "Maharashtra",
    season: "Summer",
    area: 10,
    rainfall: 800,
    temperature: 28,
    humidity: 65,
  })
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState<PredictionResponse | null>(null)
  const [error, setError] = useState<string | null>(null)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: isNaN(Number(value)) ? value : Number(value),
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)
    setResult(null)

    try {
      const response = await fetch("/api/predict", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })

      if (!response.ok) {
        throw new Error("Failed to get prediction")
      }

      const data = await response.json()
      setResult(data)
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred")
    } finally {
      setLoading(false)
    }
  }

  return (
    <Card className="p-8 bg-card shadow-md hover:shadow-lg transition-shadow">
      <h2 className="text-3xl font-bold mb-2 text-card-foreground">Yield Prediction</h2>
      <p className="text-muted-foreground mb-6">Enter your farm details to get AI-powered yield predictions</p>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Region */}
          <div>
            <label className="block text-sm font-semibold mb-2 text-card-foreground">Region</label>
            <select
              name="region"
              value={formData.region}
              onChange={handleInputChange}
              className="w-full px-4 py-2 rounded-lg border border-input bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
            >
              <option>Maharashtra</option>
              <option>Karnataka</option>
              <option>Andhra Pradesh</option>
              <option>Gujarat</option>
              <option>Tamil Nadu</option>
              <option>Uttar Pradesh</option>
            </select>
          </div>

          {/* Season */}
          <div>
            <label className="block text-sm font-semibold mb-2 text-card-foreground">Season</label>
            <select
              name="season"
              value={formData.season}
              onChange={handleInputChange}
              className="w-full px-4 py-2 rounded-lg border border-input bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
            >
              <option>Summer</option>
              <option>Monsoon</option>
              <option>Winter</option>
            </select>
          </div>

          {/* Area */}
          <div>
            <label className="block text-sm font-semibold mb-2 text-card-foreground">Farm Area (hectares)</label>
            <Input
              type="number"
              name="area"
              value={formData.area}
              onChange={handleInputChange}
              placeholder="Enter area in hectares"
              step="0.1"
              min="0"
              className="w-full"
            />
          </div>

          {/* Rainfall */}
          <div>
            <label className="block text-sm font-semibold mb-2 text-card-foreground">Annual Rainfall (mm)</label>
            <Input
              type="number"
              name="rainfall"
              value={formData.rainfall}
              onChange={handleInputChange}
              placeholder="Enter rainfall in mm"
              step="10"
              min="0"
              className="w-full"
            />
          </div>

          {/* Temperature */}
          <div>
            <label className="block text-sm font-semibold mb-2 text-card-foreground">Average Temperature (°C)</label>
            <Input
              type="number"
              name="temperature"
              value={formData.temperature}
              onChange={handleInputChange}
              placeholder="Enter temperature"
              step="0.1"
              min="-50"
              max="60"
              className="w-full"
            />
          </div>

          {/* Humidity */}
          <div>
            <label className="block text-sm font-semibold mb-2 text-card-foreground">Average Humidity (%)</label>
            <Input
              type="number"
              name="humidity"
              value={formData.humidity}
              onChange={handleInputChange}
              placeholder="Enter humidity percentage"
              step="1"
              min="0"
              max="100"
              className="w-full"
            />
          </div>
        </div>

        <Button
          type="submit"
          disabled={loading}
          className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold py-3 rounded-lg transition-all"
        >
          {loading ? (
            <span className="flex items-center gap-2">
              <span className="animate-spin">⟳</span>
              Predicting...
            </span>
          ) : (
            "Get Prediction"
          )}
        </Button>
      </form>

      {error && (
        <div className="mt-6 p-4 bg-destructive/10 border border-destructive/20 rounded-lg text-destructive">
          <p className="font-semibold">Error</p>
          <p>{error}</p>
        </div>
      )}

      {result && <PredictionResult result={result} formData={formData} />}
    </Card>
  )
}
