import { createBrowserRouter } from "react-router";

// Customer Pages
import { Home } from "./pages/customer/Home";
import { Movies } from "./pages/customer/Movies";
import { MovieDetail } from "./pages/customer/MovieDetail";
import { Booking } from "./pages/customer/Booking";
import { SeatSelection } from "./pages/customer/SeatSelection";
import { Payment } from "./pages/customer/Payment";
import { Login } from "./pages/customer/Login";
import { Theaters } from "./pages/customer/Theaters";

// Admin Pages
import { Dashboard } from "./pages/admin/Dashboard";
import { MovieManager } from "./pages/admin/MovieManager";
import { ScheduleManager } from "./pages/admin/ScheduleManager";
import { TransactionList } from "./pages/admin/TransactionList";

export const router = createBrowserRouter([
  // Customer Routes
  {
    path: "/",
    Component: Home,
  },
  {
    path: "/movies",
    Component: Movies,
  },
  {
    path: "/movie/:id",
    Component: MovieDetail,
  },
  {
    path: "/booking/:movieId",
    Component: Booking,
  },
  {
    path: "/seat-selection/:showtimeId",
    Component: SeatSelection,
  },
  {
    path: "/payment",
    Component: Payment,
  },
  {
    path: "/login",
    Component: Login,
  },
  {
    path: "/theaters",
    Component: Theaters,
  },
  
  // Admin Routes
  {
    path: "/admin",
    Component: Dashboard,
  },
  {
    path: "/admin/movies",
    Component: MovieManager,
  },
  {
    path: "/admin/schedules",
    Component: ScheduleManager,
  },
  {
    path: "/admin/transactions",
    Component: TransactionList,
  },
  {
    path: "/admin/theaters",
    Component: Dashboard, // Placeholder
  },
  {
    path: "/admin/statistics",
    Component: Dashboard, // Placeholder
  },
]);