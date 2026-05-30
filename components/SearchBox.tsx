"use client";

import { Search } from "lucide-react";

interface SearchBoxProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

export default function SearchBox({
  value,
  onChange,
  placeholder = "Cari...",
}: SearchBoxProps) {
  return (
    <div className="relative w-full">

      <div className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2">
        <Search className="h-5 w-5 text-gray-400" />
      </div>

      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="
          h-14
          w-full
          rounded-2xl
          border
          border-gray-200
          bg-white
          pl-12
          pr-4
          text-sm
          text-gray-800
          shadow-sm
          outline-none
          transition
          placeholder:text-gray-400
          focus:border-green-500
          focus:ring-4
          focus:ring-green-100
        "
      />

    </div>
  );
}