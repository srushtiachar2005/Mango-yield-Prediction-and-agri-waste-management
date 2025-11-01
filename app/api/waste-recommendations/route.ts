import { type NextRequest, NextResponse } from "next/server"

// Waste recommendation database
const wasteDatabase: Record<string, any> = {
  "mango leaves": {
    use_case: "Organic Compost",
    description: "Convert mango leaves into nutrient-rich compost for soil enhancement and regeneration.",
    benefits: ["Improves soil fertility", "Increases organic matter", "Reduces landfill waste", "Cost-effective"],
    process:
      "Layer mango leaves with cow dung and vegetable waste, maintain 60% moisture, turn pile every 2 weeks, ready in 45-60 days",
  },
  "mango branches": {
    use_case: "Biomass Energy",
    description: "Use dried mango branches as biomass fuel for heating and energy generation.",
    benefits: ["Renewable energy source", "Reduces waste", "Can be sold for revenue", "Sustainable energy"],
    process:
      "Dry branches in sun for 2-3 weeks, chop into small pieces, can be used for burning in biomass furnaces or briquetting",
  },
  "mango seeds": {
    use_case: "Kernel Extraction",
    description: "Extract valuable mango kernel for cosmetic and food industry applications.",
    benefits: ["High market value", "Cosmetic applications", "Food additive potential", "Medicinal properties"],
    process:
      "Separate seeds from pulp, dry for 1 week, crack shells manually or mechanically, extract kernel for processing",
  },
  "mango pulp waste": {
    use_case: "Animal Feed",
    description: "Use mango pulp waste as nutritious animal feed for livestock.",
    benefits: ["Livestock nutrition", "Reduces waste", "Cost savings on feed", "Animal health improvement"],
    process:
      "Mix dried pulp waste with other feed ingredients, ensure proper storage to prevent fermentation, feed to cattle or goats",
  },
  "mango peel": {
    use_case: "Natural Dye Production",
    description: "Extract natural dyes from mango peels for textile and craft industries.",
    benefits: ["Eco-friendly dyes", "No chemical pollution", "Market value", "Sustainable practice"],
    process:
      "Collect peels, dry for 1-2 weeks, boil with water and mordants to create dye solutions, filter and concentrate",
  },
  "orchard trimmings": {
    use_case: "Mulch Material",
    description: "Shred orchard trimmings to create mulch for moisture retention and weed control.",
    benefits: ["Reduces water loss", "Controls weeds", "Improves soil quality", "Free mulch production"],
    process:
      "Collect pruned branches and leaves, shred using a mulcher, spread around base of trees, maintain 2-3 inch layer",
  },
  leaves: {
    use_case: "Herbal Tea Production",
    description: "Dry mango leaves to create herbal tea with health benefits.",
    benefits: ["Health product", "Commercial potential", "Traditional medicine value", "High demand"],
    process:
      "Pick fresh leaves, wash and dry in shade for 2-3 weeks, store in airtight containers, brew as tea with hot water",
  },
  waste: {
    use_case: "Waste Management",
    description: "Implement comprehensive waste management strategies for general agricultural waste.",
    benefits: ["Organized system", "Multiple uses", "Revenue generation", "Environmental protection"],
    process:
      "Segregate waste types, apply appropriate processing methods, consider composting, energy, or sale options",
  },
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { waste } = body

    if (!waste || typeof waste !== "string") {
      return NextResponse.json({ error: "Waste type is required" }, { status: 400 })
    }

    const normalizedWaste = waste.toLowerCase().trim()

    // Search for exact match or partial match
    const recommendations = []

    // Try exact match first
    if (wasteDatabase[normalizedWaste]) {
      recommendations.push(wasteDatabase[normalizedWaste])
    }

    // Try partial matches
    for (const [key, value] of Object.entries(wasteDatabase)) {
      if (key !== normalizedWaste && normalizedWaste.includes(key)) {
        recommendations.push(value)
      }
    }

    // If no matches, try reverse search (if any key includes the waste term)
    if (recommendations.length === 0) {
      for (const [key, value] of Object.entries(wasteDatabase)) {
        if (key.includes(normalizedWaste) && key !== "waste") {
          recommendations.push(value)
        }
      }
    }

    // Fallback to general waste management if nothing found
    if (recommendations.length === 0) {
      recommendations.push(wasteDatabase["waste"])
    }

    return NextResponse.json({ recommendations: recommendations.slice(0, 3) })
  } catch (error) {
    console.error("Waste recommendation error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
