import Link from 'next/link';

export default function NotFound() {
  return (
    <main className="section-padding text-center">
      <div className="container-main max-w-xl py-16">
        <p className="text-sm font-black uppercase tracking-widest text-teal-600">404</p>
        <h1 className="mt-3 text-4xl font-black text-plum-900">That bowl is empty.</h1>
        <p className="mt-3 text-plum-900/65">We couldn’t find the page you were looking for.</p>
        <Link href="/shop" className="mt-7 inline-flex rounded bg-teal-500 px-6 py-3 text-sm font-bold text-white hover:bg-teal-600">Browse fresh meals</Link>
      </div>
    </main>
  );
}
