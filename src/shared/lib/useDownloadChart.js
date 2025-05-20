export function useDownloadChart(chartRef, chartData) {
  const downloadPNG = () => {
    if (!chartRef?.current) return;
    const url = chartRef.current.toBase64Image();
    const link = document.createElement("a");
    link.href = url;
    link.download = "chart.png";
    link.click();
  };

  const downloadCSV = () => {
    if (!chartData) return;

    const rows = [];
    const { labels, datasets } = chartData;

    rows.push(["Date", ...datasets.map((ds) => ds.label)]);

    labels.forEach((label, i) => {
      const row = [label];
      datasets.forEach((ds) => {
        row.push(ds.data[i] ?? "");
      });
      rows.push(row);
    });

    const csvContent = rows.map((r) => r.join(",")).join("\n");

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", "chart.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return { downloadPNG, downloadCSV };
}
