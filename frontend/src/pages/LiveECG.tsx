
import React, { useState, useEffect } from "react";
import { Sidebar } from "@/components/layout/Sidebar";
import { Navbar } from "@/components/layout/Navbar";
import { ArrowLeft, Heart, Play, Pause, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export default function LiveECG() {
  const [isMonitoring, setIsMonitoring] = useState(false);
  const [heartRate, setHeartRate] = useState(72);
  const [elapsedTime, setElapsedTime] = useState(0);
  
  useEffect(() => {
    let interval: NodeJS.Timeout;
    let timer: NodeJS.Timeout;
    
    if (isMonitoring) {
      // Simulate heart rate changes
      interval = setInterval(() => {
        setHeartRate(prev => {
          // Random fluctuation between -3 and +3
          const change = Math.floor(Math.random() * 7) - 3;
          return prev + change;
        });
      }, 2000);
      
      // Track elapsed time
      timer = setInterval(() => {
        setElapsedTime(prev => prev + 1);
      }, 1000);
    }
    
    return () => {
      clearInterval(interval);
      clearInterval(timer);
    };
  }, [isMonitoring]);
  
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };
  
  const toggleMonitoring = () => {
    if (!isMonitoring) {
      // Reset when starting
      setElapsedTime(0);
    }
    setIsMonitoring(!isMonitoring);
  };
  
  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar />
      
      <div className="flex-1 flex flex-col overflow-hidden lg:ml-64">
        <Navbar />
        
        <main className="flex-1 overflow-y-auto p-4 md:p-6">
          <div className="max-w-4xl mx-auto">
            {/* Header */}
            <div className="flex items-center mb-6">
              <Button variant="ghost" size="icon" asChild className="mr-2">
                <Link to="/">
                  <ArrowLeft className="h-5 w-5" />
                </Link>
              </Button>
              <h1 className="text-2xl font-bold text-health-text">Live ECG Monitoring</h1>
            </div>
            
            {/* Main content */}
            <div className="health-card bg-white p-6 rounded-xl shadow-md animate-fade-in">
              {/* Status bar */}
              <div className="flex justify-between items-center mb-4">
                <div className="flex items-center">
                  <div className={`w-3 h-3 rounded-full mr-2 ${isMonitoring ? 'bg-health-success animate-pulse' : 'bg-gray-300'}`}></div>
                  <span className="font-medium">{isMonitoring ? 'Monitoring Active' : 'Monitoring Inactive'}</span>
                </div>
                <div className="text-sm text-gray-500">
                  {formatTime(elapsedTime)}
                </div>
              </div>
              
              {/* ECG Display */}
              <div className="relative h-64 bg-black rounded-lg mb-6 overflow-hidden">
                {/* ECG Grid */}
                <div className="absolute inset-0 grid grid-cols-12 grid-rows-6 gap-4">
                  {Array.from({ length: 84 }).map((_, i) => (
                    <div key={i} className="border-t border-l border-green-500/20"></div>
                  ))}
                </div>
                
                {/* ECG Line */}
                <svg 
                  viewBox="0 0 1000 200" 
                  className={`w-full h-full text-green-500 ${isMonitoring ? 'animate-ecg-line-active' : ''}`}
                  preserveAspectRatio="none"
                >
                  <path
                    d="M0,100 L40,100 L50,40 L70,160 L80,100 L120,100 L130,40 L150,160 L160,100 L200,100 L210,40 L230,160 L240,100 L280,100 L290,40 L310,160 L320,100 L360,100 L370,40 L390,160 L400,100 L440,100 L450,40 L470,160 L480,100 L520,100 L530,40 L550,160 L560,100 L600,100 L610,40 L630,160 L640,100 L680,100 L690,40 L710,160 L720,100 L760,100 L770,40 L790,160 L800,100 L840,100 L850,40 L870,160 L880,100 L920,100 L930,40 L950,160 L960,100 L1000,100"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  />
                </svg>
              </div>
              
              {/* ECG Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                <div className="bg-gray-50 p-4 rounded-lg text-center">
                  <h3 className="text-sm text-gray-500 mb-1">Heart Rate</h3>
                  <div className="flex items-center justify-center">
                    <Heart className="h-5 w-5 text-health-danger mr-2 animate-pulse" />
                    <span className="text-2xl font-bold">{heartRate}</span>
                  </div>
                  <p className="text-xs text-gray-500 mt-1">BPM</p>
                </div>
                
                <div className="bg-gray-50 p-4 rounded-lg text-center">
                  <h3 className="text-sm text-gray-500 mb-1">QT Interval</h3>
                  <p className="text-2xl font-bold">420</p>
                  <p className="text-xs text-gray-500 mt-1">ms</p>
                </div>
                
                <div className="bg-gray-50 p-4 rounded-lg text-center">
                  <h3 className="text-sm text-gray-500 mb-1">PR Interval</h3>
                  <p className="text-2xl font-bold">160</p>
                  <p className="text-xs text-gray-500 mt-1">ms</p>
                </div>
                
                <div className="bg-gray-50 p-4 rounded-lg text-center">
                  <h3 className="text-sm text-gray-500 mb-1">QRS Duration</h3>
                  <p className="text-2xl font-bold">96</p>
                  <p className="text-xs text-gray-500 mt-1">ms</p>
                </div>
              </div>
              
              {/* Action Buttons */}
              <div className="flex flex-wrap gap-3">
                <Button 
                  onClick={toggleMonitoring}
                  className={`flex-1 ${isMonitoring ? 'bg-health-danger' : 'bg-health-primary'} hover:opacity-90 transition-all`}
                >
                  {isMonitoring ? (
                    <><Pause className="mr-2 h-4 w-4" /> Stop Monitoring</>
                  ) : (
                    <><Play className="mr-2 h-4 w-4" /> Start Monitoring</>
                  )}
                </Button>
                
                <Button 
                  variant="outline" 
                  className="flex-1"
                  disabled={!isMonitoring && elapsedTime === 0}
                >
                  <Download className="mr-2 h-4 w-4" />
                  Save Results
                </Button>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
