"use client";

import { Plus, ArrowRight, Search } from "lucide-react";
import { Button } from "@/components/ui/button";

export function ButtonVariants() {
  return <div className="flex flex-wrap items-center gap-3">{<Button variant="brand">Brand</Button>}{<Button variant="primary">Primary</Button>}{<Button variant="secondary">Secondary</Button>}{<Button variant="ghost">Ghost</Button>}{<Button variant="danger">Danger</Button>}{<Button variant="danger-soft">Danger Soft</Button>}</div>;
}
export function ButtonSizes() {
  return <div className="flex flex-wrap items-center gap-3">{<Button size="xsm">Extra Small</Button>}{<Button size="sm">Small</Button>}{<Button size="md">Medium</Button>}{<Button size="lg">Large</Button>}</div>;
}
export function ButtonWithIcons() {
  return <div className="flex flex-wrap items-center gap-3">{<Button leftIcon={Plus}>Create</Button>}{<Button rightIcon={ArrowRight}>Continue</Button>}{<Button leftIcon={Search} variant="secondary">Search</Button>}{<Button leftIcon={Plus} rightIcon={ArrowRight} variant="brand">Add Item</Button>}</div>;
}
export function ButtonLoading() {
  return <div className="flex flex-wrap items-center gap-3">{<Button>Default</Button>}{<Button loading>Loading</Button>}{<Button disabled>Disabled</Button>}</div>;
}
export function ButtonGlass() {
  return <div className="flex flex-col gap-4 rounded-xl bg-gradient-to-r from-purple-500/30 to-pink-500/30 p-6">{<div className="flex flex-wrap items-center gap-3">{<Button variant="brand" glass>Brand</Button>}{<Button variant="primary" glass>Primary</Button>}{<Button variant="secondary" glass>Secondary</Button>}{<Button variant="ghost" glass>Ghost</Button>}</div>}{<div className="flex flex-wrap items-center gap-3">{<Button variant="primary" glass loading>Loading</Button>}{<Button variant="primary" glass disabled>Disabled</Button>}{<Button variant="secondary" glass disabled>Disabled</Button>}</div>}</div>;
}