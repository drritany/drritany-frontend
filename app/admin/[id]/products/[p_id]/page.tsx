///This handles the admin product info page

///Libraries -->
import AdminProductInfo from '@/components/admin/products/info/ProductInfo';
import SimilarProduct from '@/components/product/productSlide/ProductSlide';
import RecommendedProduct from '@/components/product/productSlide/ProductSlide';
import { shuffleArray, backend, removeProductFromArray, sortProductsBySimilarity } from '@/config/utils';
import { Metadata } from 'next';
import { IProduct, Props } from '@/config/interfaces';

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
      console.log("not refetching")
      //getProduct(id)
    }
    
  } catch (error) {
      console.error(error);
  }
}


///Declaring the metadata
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  return {
    title: `Product`,
    description: `Edit/View Product`,
    alternates: {
      canonical: `/products/${params.id}`
    }
  }
}

//This function sets the products
// async function getProducts() {
//   try {
//     const res = await fetch(`${domainName}/api/product?action=order`, {
//       method: "GET",
//       cache: "no-store",
//     })

//     if (res.ok) {
//       return res.json()
//     } else {
//       getProducts()
//     }
    
//   } catch (error) {
//       console.error(error);
//   }
// }

/**
 * @title Product info page
 */
export default async function ProductByIdPage({ params: { p_id } }: { params: { p_id: string }}) {
  const product = await getProduct(p_id) as unknown as Array<IProduct>
  //console.log("admin product info &")
  //const products_ = await getProducts() as unknown as Array<IProduct>
  //const products = shuffleArray(removeProductFromArray(product[0], products_))

  return (
    <main className="product_info_page">
      <AdminProductInfo product_={product} />
      {/* <SimilarProduct product_={sortProductsBySimilarity(products, product[0])} titleId_={0}/> */}
      {/* <RecommendedProduct product_={products} titleId_={2} /> */}
    </main>
  )
}