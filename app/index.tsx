import { SplashScreen } from "@/components/shared/SplashScreen";
import { useAuth } from "@/hooks/use-auth";
import { Redirect } from "expo-router";

export default function Index() {
  const {
    isLoading,
    isAuthenticated,
    onboardingCompleted,
    requiresProfileCompletion,
    userProfile,
  } = useAuth();

  if (isLoading) {
    return <SplashScreen />;
  }

  if (!isAuthenticated) {
    if (onboardingCompleted) {
      return <Redirect href="/(auth)/login" />;
    } else {
      return <Redirect href="/(onboarding)" />;
    }
  }

  // User is authenticated at this point
  if (requiresProfileCompletion) {
    return <Redirect href="/(auth)/complete-profile" />;
  }

  if (!onboardingCompleted) {
    // This case should not happen if requiresProfileCompletion is handled correctly,
    // but as a fallback, we send them to complete profile.
    return <Redirect href="/(auth)/complete-profile" />;
  }

  if (userProfile?.role === "customer") {
    return <Redirect href="/(customer)/home" />;
  }

  if (userProfile?.role === "deliverer") {
    return <Redirect href="/(deliverer)/home" />;
  }

  // Fallback in case user is authenticated, onboarded, but has no role.
  return <Redirect href="/(auth)/select-role" />;
}
