
"use server";
import { supabase } from "@/lib/supabase/client";

export async function signup(email: string, password: string) {
  return await supabase.auth.signUp({ email, password });
}

export async function login(email: string, password: string) {
  const res = await supabase.auth.signInWithPassword({ email, password });
  const isAdmin =
    email === process.env.ADMIN_EMAIL &&
    password === process.env.ADMIN_PASSWORD;
  return { ...res, isAdmin };
}
