import { handleError as defaultHandleError } from "@/utils/error-handler";
import { createContext, useCallback } from "react";

interface ErrorContextType {
  handleError: (error: any) => void;
}

export const ErrorContext = createContext<ErrorContextType | undefined>(
  undefined
);

export const ErrorProvider = ({ children }: { children: React.ReactNode }) => {
  const handleError = useCallback((error: any) => {
    defaultHandleError(error);
  }, []);

  const value: ErrorContextType = {
    handleError,
  };

  return (
    <ErrorContext.Provider value={value}>{children}</ErrorContext.Provider>
  );
};
