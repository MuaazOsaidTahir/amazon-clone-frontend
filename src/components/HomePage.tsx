import { useStore } from '../context/StoreContext';
import HeroSection from './HeroSection';
import CategoryProducts from './CategoryProducts';


export default function HomePage() {
  const { allCategories } = useStore();
  
  return (
    <>
      <main>
        <HeroSection />
        <div className="relative z-20 mx-auto -mt-10 max-w-[1500px] px-3 pb-12 sm:-mt-16 sm:px-4 md:-mt-24">

          <section id="products" className="rounded-sm bg-white px-3 py-4 sm:px-5">
            <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <h2 className="text-xl font-bold sm:text-2xl">Popular Categories</h2>
              </div>
              <div className="flex gap-2 overflow-x-auto pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
                {allCategories.map((item) => (
                  <button
                    key={item}
                    type="button"
                    onClick={() => {
                      document.getElementById(item)?.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className={`shrink-0 cursor-pointer rounded-full border px-3 py-1.5 text-[13px] border-[#d5d9d9] bg-white hover:bg-[#f7fafa]`}
                  >
                    {item.toUpperCase()}
                  </button>
                ))}
              </div>
            </div>
            <div className="space-y-8">
              {allCategories.map((section) => (
                <CategoryProducts key={section} category={section} />
              ))}
            </div>
          </section>
        </div>

        <footer className="bg-[#232f3e] text-center text-[13px] text-[#ddd]">
          <button
            type="button"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="w-full bg-[#37475a] py-3 text-white hover:bg-[#485769]"
          >
            Back to top
          </button>
          <p className="px-4 py-8">
            Browse by category, search, and add to cart.
          </p>
        </footer>
      </main>
    </>
  );
}
