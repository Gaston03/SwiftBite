
import { UserRole } from "@/models/enums";
import { supabase } from "@/utils/supabase";
import { AuthError, Provider, Session, User } from "@supabase/supabase-js";

export interface EmailAndPasswordSignInData {
  email: string;
  password: string;
}

export interface PhoneNumberSignInData {
  countryCode: string;
  phoneNumber: string;
}

export interface SignUpData {
  email: string;
  password: string;
  role: UserRole;
}

export interface VerifyPhoneNumberOtpData extends PhoneNumberSignInData {
  token: string;
}

class AuthService {
  getCurrentUser = async (): Promise<{
    user: User | null;
    error: AuthError | null;
  }> => {
    const {
      data: { user },
      error,
    } = await supabase.auth.getUser();
    return { user, error };
  };

  getProfile = async (
    id: string
  ): Promise<{ data: any | null; error: any }> => {
    let { data, error } = await supabase
      .from("customers")
      .select("*")
      .eq("id", id)
      .maybeSingle();
    if (!data) {
      ({ data, error } = await supabase
        .from("deliverers")
        .select("*")
        .eq("id", id)
        .maybeSingle());
    }
    return { data, error };
  };

  refreshProfile = async (
    id: string,
    role: UserRole
  ): Promise<{ data: any | null; error: any }> => {
    const { data, error } = await supabase
      .from(role === UserRole.CUSTOMER ? "customers" : "deliverers")
      .select("*")
      .eq("id", id)
      .maybeSingle();

    return { data, error };
  };

  signInWithEmailAndPassword = async (
    data: EmailAndPasswordSignInData
  ): Promise<{ session: Session | null; error: AuthError | null }> => {
    const {
      data: { session },
      error,
    } = await supabase.auth.signInWithPassword(data);
    console.log('===== error: ', error)
    return { session, error };
  };

  signInWithPhoneNumber = async (
    data: PhoneNumberSignInData
  ): Promise<{ user: User | null; error: AuthError | null }> => {
    const {
      data: { user },
      error,
    } = await supabase.auth.signInWithOtp({
      phone: `${data.countryCode}${data.phoneNumber}`,
    });
    return { user, error };
  };

  verifyPhoneNumberOtp = async (
    data: VerifyPhoneNumberOtpData
  ): Promise<{ session: Session | null; error: AuthError | null }> => {
    const {
      data: { session },
      error,
    } = await supabase.auth.verifyOtp({
      phone: `${data.countryCode}${data.phoneNumber}`,
      token: data.token,
      type: "sms",
    });
    return { session, error };
  };

  signUpWithGoogle = async (): Promise<{
    data: {
      provider: Provider;
      url: string | null;
    } | null;
    error: AuthError | null;
  }> => {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: "google",
    });
    return { data, error };
  };

  signUpWithFacebook = async (): Promise<{
    data: {
      provider: Provider;
      url: string | null;
    } | null;
    error: AuthError | null;
  }> => {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: "facebook",
    });
    return { data, error };
  };

  signUpWithApple = async (): Promise<{
    data: {
      provider: Provider;
      url: string | null;
    } | null;
    error: AuthError | null;
  }> => {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: "apple",
    });
    return { data, error };
  };

  signUp = async (
    data: SignUpData
  ): Promise<{ user: User | null; error: any }> => {
    const {
      data: { user },
      error,
    } = await supabase.auth.signUp({
      email: data.email,
      password: data.password,
      options: {
        data: {
          role: data.role,
        },
      },
    });

    return { user, error };
  };

  signOut = async (): Promise<{ error: AuthError | null }> => {
    const { error } = await supabase.auth.signOut();
    return { error };
  };

  resetPassword = async (email: string): Promise<{ error: AuthError | null }> => {
    const { error } = await supabase.auth.resetPasswordForEmail(email);
    return { error };
  };

  onAuthStateChange = (
    callback: (event: string, session: Session | null) => void
  ) => {
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(callback);
    return subscription;
  };
}

export const authService = new AuthService()