import { useRef } from "react";
import "./Hero.css";

const HERO_IMAGE = "/ready-food.jpeg";

const TRENDING = ["5-min breakfast", "Paneer", "Late night", "Under 300 cal"];

export default function Hero() {
    // The field stays uncontrolled: nothing needs to re-render as it is typed
    // in. A ref is enough for the trending chips to prefill it.
    const inputRef = useRef<HTMLInputElement>(null);

    // Deliberately inert — there is no posts API yet, so submitting must not
    // pretend to search. Wire the query up here.
    const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
    };

    const applyTrending = (term: string) => {
        const input = inputRef.current;
        if (!input) return;
        input.value = term;
        input.focus();
    };

    return (
        <section className="hero">

            <h1 className="hero-title">
                Food Should Bring People <span className="hero-title-accent">TOGETHER</span>
            </h1>

            <div className="hero-body">

                <div className="hero-media">
                    <img src={HERO_IMAGE} alt="Compartment trays of rice, curry, fried tofu and braised pork laid out side by side" />
                    <p className="hero-media-badge">Posted 12 min ago &middot; @homekitchen</p>
                </div>

                <div className="hero-copy">
                    <p className="hero-tagline">
                        Good Food is Better together. Find your people, Discover new dishes&hellip;
                    </p>

                    <form className="hero-search" role="search" onSubmit={handleSearch}>
                        <label className="hero-visually-hidden" htmlFor="hero-search-input">
                            Search food posts
                        </label>
                        <input
                            id="hero-search-input"
                            className="hero-search-input"
                            ref={inputRef}
                            type="search"
                            name="q"
                            autoComplete="off"
                            placeholder="What are you craving today?"
                        />
                        <button className="hero-search-submit" type="submit" aria-label="Search dishes">
                            <span aria-hidden="true">&rarr;</span>
                        </button>
                    </form>

                    <div className="hero-actions">
                        <a className="hero-btn hero-btn-primary" href="#signup">Start posting</a>
                        <a className="hero-browse" href="#dishestoeat">or browse dishes</a>
                    </div>

                    <div className="hero-trending">
                        <span className="hero-trending-label" id="hero-trending-label">Trending:</span>
                        <ul className="hero-trending-list" aria-labelledby="hero-trending-label">
                            {TRENDING.map((term) => (
                                <li key={term}>
                                    <button
                                        className="hero-chip"
                                        type="button"
                                        onClick={() => applyTrending(term)}
                                    >
                                        {term}
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

            </div>

        </section>
    );
}
