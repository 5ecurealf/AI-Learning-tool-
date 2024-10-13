"use client";

import React, { createContext, useContext, useState } from "react";

interface FileContextType {
  fileId: string | null;
  setFileId: (id: string) => void; // Corrected here
}

const FileContext = createContext<FileContextType | undefined>(undefined);

export function FileProvider({ children }: { children: React.ReactNode }) {
  const [fileId, setFileId] = useState<string | null>(null);

  return (
    <FileContext.Provider value={{ fileId, setFileId }}>
      {children}
    </FileContext.Provider>
  );
}

export function useFileId() {
  const context = useContext(FileContext);
  if (context === undefined) {
    throw new Error("useFileId must be used within a FileProvider"); // Corrected error message
  }
  return context;
}
