import { useQuery } from "@tanstack/react-query";
import { Link } from "@tanstack/react-router";
import { client as contactsClient } from "../config/schemas/filemaker/client/Contacts";

async function fetchContacts() {
  // Generated clients expose runtime methods via the DataApi wrapper.
  // Use optional chaining in case the app is running outside FileMaker.
  const fn = (contactsClient as any)?.read ?? (contactsClient as any)?.list ?? null;
  if (!fn) {
    throw new Error("Generated client not available in this environment. Run inside FileMaker or use fmFetch.");
  }
  const res = await fn({ limit: 50 });
  // Normalize result shape if needed
  return res?.data ?? res;
}

export function ContactsListPage() {
  const q = useQuery({ queryKey: ["contacts-list"], queryFn: fetchContacts });

  return (
    <main className="mx-auto w-full max-w-5xl px-6 py-10 sm:px-10">
      <section className="rounded-3xl border border-border bg-card p-8 shadow-sm">
        <h1 className="text-2xl font-semibold">Contact List</h1>

        <div className="mt-4">
          <Link className="inline-flex rounded-full border border-border bg-card px-4 py-2 text-sm font-medium" to="/contacts/new">
            Add Contact
          </Link>
        </div>

        <div className="mt-6">
          {q.isLoading && <div>Loading contacts…</div>}
          {q.isError && <div className="text-red-600">{String(q.error)}</div>}
          {q.data && (
            <ul className="mt-4 space-y-2">
              {Array.isArray(q.data) && q.data.length === 0 && <li>No contacts found.</li>}
              {Array.isArray(q.data) &&
                q.data.map((r: any) => (
                  <li key={r.recordId ?? JSON.stringify(r)} className="rounded-md border p-3">
                    <div className="text-lg font-medium">{r["First Name"]} {r["Last Name"]}</div>
                    <div className="text-sm text-muted-foreground">{r.Company}</div>
                  </li>
                ))}
            </ul>
          )}
        </div>

        <div className="mt-6">
          <Link className="inline-flex rounded-full border border-border bg-card px-4 py-2 text-sm font-medium" to="/">
            Back
          </Link>
        </div>
      </section>
    </main>
  );
}
