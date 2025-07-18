// client/components/AIReviewModal.jsx
import React, { useState } from 'react';
import axios from '../axios';
import ReactMarkdown from 'react-markdown';

const AIReviewModal = ({ code, onClose }) => {
  const [review, setReview] = useState('');
  const [loading, setLoading] = useState(true);

  React.useEffect(() => {
    const fetchReview = async () => {
      try {
        const res = await axios.post('/ai-review', { code }, { withCredentials: true });
        setReview(res.data.review);
      } catch (err) {
        setReview('❌ Error fetching AI Review');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchReview();
  }, [code]);

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
      <div className="bg-[#1a1a2e] p-6 rounded-lg max-w-2xl w-full shadow-xl text-white relative">
        <button
          className="absolute top-2 right-3 text-purple-300 hover:text-white text-xl"
          onClick={onClose}
        >
          &times;
        </button>
        <h2 className="text-xl font-semibold text-purple-400 mb-4">AI Code Review</h2>

        {loading ? (
          <p className="text-purple-300">Loading review...</p>
        ) : (
          <div className="text-white text-sm max-h-[60vh] overflow-y-auto whitespace-pre-wrap">

        <ReactMarkdown
              components={{
                p: ({ node, ...props }) => <p className="mb-2 text-purple-200" {...props} />,
                code: ({ node, inline, className, children, ...props }) => (
                  <code className="bg-gray-800 px-1 py-0.5 rounded" {...props}>
                    {children}
                  </code>
                ),
              }}
            >
            {review}
         </ReactMarkdown> 
         </div>
        )}
      </div>
    </div>
  );
};

export default AIReviewModal;

