// Full-page loading spinner — shown while lazy-loaded pages
// are being fetched or data is loading.

import React from 'react';

const Loader = () => (
    <div className="flex justify-center items-center h-screen" role="status" aria-label="Loading">
        <div className="w-20 h-20 border-4 border-gray-200 border-t-primary rounded-full animate-spin" />
    </div>
);

export default Loader;
