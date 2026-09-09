import { useEffect, useState } from "react";
import "./Navbar.css";

const NAV_LINKS = [
    { href: "#product", label: "Product" },
    { href: "#findyourpal", label: "Find Your Pal" },
    { href: "#dishestoeat", label: "Dishes to Eat" },
    { href: "#foodhunt", label: "Food Hunt" },
];

const MOBILE_BREAKPOINT = 879;

export default function Navbar() {
    const [open, setOpen] = useState(false);

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
        <div className="container">

            <div className="logo">
                <a>munchin</a>
            </div>

            <div id="nav-links" className={open ? "nav-links open" : "nav-links"}>
                {NAV_LINKS.map(({ href, label }) => (
                    <a key={href} href={href} onClick={() => setOpen(false)}>
                        {label}
                    </a>
                ))}
            </div>

            <div className="signup">
                <a href="#signup">SIGN UP →</a>
            </div>

            <button
                type="button"
                className="nav-toggle"
                aria-label={open ? "Close menu" : "Open menu"}
                aria-expanded={open}
                aria-controls="nav-links"
                onClick={() => setOpen((v) => !v)}
            >
                <span className="nav-toggle-bar" />
                <span className="nav-toggle-bar" />
                <span className="nav-toggle-bar" />
            </button>

        </div>
    );
}
