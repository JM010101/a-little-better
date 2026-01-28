import { Button } from "../ui/button";
import Link from "next/link";

export default function NavbarCTA() {
  return (
    <Link href="/contact">
      <Button>{`Let's Work Together`}</Button>
    </Link>
  );
}
