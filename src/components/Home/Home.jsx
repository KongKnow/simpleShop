import { useDispatch, useSelector } from "react-redux"
import Poster from "../Poster/Poster"
import Products from "../Products/Products"
import Categories from '../Categories/Categories'
import Banner from "../Banner/Banner"
import { useEffect } from "react"
import { filterByPrice } from "../../features/products/productsSlice"

const Home = () => {
    const dispatch = useDispatch()
    const products = useSelector(state => state.products.products)
    const filtered = useSelector(state => state.products.filtered)
    const categories = useSelector(state => state.categories.categories)

    useEffect(() => {
        if (!products.length) return

        dispatch(filterByPrice(100))
    }, [dispatch, products.length])

    return (
        <>
            <Poster></Poster>
            <Products products={products} amount={5} title='Trending'></Products>
            <Categories products={categories} amount={5} title='Trending'></Categories>
            <Banner/>
            <Products products={filtered} amount={5} title='Trending'></Products>
        </>
    )
}

export default Home