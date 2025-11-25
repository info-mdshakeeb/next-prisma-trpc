"use client";
import { NavigateFn } from "@/hooks/use-table-url-state";
import { Route } from "next";
import { useRouter, useSearchParams } from "next/navigation";

export type SearchRecord = Record<string, string | number | null | undefined>;

export function useNavigate(): NavigateFn {
  const router = useRouter();
  const params = useSearchParams();

  return ({ search, replace = false }) => {
    // Convert current params -> object
    const prev: SearchRecord = {};
    params.forEach((v, k) => {
      prev[k] = v;
    });

    let next: SearchRecord;

    if (search === true) {
      // keep previous search params as-is
      next = prev;
    } else if (typeof search === "function") {
      // compute next from callback
      next = { ...prev, ...(search(prev) as SearchRecord) };
    } else {
      // merge provided object
      next = { ...prev, ...search } as SearchRecord;
    }

    // Clean null/undefined
    const clean = Object.fromEntries(
      Object.entries(next).filter(([_, v]) => v != null)
    );

    const query = new URLSearchParams(
      clean as Record<string, string>
    ).toString();

    const url = `?${query}`;

    if (replace) {
      router.replace(url as Route);
    } else {
      router.push(url as Route);
    }
  };
}
