import { RouterProvider } from "react-router-dom";
import router from "./Router/index.tsx";
function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
