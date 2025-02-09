"use client";

import { useRouter, useSearchParams } from "next/navigation";

interface HeaderProps {
  currentValue?: string;
  isCategory?: boolean;
  topics?: { slug: string; name: string }[];
  categories?: { slug: string; name: string }[];
}

export default function Header({
  currentValue,
  isCategory,
  topics = [],
  categories = [],
}: HeaderProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleSelect = (slug: string, iscat: boolean) => {
    const params = new URLSearchParams(searchParams);
    params.delete("category");
    params.delete("topic");
    params.delete("index");

    if (iscat) {
      params.set("category", slug);
    } else {
      params.set("topic", slug);
    }

    router.push(`?${params.toString()}`);
  };

  return (
    <nav className="sticky top-0 z-40 w-full border-b border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-900">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <div className="flex items-center space-x-4">
          <h1
            onClick={() => router.push("/")}
            className="text-xl font-bold cursor-pointer mr-4"
          >
            Phim Ảnh
          </h1>
          <select
            value={!isCategory ? currentValue : ""}
            onChange={(e) => handleSelect(e.target.value, false)}
            className="px-3 py-2 text-sm font-medium rounded-md border border-gray-300 bg-white dark:bg-gray-900 dark:border-gray-700"
          >
            <option value="">Select Topic</option>
            {topics.map((topic) => (
              <option key={topic.slug} value={topic.slug}>
                {topic.name}
              </option>
            ))}
          </select>
          <select
            value={isCategory ? currentValue : ""}
            onChange={(e) => handleSelect(e.target.value, true)}
            className="px-3 py-2 text-sm font-medium rounded-md border border-gray-300 bg-white dark:bg-gray-900 dark:border-gray-700"
          >
            <option value="">Select Category</option>
            {categories.map((category) => (
              <option key={category.slug} value={category.slug}>
                {category.name}
              </option>
            ))}
          </select>
        </div>
      </div>
    </nav>
  );
}
