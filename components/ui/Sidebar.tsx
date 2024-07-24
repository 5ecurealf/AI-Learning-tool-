"use client";

import { Button } from "@/components/ui/button";
import {
  BookIcon,
  ComponentIcon,
  RedoIcon,
  CheckIcon,
  TestTubeIcon,
  WebcamIcon,
} from "@/components/ui/icons"; // Adjust the import paths as necessary

export function Sidebar() {
  return (
    <aside className="w-64 p-4 bg-gray-100">
      <h2 className="mb-8 text-2xl font-bold flex items-center">
        <BookIcon className="w-6 h-6 mr-2" />
        Learn
      </h2>
      <nav className="space-y-4">
        <Button variant="ghost" className="flex items-center w-full text-left">
          <ComponentIcon className="w-5 h-5 mr-2" />
          Material
        </Button>
        <Button variant="ghost" className="flex items-center w-full text-left">
          <RedoIcon className="w-5 h-5 mr-2" />
          Revise
        </Button>
        <Button variant="ghost" className="flex items-center w-full text-left">
          <CheckIcon className="w-5 h-5 mr-2" />
          Results
        </Button>
        <Button variant="ghost" className="flex items-center w-full text-left">
          <TestTubeIcon className="w-5 h-5 mr-2" />
          Test
        </Button>
        <Button variant="ghost" className="flex items-center w-full text-left">
          <WebcamIcon className="w-5 h-5 mr-2" />
          Chat
        </Button>
      </nav>
    </aside>
  );
}
