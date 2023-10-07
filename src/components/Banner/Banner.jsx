import styles from "../../styles/Home.module.css"
import BG from "../../images/banner.png"

const Banner = () => {
    return (
        <section className={styles.banner}>
            <div className={styles.left}>
                <p className={styles.content}>NEW YEAR
                <span>SALE</span>
                <button className={styles.more}>See more</button>
                </p>
            </div>
            <div className={styles.right} style={{backgroundImage: `url(${BG})`}}>
                <p className={styles.discount}>
                    save up to <span>50%</span> off
                </p>
            </div>
        </section>
    )
}

export default Banner