import React from "react";

type ContainerProp = {
  children: React.ReactNode
}

export default function Container({ children }: ContainerProp) {
  return <div className="container"> { children } </div>;
}
