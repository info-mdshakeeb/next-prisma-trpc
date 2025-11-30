import { PAGINATION } from "@/config/constants";
import { createLoader, parseAsInteger, parseAsString } from "nuqs/server";


export const authParams = {
  page: parseAsInteger
    .withDefault(PAGINATION.DEFAULT_PAGE)
    .withOptions({ clearOnDefault: true }),
  pageSize: parseAsInteger
    .withDefault(PAGINATION.DEFAULT_PER_PAGE)
    .withOptions({ clearOnDefault: true }),
  search: parseAsString
    .withDefault("")
    .withOptions({ clearOnDefault: true }),
}

export const authParamsLoader = createLoader(authParams);