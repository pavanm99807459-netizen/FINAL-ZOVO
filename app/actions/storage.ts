
"use server";
import { supabaseAdmin } from "@/lib/supabase/admin";

export async function uploadProductImage(productId: string, file: File) {
  return await supabaseAdmin.storage
    .from("products")
    .upload(`${productId}/${file.name}`, file, { upsert: true });
}
