export const metadata = {
  title: 'SendByEmail',
  description: 'SendByEmail',
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <section>
        {children}
      </section>
    </>
  );
}
