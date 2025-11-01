"use client"

import type React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card } from "@/components/ui/card"
import {
  ArrowLeft,
  Loader2,
  Lightbulb,
  MapPin,
  Weight,
  Navigation,
  AlertCircle,
  CheckCircle2,
  TrendingUp,
} from "lucide-react"
import WasteMap from "./waste-map"

interface WasteRecommendationProps {
  onBack: () => void
}

interface Recommendation {
  use_case: string
  description: string
  benefits: string[]
  process: string
}

interface Industry {
  id: string
  name: string
  lat: number
  lng: number
  type: string
  location: string
}

const wasteTypes = [
  "Mango Peel",
  "Mango Seed",
  "Mango Husk",
  "Sugarcane Bagasse",
  "Paddy Straw",
  "Corn Husk",
  "Coconut Husk",
  "Mango Leaves",
  "Mango Branches",
  "Orchard Trimmings",
  "Other",
]

const industryDatabase: Record<string, Industry[]> = {
  bangalore: [
    {
      id: "bio1",
      name: "GreenFiber Pvt Ltd",
      lat: 13.0827,
      lng: 77.6033,
      type: "Biomass & Compost",
      location: "Bangalore",
    },
    {
      id: "bio2",
      name: "BioFuel Co.",
      lat: 13.1939,
      lng: 77.5941,
      type: "Biofuel",
      location: "Bangalore",
    },
    {
      id: "bio3",
      name: "Eco-Waste Solutions",
      lat: 12.9716,
      lng: 77.5946,
      type: "Waste Processing",
      location: "Bangalore",
    },
    {
      id: "bio4",
      name: "Karnataka Bio-Energy Corp",
      lat: 12.9716,
      lng: 77.5946,
      type: "Biomass Power",
      location: "Bangalore",
    },
    {
      id: "bio5",
      name: "AgriCycle Technologies",
      lat: 13.0827,
      lng: 77.6033,
      type: "Organic Fertilizer",
      location: "Bangalore",
    },
  ],
  tumkur: [
    {
      id: "tum1",
      name: "EcoFuel Unit - Tumkur",
      lat: 13.334,
      lng: 77.1014,
      type: "Biofuel",
      location: "Tumkur",
    },
    {
      id: "tum2",
      name: "GreenFiber Tumkur",
      lat: 13.3167,
      lng: 77.1215,
      type: "Fiber Extraction",
      location: "Tumkur",
    },
    {
      id: "tum3",
      name: "Organic Farms Trading",
      lat: 13.3489,
      lng: 77.1189,
      type: "Organic Products",
      location: "Tumkur",
    },
    {
      id: "tum4",
      name: "Tumkur Compost Consortium",
      lat: 13.334,
      lng: 77.1014,
      type: "Composting",
      location: "Tumkur",
    },
    {
      id: "tum5",
      name: "BioWaste Tumkur",
      lat: 13.3167,
      lng: 77.1215,
      type: "Waste Processing",
      location: "Tumkur",
    },
  ],
  mysore: [
    {
      id: "mys1",
      name: "Karnataka Bio-Products",
      lat: 12.2958,
      lng: 76.6394,
      type: "Agricultural Waste",
      location: "Mysore",
    },
    {
      id: "mys2",
      name: "Mysore Compost Works",
      lat: 12.3103,
      lng: 76.6552,
      type: "Composting",
      location: "Mysore",
    },
    {
      id: "mys3",
      name: "Sustainable Agri Ltd",
      lat: 12.2675,
      lng: 76.6245,
      type: "Eco-Products",
      location: "Mysore",
    },
    {
      id: "mys4",
      name: "Mysore Biofuel Industries",
      lat: 12.2958,
      lng: 76.6394,
      type: "Biofuel",
      location: "Mysore",
    },
    {
      id: "mys5",
      name: "GreenMysore Organics",
      lat: 12.3103,
      lng: 76.6552,
      type: "Organic Fertilizer",
      location: "Mysore",
    },
  ],
  hassan: [
    {
      id: "has1",
      name: "Hassan Biomass Center",
      lat: 13.1938,
      lng: 75.7389,
      type: "Biomass Processing",
      location: "Hassan",
    },
    {
      id: "has2",
      name: "Agri-Waste Pvt Ltd",
      lat: 13.2084,
      lng: 75.7447,
      type: "Waste Management",
      location: "Hassan",
    },
    {
      id: "has3",
      name: "Hassan Bio-Energy Solutions",
      lat: 13.1938,
      lng: 75.7389,
      type: "Biofuel",
      location: "Hassan",
    },
    {
      id: "has4",
      name: "Organic Hassan Farms",
      lat: 13.2084,
      lng: 75.7447,
      type: "Composting",
      location: "Hassan",
    },
  ],
  kolar: [
    {
      id: "kol1",
      name: "Kolar Biofuel Industries",
      lat: 13.1367,
      lng: 78.1294,
      type: "Biofuel",
      location: "Kolar",
    },
    {
      id: "kol2",
      name: "Kolar Compost Works",
      lat: 13.1367,
      lng: 78.1294,
      type: "Composting",
      location: "Kolar",
    },
    {
      id: "kol3",
      name: "AgriWaste Kolar",
      lat: 13.1367,
      lng: 78.1294,
      type: "Waste Processing",
      location: "Kolar",
    },
  ],
  mandya: [
    {
      id: "man1",
      name: "Mandya Biomass Center",
      lat: 12.5223,
      lng: 76.8976,
      type: "Biomass Processing",
      location: "Mandya",
    },
    {
      id: "man2",
      name: "Mandya Biofuel Corp",
      lat: 12.5223,
      lng: 76.8976,
      type: "Biofuel",
      location: "Mandya",
    },
    {
      id: "man3",
      name: "GreenMandya Organics",
      lat: 12.5223,
      lng: 76.8976,
      type: "Organic Fertilizer",
      location: "Mandya",
    },
  ],
  ramanagara: [
    {
      id: "ram1",
      name: "Ramanagara Waste Solutions",
      lat: 12.7203,
      lng: 77.2807,
      type: "Waste Processing",
      location: "Ramanagara",
    },
    {
      id: "ram2",
      name: "Ramanagara Bio-Energy",
      lat: 12.7203,
      lng: 77.2807,
      type: "Biofuel",
      location: "Ramanagara",
    },
    {
      id: "ram3",
      name: "Ramanagara Compost Ltd",
      lat: 12.7203,
      lng: 77.2807,
      type: "Composting",
      location: "Ramanagara",
    },
  ],
  chikballapur: [
    {
      id: "chik1",
      name: "Chikballapur Biomass Industries",
      lat: 13.4356,
      lng: 77.7311,
      type: "Biomass Processing",
      location: "Chikballapur",
    },
    {
      id: "chik2",
      name: "Chikballapur Biofuel Works",
      lat: 13.4356,
      lng: 77.7311,
      type: "Biofuel",
      location: "Chikballapur",
    },
    {
      id: "chik3",
      name: "AgriCycle Chikballapur",
      lat: 13.4356,
      lng: 77.7311,
      type: "Waste Processing",
      location: "Chikballapur",
    },
  ],
  davanagere: [
    {
      id: "dav1",
      name: "Davanagere Bio-Energy Corp",
      lat: 14.4644,
      lng: 75.9218,
      type: "Biofuel",
      location: "Davanagere",
    },
    {
      id: "dav2",
      name: "Davanagere Compost Solutions",
      lat: 14.4644,
      lng: 75.9218,
      type: "Composting",
      location: "Davanagere",
    },
    {
      id: "dav3",
      name: "Davanagere Waste Management",
      lat: 14.4644,
      lng: 75.9218,
      type: "Waste Processing",
      location: "Davanagere",
    },
  ],
  shimoga: [
    {
      id: "shim1",
      name: "Shimoga Biomass Center",
      lat: 13.9299,
      lng: 75.5681,
      type: "Biomass Processing",
      location: "Shimoga",
    },
    {
      id: "shim2",
      name: "Shimoga Biofuel Industries",
      lat: 13.9299,
      lng: 75.5681,
      type: "Biofuel",
      location: "Shimoga",
    },
    {
      id: "shim3",
      name: "GreenShimoga Organics",
      lat: 13.9299,
      lng: 75.5681,
      type: "Organic Fertilizer",
      location: "Shimoga",
    },
  ],
  belgaum: [
    {
      id: "bel1",
      name: "Belgaum Bio-Energy Solutions",
      lat: 15.8497,
      lng: 74.4977,
      type: "Biofuel",
      location: "Belgaum",
    },
    {
      id: "bel2",
      name: "Belgaum Compost Works",
      lat: 15.8497,
      lng: 74.4977,
      type: "Composting",
      location: "Belgaum",
    },
    {
      id: "bel3",
      name: "Belgaum Waste Processing",
      lat: 15.8497,
      lng: 74.4977,
      type: "Waste Processing",
      location: "Belgaum",
    },
  ],
  gulbarga: [
    {
      id: "gul1",
      name: "Gulbarga Biomass Industries",
      lat: 17.3297,
      lng: 76.8343,
      type: "Biomass Processing",
      location: "Gulbarga",
    },
    {
      id: "gul2",
      name: "Gulbarga Biofuel Corp",
      lat: 17.3297,
      lng: 76.8343,
      type: "Biofuel",
      location: "Gulbarga",
    },
    {
      id: "gul3",
      name: "Gulbarga Organic Solutions",
      lat: 17.3297,
      lng: 76.8343,
      type: "Organic Fertilizer",
      location: "Gulbarga",
    },
  ],
  bijapur: [
    {
      id: "bij1",
      name: "Bijapur Bio-Energy Center",
      lat: 16.8302,
      lng: 75.7100,
      type: "Biofuel",
      location: "Bijapur",
    },
    {
      id: "bij2",
      name: "Bijapur Compost Industries",
      lat: 16.8302,
      lng: 75.7100,
      type: "Composting",
      location: "Bijapur",
    },
    {
      id: "bij3",
      name: "Bijapur Waste Management",
      lat: 16.8302,
      lng: 75.7100,
      type: "Waste Processing",
      location: "Bijapur",
    },
  ],
  dharwad: [
    {
      id: "dhar1",
      name: "Dharwad Biomass Solutions",
      lat: 15.4589,
      lng: 75.0078,
      type: "Biomass Processing",
      location: "Dharwad",
    },
    {
      id: "dhar2",
      name: "Dharwad Biofuel Works",
      lat: 15.4589,
      lng: 75.0078,
      type: "Biofuel",
      location: "Dharwad",
    },
    {
      id: "dhar3",
      name: "Dharwad Organic Farms",
      lat: 15.4589,
      lng: 75.0078,
      type: "Organic Fertilizer",
      location: "Dharwad",
    },
  ],
  udupi: [
    {
      id: "udu1",
      name: "Udupi Bio-Waste Industries",
      lat: 13.3409,
      lng: 74.7421,
      type: "Waste Processing",
      location: "Udupi",
    },
    {
      id: "udu2",
      name: "Udupi Compost Consortium",
      lat: 13.3409,
      lng: 74.7421,
      type: "Composting",
      location: "Udupi",
    },
    {
      id: "udu3",
      name: "Udupi Biofuel Center",
      lat: 13.3409,
      lng: 74.7421,
      type: "Biofuel",
      location: "Udupi",
    },
  ],
  mangalore: [
    {
      id: "mang1",
      name: "Mangalore Biomass Corp",
      lat: 12.9141,
      lng: 74.8560,
      type: "Biomass Processing",
      location: "Mangalore",
    },
    {
      id: "mang2",
      name: "Mangalore Bio-Energy Solutions",
      lat: 12.9141,
      lng: 74.8560,
      type: "Biofuel",
      location: "Mangalore",
    },
    {
      id: "mang3",
      name: "Mangalore Waste Management",
      lat: 12.9141,
      lng: 74.8560,
      type: "Waste Processing",
      location: "Mangalore",
    },
  ],
  raichur: [
    {
      id: "rai1",
      name: "Raichur Biofuel Industries",
      lat: 16.2120,
      lng: 77.3439,
      type: "Biofuel",
      location: "Raichur",
    },
    {
      id: "rai2",
      name: "Raichur Compost Works",
      lat: 16.2120,
      lng: 77.3439,
      type: "Composting",
      location: "Raichur",
    },
    {
      id: "rai3",
      name: "Raichur Waste Solutions",
      lat: 16.2120,
      lng: 77.3439,
      type: "Waste Processing",
      location: "Raichur",
    },
  ],
  bidar: [
    {
      id: "bid1",
      name: "Bidar Biomass Center",
      lat: 17.9133,
      lng: 77.5301,
      type: "Biomass Processing",
      location: "Bidar",
    },
    {
      id: "bid2",
      name: "Bidar Bio-Energy Corp",
      lat: 17.9133,
      lng: 77.5301,
      type: "Biofuel",
      location: "Bidar",
    },
    {
      id: "bid3",
      name: "Bidar Organic Solutions",
      lat: 17.9133,
      lng: 77.5301,
      type: "Organic Fertilizer",
      location: "Bidar",
    },
  ],
  chitradurga: [
    {
      id: "chit1",
      name: "Chitradurga Biofuel Works",
      lat: 14.2266,
      lng: 76.3961,
      type: "Biofuel",
      location: "Chitradurga",
    },
    {
      id: "chit2",
      name: "Chitradurga Compost Industries",
      lat: 14.2266,
      lng: 76.3961,
      type: "Composting",
      location: "Chitradurga",
    },
    {
      id: "chit3",
      name: "Chitradurga Waste Management",
      lat: 14.2266,
      lng: 76.3961,
      type: "Waste Processing",
      location: "Chitradurga",
    },
  ],
  haveri: [
    {
      id: "hav1",
      name: "Haveri Biomass Solutions",
      lat: 14.7950,
      lng: 75.4000,
      type: "Biomass Processing",
      location: "Haveri",
    },
    {
      id: "hav2",
      name: "Haveri Bio-Energy Center",
      lat: 14.7950,
      lng: 75.4000,
      type: "Biofuel",
      location: "Haveri",
    },
    {
      id: "hav3",
      name: "Haveri Organic Farms",
      lat: 14.7950,
      lng: 75.4000,
      type: "Organic Fertilizer",
      location: "Haveri",
    },
  ],
  gadag: [
    {
      id: "gad1",
      name: "Gadag Biofuel Industries",
      lat: 15.4324,
      lng: 75.6381,
      type: "Biofuel",
      location: "Gadag",
    },
    {
      id: "gad2",
      name: "Gadag Compost Works",
      lat: 15.4324,
      lng: 75.6381,
      type: "Composting",
      location: "Gadag",
    },
    {
      id: "gad3",
      name: "Gadag Waste Solutions",
      lat: 15.4324,
      lng: 75.6381,
      type: "Waste Processing",
      location: "Gadag",
    },
  ],
  bagalkot: [
    {
      id: "bag1",
      name: "Bagalkot Biomass Center",
      lat: 16.1850,
      lng: 75.6961,
      type: "Biomass Processing",
      location: "Bagalkot",
    },
    {
      id: "bag2",
      name: "Bagalkot Bio-Energy Corp",
      lat: 16.1850,
      lng: 75.6961,
      type: "Biofuel",
      location: "Bagalkot",
    },
    {
      id: "bag3",
      name: "Bagalkot Organic Solutions",
      lat: 16.1850,
      lng: 75.6961,
      type: "Organic Fertilizer",
      location: "Bagalkot",
    },
  ],
  koppal: [
    {
      id: "kop1",
      name: "Koppal Biofuel Works",
      lat: 15.3500,
      lng: 76.1500,
      type: "Biofuel",
      location: "Koppal",
    },
    {
      id: "kop2",
      name: "Koppal Compost Industries",
      lat: 15.3500,
      lng: 76.1500,
      type: "Composting",
      location: "Koppal",
    },
    {
      id: "kop3",
      name: "Koppal Waste Management",
      lat: 15.3500,
      lng: 76.1500,
      type: "Waste Processing",
      location: "Koppal",
    },
  ],
  yadgir: [
    {
      id: "yad1",
      name: "Yadgir Biomass Solutions",
      lat: 16.7667,
      lng: 77.1333,
      type: "Biomass Processing",
      location: "Yadgir",
    },
    {
      id: "yad2",
      name: "Yadgir Bio-Energy Center",
      lat: 16.7667,
      lng: 77.1333,
      type: "Biofuel",
      location: "Yadgir",
    },
    {
      id: "yad3",
      name: "Yadgir Organic Farms",
      lat: 16.7667,
      lng: 77.1333,
      type: "Organic Fertilizer",
      location: "Yadgir",
    },
  ],
  bellary: [
    {
      id: "bel2_1",
      name: "Bellary Biofuel Industries",
      lat: 15.1394,
      lng: 76.9214,
      type: "Biofuel",
      location: "Bellary",
    },
    {
      id: "bel2_2",
      name: "Bellary Compost Works",
      lat: 15.1394,
      lng: 76.9214,
      type: "Composting",
      location: "Bellary",
    },
    {
      id: "bel2_3",
      name: "Bellary Waste Solutions",
      lat: 15.1394,
      lng: 76.9214,
      type: "Waste Processing",
      location: "Bellary",
    },
  ],
  kodagu: [
    {
      id: "kod1",
      name: "Kodagu Biomass Center",
      lat: 12.3375,
      lng: 75.8069,
      type: "Biomass Processing",
      location: "Kodagu",
    },
    {
      id: "kod2",
      name: "Kodagu Bio-Energy Corp",
      lat: 12.3375,
      lng: 75.8069,
      type: "Biofuel",
      location: "Kodagu",
    },
    {
      id: "kod3",
      name: "Kodagu Organic Solutions",
      lat: 12.3375,
      lng: 75.8069,
      type: "Organic Fertilizer",
      location: "Kodagu",
    },
  ],
  chamarajanagar: [
    {
      id: "cham1",
      name: "Chamarajanagar Biofuel Works",
      lat: 11.9234,
      lng: 76.9424,
      type: "Biofuel",
      location: "Chamarajanagar",
    },
    {
      id: "cham2",
      name: "Chamarajanagar Compost Industries",
      lat: 11.9234,
      lng: 76.9424,
      type: "Composting",
      location: "Chamarajanagar",
    },
    {
      id: "cham3",
      name: "Chamarajanagar Waste Management",
      lat: 11.9234,
      lng: 76.9424,
      type: "Waste Processing",
      location: "Chamarajanagar",
    },
  ],
  uttara_kannada: [
    {
      id: "uk1",
      name: "Uttara Kannada Biomass Solutions",
      lat: 14.6667,
      lng: 74.3333,
      type: "Biomass Processing",
      location: "Uttara Kannada",
    },
    {
      id: "uk2",
      name: "Uttara Kannada Bio-Energy Center",
      lat: 14.6667,
      lng: 74.3333,
      type: "Biofuel",
      location: "Uttara Kannada",
    },
    {
      id: "uk3",
      name: "Uttara Kannada Organic Farms",
      lat: 14.6667,
      lng: 74.3333,
      type: "Organic Fertilizer",
      location: "Uttara Kannada",
    },
  ],
  chikmagalur: [
    {
      id: "cm1",
      name: "Chikmagalur Biofuel Industries",
      lat: 13.3153,
      lng: 75.7754,
      type: "Biofuel",
      location: "Chikmagalur",
    },
    {
      id: "cm2",
      name: "Chikmagalur Compost Works",
      lat: 13.3153,
      lng: 75.7754,
      type: "Composting",
      location: "Chikmagalur",
    },
    {
      id: "cm3",
      name: "Chikmagalur Waste Solutions",
      lat: 13.3153,
      lng: 75.7754,
      type: "Waste Processing",
      location: "Chikmagalur",
    },
  ],
}

