// components/MainLayout.tsx
import React from "react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import Sidebar from "../components/Sidebar";
import { UserData } from "../types";

interface MainLayoutProps {
  userData: UserData | null;
  currentDeviceId: string | null;
  loadingError: string;
  onEditProfile: () => void;
  children: React.ReactNode;
}

export const MainLayout: React.FC<MainLayoutProps> = ({
  userData,
  currentDeviceId,
  loadingError,
  onEditProfile,
  children,
}) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-purple-100 p-6">
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-6 lg:grid-cols-12">
        {/* Sidebar */}
        <div className="lg:col-span-3">
          <Sidebar
            user={
              userData
                ? { name: userData.name, email: userData.email, avatarUrl: userData.avatarUrl }
                : null
            }
            onEdit={onEditProfile}
          />
        </div>

        {/* Main content */}
        <div className="lg:col-span-9">
          {/* Header */}
          <div className="mb-8">
            <h1 className="mb-2 text-3xl font-bold text-gray-900">
              {userData ? `${userData.name}'s Personal Closet` : "My Personal Closet"}
            </h1>
            <p className="text-gray-600">Organize and manage your wardrobe collection</p>
            {loadingError && (
              <Alert className="mt-2 border-amber-200 bg-amber-50">
                <AlertDescription className="text-amber-800">⚠️ {loadingError}</AlertDescription>
              </Alert>
            )}
            {currentDeviceId && (
              <div className="mt-1 flex items-center gap-4 text-xs text-gray-400">
                <span>Device ID: {currentDeviceId}</span>
                {userData && <span>Email: {userData.email}</span>}
              </div>
            )}
          </div>

          {/* Dynamic content */}
          {children}
        </div>
      </div>
    </div>
  );
};
