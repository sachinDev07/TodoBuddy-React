export function filteredData(searchText, allTaskData) {
  return allTaskData.filter((task) =>
    task.name.toLowerCase().includes(searchText.toLowerCase())
  );
}
