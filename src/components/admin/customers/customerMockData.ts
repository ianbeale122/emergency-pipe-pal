
import { Customer, CustomerExtendedData } from './types';

// Enhanced mock customer data with more entries
export const mockCustomerExtendedData: Record<string, CustomerExtendedData> = {
  '1': {
    phone: '07700 900123',
    address: '123 Oak Street, London',
    joinDate: '2022-05-15',
    status: 'active',
    lastService: '2023-11-10'
  },
  '2': {
    phone: '07700 900456',
    address: '45 Maple Avenue, Manchester',
    joinDate: '2021-08-22',
    status: 'active',
    lastService: '2023-12-05'
  },
  '3': {
    phone: '07700 900789',
    address: '78 Pine Road, Birmingham',
    joinDate: '2023-01-30',
    status: 'inactive',
    lastService: '2023-09-18'
  },
  '4': {
    phone: '07700 900321',
    address: '12 Cedar Lane, Glasgow',
    joinDate: '2022-11-05',
    status: 'active',
    lastService: '2024-01-20'
  },
  '5': {
    phone: '07700 900654',
    address: '67 Willow Drive, Cardiff',
    joinDate: '2023-04-12',
    status: 'active',
    lastService: '2024-02-15'
  },
  '6': {
    phone: '07700 900987',
    address: '34 Elm Court, Edinburgh',
    joinDate: '2023-06-18',
    status: 'active',
    lastService: '2024-03-05'
  },
  '7': {
    phone: '07700 900234',
    address: '90 Birch Road, Bristol',
    joinDate: '2022-03-25',
    status: 'inactive',
    lastService: '2023-08-12'
  },
  '8': {
    phone: '07700 900567',
    address: '56 Ash Avenue, Liverpool',
    joinDate: '2021-12-10',
    status: 'active',
    lastService: '2024-01-08'
  },
  '9': {
    phone: '07700 900890',
    address: '23 Spruce Street, Newcastle',
    joinDate: '2023-09-05',
    status: 'active',
    lastService: '2024-02-28'
  },
  '10': {
    phone: '07700 900432',
    address: '78 Fir Close, Belfast',
    joinDate: '2022-08-15',
    status: 'inactive',
    lastService: '2023-11-22'
  },
  '11': {
    phone: '07700 900765',
    address: '45 Sycamore Lane, Leeds',
    joinDate: '2023-02-18',
    status: 'active',
    lastService: '2024-03-10'
  },
  '12': {
    phone: '07700 900098',
    address: '12 Cherry Way, Sheffield',
    joinDate: '2021-11-30',
    status: 'active',
    lastService: '2024-01-15'
  }
};

// Enhanced mock customer list with more entries
export const mockCustomers: Customer[] = [
  { id: '1', full_name: 'John Smith', email: 'john.smith@example.com' },
  { id: '2', full_name: 'Sarah Johnson', email: 'sarah.j@example.com' },
  { id: '3', full_name: 'David Williams', email: 'david.w@example.com' },
  { id: '4', full_name: 'Emma Thompson', email: 'emma.t@example.com' },
  { id: '5', full_name: 'Michael Davies', email: 'michael.d@example.com' },
  { id: '6', full_name: 'Rebecca Wilson', email: 'rebecca.w@example.com' },
  { id: '7', full_name: 'Thomas Brown', email: 'thomas.b@example.com' },
  { id: '8', full_name: 'Jessica Taylor', email: 'jessica.t@example.com' },
  { id: '9', full_name: 'Daniel Evans', email: 'daniel.e@example.com' },
  { id: '10', full_name: 'Olivia Roberts', email: 'olivia.r@example.com' },
  { id: '11', full_name: 'James Martin', email: 'james.m@example.com' },
  { id: '12', full_name: 'Sophie White', email: 'sophie.w@example.com' }
];
