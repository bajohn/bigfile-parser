import type { Route } from "./+types/home";
import { useEffect, useState } from "react";
import Uploader from "./Uploader";
import { BigTable } from "~/components/BigTable";
import ScrollableDiv from "~/components/ScrollableDiv";
import { splitOnLineBreak } from "../utils/helpers.ts";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "New React Router App" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

export default function Home() {
  const [file, setFile] = useState<File | null>(null);
  const [headers, setHeaders] = useState<string[]>([]);
  const [scrollPosition, setScrollPosition] = useState(0);

  const headerFinder = async (file: File) => {
    const headText = await file.slice(0, 1000).text();

    const headerRow = splitOnLineBreak(headText)[0];
    setHeaders(headerRow.replaceAll('"', "").split(","));
    console.log({ headerRow });
  };

  const onUpload = (file: File) => {
    setFile(file);
    headerFinder(file);
  };
  console.log({ headers });
  const onScrollChange = async (scrollPosition: number) => {
    setScrollPosition(scrollPosition);
  };

  const readFunc = async (
    reader: ReadableStreamDefaultReader<Uint8Array<ArrayBufferLike>>
  ) => {
    let text = "";
    while (true) {
      const { done, value } = await reader.read();
      if (done) {
        console.log("Stream complete");
        break;
      }
      text += new TextDecoder().decode(value);
      console.log("chunk", text);
    }
  };
  const printer = async (promIn: any) => {
    const resp = await promIn.text();
    console.log({ resp });
    return true;
  };

  let fileSlice: Blob = new Blob();
  if (file) {
    const offset = Math.floor((scrollPosition / 20000) * file.size);
    fileSlice = file.slice(offset, offset + 1000);
    printer(fileSlice);
    //const stream = fileSlice.text();
    //const reader = stream.getReader();
    //readFunc(reader);
  }

  return (
    <div>
      <h1>Hello world</h1>
      {file ? (
        <p>File: {file.name}</p>
      ) : (
        <p>Drag and drop a file here, or click to select a file</p>
      )}
      <Uploader onUpload={onUpload}></Uploader>
      <p>Scroll Position: {scrollPosition / 20000}</p>
      <ScrollableDiv onScrollChange={onScrollChange}>
        <BigTable fileSlice={fileSlice} headers={headers}></BigTable>
      </ScrollableDiv>
    </div>
  );
}
