import { useCallback, useState } from "react";
import { ClassicCatPage } from "./ClassicCatPage";
import { SuspendedCatPage } from "./SuspendedCatPage";

export default function App() {
  const [selectedTab, setSelectedTab] = useState(0);

  const selectTab0 = useCallback(() => setSelectedTab(0));
  const selectTab1 = useCallback(() => setSelectedTab(1));

  return (
    <>
      <h1>Cats</h1>
      <button onClick={selectTab0}>Classic Cats</button>
      <button onClick={selectTab1}>Suspended Cats</button>
      {selectedTab === 0 && <ClassicCatPage />}
      {selectedTab === 1 && <SuspendedCatPage />}
    </>
  );
}
