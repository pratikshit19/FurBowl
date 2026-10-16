import ContactClient from '@/components/contact/ContactClient';

export const metadata = {
  title: 'Contact Us | FurBowl Customer Support',
  description:
    'Get in touch with FurBowl. Reach out for custom dog diets, batch ingredients, order tracking, and feeding consultations. Phone: +91 8860503685, Email: support.furbowl@gmail.com.',
  openGraph: {
    title: 'Contact FurBowl | Fresh Dog Food India',
    description: 'Reach our certified pet care team for feeding advice, order tracking, and custom nutrition.',
  },
};

export default function ContactPage() {
  return <ContactClient />;
}
