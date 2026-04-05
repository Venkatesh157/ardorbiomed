import { useState } from 'react'
import Container from '#/components/ui/Container'
import TiltCard from '#/components/ui/TiltCard'
import Button from '#/components/ui/Button'
import { CATEGORIES, type Category } from '#/data/categories'
import { useSectionReveal } from '#/hooks/useSectionReveal'

const gradientMap: Record<string, string> = {
  woundcare: 'from-emerald-700 to-emerald-500',
  cosmeceutical: 'from-green-600 to-lime-400',
  nutraceutical: 'from-teal-600 to-emerald-400',
}

function CategoryCard({ category }: { category: Category }) {
  const [imgError, setImgError] = useState(false)
  const gradient = gradientMap[category.slug] ?? 'from-green-600 to-green-400'

  return (
    <TiltCard className="overflow-hidden rounded-2xl bg-white shadow-md">
      <div className={`relative h-48 overflow-hidden bg-gradient-to-br ${gradient}`}>
        {!imgError ? (
          <img
            src={category.image}
            alt={category.name}
            loading="lazy"
            className="h-full w-full object-cover"
            onError={() => setImgError(true)}
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center">
            <span className="text-5xl font-bold text-white/30">
              {category.name.charAt(0)}
            </span>
          </div>
        )}
      </div>
      <div className="p-5">
        <h3 className="text-lg font-bold text-gray-900">{category.name}</h3>
        <p className="mt-0.5 text-xs text-gray-500">{category.subBrand}</p>
        <p className="mt-2 text-sm leading-relaxed text-gray-600">
          {category.description}
        </p>
        <Button variant="outline" size="sm" className="mt-4">
          Explore
        </Button>
      </div>
    </TiltCard>
  )
}

export default function ShopByCategory() {
  const revealRef = useSectionReveal()

  return (
    <section ref={revealRef} id="categories" className="section-reveal bg-white py-16">
      <Container>
        <h2
          className="text-center text-3xl font-bold sm:text-4xl"
          style={{ fontFamily: '"Playfair Display", Georgia, serif' }}
        >
          Shop by Category
        </h2>
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {CATEGORIES.map((category) => (
            <div key={category.slug} className="stagger-item">
              <CategoryCard category={category} />
            </div>
          ))}
        </div>
      </Container>
    </section>
  )
}
