// components/LoadingStates.tsx
import React from "react";
import { Loader2, Package } from "lucide-react";
import { Button } from "@/components/ui/button";

interface LoadingScreenProps {
  message?: string;
  submessage?: string;
}

export const LoadingScreen: React.FC<LoadingScreenProps> = ({
  message = "Loading your closet...",
  submessage = "Please wait while we set things up",
}) => {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-pink-50 to-purple-100">
      <div className="text-center">
        <Loader2 size={48} className="mx-auto mb-4 animate-spin text-pink-500" />
        <h2 className="mb-2 text-xl font-semibold text-gray-600">{message}</h2>
        <p className="text-gray-500">{submessage}</p>
      </div>
    </div>
  );
};

interface ErrorScreenProps {
  message: string;
  onRetry?: () => void;
}

export const ErrorScreen: React.FC<ErrorScreenProps> = ({ message, onRetry }) => {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-pink-50 to-purple-100">
      <div className="mx-auto max-w-md p-6 text-center">
        <Package size={48} className="mx-auto mb-4 text-red-400" />
        <h2 className="mb-2 text-xl font-semibold text-gray-600">Something went wrong</h2>
        <p className="mb-4 text-gray-500">{message}</p>
        <Button
          onClick={onRetry || (() => window.location.reload())}
          className="bg-pink-600 hover:bg-pink-700"
        >
          Try Again
        </Button>
      </div>
    </div>
  );
};

interface WelcomeScreenProps {
  message?: string;
  submessage?: string;
}

export const WelcomeScreen: React.FC<WelcomeScreenProps> = ({
  message = "Welcome to Your Closet",
  submessage = "Please complete registration to get started",
}) => {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-pink-50 to-purple-100">
      <div className="text-center">
        <Package size={48} className="mx-auto mb-4 text-gray-400" />
        <h2 className="mb-2 text-xl font-semibold text-gray-600">{message}</h2>
        <p className="text-gray-500">{submessage}</p>
      </div>
    </div>
  );
};
