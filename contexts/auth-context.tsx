import { Customer } from "@/models/customer";
import { Deliverer } from "@/models/deliverer";
import {
  authService,
  EmailAndPasswordSignInData,
  PhoneNumberSignInData,
  SignUpData,
  VerifyPhoneNumberOtpData,
} from "@/services/auth-service";
import { supabase } from "@/utils/supabase";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AuthError, User } from "@supabase/supabase-js";
import { createContext, useCallback, useEffect, useState } from "react";

const ONBOARDING_COMPLETED_KEY = "onboarding-completed";

interface AuthContextType {
  user: User | null;
  userProfile: Customer | Deliverer | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  onboardingCompleted: boolean;
  requiresProfileCompletion: boolean;
  error: AuthError | null;
  clearError: () => void;
  completeOnboarding: () => Promise<void>;
  refreshProfile: () => Promise<void>;
  signInWithEmailAndPassword: (
    data: EmailAndPasswordSignInData
  ) => Promise<void>;
  signInWithPhoneNumber: (data: PhoneNumberSignInData) => Promise<void>;
  verifyPhoneNumberOtp: (data: VerifyPhoneNumberOtpData) => Promise<void>;
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
  const [user, setUser] = useState<User | null>(null);
  const [userProfile, setUserProfile] = useState<Customer | Deliverer | null>(
    null
  );
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [onboardingCompleted, setOnboardingCompleted] = useState(false);
  const [requiresProfileCompletion, setRequiresProfileCompletion] =
    useState(false);
  const [error, setError] = useState<AuthError | null>(null);

  const clearError = () => {
    setError(null);
  };

  const loadUser = useCallback(async () => {
    try {
      setIsLoading(true);
      setRequiresProfileCompletion(false);
      const {
        data: { session },
      } = await supabase.auth.getSession();
      if (session) {
        setUser(session.user);
        const { data: profile } = await authService.getProfile(session.user.id);
        if (profile) {
          setUserProfile(profile);
        } else {
          setRequiresProfileCompletion(true);
        }
        setIsAuthenticated(true);
      }
      const onboardingCompleted = await AsyncStorage.getItem(
        ONBOARDING_COMPLETED_KEY
      );
      setOnboardingCompleted(onboardingCompleted === "true");
    } catch (error) {
      console.error("Error loading user:", error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    loadUser();
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session) {
        setUser(session.user);
        setIsAuthenticated(true);
        authService.getProfile(session.user.id).then(({ data: profile }) => {
          if (profile) {
            setUserProfile(profile);
            setRequiresProfileCompletion(false);
          } else {
            setUserProfile(null);
            setRequiresProfileCompletion(true);
          }
        });
      } else {
        setUser(null);
        setUserProfile(null);
        setIsAuthenticated(false);
        setRequiresProfileCompletion(false);
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [loadUser]);

  const refreshProfile = async (): Promise<void> => {
    setIsLoading(true);
    try {
      const { user } = await authService.getCurrentUser();
      if (user) {
        const role = user.app_metadata?.role;
        if (role) {
          const { data: profile } = await authService.refreshProfile(
            user.id,
            role
          );
          setUserProfile(profile);
        }
      }
    } catch (error) {
      console.log("An error occured: ", error);
    } finally {
      setIsLoading(false);
    }
  };

  const signInWithEmailAndPassword = async (
    data: EmailAndPasswordSignInData
  ): Promise<void> => {
    setIsLoading(true);
    setError(null);
    try {
      await authService.signInWithEmailAndPassword(data);
    } catch (error: any) {
      setError(error);
    } finally {
      setIsLoading(false);
    }
  };

  const signInWithPhoneNumber = async (
    data: PhoneNumberSignInData
  ): Promise<void> => {
    setIsLoading(true);
    setError(null);
    try {
      await authService.signInWithPhoneNumber(data);
    } catch (error: any) {
      setError(error);
    } finally {
      setIsLoading(false);
    }
  };

  const verifyPhoneNumberOtp = async (
    data: VerifyPhoneNumberOtpData
  ): Promise<void> => {
    setIsLoading(true);
    setError(null);
    try {
      await authService.verifyPhoneNumberOtp(data);
    } catch (error: any) {
      setError(error);
    } finally {
      setIsLoading(false);
    }
  };

  const signUpWithGoogle = async (): Promise<void> => {
    setIsLoading(true);
    setError(null);
    try {
      await authService.signUpWithGoogle();
    } catch (error: any) {
      setError(error);
    } finally {
      setIsLoading(false);
    }
  };

  const signUpWithFacebook = async (): Promise<void> => {
    setIsLoading(true);
    setError(null);
    try {
      await authService.signUpWithFacebook();
    } catch (error: any) {
      setError(error);
    } finally {
      setIsLoading(false);
    }
  };

  const signUpWithApple = async (): Promise<void> => {
    setIsLoading(true);
    setError(null);
    try {
      await authService.signUpWithApple();
    } catch (error: any) {
      setError(error);
    } finally {
      setIsLoading(false);
    }
  };

  const signUp = async (data: SignUpData): Promise<void> => {
    setIsLoading(true);
    setError(null);
    try {
      await authService.signUp(data);
    } catch (error: any) {
      setError(error);
    } finally {
      setIsLoading(false);
    }
  };

  const signOut = async (): Promise<void> => {
    setIsLoading(true);
    setError(null);
    try {
      await authService.signOut();
    } catch (error: any) {
      setError(error);
    } finally {
      setIsLoading(false);
    }
  };

  const resetPassword = async (email: string): Promise<void> => {
    setIsLoading(true);
    setError(null);
    try {
      await authService.resetPassword(email);
    } catch (error: any) {
      setError(error);
    } finally {
      setIsLoading(false);
    }
  };

  const completeOnboarding = async (): Promise<void> => {
    setOnboardingCompleted(true);
    await AsyncStorage.setItem(ONBOARDING_COMPLETED_KEY, "true");
  };

  const value: AuthContextType = {
    user,
    userProfile,
    isAuthenticated: true,
    isLoading,
    onboardingCompleted,
    requiresProfileCompletion,
    error,
    clearError,
    completeOnboarding,
    refreshProfile,
    signInWithEmailAndPassword,
    signInWithPhoneNumber,
    verifyPhoneNumberOtp,
    signUpWithGoogle,
    signUpWithFacebook,
    signUpWithApple,
    signUp,
    signOut,
    resetPassword,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
