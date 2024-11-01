import Database from "better-sqlite3";
import { AccountTable } from "../types";
import { UpdateAccountDTO } from "../useCases/Account/UpdateAccount/UpdateAccountDTO";
import { IAccountRepository } from "./IAccountRepository";

export class TestAccountRepository implements IAccountRepository {
  private db: Database.Database;

  constructor() {
    this.db = new Database(":memory:");
    this.init();
  }

  init() {
    this.db.exec(`
      CREATE TABLE IF NOT EXISTS account (
        user_id TEXT PRIMARY KEY,
        username TEXT UNIQUE NOT NULL,
        email TEXT UNIQUE NOT NULL,
        created_at TEXT NOT NULL,
        last_login TEXT,
        favorite_genres TEXT NOT NULL,
        avatar TEXT
      );
    `);
  }

  close() {
    this.db.close();
  }

  async save(account: AccountTable): Promise<void> {
    const {
      user_id,
      username,
      email,
      created_at,
      last_login,
      favorite_genres,
      avatar,
    } = account;

    const stmt = this.db.prepare(`
      INSERT INTO account (user_id, username, email, created_at, last_login, favorite_genres, avatar)
      VALUES (?, ?, ?, ?, ?, ?, ?);
    `);
    const favoriteGenresConcat = favorite_genres.join(",");

    stmt.run(
      user_id.toString(),
      username.toString(),
      email.toString(),
      created_at.toISOString(),
      last_login.toISOString(),
      favoriteGenresConcat,
      avatar?.arrayBuffer.toString()
    );
  }

  async getDetails(accountId: string): Promise<AccountTable> {
    const stmt = this.db.prepare(`
      SELECT * FROM account WHERE user_id = ?;
    `);
    const account = stmt.get(accountId);

    return account as AccountTable;
  }

  async updateDetails(account: UpdateAccountDTO): Promise<boolean> {
    const { user_id, email, username, avatar } = account;

    const stmt = this.db.prepare(`
      UPDATE account
      SET email = ?, username = ?, avatar = ?
      WHERE user_id = ?;
    `);

    const result = stmt.run(email, username, avatar, user_id);
    return result.changes > 0;
  }

  async delete(accountId: string): Promise<void> {
    const stmt = this.db.prepare(`
      DELETE FROM account WHERE user_id = ?;
    `);
    stmt.run(accountId);
  }
}
