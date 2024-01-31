import React, { useState, useEffect, ChangeEvent, KeyboardEvent } from "react";

function debounce<T extends any[]>(
  func: (...args: T) => void,
  wait: number
): (...args: T) => void {
  let timeout: ReturnType<typeof setTimeout>;

  return function executedFunction(...args: T) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };

    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

interface SearchBarProps {
  onSearch: (searchTerm: string, searchType: string) => void;
}

export default function SearchBar({ onSearch }: SearchBarProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchType, setSearchType] = useState("child");
  const [isTyping, setIsTyping] = useState(false);

  const debouncedSearch = debounce(() => onSearch(searchTerm, searchType), 500);

  useEffect(() => {
    if (searchTerm) {
      setIsTyping(true);
      debouncedSearch();
    } else {
      setIsTyping(false);
    }
    const timeoutId = setTimeout(() => {
      onSearch(searchTerm, searchType);
    }, 500);
    return () => clearTimeout(timeoutId);
  }, [debouncedSearch, onSearch, searchTerm, searchType]);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleSearch = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      onSearch(searchTerm, searchType);
    }
  };

  return (
    <div className="">
      <input
        className=" border-2 border-gray-300 bg-white h-10 px-5 pr-16 rounded-lg text-sm focus:outline-none shadow-md"
        type="text"
        placeholder={
          isTyping
            ? "Press enter to view all results."
            : "Search for parents, child or caregivers."
        }
        value={searchTerm}
        onKeyDown={handleSearch}
        onChange={handleInputChange}
      />

      <select
        className=" border-2 border-gray-300 bg-white h-10 px-5 pr-16 rounded-lg text-sm focus:outline-none shadow-md"
        value={searchType}
        title="Search Type"
        onChange={(e) => setSearchType(e.target.value)}
      >
        <option value="child">Child</option>
        <option value="parent">Parent</option>
        <option value="caregiver">Caregiver</option>
      </select>
    </div>
  );
}
