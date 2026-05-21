import { motion, AnimatePresence } from 'framer-motion';

const LoadingBar = ({ loading, text = "Please wait..." }) => {
  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          initial={{ opacity: 0, y: -4 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -4 }}
          transition={{ duration: 0.3 }}
        >
          <div className="w-full bg-gray-200 rounded h-1 mt-2 overflow-hidden">
            <motion.div
              className="h-1 bg-amber-500 rounded"
              initial={{ width: "0%" }}
              animate={{ width: "90%" }}
              transition={{ duration: 2, ease: "easeInOut" }}
            />
          </div>
          <p className="text-center text-sm text-gray-400 mt-1">{text}</p>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default LoadingBar;