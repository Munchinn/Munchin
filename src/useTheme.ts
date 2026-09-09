import { useCallback, useEffect, useState } from "react";

export type Theme = "light" | "dark";

export const THEME_KEY = "munchin-theme";

// index.html resolves the theme before first paint, so the DOM is the source
// of truth on mount and there is no flash of the wrong ground.
function themeFromDocument(): Theme {
    return document.documentElement.dataset.theme === "dark" ? "dark" : "light";
}

function readStored(): string | null {
    try {
        return localStorage.getItem(THEME_KEY);
    } catch {
        // Safari private mode and blocked-storage settings throw on access.
        return null;
    }
}

export function useTheme() {
    const [theme, setTheme] = useState<Theme>(themeFromDocument);

    useEffect(() => {
        document.documentElement.dataset.theme = theme;
    }, [theme]);

    // Re-sync once on mount. The pre-paint script in index.html runs before
    // React and is the thing that avoids a flash, but if its evaluation ever
    // disagrees with the live media query (and nothing is stored), the query
    // wins rather than leaving the visitor on the wrong theme.
    useEffect(() => {
        if (readStored()) return;
        const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
        setTheme(prefersDark ? "dark" : "light");
    }, []);

    // Keep following the OS until the user makes an explicit choice, and stop
    // the moment they do.
    useEffect(() => {
        const mq = window.matchMedia("(prefers-color-scheme: dark)");
        const onChange = (e: MediaQueryListEvent) => {
            if (readStored()) return;
            setTheme(e.matches ? "dark" : "light");
        };
        mq.addEventListener("change", onChange);
        return () => mq.removeEventListener("change", onChange);
    }, []);

    const toggle = useCallback(() => {
        setTheme((prev) => {
            const next: Theme = prev === "dark" ? "light" : "dark";
            try {
                localStorage.setItem(THEME_KEY, next);
            } catch {
                // Preference simply will not persist; the toggle still works.
            }
            return next;
        });
    }, []);

    return { theme, toggle };
}
