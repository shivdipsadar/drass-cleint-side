// src/utils/api.js

// 🔥 SWITCH (change to true after admin panel ready)
const USE_GITHUB = false;

// 🔥 CHANGE THIS (your repo link)
const GITHUB_BASE =
  "https://raw.githubusercontent.com/shivdipsadar/drass-cleint-side/main";

// Data file
export const DATA_URL = USE_GITHUB
  ? `${GITHUB_BASE}/data.json`
  : "/data.json";

// 🔥 IMAGE HELPER
export const getImageUrl = (path) => {
  if (!path) return "";

  // already full URL
  if (path.startsWith("http")) return path;

  // GitHub mode
  if (USE_GITHUB) {
    return `${GITHUB_BASE}${path}`;
  }

  // local mode
  return path;
};