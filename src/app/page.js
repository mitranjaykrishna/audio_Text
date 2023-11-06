import Image from "next/image";
import styles from "./page.module.css";
import MainContainer from "@/containers/MainContainer";

export default function Home() {
  return (
    <main className={styles.main}>
      <MainContainer />
    </main>
  );
}
