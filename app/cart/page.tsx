
///This handles the cart page

///Libraries -->
//import Cart from "@/components/cart/Cart"
import ProductSlide from "@/components/product/productSlide/ProductSlide"
import { IProduct, ISlideTitle } from "@/config/interfaces";
import { backend, shuffleArray, sortProductByActiveStatus } from "@/config/utils";
import { Metadata } from "next";
import dynamicImport from "next/dynamic";
const Cart = dynamicImport(() => import("@/components/cart/Cart"), { ssr: false })
import { Suspense } from "react";

///Commencing the code
export const metadata: Metadata = {
  title: 'Cart',
  description: `Add products to your cart and checkout.`,
  alternates: {
    canonical: `/cart`
  }
}

export const dynamic = "force-dynamic"

///This fetches a list of all products
async function getProducts() {
  try {
    const res = await fetch(`${backend}/product?action=order`, {
      method: "GET",
      cache: "no-store",
    })

    if (res.ok) {
      return res.json()
    } else {
      getProducts()
    }
  } catch (error) {
      console.error(error);
  }
}

/**
 * @title Homepage
 */
export default async function CartPage() {
  const products = sortProductByActiveStatus(shuffleArray(await getProducts()), "Active") as unknown as Array<IProduct>
  const titles1: ISlideTitle = {
    slideTitleId: 2,
    barTitleId: 2
  }

  return (
    <main className="cart_page">
      <Cart />
      <ProductSlide product_={products} title_={titles1} view_={undefined}/>
    </main>
  )
}
