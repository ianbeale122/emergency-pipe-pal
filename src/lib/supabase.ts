
import { createClient } from '@supabase/supabase-js';

// Initialize Supabase client with public anon key (safe to expose in client code)
// Replace these with your actual Supabase URL and anon key
const supabaseUrl = 'https://your-project-url.supabase.co';
const supabaseAnonKey = 'your-supabase-anon-key';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// IMPORTANT:
// 1. You'll need to create a Supabase project at https://supabase.com/
// 2. Create these tables in your Supabase database:
//    - 'customers' with columns: id, full_name, email
//    - 'customer_documents' with columns: id, customer_id, document_type, file_path, file_name, uploaded_at
// 3. Create a storage bucket named 'customer-documents'
// 4. Set up appropriate RLS (Row Level Security) policies for your tables and storage
//
// Example RLS policies for customer_documents table:
// - CREATE POLICY "Users can view their own documents" ON customer_documents
//   FOR SELECT USING (auth.uid()::text = customer_id);
// - CREATE POLICY "Users can upload their own documents" ON customer_documents
//   FOR INSERT USING (auth.uid()::text = customer_id);
