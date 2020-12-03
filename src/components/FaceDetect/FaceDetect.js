import React from 'react';
import './FaceDetect.css';
const FaceDetect = ({ box, imgurl}) => {
    console.log(box);
    return (
        <div className='center ma'>
            <div className='wrap-box'>
                <img id='inputimage' alt='' src={imgurl} width='500px' height='auto'/>
                <div className='bounding-box' style={{top: box.topRow, right: box.rightCol, bottom: box.bottomRow, left: box.leftCol}}></div>
                {/* <div className='bounding-box' style={{top: 20, right: 20, bottom: 20, left: 20}}></div> */}
            </div>
        </div>
    );
}

export default FaceDetect;