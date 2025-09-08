import { Alert } from "react-native";

export const handleError = (error: any) => {
  console.error(error);
  const message =
    error instanceof Error ? error.message : "An unexpected error occurred.";
  Alert.alert("Error", message);
};
