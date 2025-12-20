import { ReactNode } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PageBreadcrumb from "@/components/PageBreadcrumb";

interface PageLayoutProps {
  children: ReactNode;
  showBreadcrumb?: boolean;
}

const PageLayout = ({ children, showBreadcrumb = false }: PageLayoutProps) => {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      <main className="flex-1">
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default PageLayout;