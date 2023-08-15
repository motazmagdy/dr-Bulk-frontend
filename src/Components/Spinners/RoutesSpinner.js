import React from 'react';
import { ClipLoader } from 'react-spinners';
import "./RoutesSpinner.css"

const RoutesSpinner = () => {
    return (
        <div className='spinner'>
            <ClipLoader 
                color="#f4aa48"
                cssOverride={{}}
                loading
                size={100}
                speedMultiplier={1}
            />
        </div>
    );
};

export default RoutesSpinner;