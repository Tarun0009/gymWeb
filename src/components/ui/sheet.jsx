import * as React from "react";
import { cn } from "../lib/utils";

const Sheet = ({ open, onClose, children }) => {
  return (
    <>
      {/* Overlay */}
      {open && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={onClose}
        />
      )}
      {open && (
        <div className="fixed top-0 right-0 w-80 h-full bg-white shadow-xl z-50">
          {children}
        </div>
      )}
    </>
  );
};

const SheetTrigger = ({ asChild, children, ...props }) => {
  return React.cloneElement(children, {
    ...props,
    onClick: (e) => {
      if (props.onClick) props.onClick(e);
    },
  });
};

const SheetContent = ({ className, children, ...props }) => {
  return (
    <div className={cn("p-6", className)} {...props}>
      {children}
    </div>
  );
};

const SheetHeader = ({ className, ...props }) => (
  <div className={cn("mb-4", className)} {...props} />
);

const SheetTitle = ({ className, ...props }) => (
  <h2
    className={cn("text-lg font-semibold leading-none tracking-tight", className)}
    {...props}
  />
);

const SheetDescription = ({ className, ...props }) => (
  <p className={cn("text-sm text-gray-500", className)} {...props} />
);

Sheet.displayName = "Sheet";
SheetTrigger.displayName = "SheetTrigger";
SheetContent.displayName = "SheetContent";
SheetHeader.displayName = "SheetHeader";
SheetTitle.displayName = "SheetTitle";
SheetDescription.displayName = "SheetDescription";

export {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
};
