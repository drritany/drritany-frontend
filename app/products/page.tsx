
///This handles the product query page

///Libraries -->
import { NextApiRequest, NextApiResponse, Metadata } from 'next';
import { backend, shuffleArray, sortProductByActiveStatus, sortProductByOrder, getProducts } from '@/config/utils';
import ProductSlide from '@/components/product/productSlide/ProductSlide';
import { IProduct, Props, ISlideTitle } from '@/config/interfaces';
import ProductCatalog from '@/components/product/productCatalog/ProductCatalog';
import HomeCampaignB from '@/components/campaigns/homeCampaignB/homeCampaignB';
import HomeCampaignA from '@/components/campaigns/homeCampaignA/homeCampaignA';

///Commencing the code
export async function generateMetadata({ searchParams }: Props): Promise<Metadata> {
  const { query } = await searchParams

  if (query) {
    return {
      title: `${query}`,
      description: `Search our range of products.`,
      alternates: {
        canonical: `/products?query=${query}`
      }
    } as Metadata
  } else {
    return {
      title: `Products`,
      description: `Explore our range of products`,
      alternates: {
        canonical: `/products`
      }
    } as Metadata
  }
}

///This function searches for passed in query
async function getQueriedProducts(query: string | undefined) {
    try {
      const res = await fetch(`${backend}/product?action=search&query=${query}`, {
        method: "GET",
        cache: "no-store",
      });
      
      if (res.ok) {
        return res.json()
      } else {
        //getQueriedProducts(query)
        console.log("request not ok")
      }
  } catch (error) {
      console.error(error);
  }
}

/**
 * @title Product query page
 */
 export default async function ProductPage({ searchParams }: Props) {
    const { query } = await searchParams
    const titles1: ISlideTitle = {
      slideTitleId: 4,
      barTitleId: 0
    }
    const titles2: ISlideTitle = {
      slideTitleId: 2,
      barTitleId: 2
    }
    
    const queryProducts = sortProductByActiveStatus(await getQueriedProducts(query as unknown as string), "Active")
    const allProducts = sortProductByActiveStatus(shuffleArray(await getProducts()), "Active") as unknown as Array<IProduct>
    //const mostOrdered = sortProductByOrder(allProducts)

    let products
    if (query) {
      products = queryProducts
    } else {
      products = allProducts
    }
  
    // if (query) {
    //   return (
    //     <main className="search_page">
    //       <ProductQuery keyword_={query} query_={queryProducts!} />
    //       <ProductSlide product_={products} title_={titles1} view_={undefined}/>
    //     </main>
    //   )
    // } else {
    //   return (
    //     <main className="search_page">
    //       <ProductGrid product_={products} view_={undefined} />
    //       <ProductSlide product_={products} title_={titles1} view_={undefined}/>
    //     </main>
    //   )
    // }

    return (
      <main className="search_page">
        <ProductCatalog query_={query as unknown as string} products_={products!} />
        {query && (queryProducts === undefined || queryProducts.length === 0) ? (
          <ProductSlide _products={allProducts} _product={undefined} title_={titles1} view_={"productSlide1"}/>
        ) : (<></>)}
        <ProductSlide _products={allProducts} _product={undefined} title_={titles2} view_={"productSlide2"}/>
        {/* <HomeCampaignB /> */}
      </main>
    )
  }
  