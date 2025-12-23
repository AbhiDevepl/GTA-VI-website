import React, { useState } from 'react';
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";


function App() {
  const [showContent, setShowContent] = useState(false);

  useGSAP(() => {
    const tl = gsap.timeline();

    tl.to(".vi-mask-group", {
      rotate: 10,
      duration: 2,
      ease: "power4.inOut",
      transformOrigin: "50% 50%",
    })
      .to(".vi-mask-group", {
        scale: 10,
        duration: 2,
        delay: -1.8,
        ease: "expo.inOut",
        transformOrigin: "50% 50%",
        opacity: 0,
        onUpdate: function () {
          if (this.progress() >= 0.9 && !showContent) {
            const svg = document.querySelector("svg");
            if (svg) svg.remove();

            setShowContent(true);
            this.kill();
          }
        },
      });
  }, []);

  return (
    <>
      <div className="svg fix top-0 left z-[100] w-full h-screen overflow-hidden bg-[#000]">
        <svg viewBox='0 0 800 600' preserveAspectRatio='xMinYMid slice'>
          <defs>
            <mask id='viMask'>
              <rect width="100%" height="100%" fill='black' />
              <g className='vi-mask-group'>
                <text
                x="50%"
                y="50%"
                fontSize={250}
                textAnchor='middle'
                fill='white'
                dominantBaseline='middle'
                fontFamily='Arial Black'>
                  VI
                </text> 
              </g>
            </mask>
          </defs>
           <image
            href="./bg.png"
            width="100%"
            height="100%"
            preserveAspectRatio="xMidYMid slice"
            mask="url(#viMask)"
          />
        </svg>
      </div>
      {showContent && <div className='main w-full h-screen bg-[#000]'></div>}
    </>
  );
}

export default App;
