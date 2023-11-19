import { fetchCustomerById } from "@/app/lib/data";
import Breadcrumbs from "@/app/ui/invoices/breadcrumbs";
import clsx from "clsx";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from 'next/image';
import { lusitana } from '@/app/ui/fonts';
import { Card } from "@/app/ui/dashboard/cards";

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
            <div
                key={customer.id}
                className={clsx(
                    'flex flex-row flex-wrap items-center justify-between py-4 border-t border-b',
                )}
            >
                <div className="flex flex-auto items-center">
                    <Image
                        src={customer.image_url}
                        alt={`${customer.name}'s profile picture`}
                        className="mr-4 rounded-full"
                        width={64}
                        height={64}
                    />
                    <div className="min-w-0">
                        <p className="truncate text-2xl font-semibold ">
                            {customer.name}
                        </p>
                        <p className="hidden text-lg text-gray-500 sm:block">
                            {customer.email}
                        </p>
                    </div>
                </div>
                <div className="flex items-center justify-items-end md:max-w-fit">
                    <Card title="Total Invoices" value={customer.total_invoices} type="invoices" />
                    <Card title="Total Pending" value={customer.total_pending} type="pending" />
                    <Card title="Total Paid" value={customer.total_paid} type="collected" />
                </div>

            </div>

        </main>
    );


}