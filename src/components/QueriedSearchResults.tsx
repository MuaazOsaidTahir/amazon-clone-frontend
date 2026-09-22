import { useNavigate } from 'react-router-dom';
import type { SearchedProducts } from '../data/types';
import { memo } from 'react';
import Loader from './Loader';

type QueriedSearchResultsProps = {
    products: SearchedProducts[];
    query: string;
    isLoading?: boolean;
    onClose?: () => void;
};

function QueriedSearchResults({
    products,
    query,
    onClose,
    isLoading
}: QueriedSearchResultsProps) {
    const navigate = useNavigate();
    return (
        <div className="relative z-50 w-full overflow-hidden rounded-md border border-[#d5d9d9] bg-white text-[#0f1111] shadow-xl md:absolute md:left-0 md:right-0 md:top-[calc(100%+8px)]">
            <div className="border-b border-[#eaeded] bg-[#f7fafa] px-3 py-2 text-[12px] font-medium text-[#565959]">
                Results for “{query}”
            </div>

            {isLoading ? (
                <div className="flex min-h-[120px] items-center justify-center py-4">
                    <Loader size="md" />
                </div>
            ) : products.length > 0 ? (
                <ul className="max-h-[260px] overflow-y-auto md:max-h-[320px]">
                    {products.map((product) => {
                        return (
                            <div key={product.category}>
                                <li className="ml-2 border-b border-[#eaeded] py-1 text-[11px] font-bold tracking-[0.08em] text-[#565959] last:border-b-0">
                                    {product.category.toUpperCase()}
                                </li>
                                {product.products.map((item) => (
                                    <li key={item._id} className="border-b border-[#eaeded] last:border-b-0">
                                        <button
                                            type="button"
                                            onClick={() => {
                                                onClose?.();
                                                navigate(`/${item._id}`);
                                            }}
                                            className="flex w-full cursor-pointer items-center gap-3 px-3 py-2 text-left transition hover:bg-[#f7fafa]"
                                        >
                                            <img
                                                src={item.image}
                                                alt={item.title}
                                                className="h-12 w-12 rounded-md object-cover sm:h-14 sm:w-14"
                                            />

                                            <div className="min-w-0 flex-1">
                                                <p className="line-clamp-2 text-[13px] font-medium text-[#0f1111] sm:text-[14px]">
                                                    {item.title}
                                                </p>
                                                <div className="mt-1 flex items-center gap-2 text-[11px] text-[#565959] sm:text-[12px]">
                                                    <span>{item.category ?? 'General'}</span>
                                                    <span>•</span>
                                                    <span>${Number(item.price ?? 0).toFixed(2)}</span>
                                                </div>
                                            </div>
                                        </button>
                                    </li>
                                ))}
                            </div>
                        );
                    })}
                </ul>
            ) : (
                <div className="flex min-h-[120px] items-center justify-center py-4 text-[13px] text-[#565959]">
                    No results found
                </div>
            )}

            <div className="border-t border-[#eaeded] bg-[#f7fafa] px-3 py-2 text-right">
                <button
                    type="button"
                    onClick={() => onClose?.()}
                    className="text-[12px] font-medium text-[#007185] hover:text-[#c7511f]"
                >
                    Close results
                </button>
            </div>
        </div>
    );
}

export default memo(QueriedSearchResults);