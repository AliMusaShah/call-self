import dayjs from "dayjs";
import { useEffect, useState } from "react";

// utils/generateBreadcrumbs.js
export const pathNameToLabel = {
  "inspector-dashboard": "Inspector Dashboard",
  "admin-dashboard": " Dashboard",
  "owner-dashboard": " Dashboard",
  orders: "Manage Orders",
  Customers: "Customers",
  reports: "Reports",
  tasks: "Tasks",
  "market-place": "Manage Marketplace",
  certificates: "Manage Certificates",
  forms: "Manage Forms",
  "user-management": "User Management",
};

export function generateBreadcrumbs(pathname) {
  const pathSegments = pathname.split("/").filter(Boolean);

  const breadcrumbs = pathSegments.map((segment, index) => {
    const path = "/" + pathSegments.slice(0, index + 1).join("/");
    const label = pathNameToLabel[segment] || segment;

    return { label, path };
  });

  return breadcrumbs;
}
export const downloadPdf = async (url, id) => {
  try {
    // Fetch the file as a blob
    // const response = await fetch(url);
    const blob = url.blob();

    // Create a link element, set the href to a blob URL, and trigger download
    const downloadLink = document.createElement("a");
    downloadLink.href = URL.createObjectURL(blob);
    downloadLink.download = `inspection_report_${id}.pdf`; // Specify a download file name
    downloadLink.click();

    // Clean up the URL object after download
    URL.revokeObjectURL(downloadLink.href);
  } catch (error) {
    console.error("Error downloading file:", error);
  }
};

export const dateFormat = (date) => {
  return dayjs(date).format("DD/MM/YYYY");
};
export const formatDateForInput = (dateString) => {
  if (!dateString) return "";
  const date = new Date(dateString);
  return date.toISOString().split("T")[0]; // This gives us YYYY-MM-DD format
};
export const useDebounce = (value, delay) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
};
export const isImageUrl = (url) => {
  if (typeof url !== "string") return false;

  // Check if it's a valid URL
  try {
    new URL(url);
  } catch {
    return false;
  }

  // Check if it ends with common image extensions or contains image-related patterns
  const imageExtensions = /\.(jpg|jpeg|png|gif|bmp|webp|svg)(\?.*)?$/i;
  const s3ImagePattern =
    /s3.*\.(amazonaws\.com|digitaloceanspaces\.com).*\.(jpg|jpeg|png|gif|bmp|webp)/i;

  return imageExtensions.test(url) || s3ImagePattern.test(url);
};
