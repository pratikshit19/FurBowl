import Link from 'next/link';
import Image from 'next/image';

export default function AuthLayout({ children }) {
  return (
    <div className="min-h-screen bg-[#faf6ed] flex flex-col items-center justify-center py-12 px-4">
      {/* Logo */}
      <Link href="/" className="mb-8 block">
        <Image
          src="/images/dark-logo.png"
          alt="FurBowl"
          width={180}
          height={54}
          priority
          className="h-14 w-auto object-contain"
        />
      </Link>

      {/* Card */}
      <div className="w-full max-w-md bg-white rounded-3xl shadow-sm border border-plum-900/10 p-8 sm:p-10">
        {children}
      </div>

      {/* Footer note */}
      <p className="mt-6 text-xs text-plum-900/50 text-center">
        By continuing, you agree to FurBowl's{' '}
        <Link href="/terms-conditions" className="underline hover:text-coral-500 transition-colors">Terms</Link>{' '}
        and{' '}
        <Link href="/privacy-policy" className="underline hover:text-coral-500 transition-colors">Privacy Policy</Link>.
      </p>
    </div>
  );
}
