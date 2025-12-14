
"use server";
import { supabaseAdmin } from "@/lib/supabase/admin";
import { supabase } from "@/lib/supabase/client";

export async function createOrder(payload: any) {
  return await supabaseAdmin.from("orders").insert({
    user_id: payload.userId,
    items: payload.items,
    total: payload.total,
    payment_status: "pending",
    order_status: "placed"
  });
}

export async function submitPayment(orderId: string, txn: string, payer: string) {
  return await supabase.from("orders").update({
    payment_status: "awaiting_admin_approval",
    payment_meta: { txn_id: txn, payer_name: payer }
  }).eq("id", orderId);
}

export async function adminApproveOrder(orderId: string) {
  await supabaseAdmin.from("orders").update({
    payment_status: "paid",
    order_status: "confirmed"
  }).eq("id", orderId);

  return await supabaseAdmin.from("order_steps").insert({
    order_id: orderId,
    step: "placed"
  });
}
