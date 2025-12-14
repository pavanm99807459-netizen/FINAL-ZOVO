
"use server";
import { supabase } from "@/lib/supabase/client";
import { supabaseAdmin } from "@/lib/supabase/admin";

export async function createTicket(userId: string, subject: string) {
  return await supabase.from("tickets").insert({ user_id: userId, subject });
}

export async function sendMessage(ticketId: string, sender: string, message: string) {
  return await supabase.from("ticket_messages").insert({
    ticket_id: ticketId,
    sender,
    message
  });
}

export async function adminReply(ticketId: string, message: string) {
  return await supabaseAdmin.from("ticket_messages").insert({
    ticket_id: ticketId,
    sender: "admin",
    message
  });
}
