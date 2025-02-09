"use client";

import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface PaginationProps {
  pageInfo: any;
}

export default function Pagination({ pageInfo }: PaginationProps) {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const createQueryString = (page: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("index", page.toString());
    return params.toString();
  };

  const getVisiblePages = () => {
    const totalPages = pageInfo.totalPages;
    const currentPage = pageInfo.currentPage;
    const isMobile =
      typeof window !== "undefined" &&
      window.matchMedia("(max-width: 640px)").matches;
    const delta = isMobile ? 1 : 2;
    const range = [];
    const rangeWithDots = [];

    for (
      let i = Math.max(2, currentPage - delta);
      i <= Math.min(totalPages - 1, currentPage + delta);
      i++
    ) {
      range.push(i);
    }

    if (currentPage - delta > 2) {
      rangeWithDots.push(1, "...");
    } else {
      rangeWithDots.push(1);
    }

    rangeWithDots.push(...range);

    if (currentPage + delta < totalPages - 1) {
      rangeWithDots.push("...", totalPages);
    } else if (totalPages > 1) {
      rangeWithDots.push(totalPages);
    }

    return rangeWithDots;
  };

  return (
    <div className="flex max-w-screen items-center justify-center gap-1 sm:gap-2 py-4">
      <Link
        href={`${pathname}?${createQueryString(
          Math.max(1, pageInfo.currentPage - 1),
        )}`}
        className={`p-2 sm:px-3 sm:py-1 text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-md hover:bg-gray-50 dark:hover:bg-gray-700 ${
          pageInfo.currentPage === 1 ? "opacity-50 pointer-events-none" : ""
        }`}
        aria-label="Previous page"
      >
        <ChevronLeft className="w-4 h-4" />
      </Link>

      <div className="flex items-center gap-1 sm:gap-2">
        {getVisiblePages().map((page, index) =>
          page === "..." ? (
            <span
              key={index}
              className="px-2 sm:px-3 py-1 text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              ...
            </span>
          ) : (
            <Link
              key={index}
              href={`${pathname}?${createQueryString(page as number)}`}
              className={`px-2 sm:px-3 py-1 text-sm font-medium rounded-md ${
                pageInfo.currentPage === page
                  ? "bg-blue-600 text-white dark:bg-blue-500"
                  : "text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700"
              }`}
            >
              {page}
            </Link>
          ),
        )}
      </div>

      <Link
        href={`${pathname}?${createQueryString(
          Math.min(pageInfo.totalPages, pageInfo.currentPage + 1),
        )}`}
        className={`p-2 sm:px-3 sm:py-1 text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-md hover:bg-gray-50 dark:hover:bg-gray-700 ${
          pageInfo.currentPage === pageInfo.totalPages
            ? "opacity-50 pointer-events-none"
            : ""
        }`}
        aria-label="Next page"
      >
        <ChevronRight className="w-4 h-4" />
      </Link>
    </div>
  );
}
