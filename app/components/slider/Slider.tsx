'use client';

import React, { FC } from 'react';
import { EmblaOptionsType } from 'embla-carousel';
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';
import AutoScroll from 'embla-carousel-auto-scroll';

import styles from '@/styles/slider.module.css';

import { DotButton, useDotButton } from './DotButtons';

import '@/styles/slider.module.css';

type PropType = {
  slides: React.ReactNode[];
  isAutoScroll?: boolean;
  options?: EmblaOptionsType;
};

const Slider: FC<PropType> = ({ slides, isAutoScroll, options }) => {
  const plugins = [];

  if (!isAutoScroll) {
    plugins.push(Autoplay({ playOnInit: true, delay: 3000 }));
  }

  if (isAutoScroll) {
    plugins.push(AutoScroll({ playOnInit: true }));
  }

  const [emblaRef, emblaApi] = useEmblaCarousel(options, plugins);

  const { selectedIndex, scrollSnaps, onDotButtonClick } =
    useDotButton(emblaApi);

  return (
    <section className={styles.embla}>
      <div className={styles.embla__viewport} ref={emblaRef}>
        <div className={styles.embla__container}>
          {slides.map((slide, index) => (
            <div
              className={`${
                isAutoScroll ? styles.tech_carousel : styles.embla__slide
              }`}
              key={index}
            >
              <div className={styles.embla__slide__number}>{slide}</div>
            </div>
          ))}
        </div>
      </div>

      {!isAutoScroll && (
        <div className="flex justify-center items-center">
          <div className="mt-4">
            {scrollSnaps.map((_, index) => (
              <DotButton
                key={index}
                onClick={() => onDotButtonClick(index)}
                className={styles.embla__dot.concat(
                  index === selectedIndex ? styles.embla__dot__selected : ''
                )}
              />
            ))}
          </div>
        </div>
      )}
    </section>
  );
};

export default Slider;
