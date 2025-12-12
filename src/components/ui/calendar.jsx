"use client";

import * as React from "react";
import { DayPicker } from "react-day-picker";
import { cn } from "@/lib/utils";

import "react-day-picker/dist/style.css";

function Calendar({ className, classNames, showOutsideDays = true, ...props }) {
  return (
    <DayPicker
      showOutsideDays={showOutsideDays}
      className={cn("p-3", className)}
      classNames={{
        months: "flex flex-col sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0",
        month: "space-y-4",
        caption: "flex justify-center pt-1 relative items-center",
        caption_label: "text-sm font-medium",
        nav: "space-x-1 flex items-center",
        nav_button:
          "h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100 transition",
        nav_button_previous: "absolute left-1",
        nav_button_next: "absolute right-1",
        table: "w-full border-collapse space-y-1",
        head_row: "flex",
        head_cell:
          "text-gray-500 font-normal w-8 h-8 flex items-center justify-center text-[0.8rem]",
        row: "flex w-full mt-1",
        cell: "h-8 w-8 text-center text-sm p-0 relative focus-within:relative focus-within:z-20",
        day: cn(
          "h-8 w-8 p-0 font-normal aria-selected:opacity-100 rounded-md",
          "hover:bg-gray-200"
        ),
        day_selected:
          "bg-black text-white hover:bg-black hover:text-white rounded-md",
        day_today: "bg-gray-100 rounded-md",
        day_outside:
          "text-gray-300 aria-selected:bg-gray-200 aria-selected:text-gray-500",
        day_disabled: "text-gray-300",
        ...classNames,
      }}
      {...props}
    />
  );
}

Calendar.displayName = "Calendar";

export { Calendar };
