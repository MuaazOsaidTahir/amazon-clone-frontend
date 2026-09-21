import { memo, useEffect, useRef, useState } from 'react';
import { useStore } from '../context/StoreContext';
import { useLocation, useNavigate } from 'react-router-dom';
import { AmazonLogo, CartIcon, MenuIcon, PinIcon } from '../utils/Icons';
import HeaderSearch from './HeaderSearch';
import { getUserLocation } from '../utils/api';


const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const { cartCount, user } = useStore();
  const navigate = useNavigate();
  const location = useLocation();
  const [currentLocation, setcurrentLocation] = useState<any>(null);
  const ipCall = useRef(true);

  useEffect(() => {
    if (ipCall.current) {
      (async () => {
        const data = await getUserLocation();
        if (data?.country) {
          setcurrentLocation(data);
        } else {
          console.log("errorrrrrrrrrrrr")
        }
      })()
      ipCall.current = false
    }
  }, [])

  return (
    <header className="sticky top-0 z-50 w-full font-sans text-white">
      <div className="bg-[#131921]">
        <div className="flex items-center gap-1 px-2 py-2 md:gap-2 md:px-3">
          <button
            type="button"
            className="rounded-sm p-1 hover:outline hover:outline-1 hover:outline-white md:hidden"
            aria-label="Open menu"
            onClick={() => setMenuOpen(true)}
          >
            <MenuIcon />
          </button>

          <AmazonLogo />

          <button
            type="button"
            className="ml-1 hidden min-w-[140px] items-center gap-1 rounded-sm px-2 py-1 text-left hover:outline hover:outline-1 hover:outline-white lg:flex"
          >
            <PinIcon />
            <span className="leading-tight">
              <span className="block text-[11px] text-[#ccc]">Deliver to</span>
              <span className="block text-[13px] font-bold">{currentLocation?.country ? `${currentLocation?.country}${currentLocation?.postal}` : "Unable to get location"}</span>
            </span>
          </button>

          <HeaderSearch />

          <button
            type="button"
            className="ml-auto hidden items-end gap-1 rounded-sm px-2 py-1 hover:outline hover:outline-1 hover:outline-white md:flex"
          >
            <span className="mb-0.5 text-sm leading-none" aria-hidden>
              🇺🇸
            </span>
            <span className="text-[13px] font-bold">EN</span>
          </button>

          <button
            type="button"
            onClick={() => user ? navigate('/profile') : navigate('/login', { state: { from: location.pathname + location.search } })}
            className="hidden cursor-pointer rounded-sm px-2 py-1 text-left leading-tight hover:outline hover:outline-1 hover:outline-white sm:block"
          >
            <span className="block text-[11px]">Hello, {user?.name ? user?.name : "Sign In"}</span>
            <span className="block text-[13px] font-bold">Account &amp; Lists</span>
          </button>

          {/* <button
            type="button"
            onClick={() => user ? navigate('/profile#orders') : navigate('/login')}
            className="hidden rounded-sm px-2 py-1 leading-tight hover:outline hover:outline-1 hover:outline-white lg:block"
          >
            <span className="block text-[11px]">Returns</span>
            <span className="block text-[13px] font-bold">&amp; Orders</span>
          </button> */}

          <button
            type="button"
            onClick={() => navigate('/checkout')}
            className="relative flex items-end rounded-sm cursor-pointer px-2 py-1 hover:outline hover:outline-1 hover:outline-white"
          >
            <span className="relative">
              <CartIcon />
              <span className="absolute -top-1 left-3 min-w-[16px] text-center text-[13px] font-bold text-[#f08804]">
                {cartCount}
              </span>
            </span>
            <span className="mb-0.5 hidden text-[13px] font-bold sm:inline">Cart</span>
          </button>
        </div>

        <button
          type="button"
          className="flex w-full items-center gap-1 px-3 pb-2 text-left text-[12px] text-[#ccc] lg:hidden"
        >
          <PinIcon />
          <span>
            Deliver to <span className="font-bold text-white">{currentLocation?.country ? `${currentLocation?.country}${currentLocation?.postal}` : "Unable to get location"}</span>
          </span>
        </button>
      </div>


      <nav className="flex items-center gap-1 overflow-x-auto bg-[#232f3e] px-2 py-1 text-[13px] whitespace-nowrap [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        <button
          type="button"
          className="hidden items-center gap-1 rounded-sm px-2 py-1.5 font-bold hover:outline hover:outline-1 hover:outline-white md:flex"
          onClick={() => setMenuOpen(true)}
        >
          <MenuIcon />
          All
        </button>
        {/* {DEPARTMENTS.map((item) => (
          <a
            key={item}
            href={`#${item.toLowerCase().replace(/\s+/g, '-')}`}
            className="rounded-sm px-2 py-1.5 hover:outline hover:outline-1 hover:outline-white"
          >
            {item}
          </a>
        ))} */}
        <a
          href="#prime"
          className="ml-auto hidden rounded-sm px-2 py-1.5 font-semibold text-[#febd69] hover:outline hover:outline-1 hover:outline-white lg:inline"
        >
          Shop great deals now
        </a>
      </nav>

      {menuOpen && (
        <div className="fixed inset-0 z-60">
          <button
            type="button"
            className="absolute inset-0 bg-black/60"
            aria-label="Close menu"
            onClick={() => setMenuOpen(false)}
          />
          <aside className="relative h-full w-[82%] max-w-95 overflow-y-auto bg-white text-[#0f1111] shadow-2xl">
            <div className="flex items-center justify-between bg-[#232f3e] px-4 py-3 text-white">
              <p className="text-[18px] font-bold">Hello, sign in</p>
              <button
                type="button"
                className="p-1 text-2xl leading-none"
                aria-label="Close menu"
                onClick={() => setMenuOpen(false)}
              >
                ×
              </button>
            </div>
            {/* <div className="border-b border-gray-200 py-3">
              <p className="px-5 pb-2 text-[18px] font-bold">Shop by Department</p>
            </div> */}
            <div className="py-3">
              <p className="px-5 pb-2 text-[18px] font-bold">Help &amp; Settings</p>
              <a href="#account" className="block px-5 py-2.5 text-[14px] hover:bg-gray-100">
                Your Account
              </a>
              <a href="#orders" className="block px-5 py-2.5 text-[14px] hover:bg-gray-100">
                Returns &amp; Orders
              </a>
              <a href="#signin" className="block px-5 py-2.5 text-[14px] hover:bg-gray-100">
                Sign in
              </a>
            </div>
          </aside>
        </div>
      )}
    </header>
  );
};

export default memo(Header);
