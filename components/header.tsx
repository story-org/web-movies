"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
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
            <Select value={!isCategory ? currentValue : ""} onValueChange={(value) => handleSelect(value, false)}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Chọn Danh Mục" />
              </SelectTrigger>
              <SelectContent>
                {topics.map((topic) => (
                  <SelectItem key={topic.slug} value={topic.slug}>
                    {topic.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={isCategory ? currentValue : ""} onValueChange={(value) => handleSelect(value, true)}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Thể Loại" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((category) => (
                  <SelectItem key={category.slug} value={category.slug}>
                    {category.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setShowSearch(!showSearch)}
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
          </Button>
          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setShowMobileMenu(!showMobileMenu)}
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
          </Button>
        </div>
      </div>

      {/* Mobile Menu */}
      {showMobileMenu && (
        <div className="md:hidden border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 p-4">
          <div className="space-y-4">
            <Select value={!isCategory ? currentValue : ""} onValueChange={(value) => handleSelect(value, false)}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Chọn Danh Mục" />
              </SelectTrigger>
              <SelectContent>
                {topics.map((topic) => (
                  <SelectItem key={topic.slug} value={topic.slug}>
                    {topic.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={isCategory ? currentValue : ""} onValueChange={(value) => handleSelect(value, true)}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Thể Loại" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((category) => (
                  <SelectItem key={category.slug} value={category.slug}>
                    {category.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
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
              <Input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Tìm kiếm..."
                className="flex-1"
                autoFocus
              />
              <Button type="submit">
                Tìm Kiếm
              </Button>
              <Button
                type="button"
                variant="secondary"
                onClick={() => setShowSearch(false)}
              >
                Hủy
              </Button>
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