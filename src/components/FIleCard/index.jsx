// app/components/FileCard/index.jsx
import Link from "next/link";

const FileCard = ({ item, handleClick }) => {
  return (
    <div className="flex flex-col items-center">
      {item.type === "dir" ? (
        <div
          className="flex flex-col items-center w-full h-full transition-all border rounded cursor-pointer hover:shadow"
          onClick={() => handleClick(item.path)}
        >
          <strong className="w-full p-2 text-left text-blue-500 line-clamp-1">
            📁 {item.name}
          </strong>
        </div>
      ) : (
        <Link
          href={item.download_url}
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-col items-center w-full h-full transition-all border rounded hover:shadow"
        >
          <div className="overflow-hidden h-14">
            {item.name.endsWith(".png") ||
            item.name.endsWith(".jpg") ||
            item.name.endsWith(".jpeg") ? (
              <img
                src={item.download_url}
                alt={item.name}
                className="object-cover w-full mb-2"
              />
            ) : (
              <img
                src="https://via.placeholder.com/150" // Gambar dummy
                alt="Dummy"
                className="object-cover w-full mb-2"
              />
            )}
          </div>
          <span className="w-full p-2 text-left line-clamp-1">
            📄 {item.name}
          </span>
        </Link>
      )}
    </div>
  );
};

export default FileCard;
