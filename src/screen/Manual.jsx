import { Bell, BellOff } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

const Manual = () => {
  const [state, setState] = useState('idle');
  const bellRingRef = useRef(null);
  const ringTextRef = useRef(null);
  const silentRingRef = useRef(null);
  const silentContainerRef = useRef(null);
  const silentTextRef = useRef(null);
  const baseRef = useRef(null);

  useEffect(() => {
    onStateChange();
  }, [state]);

  const onStateChange = () => {
    switch (state) {
      case 'idle':
        bellRingRef.current.classList.remove('bell-ring');
        ringTextRef.current.classList.remove('text-bell-ring');
        silentRingRef.current.classList.remove('bell-silent');
        silentTextRef.current.classList.remove('text-bell-silent');
        silentContainerRef.current.classList.remove('silent-container');
        baseRef.current.classList.remove('container');
        break;
      case 'ring':
        // console.log(bellRingRef.current.classList);
        bellRingRef.current.classList.add('bell-ring');
        ringTextRef.current.classList.add('text-bell-ring');
        silentRingRef.current.classList.add('bell-silent');
        silentTextRef.current.classList.add('text-bell-silent');
        silentContainerRef.current.classList.add('silent-container');
        baseRef.current.classList.add('container');
        break;
      default:
        break;
    }
  };

  return (
    <>
      {/* dynamic */}
      <div className="flex flex-col gap-4">
        <div
          ref={baseRef}
          className="relative h-[48px] w-[200px] group duration-300 px-4 flex items-center justify-between bg-black rounded-full"
        >
          <Bell
            ref={bellRingRef}
            id="bell"
            className={`left-4 hidden absolute text-white transition-all duration-300 border-transparent`}
            size={24}
          />
          <div
            ref={silentContainerRef}
            className="absolute hidden left-4 py-1 px-6 rounded-full bg-red-500 w-fit text-white"
          >
            <BellOff ref={silentRingRef} className="" size={24} />
          </div>
          <p
            ref={ringTextRef}
            className="font-bold hidden text-white absolute right-4"
          >
            Ring
          </p>
          <p
            ref={silentTextRef}
            className="font-bold hidden text-red-500 absolute right-4"
          >
            Silent
          </p>
        </div>
        <div className="flex gap-4">
          <button
            onClick={() => {
              setState('idle');
            }}
            className="bg-white py-2 rounded-full font-semibold w-full "
          >
            Idle
          </button>
          <button
            onClick={() => {
              setState('ring');
            }}
            className="bg-white py-2 rounded-full font-semibold w-full "
          >
            Ring
          </button>
        </div>
      </div>
    </>
  );
};

export default Manual;
