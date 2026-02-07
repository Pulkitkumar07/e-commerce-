import {Menu,LogOut} from "lucide-react";
import {Button} from "@/components/ui/button";

const Header = ({setOpen}) => {
  return <header className="flex items-center justify-between px-4 py-3 bg-background border-b">
    <Button  className="lg:hidden sm:block" onClick={() => setOpen(true)}>
      <Menu />
      <span className="sr-only">Toggle Menu</span>
    </Button>
    <div className="flex flex-1 justify-end">
      <Button  className='inline-flex items-center gap-2 text-sm font-medium transition-colors hover:bg-destructive/10 focus:outline-none focus:ring-2 focus:ring-destructive focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-destructive/10'>
        <LogOut />
        Logout
      </Button>
    </div>

  </header>

}

export default Header;