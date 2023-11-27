import Image from 'next/image';
import { lusitana } from '@/app/ui/fonts';
import Search from '@/app/ui/search';
import { InvoicesTableOmitUserInfo } from '@/app/lib/definitions';
import Link from 'next/link';
import InvoiceStatus from '../invoices/status';
import { formatCurrency, formatDateToLocal } from '@/app/lib/utils';

export default async function CustomersInvoicesTable({
  invoices,
}: {
  invoices: InvoicesTableOmitUserInfo[];
}) {
  return (
    <div className="w-full">
      <h2 className={`${lusitana.className} mb-8 text-xl md:text-2xl`}>
        Invoices
      </h2>
      <div className="mt-6 flow-root">
        <div className="overflow-x-auto">
          <div className="inline-block min-w-full align-middle">
            <div className="overflow-hidden rounded-md bg-gray-50 dark:bg-gray-500 p-2 md:pt-0">
              <div className="md:hidden">
                {invoices?.map((invoice) => (
                  <div
                    key={invoice.id}
                    className="mb-2 w-full rounded-md bg-white dark:bg-black p-4"
                  >
                    <div className="flex w-full items-center justify-between border-b py-5">
                      <div className="flex w-1/2 flex-col">
                        <p className="text-xs">Date</p>
                        <p className="font-medium">{formatDateToLocal(invoice.date)}</p>
                      </div>
                      <div className="flex w-1/2 flex-col">
                        <p className="text-xs">Amount</p>
                        <p className="font-medium">{formatCurrency(invoice.amount)}</p>
                      </div>
                    </div>
                    <div className="pt-4 text-sm">
                      <p className="text-xs">Status</p>
                      <InvoiceStatus status={invoice.status} />
                    </div>
                  </div>
                ))}
              </div>
              <table className="hidden min-w-full rounded-md text-gray-900 dark:text-gray-200 md:table">
                <thead className="rounded-md bg-gray-50 dark:bg-gray-500 text-left text-sm font-normal">
                  <tr>
                    <th scope="col" className="px-3 py-5 font-medium">
                      Amount
                    </th>
                    <th scope="col" className="px-3 py-5 font-medium">
                      Date
                    </th>
                    <th scope="col" className="px-4 py-5 font-medium">
                      Status
                    </th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-gray-200 dark:divide-gray-900 text-gray-900 dark:text-gray-200">
                  {invoices.map((invoice) => (
                    <tr key={invoice.id} className="group">
                      <td className="whitespace-nowrap bg-white dark:bg-black px-4 py-5 text-sm">
                        {formatCurrency(invoice.amount)}
                      </td>
                      <td className="whitespace-nowrap bg-white dark:bg-black px-4 py-5 text-sm">
                        {formatDateToLocal(invoice.date)}
                      </td>
                      <td className="whitespace-nowrap bg-white dark:bg-black px-4 py-5 text-sm">
                      <InvoiceStatus status={invoice.status} />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
