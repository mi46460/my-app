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
                    <div className='choose'>
                        <span>Browse</span>
                        <input className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100 white" id="iniinputan" type='file' onChange={onInputChange}/>
                    </div>
                    <input className='form-link' type='text' onChange={onInputChange}/>
                </div>
            <button className='show-button mt2 mb4'  onClick={onButtonSubmit}>Detect!</button>
            </div>
            
        </div>
        
    );
}
export default ImageLink;