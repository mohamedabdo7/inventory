// components/RegistrationModal.tsx
import React, { useState } from "react";
import { Loader2 } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { deviceService } from "../services/deviceService";
import { UserData, RegistrationFormData, FormErrors } from "../types";

interface RegistrationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (deviceId: string, userData: UserData) => void;
}

export const RegistrationModal: React.FC<RegistrationModalProps> = ({
  isOpen,
  onClose,
  onSuccess,
}) => {
  const [formData, setFormData] = useState<RegistrationFormData>({
    name: "",
    phone: "",
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string>("");

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};
    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.phone.trim()) newErrors.phone = "Phone number is required";
    else if (!/^\+?[\d\s-()]{10,}$/.test(formData.phone.trim()))
      newErrors.phone = "Please enter a valid phone number";
    if (!formData.email.trim()) newErrors.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim()))
      newErrors.email = "Please enter a valid email";
    if (!formData.password.trim()) newErrors.password = "Password is required";
    else if (formData.password.length < 6)
      newErrors.password = "Password must be at least 6 characters";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange =
    (field: keyof RegistrationFormData) => (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;
      setFormData((prev) => ({ ...prev, [field]: value }));
      if (errors[field]) setErrors((prev) => ({ ...prev, [field]: undefined }));
      if (submitError) setSubmitError("");
    };

  const handleSubmit = async () => {
    if (!validateForm()) return;
    setIsSubmitting(true);
    setSubmitError("");
    try {
      const deviceId = deviceService.generateDeviceId(formData.email.trim());
      const response = await deviceService.simulateRegistrationApi(formData, deviceId);
      deviceService.saveDeviceId(deviceId);
      deviceService.saveUserData(response.user);
      onSuccess(deviceId, response.user);
      onClose();
    } catch (error) {
      setSubmitError(error instanceof Error ? error.message : "Registration failed");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={() => !isSubmitting && onClose()}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Welcome to Your Personal Closet</DialogTitle>
          <DialogDescription>
            Please provide your details to get started with organizing your wardrobe.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          {submitError && (
            <Alert variant="destructive">
              <AlertDescription>{submitError}</AlertDescription>
            </Alert>
          )}

          <div className="space-y-2">
            <Label htmlFor="name">Full Name</Label>
            <Input
              id="name"
              type="text"
              value={formData.name}
              onChange={handleInputChange("name")}
              placeholder="Enter your full name"
              disabled={isSubmitting}
              className={errors.name ? "border-red-500" : ""}
            />
            {errors.name && <p className="text-sm text-red-500">{errors.name}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="phone">Phone Number</Label>
            <Input
              id="phone"
              type="tel"
              value={formData.phone}
              onChange={handleInputChange("phone")}
              placeholder="Enter your phone number"
              disabled={isSubmitting}
              className={errors.phone ? "border-red-500" : ""}
            />
            {errors.phone && <p className="text-sm text-red-500">{errors.phone}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Email Address</Label>
            <Input
              id="email"
              type="email"
              value={formData.email}
              onChange={handleInputChange("email")}
              placeholder="Enter your email address"
              disabled={isSubmitting}
              className={errors.email ? "border-red-500" : ""}
            />
            {errors.email && <p className="text-sm text-red-500">{errors.email}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              value={formData.password}
              onChange={handleInputChange("password")}
              placeholder="Create a password (min. 6 characters)"
              disabled={isSubmitting}
              className={errors.password ? "border-red-500" : ""}
            />
            {errors.password && <p className="text-sm text-red-500">{errors.password}</p>}
          </div>

          <div className="flex gap-3 pt-4">
            <Button onClick={handleSubmit} disabled={isSubmitting} className="flex-1">
              {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              {isSubmitting ? "Registering..." : "Get Started"}
            </Button>
            <Button variant="outline" onClick={onClose} disabled={isSubmitting}>
              Cancel
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
