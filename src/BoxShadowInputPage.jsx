import React, { useState } from 'react';

const BoxShadowInputPage = ({ width, height }) => {
    const [inputBoxShadow, setInputBoxShadow] = useState('');
    const [parsedPixels, setParsedPixels] = useState(Array(width * height).fill('white'));

    const handleParseBoxShadow = () => {
        const shadowRegex = /(-?\d+px) (-?\d+px) 0 (#[0-9a-fA-F]{6}|\w+)/g;
        let match;
        let newPixels = [...parsedPixels];  
        while ((match = shadowRegex.exec(inputBoxShadow)) !== null) {
            const [, x, y, color] = match;
            const index = parseInt(y) * width + parseInt(x);
            newPixels[index] = color;
        }
        setParsedPixels(newPixels);
    };

    return (
        <div>
            <textarea 
                value={inputBoxShadow} 
                onChange={e => setInputBoxShadow(e.target.value)} 
                placeholder="Enter box-shadow value..."
                rows={10}
                cols={50}
            />
            <button onClick={handleParseBoxShadow}>Parse and Show on Canvas</button>

            <div style={{ display: 'flex', marginTop: '20px' }}>
                <div className='pixel-grid'>
                    {parsedPixels.map((color, index) => (
                        <div
                            className='pixel'
                            key={index}
                            style={{ backgroundColor: color }}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default BoxShadowInputPage;
