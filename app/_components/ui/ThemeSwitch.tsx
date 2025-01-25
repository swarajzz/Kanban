"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import Image from "next/image";
import React, { useEffect, useState } from "react";

function ThemeSwitch() {
  const [mounted, setMounted] = useState(false);
  const { setTheme, resolvedTheme } = useTheme();

  useEffect(() => setMounted(true), []);

  if (!mounted)
    return (
      <div className="flex items-center justify-center gap-3 rounded-lg bg-main_bkg px-10 py-2">
        <Image
          src="data:image/svg+xml;base64,PHN2ZyBzdHJva2U9IiNGRkZGRkYiIGZpbGw9IiNGRkZGRkYiIHN0cm9rZS13aWR0aD0iMCIgdmlld0JveD0iMCAwIDI0IDI0IiBoZWlnaHQ9IjIwMHB4IiB3aWR0aD0iMjAwcHgiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHJlY3Qgd2lkdGg9IjIwIiBoZWlnaHQ9IjIwIiB4PSIyIiB5PSIyIiBmaWxsPSJub25lIiBzdHJva2Utd2lkdGg9IjIiIHJ4PSIyIj48L3JlY3Q+PC9zdmc+Cg=="
          width={24}
          height={24}
          sizes="24X24"
          alt="Loading Light/Dark Toggle"
          priority={false}
          title="Loading Light/Dark Toggle"
        />
      </div>
    );

  return (
    <div className="flex items-center justify-center gap-3 rounded-lg bg-main_bkg px-10 py-2">
      {resolvedTheme === "dark" && (
        <Sun className="cursor-pointer" onClick={() => setTheme("light")} />
      )}

      {resolvedTheme === "light" && (
        <Moon className="cursor-pointer" onClick={() => setTheme("dark")} />
      )}
    </div>
  );
}

export default ThemeSwitch;
