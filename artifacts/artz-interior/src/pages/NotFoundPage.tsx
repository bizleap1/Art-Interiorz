import { Link } from "wouter";

export default function NotFoundPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-warm-white px-6 pt-24">
      <div className="max-w-md text-center">
        <div className="font-display text-[120px] leading-none text-gradient-gold">404</div>
        <h2 className="mt-4 font-display text-3xl text-charcoal">Page not found</h2>
        <p className="mt-4 text-muted-foreground leading-relaxed">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <Link
          href="/"
          className="mt-8 inline-flex items-center gap-3 bg-charcoal text-warm-white px-9 py-4 text-xs tracking-[0.3em] uppercase hover:bg-gold transition-colors"
        >
          Go Home
          <span className="h-px w-6 bg-warm-white" />
        </Link>
      </div>
    </div>
  );
}
