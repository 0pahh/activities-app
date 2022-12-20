import "react-native-url-polyfill/auto";
import { createClient } from "@supabase/supabase-js";
import { SUPABASE_URL, SUPABASE_KEY } from "@env";

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

async function test() {
  try {
    const result = await supabase.from("activity_type").select("label");
    return result;
  } catch (error) {
    console.error(error);
  }
}
test();
console.log(test());
export default supabase;
