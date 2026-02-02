import Logo from "../Logo/Logo";
import NavbarCTA from "./NavbarCTA";
import NavbarLinks from "./NavbarLinks";
import ThemeToggle from "../Theme/ThemeToggle";

export default function Navbar() {
  return (
    <div className="sticky top-0 z-50 bg-white dark:bg-neutral-900 border-b border-neutral-200 dark:border-neutral-800">
      <div className="flex flex-row justify-center items-center w-full py-4">
        <div className="max-w-[1500px] w-full">
          <nav className="grid grid-cols-2 sm:grid-cols-3 px-6 w-full">
            <div className="flex flex-row justify-start items-center">
              <Logo size="h-7 w-7" withText />
            </div>
            <div className="hidden sm:flex flex-row justify-center">
              <NavbarLinks />
            </div>
            <div className="flex flex-row justify-end items-center gap-3">
              <ThemeToggle />
              <NavbarCTA />
            </div>
          </nav>
        </div>
      </div>
    </div>
  );
}
