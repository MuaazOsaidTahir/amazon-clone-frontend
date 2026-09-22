import { memo, useEffect, useRef, useState } from 'react'
import ProductCard from './ProductCard'
import Loader from './Loader'
import { fetchProducts } from '../utils/api'
import type { Product } from '../data/types'
import { useNavigate } from 'react-router-dom'

function CategoryProducts({ category }: { category: string }) {
    const [products, setproducts] = useState<Product[]>([])
    const [ _, setnextCursor] = useState<any>({})
    const firstFetch = useRef(true)
    const navigate = useNavigate()
    const [isLoading, setisLoading] = useState(false)

    useEffect(() => {
        if (firstFetch.current) {
            (async () => {
                try {
                    setisLoading(true)
                    const res = await fetchProducts(category, 4)
                    setproducts(res?.products)
                    setnextCursor(res?.cursor)
                } catch (error) {
                    console.error("Error fetching products:", error);
                } finally {
                    setisLoading(false)
                }
            })()
            firstFetch.current = false
        }
    }, [])

    return (
        <div className="space-y-8" id={category} >
            <section className="rounded-sm border border-[#eaeded] bg-[#f9fafb] p-3 sm:p-4">
                <div className="mb-3 flex items-center justify-between gap-3">
                    <h3 className="text-lg font-bold text-[#0f1111]">{category?.toUpperCase()}</h3>
                    <button
                        type="button"
                        onClick={() => {
                            navigate(`/category/${category}`)
                        }}
                        className="text-[13px] font-medium text-[#007185] hover:text-[#0f1111] cursor-pointer"
                    >
                        Shop all
                    </button>
                </div>

                {isLoading ? (
                    <div className="flex min-h-[220px] items-center justify-center">
                        <Loader text={`Loading ${category}...`} size="md" />
                    </div>
                ) : (
                    <div className="flex gap-4 overflow-x-auto pb-2 [scrollbar-width:thin] [scrollbar-color:#d5d9d9_transparent]">
                        {products?.map((product) => (
                            <div key={product._id} className="w-[240px] shrink-0 sm:w-[270px] lg:w-[350px]">
                                <ProductCard product={product} />
                            </div>
                        ))}
                    </div>
                )}
            </section>
        </div>
    )
}

export default memo(CategoryProducts)