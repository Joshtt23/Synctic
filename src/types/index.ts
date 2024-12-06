// import { User } from 'firebase/auth';
import { Timestamp } from 'firebase/firestore';

export interface AuthUser {
    uid: string
    email: string | null
    displayName: string | null
    photoURL: string | null
    emailVerified: boolean
  }
export interface Company {
  companyName: string;
  apiKey: string;
  createdAt: Timestamp;
  updatedAt: Timestamp;
}

