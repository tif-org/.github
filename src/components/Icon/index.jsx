const MacOSFolderIcon = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="-4 0 80 70"  // Lebih lebar dari sebelumnya
      width="80"
      height="70"
      fill="none"
    >
      {/* Folder base */}
      <rect
        x="1"
        y="20"
        width="72"
        height="50"
        rx="8"
        ry="8"
        fill="#80C7FF"  // Light macOS-style blue for the base folder
        stroke="none"
      />
      {/* Folder top part */}
      <path
        d="M4 20 l10 -8 h22 l6 6 h30 v14 h-72 z"
        fill="#59A8FF"  // Slightly darker blue for the folder top
      />
    </svg>
  );
};

const MacOSFileIcon = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 45 70"
      width="45"
      height="70"
      fill="none"
    >
      {/* File base */}
      <rect
        x="1"
        y="12"
        width="45"
        height="60"
        rx="4"
        ry="4"
        fill="#F2F2F2"  // Light gray for the file base
        stroke="none"
      />
      {/* File folded corner */}
      <polygon
        points="32,12 48,12 48,28 32,12"
        fill="#E0E0E0"  // Slightly darker gray for the folded corner
      />
    </svg>
  );
};

export { MacOSFolderIcon, MacOSFileIcon };
