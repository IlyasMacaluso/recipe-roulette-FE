import { useState } from "react";

export function useRecipesResultsSideBar() {
  const [filtersSidebar, setSideBarState] = useState(false);

  function setFiltersSidebar() {
    setSideBarState((prev) => !prev);
  }

  return {
    filtersSidebar,
    setFiltersSidebar,
  };
}
