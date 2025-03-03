
export type Customer = {
  id: string;
  full_name: string;
  email: string;
};

export type CustomerExtendedData = {
  phone?: string;
  address?: string;
  joinDate?: string;
  status?: 'active' | 'pending' | 'inactive';
  lastService?: string;
};

export type StatusFilterType = 'all' | 'active' | 'pending' | 'inactive';
