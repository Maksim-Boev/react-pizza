import React from 'react';
import ContentLoader from 'react-content-loader';

const Loader = () => (
  <ContentLoader
    speed={2}
    width={280}
    height={460}
    viewBox="0 0 280 460"
    backgroundColor="#f5f5f5"
    foregroundColor="#ecebeb"
  >
    <circle cx="130" cy="130" r="130" />
    <rect x="0" y="270" rx="6" ry="6" width="280" height="30" />
    <rect x="-1" y="315" rx="6" ry="6" width="280" height="85" />
    <rect x="0" y="418" rx="6" ry="6" width="120" height="30" />
    <rect x="145" y="412" rx="20" ry="20" width="130" height="45" />
  </ContentLoader>
);

export default Loader;
