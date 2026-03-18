import Image from "next/image";
import styles from "./page.module.css";
// 1. Importing the Link component for navigation
import Link from "next/link"; 

export default function Home() {
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <Image
          className={styles.logo}
          src="/next.svg"
          alt="Next.js logo"
          width={100}
          height={20}
          priority
        />
        <div className={styles.intro}>
          <h1>GAVRIEL BENIAGUEV</h1>

          <p>Here your app should come....</p>
          
          <Link href="/system/reviews">
            <button style={{ padding: "10px 20px", cursor: "pointer" }}>
              Go to Reviews
            </button>
          </Link>

        </div>
      </main>
    </div>
  );
}