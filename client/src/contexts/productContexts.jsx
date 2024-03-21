/* eslint-disable react/prop-types */
import { createContext, useState } from 'react'

export const ProductContext = createContext(null)
export const ProductProvider = (props) => {
    const [mainProducts, setMainProducts] = useState([])
    return (
    <ProductContext.Provider value={{ mainProducts, setMainProducts }}>
        {props.children}
    </ProductContext.Provider>
    )

}