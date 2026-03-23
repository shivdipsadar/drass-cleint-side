// src/utils/api.js

// For now (local project)
export const DATA_URL = "/data.json";

// Image helper
export const getImageUrl = (path) => {
  if (!path) return "";

  // If already full URL
  if (path.startsWith("http")) return path;

  // Otherwise use public folder path
  return path;
};