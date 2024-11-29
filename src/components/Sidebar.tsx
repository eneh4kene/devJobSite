import React from "react";

type SidebarProp = {
  children: React.ReactNode
}
export default function Sidebar({children}: SidebarProp) {
  return (
    <div className="sidebar">
      {children}
    </div>
  );
}
