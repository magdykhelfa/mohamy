import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { MainLayout } from "./components/layout/MainLayout";
import Dashboard from "./pages/Dashboard";
import Clients from "./pages/Clients";
import Cases from "./pages/Cases";
import Sessions from "./pages/Sessions";
import Finance from "./pages/Finance";
import Documents from "./pages/Documents";
import Alerts from "./pages/Alerts";
import Users from "./pages/Users";
import Reports from "./pages/Reports";
import Settings from "./pages/Settings";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MainLayout><Dashboard /></MainLayout>} />
          <Route path="/clients" element={<MainLayout><Clients /></MainLayout>} />
          <Route path="/cases" element={<MainLayout><Cases /></MainLayout>} />
          <Route path="/sessions" element={<MainLayout><Sessions /></MainLayout>} />
          <Route path="/finance" element={<MainLayout><Finance /></MainLayout>} />
          <Route path="/documents" element={<MainLayout><Documents /></MainLayout>} />
          <Route path="/alerts" element={<MainLayout><Alerts /></MainLayout>} />
          <Route path="/users" element={<MainLayout><Users /></MainLayout>} />
          <Route path="/reports" element={<MainLayout><Reports /></MainLayout>} />
          <Route path="/settings" element={<MainLayout><Settings /></MainLayout>} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
