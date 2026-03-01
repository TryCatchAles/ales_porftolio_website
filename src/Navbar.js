import React from 'react';

const Navbar = () => {
    const scrollTo = (e, id) => {
        e.preventDefault();
        if (id === 'home') {
            window.scrollTo({ top: 0, behavior: 'smooth' });
            return;
        }
        const el = document.getElementById(id);
        if (!el) return;
        const heading = el.querySelector('h2, h1') || el;
        const navbarHeight = document.querySelector('.navbar')?.offsetHeight || 0;
        const top = heading.getBoundingClientRect().top + window.scrollY - navbarHeight - 10;
        window.scrollTo({ top, behavior: 'smooth' });
    };

    return (
        <nav className="navbar">
            <ul className="nav-list">
                <li className="nav-item"><a href="#home" onClick={(e) => scrollTo(e, 'home')}>Home</a></li>
                <li className="nav-item"><a href="#about" onClick={(e) => scrollTo(e, 'about')}>About</a></li>
                <li className="nav-item"><a href="#projects" onClick={(e) => scrollTo(e, 'projects')}>Projects</a></li>
                <li className="nav-item"><a href="#contact" onClick={(e) => scrollTo(e, 'contact')}>Contact</a></li>
            </ul>

        </nav>
    );
};

export default Navbar;