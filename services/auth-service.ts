
export interface EmailAndPasswordSignInData {
  email: string;
  password: string;
}

export interface PhoneNumberSignInData {
  countryCode: string;
  phoneNumber: string;
}

export interface SignUpData {
  firstName: string;
  lastName: string;
  email: string;
  countryCode: string;
  phoneNumber: string;
}

class AuthService {

  refreshProfile = async (id: string): Promise<void> => {}

  signInWithEmailAndPassword = async (data: EmailAndPasswordSignInData): Promise<void> => {}

  signInWithPhoneNumber = async (data: PhoneNumberSignInData): Promise<void> => {}

  signUpWithGoogle = async (): Promise<void> => {}

  signUpWithFacebook = async (): Promise<void> => {}

  signUpWithApple = async (): Promise<void> => {}

  signUp = async (data: SignUpData): Promise<void> => {}

  signOut = async (): Promise<void> => {}

  resetPassword = async (email: string): Promise<void> => {}

}

export const authService = new AuthService()