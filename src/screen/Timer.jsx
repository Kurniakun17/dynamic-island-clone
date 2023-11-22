import { AnimatePresence, motion } from 'framer-motion';
import { X } from 'lucide-react';
import { useEffect, useState } from 'react';

// eslint-disable-next-line react/prop-types
const Timer = ({ state, onChangeSet }) => {
  const [time, setTime] = useState(58);
  const [minutes, setMinutes] = useState(0);
  const [pause, setPause] = useState(false);

  useEffect(() => {
    let interval;
    if (!pause && state === 'timer') {
      interval = setInterval(() => {
        setTime((prev) => {
          if (prev === 59) {
            setMinutes((prev) => prev + 0.5);
            return 0;
          }
          return prev + 1;
        });
      }, 1000);
    }

    if (state !== 'timer') {
      setTime(0);
      setMinutes(0);
    }
    return () => clearInterval(interval);
  }, [pause, state]);

  const onToggleTimer = () => {
    if (pause) {
      setTimeout(() => {
        setPause(false);
      }, 1);
    } else {
      setTimeout(() => {
        setPause(true);
      }, 1);
    }
  };

  const second = time.toString()[time.toString().length - 1];
  const tens = time > 9 ? time.toString()[0] : 0;

  if (state !== 'timer') {
    return <div></div>;
  }
  return (
    <div className="w-full ">
      <AnimatePresence mode="wait">
        <div className="flex items-center text-xl text-white font-semibold justify-between  ">
          <div className="flex gap-1">
            <button
              onClick={onToggleTimer}
              className="h-[32px] w-[32px] relative bg-orange-400/20 text-black rounded-full"
            >
              <motion.div
                key={`pause ${pause}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                {pause ? (
                  <svg
                    stroke="currentColor"
                    fill="currentColor"
                    viewBox="0 0 384 512"
                    height="16px"
                    width="16px"
                    xmlns="http://www.w3.org/2000/svg"
                    className="play text-orange-500 absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2"
                  >
                    <path d="M73 39c-14.8-9.1-33.4-9.4-48.5-.9S0 62.6 0 80V432c0 17.4 9.4 33.4 24.5 41.9s33.7 8.1 48.5-.9L361 297c14.3-8.7 23-24.2 23-41s-8.7-32.2-23-41L73 39z"></path>
                  </svg>
                ) : (
                  <svg
                    stroke="currentColor"
                    fill="currentColor"
                    className="play text-orange-500 absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2"
                    viewBox="0 0 320 512"
                    height="16px"
                    width="16px"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M48 64C21.5 64 0 85.5 0 112V400c0 26.5 21.5 48 48 48H80c26.5 0 48-21.5 48-48V112c0-26.5-21.5-48-48-48H48zm192 0c-26.5 0-48 21.5-48 48V400c0 26.5 21.5 48 48 48h32c26.5 0 48-21.5 48-48V112c0-26.5-21.5-48-48-48H240z"></path>
                  </svg>
                )}
              </motion.div>
            </button>

            <button
              onClick={() => {
                onChangeSet('idle');
              }}
              className="h-[32px] w-[32px] relative bg-gray-300/20 text-black rounded-full"
            >
              <motion.div
                key={`close`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <X
                  className="absolute left-1/2 top-1/2 -translate-x-1/2 text-gray-300 -translate-y-1/2"
                  size={18}
                />
              </motion.div>
            </button>
          </div>
          <div className="flex items-end gap-1">
            <p className="text-[10px] leading-4  text-orange-400 pb-0.5 ">
              Timer
            </p>
            <div className="flex">
              <p className="text-orange-400">0</p>
              <motion.p
                key={`minutes ${minutes}`}
                initial={{ y: 10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -10, opacity: 0 }}
                className="text-orange-400"
              >
                {minutes}
              </motion.p>
              <p className="text-orange-400">:</p>
              <motion.p
                key={`tens ${tens}`}
                initial={{ y: 10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -10, opacity: 0 }}
                className={`tens text-orange-400  ${
                  tens === '1'
                    ? 'w-[8px]'
                    : tens === '4'
                    ? 'w-[12px]'
                    : 'w-[11.5px]'
                }
                `}
              >
                {' ' + tens.toString()[0]}
              </motion.p>

              <motion.p
                key={`second ${second}`}
                initial={{ y: 10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -10, opacity: 0 }}
                className="second text-xl w-3 text-orange-400"
              >
                {second}
              </motion.p>
            </div>
          </div>
        </div>
      </AnimatePresence>
    </div>
  );
};

export default Timer;
