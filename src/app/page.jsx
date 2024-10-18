"use client";

import FileCard from "@/components/FIleCard";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Home() {
  const [contents, setContents] = useState([]);
  const [loading, setLoading] = useState(true); // State untuk loading
  const router = useRouter();
  const GITHUB_TOKEN = process.env.NEXT_PUBLIC_GITHUB_TOKEN;

  useEffect(() => {
    const fetchRepoContents = async () => {
      setLoading(true); // Set loading menjadi true saat mengambil data
      try {
        const res = await fetch(`/api/repo?path=`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${GITHUB_TOKEN}`,
          },
          cache: "force-cache",
          next: { revalidate: 3600 },
        });

        if (!res.ok) {
          const errorData = await res.json();
          if (errorData.message.includes("rate limit exceeded")) {
            alert("Batas laju API tercapai. Silakan coba lagi nanti.");
            return;
          }
          throw new Error(errorData.message);
        }

        const data = await res.json();
        if (Array.isArray(data)) {
          setContents(data);
        } else {
          console.error("Data yang diterima bukan array:", data);
          setContents([]);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        setContents([]);
      } finally {
        setLoading(false); // Set loading menjadi false setelah data diambil
      }
    };

    fetchRepoContents();
  }, []);

  const handleClick = (folderPath) => {
    router.push(`/${folderPath}`);
  };

  const renderContents = (items) => {
    if (!Array.isArray(items) || items.length === 0) {
      return <p>Folder kosong atau tidak ditemukan.</p>;
    }

    // Pisahkan folder dan file
    const folders = items.filter(item => item.type === "dir");
    const files = items.filter(item => item.type !== "dir");
    const sortedItems = [...folders, ...files];

    return (
      <div className="grid grid-cols-2 gap-2">
        {sortedItems.map((item) => (
          <FileCard key={item.path} item={item} handleClick={handleClick} />
        ))}
      </div>
    );
  };

  return (
    <div className="container p-4">
      {/* <h1 className="mb-4 text-3xl font-bold"></h1> */}
      <div className="p-4 bg-white">
        {loading ? ( // Tampilkan loader jika loading
          <p>Memuat data...</p>
        ) : (
          renderContents(contents)
        )}
      </div>
    </div>
  );
}
