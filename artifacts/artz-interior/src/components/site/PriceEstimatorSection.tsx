import { Link } from "wouter";
import { Home, Utensils, Armchair, Calculator } from "lucide-react";

export function PriceEstimatorSection() {
  return (
    <section className="py-16 bg-ivory">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="text-center mb-12">
          <h2 className="font-display text-4xl md:text-6xl leading-[1.05] text-charcoal mb-4">
            Get the estimate for your{" "}
            <em className="italic text-gradient-gold">
              Project
            </em>
          </h2>

          <p className="text-muted-foreground text-lg">
            Calculate the approximate cost of doing up your home interiors
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {/* Full Home Card */}
          <div className="group bg-warm-white overflow-hidden shadow-luxury transition-all duration-500 hover:-translate-y-1">
            <div className="p-8 flex flex-col h-full">
              <div className="flex justify-between items-start mb-6">
                <div className="w-14 h-14 rounded-full bg-beige flex items-center justify-center relative">
                  <Home className="w-7 h-7 text-gold" />

                  <div className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-gold flex items-center justify-center">
                    <div className="w-2 h-2 border-b-2 border-r-2 border-white rotate-45 mb-0.5"></div>
                  </div>
                </div>

                <Calculator className="w-5 h-5 text-gold" />
              </div>

              <h3 className="font-display text-2xl mb-3 text-charcoal group-hover:text-gold transition-colors">
                Full Home Interior
              </h3>

              <p className="text-muted-foreground flex-grow">
                Know the estimate price for your full home interiors
              </p>

              <Link href="/calculator/full-home">
                <button className="mt-8 w-full bg-charcoal text-white py-3 uppercase tracking-[0.2em] text-xs font-semibold hover:bg-gold hover:text-charcoal transition-all duration-300">
                  Calculate →
                </button>
              </Link>
            </div>
          </div>

          {/* Kitchen Card */}
          <div className="group bg-warm-white overflow-hidden shadow-luxury transition-all duration-500 hover:-translate-y-1">
            <div className="p-8 flex flex-col h-full">
              <div className="flex justify-between items-start mb-6">
                <div className="w-14 h-14 rounded-full bg-beige flex items-center justify-center">
                  <Utensils className="w-7 h-7 text-gold" />
                </div>

                <Calculator className="w-5 h-5 text-gold" />
              </div>

              <h3 className="font-display text-2xl mb-3 text-charcoal group-hover:text-gold transition-colors">
                Kitchen
              </h3>

              <p className="text-muted-foreground flex-grow">
                Get an approximate costing for your kitchen interior.
              </p>

              <Link href="/calculator/kitchen">
                <button className="mt-8 w-full bg-charcoal text-white py-3 uppercase tracking-[0.2em] text-xs font-semibold hover:bg-gold hover:text-charcoal transition-all duration-300">
                  Calculate →
                </button>
              </Link>
            </div>
          </div>

          {/* Wardrobe Card */}
          <div className="group bg-warm-white overflow-hidden shadow-luxury transition-all duration-500 hover:-translate-y-1">
            <div className="p-8 flex flex-col h-full">
              <div className="flex justify-between items-start mb-6">
                <div className="w-14 h-14 rounded-full bg-beige flex items-center justify-center">
                  <Armchair className="w-7 h-7 text-gold" />
                </div>

                <Calculator className="w-5 h-5 text-gold" />
              </div>

              <h3 className="font-display text-2xl mb-3 text-charcoal group-hover:text-gold transition-colors">
                Wardrobe
              </h3>

              <p className="text-muted-foreground flex-grow">
                Our estimate for your dream wardrobe
              </p>

              <Link href="/calculator/wardrobe">
                <button className="mt-8 w-full bg-charcoal text-white py-3 uppercase tracking-[0.2em] text-xs font-semibold hover:bg-gold hover:text-charcoal transition-all duration-300">
                  Calculate →
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}