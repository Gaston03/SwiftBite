import { useAuth } from "@/hooks/use-auth";
import { useRouter } from "expo-router";
import { useEffect } from "react";
import { SplashScreen } from "./SplashScreen";

export const AppRouter = ({ children }: { children: React.ReactNode }) => {
  const {
    isLoading,
    isAuthenticated,
    onboardingCompleted,
    requiresProfileCompletion,
  } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (isLoading) {
      return;
    }

    if (!isAuthenticated && !onboardingCompleted) {
      router.replace("/(onboarding)");
    } else if (!isAuthenticated && onboardingCompleted) {
      router.replace("/(auth)/select-role");
    } else if (isAuthenticated && requiresProfileCompletion) {
      router.replace("/(auth)/complete-profile");
    } else if (isAuthenticated && !requiresProfileCompletion) {
      // User is authenticated and profile is complete
      // We can handle role-based redirection here if needed,
      // but for now, we'll let the existing navigation handle it.
      // The user should be at their respective home screen.
    }
  }, [
    isLoading,
    isAuthenticated,
    onboardingCompleted,
    requiresProfileCompletion,
    router,
  ]);

  if (isLoading && !onboardingCompleted) {
    return <SplashScreen />;
  }

  return <>{children}</>;
};
