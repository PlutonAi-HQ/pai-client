import { useState } from "react";

const useFileUpload = (uploadUrl: string) => {
  const [progress, setProgress] = useState<number>(0);
  const [isUploading, setIsUploading] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);

  const uploadFile = async (file: File) => {
    const formData = new FormData();
    formData.append("file", file);

    try {
      setIsUploading(true);
      setIsError(false);

      const response = await fetch(uploadUrl, {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error(`Upload failed: ${response.statusText}`);
      }

      // Simulate progress (if server doesn't provide it)
      setProgress(100);

      return await response.json();
    } catch (err) {
      setIsError(true);
      throw new Error(`Upload failed: ${err}`);
    } finally {
      setIsUploading(false);
    }
  };

  return { uploadFile, progress, isUploading, isError };
};

export default useFileUpload;
