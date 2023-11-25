export function filteredData(searchText, allTaskData) {
  return allTaskData.filter((task) =>
    task.name.toLowerCase().includes(searchText.toLowerCase())
  );
}

export function formatTime(date) {
  return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
};

export function formatDate(date) {
  const today = new Date();
  const selected = new Date(date);

  if (selected.toDateString() === today.toDateString()) {
    return "Today";
  } else {
    return selected.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  }
};