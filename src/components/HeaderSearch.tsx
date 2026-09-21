import { useEffect, useState } from 'react'
import type { SearchedProducts } from '../data/types';
import QueriedSearchResults from './QueriedSearchResults';
import { useStore } from '../context/StoreContext';
import { fetchProductsBySearch } from '../utils/api';
import { SearchIcon } from '../utils/Icons';

let searchTimeout: any = null;
function HeaderSearch() {
    const [query, setQuery] = useState('');
    const { allCategories } = useStore()
    const [queriedProducts, setQueriedProducts] = useState<SearchedProducts[]>([])
    const [showSearchResults, setShowSearchResults] = useState(false);
    const [isLoading, setisLoading] = useState(false)
    const [category, setCategory] = useState('All');

    const queryProducts = async (filterCategory?:string) => {
        try {
            setisLoading(true);
            const res = await fetchProductsBySearch(query, 4, filterCategory ? filterCategory : category);
            console.log('Queried products:', res?.products);
            setQueriedProducts(res?.products ?? []);
        } catch (error) {
            console.error('Error fetching products by search:', error);
            setQueriedProducts([]);
        } finally {
            setisLoading(false);
        }
    };

    useEffect(() => {
        if (!query.trim()) {
            clearTimeout(searchTimeout);
            searchTimeout = null;
            setQueriedProducts([]);
            setShowSearchResults(false)
            return;
        }
        setShowSearchResults(true)
        if (searchTimeout) {
            clearTimeout(searchTimeout);
        }

        searchTimeout = setTimeout(() => {
            queryProducts();
        }, 1000);

        return () => {
            if (searchTimeout) clearTimeout(searchTimeout);
        };
    }, [query]);

    return (
        <div className="relative mx-1 hidden min-w-0 flex-1 items-stretch md:flex">
            <form
                className="flex h-10 w-full overflow-hidden rounded"
            >
                <label className="sr-only" htmlFor="search-category">
                    Department
                </label>
                <select
                    id="search-category"
                    value={category}
                    onChange={(e) => {
                        setCategory(e.target.value)
                        queryProducts(e.target.value)
                    }
                    }
                    className="max-w-30 shrink-0 cursor-pointer border-r border-gray-300 bg-[#e6e6e6] px-2 text-[12px] text-[#0f1111] outline-none hover:bg-[#d4d4d4]"
                >
                    <option value="All">All</option>
                    {allCategories.map((c) => (
                        <option key={c} value={c}>
                            {c}
                        </option>
                    ))}
                </select>
                <label className="sr-only" htmlFor="nav-search">
                    Search Amazon
                </label>
                <input
                    id="nav-search"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    onFocus={() => setShowSearchResults(query.trim().length > 0)}
                    placeholder="Search Amazon"
                    className="min-w-0 flex-1 bg-white px-3 text-[15px] text-[#0f1111] outline-none placeholder:text-gray-500"
                />
                <button
                    type="submit"
                    className="flex w-[45px] items-center justify-center bg-[#febd69] text-[#0f1111] hover:bg-[#f3a847]"
                    aria-label="Search"
                >
                    <SearchIcon />
                </button>
            </form>

            {showSearchResults && <QueriedSearchResults
                products={queriedProducts}
                query={query}
                isLoading={isLoading}
                onClose={() => setShowSearchResults(false)}
            />}
        </div>
    )
}

export default HeaderSearch