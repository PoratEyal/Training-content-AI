import { ProductPages, allowedTransitions } from "../models/enum/pages";

export function enforcePageAccess(
  currentPage: ProductPages | null,
  setCurrentPage: (page: ProductPages) => void,
  targetPage: ProductPages,
  navigate: (path: string) => void,
  fallbackPath: string
) {
  const allowed = allowedTransitions[targetPage];
  const previousPage = currentPage || sessionStorage.getItem("lastVisitedPage") || "";

  setCurrentPage(targetPage);
  sessionStorage.setItem("lastVisitedPage", targetPage);

  const isAllowed = allowed.some(
    (allowedPage) =>
      previousPage === allowedPage || previousPage.startsWith(`${allowedPage}/`)
  );

  if (!isAllowed) {
    navigate(fallbackPath);
  }
}

