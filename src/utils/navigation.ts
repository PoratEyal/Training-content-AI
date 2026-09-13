import { ProductPages, allowedTransitions } from "../models/enum/pages";
import { StorageKey } from "../models/enum/storage";

export function enforcePageAccess(
  currentPage: ProductPages | null,
  setCurrentPage: (page: ProductPages) => void,
  targetPage: ProductPages,
  navigate: (path: string) => void,
  fallbackPath: string
) {
  const allowed = allowedTransitions[targetPage];
  const previousPage = currentPage || sessionStorage.getItem(StorageKey.LAST_PAGE) || "";

  setCurrentPage(targetPage);
  sessionStorage.setItem(StorageKey.LAST_PAGE, targetPage);

  const isAllowed = allowed.some(
    (allowedPage) =>
      previousPage === allowedPage || previousPage.startsWith(`${allowedPage}/`)
  );

  if (!isAllowed) {
    navigate(fallbackPath);
  }
}

