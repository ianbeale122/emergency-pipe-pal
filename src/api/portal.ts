
import { supabase } from '@/lib/supabase';
import { Certificate } from '@/components/customer-portal/CertificateItem';
import { Invoice } from '@/components/customer-portal/InvoiceItem';
import { FaqVideo } from '@/types/faq';

// User Profile Types
export type UserProfile = {
  id: string;
  user_id: string;
  full_name: string;
  address: string;
  phone: string;
  created_at: string;
};

// Fetch user profile
export const fetchUserProfile = async (userId: string): Promise<UserProfile | null> => {
  const { data, error } = await supabase
    .from('profiles')
    .select('*')
    .eq('user_id', userId)
    .single();
  
  if (error) {
    console.error('Error fetching user profile:', error);
    return null;
  }
  
  return data;
};

// Update user profile
export const updateUserProfile = async (profile: Partial<UserProfile>): Promise<boolean> => {
  const { error } = await supabase
    .from('profiles')
    .upsert(profile)
    .eq('id', profile.id);
  
  if (error) {
    console.error('Error updating profile:', error);
    return false;
  }
  
  return true;
};

// Fetch user certificates
export const fetchCertificates = async (userId: string): Promise<Certificate[]> => {
  const { data, error } = await supabase
    .from('certificates')
    .select('*')
    .eq('user_id', userId);
  
  if (error) {
    console.error('Error fetching certificates:', error);
    return [];
  }
  
  return data || [];
};

// Fetch user invoices
export const fetchInvoices = async (userId: string): Promise<Invoice[]> => {
  const { data, error } = await supabase
    .from('invoices')
    .select('*')
    .eq('user_id', userId);
  
  if (error) {
    console.error('Error fetching invoices:', error);
    return [];
  }
  
  return data || [];
};

// Fetch FAQ videos
export const fetchFaqVideos = async (): Promise<FaqVideo[]> => {
  const { data, error } = await supabase
    .from('faq_videos')
    .select('*');
  
  if (error) {
    console.error('Error fetching FAQ videos:', error);
    return [];
  }
  
  return data || [];
};

// Download certificate
export const downloadCertificate = async (certificateId: string): Promise<string | null> => {
  const { data, error } = await supabase
    .storage
    .from('certificates')
    .createSignedUrl(`certificates/${certificateId}.pdf`, 60);
  
  if (error) {
    console.error('Error creating signed URL:', error);
    return null;
  }
  
  return data.signedUrl;
};

// Download invoice
export const downloadInvoice = async (invoiceId: string): Promise<string | null> => {
  const { data, error } = await supabase
    .storage
    .from('invoices')
    .createSignedUrl(`invoices/${invoiceId}.pdf`, 60);
  
  if (error) {
    console.error('Error creating signed URL:', error);
    return null;
  }
  
  return data.signedUrl;
};

// Submit a plumbing issue
export type IssueSubmission = {
  user_id: string;
  title: string;
  description: string;
  property_address: string;
  images?: string[];
  status: 'pending' | 'in_progress' | 'resolved';
};

export const submitIssue = async (issue: Omit<IssueSubmission, 'status'>): Promise<boolean> => {
  const { error } = await supabase
    .from('issues')
    .insert({
      ...issue,
      status: 'pending'
    });
  
  if (error) {
    console.error('Error submitting issue:', error);
    return false;
  }
  
  return true;
};

// Upload image for an issue
export const uploadIssueImage = async (file: File, userId: string): Promise<string | null> => {
  const fileExt = file.name.split('.').pop();
  const fileName = `${userId}/${Date.now()}.${fileExt}`;
  
  const { error } = await supabase
    .storage
    .from('issue_images')
    .upload(fileName, file);
    
  if (error) {
    console.error('Error uploading image:', error);
    return null;
  }
  
  const { data } = supabase
    .storage
    .from('issue_images')
    .getPublicUrl(fileName);
    
  return data.publicUrl;
};
