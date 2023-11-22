import { AnimatePresence, motion } from 'framer-motion';
import { Pause, Play } from 'lucide-react';
import { useEffect, useState } from 'react';

// eslint-disable-next-line react/prop-types
const Timer = ({ state }) => {
  const [time, setTime] = useState(0);
  const [pause, setPause] = useState(false);

  useEffect(() => {
    let interval;
    console.log(state);
    if (!pause && state === 'timer') {
      interval = setInterval(() => {
        setTime((prev) => {
          const prevTimeString = prev.toString();

          if (prevTimeString[prevTimeString.length - 1] == '9') {
            if (prev === 59) {
              return 0;
            }
          }
          return prev + 1;
        });
      }, 1000);
    }

    if (state !== 'timer') {
      setTime(0);
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
          <button
            onClick={onToggleTimer}
            className="h-[36px] w-[36px] relative bg-yellow-500/40 text-black rounded-full"
          >
            <motion.div
              key={`pause ${pause}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              {pause ? (
                <Play
                  size={18}
                  className="play text-yellow-500 absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2"
                />
              ) : (
                <Pause
                  size={18}
                  className="pause text-yellow-500 absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2"
                />
              )}
            </motion.div>
          </button>
          <div className="flex items-end gap-1">
            <p className="text-[10px] leading-4  text-orange-400 pb-0.5 ">
              Timer
            </p>
            <div className="flex">
              <p className="text-orange-400">00:</p>
              <motion.p
                key={`tens ${tens}`}
                initial={{ y: 10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -10, opacity: 0 }}
                className="tens text-orange-400 w-[10.5px]"
              >
                {tens.toString()[0]}
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
