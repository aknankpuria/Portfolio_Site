import React from 'react';
import { Canvas } from '@react-three/fiber';
import HackerRoom from '../components/HackerRoom';
import CanvasLoader from '../components/CanvasLoader';
import { Suspense } from 'react';
import { PerspectiveCamera } from '@react-three/drei';
import { Leva , useControls } from 'leva';

const Hero = () => {
  const x = useControls('HackerRoom',
  {
    positionX:
      {value:2.5 ,
        min :-10,
        max :10 ,
      },
      positionY:
      {value:2.5 ,
        min :-10,
        max :10 ,
      },
      positionZ:
      {value:2.5 ,
        min :-10,
        max :10 ,
      },
      rotationX:
      {value:0 ,
        min :-10,
        max :10 ,
      },
      rotationY:
      {value:0 ,
        min :-10,
        max :10 ,
      },
      rotationZ:
      {value:0 ,
        min :-10,
        max :10 ,
      },
      scale:
      {value:1 ,
        min :0,
        max :10 ,
      },
    
    });
  return (
    <section className='min-h-screen w-full flex flex-col relative'>
       <div className='w-full mx-auto flex flex-col sm:mt-36 mt-20 c-space gap-3'> 
        <p className='sm:text-3xl text-xl font-medium text-white text-center font-generalsans'>Hi , I'm Aslam Khan <span className='waving-hand'>👋</span></p>
        <p className='hero_tag text-gray_gradient text-center'>
          Building things for the web and mobile. 
        </p>
       </div>
       <div className='w-full h-full absolute inset-0'>

           <Leva />
           <Canvas className='w-full h-full'>
            <Suspense fallback={<CanvasLoader />}>
              <PerspectiveCamera makeDefault position={[0, 0, 30]} />

              <HackerRoom 
              // scale={0.06} 
              // position={[0, -4, 0]} 
              // rotation ={[0, -Math.PI / 1, 0]}
              position={[x.positionX , x.positionY , x.positionZ]} 
              rotation ={[x.rotationX , x.rotationY , x.rotationZ]}
              scale = {[x.scale , x.scale , x.scale]}
            />
               <ambientLight intensity={1} />
               <directionalLight position={[10, 10, 10]} intensity={1} />
              </Suspense>
           </Canvas>

       </div>
    </section>
  )
}

export default Hero