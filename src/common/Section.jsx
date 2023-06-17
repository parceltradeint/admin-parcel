import React from 'react';

const Section = ({children}) => {
    return (
        <div className="px-3 py-3  bg-boxColor rounded-md shadow-md mb-[4%]">
            {children}
        </div>
    );
};

export default Section;