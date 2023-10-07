import { Link } from "react-router-dom"
import styles from "../../styles/Products.module.css"
import { v4 as uuidv4 } from 'uuid'

const Products = ({title, products =[], style = {}, amount}) => {
    const list = products.filter((_, i) => i < amount)
    
    return (
        <section className={styles.products} style={style}>
            {title && <h2>{title}</h2>}
            <div className={styles.list}>
                {list.map(({id, images, title, category: {name: cat}, price}) => (
                    <Link to={`/products/${id}`} key={uuidv4()}>
                        <div className={styles.image} style={{backgroundImage: `url(${images[0]})`}}></div>
                        <div className={styles.wrapper}>
                            <h3 className={styles.title}>{title}</h3>
                            <div className={styles.cat}>{cat}</div>
                            <div className={styles.info}>
                                <div className={styles.prices}>
                                    <div className={styles.price}>{price}$</div>
                                    <div className={styles.oldPrice}>{Math.floor(price * 0.8)}$</div>
                                </div>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
        </section>
    )
}

export default Products