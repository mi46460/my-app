import React from 'react';

const SignOut = ({onRouteChange, isSignedIn}) => {
    if(isSignedIn){  
        return(
        <div>
            <button onClick={() => onRouteChange('signin')} className='show-button'>Sign Out</button>
        </div>
        );
    }else{
        return(
            null
        );
    }
    
}

export default SignOut;