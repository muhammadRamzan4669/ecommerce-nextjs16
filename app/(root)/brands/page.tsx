import { getAllBrands, getProductsByBrand } from '@/lib/actions/product.actions'
import { integralCF } from '@/lib/fonts'
import ProductList from '@/components/layout/product-list'
import Link from 'next/link'
import type { Metadata } from 'next'
import { Suspense } from 'react'
import { ChevronLeft, ChevronRight, Store } from 'lucide-react'
import Breadcrumb from '@/components/breadcrumb'

export const metadata: Metadata = {
  title: 'Brands',
  description: 'Shop by your favorite brands',
}

type SearchParams = Promise<{
  brand?: string
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
  brand,
}: {
  currentPage: number
  totalPages: number
  brand: string
}) {
  if (totalPages <= 1) return null

  const createPageUrl = (page: number) => {
    const params = new URLSearchParams()
    params.set('brand', brand)
    if (page > 1) params.set('page', String(page))
    return `/brands?${params.toString()}`
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

async function BrandProducts({ brand, page }: { brand: string; page: number }) {
  const { products, totalCount, totalPages, currentPage } = await getProductsByBrand(brand, {
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
            : 'No products found'}
        </h2>
      </div>

      {products.length > 0 ? (
        <>
          <ProductList products={products} />
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            brand={brand}
          />
        </>
      ) : (
        <div className="text-center py-12">
          <p className="text-lg text-black/60 dark:text-white/60 mb-4">
            No products found for this brand
          </p>
          <Link
            href="/brands"
            className="inline-block px-6 py-3 bg-black dark:bg-white text-white dark:text-black rounded-[62px] text-sm font-medium hover:opacity-90 transition-opacity"
          >
            View All Brands
          </Link>
        </div>
      )}
    </div>
  )
}

function BrandCard({ brand, isSelected }: { brand: string; isSelected: boolean }) {
  return (
    <Link
      href={`/brands?brand=${encodeURIComponent(brand)}`}
      className={`block p-6 rounded-[20px] border-2 transition-all ${
        isSelected
          ? 'border-black dark:border-white bg-black dark:bg-white text-white dark:text-black'
          : 'border-black/10 dark:border-white/10 hover:border-black/30 dark:hover:border-white/30'
      }`}
    >
      <h3 className="text-lg font-bold">{brand}</h3>
    </Link>
  )
}

export default async function BrandsPage({
  searchParams,
}: {
  searchParams: SearchParams
}) {
  const params = await searchParams
  const brands = await getAllBrands()
  const selectedBrand = params.brand || null
  const page = params.page ? Number(params.page) : 1

  return (
    <div className="max-w-[1440px] mx-auto px-4 md:px-8 lg:px-[100px] py-6 lg:py-10">
      <Breadcrumb
        items={
          selectedBrand
            ? [
                { label: "Home", href: "/" },
                { label: "Brands", href: "/brands" },
                { label: selectedBrand },
              ]
            : [
                { label: "Home", href: "/" },
                { label: "Brands" },
              ]
        }
      />

      {/* Page Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <Store className="w-8 h-8" />
          <h1 className={`${integralCF.className} text-[32px] lg:text-[40px] font-bold`}>
            {selectedBrand ? selectedBrand.toUpperCase() : 'BRANDS'}
          </h1>
        </div>
        <p className="text-black/60 dark:text-white/60 max-w-2xl">
          {selectedBrand
            ? `Explore all products from ${selectedBrand}`
            : 'Discover products from your favorite brands'}
        </p>
      </div>

      {/* Brand Grid or Product Grid */}
      {selectedBrand ? (
        <Suspense fallback={<ProductsLoading />}>
          <BrandProducts brand={selectedBrand} page={page} />
        </Suspense>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {brands.map((brand) => (
            <BrandCard key={brand} brand={brand} isSelected={false} />
          ))}
          {brands.length === 0 && (
            <div className="col-span-full text-center py-12">
              <p className="text-lg text-black/60 dark:text-white/60 mb-4">
                No brands found
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
      )}
    </div>
  )
}
