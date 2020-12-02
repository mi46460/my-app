import React from 'react';

const ImageLink = ( {onInputChange, onButtonSubmit} ) => {
    return (
        <div>
            <p className="f3">
                {'Neuron can detect faces from image'}
            </p>
            <div>
                <p>{'You can browse from your local computer or use the link'}</p>
                <div className='center'>
                    <button className='browse-button'>Browse</button>
                    <input className='form-link' type='text' onChange={onInputChange}/>
                </div>
            <button className='show-button'  onClick={onButtonSubmit}>Detect!</button>
            </div>
        </div>
    );
}

export default ImageLink;