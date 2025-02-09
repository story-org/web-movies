"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

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
  const [showSearch, setShowSearch] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSelect = async (slug: string, iscat: boolean) => {
    const params = new URLSearchParams();
    if (iscat) {
      params.set("category", slug);
    } else {
      params.set("topic", slug);
    }

    setIsLoading(true);
    await router.push(`/?${params.toString()}`);
    setIsLoading(false);
    setShowMobileMenu(false);
  };

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      setIsLoading(true);
      await router.push(
        `/search?query=${encodeURIComponent(searchQuery.trim())}`,
      );
      setIsLoading(false);
      setShowSearch(false);
      setSearchQuery("");
    }
  };

  return (
    <nav className="sticky top-0 z-40 w-full border-b border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-900">
      {isLoading && (
        <div className="absolute top-0 left-0 h-1 bg-blue-500 animate-[loading_1s_ease-in-out_infinite]"></div>
      )}
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <div className="flex items-center">
          <h1
            onClick={() => router.push("/")}
            className="text-xl font-bold cursor-pointer mr-4"
          >
            Phim Ảnh
          </h1>
          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-4">
            <select
              value={!isCategory ? currentValue : ""}
              onChange={(e) => handleSelect(e.target.value, false)}
              className="px-3 py-2 text-sm font-medium rounded-md border border-gray-300 bg-white dark:bg-gray-900 dark:border-gray-700"
            >
              <option value="">Chọn Danh Mục</option>
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
              <option value="">Thể Loại</option>
              {categories.map((category) => (
                <option key={category.slug} value={category.slug}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <button
            onClick={() => setShowSearch(!showSearch)}
            className="p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
              />
            </svg>
          </button>
          {/* Mobile Menu Button */}
          <button
            onClick={() => setShowMobileMenu(!showMobileMenu)}
            className="md:hidden p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
              />
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {showMobileMenu && (
        <div className="md:hidden border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 p-4">
          <div className="space-y-4">
            <select
              value={!isCategory ? currentValue : ""}
              onChange={(e) => handleSelect(e.target.value, false)}
              className="w-full px-3 py-2 text-sm font-medium rounded-md border border-gray-300 bg-white dark:bg-gray-900 dark:border-gray-700"
            >
              <option value="">Chọn Danh Mục</option>
              {topics.map((topic) => (
                <option key={topic.slug} value={topic.slug}>
                  {topic.name}
                </option>
              ))}
            </select>
            <select
              value={isCategory ? currentValue : ""}
              onChange={(e) => handleSelect(e.target.value, true)}
              className="w-full px-3 py-2 text-sm font-medium rounded-md border border-gray-300 bg-white dark:bg-gray-900 dark:border-gray-700"
            >
              <option value="">Thể Loại</option>
              {categories.map((category) => (
                <option key={category.slug} value={category.slug}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>
        </div>
      )}

      {/* Search Modal */}
      {showSearch && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-start justify-center pt-20">
          <form
            onSubmit={handleSearch}
            className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-lg w-full max-w-xl mx-4"
          >
            <div className="flex gap-2">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Tìm kiếm..."
                className="flex-1 px-4 py-2 border rounded-md dark:bg-gray-700 dark:border-gray-600"
                autoFocus
              />
              <button
                type="submit"
                className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
              >
                Tìm Kiếm
              </button>
              <button
                type="button"
                onClick={() => setShowSearch(false)}
                className="px-4 py-2 bg-gray-200 rounded-md hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600"
              >
                Hủy
              </button>
            </div>
          </form>
        </div>
      )}

      <style jsx>{`
        @keyframes loading {
          0% {
            width: 0%;
          }
          50% {
            width: 70%;
          }
          100% {
            width: 100%;
          }
        }
      `}</style>
    </nav>
  );
}
