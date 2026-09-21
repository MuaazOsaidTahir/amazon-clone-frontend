import React, { memo, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';

const BANNERS = [
    {
        title: 'Jewellery that shines brighter',
        subtitle: 'Discover elegant rings, necklaces, and timeless statement pieces.',
        cta: 'Shop Jewellery',
        image:
            'https://images.unsplash.com/photo-1617038220319-276d3cfab638?w=1600&q=80',
        tint: 'from-[#20161a]/80 via-[#4a2d3a]/45 to-transparent',
        category: 'jewellery',
    },
    {
        title: 'Electronics for everyday life',
        subtitle: 'Smart gadgets, audio essentials, and tech upgrades for every space.',
        cta: 'Shop Electronics',
        image:
            'https://images.unsplash.com/photo-1518770660439-4636190af475?w=1600&q=80',
        tint: 'from-[#0f172a]/80 via-[#1e293b]/40 to-transparent',
        category: 'electronics',
    },
    {
        title: 'Women’s fashion that feels effortless',
        subtitle: 'From soft layers to bold essentials, find looks made to move with you.',
        cta: 'Shop Women’s Clothing',
        image:
            'https://images.unsplash.com/photo-1529139574466-a303027c1d8b?w=1600&q=80',
        tint: 'from-[#1f2937]/75 via-[#374151]/35 to-transparent',
        category: "women's clothing",
    },
    {
        title: 'Menswear built for confidence',
        subtitle: 'Sharp staples, relaxed essentials, and versatile looks for any day.',
        cta: 'Shop Men’s Clothing',
        image:
            'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?w=1600&q=80',
        tint: 'from-[#111827]/80 via-[#2d3748]/35 to-transparent',
        category: "men's clothing",
    },
];

function HeroSection() {
    const [slide, setSlide] = useState(0);
    const navigate = useNavigate();

    const banner = BANNERS[slide];

    useEffect(() => {
        const id = window.setInterval(() => {
            setSlide((current) => (current + 1) % BANNERS.length);
        }, 6000);
        return () => window.clearInterval(id);
    }, []);


    return (
        <section className="relative h-[280px] overflow-hidden sm:h-[360px] md:h-[420px] lg:h-[480px]">
            {BANNERS.map((item, index) => (
                <div
                    key={item.title}
                    className={`absolute inset-0 bg-cover bg-center transition-opacity duration-700 ${index === slide ? 'opacity-100' : 'opacity-0'
                        }`}
                    style={{ backgroundImage: `url(${item.image})` }}
                    aria-hidden={index !== slide}
                >
                    <div className={`absolute inset-0 bg-gradient-to-r ${item.tint}`} />
                    <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-[#eaeded] to-transparent md:h-40" />
                </div>
            ))}

            <div className="relative z-10 mx-auto flex h-full max-w-[1500px] flex-col justify-center px-4 pb-16 sm:px-6 md:px-8">
                <p className="mb-2 text-[13px] font-semibold uppercase tracking-[0.18em] text-[#febd69]">
                    Featured
                </p>
                <h1 className="max-w-xl text-3xl font-bold leading-tight text-white drop-shadow sm:text-4xl md:text-5xl">
                    {banner.title}
                </h1>
                <p className="mt-2 max-w-lg text-[15px] text-white/90 sm:text-lg">{banner.subtitle}</p>
                <button
                    type="button"
                    onClick={() => {
                        navigate(`/category/${banner.category}`);
                    }}
                    className="mt-5 w-fit rounded-sm bg-[#ffd814] px-4 py-2 text-[14px] font-medium text-[#0f1111] hover:bg-[#f7ca00]"
                >
                    {banner.cta}
                </button>
            </div>

            <button
                type="button"
                aria-label="Previous banner"
                onClick={() => setSlide((s) => (s - 1 + BANNERS.length) % BANNERS.length)}
                className="absolute left-2 top-1/3 z-10 hidden h-20 w-10 items-center justify-center text-4xl text-white/80 hover:text-white md:flex"
            >
                ‹
            </button>
            <button
                type="button"
                aria-label="Next banner"
                onClick={() => setSlide((s) => (s + 1) % BANNERS.length)}
                className="absolute right-2 top-1/3 z-10 hidden h-20 w-10 items-center justify-center text-4xl text-white/80 hover:text-white md:flex"
            >
                ›
            </button>

            <div className="absolute bottom-10 left-1/2 z-10 flex -translate-x-1/2 gap-2 md:bottom-16">
                {BANNERS.map((item, index) => (
                    <button
                        key={item.title}
                        type="button"
                        aria-label={`Show banner ${index + 1}`}
                        onClick={() => setSlide(index)}
                        className={`h-2 w-2 rounded-full ${index === slide ? 'bg-white' : 'bg-white/50'}`}
                    />
                ))}
            </div>
        </section>
    )
}

export default memo(HeroSection)