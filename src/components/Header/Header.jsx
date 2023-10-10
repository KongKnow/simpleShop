import { Link, useNavigate } from 'react-router-dom'
import styles from '../../styles/Header.module.css'
import {ROUTES} from '../../utils/routes'
import LOGO from '../../images/logo.svg'
import {useDispatch, useSelector} from 'react-redux'
import {formState} from '../../features/user/userSlice'
import { useEffect, useState } from 'react'
import { fetchSearchProducts } from '../../features/products/productsSlice'

const Header = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const currentUser = useSelector(state => state.user.currentUser)
    const cart = useSelector(state => state.user.cart)
    const data = useSelector(state => state.products.searchProducts)
    const [searchValue, setSearchValue] = useState('')
    const [values, setValues] = useState({name: 'Guest', avatar: 'https://preview.redd.it/9kvzgd1jqek51.jpg?auto=webp&s=71cd501e9b1d682d303190d7667565aa25685c3c'})
    const handleClick = () => {
        if(!currentUser) {dispatch(formState(true))}
        else {navigate('/profile')}
    }

    useEffect(() => {
        if(!currentUser) return

        setValues(currentUser)
    }, [currentUser])

    const handleSearch = (e) => {
        setSearchValue(e.target.value)
    }

    return (
        <header className={styles.header}>
            <div className={styles.logo}>
                <Link to={ROUTES.HOME}>
                    <img src={LOGO} alt='logo'/>
                </Link>
            </div>

            <div className={styles.info}>
                <div className={styles.user} onClick={handleClick}>
                    <div className={styles.avatar} style={{backgroundImage: `url(${values.avatar})`}}>
                        
                    </div>
                    <div className={styles.username}>{values.name}</div>
                </div>
                <form className={styles.form}>
                <div className={styles.icon}>
                    <svg className="icon">
                        <use xlinkHref={`${process.env.PUBLIC_URL}/sprite.svg#search`} />
                    </svg>
                </div>
                <div className={styles.input}>
                    <input name='search' 
                        type='search' 
                        placeholder='Search for anything...' 
                        autoComplete='off'
                        onChange={(e) => {
                            handleSearch(e)
                            dispatch(fetchSearchProducts(e.target.value))
                        }}
                        value={searchValue}
                    />
                </div>


                {searchValue && <div className={styles.box}>
                    {false ? 'Loading' : !data.length ? 'No results' : (
                        data.map(({title, images, id}, i) => {
                            return (
                                <Link className={styles.item} onClick={() => setSearchValue('')} to={`/products/${id}`} key={i}>
                                    <div className={styles.image}
                                    style={{backgroundImage: `url(${images[0]})`}}>
                                    </div>
                                    <div className={styles.title}>{title}</div>
                                </Link>
                            )
                        })
                    )}
                    </div>}
            </form>

            <div className={styles.account}>
                <Link to={ROUTES.HOME} className={styles.favorites}>
                    <svg className={styles["icon-fav"]}>
                        <use xlinkHref={`${process.env.PUBLIC_URL}/sprite.svg#heart`} />
                    </svg>
                </Link>
                <Link to={ROUTES.CART} className={styles.cart}>
                    <svg className={styles["icon-cart"]}>
                        <use xlinkHref={`${process.env.PUBLIC_URL}/sprite.svg#bag`} />
                    </svg>
                    <span className={styles.count}>{cart.length}</span>
                </Link>
            </div>
            </div>
        </header>
    )
}

export default Header