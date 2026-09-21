import { useEffect, useRef, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useStore } from '../context/StoreContext';
import type { Product } from '../data/types';
import Stars from './ProductStars';
import PriceText from './ProductPriceText';
import { fetchProducts } from '../utils/api';
import Loader from './Loader';

function EachCategoryProducts() {
    const { cart, addToCart, removeFromCart } = useStore();
    const [selectedPrice, setSelectedPrice] = useState('all');
    const [selectedRating, setSelectedRating] = useState('all');
    // const [selectedDelivery, setSelectedDelivery] = useState('all');
    const { category } = useParams();
    const navigate = useNavigate()
    const [products, setProducts] = useState<Product[]>([]);
    const firstFetch = useRef(true)
    const [cursor, setcursor] = useState<any>({})
    const [hasMore, sethasMore] = useState(false)
    const [isLoading, setisLoading] = useState(false)
    const [isPaginationLoading, setisPaginationLoading] = useState(false)

    const applyFilters = async (limit: number = 10, isPagination?: boolean) => {
        if (isPagination) {
            setisPaginationLoading(true);
        } else {
            setisLoading(true);
        }
        const body = { filters: { price: selectedPrice, rating: selectedRating }, cursor: cursor }
        try {
            const res = await fetchProducts(category ?? '', limit, body);
            if(!res) {
                navigate('/');
                return;
            }
            if(isPagination) {
                setProducts((prev) => [...prev, ...res.products]);
            } else {
                setProducts(res.products);
            }
            setcursor(res.nextCursor);
            sethasMore(res.hasMore);
        } catch (error) {
            console.error("Error fetching products:", error);
        } finally {
            setisLoading(false);
            setisPaginationLoading(false);
        }
    }

    useEffect(() => {
        if (firstFetch.current) applyFilters(2);
        firstFetch.current = false;
    }, [])

    return (
        <main className="mx-auto max-w-[1600px] px-4 py-6 sm:px-6">
            <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
                <div>
                    <p className="text-[12px] font-medium uppercase tracking-[0.16em] text-[#565959]">Shop by category</p>
                    <h1 className="mt-1 text-3xl font-bold text-[#0f1111]">{category?.toUpperCase()}</h1>
                </div>
                <div className="rounded-full border border-[#d5d9d9] bg-white px-3 py-2 text-sm text-[#0f1111] shadow-sm">
                    {products.length} result{products.length === 1 ? '' : 's'}
                </div>
            </div>

            <div className="grid gap-6 xl:grid-cols-[260px_minmax(0,1fr)_320px]">
                <aside className="xl:sticky xl:top-24 xl:self-start rounded-md border border-[#d5d9d9] bg-white p-4 shadow-sm">
                    <div className="mb-5">
                        <h2 className="text-lg font-bold text-[#0f1111]">Filters</h2>
                    </div>

                    <div className="space-y-6">
                        <div>
                            <h3 className="mb-3 text-sm font-bold uppercase tracking-wide text-[#0f1111]">Price</h3>
                            <div className="space-y-2 text-sm text-[#0f1111]">
                                {[
                                    ['all', 'All prices'],
                                    ['lt_50', 'Under $50'],
                                    ['gte_50-lte_100', '$50 - $100'],
                                    ['gte_100', '$100+'],
                                ].map(([value, label]) => (
                                    <label key={value} className="flex cursor-pointer items-center gap-2">
                                        <input
                                            type="radio"
                                            name="price"
                                            checked={selectedPrice === value}
                                            onChange={() => setSelectedPrice(value)}
                                            className="h-4 w-4 accent-[#f59e0b]"
                                        />
                                        <span>{label}</span>
                                    </label>
                                ))}
                            </div>
                        </div>

                        <div>
                            <h3 className="mb-3 text-sm font-bold uppercase tracking-wide text-[#0f1111]">Customer rating</h3>
                            <div className="space-y-2 text-sm text-[#0f1111]">
                                {[
                                    ['all', 'All ratings'],
                                    ['gte_4', '4.0 & up'],
                                    ['gte_4.5', '4.5 & up'],
                                ].map(([value, label]) => (
                                    <label key={value} className="flex cursor-pointer items-center gap-2">
                                        <input
                                            type="radio"
                                            name="rating"
                                            checked={selectedRating === value}
                                            onChange={() => setSelectedRating(value)}
                                            className="h-4 w-4 accent-[#f59e0b]"
                                        />
                                        <span>{label}</span>
                                    </label>
                                ))}
                            </div>
                        </div>
                        <button
                            type="button"
                            onClick={() => applyFilters(2)}
                            className="w-full cursor-pointer rounded-full bg-[#ffd814] px-3 py-2.5 text-sm font-medium text-[#0f1111] hover:bg-[#f7ca00]"
                        >
                            Apply Filters
                        </button>
                    </div>
                </aside>

                <section className="space-y-4">
                    {isLoading ? <Loader size='lg' /> : products.length === 0 ? (
                        <div className="flex min-h-75 items-center justify-center rounded-md border border-dashed border-[#d5d9d9] bg-white text-[#565959] shadow-sm">
                            No products match these filters.
                        </div>
                    ) : (
                        products.map((product) => {
                            const quantityInCart = cart[product._id]?.quantity ?? 0;

                            return (
                                <div
                                    key={product._id}
                                    className="grid gap-4 rounded-md border border-[#d5d9d9] bg-white p-4 shadow-sm md:grid-cols-[180px_minmax(0,1fr)_180px]"
                                >
                                    <Link to={`/${product._id}`} state={{ product }} className="group overflow-hidden rounded-md bg-[#f7f7f7]">
                                        <img
                                            src={product.image}
                                            alt={product.title}
                                            className="h-45 w-full object-contain transition-transform duration-200 group-hover:scale-[1.04]"
                                        />
                                    </Link>

                                    <div className="min-w-0">
                                        <Link to={`/${product._id}`} state={{ product }} className="block">
                                            <h3 className="text-lg font-medium text-[#0f1111] hover:text-[#c7511f]">{product.title}</h3>
                                        </Link>

                                        <div className="mt-2 flex items-center gap-2">
                                            <Stars rate={product.rating?.rate ?? 0} />
                                            <span className="text-[13px] text-[#565959]">
                                                {product.rating?.count?.toLocaleString() ?? 0} ratings
                                            </span>
                                        </div>

                                        <p className="mt-3 line-clamp-3 text-[14px] leading-6 text-[#565959]">{product.description}</p>
                                    </div>

                                    <div className="flex flex-col justify-between gap-4">
                                        <div>
                                            <PriceText price={product.price} />
                                        </div>

                                        <div className="space-y-2">
                                            {quantityInCart > 0 ? (
                                                <div className="flex items-center justify-between rounded-full border border-[#d5d9d9] bg-[#f7fafa] px-2 py-1.5">
                                                    <button
                                                        type="button"
                                                        onClick={() => removeFromCart(product)}
                                                        className="flex h-8 w-8 items-center justify-center rounded-full bg-[#d5d9d9] text-lg font-medium text-[#0f1111] hover:bg-[#c8c8c8]"
                                                    >
                                                        −
                                                    </button>
                                                    <span className="px-2 text-sm font-medium text-[#0f1111]">{quantityInCart}</span>
                                                    <button
                                                        type="button"
                                                        onClick={() => addToCart(product)}
                                                        className="flex h-8 w-8 items-center justify-center rounded-full bg-[#d5d9d9] text-lg font-medium text-[#0f1111] hover:bg-[#c8c8c8]"
                                                    >
                                                        +
                                                    </button>
                                                </div>
                                            ) : (
                                                <button
                                                    type="button"
                                                    onClick={() => addToCart(product)}
                                                    className="w-full rounded-full bg-[#ffd814] px-3 py-2.5 text-sm font-medium text-[#0f1111] hover:bg-[#f7ca00]"
                                                >
                                                    Add to cart
                                                </button>
                                            )}

                                            <button
                                                type="button"
                                                className="w-full rounded-full border border-[#d5d9d9] bg-white px-3 py-2 text-sm font-medium text-[#0f1111] hover:bg-[#f7fafa]"
                                            >
                                                Add to Wishlist
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            );
                        })
                    )}
                    {hasMore && (
                        <button
                            type="button"
                            disabled={isPaginationLoading}
                            onClick={() => applyFilters(2, true)}
                            className="w-full cursor-pointer rounded-full border border-[#d5d9d9] bg-white px-3 py-2 text-sm font-medium text-[#0f1111] hover:bg-[#f7fafa]"
                        >
                            {isPaginationLoading ? 'Loading...' : 'Load More'}
                        </button>
                    )}
                </section>
                {/* 
                <aside className="rounded-md border border-[#d5d9d9] bg-white p-4 shadow-sm">
                    <div className="mb-4 flex items-center justify-between">
                        <h2 className="text-lg font-bold text-[#0f1111]">Basket</h2>
                        <span className="rounded-full bg-[#f7fafa] px-2 py-1 text-xs font-medium text-[#0f1111]">
                            {basketItems.reduce((sum, item) => sum + item.quantity, 0)} items
                        </span>
                    </div>

                    <div className="space-y-3">
                        {basketItems.length === 0 ? (
                            <div className="rounded-md border border-dashed border-[#d5d9d9] bg-[#fafafa] p-4 text-sm text-[#565959]">
                                Your basket is empty.
                            </div>
                        ) : (
                            basketItems.map(({ product, quantity }) => (
                                <div key={product.id} className="flex gap-3 rounded-md border border-[#eaeded] bg-[#fafafa] p-2.5">
                                    <img src={product.image} alt={product.title} className="h-16 w-16 rounded-md object-cover" />
                                    <div className="min-w-0 flex-1">
                                        <p className="line-clamp-2 text-sm font-medium text-[#0f1111]">{product.title}</p>
                                        <p className="mt-1 text-xs text-[#565959]">Qty: {quantity}</p>
                                        <p className="mt-1 text-sm font-medium text-[#0f1111]">
                                            ${(Number(product.price ?? 0) * quantity).toFixed(2)}
                                        </p>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>

                    <div className="mt-5 border-t border-[#eaeded] pt-4 text-sm text-[#0f1111]">
                        <div className="mb-2 flex items-center justify-between">
                            <span>Subtotal</span>
                            <span>${subtotal.toFixed(2)}</span>
                        </div>
                        <div className="mb-2 flex items-center justify-between">
                            <span>Shipping</span>
                            <span>{subtotal > 0 ? 'Free' : '$0.00'}</span>
                        </div>
                        <div className="mb-4 flex items-center justify-between text-base font-bold">
                            <span>Total</span>
                            <span>${subtotal.toFixed(2)}</span>
                        </div>
                        <button
                            type="button"
                            className="w-full rounded-full bg-[#ffd814] px-4 py-3 text-sm font-medium text-[#0f1111] hover:bg-[#f7ca00]"
                        >
                            Proceed to checkout
                        </button>
                    </div>
                </aside> */}
            </div>
        </main>
    );
}

export default EachCategoryProducts;