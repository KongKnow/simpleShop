import { useSelector } from 'react-redux'
import styles from '../../styles/Sidebar.module.css'
import { NavLink } from 'react-router-dom'

const Sidebar = () => {
    const categories = useSelector((state) => state.categories.categories)

    const categoriesRender = categories.map(({name, id}) => {
        if (id < 6) {
            return (
                <li key={id}>
                    <NavLink className={({ isActive}) => `${styles.link} ${isActive ? styles.active : ''}`} to={`/categories/${id}`}>
                        {name}
                    </NavLink>
                </li>
            )
        } else {
            return false
        }
    })
    return (
        <section className={styles.sidebar}>
            <div className={styles.title}>
                CATEGORIES
            </div>
            <nav className={styles.menu}>
                {categoriesRender}
            </nav>

            <div className={styles.footer}>
                <a href='/help' target='__blank' className={styles.link}>
                    Help
                </a>
                <a
                    href="/terms"
                    target="_blank"
                    className={styles.link}
                    style={{ textDecoration: "underline" }}
                    >
                    Terms & Conditions
                </a>
            </div>
        </section>
    )
}

export default Sidebar