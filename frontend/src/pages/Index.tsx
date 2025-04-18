
import React from "react";
import { Sidebar } from "@/components/layout/Sidebar";
import { Navbar } from "@/components/layout/Navbar";
import { WelcomeHeader } from "@/components/dashboard/WelcomeHeader";
import { ECGCard } from "@/components/dashboard/ECGCard";
import { BMICard } from "@/features/bmi/components/BMICard";
import { PredictionsCard } from "@/components/dashboard/PredictionsCard";
import { CalorieCalculator } from "@/features/calories/components/CalorieCalculator";
import { ChatBot } from "@/components/chat/ChatBot";

const Index = () => {
  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar />
      
      <div className="flex-1 flex flex-col overflow-hidden lg:ml-64">
        <Navbar />
        
        <main className="flex-1 overflow-y-auto p-4 md:p-6">
          <div className="max-w-7xl mx-auto">
            <WelcomeHeader />
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
              <ECGCard />
              <BMICard />
              <PredictionsCard />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <CalorieCalculator />
              <div className="health-card h-full animate-fade-in">
                {/* Placeholder for future content */}
                <h2 className="health-card-header mb-4">Health Tips</h2>
                <div className="p-4 bg-gray-50 rounded-lg">
                  <p className="text-gray-600">Stay hydrated by drinking at least 8 glasses of water daily.</p>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
      
      <ChatBot />
    </div>
  );
}

export default Index;
