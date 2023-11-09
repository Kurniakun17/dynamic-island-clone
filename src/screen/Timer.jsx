import { AnimatePresence, motion, useAnimate } from 'framer-motion';
import { useEffect, useState } from 'react';

const Timer = () => {
  const [time, setTime] = useState(0);
  const [scope, animate] = useAnimate();
  const [pause, setPause] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      console.log(`ini di useEffect ${pause}`);
      if (pause) {
        clearInterval(interval);
      }
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
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (time % 10 === 0) {
      animate([
        ['.tens', { opacity: 1, y: 0 }, { duration: 0.01 }],
        ['.tens', { opacity: 0, y: -20 }, { duration: 0.2 }],
        ['.tens', { opacity: 0, y: 20 }, { duration: 0.01 }],
        ['.tens', { opacity: 1, y: 0 }, { duration: 0.2 }],
      ]);
    }

    animate([
      ['.second', { opacity: 0, y: 20 }, { duration: 0.1 }],
      ['.second', { opacity: 1, y: 0 }, { duration: 0.2 }],
      ['.second', { opacity: 1, y: 0 }, { duration: 0.4 }],
      [
        '.second',
        { opacity: 0, y: -20, blur: 100 },
        { at: '+0.1', duration: 0.2 },
      ],
    ]);
  }, [time]);

  return (
    <div className="flex flex-col items-center gap-4 ">
      <div
        className="flex text-4xl text-white font-bold
      "
        ref={scope}
      >
        <p>00:</p>
        <AnimatePresence>
          <p>{time < 10 && 0}</p>
          <motion.p
            key={'yura=yura'}
            className="tens font-bold"
            exit={{ opacity: 0, y: 10 }}
          >
            {time > 9 && time.toString()[0]}
          </motion.p>
          <motion.p
            key={'test'}
            className="second font-bold text-4xl"
            exit={{ opacity: 0, y: 10 }}
          >
            {time.toString()[time.toString().length - 1]}
          </motion.p>
        </AnimatePresence>
      </div>
      <button
        onClick={() => {
          setPause(true);
          console.log('initiated');
        }}
        className="bg-white px-4 py-1 font-bold rounded-lg"
      >
        Pause
      </button>
    </div>
  );
};

export default Timer;
