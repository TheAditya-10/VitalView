import React, { useState } from "react";
import { Sidebar } from "@/components/layout/Sidebar";
import { Navbar } from "@/components/layout/Navbar";
import { BMICard } from "@/features/bmi/components/BMICard";
import axios from "axios";
import { ArrowRight, Calculator } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";
import { Link } from "react-router-dom";

const BMICalculator = () => {
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");
  const [bmi, setBmi] = useState<number | null>(null);
  const [bmiCategory, setBmiCategory] = useState("");
  const [healthInfo, setHealthInfo] = useState(null);

  const getInformation = async () => {
    try {
      const response = await axios.get("http://127.0.0.1:5000/healthinfo", {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true, // Ensure credentials are included
      });
      const data = response.data.advice;
      console.log(data);
      setHealthInfo(data);
    } catch (error) {
      console.error("Error fetching information:", error);
      setHealthInfo("Error fetching information. Please try again later.");
    }
  };

  const calculateBMI = () => {
    if (!height || !weight) return;

    const heightInMeters = parseFloat(height) / 100;
    const weightInKg = parseFloat(weight);

    if (heightInMeters <= 0 || weightInKg <= 0) return;

    const calculatedBMI = weightInKg / (heightInMeters * heightInMeters);
    setBmi(parseFloat(calculatedBMI.toFixed(1)));

    if (calculatedBMI < 18.5) {
      setBmiCategory("Underweight");
    } else if (calculatedBMI < 25) {
      setBmiCategory("Normal weight");
    } else if (calculatedBMI < 30) {
      setBmiCategory("Overweight");
    } else {
      setBmiCategory("Obesity");
    }
  };

  const getProgressColor = () => {
    if (!bmi) return "bg-gray-200";
    if (bmi < 18.5) return "bg-health-warning";
    if (bmi < 25) return "bg-health-success";
    if (bmi < 30) return "bg-health-warning";
    return "bg-health-danger";
  };

  const getProgressPercentage = () => {
    if (!bmi) return 0;
    const percentage = (bmi / 40) * 100;
    return Math.min(percentage, 100);
  };

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar />

      <div className="flex-1 flex flex-col overflow-hidden lg:ml-64">
        <Navbar />

        <main className="flex-1 overflow-y-auto p-4 md:p-6">
          <div className="max-w-4xl mx-auto space-y-6">
            <h1 className="text-2xl font-semibold text-gray-900 mb-6 animate-fade-in">
              BMI Calculator & Health Analysis
            </h1>

            <div className="space-y-6">
              <div className="health-card h-full animate-fade-in">
                <div className="flex items-center mb-4">
                  <h2 className="health-card-header flex items-center">
                    <Calculator className="h-5 w-5 mr-2 text-health-primary" />
                    BMI Calculator
                  </h2>
                </div>

                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm text-gray-500 mb-1 block">Height (cm)</label>
                      <Input
                        type="number"
                        placeholder="e.g. 175"
                        value={height}
                        onChange={(e) => setHeight(e.target.value)}
                        className="border-health-border"
                      />
                    </div>
                    <div>
                      <label className="text-sm text-gray-500 mb-1 block">Weight (kg)</label>
                      <Input
                        type="number"
                        placeholder="e.g. 70"
                        value={weight}
                        onChange={(e) => setWeight(e.target.value)}
                        className="border-health-border"
                      />
                    </div>
                  </div>

                  <Button
                    onClick={calculateBMI}
                    className="w-full bg-health-primary hover:bg-health-primary/90 hover:shadow-md transition-all mb-4"
                  >
                    Calculate BMI
                  </Button>

                  <Button onClick={getInformation} className="w-full bg-health-primary hover:bg-health-primary/90 hover:shadow-md transition-all mb-4">
                    Get information
                  </Button>
                  {healthInfo}

                  {bmi !== null && (
                    <div className="mt-6 bg-gray-50 p-4 rounded-lg animate-scale-in">
                      <div className="flex justify-between mb-2">
                        <span className="text-sm text-gray-500">BMI Result</span>
                        <span className="text-sm font-medium">{bmi}</span>
                      </div>

                      <Progress
                        value={getProgressPercentage()}
                        className={cn("h-2 bg-gray-200", getProgressColor())}
                      />

                      <div className="flex justify-between mt-2 text-xs text-gray-500">
                        <span>Underweight</span>
                        <span>Normal</span>
                        <span>Overweight</span>
                        <span>Obese</span>
                      </div>

                      <div className="mt-4 text-center">
                        <p className="text-lg font-semibold">{bmiCategory}</p>
                        <p className="text-sm text-gray-500 mt-1">
                          {bmi < 18.5
                            ? "Consider gaining some weight"
                            : bmi < 25
                              ? "You have a healthy weight"
                              : bmi < 30
                                ? "Consider losing some weight"
                                : "Please consult a healthcare professional"}
                        </p>
                      </div>
                    </div>
                  )}

                  <Button
                    variant="outline"
                    className="w-full mt-4"
                    asChild
                  >
                    <Link to="/bmi-calculator" className="flex items-center justify-center">
                      View Detailed Analysis
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </div>
              </div>

              <div className="health-card animate-fade-in">
                <h2 className="health-card-header mb-4">Personalized Health Tips</h2>
                <div className="p-4 bg-gray-50 rounded-lg">
                  <p className="text-gray-600">
                    Based on your BMI, here are some tailored recommendations for maintaining a healthy lifestyle:
                  </p>
                  <ul className="mt-4 space-y-2 list-disc list-inside text-gray-600">
                    <li>Maintain a balanced diet rich in whole foods</li>
                    <li>Engage in regular physical activity</li>
                    <li>Stay hydrated by drinking adequate water</li>
                    <li>Get sufficient sleep and manage stress levels</li>
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

export default BMICalculator;
