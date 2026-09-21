function Stars({ rate }: { rate: number }) {
    const full = Math.round(rate);
    return (
        <div className="flex items-center gap-1" aria-label={`${rate} out of 5 stars`}>
            <span className="flex text-[#de7921]">
                {Array.from({ length: 5 }, (_, i) => (
                    <svg key={i} className="h-4 w-4" viewBox="0 0 20 20" aria-hidden>
                        <path
                            fill={i < full ? 'currentColor' : '#d5d9d9'}
                            d="M10 1.5l2.47 5.01 5.53.8-4 3.9.94 5.5L10 14.9 5.06 16.71l.94-5.5-4-3.9 5.53-.8L10 1.5z"
                        />
                    </svg>
                ))}
            </span>
            <span className="text-[13px] text-[#007185]">{rate.toFixed(1)}</span>
        </div>
    );
}

export default Stars;