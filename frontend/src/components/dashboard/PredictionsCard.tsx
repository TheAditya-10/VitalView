
import React from "react";
import { BrainCircuit, ChevronRight, CircleDashed } from "lucide-react";
import { Button } from "@/components/ui/button";

// Example health predictions
const predictions = [
  {
    title: "Diabetes Risk Assessment",
    description: "Based on your BMI and family history",
    date: "2025-04-08",
    score: 32,
    status: "Low Risk",
  },
  {
    title: "Cardiac Event Prediction",
    description: "Based on your ECG readings and activity level",
    date: "2025-04-06",
    score: 15,
    status: "Low Risk",
  },
  {
    title: "Stress Level Analysis",
    description: "Based on heart rate variability",
    date: "2025-04-01",
    score: 64,
    status: "Medium Risk",
  },
];

export function PredictionsCard() {
  return (
    <div className="health-card h-full">
      <div className="flex items-center justify-between mb-4">
        <h2 className="health-card-header flex items-center">
          <BrainCircuit className="h-5 w-5 mr-2 text-health-primary" />
          Health Predictions
        </h2>
        <Button variant="ghost" size="sm" className="text-health-primary hover:text-health-primary/90">
          View All
        </Button>
      </div>
      
      <div className="space-y-4">
        {predictions.map((prediction, index) => (
          <div 
            key={index} 
            className="p-3 border border-health-border rounded-lg flex justify-between items-center hover:bg-gray-50 transition-colors cursor-pointer"
          >
            <div className="flex items-start space-x-3">
              <div className={`p-2 rounded-full ${
                prediction.score < 30 
                  ? "bg-green-100 text-green-600" 
                  : prediction.score < 60 
                  ? "bg-amber-100 text-amber-600" 
                  : "bg-red-100 text-red-600"
              }`}>
                <CircleDashed className="h-4 w-4" />
              </div>
              <div>
                <h3 className="font-medium text-health-text">{prediction.title}</h3>
                <p className="text-xs text-gray-500">{prediction.description}</p>
                <div className="flex items-center mt-1 space-x-3">
                  <span className="text-xs text-gray-400">{new Date(prediction.date).toLocaleDateString()}</span>
                  <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${
                    prediction.score < 30 
                      ? "bg-green-100 text-green-600" 
                      : prediction.score < 60 
                      ? "bg-amber-100 text-amber-600" 
                      : "bg-red-100 text-red-600"
                  }`}>
                    {prediction.status}
                  </span>
                </div>
              </div>
            </div>
            <ChevronRight className="h-4 w-4 text-gray-400" />
          </div>
        ))}
      </div>
    </div>
  );
}
