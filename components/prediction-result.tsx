import { Card } from "@/components/ui/card"

interface ResultProps {
  result: {
    estimated_yield: number
    confidence: number
    analysis: string
  }
  formData: {
    region: string
    season: string
    area: number
  }
}

export function PredictionResult({ result, formData }: ResultProps) {
  const yieldPerUnit = result.estimated_yield / formData.area

  return (
    <div className="mt-6 space-y-4">
      <Card className="bg-secondary/10 border-secondary/30 p-6">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-sm text-muted-foreground font-medium">Estimated Yield</p>
            <p className="text-3xl font-bold text-secondary mt-1">
              {result.estimated_yield.toFixed(2)} <span className="text-sm">tons</span>
            </p>
            <p className="text-xs text-muted-foreground mt-1">{yieldPerUnit.toFixed(2)} tons/hectare</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground font-medium">Confidence Score</p>
            <div className="mt-2">
              <div className="flex items-baseline gap-2">
                <span className="text-2xl font-bold text-accent">{(result.confidence * 100).toFixed(1)}%</span>
              </div>
              <div className="w-full bg-muted rounded-full h-2 mt-2 overflow-hidden">
                <div
                  className="bg-secondary h-full transition-all duration-500"
                  style={{ width: `${result.confidence * 100}%` }}
                />
              </div>
            </div>
          </div>
        </div>
      </Card>

      <Card className="bg-accent/5 border-accent/20 p-4">
        <p className="text-sm font-semibold text-card-foreground mb-2">Analysis for {formData.region}</p>
        <p className="text-sm text-muted-foreground leading-relaxed">{result.analysis}</p>
      </Card>
    </div>
  )
}
