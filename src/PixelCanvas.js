import React, { useState } from 'react';
import './PixelCanvas.css';
import Modal from './Modal';

const PixelCanvas = ({ width, height }) => {
    const [pixels, setPixels] = useState(Array(width * height).fill('white')); 
    const [boxShadowCSS, setBoxShadowCSS] = useState('');
    const [isModalOpen, setModalOpen] = useState(false);
    const [selectedColour, setSelectedColour] = useState('black');  
    const [customColor, setCustomColor] = useState('#ff0000');  
    const [isInputModalOpen, setInputModalOpen] = useState(false);
    const pixelSize = 20; 
    const gridWidth = width * pixelSize;
    const gridHeight = height * pixelSize;


    const colours = [
        'black', 'white', 'red', 'blue', 'yellow', 'green', 
        '#f39c12', '8e44ad', 'cyan', 'magenta', '#e74c3c', 
        '#2ecc71', '#34495e', 'orange', 'pink', 'brown', 'purple',
        customColor  
    ];
    

    const handleClick = (index) => {
        const newPixels = [...pixels];
        newPixels[index] = selectedColour;  
        setPixels(newPixels);
    };

    const generateBoxShadow = () => {
        let shadows = [];
        pixels.forEach((color, index) => {
            if (color !== 'white') {  
                const x = index % width;
                const y = Math.floor(index / width);
                shadows.push(`  ${x}px ${y}px 0 ${color}`); 
            }
        });
        return `box-shadow:\n${shadows.join(',\n')};`; 
    };

    const handleGenerateClick = () => {
        const css = generateBoxShadow();
        setBoxShadowCSS(css);
        setModalOpen(true);
    };

    const handleParseBoxShadow = () => {
        const shadowRegex = /(-?\d+px) (-?\d+px) 0 (#[0-9a-fA-F]{6}|\w+)/g;
        let match;
        let newPixels = Array(width * height).fill('white');  
        while ((match = shadowRegex.exec(boxShadowCSS)) !== null) {
            const [, x, y, color] = match;
            const index = parseInt(y) * width + parseInt(x);
            newPixels[index] = color;
        }
        setPixels(newPixels);
        setInputModalOpen(false);  
    };
    const clearCanvas = () => {
        setPixels(Array(width * height).fill('white')); 
    };
    
    const colourPanel = (
        <div className="colour-panel">
            {colours.map(colour => (
                <div 
                    key={colour} 
                    className='colour-switch' 
                    style={{backgroundColor: colour}} 
                    onClick={() => setSelectedColour(colour)}
                />
            ))}
            <input 
                type="color" 
                value={customColor} 
                onChange={(e) => {
                    setCustomColor(e.target.value);
                    setSelectedColour(e.target.value);
                }}
            />
        </div>
    );


    return (
        <div>
            <div style={{ display: 'flex' }}>
                {colourPanel}
                <div className='pixel-grid'
                style={{ 
                    width: `${gridWidth}px`,
                    height: `${gridHeight}px`,
                    gridTemplateColumns: `repeat(${width}, 1fr)`
                }}>
                    {pixels.map((color, index) => (
                        <div
                            className='pixel'
                            key={index}
                            onClick={() => handleClick(index)}
                            style={{ backgroundColor: color }}
                        />
                    ))}
                </div>
            </div>
            <button onClick={handleGenerateClick}>Generate Box Shadow</button>
            <button onClick={() => setInputModalOpen(true)}>Input Box Shadow</button>
            <button onClick={ clearCanvas}>Empty Canvas</button>
            <Modal isOpen={isModalOpen} onClose={() => setModalOpen(false)}>
                <h3>Generated CSS Box-Shadow</h3>
                <pre className='css-output'>
                    {boxShadowCSS}
                </pre>
            </Modal>

            <Modal isOpen={isInputModalOpen} onClose={() => setInputModalOpen(false)}>
                <h3>Input CSS Box-Shadow</h3>
                <textarea 
                    value={boxShadowCSS} 
                    onChange={e => setBoxShadowCSS(e.target.value)} 
                    placeholder="Enter box-shadow value..."
                    rows={10}
                    cols={50}
                />
                <button onClick={handleParseBoxShadow}>Parse and Show on Canvas</button>
            </Modal>
        </div>
    );
    
}

export default PixelCanvas;
