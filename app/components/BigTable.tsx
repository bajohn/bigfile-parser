import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import { useState } from "react";
import { splitOnLineBreak } from "~/utils/helpers";

export function BigTable(props: { fileSlice: Blob; headers: string[] }) {
  const [rawText, setRawText] = useState<string>("");

  const sliceParser = async (fileSlice: Blob) => {
    setRawText(await fileSlice.text());
  };

  sliceParser(props.fileSlice);

  const textSplit = splitOnLineBreak(rawText);
  // TODO - header could repeat here
  const dataRows = textSplit.reduce<string[][]>((lv, cv) => {
    const lineSplit = cv.replaceAll('"', "").split(",");
    if (lineSplit.length === props.headers.length) {
      lv.push(lineSplit);
    }
    return lv;
  }, []);



  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            {props.headers.map((header) => (
              <TableCell>{header}</TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
            {dataRows.map((row) => (
              <TableRow>
                {row.map((cell) => (
                  <TableCell>{cell}</TableCell>
                ))}
              </TableRow>
            ))};
          
        </TableBody>
      </Table>
    </TableContainer>
  );
}
