import Container from '#/components/ui/Container'
import ProductCard from '#/components/sections/ProductCard'
import { useFeaturedProducts } from '#/hooks/useProducts'
import { useSectionReveal } from '#/hooks/useSectionReveal'

export default function FeaturedProducts() {
  const { data: products, isLoading } = useFeaturedProducts()
  const revealRef = useSectionReveal()

  return (
    <section ref={revealRef} id="featured" className="section-reveal bg-[#f0fdf4] py-16">
      <Container>
        <div className="text-center">
          <h2
            className="text-3xl font-bold text-[#064e3b] sm:text-4xl"
            style={{ fontFamily: '"Playfair Display", Georgia, serif' }}
          >
            Featured Products
          </h2>
          <p className="mt-2 text-gray-600">
            Trending picks from our coconut-derived range
          </p>
        </div>

        {isLoading ? (
          <div className="mt-10 flex justify-center">
            <div className="h-8 w-8 animate-spin rounded-full border-4 border-[#6fc54d] border-t-transparent" />
          </div>
        ) : (
          <>
            {/* Desktop/Tablet grid */}
            <div className="mt-10 hidden sm:grid sm:grid-cols-3 sm:gap-6 lg:grid-cols-4">
              {products?.map((product) => (
                <div key={product.id} className="stagger-item">
                  <ProductCard
                    product={product}
                    variant="featured"
                  />
                </div>
              ))}
            </div>

            {/* Mobile horizontal carousel */}
            <div
              className="featured-carousel mt-10 flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 sm:hidden"
              style={{ scrollbarWidth: 'none', scrollPaddingLeft: '1rem' }}
              role="region"
              aria-label="Featured products carousel"
            >
              <style>{`
                .featured-carousel::-webkit-scrollbar { display: none; }
              `}</style>
              {products?.map((product) => (
                <div
                  key={product.id}
                  className="stagger-item w-[66vw] min-w-[66vw] snap-start"
                >
                  <ProductCard product={product} variant="featured" />
                </div>
              ))}
              {/* Trailing space for last card */}
              <div className="w-4 shrink-0" aria-hidden="true" />
            </div>
          </>
        )}
      </Container>
    </section>
  )
}
