import React, { useState, useCallback } from "react";
import { BigTable } from "~/components/BigTable";

export default function Uploader(props: { onUpload: (file: File) => void }) {
  const handleDrop = useCallback((event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    const droppedFile = event.dataTransfer.files[0];
    if (droppedFile) {
      props.onUpload(droppedFile);
    }
  }, []);

  const handleDragOver = useCallback(
    (event: React.DragEvent<HTMLDivElement>) => {
      event.preventDefault();
    },
    []
  );

  return (
    <div
      onDrop={handleDrop}
      onDragOver={handleDragOver}
      style={{
        border: "2px dashed #ccc",
        padding: "20px",
        textAlign: "center",
      }}
    ></div>
  );
}
