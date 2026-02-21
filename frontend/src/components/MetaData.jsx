// Page title component — sets the browser tab title for each page
// using React Helmet for SEO and accessibility.

import React from 'react';
import { Helmet } from 'react-helmet';

const PageTitle = ({ title }) => (
    <Helmet>
        <title>{title}</title>
    </Helmet>
);

export default PageTitle;
