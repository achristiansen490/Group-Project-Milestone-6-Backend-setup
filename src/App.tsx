import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import ProfileSelection from "./pages/ProfileSelection";
import ParentDashboard from "./pages/ParentDashboard";
import ChildDashboard from "./pages/ChildDashboard";
import GoalsPage from "./pages/GoalsPage";
import RewardsPage from "./pages/RewardsPage";
import ActivitiesPage from "./pages/ActivitiesPage";
import ParentGoalsPage from "./pages/ParentGoalsPage";
import ParentRewardsPage from "./pages/ParentRewardsPage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/profiles" element={<ProfileSelection />} />
          <Route path="/parent" element={<ParentDashboard />} />
          <Route path="/child" element={<ChildDashboard />} />
          <Route path="/goals" element={<GoalsPage />} />
          <Route path="/rewards" element={<RewardsPage />} />
          <Route path="/parent/goals" element={<ParentGoalsPage />} />
          <Route path="/parent/rewards" element={<ParentRewardsPage />} />
          <Route path="/activities" element={<ActivitiesPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
