import * as React from "react";
import { cn } from "../lib/utils";

const DropdownMenu = ({ children, className, ...props }) => {
  return (
    <div className={cn("relative inline-block text-left", className)} {...props}>
      {children}
    </div>
  );
};

const DropdownMenuTrigger = ({ children, className, ...props }) => (
  <button
    className={cn(
      "inline-flex justify-center w-full rounded-md bg-gray-100 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-200",
      className
    )}
    {...props}
  >
    {children}
  </button>
);

const DropdownMenuContent = ({ children, className, ...props }) => (
  <div
    className={cn(
      "absolute mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none z-50",
      className
    )}
    {...props}
  >
    {children}
  </div>
);

const DropdownMenuItem = ({ children, className, ...props }) => (
  <div
    className={cn(
      "block px-4 py-2 text-sm text-gray-700 cursor-pointer hover:bg-gray-100",
      className
    )}
    {...props}
  >
    {children}
  </div>
);

DropdownMenu.displayName = "DropdownMenu";
DropdownMenuTrigger.displayName = "DropdownMenuTrigger";
DropdownMenuContent.displayName = "DropdownMenuContent";
DropdownMenuItem.displayName = "DropdownMenuItem";

export {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem
};
