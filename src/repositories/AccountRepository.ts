import { db } from "../database";
import { AccountTable } from "../types";
import { UpdateAccountDTO } from "../useCases/UpdateAccount/UpdateAccountDTO";
import { IAccountRepository } from "./IAccountRepository";

export class AccountRepository implements IAccountRepository {
  private repo = db;
  async save(account: AccountTable): Promise<void> {
    await this.repo.transaction().execute(async (trx) => {
      await trx
        .insertInto("account")
        .values({
          user_id: account.user_id,
          username: account.username,
          email: account.email,
          created_at: account.created_at,
          last_login: account.last_login,
          favorite_genres: account.favorite_genres,
          avatar: account.avatar,
        })
        .execute();
    });
  }

  async getDetails(accountId: string): Promise<AccountTable> {
    const account = await this.repo
      .selectFrom("account")
      .selectAll()
      .where("user_id", "=", `${accountId}`)
      .executeTakeFirst();

    return account as AccountTable;
  }

  async updateDetails(account: UpdateAccountDTO): Promise<boolean> {
    const updatedAccount = await this.repo
      .updateTable("account")
      .set({
        email: account.email,
        username: account.username,
        avatar: account.avatar,
      })
      .where("user_id", "=", account.user_id)
      .executeTakeFirst();
    if (updatedAccount.numUpdatedRows) {
      return true;
    }
    return false;
  }

  async delete(accountId: string): Promise<void> {
    await this.repo
      .deleteFrom("account")
      .where("user_id", "=", accountId)
      .execute();
  }
}
