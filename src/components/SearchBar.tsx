import React, { useState, useEffect } from "react";
import { weatherApi } from "../services/weatherApi";
import { GeocodingResult } from "../types/weather";

interface SearchBarProps {
  onLocationSelect: (latitude: number, longitude: number, name: string) => void;
}

export const SearchBar: React.FC<SearchBarProps> = ({ onLocationSelect }) => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<GeocodingResult[]>([]);
  const [showResults, setShowResults] = useState(false);

  useEffect(() => {
    const timer = setTimeout(async () => {
      if (query.length > 1) {
        const searchResults = await weatherApi.searchLocations(query);
        setResults(searchResults);
        setShowResults(true);
      }
    }, 300);

    return () => clearTimeout(timer);
  }, [query]);

  const handleSelectLocation = (result: GeocodingResult) => {
    onLocationSelect(result.latitude, result.longitude, result.name);
    setQuery("");
    setShowResults(false);
  };

  return (
    <div className="search-container">
      <input
        type="text"
        placeholder="Search for a city..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="search-input"
      />
      {showResults && results.length > 0 && (
        <div className="search-results">
          {results.map((result, idx) => (
            <div
              key={idx}
              className="search-result-item"
              onClick={() => handleSelectLocation(result)}
            >
              <strong>{result.name}</strong>
              <span>{result.admin1 || ""} {result.country}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};