import React from 'react';

import styles from '../../styles/card-terminal.module.css';

const CardService = () => {
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h3 className={styles.title}>niico.dev</h3>
        <div className={styles.controls}>
          <span className={`${styles.control} ${styles.close}`} />
          <span className={`${styles.control} ${styles.minimize}`} />
          <span className={`${styles.control} ${styles.maximize}`} />
        </div>
      </div>
      <div className={styles.content}>
        <p className={styles.text}>
          Ofrezco un desarrollo frontend utilizando tecnologías modernas como
          React, Next.js y TypeScript. Me dedico a crear aplicaciones web
          escalables, optimizadas y con una experiencia de usuario impecable. Mi
          enfoque es en el desarrollo limpio y eficiente, siempre con atención
          al detalle y las mejores prácticas.
          <span></span>
        </p>
      </div>
    </div>
  );
};

export default CardService;
