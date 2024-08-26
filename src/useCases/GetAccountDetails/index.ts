import { AccountRepository } from "../../repositories/AccountRepository";
import { GetAccountDetailsController } from "./GetAccountDetailsController";
import { GetAccountDetailsUseCase } from "./GetAccountDetailsUseCase";

const accountRepository = new AccountRepository();

const getAccountDetailsUseCase = new GetAccountDetailsUseCase(
  accountRepository
);

const getAccountDetailsController = new GetAccountDetailsController(
  getAccountDetailsUseCase
);

export { getAccountDetailsController };
