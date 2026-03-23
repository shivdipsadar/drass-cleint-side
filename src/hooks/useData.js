import { useEffect, useState } from "react";
import { DATA_URL } from "../utils/api";

export default function useData() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // ✅ Check cache first
        const cached = localStorage.getItem("site-data");

        if (cached) {
          setData(JSON.parse(cached));
          setLoading(false);
        }

        // ✅ Fetch latest data
        const res = await fetch(DATA_URL);
        const freshData = await res.json();

        setData(freshData);
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