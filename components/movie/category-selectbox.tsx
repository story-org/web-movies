"use client";

import { useRouter } from "next/navigation";
import { Category } from "@/types/movie";

type CategorySelectBoxProps = {
  categories: Category[];
  currentCategory: Category;
};

export default function CategorySelectBox({
  categories,
  currentCategory,
}: CategorySelectBoxProps) {
  const router = useRouter();
  return (
    <div className="flex flex-wrap gap-2">
      <select onChange={(e) => router.push(`/category?slug=${e.target.value}`)}>
        {categories.map((category: any) => (
          <option
            key={category.slug}
            value={category.slug}
            selected={currentCategory.slug === category.slug}
          >
            {category.name}
          </option>
        ))}
      </select>
    </div>
  );
}
