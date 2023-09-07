import React from 'react';
import { ClipLoader } from 'react-spinners';
import "./RoutesSpinner.css"

const cssOverride = { borderWidth: "4px" }

const RoutesSpinner = () => {
    return (
        <div className='spinner'>
            <ClipLoader
                color="#efd510"
                cssOverride={cssOverride}
                loading
                size={100}
                speedMultiplier={.8}
            />
        </div>
    );
};

export default RoutesSpinner;