import { Generated } from "kysely";

export interface Database {
  account: AccountTable;
}

export interface AccountTable {
  user_id: Generated<number>;
  username: string;
  email: string;
  created_at: Date;
  last_login: Date;
}
