import React, { useState } from "react";
import { PieChart, Flame } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

export function CalorieCalculator() {
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("male");
  const [weight, setWeight] = useState("");
  const [height, setHeight] = useState("");
  const [activityLevel, setActivityLevel] = useState("moderate");
  const [result, setResult] = useState<number | null>(null);
  
  const calculateCalories = () => {
    if (!age || !weight || !height) return;
    
    const ageNum = parseInt(age);
    const weightKg = parseFloat(weight);
    const heightCm = parseFloat(height);
    
    // Base BMR calculation using Mifflin-St Jeor Equation
    let bmr = 0;
    if (gender === "male") {
      bmr = 10 * weightKg + 6.25 * heightCm - 5 * ageNum + 5;
    } else {
      bmr = 10 * weightKg + 6.25 * heightCm - 5 * ageNum - 161;
    }
    
    // Apply activity multiplier
    let calorieNeeds = 0;
    switch (activityLevel) {
      case "sedentary":
        calorieNeeds = bmr * 1.2;
        break;
      case "light":
        calorieNeeds = bmr * 1.375;
        break;
      case "moderate":
        calorieNeeds = bmr * 1.55;
        break;
      case "active":
        calorieNeeds = bmr * 1.725;
        break;
      case "veryActive":
        calorieNeeds = bmr * 1.9;
        break;
      default:
        calorieNeeds = bmr * 1.55;
    }
    
    setResult(Math.round(calorieNeeds));
  };
  
  return (
    <div className="health-card h-full animate-fade-in">
      <div className="flex items-center mb-4">
        <h2 className="health-card-header flex items-center">
          <Flame className="h-5 w-5 mr-2 text-health-primary" />
          Calorie Calculator
        </h2>
      </div>
      
      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="text-sm text-gray-500 mb-1 block">Age</label>
            <Input
              type="number"
              placeholder="e.g. 30"
              value={age}
              onChange={(e) => setAge(e.target.value)}
              className="border-health-border"
            />
          </div>
          <div>
            <label className="text-sm text-gray-500 mb-1 block">Gender</label>
            <Select value={gender} onValueChange={setGender}>
              <SelectTrigger className="border-health-border">
                <SelectValue placeholder="Select gender" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="male">Male</SelectItem>
                <SelectItem value="female">Female</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        
        <div className="grid grid-cols-2 gap-4">
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
        </div>
        
        <div>
          <label className="text-sm text-gray-500 mb-1 block">Activity Level</label>
          <Select value={activityLevel} onValueChange={setActivityLevel}>
            <SelectTrigger className="border-health-border">
              <SelectValue placeholder="Select activity level" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="sedentary">Sedentary (little or no exercise)</SelectItem>
              <SelectItem value="light">Light (exercise 1-3 days/week)</SelectItem>
              <SelectItem value="moderate">Moderate (exercise 3-5 days/week)</SelectItem>
              <SelectItem value="active">Active (exercise 6-7 days/week)</SelectItem>
              <SelectItem value="veryActive">Very Active (hard exercise daily)</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <Button 
          onClick={calculateCalories} 
          className="w-full bg-health-primary hover:bg-health-primary/90 hover:shadow-md transition-all mb-4"
        >
          Calculate Daily Calories
        </Button>
        
        {result !== null && (
          <div className="mt-6 bg-gray-50 p-4 rounded-lg text-center animate-scale-in">
            <PieChart className="h-12 w-12 mx-auto mb-2 text-health-primary" />
            <p className="text-sm text-gray-500">Your Daily Caloric Needs</p>
            <p className="text-2xl font-bold text-health-text">{result} calories</p>
            <p className="text-xs text-gray-500 mt-2">
              This is the estimated number of calories you need daily to maintain your current weight.
            </p>
          </div>
        )}
        
        <Button 
          variant="outline"
          className="w-full mt-4"
          asChild
        >
          <Link to="/calorie-calculator" className="flex items-center justify-center">
            View Detailed Analysis
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </div>
    </div>
  );
}
