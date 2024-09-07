import { ReactLenis } from "lenis/dist/lenis-react";
import { useRouter } from 'next/router';
import {
    motion,
    useMotionTemplate,
    useScroll,
    useTransform,
} from "framer-motion";
import { SiSpacex } from "react-icons/si";
import { FiArrowRight, FiMapPin } from "react-icons/fi";
import { useRef } from "react";

const SECTION_HEIGHT = 1500;

// Add this style to hide scrollbar
const globalStyles = `
  html, body {
    scrollbar-width: none;  /* Firefox */
    -ms-overflow-style: none;  /* Internet Explorer 10+ */
  }
  html::-webkit-scrollbar, body::-webkit-scrollbar {
    display: none;  /* WebKit */
  }
`;

export default function Home() {
    return (
        <div className="bg-zinc-950">
            <style jsx global>{globalStyles}</style>
            <ReactLenis
                root
                options={{
                    lerp: 0.05,
                }}
            >
                <Hero />
                <Schedule />
            </ReactLenis>
        </div>
    );
}



const Hero = () => {
    return (
        <div
            style={{ height: `calc(${SECTION_HEIGHT}px + 100vh)` }}
            className="relative w-full"
        >
            <CenterImage />

            <ParallaxImages />

            <div className="absolute bottom-0 left-0 right-0 h-96 bg-gradient-to-b from-zinc-950/0 to-zinc-950" />
        </div>
    );
};

const CenterImage = () => {
    const { scrollY } = useScroll();

    const clip1 = useTransform(scrollY, [0, 1500], [25, 0]);
    const clip2 = useTransform(scrollY, [0, 1500], [75, 100]);

    const clipPath = useMotionTemplate`polygon(${clip1}% ${clip1}%, ${clip2}% ${clip1}%, ${clip2}% ${clip2}%, ${clip1}% ${clip2}%)`;

    const backgroundSize = useTransform(
        scrollY,
        [0, SECTION_HEIGHT + 500],
        ["170%", "100%"]
    );
    const opacity = useTransform(
        scrollY,
        [SECTION_HEIGHT, SECTION_HEIGHT + 500],
        [1, 0]
    );

    return (
        <motion.div
            className="sticky top-0 h-screen w-full"
            style={{
                clipPath,
                backgroundSize,
                opacity,
                backgroundImage:
                    "url(/Outer.gif)",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
            }}
        />
    );
};

const ParallaxImages = () => {
    return (
        <div className="mx-auto max-w-5xl px-4 pt-[200px]">
            <ParallaxImg
                src="/blink1.png"
                alt="An example of a space launch"
                start={-200}
                end={200}
                className="w-1/3"
            />
            <ParallaxImg
                src="/Outer.png"
                alt="An example of a space launch"
                start={200}
                end={-250}
                className="mx-auto w-2/3"
            />
            <ParallaxImg
                src="/blink2.png"
                alt="Orbiting satellite"
                start={-200}
                end={100}
                className="ml-auto w-1/3"
            />
            <ParallaxImg
                src="/sblink.jpg"
                alt="Orbiting satellite"
                start={0}
                end={-500}
                className="ml-24 w-5/12"
            />
        </div>
    );
};

const ParallaxImg = ({ className, alt, src, start, end }) => {
    const ref = useRef(null);

    const { scrollYProgress } = useScroll({
        target: ref,
        offset: [`${start}px end`, `end ${end * -1}px`],
    });

    const opacity = useTransform(scrollYProgress, [0.75, 1], [1, 0]);
    const scale = useTransform(scrollYProgress, [0.75, 1], [1, 0.85]);

    const y = useTransform(scrollYProgress, [0, 1], [start, end]);
    const transform = useMotionTemplate`translateY(${y}px) scale(${scale})`;

    return (
        <motion.img
            src={src}
            alt={alt}
            className={className}
            ref={ref}
            style={{ transform, opacity }}
        />
    );
};

const Schedule = () => {
    const router = useRouter();
    const handleButtonClick = () => {
        router.push('/dashboard');
    };


    return (
<<<<<<< HEAD
        <div
            style={{
                backgroundImage: 'url(/title.svg)', // Background image URL
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                height: '100vh',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '20px',
                color: '#fff', // Set text color to white
            }}
=======
      <div
        style={{
          backgroundImage: 'url(/title.svg)', 
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          height: '100vh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '20px',
          color: '#fff', 
        }}
      >
        <img
          src="/onlyBlinks.svg" 
          alt="Your Image"
          style={{ width: '600px', height: 'auto', marginBottom: '20px', }}
        />
  

        <p style={{ marginBottom: '20px', fontSize: '25px',fontWeight:'bold' }}>
        An AI-Enhanced Solana Blink Platform
        </p>
  
        <button
          style={{
            padding: '10px 20px',
            backgroundColor: '#512DA8', 
            border: 'none',
            borderRadius: '5px',
            color: '#fff', 
            cursor: 'pointer',
            fontWeight: 'bold',
            fontSize: '20px',
            width: '20%'
          }}
          onClick={handleButtonClick}
>>>>>>> b9b34e2e72afcdaee02adb478c1f9683556945fb
        >
            {/* Image Tag */}
            <img
                src="/onlyBlinks.svg" // Replace with your image URL
                alt="Your Image"
                style={{ width: '600px', height: 'auto', marginBottom: '20px', }}
            />

            {/* Line of Words */}
            <p style={{ marginBottom: '20px', fontSize: '25px', fontWeight: 'bold' }}>
                An AI-Enhanced Solana Blink Platform
            </p>

            {/* Button */}
            <button
                style={{
                    padding: '10px 20px',
                    backgroundColor: '#512DA8', // Button color (purple)
                    border: 'none',
                    borderRadius: '5px',
                    color: '#fff', // Button text color
                    cursor: 'pointer',
                    fontWeight: 'bold',
                    fontSize: '20px',
                    width: '20%'
                }}
                onClick={handleButtonClick}
            >
                Get Started
            </button>
        </div>
    );
};



