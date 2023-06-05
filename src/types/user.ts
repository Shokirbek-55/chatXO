export interface User {
  id: number;
  color?: string;
  email?: string;
  avatar?: string;
  active?: boolean;
  username: string;
  createdAt?: string;
  updatedAt?: string;
  channels?: any; // then_will_do!
  // channels?: Channel[];
  relevance?: number;
  judgement?: number;
  status?: string;
  latitude?: string;
  longitude?: string;
}
