import Pagination from '@/app/ui/invoices/pagination';
import { Metadata } from 'next';
import CustomersTable from '@/app/ui/customers/table';
import { fetchCustomersPages, fetchFilteredCustomers } from '@/app/lib/data';
import { Suspense } from 'react';
import { InvoicesTableSkeleton } from '@/app/ui/skeletons';


export const metadata: Metadata = {
  title: 'Customers',
};


export default async function Page({
  searchParams,
}: {
  searchParams?: {
    query?: string;
    page?: string;
  };
}) {
  const query = searchParams?.query || '';
  const currentPage = Number(searchParams?.page) || 1;

  const customers = await fetchFilteredCustomers(query, currentPage);

  const totalPages = await fetchCustomersPages();


  return (
    <div className='w-full'>
      <Suspense key={query + currentPage} fallback={<InvoicesTableSkeleton />}>
        <CustomersTable customers={customers} />
      </Suspense>
      <div className="mt-5 flex w-full justify-center">
        <Pagination totalPages={totalPages} />
      </div>
    </div>
  );
}