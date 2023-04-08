import { createRef, useEffect } from "react";
import styles from "../styles/components/loading.module.css";

export const Loading = () => {
  const bar = createRef<HTMLDivElement>();

  useEffect(() => {
    var width = 1;
    var id = setInterval(loading, 4);
    function loading() {
      if (width >= 100) {
        clearInterval(id);
      } else {
        width++;
        (bar.current as HTMLDivElement).style.width = width + "%";
      }
    }
  }, [bar]);

  return (
    <div className={styles.container}>
      <div ref={bar} className={styles.bar}></div>
    </div>
  );
};
