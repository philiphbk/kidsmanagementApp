import React, { useState, useEffect } from "react";

interface SearchBarProps {
  onSearch: (searchTerm: string, searchType: string) => void;
}

export default function SearchBar({ onSearch }: SearchBarProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchType, setSearchType] = useState("child");

  useEffect(() => {
    // Implement your automatic search logic here
    const timeoutId = setTimeout(() => {
      onSearch(searchTerm, searchType);
    }, 500); // Adjust the delay as needed

    // Cleanup the previous timer when the component re-renders
    return () => clearTimeout(timeoutId);
  }, [searchTerm, searchType, onSearch]);


  return (
    <div className="">
      <input
        className=" border-2 border-gray-300 bg-white h-10 px-5 pr-16 rounded-lg text-sm focus:outline-none shadow-md"
        type="text"
        placeholder="Enter search term"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
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
