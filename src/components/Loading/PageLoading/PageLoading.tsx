import styles from "./PageLoading.module.css";

function PageLoading() {
  return (
    <div className={styles.overlay}>
      <div className={styles.loader}></div>
    </div>
  );
}

export default PageLoading;
