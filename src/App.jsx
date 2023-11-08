import { Route, Routes } from 'react-router-dom';
import Framer from './screen/Framer';
import Manual from './screen/Manual';
import { motion } from 'framer-motion';

const App = () => {
  return (
    <>
      <div className="bg-slate-800 min-h-screen p-12 grid place-items-center">
        <Routes>
          <Route path="/" element={<Framer />} />
          <Route path="/manual" element={<Manual />} />
        </Routes>
      </div>

      {/* Appear on scroll trigger */}
      <div className="min-h-screen bg-slate-700 grid place-items-center">
        <motion.div
          initial={{ opacity: 0, y: -200 }}
          whileInView={{ once: true, opacity: 1, y: 0 }}
          transition={{ duration: 3 }}
        >
          <p className="font-bold text-2xl text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-blue-500">
            Lima tahun tak terasa
          </p>
        </motion.div>
      </div>
    </>
  );
};

export default App;
