import React from "react"
import styles from "./QuizContainer.module.css"

type QuizContainerProps = {
  children: React.ReactNode
}

const QuizContainer: React.FC<QuizContainerProps> = ({ children }) => {
  return (
    <section className={styles.quiz_data_container}>
      <article>{children}</article>
      <div className={styles.padding} />
    </section>
  )
}

export default QuizContainer
