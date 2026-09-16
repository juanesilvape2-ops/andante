import { Route, Routes } from "react-router";

import { Layout } from "@/components/layout/Layout";
import { AboutPage } from "@/pages/AboutPage";
import { ContactPage } from "@/pages/ContactPage";
import { GalleryPage } from "@/pages/GalleryPage";
import { HomePage } from "@/pages/HomePage";

export function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route element={<HomePage />} index />
        <Route element={<GalleryPage />} path="galeria" />
        <Route element={<AboutPage />} path="sobre-mi" />
        <Route element={<ContactPage />} path="contacto" />
      </Route>
    </Routes>
  );
}
