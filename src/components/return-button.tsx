import React from "react";
import { Button } from "./ui/button";
import Link from "next/link";

interface ReturnButtonProps {
  label: string;
  href: string;
}

const ReturnButton = ({ label, href }: ReturnButtonProps) => {
  return (
    <Button asChild>
      <Link href={href}>{label}</Link>
    </Button>
  );
};

export default ReturnButton;
