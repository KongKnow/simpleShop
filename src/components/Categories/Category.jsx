import {useParams} from 'react-router-dom'
import styles from '../../styles/Category.module.css'
import { useEffect, useState } from 'react'
import Products from '../Products/Products'
import { fetchProductsById } from '../../features/categories/categorieSlice'
import {useDispatch, useSelector} from 'react-redux'


const Category = () => {
    const {id} = useParams()
    const dispatch = useDispatch()
    const {productsByCategory, loading, error} = useSelector(state => state.categories)

    const [stop, setStop] = useState(false)
    const [items, setItems] = useState([])
    const [price_min, setPrice_min] = useState(0)
    const [price_max, setPrice_max] = useState(0)
    const [offset, setOffset] = useState(0)

    useEffect(() => {
        if(!id) return

        setItems([])
        setStop(false)
        setOffset(0)
        dispatch(fetchProductsById({id, price_min, price_max, offset: 0}))
        
    }, [id, price_min, price_max])

    
    useEffect(() => {
        if(!productsByCategory.length) return setStop(true)

        setItems(items => [...items, ...productsByCategory])
        
    }, [productsByCategory])

    
    const handleChange = (e) => {
        e.preventDefault()
        setItems([])
        setStop(false)
        setOffset(0)
        switch (e.target.name) {
            case 'price_min':
                setPrice_min(e.target.value)
                if(!price_max) setPrice_max(Math.max(...productsByCategory.map(item => item.price)))
                break 
            case 'price_max':
                setPrice_max(e.target.value)
                if(!price_min) setPrice_min(1)
                break 
        }
    }

    const handleReset = () => {
        setItems([])
        setStop(false)
        setOffset(0)
    }

    return (
        <section className={styles.wrapper}>
            {productsByCategory.length !== 0 ? <h2 className={styles.title}>{productsByCategory[0].category.name}</h2> : <h2 className={styles.title}>Category</h2>}
            <form className={styles.filters} >
                <div className={styles.filter}>
                    <input type='number'
                    name='price_min'
                    onChange={(e) => {handleChange(e)}}
                    placeholder='Price min'
                    value={price_min}
                    />
                </div>
                <div className={styles.filter}>
                    <input type='number'
                    name='price_max'
                    onChange={(e) => {handleChange(e)}} 
                    placeholder='0'
                    value={price_max}
                    />
                </div>

                <button type='submit' hidden/>
            </form>
            
            {loading ? (<div className='preloader'>Loading...</div>) : error || !items.length ? (
                <div className={styles.back}>
                    <span>No Results</span>
                    <button onClick={handleReset}>Reset</button>
                </div>
            ) : (
                <Products title='' products={items} styles={{padding: 0}} amount={items.length}/>
            )}

            {stop ? null : (
                 <div className={styles.more}>
                 <button onClick={() => {
                    setOffset(offset => offset + 10)
                    dispatch(fetchProductsById({id, price_min, price_max, offset}))
                }} >See more</button>
             </div>
            )}
        </section>
    )
}

export default Category