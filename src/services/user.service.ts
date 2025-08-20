import { BasePaginationQuery } from "@/types";
import { hashPassword } from "@/util";
import { UserType } from "@/validation/user.schema";

export const getUsers = async ({
  limit = 10,
  page = 1,
  q = "",
  sort_by = "createdAt",
  sort_dir = "desc",
}: BasePaginationQuery) => {
  const skip = (page - 1) * limit || 0;

  return {};
};

export const getUserTransferData = async (
  id: string,
  {
    limit = 10,
    page = 1,
    sort_by = "createdAt",
    sort_dir = "desc",
  }: BasePaginationQuery
) => {
  const skip = (page - 1) * limit || 0;

  return {};
};

export const getUserByEmail = async (email: string) => {
  return null;
};

export const createUser = async (user: UserType) => {};

export const getUserById = async (id: string) => {};
