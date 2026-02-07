import React from "react";
import {
  ChartNoAxesCombined,
  LayoutDashboard,
  ShoppingCart,
  Package,
  Star,
  X,
} from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";

const Sidebar = ({ open, setOpen }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const menuItems = [
    { label: "Dashboard", icon: LayoutDashboard, path: "/admin/dashboard" },
    { label: "Orders", icon: ShoppingCart, path: "/admin/orders" },
    { label: "Products", icon: Package, path: "/admin/products" },
    { label: "Features", icon: Star, path: "/admin/features" },
  ];

  return (
    <>
      
      {open && (
        <div
          onClick={() => setOpen(false)}
          className="fixed inset-0 z-40 bg-black/40 lg:hidden"
        />
      )}

      <aside
        className={`fixed z-50 flex h-full w-64 flex-col border-r bg-background p-6 transform duration-300 transition-transform
          ${open ? "translate-x-0" : "-translate-x-full"} 
          lg:translate-x-0 lg:static lg:flex`}
      >
  
        <div className="mb-10 flex items-center justify-between">
          <div
            onClick={() => navigate("/admin/dashboard")}
            className="flex cursor-pointer items-center gap-2"
          >
            <ChartNoAxesCombined size={22} />
            <span className="text-lg font-bold tracking-wide">Admin Panel</span>
          </div>

        
          <X
            onClick={() => setOpen(false)}
            size={18}
            className="cursor-pointer lg:hidden text-muted-foreground hover:text-foreground"
          />
        </div>

     
        <nav className="flex flex-col gap-1">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;

            return (
              <div
                key={item.path}
                onClick={() => {
                  navigate(item.path);
                  setOpen(false);
                }}
                className={`relative flex cursor-pointer items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-all
                  ${isActive
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:bg-muted hover:text-foreground"
                  }`}
              >
                {isActive && (
                  <span className="absolute left-0 top-1/2 h-5 w-1 -translate-y-1/2 rounded-r bg-primary-foreground" />
                )}
                <Icon size={18} />
                <span>{item.label}</span>
              </div>
            );
          })}
        </nav>
      </aside>
    </>
  );
};

export default Sidebar;
