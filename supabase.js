import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://ohcimixoogyrdbqzxwsk.supabase.co";
const supabaseKey = "sb_publishable_tGx3482i41j96TPOhJKA6A_2Fw_Wb-x";

export const supabase = createClient(
  supabaseUrl,
  supabaseKey
);