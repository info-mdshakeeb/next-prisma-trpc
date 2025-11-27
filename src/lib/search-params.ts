
import {
  createSearchParamsCache,
  parseAsInteger,
  parseAsString
} from 'nuqs/server';


export const searchParamsCache = createSearchParamsCache({
  callbackUrl: parseAsString.withDefault('/'),
  token: parseAsString,
  page: parseAsInteger.withDefault(1),
  limit: parseAsString.withDefault('20'),
  search: parseAsString.withDefault(''),
  status: parseAsString.withDefault(''),
  perPage: parseAsInteger.withDefault(10),
  created_at: parseAsString.withDefault(''),
  filter: parseAsString.withDefault(''),
});
