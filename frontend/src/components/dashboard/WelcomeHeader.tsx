
import React from "react";
import { Activity, TrendingUp, Users } from "lucide-react";

type StatsCardProps = {
  title: string;
  value: string;
  icon: React.ReactNode;
  trend?: string;
  isUp?: boolean;
};

const StatsCard = ({ title, value, icon, trend, isUp }: StatsCardProps) => (
  <div className="health-card flex items-start animate-fade-in">
    <div className="p-3 rounded-lg bg-health-secondary text-health-primary mr-4">
      {icon}
    </div>
    <div>
      <h3 className="text-sm font-medium text-gray-500">{title}</h3>
      <p className="text-2xl font-semibold">{value}</p>
      {trend && (
        <div className="flex items-center mt-1">
          <TrendingUp 
            className={`h-3 w-3 mr-1 ${isUp ? 'text-health-success' : 'text-health-danger'}`} 
          />
          <span className={`text-xs ${isUp ? 'text-health-success' : 'text-health-danger'}`}>
            {trend}
          </span>
        </div>
      )}
    </div>
  </div>
);

export function WelcomeHeader() {
  return (
    <div className="mb-8">
      <h1 className="text-3xl font-bold text-health-text mb-2 animate-scale-in">Welcome to VitalView</h1>
      <p className="text-gray-500 mb-8 animate-fade-in">
        Your personal health companion that monitors vital signs, predicts health patterns, and provides personalized insights to help you live your healthiest life.
      </p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <StatsCard
          title="Active Users"
          value="2,834"
          icon={<Users className="h-6 w-6" />}
          trend="12% from last month"
          isUp={true}
        />
        <StatsCard
          title="Health Score"
          value="85/100"
          icon={<Activity className="h-6 w-6" />}
          trend="3% from last month"
          isUp={true}
        />
      </div>
    </div>
  );
}
