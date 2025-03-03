
import { createClient } from '@supabase/supabase-js';

// Get environment variables
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

// Create Supabase client with fallback for development
export const supabase = supabaseUrl 
  ? createClient(supabaseUrl, supabaseKey)
  : {
      auth: {
        signUp: () => Promise.resolve({ data: { user: null }, error: new Error('Supabase not configured') }),
        signInWithPassword: () => Promise.resolve({ data: { user: null }, error: new Error('Supabase not configured') }),
        signOut: () => Promise.resolve({ error: null }),
        getUser: () => Promise.resolve({ data: { user: null }, error: null }),
        onAuthStateChange: () => ({ data: { subscription: { unsubscribe: () => {} } } }),
      },
      from: () => ({
        select: () => ({
          eq: (column: string, value: string) => Promise.resolve({ data: [], error: null }),
          order: () => ({
            eq: (column: string, value: string) => Promise.resolve({ data: [], error: null }),
          }),
        }),
        insert: () => Promise.resolve({ data: null, error: null }),
        update: () => ({ 
          eq: () => Promise.resolve({ data: null, error: null }) 
        }),
        delete: () => ({ 
          eq: () => Promise.resolve({ data: null, error: null }) 
        }),
      }),
      storage: {
        from: () => ({
          download: () => Promise.resolve({ data: null, error: null }),
        }),
      },
    };

// Authentication functions
export const signIn = async (email: string, password: string) => {
  if (!supabaseUrl) {
    console.warn("Supabase not configured, using mock authentication");
    // For admin testing in development
    if (email === "admin@example.com" && password === "admin123") {
      return { data: { user: { id: 'mock-admin-id', email, user_metadata: { is_admin: true } } }, error: null };
    }
    return { data: { user: { id: 'mock-user-id', email } }, error: null };
  }
  return await supabase.auth.signInWithPassword({ email, password });
};

export const signUp = async (email: string, password: string, metadata?: object) => {
  if (!supabaseUrl) {
    console.warn("Supabase not configured, using mock authentication");
    return { data: { user: { id: 'mock-user-id', email } }, error: null };
  }
  return await supabase.auth.signUp({ email, password, options: { data: metadata } });
};

export const signOut = async () => {
  if (!supabaseUrl) {
    console.warn("Supabase not configured, using mock authentication");
    return { error: null };
  }
  return await supabase.auth.signOut();
};

export const getCurrentUser = async () => {
  if (!supabaseUrl) {
    console.warn("Supabase not configured, using mock user");
    // Check localStorage for mock admin session
    const mockAdminSession = localStorage.getItem('mockAdminSession');
    if (mockAdminSession === 'true') {
      return { id: 'mock-admin-id', email: 'admin@example.com', user_metadata: { is_admin: true } };
    }
    // Return mock user for development
    return { id: 'mock-user-id', email: 'test@example.com' };
  }
  
  try {
    const { data, error } = await supabase.auth.getUser();
    if (error) throw error;
    return data.user;
  } catch (error) {
    console.error("Error getting current user:", error);
    return null;
  }
};
