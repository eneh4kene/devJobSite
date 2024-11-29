type HeaderProp = {
  children: React.ReactNode
}

export default function Header({children}: HeaderProp) {
  return (
    <header className="header">
        {children}
    </header>
  );
}
