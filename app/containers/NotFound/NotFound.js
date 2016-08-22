import React from 'react';

export default function NotFound() {
  const styles = require('./NotFound.css');
  return (
    <div className="container">
      <h1 className={styles.header}>404</h1>
      <h1 className={styles.subheader}>Страница не найдена</h1>
      <p className={styles.text}>
        > rm -rf katakana.xyz <br />
        > access denied<br />
        > exit<br />
      </p>
    </div>
  );
}
