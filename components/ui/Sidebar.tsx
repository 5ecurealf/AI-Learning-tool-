"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  BookIcon,
  ComponentIcon,
  RedoIcon,
  CheckIcon,
  TestTubeIcon,
  WebcamIcon,
} from "@/components/ui/icons"; // Adjust the import paths as necessary
import { useContext } from "react";

export function Sidebar() {
  const pathname = usePathname();

  const navItems = [
    {
      href: "/",
      icon: <ComponentIcon className="w-5 h-5 mr-2" />,
      label: "Material",
    },
    {
      href: "/revise",
      icon: <RedoIcon className="w-5 h-5 mr-2" />,
      label: "Revise",
    },
    {
      href: "/chat",
      icon: <WebcamIcon className="w-5 h-5 mr-2" />,
      label: "Chat",
    },
    {
      href: "/test",
      icon: <TestTubeIcon className="w-5 h-5 mr-2" />,
      label: "Test",
    },
    {
      href: "/test/results",
      icon: <CheckIcon className="w-5 h-5 mr-2" />,
      label: "Results",
    },
  ];

  return (
    <aside className="w-64 p-4 bg-gray-100">
      <h2 className="mb-8 text-2xl font-bold flex items-center">
        <BookIcon className="w-6 h-6 mr-2" />
        Learn
      </h2>
      <nav className="space-y-4">
        {navItems.map((item) => (
          <Link key={item.href} href={item.href} passHref>
            <Button
              as="a"
              variant="ghost"
              className={`flex items-center w-full text-left ${
                pathname === item.href ? "bg-gray-200" : ""
              }`}
            >
              {item.icon}
              {item.label}
            </Button>
          </Link>
        ))}
      </nav>
    </aside>
  );
}
