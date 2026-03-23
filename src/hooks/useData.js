import { useEffect, useState } from "react";
import { DATA_URL } from "../utils/api";

export default function useData() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // ✅ Load cache
        const cached = localStorage.getItem("site-data");

        if (cached) {
          setData(JSON.parse(cached));
        }

        // 🔥 Always fetch latest (no cache issue)
        const res = await fetch(`${DATA_URL}?t=${Date.now()}`);
        const freshData = await res.json();

        setData(freshData);

        // save cache
        localStorage.setItem("site-data", JSON.stringify(freshData));

      } catch (error) {
        console.error("❌ Data fetch error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return { data, loading };
}