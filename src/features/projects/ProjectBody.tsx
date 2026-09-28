import React from 'react';

interface ProjectBodyProps {
  html: string;
}

export function ProjectBody({ html }: ProjectBodyProps) {
  return (
    <div
      className="markdown-prose"
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}

export default ProjectBody;
