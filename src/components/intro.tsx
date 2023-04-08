/* eslint-disable @next/next/no-img-element */
import styles from "../styles/components/intro.module.css";
import { Loading } from "./loading";

interface IntroProps {
  active: boolean;
}

export const Intro: React.FC<IntroProps> = ({ active }) => {
  if (active) {
    return (
      <>
        <div className={styles.wrapper}>
          <img src="logo.svg" alt="logo" />
          <Loading></Loading>
        </div>
      </>
    );
  } else {
    return <></>;
  }
};
