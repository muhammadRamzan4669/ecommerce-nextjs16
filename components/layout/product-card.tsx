import { Product } from '@/types'
import Image from 'next/image'
import Link from 'next/link'

export default function ProductCard({ product }: { product: Product }) {

  return <article className='s-[200px] flex-col flex'>
    <Link href={`/product/${product.slug}`} className='block group'>
      <figure className='relative'>
        <Image
          src={product.images[0]}
          alt={product.name}
          width={200}
          height={200}
          loading="lazy"
          className='lg:size-[300px]'
        />
      </figure>

      <div className='mt-2'>
        <p className='p-xs text-muted-foreground'>{product.brand}</p>

        <h2 className="p-4 lg:p-5 font-bold">{product.name}</h2>

        <div
          aria-label={`Rating: ${product.rating} out of 5 stars`}
          role="img"
        >
          {product.rating}
        </div>

        {product.stock > 0 ? (
          <data value={product.price} className='font-bold block mt-1'>
            ${product.price}
          </data>
        ) : (
          <p className='p-destructive p-md'>
            <strong>OUT OF STOCK</strong>
          </p>
        )}
      </div>
    </Link>
  </article>
}
