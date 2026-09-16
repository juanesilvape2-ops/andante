import { Outlet, useLocation } from "react-router";

import { Footer } from "@/components/footer/Footer";
import { SiteNav } from "@/components/site-nav/SiteNav";

export function Layout() {
  const { pathname } = useLocation();
  const isContactPage = pathname === "/contacto";

  return (
    <>
      <SiteNav />
      <Outlet />
      {isContactPage ? null : <Footer />}
    </>
  );
}
