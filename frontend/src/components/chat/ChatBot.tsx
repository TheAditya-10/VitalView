
import React, { useState, useRef, useEffect } from "react";
import {
  Bot,
  X,
  Send,
  Calendar,
  Mic,
  MicOff,
  Volume2,
  VolumeX,
  Loader2
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";

type Message = {
  id: string;
  content: string;
  sender: 'user' | 'bot';
  timestamp: Date;
};

export function ChatBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      content: 'Hello! I\'m your health assistant. How can I help you today?',
      sender: 'bot',
      timestamp: new Date()
    }
  ]);
  const [input, setInput] = useState("");
  const [isRecording, setIsRecording] = useState(false);
  const [isSpeakingEnabled, setIsSpeakingEnabled] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  // Auto scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);
  
  const toggleChatbot = () => {
    setIsOpen(!isOpen);
  };
  
  const handleSendMessage = () => {
    if (!input.trim()) return;
    
    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      content: input,
      sender: 'user',
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, userMessage]);
    setInput("");
    
    // Simulate bot response
    simulateBotResponse(input);
  };
  
  const simulateBotResponse = (userInput: string) => {
    setIsLoading(true);
    
    // Simulate API delay
    setTimeout(() => {
      let botResponse = "I'm not sure how to help with that. Could you provide more details?";
      
      // Simple pattern matching for demonstration
      const lowerInput = userInput.toLowerCase();
      
      if (lowerInput.includes("appointment") || lowerInput.includes("book")) {
        botResponse = "I'd be happy to help you book an appointment. When would you like to schedule it?";
      } else if (lowerInput.includes("headache") || lowerInput.includes("pain")) {
        botResponse = "I'm sorry to hear you're not feeling well. Could you describe your symptoms in more detail so I can provide better guidance?";
      } else if (lowerInput.includes("covid") || lowerInput.includes("vaccine")) {
        botResponse = "For COVID-19 related questions, I recommend checking the latest CDC guidelines or consulting with your healthcare provider.";
      } else if (lowerInput.includes("hello") || lowerInput.includes("hi")) {
        botResponse = "Hello! How can I assist you with your health today?";
      }
      
      const newBotMessage: Message = {
        id: Date.now().toString(),
        content: botResponse,
        sender: 'bot',
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, newBotMessage]);
      setIsLoading(false);
      
      // Text-to-speech if enabled
      if (isSpeakingEnabled) {
        speakText(botResponse);
      }
    }, 1500);
  };
  
  const toggleRecording = () => {
    setIsRecording(!isRecording);
    // In a real implementation, this would start/stop speech recognition
  };
  
  const toggleSpeaking = () => {
    setIsSpeakingEnabled(!isSpeakingEnabled);
  };
  
  const speakText = (text: string) => {
    // Using the Web Speech API
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      window.speechSynthesis.speak(utterance);
    }
  };
  
  const bookAppointment = () => {
    const appointmentMsg: Message = {
      id: Date.now().toString(),
      content: "I've opened the appointment scheduler for you. Please select a time that works for you.",
      sender: 'bot',
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, appointmentMsg]);
  };
  
  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Chat Button */}
      <Button
        onClick={toggleChatbot}
        className={cn(
          "rounded-full w-14 h-14 flex items-center justify-center bg-health-primary hover:bg-health-primary/90 transition-all shadow-lg",
          isOpen ? "scale-0 opacity-0" : "scale-100 opacity-100"
        )}
        aria-label="Open Chat"
      >
        <Bot className="h-6 w-6" />
      </Button>
      
      {/* Chat Window */}
      <div 
        className={cn(
          "bg-white rounded-xl shadow-xl w-80 md:w-96 transition-all duration-300 border border-health-border overflow-hidden",
          isOpen ? "opacity-100 scale-100" : "opacity-0 scale-90 pointer-events-none"
        )}
        style={{ height: isOpen ? '480px' : '0px' }}
      >
        {/* Chat Header */}
        <div className="bg-health-primary text-white p-3 flex justify-between items-center">
          <div className="flex items-center">
            <Avatar className="h-8 w-8 mr-2">
              <AvatarImage src="/placeholder.svg" alt="AI" />
              <AvatarFallback className="bg-white text-health-primary">AI</AvatarFallback>
            </Avatar>
            <div>
              <h3 className="font-medium text-sm">Health Assistant</h3>
              <p className="text-xs opacity-80">Online</p>
            </div>
          </div>
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={toggleChatbot}
            className="text-white hover:bg-white/10"
          >
            <X className="h-5 w-5" />
          </Button>
        </div>
        
        {/* Chat Messages */}
        <div className="p-3 overflow-y-auto" style={{ height: 'calc(480px - 132px)' }}>
          {messages.map(message => (
            <div 
              key={message.id} 
              className={cn(
                "mb-3 animate-fade-in",
                message.sender === 'user' ? "flex justify-end" : "flex justify-start"
              )}
            >
              <div 
                className={cn(
                  "p-3 rounded-lg max-w-[80%]",
                  message.sender === 'user' 
                    ? "bg-health-primary text-white rounded-tr-none" 
                    : "bg-gray-100 text-gray-800 rounded-tl-none"
                )}
              >
                <p className="text-sm">{message.content}</p>
                <span className="text-xs opacity-70 block text-right mt-1">
                  {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </span>
              </div>
            </div>
          ))}
          
          {isLoading && (
            <div className="flex justify-start mb-3 animate-fade-in">
              <div className="p-3 rounded-lg bg-gray-100 text-gray-800 rounded-tl-none">
                <div className="flex items-center space-x-2">
                  <Loader2 className="animate-spin h-4 w-4" />
                  <span className="text-sm">Typing...</span>
                </div>
              </div>
            </div>
          )}
          
          <div ref={messagesEndRef} />
        </div>
        
        {/* Quick Actions */}
        <div className="px-3 py-2 border-t border-gray-200">
          <div className="flex space-x-2 mb-2 overflow-x-auto pb-1">
            <Button 
              variant="outline" 
              size="sm" 
              className="text-xs whitespace-nowrap"
              onClick={bookAppointment}
            >
              <Calendar className="h-3 w-3 mr-1" />
              Book Appointment
            </Button>
            <Button variant="outline" size="sm" className="text-xs whitespace-nowrap">
              Check Symptoms
            </Button>
            <Button variant="outline" size="sm" className="text-xs whitespace-nowrap">
              Medication Reminder
            </Button>
          </div>
        </div>
        
        {/* Chat Input */}
        <div className="p-3 border-t border-gray-200 flex items-center">
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleRecording}
            className={isRecording ? "text-health-danger" : "text-gray-500"}
            aria-label={isRecording ? "Stop Recording" : "Start Recording"}
          >
            {isRecording ? <MicOff className="h-5 w-5" /> : <Mic className="h-5 w-5" />}
          </Button>
          
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleSpeaking}
            className="text-gray-500"
            aria-label={isSpeakingEnabled ? "Disable Voice" : "Enable Voice"}
          >
            {isSpeakingEnabled ? <Volume2 className="h-5 w-5" /> : <VolumeX className="h-5 w-5" />}
          </Button>
          
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type your message..."
            className="flex-1 mx-2 border-health-border"
            onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
          />
          
          <Button
            variant="ghost"
            size="icon"
            onClick={handleSendMessage}
            disabled={!input.trim()}
            className="text-health-primary"
            aria-label="Send Message"
          >
            <Send className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </div>
  );
}
