"use client";

import { useState } from "react";
import { SelectDatePicker } from "@/components/ui/select-date-picker";

export function SelectDatePickerDefault() {
  return (
    <div className="flex flex-wrap gap-6 items-start">
      <SelectDatePicker />
    </div>
  );
}

export function SelectDatePickerFocused() {
  return (
    <div className="flex flex-wrap gap-6 items-start">
      <SelectDatePicker focused />
    </div>
  );
}

export function SelectDatePickerWithHelper() {
  return (
    <div className="flex flex-wrap gap-6 items-start">
      <SelectDatePicker
        showHelperText
        helperText="your action will be available during 7 days"
      />
    </div>
  );
}

export function SelectDatePickerInteractive() {
  const [focused, setFocused] = useState(false);
  return (
    <div className="flex flex-wrap gap-6 items-start">
      <SelectDatePicker
        focused={focused}
        onClick={() => setFocused(!focused)}
        startDate="nov 12, 2025"
        startTime="5:30PM"
        endDate="nov 17, 2025"
      />
    </div>
  );
}
