import { saveAs } from "file-saver";

export const exportTable = () => {
  const rows = document.querySelectorAll("table tr");
  let csv = [];
  for (const row of rows) {
    const cells = row.querySelectorAll("td, th");
    const rowText = Array.from(cells).map((cell) => cell.innerText);
    csv.push(rowText.join(","));
  }
  const csvFile = new Blob([csv.join("\n")], {
    type: "text/csv;charset=utf-8;",
  });
  saveAs(csvFile, "data.csv");
};
