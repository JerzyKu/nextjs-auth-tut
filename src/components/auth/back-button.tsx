import Link from "next/link";
import { Button } from "../ui/button";

type Props = {
  label: string;
  href: string;
};

export function BackButton({ label, href }: Props) {
  return (
    <Button variant="link" className="font—normal w—full" size="sm" asChild>
      <Link className="mx-auto"   href={href}>{label}</Link>
    </Button>
  );
}
