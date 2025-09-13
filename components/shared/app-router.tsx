import { useAuth } from "@/hooks/use-auth";
import { useRouter } from "expo-router";
import { useEffect } from "react";
import { SplashScreen } from "./SplashScreen";
import { UserRole } from "@/models/enums";

export const AppRouter = ({ children }: { children: React.ReactNode }) => {
  const {
    user,
    isInitializing,
    isAuthenticated,
    onboardingCompleted,
    requiresProfileCompletion,
  } = useAuth();
  const router = useRouter();

  useEffect(() => {
    console.log('====== isAuthenticated: ', isAuthenticated)
    console.log('====== onboardingCompleted: ', onboardingCompleted)
    console.log('====== requiresProfileCompletion: ', requiresProfileCompletion)
    if (isInitializing) {
      return;
    }

    if (!isAuthenticated && !onboardingCompleted) {
      router.replace("/(onboarding)");
    } else if (!isAuthenticated && onboardingCompleted) {
      router.replace("/(auth)/select-role");
    } else if (isAuthenticated && requiresProfileCompletion) {
      router.replace("/(auth)/complete-profile");
    } else if (isAuthenticated && !requiresProfileCompletion) {
      if (user?.app_metadata.role === UserRole.CUSTOMER) {
        router.push("/(customer)/(tabs)/home")
        // User is authenticated and profile is complete
        // We can handle role-based redirection here if needed,
        // but for now, we'll let the existing navigation handle it.
        // The user should be at their respective home screen.
      } else {
        router.push("/(deliverer)/home")
      }
    }
  }, [
    user,
    isInitializing,
    isAuthenticated,
    onboardingCompleted,
    requiresProfileCompletion,
    router,
  ]);

  if (isInitializing) {
    return <SplashScreen />;
  }

  return <>{children}</>;
};
