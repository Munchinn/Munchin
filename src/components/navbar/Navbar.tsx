import "./Navbar.css";

export default function Navbar() {
    return (
        <div className="container">

            <div className="logo">
                <a>munchin</a>
            </div>

            <div className="nav-links">
                <a href="#product">Product</a>
                <a href="#findyourpal">Find Your Pal</a>
                <a href="#dishestoeat">Dishes to Eat</a>
                <a href="#foodhunt">Food Hunt</a>
            </div>

            <div className="signup">
                <a href="#signup">SIGN UP</a>
            </div>

        </div>
    );
}