
import { createClient } from '@supabase/supabase-js';

// Initialize Supabase client with public anon key (safe to expose in client code)
const supabaseUrl = 'https://oaarsjrbkqvdimbwbokq.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9hYXJzanJia3F2ZGltYndib2txIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDEwMTA3MDYsImV4cCI6MjA1NjU4NjcwNn0.ZmQVu8PVDSnZ20rCofbHhzKZQB4hZkGUPVk5Mg15f2o';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// For admin features:
// 1. You'll need to create a Supabase project at https://supabase.com/
// 2. Create these tables in your Supabase database:
//    - 'customers' with columns: id, full_name, email
//    - 'customer_documents' with columns: id, customer_id, document_type, file_path, file_name, uploaded_at
// 3. Create a storage bucket named 'customer-documents'
// 4. Set up appropriate RLS (Row Level Security) policies for your tables and storage
