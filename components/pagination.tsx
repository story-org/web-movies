"use client";

import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { usePathname, useSearchParams } from "next/navigation";

export default function PaginationComponent({ pageInfo }: { pageInfo: any }) {
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
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            href={`${pathname}?${createQueryString(
              Math.max(1, pageInfo.currentPage - 1)
            )}`}
            isActive={pageInfo.currentPage > 1}
          />
        </PaginationItem>

        {getVisiblePages().map((page, index) =>
          page === "..." ? (
            <PaginationItem key={index}>
              <PaginationEllipsis />
            </PaginationItem>
          ) : (
            <PaginationItem key={index}>
              <PaginationLink
                href={`${pathname}?${createQueryString(page as number)}`}
                isActive={pageInfo.currentPage === page}
              >
                {page}
              </PaginationLink>
            </PaginationItem>
          )
        )}

        <PaginationItem>
          <PaginationNext
            href={`${pathname}?${createQueryString(
              Math.min(pageInfo.totalPages, pageInfo.currentPage + 1)
            )}`}
            isActive={pageInfo.currentPage < pageInfo.totalPages}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}
