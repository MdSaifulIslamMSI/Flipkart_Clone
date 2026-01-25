import React from 'react';

const Loader = () => {
    return (
        <div className="flex justify-center items-center h-screen">
            <div className="w-20 h-20 border-4 border-gray-200 border-t-primary rounded-full animate-spin"></div>
        </div>
    );
};

export default Loader;
