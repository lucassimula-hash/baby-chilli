"use client";

import { useState } from "react";
import { NumberInput } from "@/components/ui/number-input";

export function NumberInputDefault() {
  const [value, setValue] = useState("");
  return (
    <div className="flex items-center justify-center py-4">
      <NumberInput value={value} onChange={setValue} />
    </div>
  );
}

export function NumberInputStates() {
  return (
    <div className="flex flex-col gap-8 items-center py-4">
      <div className="flex flex-col items-center gap-2">
        <p className="text-xs text-[var(--text-base-secondary)]">Default</p>
        <NumberInput value="" onChange={() => {}} />
      </div>
      <div className="flex flex-col items-center gap-2">
        <p className="text-xs text-[var(--text-base-secondary)]">Filled</p>
        <NumberInput value="333333" onChange={() => {}} />
      </div>
      <div className="flex flex-col items-center gap-2">
        <p className="text-xs text-[var(--text-base-secondary)]">Error</p>
        <NumberInput value="333333" error onChange={() => {}} />
      </div>
      <div className="flex flex-col items-center gap-2">
        <p className="text-xs text-[var(--text-base-secondary)]">Disabled</p>
        <NumberInput value="" disabled onChange={() => {}} />
      </div>
    </div>
  );
}

export function NumberInputLength() {
  const [val4, setVal4] = useState("");
  const [val6, setVal6] = useState("");
  return (
    <div className="flex flex-col gap-8 items-center py-4">
      <div className="flex flex-col items-center gap-2">
        <p className="text-xs text-[var(--text-base-secondary)]">4 digits</p>
        <NumberInput value={val4} onChange={setVal4} length={4} />
      </div>
      <div className="flex flex-col items-center gap-2">
        <p className="text-xs text-[var(--text-base-secondary)]">6 digits (default)</p>
        <NumberInput value={val6} onChange={setVal6} length={6} />
      </div>
    </div>
  );
}
