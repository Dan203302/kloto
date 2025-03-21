'use client';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { partnersImages } from './partnersData';

export default function Partners() {
  const leftImages = partnersImages.slice(0, Math.ceil(partnersImages.length / 2));
  const rightImages = partnersImages.slice(Math.ceil(partnersImages.length / 2));

  return (
    <div className="mx-5 lg:mx-20 mt-20">
      <div className="relative bg-primary-200 rounded-[40px] overflow-hidden max-w-[1100px] mx-auto">
        {/* Мобильная версия */}
        <div className="lg:hidden py-10 h-[400px]">
          <h2 className="text-[32px] leading-[1.1] font-bold text-white text-center mb-10">
            Нам доверяют
          </h2>
          <div className="flex flex-col gap-8 overflow-hidden">
            {/* Верхняя строка */}
            <div className="overflow-hidden">
              <motion.div
                animate={{ 
                  x: [0, '-100%'] 
                }}
                transition={{
                  duration: 10,
                  repeat: Infinity,
                  ease: "linear"
                }}
                className="flex gap-4"
              >
                {[...leftImages, ...leftImages].map((image, index) => (
                  <div 
                    key={index} 
                    className="w-[140px] h-[80px] bg-white rounded-lg p-2 flex-shrink-0 flex items-center justify-center"
                  >
                    <div className="relative w-full h-full">
                      <Image
                        src={`https://klotoprint.ru${image.src}`}
                        alt=""
                        fill
                        className="object-contain"
                        sizes="140px"
                      />
                    </div>
                  </div>
                ))}
              </motion.div>
            </div>

            {/* Нижняя строка */}
            <div className="overflow-hidden">
              <motion.div
                animate={{ 
                  x: ['-100%', 0] 
                }}
                transition={{
                  duration: 10,
                  repeat: Infinity,
                  ease: "linear"
                }}
                className="flex gap-4"
              >
                {[...rightImages, ...rightImages].map((image, index) => (
                  <div 
                    key={index} 
                    className="w-[140px] h-[80px] bg-white rounded-lg p-2 flex-shrink-0 flex items-center justify-center"
                  >
                    <div className="relative w-full h-full">
                      <Image
                        src={`https://klotoprint.ru${image.src}`}
                        alt=""
                        fill
                        className="object-contain"
                        sizes="140px"
                      />
                    </div>
                  </div>
                ))}
              </motion.div>
            </div>
          </div>
        </div>

        {/* Десктопная версия */}
        <div className="hidden lg:block h-[500px]">
          <div className="absolute inset-0 flex">
            <div className="pl-[80px] flex items-center">
              <h2 className="text-[48px] leading-[1.1] font-bold text-white">
                Нам доверяют
              </h2>
            </div>

            <div className="ml-auto flex gap-6 h-full overflow-hidden pr-[80px]">
              <div className="w-[250px] relative">
                <motion.div
                  initial={{ y: 0 }}
                  animate={{ y: [0, "-50%"] }}
                  transition={{
                    duration: 30,
                    repeat: Infinity,
                    ease: "linear",
                    repeatType: "reverse"
                  }}
                  className="flex flex-col gap-4 -mt-4"
                >
                  {[...leftImages, ...leftImages].map((image, index) => (
                    <div 
                      key={index} 
                      className="w-full h-[120px] bg-white rounded-lg p-3 flex items-center justify-center"
                    >
                      <div className="relative w-full h-full">
                        <Image
                          src={`https://klotoprint.ru${image.src}`}
                          alt=""
                          fill
                          className="object-contain"
                          sizes="250px"
                        />
                      </div>
                    </div>
                  ))}
                </motion.div>
              </div>

              <div className="w-[250px] relative">
                <motion.div
                  initial={{ y: "-50%" }}
                  animate={{ y: ["-50%", 0] }}
                  transition={{
                    duration: 30,
                    repeat: Infinity,
                    ease: "linear",
                    repeatType: "reverse"
                  }}
                  className="flex flex-col gap-4 -mt-4"
                >
                  {[...rightImages, ...rightImages].map((image, index) => (
                    <div 
                      key={index} 
                      className="w-full h-[120px] bg-white rounded-lg p-3 flex items-center justify-center"
                    >
                      <div className="relative w-full h-full">
                        <Image
                          src={`https://klotoprint.ru${image.src}`}
                          alt=""
                          fill
                          className="object-contain"
                          sizes="250px"
                        />
                      </div>
                    </div>
                  ))}
                </motion.div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 