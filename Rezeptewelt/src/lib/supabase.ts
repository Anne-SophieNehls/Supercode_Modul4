import { createClient } from "@supabase/supabase-js";
import { Database } from "../types/supabase-types";

const supabasURL = import.meta.env.VITE_SUPABASE_URL
const supabseAnonKey = import.meta.env.VITE_SUPABASE_ANONKEY

export const supabase = createClient<Database>( supabasURL, supabseAnonKey)

if(!supabasURL || !supabseAnonKey){
    throw new Error("URL oder Key fehlt")
}