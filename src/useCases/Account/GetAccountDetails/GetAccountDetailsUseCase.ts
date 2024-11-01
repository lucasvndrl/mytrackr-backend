import AppError from "../../../error/AppError";
import { IAccountRepository } from "../../../repositories/IAccountRepository";
import { AccountTable } from "../../../types";

export class GetAccountDetailsUseCase {
  constructor(private accountRepository: IAccountRepository) {}

  async execute(userId: string): Promise<AccountTable> {
    const account = await this.accountRepository.getDetails(userId);
    if (account === undefined) {
      throw new AppError("Account not found.", 404);
    }
    return account;
  }
}
