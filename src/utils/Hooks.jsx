import { useState } from "react";

export const useDownload = (timeout = 3000) => {
    const [isDownloading, setIsDownloading] = useState(false);

    const handleDownload = () => {
        if (!isDownloading) {
            setIsDownloading(true);
            setTimeout(() => setIsDownloading(false), timeout);
        }
    };

    // Anchor component that uses the hook internally
    const DownloadAnchor = ({ href, children, ...props }) => (
        <a href={href} onClick={handleDownload} {...props}>
            {children}
        </a>
    );

    return {
        isDownloading,
        handleDownload,
        DownloadAnchor,
    };
};
