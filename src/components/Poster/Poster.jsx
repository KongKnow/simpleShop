import styles from "../../styles/Home.module.css"
import BG from "../../images/computer.png"

const Poster = () => {
    return (
        <section className={styles.home}>
            <div className={styles.title}>BIG SALE 20%</div>
            <div className={styles.product}>
                <div className={styles.subtitle}>the bestseller of 2022</div>
                <h1 className={styles.head}>LENNON R2D2 WITH 5090TI</h1>
                <button className={styles.button}>Shop now</button>
            </div>
            <div className={styles.image}>
                <img src={BG} alt='computer'></img>
            </div>
        </section>
    )
}

export default Poster