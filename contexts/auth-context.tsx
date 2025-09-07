import { Customer } from "@/models/customer";
import { Deliverer } from "@/models/deliverer";
import {
  authService,
  EmailAndPasswordSignInData,
  PhoneNumberSignInData,
  SignUpData,
} from "@/services/auth-service";
import { createContext, useState } from "react";


//TODO: I should correctly implement this context
interface AuthContextType {
  userProfile: Customer | Deliverer | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  refreshProfile: (id: string) => Promise<void>;
  signInWithEmailAndPassword: (
    data: EmailAndPasswordSignInData
  ) => Promise<void>;
  signInWithPhoneNumber: (data: PhoneNumberSignInData) => Promise<void>;
  signUpWithGoogle: () => Promise<void>;
  signUpWithFacebook: () => Promise<void>;
  signUpWithApple: () => Promise<void>;
  signUp: (data: SignUpData) => Promise<void>;
  signOut: () => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
}

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [userProfile, setUserProfile] = useState<Customer | Deliverer | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  const refreshProfile = async (id: string): Promise<void> => {};

  const signInWithEmailAndPassword = async (
    data: EmailAndPasswordSignInData
  ): Promise<void> => {
    try {
      await authService.signInWithEmailAndPassword(data)
    } catch (error) {
      console.log("An error occured: ", error)
    }
  };

  const signInWithPhoneNumber = async (
    data: PhoneNumberSignInData
  ): Promise<void> => {
    try {
      await authService.signInWithPhoneNumber(data)
    } catch (error) {
      console.log("An error occured: ", error)
    }
  };

  const signUpWithGoogle = async (): Promise<void> => {
    try {
      await authService.signUpWithGoogle()
    } catch (error) {
      console.log("An error occured: ", error)
    }
  };

  const signUpWithFacebook = async (): Promise<void> => {
    try {
      await authService.signUpWithFacebook()
    } catch (error) {
      console.log("An error occured: ", error)
    }
  };

  const signUpWithApple = async (): Promise<void> => {
    try {
      await authService.signUpWithApple()
    } catch (error) {
      console.log("An error occured: ", error)
    }
  };

  const signUp = async (data: SignUpData): Promise<void> => {
    try {
      await authService.signUp(data)
    } catch (error) {
      console.log("An error occured: ", error)
    }
  };

  const signOut = async (): Promise<void> => {
    try {
      await authService.signOut()
    } catch (error) {
      console.log("An error occured: ", error)
    }
  };

  const resetPassword = async (email: string): Promise<void> => {
    try {
      await authService.resetPassword(email)
    } catch (error) {
      console.log("An error occured: ", error)
    }
  };

  const value: AuthContextType = {
    userProfile,
    isAuthenticated,
    isLoading,
    refreshProfile,
    signInWithEmailAndPassword,
    signInWithPhoneNumber,
    signUpWithGoogle,
    signUpWithFacebook,
    signUpWithApple,
    signUp,
    signOut,
    resetPassword,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
