import { AnimatePresence, motion, useAnimate } from 'framer-motion';
import { Bell, BellOff } from 'lucide-react';
import { useState } from 'react';
import Timer from './Timer';

const Framer = () => {
  const [scope, animate] = useAnimate();
  const [ringDisabled, setRingDisabled] = useState(false);
  const [state, setState] = useState('idle');

  const onClickHandler = async (type) => {
    if (type === 'ring') {
      // Bell animation
      setRingDisabled(true);
      setTimeout(() => {
        setRingDisabled(false);
      }, 4800);

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
        // pause bell
        [
          '.bell',
          {
            scale: 1,
          },
          { duration: 1.3 },
        ],

        // bell finished at 1.5 and starts to fading out
        [
          '.bell',
          {
            opacity: 0,
            blur: 4,
            x: 24,
          },
          { duration: 0.1, at: '-0.1' },
        ],

        // Set bell position to default
        [
          '.bell',
          {
            x: 24,
          },
          { duration: 0.1, at: 1.9 },
        ],

        // Silent appear
        ['.silent', { opacity: 1, blur: 4, x: 24 }, { duration: 0.2, at: 1.4 }],

        // Silent starts to shake
        [
          '.silent',
          { rotate: [0, -30, 20, -5, 0], blur: 0 },
          { duration: 0.8, at: 1.4, type: 'inertia' },
        ],

        // Silent dissapear
        [
          '.silent',
          { scale: 0, opacity: 0, blur: 4 },
          { at: 2.7, duration: 0.3 },
        ],

        // Bell reappear (need to be fix)
        [
          '.bell',
          {
            opacity: 1,
            blur: 0,
            x: 0,
          },
          { duration: 0.2, at: 2.7 },
        ],

        [
          '.bell',
          {
            rotate: [0, 20, -24, 12, -10, 0],
          },
          { duration: 1 },
        ],

        [
          '.bell',
          {
            opacity: 0,
            blur: 4,
          },
          { duration: 0.3, at: 4.5 },
        ],
        ['.silent', { scale: 1, x: 0 }, { at: 3, duration: 0.01 }],
      ]);

      // Text animation
      animate([
        ['.ring-text', { opacity: 1 }, { duration: 0.01 }],
        ['.ring-text', { scale: 1, blur: 0 }, { duration: 0.2 }],
        ['.ring-text', { scale: 0, blur: 4 }, { at: 1.4, duration: 0.2 }],
        ['.silent-text', { scale: 1, blur: 0 }, { at: 1.4, duration: 0.2 }],
        [
          '.silent-text',
          { scale: 0, blur: 4 },
          { delay: 1.1, at: 1.6, duration: 0.2 },
        ],
        ['.ring-text', { scale: 1, blur: 0 }, { at: 2.7, duration: 0.2 }],
        [
          '.ring-text',
          { scale: 0.3, opacity: 0, blur: 4 },
          { at: 4.5, duration: 0.2 },
        ],
      ]);

      // Silent Container animation
      animate([
        [
          '.silent-container',
          { width: 72 },
          { at: 1.4, duration: 0.3, type: 'spring' },
        ],
        ['.silent-container', { opacity: 0 }, { at: 2.7, duration: 0.1 }],
        ['.silent-container', { width: 0 }, { at: 2.9, duration: 0.1 }],
        ['.silent-container', { opacity: 1 }, { at: 3, duration: 0.1 }],
      ]);

      // dynamic island animation
      animate([
        ['.base', { width: 240 }, { duration: 0.5 }],
        ['.base', { scale: 1 }, { at: '<', duration: 0.3, type: 'inertia' }],
        ['.base', { width: 300 }, { at: 1.4, duration: 0.32 }],
        ['.base', { width: 240 }, { at: 2.7, duration: 0.5 }],
        ['.base', { width: 220 }, { at: 4.5, duration: 0.5 }],
      ]);
    } else if (type === 'timer') {
      animate([
        ['.base', { blur: 100 }, { duration: 0.01 }],
        ['.base', { scale: 1.7, blur: 0 }, { duration: 0.8, type: 'spring' }],
      ]);
    } else if (type === 'idle') {
      setRingDisabled(true);

      setTimeout(() => {
        setRingDisabled(false);
      }, 700);

      animate([
        ['.base', { width: 220, scale: 1 }, { duration: 0.4, type: 'inertia' }],
        [
          '.bell',
          {
            opacity: 0,
            blur: 4,
            x: 0,
          },
          { duration: 0.4, type: 'inertia', at: '<' },
        ],
        [
          '.ring-text',
          { scale: 0, blur: 4 },
          { at: '<', duration: 0.2, type: 'inertia' },
        ],
        [
          '.silent-text',
          { scale: 0, blur: 4 },
          { at: '<', duration: 0.2, type: 'inertia' },
        ],
        [
          '.silent',
          { scale: 0, opacity: 0, blur: 4 },
          { at: '<', duration: 0.3 },
        ],
        ['.silent-container', { opacity: 0 }, { at: '<', duration: 0.1 }],
        ['.silent', { scale: 1 }, { at: 0.3, duration: 0.1 }],
        [
          '.silent-container',
          { width: 0 },
          { at: 0.5, duration: 0.1, type: 'inertia' },
        ],
        [
          '.silent-container',
          { opacity: 1 },
          { at: 0.6, duration: 0.1, type: 'inertia' },
        ],
      ]);
    }
  };

  function onChangeSet(type) {
    onClickHandler(type);
    setState(type);
  }

  return (
    <div className="flex flex-col items-center justify-center gap-12">
      <div ref={scope}>
        <motion.div
          style={{ width: 220, blur: 0 }}
          className="base relative bg-black flex items-center px-2.5 rounded-full h-12"
        >
          <AnimatePresence>
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

            {/* Timer */}
            <motion.div
              key={'timer'}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="w-full"
            >
              <Timer state={state} onChangeSet={onChangeSet} />
            </motion.div>
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Button */}
      <div className="flex gap-3">
        <button
          onClick={() => {
            setState('idle');
            onClickHandler('idle');
          }}
          className="text-white bg-gray-500/60 hover:scale-[0.98] focus:scale-[0.9] duration-300 font-semibold px-8 py-2 pb-3 text-md rounded-full"
        >
          Idle
        </button>

        <button
          onClick={() => {
            setState('ring');
            onClickHandler('ring');
          }}
          disabled={ringDisabled}
          className="text-white bg-gray-500/60 hover:scale-[0.98] focus:scale-[0.9] duration-300 font-semibold px-8 py-2 pb-3 text-md rounded-full"
        >
          Ring
        </button>
        <button
          onClick={() => {
            setState('timer');
            onClickHandler('timer');
          }}
          disabled={ringDisabled}
          className="text-white bg-gray-500/60 hover:scale-[0.98] focus:scale-[0.9] duration-300 font-semibold px-8 py-2 pb-3  text-md rounded-full"
        >
          Timer
        </button>
      </div>
    </div>
  );
};

export default Framer;
