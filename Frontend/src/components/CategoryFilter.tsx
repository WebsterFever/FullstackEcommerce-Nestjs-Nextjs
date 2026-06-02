"use client";

interface CategoryFilterProps {
  selectedCategory: string;
  setSelectedCategory: (category: string) => void;
}

const CategoryFilter = ({
  selectedCategory,
  setSelectedCategory,
}: CategoryFilterProps) => {
  return (
    <div className="flex gap-4 p-6 flex-wrap">
      <button onClick={() => setSelectedCategory("all")}>
        All
      </button>

      <button onClick={() => setSelectedCategory("smartphone")}>
        Smartphones
      </button>

      <button onClick={() => setSelectedCategory("monitor")}>
        Monitors
      </button>

      <button onClick={() => setSelectedCategory("keyboard")}>
        Keyboards
      </button>

      <button onClick={() => setSelectedCategory("mouse")}>
        Mouse
      </button>
    </div>
  );
};

export default CategoryFilter;