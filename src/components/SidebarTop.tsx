import React, { ReactNode } from 'react'

type SidebarTopProp = {
    children: React.ReactNode
}
export default function SidebarTop({children}: SidebarTopProp) {
  return <div className="sidebar__top">{children}</div>;
}
