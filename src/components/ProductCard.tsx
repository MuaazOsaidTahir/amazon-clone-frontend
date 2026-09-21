import type { Product } from '../data/types';
import { useStore } from '../context/StoreContext';
import { memo } from 'react';
import { Link } from 'react-router-dom';
import Stars from './ProductStars';


function ProductCard({ product }: { product: Product }) {
  const { addToCart, cart, removeFromCart } = useStore();

  return (
    <div className="flex h-full flex-col rounded-sm bg-white p-4 shadow-sm">
      <Link to={`/${product._id}`} className="group block">
        <div className="mb-3 flex h-44 items-center justify-center bg-white">
          <img
            src={product?.image}
            alt={product?.title}
            className="max-h-44 w-full object-contain transition-transform duration-200 group-hover:scale-[1.04]"
          />
        </div>
      </Link>
      <Link to={`/${product._id}`} className="block">
        <h3 className="line-clamp-2 min-h-[2.5rem] text-[15px] leading-snug hover:text-[#c7511f]">
          {product?.title}
        </h3>
      </Link>
      <Stars rate={product?.rating?.rate || 0} />
      <p className="mt-0.5 text-[12px] text-[#565959]">
        {product?.rating?.count?.toLocaleString() || 0} ratings
      </p>
      <p className="mt-2 flex items-start text-[#0f1111]">
        <span className="mt-1 text-[12px]">$</span>
        <span className="text-[26px] font-medium leading-none">{product?.price?.toFixed(2)?.split('.')[0] || '0'}</span>
        <span className="mt-1 text-[12px]">{product?.price?.toFixed(2)?.split('.')[1] || '00'}</span>
      </p>
      <p className="mt-2 line-clamp-2 flex-1 text-[13px] text-[#565959]">
        {product.description}
      </p>
      {(cart[product._id ?? '']?.quantity || 0) < 1 ? <button
        type="button"
        onClick={() => {
          addToCart(product!)
        }}
        className="w-full rounded-full bg-[#ffd814] px-4 py-3 cursor-pointer text-base font-medium text-[#0f1111] transition hover:bg-[#f7ca00]"
      >
        Add to cart
      </button> : <div className="flex items-center gap-2">
        <button className="rounded-full w-10 h-10 bg-[#d5d9d9] flex items-center justify-center p-2 text-[#0f1111] hover:bg-[#c8c8c8] cursor-pointer" onClick={() => {
          removeFromCart(product!)
        }}>
          -
        </button>
        {cart[product._id ?? '']?.quantity}
        <button className="rounded-full w-10 h-10 bg-[#d5d9d9] flex items-center justify-center p-2 text-[#0f1111] hover:bg-[#c8c8c8] cursor-pointer" onClick={() => {
          addToCart(product!)
        }} >
          +
        </button>
      </div>
      }
    </div>
  );
}

export default memo(ProductCard);