import { createClient } from "@supabase/supabase-js";

export const supabaseUrl = "https://cqdflnraotvxbdzrlpzu.supabase.co";
const supabaseKey =
	"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNxZGZsbnJhb3R2eGJkenJscHp1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTcwNjkwMDYsImV4cCI6MjAzMjY0NTAwNn0.7_grWSomMVAfyDCNKHSkYsfjyIFv3mw7qKE1os7u6Hk";
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
