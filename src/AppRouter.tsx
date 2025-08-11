import { BrowserRouter, Route, Routes } from "react-router-dom";

// import AuthRoutes from "./features/Auth";
import { RootLayout } from "./components/layouts";
import NotAuthorized from "./features/NotAuthorized/NotAuthorized";
import MedicalInventoryManagement from "./features/categories/pages/CategoriesPage";

function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        {/* <Route path="/*" element={<AuthRoutes />} /> */}
        <Route path="/unauthorized" element={<NotAuthorized />} />
        <Route path="/" element={<MedicalInventoryManagement />} />
        <Route element={<RootLayout />}>
          <Route path="/" element={<div>Home</div>} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default AppRouter;
