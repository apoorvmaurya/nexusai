"use client";

import Link from "next/link";
import { useState } from "react";
import { useTheme } from "next-themes";
import { Zap, Bell, Settings, User, Search, Menu, X, MoonStar, SunMedium } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import DashboardNavContent from "./dashboard-nav-content";

export default function DashboardHeader() {
  const { theme, setTheme } = useTheme();
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur-sm">
      <div className="container flex h-16 items-center justify-between gap-4 px-4">
        <div className="flex items-center lg:gap-2 lg:w-[240px]">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="lg:hidden">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="flex flex-col p-0">
              <div className="p-6 border-b">
                <Link href="/" className="flex items-center gap-2 font-bold">
                  <Zap className="h-5 w-5 text-primary" />
                  <span>FlowAI</span>
                </Link>
              </div>
              <div className="flex-1 overflow-auto py-2">
                <DashboardNavContent mobile={true} />
              </div>
            </SheetContent>
          </Sheet>

          <Link href="/" className="hidden lg:flex items-center gap-2 font-bold">
            <Zap className="h-5 w-5 text-primary" />
            <span>FlowAI</span>
          </Link>
        </div>

        <div className={`flex items-center transition-all duration-300 ${isSearchOpen ? "flex-1" : "w-auto"}`}>
          {isSearchOpen ? (
            <div className="relative flex w-full items-center">
              <Search className="absolute left-3 h-4 w-4 text-muted-foreground" />
              <Input
                className="pl-9 pr-12"
                placeholder="Search for anything..."
                autoFocus
              />
              <Button
                variant="ghost"
                size="icon"
                className="absolute right-0 h-full rounded-l-none"
                onClick={() => setIsSearchOpen(false)}
              >
                <X className="h-4 w-4" />
                <span className="sr-only">Close search</span>
              </Button>
            </div>
          ) : (
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsSearchOpen(true)}
              className="shrink-0"
            >
              <Search className="h-5 w-5" />
              <span className="sr-only">Search</span>
            </Button>
          )}
        </div>

        <div className="flex items-center gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon">
                <Bell className="h-5 w-5" />
                <span className="sr-only">Open notifications</span>
                <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-destructive" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-80">
              <DropdownMenuLabel>Notifications</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <div className="flex justify-center py-4">
                <p className="text-sm text-muted-foreground">No new notifications</p>
              </div>
            </DropdownMenuContent>
          </DropdownMenu>

          <Button variant="ghost" size="icon" onClick={() => setTheme(theme === "dark" ? "light" : "dark")}>
            {theme === "dark" ? (
              <SunMedium className="h-5 w-5" />
            ) : (
              <MoonStar className="h-5 w-5" />
            )}
            <span className="sr-only">Toggle theme</span>
          </Button>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="rounded-full">
                <Avatar className="h-8 w-8">
                  <AvatarImage src="/avatar.png" alt="John Smith" />
                  <AvatarFallback>JS</AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <User className="mr-2 h-4 w-4" />
                Profile
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Settings className="mr-2 h-4 w-4" />
                Settings
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Log out</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
}