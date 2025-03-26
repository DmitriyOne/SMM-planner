import { Menu } from "@/05_entities/navigation/ui"
import { Logo } from "@/06_shared/ui"

export const Header = () => {
  return (
    <nav style={{ padding: "20px 20px 0 20px" }}>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Logo />
        <Menu />
      </div>
    </nav>
  )
}
