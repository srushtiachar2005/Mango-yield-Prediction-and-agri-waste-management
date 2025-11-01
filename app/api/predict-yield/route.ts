import { type NextRequest, NextResponse } from "next/server"

// Mock ML model predictor
function predictYield(
  region: string,
  season: string,
  area: number,
  rainfall: number,
  temperature: number,
  humidity: number,
) {
  // Base yields by region (tonnes/ha)
  const baseYields: Record<string, number> = {
    maharashtra: 8.5,
    karnataka: 9.2,
    tamil_nadu: 8.8,
    andhra_pradesh: 9.5,
    telangana: 9.0,
  }

  // Season multipliers
  const seasonMultipliers: Record<string, number> = {
    summer: 0.85,
    monsoon: 1.15,
    winter: 0.95,
  }

  // Start with base yield
  let baseYield = baseYields[region] || 8.5

  // Apply season multiplier
  baseYield *= seasonMultipliers[season] || 1.0

  // Adjust based on rainfall (optimal: 600-900mm)
  if (rainfall < 400) baseYield *= 0.7
  else if (rainfall < 600) baseYield *= 0.85
  else if (rainfall < 900) baseYield *= 1.1
  else if (rainfall < 1200) baseYield *= 0.95
  else baseYield *= 0.8

  // Adjust based on temperature (optimal: 24-28°C)
  if (temperature < 18) baseYield *= 0.75
  else if (temperature < 24) baseYield *= 0.9
  else if (temperature < 28) baseYield *= 1.1
  else if (temperature < 32) baseYield *= 0.95
  else baseYield *= 0.7

  // Adjust based on humidity (optimal: 50-70%)
  if (humidity < 40) baseYield *= 0.85
  else if (humidity < 50) baseYield *= 0.95
  else if (humidity < 70) baseYield *= 1.1
  else if (humidity < 85) baseYield *= 0.9
  else baseYield *= 0.7

  // Area adjustment (scale efficiency)
  const areaFactor = area < 1 ? 0.9 : area > 10 ? 1.05 : 1.0
  baseYield *= areaFactor

  // Calculate confidence based on how close parameters are to optimal
  let confidence = 75
  const rainfallScore = Math.abs(rainfall - 750) / 750
  const tempScore = Math.abs(temperature - 26) / 26
  const humidityScore = Math.abs(humidity - 60) / 60

  confidence -= rainfallScore * 10 + tempScore * 10 + humidityScore * 10
  confidence = Math.max(60, Math.min(95, confidence))

  // Generate analysis
  let analysis = "Based on the parameters provided: "
  const factors = []

  if (rainfall > 600 && rainfall < 900) {
    factors.push("optimal rainfall conditions")
  } else if (rainfall < 400 || rainfall > 1200) {
    factors.push("challenging rainfall levels")
  }

  if (temperature > 23 && temperature < 29) {
    factors.push("ideal temperature range")
  } else {
    factors.push("suboptimal temperature conditions")
  }

  if (humidity > 45 && humidity < 75) {
    factors.push("good humidity levels")
  }

  analysis += factors.join(", ") + ". "
  analysis +=
    baseYield > 10
      ? "Expect a strong harvest this season."
      : baseYield > 8
        ? "Expect a moderate to good harvest."
        : "Consider implementing improvements in farm management."

  return {
    yield: Math.max(2, baseYield),
    confidence: confidence,
    analysis: analysis,
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    const { region, season, area, rainfall, temperature, humidity } = body

    if (
      !region ||
      !season ||
      area === undefined ||
      rainfall === undefined ||
      temperature === undefined ||
      humidity === undefined
    ) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    const prediction = predictYield(region, season, area, rainfall, temperature, humidity)

    return NextResponse.json(prediction)
  } catch (error) {
    console.error("Prediction error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
