'use client';

import React from 'react';
import { ArticlesListing } from './ArticlesListing';
import { blogArticlesData } from '../../data/blogArticlesData';

export const OfficeBlogSection: React.FC<{ showHeroBanner?: boolean }> = ({ showHeroBanner = true }) => {
  return <ArticlesListing articles={blogArticlesData} showHeroBanner={showHeroBanner} />;
};

export default OfficeBlogSection;
