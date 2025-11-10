import React from 'react';
import './LegoLand.css';

// Green Lego Blocks
import green2x1 from './assets/lego-blocks/green-2-1x1.webp';
import green2Corner from './assets/lego-blocks/green-2-corner.webp';
import green3x1 from './assets/lego-blocks/green-3-1x2.webp';
import greenPlate from './assets/lego-blocks/green-plate.webp';

// Purple Lego Blocks
import purple1x2 from './assets/lego-blocks/purple-1x2.webp';
import purple1x3 from './assets/lego-blocks/purple-1x3.webp';
import purpleCorner from './assets/lego-blocks/purple-corner.webp';

const LegoLand = () => {
    return (
        <div className="legoland-container">
            <div className="green-blocks">
                <img src={green2x1} alt="Green 2x1" style={{ top: '30%', left: '15%' }} />
                <img src={green2Corner} alt="Green 2 Corner" style={{ top: '50%', left: '10%' }} />
                <img src={green3x1} alt="Green 3x1" style={{ top: '70%', left: '20%' }} />
                <img src={greenPlate} alt="Green Plate" style={{ top: '90%', left: '10%' }} />
            </div>
            <div className="purple-blocks">
                <img src={purple1x2} alt="Purple 1x2" style={{ top: '25%', left: '75%' }} />
                <img src={purple1x3} alt="Purple 1x3" style={{ top: '45%', left: '85%' }} />
                <img src={purpleCorner} alt="Purple Corner" style={{ top: '75%', left: '80%' }} />
            </div>
        </div>
    );
};

export default LegoLand;
