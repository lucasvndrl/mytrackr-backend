import { IAccountRepository } from "../../repositories/IAccountRepository";
import { AccountTable } from "../../types";

export class CreateAccountUseCase {
  constructor(private accountRepository: IAccountRepository) {}

  async execute(account: AccountTable): Promise<void> {
    await this.accountRepository.save(account);
  }
}
