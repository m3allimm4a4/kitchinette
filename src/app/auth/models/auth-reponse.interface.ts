import { User } from '../../shared/models/user.interface';

export interface AuthReponse {
  accessToken: string;
  expiresIn: number;
  user: User;
}
