import React from 'react';

interface ArticleBodyProps {
  html: string;
}

export function ArticleBody({ html }: ArticleBodyProps) {
  return (
    <div
      className="article-fullscreen-markdown-body"
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}

export default ArticleBody;
