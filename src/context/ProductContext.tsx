import { createContext, useContext } from "react"
import { ProductType } from "./ProductType"

// Create context with default value 'Unknown'
export const ProductContext = createContext<ProductType>(ProductType.Unknown)

// Custom hook to access current product type
export const useProduct = () => useContext(ProductContext)
