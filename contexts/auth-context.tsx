import { useError } from "@/hooks/use-error";
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
import { User } from "@supabase/supabase-js";
import { createContext, useCallback, useEffect, useState } from "react";

const ONBOARDING_COMPLETED_KEY = "onboarding-completed";

interface AuthContextType {
  user: User | null;
  userProfile: Customer | Deliverer | null;
  isAuthenticated: boolean;
  isInitializing: boolean;
  isLoading: boolean;
  onboardingCompleted: boolean;
  requiresProfileCompletion: boolean;
  updateUserProfile: (profile: Customer | Deliverer) => void;
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
  const { handleError } = useError();
  const [user, setUser] = useState<User | null>(null);
  const [userProfile, setUserProfile] = useState<Customer | Deliverer | null>(
    null
  );
  const [isLoading, setIsLoading] = useState(false);
  const [isInitializing, setIsInitializing] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [onboardingCompleted, setOnboardingCompleted] = useState(false);
  const [requiresProfileCompletion, setRequiresProfileCompletion] =
    useState(false);

  const loadUser = useCallback(async () => {
    try {
      // await AsyncStorage.clear()
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
      console.log("onboardingCompleted", onboardingCompleted);
      setOnboardingCompleted(onboardingCompleted === "true");
    } catch (error) {
      handleError(error);
    } finally {
      setIsInitializing(false);
    }
  }, [handleError]);

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
      handleError(error);
    } finally {
      setIsLoading(false);
    }
  };

  const signInWithEmailAndPassword = async (
    data: EmailAndPasswordSignInData
  ): Promise<void> => {
    setIsLoading(true);
    try {
      const { error } = await authService.signInWithEmailAndPassword(data);

      if (error) {
        handleError(error);
      }
    } catch (error: any) {
      handleError(error);
    } finally {
      setIsLoading(false);
    }
  };

  const signInWithPhoneNumber = async (
    data: PhoneNumberSignInData
  ): Promise<void> => {
    setIsLoading(true);
    try {
      const { error } = await authService.signInWithPhoneNumber(data);

      if (error) {
        handleError(error);
      }
    } catch (error: any) {
      handleError(error);
    } finally {
      setIsLoading(false);
    }
  };

  const verifyPhoneNumberOtp = async (
    data: VerifyPhoneNumberOtpData
  ): Promise<void> => {
    setIsLoading(true);
    try {
      const { error } = await authService.verifyPhoneNumberOtp(data);

      if (error) handleError(error);
    } catch (error: any) {
      handleError(error);
    } finally {
      setIsLoading(false);
    }
  };

  const signUpWithGoogle = async (): Promise<void> => {
    setIsLoading(true);
    try {
      const { error } = await authService.signUpWithGoogle();
      if (error) handleError(error);
    } catch (error: any) {
      handleError(error);
    } finally {
      setIsLoading(false);
    }
  };

  const signUpWithFacebook = async (): Promise<void> => {
    setIsLoading(true);
    try {
      const { error } = await authService.signUpWithFacebook();

      if (error) handleError(error);
    } catch (error: any) {
      handleError(error);
    } finally {
      setIsLoading(false);
    }
  };

  const signUpWithApple = async (): Promise<void> => {
    setIsLoading(true);
    try {
      const { error } = await authService.signUpWithApple();

      if (error) handleError(error);
    } catch (error: any) {
      handleError(error);
    } finally {
      setIsLoading(false);
    }
  };

  const signUp = async (data: SignUpData): Promise<void> => {
    setIsLoading(true);
    try {
      const { error } = await authService.signUp(data);

      if (error) handleError(error);
    } catch (error: any) {
      handleError(error);
    } finally {
      setIsLoading(false);
    }
  };

  const signOut = async (): Promise<void> => {
    setIsLoading(true);
    try {
      const { error } = await authService.signOut();

      if (error) handleError(error);
    } catch (error: any) {
      handleError(error);
    } finally {
      setIsLoading(false);
    }
  };

  const resetPassword = async (email: string): Promise<void> => {
    setIsLoading(true);
    try {
      const { error } = await authService.resetPassword(email);

      if (error) handleError(error);
    } catch (error: any) {
      handleError(error);
    } finally {
      setIsLoading(false);
    }
  };

  const completeOnboarding = async (): Promise<void> => {
    setOnboardingCompleted(true);
    await AsyncStorage.setItem(ONBOARDING_COMPLETED_KEY, "true");
  };

  const updateUserProfile = (profile: Customer | Deliverer) => {
    setUserProfile(profile);
  };

  const value: AuthContextType = {
    user,
    userProfile,
    isAuthenticated,
    isLoading,
    isInitializing,
    onboardingCompleted,
    requiresProfileCompletion,
    updateUserProfile,
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
