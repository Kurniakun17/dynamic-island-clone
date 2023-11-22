import {
  motion,
  stagger,
  useAnimate,
  useAnimationControls,
} from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { useEffect, useState } from 'react';
const Practice = () => {
  const [show, setShow] = useState(false);
  const [isOpen, setIsOpen] = useState(true);
  const control = useAnimationControls();
  const [scope, animate] = useAnimate();

  useEffect(() => {
    animate(
      '.arrow',
      { rotate: isOpen ? 0 : 180 },
      { duration: 0.3, type: 'spring' }
    );

    animate(
      '.ul-container',
      // { scale: isOpen ? 0 : 1 },
      {
        clipPath: isOpen
          ? 'inset(0% 0% 0% 0% round 10px)'
          : 'inset(10% 50% 90% 50% round 10px)',
      },

      { duration: 0.5, type: 'spring' }
    );

    animate(
      'li',
      isOpen ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.3 },

      { duration: 0.2, delay: isOpen ? stagger(0.1, { startDelay: 0.15 }) : 0 }
    );
  }, [isOpen]);

  return (
    <motion.div
      ref={scope}
      className="flex flex-col gap-4 text-black font-semibold"
    >
      <motion.div
        whileTap={{ scale: 0.95, transition: { duration: 0.1 } }}
        className="flex justify-between rounded-xl px-5 py-2 hover:cursor-pointer bg-white"
        onClick={() => {
          setIsOpen((prev) => !prev);
        }}
      >
        <p>Menu</p>
        <ChevronDown className="arrow" />
      </motion.div>

      <motion.ul
        style={{ clipPath: 'inset(10%, 50%, 90%, 50% round 10px)' }}
        className="ul-container px-5 py-2 flex flex-col gap-1 bg-white rounded-xl"
      >
        <li>Halo</li>
        <li>Hai</li>
        <li>Aloha</li>
        <li>Kangen Nia</li>
      </motion.ul>

      <motion.ul
        style={{
          clipPath: 'inset(0%, 0%, 0%, 0% round 10px)',
          width: 300,
        }}
        className="bg-zinc-900 rounded-xl px-5 text-white py-2"
        variants={{
          active: { clipPath: 'inset(50%, 90%, 50%, 10% round 10px)' },
          inactive: { clipPath: 'inset(0%, 0%, 0%, 0% round 10px)' },
        }}
        animate={control}
      >
        <p>Halo</p>
        <p>Hai</p>
        <p>Aloha</p>
        <p>Kangen Nia</p>
      </motion.ul>
      <button
        type="button"
        onClick={() => {
          if (show) {
            control.start('active');
          } else {
            control.start('inactive');
          }
          setShow((prev) => !prev);
        }}
      >
        {show ? 'Stop' : 'Start'}
      </button>
    </motion.div>
  );

  // return (
  //   <div>
  //     <motion.div
  //       className="border border-zinc-600 text-white font-semibold px-8 relative overflow-hidden py-4 rounded-xl bg-zinc-900"
  //       layout
  //     >
  //       <AnimatePresence initial={false} mode="popLayout">
  //         {show ? (
  //           <motion.div
  //             key={'1'}
  //             initial={{ x: -100 }}
  //             animate={{ x: 0 }}
  //             exit={{ x: 100, position: 'absolute' }}
  //             className="flex flex-col gap-4"
  //           >
  //             <button
  //               className="flex hover:bg-zinc-800 rounded-md"
  //               onClick={() => setShow(false)}
  //             >
  //               <ChevronLeft /> Back{' '}
  //             </button>
  //             <p className="hover:bg-zinc-800 rounded-md">Profile</p>
  //             <p className="hover:bg-zinc-800 rounded-md">Status</p>
  //             {/* <p className="hover:bg-zinc-800 rounded-md">Settings</p> */}
  //           </motion.div>
  //         ) : (
  //           <motion.div
  //             key={'2'}
  //             initial={{ x: 100 }}
  //             animate={{ x: 0 }}
  //             exit={{ x: -100, position: 'absolute' }}

  //             className="flex flex-col gap-4"
  //           >
  //             <button
  //               className="flex hover:bg-zinc-800 rounded-md"
  //               onClick={() => setShow(true)}
  //             >
  //               Next <ChevronRight />
  //             </button>
  //             <p className="hover:bg-zinc-800 rounded-md">Social</p>
  //             <p className="hover:bg-zinc-800 rounded-md">Message</p>
  //           </motion.div>
  //         )}
  //       </AnimatePresence>
  //     </motion.div>
  //   </div>
  // );
};

export default Practice;
