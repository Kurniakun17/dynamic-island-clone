import { motion, useAnimate } from 'framer-motion';
import { Bell, BellOff } from 'lucide-react';

const Framer = () => {
  const [scope, animate] = useAnimate();

  const onClickHandler = async (type) => {
    if (type === 'ring') {
      // Bell animation
      animate([
        [
          '.bell',
          {
            scale: 1,
            opacity: 1,
            x: 0,
            blur: 0,
          },
          {
            duration: 0.2,
          },
        ],
        [
          '.bell',
          {
            scale: 1,
          },
          { duration: 0.7 },
        ],
        [
          '.bell',
          {
            opacity: 0,
            x: 24,
          },
          { duration: 0.1 },
        ],
        [
          '.bell',
          {
            x: 0,
            blur: 4,
          },
          { duration: 0.1, at: 1.4 },
        ],
        ['.silent', { opacity: 1, blur: 4, x: 24 }, { duration: 0.2, at: 0.9 }],
        [
          '.silent',
          { rotate: [0, -30, 20, -5, 0], blur: 0 },
          { duration: 0.8, at: 0.9, type: 'inertia' },
        ],
        [
          '.silent',
          { scale: 0, opacity: 0, blur: 4 },
          { at: 2.2, duration: 0.3 },
        ],

        ['.silent', { scale: 1, x: 0 }, { at: 2.5, duration: 0.01 }],
      ]);

      // Text animation
      animate([
        ['.ring-text', { scale: 1, blur: 0 }, { duration: 0.2 }],
        ['.ring-text', { scale: 0, blur: 4 }, { at: 0.9, duration: 0.2 }],
        ['.silent-text', { scale: 1, blur: 0 }, { at: 0.9, duration: 0.2 }],
        [
          '.silent-text',
          { scale: 0, blur: 4 },
          { delay: 1.1, at: 1.1, duration: 0.2 },
        ],
        // finished at 2.4
      ]);

      // Silent Container animation
      animate([
        ['.silent-container', { width: 72 }, { at: 0.9, duration: 0.3 }],
        ['.silent-container', { opacity: 0 }, { at: 2.2, duration: 0.1 }],
        ['.silent-container', { width: 0 }, { at: 2.4, duration: 0.1 }],
        ['.silent-container', { opacity: 1 }, { at: 2.5, duration: 0.1 }],
      ]);

      // dynamic island animation
      animate([
        ['.base', { width: 240 }, { duration: 0.5 }],
        ['.base', { width: 280 }, { delay: 0.3, duration: 0.5 }],
        ['.base', { width: 200 }, { at: 2.2, duration: 0.5 }],
      ]);
    } else if (type === 'idle') {
      // controls.start({ scale: 0.2, transition: { duration: 3 } });
    }
  };

  return (
    <div className="flex flex-col items-center justify-center gap-8">
      <div ref={scope}>
        <motion.div
          style={{ width: 200 }}
          className="base relative bg-black flex items-center px-4 rounded-full h-12"
        >
          {/* Ring */}
          <>
            <motion.div
              style={{ width: 0 }}
              className="absolute left-3 h-8 bg-red-500 rounded-full py-1 silent-container"
            ></motion.div>
            <BellOff className="absolute left-3 text-white opacity-0 silent" />
            <Bell className="z-99 left-3 absolute text-white bell opacity-0 scale-0" />

            <motion.div
              style={{ scale: 0, blur: 4 }}
              className="ring-text absolute right-3"
            >
              <p className="text-white font-semibold">Ring</p>
            </motion.div>
            <motion.div
              style={{ scale: 0, blur: 4 }}
              className="silent-text absolute right-3"
            >
              <p className="text-red-500 font-semibold">Silent</p>
            </motion.div>
          </>
        </motion.div>

        <motion.div></motion.div>
      </div>

      {/* Button */}
      <div className="flex gap-3">
        <button
          onClick={() => onClickHandler('idle')}
          className="rounded-lg bg-white text-black hover:bg-slate-700 border border-slate-400 p-2 px-6"
        >
          Idle
        </button>

        <button
          onClick={() => onClickHandler('ring')}
          className="rounded-lg bg-white text-black hover:bg-slate-700 border border-slate-400 p-2 px-6"
        >
          Ring
        </button>
      </div>
    </div>
  );
};

export default Framer;
