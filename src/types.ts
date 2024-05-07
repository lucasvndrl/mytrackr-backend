import { Generated } from "kysely";

export interface Database {
  account: AccountTable;
}

export interface AccountTable {
  user_id: string;
  username: string;
  email: string;
  created_at: Date;
  last_login: Date;
  avatar: string;
  favorites_genres: string;
}
