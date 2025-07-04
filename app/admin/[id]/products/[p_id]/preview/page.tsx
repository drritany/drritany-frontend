"use Client"
///This handles the product preview page

///Libraries -->
import ProductInfo from '@/components/product/productInfo/productInfo';
import SimilarProduct from '@/components/product/productSlide/ProductSlide';
import RecommendedProduct from '@/components/product/productSlide/ProductSlide';
import { shuffleArray, backend, removeProductFromArray, sortProductsBySimilarity, getProductReviewsByProductId } from '@/config/utils';
import { Metadata } from 'next';
import { IProduct, Props, IProductReview } from '@/config/interfaces';

///Commencing the code -->

///This fetches the product info page
async function getProduct(id: string) {
  try {
    const res = await fetch(`${backend}/product/${id}`, {
      method: "GET",
      cache: "no-store",
    })

    if (res.ok) {
      return res.json()
    } else {
      console.log("not refetching: ", res)
      //getProduct(id)
    }
    
    } catch (error) {
        console.log("Check: ", error)
        console.error(error);
    }
}


///Declaring the metadata
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { p_id } = await params
  const product: Array<IProduct> | undefined = await getProduct(p_id)

  if (!product || product?.length === 0) {
    return {
      title: "Not found",
      description: "Page not found"
    }
  } else {
    return {
      title: `${product[0].name}`,
      description: `${product[0].description}`,
      alternates: {
        canonical: `/products/${p_id}`
      }
    }
  }
}

/**
 * @title Product preview page
 */
export default async function ProductPreviewPage({ params }: Props) {
  const { p_id } = await params
  const product = await getProduct(p_id) as unknown as Array<IProduct>
  const productReviews = await getProductReviewsByProductId(p_id) as unknown as Array<IProductReview>
  console.log('Producthhs: ', product)

  return (
    <main className="product_info_page">
      <ProductInfo product_={product[0]} reviews_={productReviews} />
      {/* <RecommendedProduct product_={products} titleId_={2} /> */}
    </main>
  )
}
