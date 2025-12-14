
"use server";
import { supabaseAdmin } from "@/lib/supabase/admin";

export async function createProduct(data: any) {
  return await supabaseAdmin.from("products").insert(data);
}

export async function updateProduct(id: string, data: any) {
  return await supabaseAdmin.from("products").update(data).eq("id", id);
}

export async function deleteProduct(id: string) {
  return await supabaseAdmin.from("products").delete().eq("id", id);
}
