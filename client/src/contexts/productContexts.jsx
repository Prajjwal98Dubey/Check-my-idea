/* eslint-disable react/prop-types */
import { createContext, useState } from 'react'

export const ProductContext = createContext(null)
export const ProductProvider = (props) => {
    const [mainProducts, setMainProducts] = useState([])
    const[searchBarModal,setSearchBarModal] = useState(false)
    return (
    <ProductContext.Provider value={{ mainProducts, setMainProducts ,searchBarModal,setSearchBarModal}}>
        {props.children}
    </ProductContext.Provider>
    )

}