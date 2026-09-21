import { useEffect, useRef, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useStore } from '../context/StoreContext';
import type { Product } from '../data/types';
import { fetchProductById } from '../utils/api';
import Stars from './ProductStars';
import PriceText from './ProductPriceText';

function ProductDetail() {
    const { id } = useParams();
    const { addToCart, cart, removeFromCart } = useStore();
    const navigate = useNavigate()
    const [zoomOrigin, setZoomOrigin] = useState({ x: 50, y: 50 });
    const [product, setproduct] = useState<Product | null>(null);
    const firstFetch = useRef(true)

    useEffect(() => {
        if (firstFetch.current) {
            (async () => {
                const res = await fetchProductById(id ?? '');
                if(!res) {
                    navigate('/');
                    return;
                }
                setproduct(res.product);
            })()
            firstFetch.current = false;
        }
    }, [id])

    const handleZoom = (event: React.MouseEvent<HTMLDivElement>) => {
        const rect = event.currentTarget.getBoundingClientRect();
        const x = ((event.clientX - rect.left) / rect.width) * 100;
        const y = ((event.clientY - rect.top) / rect.height) * 100;
        setZoomOrigin({ x, y });
    };

    const thumbnails = typeof product?.image === 'string' ? [product.image] : product?.image || [];

    return (
        <>
            <main className="mx-auto max-w-[1500px] px-3 py-6 sm:px-5 lg:px-6">
                <div className="mb-5 flex items-center justify-start">
                    <Link to="/" className="text-sm font-medium text-[#007185] hover:text-[#c7511f]">
                        ← Back to results
                    </Link>
                </div>

                <div className="rounded-md border border-[#d5d9d9] bg-white p-4 shadow-sm sm:p-6">
                    <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
                        <div className="space-y-4">
                            <div className="flex gap-3">
                                <div className="flex w-[88px] flex-col gap-2">
                                    {thumbnails.map((thumb, index) => (
                                        <button
                                            key={`${thumb}-${index}`}
                                            type="button"
                                            aria-label={`View product image ${index + 1}`}
                                            className="overflow-hidden rounded-md border border-[#d5d9d9] bg-white p-1 shadow-sm hover:border-[#007185]"
                                        >
                                            <img src={thumb} alt={`${product?.title} view ${index + 1}`} className="h-20 w-full object-cover" />
                                        </button>
                                    ))}
                                </div>

                                <div
                                    onMouseMove={handleZoom}
                                    className="group relative flex min-h-[480px] flex-1 items-center justify-center overflow-hidden rounded-md border border-[#d5d9d9] bg-[#f7f7f7]"
                                >
                                    <img
                                        src={product?.image}
                                        alt={product?.title}
                                        className="h-full w-full object-contain transition-transform duration-200 group-hover:scale-[1.8]"
                                        style={{ transformOrigin: `${zoomOrigin.x}% ${zoomOrigin.y}%` }}
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="space-y-5">
                            <div>
                                <div className="mb-2 flex items-center gap-2 text-[12px] uppercase tracking-wide text-[#565959]">
                                    <span className="rounded-full border border-[#d5d9d9] px-2 py-1">{product?.category ?? 'Featured'}</span>
                                </div>
                                <h1 className="text-2xl font-normal leading-tight text-[#0f1111] sm:text-[28px]">
                                    {product?.title}
                                </h1>
                                <div className="mt-3">
                                    <Stars rate={product?.rating?.rate ?? 0} />
                                </div>
                            </div>

                            <div className="h-px bg-[#eaeded]" />

                            <div className="rounded-md border border-[#d5d9d9] bg-[#fafafa] p-4">
                                <div className="flex items-center gap-2 text-sm text-[#007185]">
                                    <span className="font-medium">Price:</span>
                                    <span className="text-[#565959]">with coupon</span>
                                </div>
                                <PriceText price={product?.price || 0} />
                                <p className="mt-2 text-sm text-[#565959]">Free Returns</p>
                                <p className="mt-1 text-sm text-[#565959]">Free delivery for Prime members</p>
                            </div>

                            <div className="space-y-3">
                                {(cart[id ?? '']?.quantity || 0) < 1 ? <button
                                    type="button"
                                    onClick={() => {
                                        addToCart(product!)
                                    }}
                                    className="w-full rounded-full bg-[#ffd814] px-4 py-3 text-base font-medium text-[#0f1111] transition hover:bg-[#f7ca00]"
                                >
                                    Add to cart
                                </button> : <div className="flex items-center gap-2">
                                    <button className="rounded-full w-10 h-10 bg-[#d5d9d9] flex items-center justify-center p-2 text-[#0f1111] hover:bg-[#c8c8c8] cursor-pointer" onClick={() => {
                                        removeFromCart(product!)
                                    }}>
                                        -
                                    </button>
                                    {cart[id ?? '']?.quantity}
                                    <button className="rounded-full w-10 h-10 bg-[#d5d9d9] flex items-center justify-center p-2 text-[#0f1111] hover:bg-[#c8c8c8] cursor-pointer" onClick={() => {
                                        addToCart(product!)
                                    }} >
                                        +
                                    </button>
                                </div>
                                }
                                <button
                                    type="button"
                                    className="w-full rounded-full bg-[#ffa41c] px-4 py-3 text-base font-medium text-[#0f1111] transition hover:bg-[#ff8f00]"
                                >
                                    Buy Now
                                </button>
                            </div>

                            <div className="rounded-md border border-[#d5d9d9] bg-[#f7fafa] p-4 text-sm text-[#0f1111]">
                                <div className="mb-2 flex items-center gap-2 font-medium">
                                    <span className="inline-flex h-2.5 w-2.5 rounded-full bg-[#008a00]" />
                                    In Stock
                                </div>
                                <ul className="space-y-2 text-[#565959]">
                                    <li>• Secure checkout and easy returns</li>
                                    <li>• Premium materials with durable everyday use</li>
                                    <li>• Ships from Amazon with tracking available</li>
                                </ul>
                            </div>
                        </div>
                    </div>

                    <div className="mt-8 rounded-md border border-[#d5d9d9] bg-[#fafafa] p-4 sm:p-5">
                        <h2 className="text-xl font-bold text-[#0f1111]">About this item</h2>
                        <p className="mt-3 whitespace-pre-line text-[15px] leading-7 text-[#333]">
                            {product?.description}
                            {'\n\n'}Designed to deliver a premium experience, this product combines everyday practicality with a refined look and feel. Crafted for comfort, durability, and reliable performance, it’s made to fit seamlessly into your routine.
                        </p>
                    </div>
                </div>
            </main>
        </>
    );
}

export default ProductDetail;