import { Link } from 'react-router-dom'
import styles from '../../styles/Product.module.css'
import {ROUTES} from '../../utils/routes'
import { useState } from 'react'
import { addItemToCart } from '../../features/user/userSlice'
import {useDispatch} from 'react-redux'

const SIZES = [4, 4.5, 5]

const Product = ({title, price, images, description, id}) => {
    const dispatch = useDispatch()
    const [currentImage, setCurrentImage] = useState(images[0])
    const [currentSize, setSizeImage] = useState()

    return (
        <section className={styles.product}>
            <div className={styles.images}>
                <div className={styles.current}
                style={{backgroundImage: `url(${currentImage})`}}
                />
                <div className={styles['images-list']}>

                    {images && images.map((image, i) => (
                        <div className={styles.image}
                        key={i}
                        style={{backgroundImage: `url(${image})`}}
                        onClick={() => {setCurrentImage(image)}}
                        />
                    ))}
                </div>
            </div>
            <div className={styles.info}>
                    <h1 className={styles.title}>{title}</h1>
                    <div className={styles.price}>
                        {price}$
                    </div>
                    <div className={styles.color}>
                        <span>Color:</span> Green
                    </div>
                    <div className={styles.sizes}>
                        <span>Sizes:</span>
                        <div className={styles.list}>
                            {SIZES.map(size => (
                                <div key={size} onClick={() => setSizeImage(size)} className={`${styles.size} ${currentSize === size ? styles.active: ''}`}>
                                    {size}
                                </div>
                            ))}
                        </div>
                    </div>
                    <p className={styles.description}>{description}</p>
                    <div className={styles.actions}>
                        <button className={styles.add} disabled={!currentSize} onClick={() => {
                            dispatch(addItemToCart({title, price, images, description, currentSize, id}))
                        }}>Add to cart</button>
                        <button className={styles.favorite}>Add to favorites</button>
                    </div>
                    <div className={styles.bottom}>
                        <div></div>
                        <Link to={ROUTES.HOME}>Return to store</Link>
                    </div>
            </div>
        </section>
    )
}


export default Product