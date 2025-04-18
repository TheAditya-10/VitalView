
import React from "react";
import { Sidebar } from "@/components/layout/Sidebar";
import { Navbar } from "@/components/layout/Navbar";
import { CalorieCalculator as CalorieCalc } from "@/features/calories/components/CalorieCalculator";

const CalorieCalculatorPage = () => {
  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar />
      
      <div className="flex-1 flex flex-col overflow-hidden lg:ml-64">
        <Navbar />
        
        <main className="flex-1 overflow-y-auto p-4 md:p-6">
          <div className="max-w-4xl mx-auto space-y-6">
            <h1 className="text-2xl font-semibold text-gray-900 mb-6 animate-fade-in">
              Calorie Calculator & Nutrition Analysis
            </h1>
            
            <div className="space-y-6">
              <CalorieCalc />
              
              <div className="health-card animate-fade-in">
                <h2 className="health-card-header mb-4">Nutrition Tips</h2>
                <div className="p-4 bg-gray-50 rounded-lg">
                  <p className="text-gray-600">
                    Based on your caloric needs, here are some nutrition recommendations:
                  </p>
                  <ul className="mt-4 space-y-2 list-disc list-inside text-gray-600">
                    <li>Focus on protein-rich foods for muscle maintenance</li>
                    <li>Include complex carbohydrates for sustained energy</li>
                    <li>Choose healthy fats from sources like nuts and avocados</li>
                    <li>Plan your meals to maintain consistent energy levels</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default CalorieCalculatorPage;
