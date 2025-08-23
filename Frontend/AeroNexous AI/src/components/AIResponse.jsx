import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeHighlight from 'rehype-highlight';

const AIResponse = ({ chatResponse }) => {
  if (!chatResponse) return null;
  
  return (
    <div style={{
      backgroundColor: 'rgba(255,255,255,0.05)',
      borderRadius: '12px',
      padding: '1.2rem',
      color: 'white',
      lineHeight: '1.6',
      marginBottom: '1.5rem'
    }}>
      <strong style={{ color: '#fbd38d' }}>AI Response:</strong>
      <div style={{ marginTop: '0.7rem' }}>
        <ReactMarkdown
          children={chatResponse}
          remarkPlugins={[remarkGfm]}
          rehypePlugins={[rehypeHighlight]}
          components={{
            h1: ({ node, ...props }) => <h1 style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#63b3ed' }} {...props} />,
            h2: ({ node, ...props }) => <h2 style={{ fontSize: '1.3rem', fontWeight: 'bold', color: '#63b3ed' }} {...props} />,
            p: ({ node, ...props }) => <p style={{ margin: '0.5rem 0' }} {...props} />,
            code: ({ node, inline, className, children, ...props }) =>
              inline ? (
                <code style={{ backgroundColor: '#2d3748', padding: '0.2em 0.4em', borderRadius: '4px' }} {...props}>
                  {children}
                </code>
              ) : (
                <pre style={{ backgroundColor: '#2d3748', padding: '1rem', borderRadius: '8px', overflowX: 'auto' }}>
                  <code className={className} {...props}>
                    {children}
                  </code>
                </pre>
              )
          }}
        />
      </div>
    </div>
  );
};

export default AIResponse;