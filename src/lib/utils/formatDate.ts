export default function (date: Date) {
  // format the date so its like:
  // "Sep. 8 2024"
  // "Jan. 28 2022"
  const month = date.toLocaleString("default", { month: "short" });
  const day = date.getDate();
  const year = date.getFullYear();
  return `${month}. ${day} ${year}`;
}
