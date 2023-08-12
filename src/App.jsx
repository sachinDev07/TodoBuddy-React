import { useState } from "react";
import { BgOverlayContext } from "./BgOverlayContext";

import Todo from "./components/Todo";
import Header from "./components/Header";
import Toast from "./components/Toast";

function App() {
  const [overlay, setOverlay] = useState(false);

  return (
    <BgOverlayContext.Provider value={{ setOverlay }}>
      <Header />
      <Todo />
      {overlay ? (
        <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-70 z-30 transition-colors duration-150 ease-in-out"></div>
      ) : null}
      <Toast />
    </BgOverlayContext.Provider>
  );
}

export default App;
