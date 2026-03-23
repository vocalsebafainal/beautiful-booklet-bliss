import {
  LayoutDashboard,
  ShoppingCart,
  Users,
  Mic,
  LogOut,
  ShieldCheck,
  Settings,
} from "lucide-react";
import { NavLink } from "@/components/NavLink";
import { useLocation } from "react-router-dom";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarFooter,
  SidebarHeader,
  useSidebar,
} from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import logo from "@/assets/logo.jfif";

const menuItems = [
  { title: "ড্যাশবোর্ড", url: "/admin", icon: LayoutDashboard },
  { title: "অর্ডার", url: "/admin/orders", icon: ShoppingCart },
  { title: "ক্লায়েন্ট", url: "/admin/clients", icon: Users },
  { title: "আর্টিস্ট", url: "/admin/artists", icon: Mic },
  { title: "অ্যাডমিন ইউজারস", url: "/admin/users", icon: ShieldCheck },
  { title: "সেটিংস", url: "/admin/settings", icon: Settings },
];

interface AdminSidebarProps {
  onSignOut: () => void;
}

export function AdminSidebar({ onSignOut }: AdminSidebarProps) {
  const { state } = useSidebar();
  const collapsed = state === "collapsed";
  const location = useLocation();

  const isActive = (path: string) => {
    if (path === "/admin") return location.pathname === "/admin";
    return location.pathname.startsWith(path);
  };

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader className="border-b border-sidebar-border p-4">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg overflow-hidden border border-sidebar-border shrink-0">
            <img src={logo} alt="Vocalseba" className="w-full h-full object-cover" />
          </div>
          {!collapsed && (
            <div>
              <h2 className="text-sm font-bold text-sidebar-foreground">Vocalseba</h2>
              <p className="text-[10px] text-sidebar-foreground/60">Admin Panel</p>
            </div>
          )}
        </div>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>মেনু</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.url}>
                  <SidebarMenuButton asChild isActive={isActive(item.url)}>
                    <NavLink
                      to={item.url}
                      end={item.url === "/admin"}
                      className="hover:bg-sidebar-accent/50"
                      activeClassName="bg-sidebar-accent text-sidebar-accent-foreground font-medium"
                    >
                      <item.icon className="h-4 w-4" />
                      {!collapsed && <span>{item.title}</span>}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="border-t border-sidebar-border p-2">
        <Button
          variant="ghost"
          size={collapsed ? "icon" : "default"}
          onClick={onSignOut}
          className="w-full justify-start text-destructive hover:text-destructive hover:bg-destructive/10"
        >
          <LogOut className="h-4 w-4" />
          {!collapsed && <span className="ml-2">লগআউট</span>}
        </Button>
      </SidebarFooter>
    </Sidebar>
  );
}
