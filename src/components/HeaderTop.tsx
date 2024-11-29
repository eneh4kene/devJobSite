type HeaderTopProp = {
    children: React.ReactNode
}

export default function HeaderTop({children}: HeaderTopProp) {
  return <div className="header__top">{children}</div>;
}
