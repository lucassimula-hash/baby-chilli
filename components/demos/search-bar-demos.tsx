"use client";

import { useState } from "react";
import { SearchBar } from "@/components/ui/search-bar";

export function SearchBarDefault() {
  const [value, setValue] = useState("");
  return (
    <div className="w-full max-w-[343px]">
      <SearchBar
        placeholder="search"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onClear={() => setValue("")}
      />
    </div>
  );
}

export function SearchBarStates() {
  return (
    <div className="flex flex-col gap-6 w-full max-w-[343px]">
      <div>
        <p className="text-xs text-[var(--text-base-secondary)] mb-1">Placeholder</p>
        <SearchBar placeholder="search" value="" onChange={() => {}} />
      </div>
      <div>
        <p className="text-xs text-[var(--text-base-secondary)] mb-1">Filled</p>
        <SearchBar placeholder="search" value="search" onChange={() => {}} onClear={() => {}} />
      </div>
    </div>
  );
}
