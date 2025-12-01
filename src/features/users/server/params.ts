import { PAGINATION } from "@/config/constants";
import { createLoader, parseAsInteger, parseAsString } from "nuqs/server";


export const usersParams = {
  page: parseAsInteger
    .withDefault(PAGINATION.DEFAULT_PAGE)
    .withOptions({ clearOnDefault: true }),
  perPage: parseAsInteger
    .withDefault(PAGINATION.DEFAULT_PER_PAGE)
    .withOptions({ clearOnDefault: true }),
  search: parseAsString
    .withDefault("")
    .withOptions({ clearOnDefault: true }),
}

export const usersParamsLoader = createLoader(usersParams);