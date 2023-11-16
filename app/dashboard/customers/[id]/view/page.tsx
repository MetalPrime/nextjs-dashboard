import { fetchCustomerById } from "@/app/lib/data";
import Breadcrumbs from "@/app/ui/invoices/breadcrumbs";
import { Metadata } from "next";
import { notFound } from "next/navigation";

export const metadata: Metadata = {
    title: 'View User',
}

export default async function Page({ params }: { params: { id: string } }) {
    const id = params.id;

    const customer = await fetchCustomerById(id);

    if (!customer) {
        notFound();
    }

    return (
        <main>
            <Breadcrumbs
                breadcrumbs={[
                    { label: 'Customers', href: '/dashboard/customers' },
                    {
                        label: `${customer.name}`,
                        href: `/dashboard/customers/${id}/view`,
                        active: true,
                    },
                ]}
            />

        </main>
    );


}