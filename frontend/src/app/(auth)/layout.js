import Link from 'next/link';
import Image from 'next/image';

export default function AuthLayout({ children }) {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center py-12 px-4">
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
      <div className="w-full max-w-md bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
        {children}
      </div>

      {/* Footer note */}
      <p className="mt-6 text-xs text-gray-400 text-center">
        By continuing, you agree to FurBowl's{' '}
        <Link href="/terms-conditions" className="underline hover:text-turquoise-600">Terms</Link>{' '}
        and{' '}
        <Link href="/privacy-policy" className="underline hover:text-turquoise-600">Privacy Policy</Link>.
      </p>
    </div>
  );
}
