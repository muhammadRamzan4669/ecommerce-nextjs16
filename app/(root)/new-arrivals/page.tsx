import { getNewArrivals } from '@/lib/actions/product.actions'
import { integralCF } from '@/lib/fonts'
import ProductList from '@/components/layout/product-list'
import Link from 'next/link'
import type { Metadata } from 'next'
import { Suspense } from 'react'
import { ChevronLeft, ChevronRight, Sparkles } from 'lucide-react'
import Breadcrumb from '@/components/breadcrumb'

export const metadata: Metadata = {
  title: 'New Arrivals',
  description: 'Discover our latest collection of new arrivals',
}

type SearchParams = Promise<{
  page?: string
}>

function ProductsLoading() {
  return (
    <div className="flex-1">
      <div className="h-6 w-48 bg-muted animate-pulse rounded mb-6" />
      <div className="grid gap-4 lg:gap-5 grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {[...Array(8)].map((_, i) => (
          <div key={i} className="space-y-4">
            <div className="aspect-square bg-muted animate-pulse rounded-[20px]" />
            <div className="h-4 bg-muted animate-pulse rounded w-3/4" />
            <div className="h-4 bg-muted animate-pulse rounded w-1/2" />
          </div>
        ))}
      </div>
    </div>
  )
}

function Pagination({
  currentPage,
  totalPages,
  basePath,
}: {
  currentPage: number
  totalPages: number
  basePath: string
}) {
  if (totalPages <= 1) return null

  const createPageUrl = (page: number) => {
    if (page === 1) return basePath
    return `${basePath}?page=${page}`
  }

  const getPageNumbers = () => {
    const pages: (number | string)[] = []
    const showEllipsisStart = currentPage > 3
    const showEllipsisEnd = currentPage < totalPages - 2

    if (totalPages <= 7) {
      return Array.from({ length: totalPages }, (_, i) => i + 1)
    }

    pages.push(1)

    if (showEllipsisStart) {
      pages.push('...')
    }

    const start = Math.max(2, currentPage - 1)
    const end = Math.min(totalPages - 1, currentPage + 1)

    for (let i = start; i <= end; i++) {
      if (!pages.includes(i)) pages.push(i)
    }

    if (showEllipsisEnd) {
      pages.push('...')
    }

    if (!pages.includes(totalPages)) {
      pages.push(totalPages)
    }

    return pages
  }

  return (
    <div className="flex items-center justify-between mt-8 pt-6 border-t border-black/10 dark:border-white/10">
      <Link
        href={createPageUrl(Math.max(1, currentPage - 1))}
        className={`h-10 px-4 border border-black/10 dark:border-white/10 rounded-lg text-sm font-medium transition-colors flex items-center gap-2 ${
          currentPage === 1
            ? 'opacity-50 pointer-events-none'
            : 'hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black'
        }`}
      >
        <ChevronLeft className="w-4 h-4" />
        Previous
      </Link>

      <div className="flex items-center gap-2">
        {getPageNumbers().map((page, index) =>
          typeof page === 'string' ? (
            <span key={`ellipsis-${index}`} className="w-10 h-10 flex items-center justify-center">
              ...
            </span>
          ) : (
            <Link
              key={page}
              href={createPageUrl(page)}
              className={`w-10 h-10 rounded-lg text-sm font-medium transition-colors flex items-center justify-center ${
                page === currentPage
                  ? 'bg-black dark:bg-white text-white dark:text-black'
                  : 'hover:bg-[#F0F0F0] dark:hover:bg-[#1F1F1F]'
              }`}
            >
              {page}
            </Link>
          )
        )}
      </div>

      <Link
        href={createPageUrl(Math.min(totalPages, currentPage + 1))}
        className={`h-10 px-4 border border-black/10 dark:border-white/10 rounded-lg text-sm font-medium transition-colors flex items-center gap-2 ${
          currentPage === totalPages
            ? 'opacity-50 pointer-events-none'
            : 'hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black'
        }`}
      >
        Next
        <ChevronRight className="w-4 h-4" />
      </Link>
    </div>
  )
}

async function NewArrivalsGrid({ page }: { page: number }) {
  const { products, totalCount, totalPages, currentPage } = await getNewArrivals({
    page,
    limit: 12,
  })

  const startItem = (currentPage - 1) * 12 + 1
  const endItem = Math.min(currentPage * 12, totalCount)

  return (
    <div>
      {/* Results Header */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-base text-black/60 dark:text-white/60">
          {totalCount > 0
            ? `Showing ${startItem}-${endItem} of ${totalCount} Products`
            : 'No new arrivals found'}
        </h2>
      </div>

      {products.length > 0 ? (
        <>
          <ProductList products={products} />
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            basePath="/new-arrivals"
          />
        </>
      ) : (
        <div className="text-center py-12">
          <p className="text-lg text-black/60 dark:text-white/60 mb-4">
            No new arrivals at the moment
          </p>
          <Link
            href="/products"
            className="inline-block px-6 py-3 bg-black dark:bg-white text-white dark:text-black rounded-[62px] text-sm font-medium hover:opacity-90 transition-opacity"
          >
            Browse All Products
          </Link>
        </div>
      )}
    </div>
  )
}

export default async function NewArrivalsPage({
  searchParams,
}: {
  searchParams: SearchParams
}) {
  const params = await searchParams
  const page = params.page ? Number(params.page) : 1

  return (
    <div className="max-w-[1440px] mx-auto px-4 md:px-8 lg:px-[100px] py-6 lg:py-10">
      <Breadcrumb
        items={[
          { label: "Home", href: "/" },
          { label: "New Arrivals" },
        ]}
      />

      {/* Page Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <Sparkles className="w-8 h-8 text-yellow-500" />
          <h1 className={`${integralCF.className} text-[32px] lg:text-[40px] font-bold`}>
            NEW ARRIVALS
          </h1>
        </div>
        <p className="text-black/60 dark:text-white/60 max-w-2xl">
          Be the first to explore our latest additions. Fresh styles and trending pieces just dropped.
        </p>
      </div>

      {/* Products Grid */}
      <Suspense fallback={<ProductsLoading />}>
        <NewArrivalsGrid page={page} />
      </Suspense>
    </div>
  )
}
