import AppRoutes from "../Routes/Routes"
import Header from "./Header/Header"
import Footer from "./Footer/Footer"
import Sidebar from "./Sidebar/Sidebar"
import { useDispatch } from "react-redux"
import { useEffect } from "react"
import { fetchCategories } from "../features/categories/categorieSlice"
import { fetchProducts } from "../features/products/productsSlice"
import UserForm from "./User/UserFormCheck"


const App = () => {
    const dispatch = useDispatch()
    
    useEffect(() => {
        dispatch(fetchCategories())
        dispatch(fetchProducts())
    }, [])

    return (
        <div className="app">
            <Header/>
            <UserForm/>
            <div className="container">
                <Sidebar/>
                <AppRoutes/>
            </div>
            <Footer/>
        </div>
    )
}

export default App