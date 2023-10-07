import { configureStore} from '@reduxjs/toolkit'
import categories from './categories/categorieSlice'
import products from './products/productsSlice'
import singleProduct from './singleProduct/singleProductSlice'
import user from './user/userSlice'

export const store = configureStore({
    reducer: {
        categories,
        products,
        singleProduct,
        user
    },
    devtools: true
})