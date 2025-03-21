import ContactsTeam from '@/app/contacts/ContactsTeam';
import ContactsMap from '@/app/components/shared/ContactsMap';
export const revalidate = 0;

export default function ContactsPage() {
  return (
    <main>
      <ContactsTeam />
      <ContactsMap variant="contacts" />
    </main>
  );
} 