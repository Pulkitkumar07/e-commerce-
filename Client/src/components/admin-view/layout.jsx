import { Outlet } from "react-router-dom";
import Header from "./header.jsx";
import Sidebar from "./sidebar.jsx";
import { useState } from "react";

const AdminLayout = () => {
  const [open, setOpen] = useState(false);

  return (
    <div className="flex h-screen w-full">
      {/* Sidebar */}
      <Sidebar open={open} setOpen={setOpen} />

      {/* Main content */}
      <div className="flex flex-1 flex-col">
        {/* Header */}
        <Header setOpen={setOpen} />

        <main className="flex-1  bg-muted/40 p-4 md:p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
