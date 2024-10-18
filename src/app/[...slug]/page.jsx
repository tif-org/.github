"use client";

import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import FileCard from "@/components/FIleCard";

export default function FolderView() {
  const [contents, setContents] = useState([]);
  const [loading, setLoading] = useState(true); // State untuk loading
  const router = useRouter();
  const pathname = usePathname();
  const slug = pathname.replace(/^\//, '');

  useEffect(() => {
    if (!slug) return;

    const fetchRepoContents = async () => {
      setLoading(true); // Set loading menjadi true saat mengambil data
      try {
        const res = await fetch(`/api/repo?path=${slug}`, {
          cache: "force-cache",
          next: { revalidate: 3600 }
        });
        const data = await res.json();

        if (Array.isArray(data)) {
          setContents(data);
        } else {
          console.error('Data bukan array:', data);
          setContents([]);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
        setContents([]);
      } finally {
        setLoading(false); // Set loading menjadi false setelah data diambil
      }
    };

    fetchRepoContents();
  }, [slug]);

  const handleClick = (folderPath) => {
    router.push(`/${folderPath}`);
  };

  const renderContents = (items) => {
    if (!Array.isArray(items) || items.length === 0) {
      return <p>Folder kosong atau tidak ditemukan.</p>;
    }

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
      <h1 className="mb-4 text-3xl font-bold">{slug}</h1>
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
