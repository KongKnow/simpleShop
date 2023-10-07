import { useParams } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { useEffect } from "react"
import { fetchSingleProduct } from "../../features/singleProduct/singleProductSlice"
import Product from "./Product"
import Products from "./Products"
import { relatedProducts } from "../../features/products/productsSlice"


const SingleProduct = () => {
    const dispatch = useDispatch()
    const data = useSelector(state => state.singleProduct.singleProduct)
    const products = useSelector(state => state.products.products)
    const related = useSelector(state => state.products.related)
    const {id} = useParams()

    useEffect(() => {
        dispatch(fetchSingleProduct(id))
        
    }, [id])

    useEffect(() => {
        if(data.id && products) {
            dispatch(relatedProducts(data.category.id))
        }
    }, [data,products])

    return (
        <>            
            {!!data.id ? <Product {...data}/> : 'Loading...'}
            <Products products={related} amount={5} title='Related products'></Products> 
        </>
    )
}

export default SingleProduct