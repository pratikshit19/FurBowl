import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import BottomNav from '@/components/layout/BottomNav';
import WhatsAppWidget from '@/components/common/WhatsAppWidget';

export default function StorefrontLayout({ children }) {
  return (
    <>
      <Header />
      <main id="main-content" className="flex-1 pb-16 lg:pb-0">
        {children}
      </main>
      <Footer />
      <BottomNav />
      <WhatsAppWidget />
    </>
  );
}
