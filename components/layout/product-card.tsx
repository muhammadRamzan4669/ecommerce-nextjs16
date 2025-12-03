import Image from 'next/image'

export default function ProductCard({ product }: { product: any }) {

  return <li className='s-[200px] flex-col flex' >
    <Image src={product.images[0]} alt={product.name} width={200} height={200} className='lg:size-[300px]' />
    <text className='text-xs'>{product.brand}</text>
    <h2 className="text-[16px] lg:text-[20px] font-bold">{product.name}</h2>
    <div>{product.rating}</div>
    {product.stock > 0 ?
      <text className='font-bold'>${product.price}</text> :
      <text className='text-destructive text-md'>OUT OF STOCK</text>
    }

  </li>
}
