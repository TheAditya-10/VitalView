
import React from "react";
import { Heart, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

export function ECGCard() {
  return (
    <div className="health-card h-full animate-fade-in">
      <div className="flex items-center justify-between mb-4">
        <h2 className="health-card-header flex items-center">
          <Heart className="h-5 w-5 mr-2 text-health-primary" />
          ECG Status
        </h2>
        <div className="flex items-center">
          <span className="inline-block w-2 h-2 rounded-full bg-health-success animate-pulse mr-2"></span>
          <span className="text-sm text-health-success font-medium">Live</span>
        </div>
      </div>
      
      <div className="relative h-40 mb-4 bg-gray-50 rounded-lg overflow-hidden">
        <svg 
          viewBox="0 0 500 100" 
          className="w-full h-full text-health-primary animate-pulse-subtle"
          preserveAspectRatio="none"
        >
          <path
            d="M0,50 L20,50 L25,20 L35,80 L40,50 L60,50 L65,20 L75,80 L80,50 L100,50 L105,20 L115,80 L120,50 L140,50 L145,20 L155,80 L160,50 L180,50 L185,20 L195,80 L200,50 L220,50 L225,20 L235,80 L240,50 L260,50 L265,20 L275,80 L280,50 L300,50 L305,20 L315,80 L320,50 L340,50 L345,20 L355,80 L360,50 L380,50 L385,20 L395,80 L400,50 L420,50 L425,20 L435,80 L440,50 L460,50 L465,20 L475,80 L480,50 L500,50"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            className="animate-ecg-line"
          />
        </svg>
      </div>
      
      <div className="grid grid-cols-3 gap-3 text-center mb-4">
        <div className="p-3 bg-gray-50 rounded-lg">
          <h4 className="text-xs text-gray-500 mb-1">Heart Rate</h4>
          <p className="text-lg font-semibold text-health-text">72 bpm</p>
        </div>
        <div className="p-3 bg-gray-50 rounded-lg">
          <h4 className="text-xs text-gray-500 mb-1">QT Interval</h4>
          <p className="text-lg font-semibold text-health-text">420 ms</p>
        </div>
        <div className="p-3 bg-gray-50 rounded-lg">
          <h4 className="text-xs text-gray-500 mb-1">PR Interval</h4>
          <p className="text-lg font-semibold text-health-text">160 ms</p>
        </div>
      </div>
      
      <Button 
        className="w-full bg-health-primary hover:bg-health-primary/90 transition-all hover:shadow-md animate-fade-in"
        asChild
      >
        <Link to="/live-ecg" className="flex items-center justify-center">
          Start Live ECG Detection
          <ArrowRight className="ml-2 h-4 w-4" />
        </Link>
      </Button>
    </div>
  );
}
