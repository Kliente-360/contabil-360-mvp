import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { verifySession, COOKIE_NAME } from "@/lib/auth-demo";
import { Sidebar } from "@/components/portal/sidebar";

export default async function PortalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const cookieStore = cookies();
  const token = cookieStore.get(COOKIE_NAME)?.value;
  const session = token ? await verifySession(token) : null;

  if (!session) redirect("/login");

  return (
    <div className="flex min-h-screen bg-surface">
      <Sidebar
        clienteNome={session.clienteNome}
        escritorioNome={session.escritorioNome}
      />
      <main className="flex-1 overflow-auto">
        {children}
      </main>
    </div>
  );
}
