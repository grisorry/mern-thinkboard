import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FileText } from 'lucide-react';
import { Link } from 'react-router';

const NotesNotFound = () => {
  const text = 'No notes yet';
  const [reveal, setReveal] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setReveal(true), 500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center p-6 bg-base-100 rounded-lg shadow-sm space-y-4">
      <FileText className="h-12 w-12 text-primary" />

      <h3 className="text-2xl font-semibold text-center text-base-content/80">
        {text.split('').map((char, i) => (
          <motion.span
            key={i}
            initial={{ y: 10, filter: 'blur(6px)', opacity: 0 }}
            animate={reveal ? { y: 0, filter: 'blur(0px)', opacity: 1 } : {}}
            transition={{ duration: 0.4, delay: 0.1 + i * 0.05, ease: 'backOut' }}
          >
            {char}
          </motion.span>
        ))}
      </h3>

      <p className="text-base text-center text-base-content/60 max-w-sm">
        Ready to organize your thoughts? Start your first note now and keep track of what matters.
      </p>

      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 1.5, type: 'spring', stiffness: 200 }}
        whileHover={{ scale: 1.05, boxShadow: '0px 0px 8px rgba(59, 130, 246, 0.6)' }}
        whileTap={{ scale: 0.95 }}
      >
        <Link to="/create" className="btn btn-primary">
          Create a new note
        </Link>
      </motion.div>
    </div>
  );
};

export default NotesNotFound;
