import "react-native-url-polyfill/auto";
import { createClient } from "@supabase/supabase-js";
import { supabaseUrl, SUPABASE_KEY } from "@env";

const supabase = createClient(supabaseUrl, SUPABASE_KEY);
export default supabase;
