export type DashboardStats = {
  totalStations: number;
  totalOwners: number;
  unreadMessages: number;
  activeNotices: number;
};

export type MyProfile = {
  fullName: string;
  email: string;
  phone: string;
  address: string;
  avatarUrl?: string | null;
};
