import {
  BarChart2,
  Calendar,
  Home,
  MessageSquare,
  PlusCircle,
  Store,
  type LucideIcon,
} from "lucide-react";

export interface DashboardNavItem {
  name: string;
  href: string;
  icon: LucideIcon;
}

export const dashboardNavItems: DashboardNavItem[] = [
  { name: "Home", icon: Home, href: "/" },
  { name: "Create Events", icon: PlusCircle, href: "/create-event" },
  { name: "Manage Events", icon: Calendar, href: "/manage-events" },
  { name: "Artist Request", icon: MessageSquare, href: "/artist-request" },
  { name: "Stalls", icon: Store, href: "/stalls" },
  { name: "Analytics", icon: BarChart2, href: "/analytics" },
];
