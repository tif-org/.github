// app/components/FileCard/index.jsx
import Link from "next/link";
import { MacOSFileIcon, MacOSFolderIcon } from "../Icon";

const FileCard = ({ item, handleClick }) => {
  return (
    <div className="flex flex-col items-center">
      {item.type === "dir" ? (
        <div
          className="flex flex-col items-center cursor-pointer hover:text-cyan-600 w-28"
          onClick={() => handleClick(item.path)}
        >
          <MacOSFolderIcon />
          <span className="w-full text-center line-clamp-2">
            {item.name}
          </span>
        </div>
      ) : (
        <Link
          href={item.download_url}
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-col items-center cursor-pointer hover:text-cyan-600 w-28 max-h-28"
        >
          <div className="h-[70px] overflow-hidden">
            {item.name.endsWith(".png") ||
            item.name.endsWith(".jpg") ||
            item.name.endsWith(".jpeg") ? (
              <img
                src={item.download_url}
                alt={item.name}
                className="object-cover w-full mb-2"
              />
            ) : (
              // <img
              //   src="https://via.placeholder.com/150" // Gambar dummy
              //   alt="Dummy"
              //   className="object-cover w-full mb-2"
              // />
              <MacOSFileIcon />
            )}
          </div>
          <span className="w-full text-center bg-transparent line-clamp-2">{item.name}</span>
        </Link>
      )}
    </div>
  );
};

export default FileCard;
