import { useAuth } from "@/hooks/use-auth";
import { useRouter, useSegments } from "expo-router";
import { useEffect } from "react";

export function useProtectedRoute() {
  const { isAuthenticated, onboardingCompleted, isLoading, userProfile } =
    useAuth();
  const segments = useSegments();
  const router = useRouter();

  useEffect(() => {
    if (isLoading) {
      return;
    }

    const inAuthGroup = segments[0] === "(auth)";
    const inOnboardingGroup = segments[0] === "(onboarding)";

    if (isAuthenticated) {
      if (onboardingCompleted) {
        if (userProfile?.role === "customer") {
          router.replace("/(customer)/home");
        } else if (userProfile?.role === "deliverer") {
          router.replace("/(deliverer)/home");
        }
      }
    } else {
      if (onboardingCompleted) {
        if (!inAuthGroup) {
          router.replace("/(auth)/select-role");
        }
      } else {
        if (!inOnboardingGroup) {
          router.replace("/(onboarding)");
        }
      }
    }
  }, [
    isAuthenticated,
    onboardingCompleted,
    isLoading,
    segments,
    userProfile,
    router,
  ]);
}
