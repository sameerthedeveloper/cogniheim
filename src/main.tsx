import { StrictMode, Suspense, lazy } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./index.css";
import App from "./App.tsx";
import { ContentProvider } from "./content/ContentContext";

const AdminApp = lazy(() => import("./admin/AdminApp").then((m) => ({ default: m.AdminApp })));

const LogoLoader = () => (
  <div className="flex min-h-screen flex-col items-center justify-center bg-[#050505]">
    <img src="/logo.png" alt="Cogniheim" className="h-10 w-auto object-contain animate-pulse" />
    <div className="mt-5 h-[2px] w-12 overflow-hidden rounded-full bg-white/10">
      <div className="h-full w-full bg-[#39b9b0] animate-pulse" />
    </div>
  </div>
);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ContentProvider>
      <BrowserRouter>
        <Routes>
          <Route
            path="/admin"
            element={
              <Suspense fallback={<LogoLoader />}>
                <AdminApp />
              </Suspense>
            }
          />
          <Route path="/*" element={<App />} />
        </Routes>
      </BrowserRouter>
    </ContentProvider>
  </StrictMode>,
);
