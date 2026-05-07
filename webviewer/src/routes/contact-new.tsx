import { useState } from "react";
import { Link, useNavigate } from "@tanstack/react-router";
import { client as contactsClient } from "../config/schemas/filemaker/client/Contacts";

export default function ContactNewPage() {
  const navigate = useNavigate();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [company, setCompany] = useState("");
  const [jobTitle, setJobTitle] = useState("");
  const [website, setWebsite] = useState("");
  const [title, setTitle] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      // Prefer the generated client when running inside FileMaker / webviewer adapter
      const api = (contactsClient as any)?.create ?? null;
      const payload = {
        fieldData: {
          "First Name": firstName,
          "Last Name": lastName,
          Company: company,
          "Job Title": jobTitle,
          Website: website,
          Title: title,
        },
      };

      if (api) {
        await api(payload);
      } else {
        // Fallback: attempt direct HTTP Data API (via local MCP bridge)
        const baseUrl = "http://127.0.0.1:1365";
        const db = "ContactsTestingProofKit";
        const layout = "Contact Details";
        const url = `${baseUrl}/fmi/data/vLatest/databases/${encodeURIComponent(db)}/layouts/${encodeURIComponent(layout)}/records`;

        const resp = await fetch(url, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        });

        if (!resp.ok) {
          const text = await resp.text();
          throw new Error(`Data API create failed: ${resp.status} ${resp.statusText} - ${text}`);
        }
      }
      // Navigate back to contacts list after creation
      navigate({ to: "/contacts" });
    } catch (err: any) {
      setError(String(err?.message ?? err));
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="mx-auto w-full max-w-5xl px-6 py-10 sm:px-10">
      <section className="rounded-3xl border border-border bg-card p-8 shadow-sm">
        <h1 className="text-2xl font-semibold">Add Contact</h1>

        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <div>
            <label className="block text-sm font-medium">First Name</label>
            <input value={firstName} onChange={(e) => setFirstName(e.target.value)} className="mt-1 w-full rounded-md border px-3 py-2" />
          </div>

          <div>
            <label className="block text-sm font-medium">Last Name</label>
            <input value={lastName} onChange={(e) => setLastName(e.target.value)} className="mt-1 w-full rounded-md border px-3 py-2" />
          </div>

          <div>
            <label className="block text-sm font-medium">Company</label>
            <input value={company} onChange={(e) => setCompany(e.target.value)} className="mt-1 w-full rounded-md border px-3 py-2" />
          </div>

          <div>
            <label className="block text-sm font-medium">Job Title</label>
            <input value={jobTitle} onChange={(e) => setJobTitle(e.target.value)} className="mt-1 w-full rounded-md border px-3 py-2" />
          </div>

          <div>
            <label className="block text-sm font-medium">Website</label>
            <input value={website} onChange={(e) => setWebsite(e.target.value)} className="mt-1 w-full rounded-md border px-3 py-2" />
          </div>

          <div>
            <label className="block text-sm font-medium">Title</label>
            <input value={title} onChange={(e) => setTitle(e.target.value)} className="mt-1 w-full rounded-md border px-3 py-2" />
          </div>

          {error && <div className="text-red-600">{error}</div>}

          <div className="flex gap-3">
            <button type="submit" disabled={loading} className="inline-flex items-center rounded-full border border-border bg-card px-4 py-2 text-sm font-medium">
              {loading ? "Creating…" : "Create Contact"}
            </button>
            <Link className="inline-flex items-center rounded-full border border-border bg-background px-4 py-2 text-sm font-medium" to="/contacts">
              Cancel
            </Link>
          </div>
        </form>
      </section>
    </main>
  );
}
