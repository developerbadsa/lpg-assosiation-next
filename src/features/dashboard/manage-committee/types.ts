export type UserRole = 'MANAGER' | 'ADMIN' | 'AUTHOR';

export type UserRow = {
  id: string;
  name: string;
  email: string;
  avatarUrl: string;
  roles: UserRole[];
  lastLoginAt?: string | null; // null => Not Log in
};