export default function WasteRecommendation({ onBack }: WasteRecommendationProps) {
  const [waste, setWaste] = useState("")
  const [quantity, setQuantity] = useState("")
  const [location, setLocation] = useState("")
  const [recommendations, setRecommendations] = useState<Recommendation[]>([])
  const [industries, setIndustries] = useState<Industry[]>([])
  const [userLocation, setUserLocation] = useState<{ lat: number; lng: number } | undefined>(undefined)
  const [loading, setLoading] = useState(false)
  const [locatingUser, setLocatingUser] = useState(false)
  const [error, setError] = useState("")
  const [searched, setSearched] = useState(false)
  const [geolocationError, setGeolocationError] = useState("")

  const handleUseMyLocation = () => {
    setLocatingUser(true)
    setGeolocationError("")

    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords
          setUserLocation({ lat: latitude, lng: longitude })
          setLocatingUser(false)
          // Auto-populate location as coordinates
          setLocation(`${latitude.toFixed(4)}, ${longitude.toFixed(4)}`)
        },
        (error) => {
          setGeolocationError("Unable to access your location. Please enable location services.")
          setLocatingUser(false)
        },
      )
    } else {
      setGeolocationError("Geolocation is not supported by your browser.")
      setLocatingUser(false)
    }
  }

  const fetchIndustriesByLocation = (loc: string) => {
    if (!loc.trim()) {
      setIndustries([])
      return
    }

    const normalizedLocation = loc.toLowerCase().trim()
    let matchedIndustries: Industry[] = []

    // Check for exact location match
    if (industryDatabase[normalizedLocation]) {
      matchedIndustries = industryDatabase[normalizedLocation]
    } else {
      // Try partial matches
      for (const [key, value] of Object.entries(industryDatabase)) {
        if (normalizedLocation.includes(key) || key.includes(normalizedLocation)) {
          matchedIndustries = value
          break
        }
      }
    }

    setIndustries(matchedIndustries)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setRecommendations([])

    if (!waste.trim()) {
      setError("Please select a type of waste")
      return
    }

    if (!quantity.trim()) {
      setError("Please enter the quantity in kg")
      return
    }

    setLoading(true)
    setSearched(true)
    try {
      const response = await fetch("/api/waste-recommendations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ waste: waste.trim(), quantity, location }),
      })

      if (!response.ok) throw new Error("Failed to fetch recommendations")
      const data = await response.json()
      setRecommendations(data.recommendations)

      if (location.trim()) {
        fetchIndustriesByLocation(location)
      }
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

      <div className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <span className="text-3xl">♻️</span>
          <h2 className="text-3xl font-bold text-foreground">Waste Reuse Advisor</h2>
        </div>
        <p className="text-muted-foreground">
          Discover sustainable ways to reuse your agricultural waste and find nearby buyers
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Input Form */}
        <div className="lg:col-span-1">
          <Card className="p-6 sticky top-24">
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Waste Type Dropdown */}
              <div className="space-y-2">
                <Label htmlFor="waste">Type of Waste</Label>
                <select
                  id="waste"
                  value={waste}
                  onChange={(e) => setWaste(e.target.value)}
                  className="w-full h-11 px-3 border border-input rounded-md bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                >
                  <option value="">Select waste type...</option>
                  {wasteTypes.map((type) => (
                    <option key={type} value={type}>
                      {type}
                    </option>
                  ))}
                </select>
              </div>

              {/* Quantity Input */}
              <div className="space-y-2">
                <Label htmlFor="quantity" className="flex items-center gap-2">
                  <Weight size={16} /> Quantity (kg)
                </Label>
                <Input
                  id="quantity"
                  type="number"
                  placeholder="e.g., 50"
                  value={quantity}
                  onChange={(e) => setQuantity(e.target.value)}
                  min="0"
                  step="0.1"
                  className="h-11"
                />
              </div>

              {/* Location Input with Geolocation */}
              <div className="space-y-2">
                <Label htmlFor="location" className="flex items-center gap-2">
                  <MapPin size={16} /> Location
                </Label>
                <div className="flex gap-2">
                  <Input
                    id="location"
                    type="text"
                    placeholder="e.g., Bangalore, Tumkur..."
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    className="h-11 flex-1"
                  />
                  <Button
                    type="button"
                    variant="outline"
                    size="icon"
                    onClick={handleUseMyLocation}
                    disabled={locatingUser}
                    title="Use your current location"
                    className="h-11 w-11 bg-transparent"
                  >
                    {locatingUser ? <Loader2 size={18} className="animate-spin" /> : <Navigation size={18} />}
                  </Button>
                </div>
                {geolocationError && (
                  <p className="text-xs text-destructive flex items-start gap-2">
                    <AlertCircle size={14} className="mt-0.5 flex-shrink-0" />
                    {geolocationError}
                  </p>
                )}
              </div>

              {error && (
                <div className="p-3 bg-destructive/10 border border-destructive/30 rounded-lg text-sm text-destructive flex items-start gap-2">
                  <AlertCircle size={14} className="mt-0.5 flex-shrink-0" />
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
                  <>
                    <Lightbulb size={18} className="mr-2" />
                    Suggest Reuse
                  </>
                )}
              </Button>

              {waste && quantity && (
                <p className="text-xs text-muted-foreground italic">
                  Searching for: <strong>{waste}</strong> ({quantity} kg)
                </p>
              )}
            </form>
          </Card>
        </div>

        {/* Recommendations and Map */}
        <div className="lg:col-span-2">
          {searched && loading && (
            <div className="flex flex-col items-center justify-center py-12 text-muted-foreground">
              <Loader2 size={32} className="animate-spin mb-4 text-primary" />
              <p>Finding recommendations for {waste}...</p>
            </div>
          )}

          {searched && !loading && recommendations.length === 0 && !error && (
            <div className="text-center py-12 bg-muted/30 rounded-lg border-2 border-dashed border-muted">
              <p className="text-muted-foreground mb-4">No specific recommendations found for "{waste}"</p>
              <p className="text-sm text-muted-foreground">Try composting or contact a local sustainability center.</p>
            </div>
          )}

          {recommendations.length > 0 && (
            <div className="space-y-6">
              {/* Recommendations Header */}
              <div>
                <p className="text-sm font-semibold text-foreground mb-4 flex items-center gap-2">
                  <TrendingUp size={18} className="text-secondary" />
                  Found {recommendations.length} way{recommendations.length !== 1 ? "s" : ""} to use{" "}
                  <strong className="text-secondary">{waste}</strong> ({quantity} kg)
                </p>

                {/* Recommendation Cards */}
                <div className="space-y-4">
                  {recommendations.map((rec, index) => (
                    <Card
                      key={index}
                      className="p-6 border-2 border-secondary/20 hover:border-secondary/50 transition-all hover:shadow-lg"
                    >
                      <h3 className="text-xl font-bold text-foreground mb-2 flex items-center gap-2">
                        <Lightbulb size={24} className="text-secondary" />
                        {rec.use_case}
                      </h3>
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
                                <CheckCircle2 size={16} className="text-secondary mt-0.5 flex-shrink-0" />
                                <span>{benefit}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </Card>
                  ))}
                </div>
              </div>

              {industries.length > 0 && (
                <div className="border-t-2 border-muted pt-6 space-y-4">
                  <div>
                    <p className="text-sm font-semibold text-foreground mb-4 flex items-center gap-2">
                      <MapPin size={18} className="text-primary" />
                      Interactive Map - Nearby Buyers & Industries
                    </p>
                    <WasteMap location={location} industries={industries} userLocation={userLocation} />
                  </div>

                  {/* Industries List */}
                  <div>
                    <p className="text-sm font-semibold text-foreground mb-3">Available Markets</p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {industries.map((industry) => (
                        <Card
                          key={industry.id}
                          className="p-4 bg-accent/5 border border-accent/20 hover:border-accent/50 transition-all hover:shadow-md"
                        >
                          <p className="font-semibold text-foreground text-sm">{industry.name}</p>
                          <p className="text-xs text-muted-foreground mt-1">{industry.type}</p>
                          <p className="text-xs text-primary mt-1 font-medium">
                            {industry.location} ({industry.lat.toFixed(2)}, {industry.lng.toFixed(2)})
                          </p>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="mt-2 text-xs h-7 w-full hover:bg-accent/10"
                            onClick={() => {
                              window.open(
                                `https://www.google.com/maps/dir/?api=1&destination=${industry.lat},${industry.lng}`,
                                "_blank",
                              )
                            }}
                          >
                            Get Directions
                          </Button>
                        </Card>
                      ))}
                    </div>
                    <p className="text-xs text-muted-foreground mt-3 italic">
                      Contact these buyers to understand current market rates and purchase requirements.
                    </p>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
