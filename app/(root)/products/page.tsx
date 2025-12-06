import { getFilteredProducts, getAllCategories } from '@/lib/actions/product.actions'
import { integralCF } from '@/lib/fonts'
import ProductList from '@/components/layout/product-list'
import { ProductFilters, SortDropdown } from '@/components/layout/product-filters'
import Link from 'next/link'
import type { Metadata } from 'next'
import { Suspense } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import ProductsFilterWrapper from './products-filter-wrapper'

export const metadata: Metadata = {
  title: 'All Products',
  description: 'Browse our complete collection of products',
}

type SearchParams = Promise<{
  q?: string
  category?: string
  minPrice?: string
  maxPrice?: string
  sortBy?: string
  page?: string
}>

function ProductsLoading() {
  return (
    <div className="flex-1">
      <div className="h-6 w-48 bg-muted animate-pulse rounded mb-6" />
      <div className="grid gap-4 lg:gap-5 grid-cols-2 md:grid-cols-3">
        {[...Array(6)].map((_, i) => (
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
  searchParams,
}: {
  currentPage: number
  totalPages: number
  searchParams: Record<string, string | undefined>
}) {
  if (totalPages <= 1) return null

  const createPageUrl = (page: number) => {
    const params = new URLSearchParams()
    Object.entries(searchParams).forEach(([key, value]) => {
      if (value && key !== 'page') params.set(key, value)
    })
    if (page > 1) params.set('page', String(page))
    return `/products${params.toString() ? `?${params.toString()}` : ''}`
  }

  // Generate page numbers to show
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

async function ProductsGrid({ searchParams }: { searchParams: Record<string, string | undefined> }) {
  const { products, totalCount, totalPages, currentPage } = await getFilteredProducts({
    q: searchParams.q,
    category: searchParams.category,
    minPrice: searchParams.minPrice ? Number(searchParams.minPrice) : undefined,
    maxPrice: searchParams.maxPrice ? Number(searchParams.maxPrice) : undefined,
    sortBy: searchParams.sortBy as "newest" | "price-asc" | "price-desc" | "rating" | "popular" | undefined,
    page: searchParams.page ? Number(searchParams.page) : 1,
    limit: 9,
  })

  const startItem = (currentPage - 1) * 9 + 1
  const endItem = Math.min(currentPage * 9, totalCount)

  return (
    <div className="flex-1">
      {/* Results Header */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-base text-black/60 dark:text-white/60">
          {totalCount > 0
            ? `Showing ${startItem}-${endItem} of ${totalCount} Products`
            : 'No products found'}
        </h2>
        <SortDropdown />
      </div>

      {products.length > 0 ? (
        <>
          <ProductList products={products} />
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            searchParams={searchParams}
          />
        </>
      ) : (
        <div className="text-center py-12">
          <p className="text-lg text-black/60 dark:text-white/60 mb-4">
            No products match your filters
          </p>
          <Link
            href="/products"
            className="inline-block px-6 py-3 bg-black dark:bg-white text-white dark:text-black rounded-[62px] text-sm font-medium hover:opacity-90 transition-opacity"
          >
            Clear Filters
          </Link>
        </div>
      )}
    </div>
  )
}

export default async function ProductsPage({
  searchParams,
}: {
  searchParams: SearchParams
}) {
  const params = await searchParams
  const categories = await getAllCategories()

  // Build page title based on active filters
  let pageTitle = 'ALL PRODUCTS'
  if (params.category) {
    pageTitle = params.category.toUpperCase()
  }
  if (params.q) {
    pageTitle = `SEARCH: "${params.q}"`
  }

  return (
    <div className="max-w-[1440px] mx-auto px-4 md:px-8 lg:px-[100px] py-6 lg:py-10">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-sm text-black/60 dark:text-white/60 mb-6">
        <Link href="/" className="hover:text-black dark:hover:text-white transition-colors">
          Home
        </Link>
        <span>/</span>
        {params.category ? (
          <>
            <Link href="/products" className="hover:text-black dark:hover:text-white transition-colors">
              Products
            </Link>
            <span>/</span>
            <span className="text-black dark:text-white">{params.category}</span>
          </>
        ) : (
          <span className="text-black dark:text-white">Products</span>
        )}
      </nav>

      {/* Page Title */}
      <h1 className={`${integralCF.className} text-[32px] lg:text-[40px] font-bold mb-6`}>
        {pageTitle}
      </h1>

      {/* Main Content */}
      <div className="flex flex-col lg:flex-row gap-6 lg:gap-5">
        {/* Mobile Filter Wrapper (handles mobile drawer) */}
        <ProductsFilterWrapper categories={categories} />

        {/* Desktop Sidebar */}
        <div className="hidden lg:block w-[295px] shrink-0">
          <ProductFilters categories={categories} />
        </div>

        {/* Products Grid */}
        <Suspense fallback={<ProductsLoading />}>
          <ProductsGrid searchParams={params} />
        </Suspense>
      </div>
    </div>
  )
}
