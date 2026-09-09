import { useEffect, useState } from "react";
import { useTheme } from "../../useTheme";
import "./Navbar.css";

const NAV_LINKS = [
    { href: "#product", label: "Product" },
    { href: "#findyourpal", label: "Find Your Pal" },
    { href: "#dishestoeat", label: "Dishes To Eat" },
    { href: "#foodhunt", label: "Food Hunt" },
];

// Keep in sync with the hamburger breakpoint in Navbar.css.
const MOBILE_BREAKPOINT = 879;

function SunIcon() {
    return (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor"
             strokeWidth="2" strokeLinecap="round" aria-hidden="true">
            <circle cx="12" cy="12" r="4" />
            <path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
        </svg>
    );
}

function MoonIcon() {
    return (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor"
             strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z" />
        </svg>
    );
}

export default function Navbar() {
    const [open, setOpen] = useState(false);
    const { theme, toggle } = useTheme();

    useEffect(() => {
        if (!open) return;

        const onKeyDown = (e: KeyboardEvent) => {
            if (e.key === "Escape") setOpen(false);
        };
        const onResize = () => {
            if (window.innerWidth > MOBILE_BREAKPOINT) setOpen(false);
        };

        window.addEventListener("keydown", onKeyDown);
        window.addEventListener("resize", onResize);
        return () => {
            window.removeEventListener("keydown", onKeyDown);
            window.removeEventListener("resize", onResize);
        };
    }, [open]);

    return (
        <header className="navbar page-inset">

            <a className="navbar-logo" href="#top">munchin</a>

            <nav
                id="nav-menu"
                className={open ? "navbar-menu open" : "navbar-menu"}
                aria-label="Main"
            >
                <ul className="navbar-links">
                    {NAV_LINKS.map(({ href, label }) => (
                        <li key={href}>
                            <a href={href} onClick={() => setOpen(false)}>{label}</a>
                        </li>
                    ))}
                </ul>
            </nav>

            <button
                className="btn-icon navbar-theme"
                type="button"
                onClick={toggle}
                aria-label={theme === "dark" ? "Switch to light theme" : "Switch to dark theme"}
            >
                {theme === "dark" ? <SunIcon /> : <MoonIcon />}
            </button>

            <a className="btn btn-primary navbar-signup" href="#signup">
                SIGN UP <span aria-hidden="true">&rarr;</span>
            </a>

            <button
                type="button"
                className="navbar-burger"
                aria-label={open ? "Close menu" : "Open menu"}
                aria-expanded={open}
                aria-controls="nav-menu"
                onClick={() => setOpen((v) => !v)}
            >
                <span className="navbar-burger-bar" />
                <span className="navbar-burger-bar" />
                <span className="navbar-burger-bar" />
            </button>

        </header>
    );
}
