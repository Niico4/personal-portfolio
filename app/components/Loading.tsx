import React from 'react';

import styles from '../styles/loader.module.css';

const Loading = () => {
  return (
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
      <div className={styles.hacker_loader}>
        <div className={styles.loader_text}>
          <span
            data-text="Cargando Proyectos..."
            className={styles.text_glitch}
          >
            Cargando Proyectos...
          </span>
        </div>
        <div className={styles.loader_bar}>
          <div className={styles.bar_fill}></div>
          <div className={styles.bar_glitch}></div>
        </div>
        <div className={styles.particles}>
          <div className={styles.particle}></div>
          <div className={styles.particle}></div>
          <div className={styles.particle}></div>
          <div className={styles.particle}></div>
          <div className={styles.particle}></div>
        </div>
      </div>
    </div>
  );
};

export default Loading;
