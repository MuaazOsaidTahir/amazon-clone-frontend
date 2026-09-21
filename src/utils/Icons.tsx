export function SearchIcon({ className = 'h-5 w-5' }: { className?: string }) {
    return (
        <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden>
            <path
                d="M21 21l-4.35-4.35M10.5 18a7.5 7.5 0 1 1 0-15 7.5 7.5 0 0 1 0 15z"
                stroke="currentColor"
                strokeWidth="2.2"
                strokeLinecap="round"
            />
        </svg>
    );
}

export function AmazonLogo() {
    return (
        <a
            href="/"
            className="flex items-end gap-0.5 rounded-sm px-1 py-1 hover:outline hover:outline-1 hover:outline-white"
            aria-label="Amazon home"
        >
            <span className="relative pb-1 text-[22px] font-bold italic leading-none tracking-tight text-white md:text-[24px]">
                amazon
                <svg
                    aria-hidden
                    className="absolute -bottom-0.5 left-[18px] h-[7px] w-[52px] text-[#ff9900] md:left-[20px] md:w-[58px]"
                    viewBox="0 0 100 12"
                    fill="none"
                >
                    <path
                        d="M4 4c28 10 64 10 92-2"
                        stroke="currentColor"
                        strokeWidth="5"
                        strokeLinecap="round"
                    />
                    <path
                        d="M88 2l8 4-10 2"
                        stroke="currentColor"
                        strokeWidth="5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />
                </svg>
            </span>
            <span className="mb-1 hidden text-[12px] text-white sm:inline">.com</span>
        </a>
    );
}

export function CartIcon() {
    return (
        <svg className="h-7 w-7" viewBox="0 0 24 24" fill="none" aria-hidden>
            <path
                d="M3 4h1.5l1.8 10.2a2 2 0 0 0 2 1.6h8.4a2 2 0 0 0 2-1.6L21 8H7"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <circle cx="9.5" cy="20" r="1.4" fill="currentColor" />
            <circle cx="17.5" cy="20" r="1.4" fill="currentColor" />
        </svg>
    );
}

export function MenuIcon() {
    return (
        <svg className="h-6 w-6" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
            <path d="M3 6h18v2H3V6zm0 5h18v2H3v-2zm0 5h18v2H3v-2z" />
        </svg>
    );
}

export function PinIcon() {
    return (
        <svg className="mt-0.5 h-4 w-4 shrink-0" viewBox="0 0 24 24" fill="none" aria-hidden>
            <path
                d="M12 22s7-6.2 7-12a7 7 0 1 0-14 0c0 5.8 7 12 7 12z"
                stroke="currentColor"
                strokeWidth="1.8"
            />
            <circle cx="12" cy="10" r="2.2" fill="currentColor" />
        </svg>
    );
}