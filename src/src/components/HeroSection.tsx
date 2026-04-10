import { motion, type Variants, type Easing } from "framer-motion";
import type { Translations } from "@/i18n/translations";
import { useState, useEffect, useRef } from "react";

const ease: Easing = "easeOut";

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: 0.3 + i * 0.15, duration: 0.7, ease },
  }),
};

const HeroSection = ({ t }: { t: Translations }) => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isMobile, setIsMobile] = useState(false);
  const nameRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    // Detect if device is mobile
    const checkMobile = () => {
      setIsMobile(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent));
    };
    checkMobile();

    const handleMouseMove = (e: MouseEvent) => {
      if (nameRef.current && !isMobile) {
        const rect = nameRef.current.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        
        // Calculate relative position from the text center
        const deltaX = (e.clientX - centerX) / 10;
        const deltaY = (e.clientY - centerY) / 10;
        
        setMousePosition({ x: deltaX, y: deltaY });
      }
    };

    // Handle device orientation for mobile devices
    const handleOrientation = (e: DeviceOrientationEvent) => {
      if (e.gamma !== null && e.beta !== null) {
        // gamma: left to right tilt (-90 to 90)
        // beta: front to back tilt (-180 to 180)
        // Normalize to reasonable range for shadow effect
        const deltaX = (e.gamma / 90) * 30; // -30 to 30
        const deltaY = ((e.beta - 45) / 90) * 30; // Adjust for typical holding angle
        
        setMousePosition({ x: deltaX, y: deltaY });
      }
    };

    // Handle device motion as fallback
    const handleMotion = (e: DeviceMotionEvent) => {
      if (e.accelerationIncludingGravity) {
        const { x, y } = e.accelerationIncludingGravity;
        if (x !== null && y !== null) {
          // Use gravity to determine tilt
          // Normalize acceleration values (typically -10 to 10)
          const deltaX = (x / 10) * 30;
          const deltaY = (y / 10) * 30;
          
          setMousePosition({ x: deltaX, y: deltaY });
        }
      }
    };

    // Request permission for iOS 13+ devices
    const requestPermission = async () => {
      if (typeof (DeviceOrientationEvent as any).requestPermission === 'function') {
        try {
          const permission = await (DeviceOrientationEvent as any).requestPermission();
          if (permission === 'granted') {
            window.addEventListener('deviceorientation', handleOrientation);
          }
        } catch (error) {
          console.log('Device orientation permission denied');
        }
      } else {
        // Non-iOS 13+ devices
        window.addEventListener('deviceorientation', handleOrientation);
      }
    };

    if (isMobile) {
      // Try to use device orientation
      if (window.DeviceOrientationEvent) {
        requestPermission();
      } else if (window.DeviceMotionEvent) {
        // Fallback to device motion
        window.addEventListener('devicemotion', handleMotion);
      }
    } else {
      window.addEventListener("mousemove", handleMouseMove);
    }

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener('deviceorientation', handleOrientation);
      window.removeEventListener('devicemotion', handleMotion);
    };
  }, [isMobile]);

  // Create CSS custom properties for dynamic shadow values
  const shadowX = -mousePosition.x;
  const shadowY = -mousePosition.y;
  const shadowX2 = -mousePosition.x * 2;
  const shadowY2 = -mousePosition.y * 2;
  const shadowX3 = -mousePosition.x * 3;
  const shadowY3 = -mousePosition.y * 3;

  return (
    <section className="min-h-screen flex flex-col justify-center section-padding pt-32">
      <div className="max-w-2xl">
        <motion.p
          custom={0}
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          className="text-muted-foreground text-base md:text-lg font-body tracking-wide mb-3"
        >
          {t.hero.greeting}
        </motion.p>
        <motion.h1
          ref={nameRef}
          custom={1}
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          className="text-5xl md:text-7xl lg:text-8xl font-display text-foreground leading-tight mb-6 
                     [text-shadow:var(--shadow-x)_var(--shadow-y)_10px_rgba(0,0,0,0.3),var(--shadow-x2)_var(--shadow-y2)_20px_rgba(0,0,0,0.2),var(--shadow-x3)_var(--shadow-y3)_30px_rgba(0,0,0,0.1)]
                     dark:[text-shadow:var(--shadow-x)_var(--shadow-y)_10px_rgba(255,255,255,0.15),var(--shadow-x2)_var(--shadow-y2)_20px_rgba(255,255,255,0.1),var(--shadow-x3)_var(--shadow-y3)_30px_rgba(255,255,255,0.05),var(--shadow-x)_var(--shadow-y)_8px_rgba(0,0,0,0.4)]
                     transition-[text-shadow] duration-300 ease-out"
          style={{ 
            ['--shadow-x' as string]: `${shadowX}px`,
            ['--shadow-y' as string]: `${shadowY}px`,
            ['--shadow-x2' as string]: `${shadowX2}px`,
            ['--shadow-y2' as string]: `${shadowY2}px`,
            ['--shadow-x3' as string]: `${shadowX3}px`,
            ['--shadow-y3' as string]: `${shadowY3}px`,
          }}
        >
          {t.hero.name}
        </motion.h1>
        <motion.p
          custom={2}
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          className="text-lg md:text-xl text-muted-foreground font-body font-light max-w-lg leading-relaxed"
        >
          {t.hero.tagline}
        </motion.p>
        <motion.div
          custom={3}
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          className="mt-10 h-px w-16 bg-border"
        />
      </div>
    </section>
  );
};

export default HeroSection;
