"use client";

import type React from "react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
// Removed: import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";
import { createUserWithEmailAndPassword } from "firebase/auth";
// Import GeoPoint along with other firestore functions
import { doc, setDoc, GeoPoint } from "firebase/firestore";
// Corrected the import path to be relative
import { auth, db } from "@/components/auth/firebase"; // Import auth and db directly

export function SignupForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    agreeToTerms: false,
    allowLocation: false,
  });
  const [isLoading, setIsLoading] = useState(false);
  // Removed: const router = useRouter();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    if (formData.password !== formData.confirmPassword) {
      toast({
        title: "Error",
        description: "Passwords don't match.",
        variant: "destructive",
      });
      setIsLoading(false);
      return;
    }

    if (!formData.agreeToTerms) {
      toast({
        title: "Error",
        description: "Please agree to the terms and conditions.",
        variant: "destructive",
      });
      setIsLoading(false);
      return;
    }

    let locationData: { latitude: number; longitude: number } | null = null;
    if (formData.allowLocation && navigator.geolocation) {
      locationData = await new Promise((resolve) => {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const loc = {
              latitude: position.coords.latitude,
              longitude: position.coords.longitude,
            };
            localStorage.setItem("userLocation", JSON.stringify(loc));
            resolve(loc);
          },
          (error) => {
            console.log("Location access denied:", error);
            toast({
              title: "Warning",
              description: "Location access was denied. Some features may be limited.",
              variant: "destructive",
            });
            resolve(null);
          },
        );
      });
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, formData.email, formData.password);
      const user = userCredential.user;

      // Convert the plain location object to a Firestore GeoPoint
      const firestoreLocation = locationData
        ? new GeoPoint(locationData.latitude, locationData.longitude)
        : null;

      // Use the correct 'firestoreLocation' variable for Firestore
      await setDoc(doc(db, "users", user.uid), {
        name: formData.name,
        email: user.email,
        createdAt: new Date().toISOString(),
        hasLocation: formData.allowLocation,
        ...(firestoreLocation && { location: firestoreLocation }),
      });

      // Construct the 'userData' object more explicitly for localStorage
      const userData: any = {
        name: formData.name,
        email: user.email,
        isAuthenticated: true,
        hasLocation: formData.allowLocation,
      };
      
      if (locationData) {
        userData.location = locationData;
      }
      
      localStorage.setItem("user", JSON.stringify(userData));

      toast({
        title: "Welcome to EcoTracker!",
        description: "Your account has been created successfully.",
      });
      
      // Replaced router.push with standard window navigation
      window.location.href = "/dashboard";

    } catch (error: any) {
      let errorMessage = "Failed to create account. Please try again.";
      if (error.code === "auth/email-already-in-use") {
        errorMessage = "This email is already registered.";
      } else if (error.code === "auth/weak-password") {
        errorMessage = "Password must be at least 6 characters.";
      }
      toast({
        title: "Error",
        description: errorMessage,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="name">Full Name</Label>
        <Input
          id="name"
          type="text"
          placeholder="John Doe"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          required
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          type="email"
          placeholder="your@email.com"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          required
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="password">Password</Label>
        <Input
          id="password"
          type="password"
          placeholder="Create a password"
          value={formData.password}
          onChange={(e) => setFormData({ ...formData, password: e.target.value })}
          required
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="confirmPassword">Confirm Password</Label>
        <Input
          id="confirmPassword"
          type="password"
          placeholder="Confirm your password"
          value={formData.confirmPassword}
          onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
          required
        />
      </div>

      <div className="space-y-3">
        <div className="flex items-center space-x-2">
          <Checkbox
            id="location"
            checked={formData.allowLocation}
            onCheckedChange={(checked) => setFormData({ ...formData, allowLocation: checked as boolean })}
          />
          <Label htmlFor="location" className="text-sm">
            Allow location access to find nearby eco-friends
          </Label>
        </div>
        <div className="flex items-center space-x-2">
          <Checkbox
            id="terms"
            checked={formData.agreeToTerms}
            onCheckedChange={(checked) => setFormData({ ...formData, agreeToTerms: checked as boolean })}
          />
          <Label htmlFor="terms" className="text-sm">
            I agree to the terms and conditions
          </Label>
        </div>
      </div>

      <Button type="submit" className="w-full" disabled={isLoading}>
        {isLoading ? "Creating account..." : "Create Account"}
      </Button>
    </form>
  );
}

