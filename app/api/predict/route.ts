import { type NextRequest, NextResponse } from "next/server"

// Mock ML Model - Simulates mango yield prediction
// In production, this would call your actual Flask ML model
function mockMLPredict(formData: {
  region: string
  season: string
  area: number
  rainfall: number
  temperature: number
  humidity: number
}) {
  // Base yield calculation based on region and season
  const regionYields: Record<string, number> = {
    Maharashtra: 12,
    Karnataka: 11,
    "Andhra Pradesh": 13,
    Gujarat: 10,
    "Tamil Nadu": 12,
    "Uttar Pradesh": 9,
  }

  const seasonMultipliers: Record<string, number> = {
    Summer: 1.2,
    Monsoon: 1.0,
    Winter: 0.8,
  }

  const baseYield = regionYields[formData.region] || 10
  const seasonAdjustment = seasonMultipliers[formData.season] || 1.0

  // Rainfall impact (optimal: 800-1200mm)
  let rainfallFactor = 1.0
  if (formData.rainfall < 400) rainfallFactor = 0.5
  else if (formData.rainfall < 800) rainfallFactor = 0.8
  else if (formData.rainfall <= 1200) rainfallFactor = 1.2
  else if (formData.rainfall <= 1500) rainfallFactor = 1.0
  else rainfallFactor = 0.7

  // Temperature impact (optimal: 24-28°C)
  let temperatureFactor = 1.0
  if (formData.temperature < 20) temperatureFactor = 0.6
  else if (formData.temperature < 24) temperatureFactor = 0.85
  else if (formData.temperature <= 28) temperatureFactor = 1.1
  else if (formData.temperature <= 32) temperatureFactor = 0.9
  else temperatureFactor = 0.5

  // Humidity impact (optimal: 60-75%)
  let humidityFactor = 1.0
  if (formData.humidity < 40) humidityFactor = 0.7
  else if (formData.humidity < 60) humidityFactor = 0.9
  else if (formData.humidity <= 75) humidityFactor = 1.15
  else if (formData.humidity <= 85) humidityFactor = 0.95
  else humidityFactor = 0.7

  // Calculate estimated yield
  const estimatedYield =
    baseYield * formData.area * seasonAdjustment * rainfallFactor * temperatureFactor * humidityFactor

  // Calculate confidence based on how close conditions are to optimal
  let confidence = 0.75
  if (rainfallFactor > 0.9 && temperatureFactor > 0.9 && humidityFactor > 0.9) {
    confidence = 0.95
  } else if (rainfallFactor > 0.7 && temperatureFactor > 0.7 && humidityFactor > 0.7) {
    confidence = 0.85
  }

  // Generate analysis based on conditions
  const factors = []
  if (rainfallFactor > 1.0) factors.push("excellent rainfall conditions")
  if (rainfallFactor < 0.8) factors.push("low rainfall - consider irrigation")
  if (temperatureFactor > 1.0) factors.push("optimal temperature range")
  if (temperatureFactor < 0.8) factors.push("temperature outside optimal range")
  if (humidityFactor > 1.0) factors.push("ideal humidity levels")
  if (humidityFactor < 0.8) factors.push("humidity needs attention")

  const analysis =
    factors.length > 0
      ? `Your farm has ${factors.join(", ")}. ${estimatedYield > 50 ? "Expect good yield" : "Monitor conditions closely"} this ${formData.season.toLowerCase()} season.`
      : "Current conditions are acceptable for mango cultivation."

  return {
    estimated_yield: Math.max(0, estimatedYield),
    confidence: Math.min(1, Math.max(0.5, confidence)),
    analysis,
  }
}

export async function POST(request: NextRequest) {
  try {
    const formData = await request.json()

    // Validate input
    if (
      !formData.region ||
      !formData.season ||
      typeof formData.area !== "number" ||
      typeof formData.rainfall !== "number" ||
      typeof formData.temperature !== "number" ||
      typeof formData.humidity !== "number"
    ) {
      return NextResponse.json({ error: "Invalid input parameters" }, { status: 400 })
    }

    // Get prediction from mock ML model
    const prediction = mockMLPredict(formData)

    return NextResponse.json(prediction)
  } catch (error) {
    console.error("Prediction error:", error)
    return NextResponse.json({ error: "Failed to generate prediction" }, { status: 500 })
  }
}
