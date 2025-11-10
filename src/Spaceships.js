import React from 'react';
import './Spaceships.css';

import rocket from './assets/spaceships/rocket.png';

const Spaceships = () => {
    return (
        <div className="spaceships-container">
            <img src={rocket} alt="Rocket" className="spaceship" style={{ top: '60%', left: '82%' }} />
        </div>
    );
};

export default Spaceships;
