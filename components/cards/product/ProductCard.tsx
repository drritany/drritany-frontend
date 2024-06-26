"use client"
///Product Card component

///Libraries -->
import styles from "./productCard.module.scss"
import Image from "next/image";
import { IProduct, IClientInfo } from "@/config/interfaces";
import { useState, MouseEvent, useEffect } from "react";
import { useRouter, usePathname } from 'next/navigation';
import { slashedPrice, routeStyle, round } from "@/config/utils";
import { useClientInfoStore, useModalBackgroundStore, useDiscountModalStore } from "@/config/store";
import { Discount } from '@mui/icons-material';

///Commencing the code 
/**
 * @title Product Card Component
 * @returns The Product Card component
 */
const ProductCard = ({ product_, view }: { product_: IProduct, view: string | undefined }) => {
    const [product, setProduct] = useState<IProduct>({...product_})
    const clientInfo = useClientInfoStore(state => state.info)
    const router = useRouter()
    const routerPath = usePathname();
    const setModalBackground = useModalBackgroundStore(state => state.setModalBackground);
    const setDiscountModal = useDiscountModalStore(state => state.setDiscountModal);
    const setDiscountProduct = useDiscountModalStore(state => state.setDiscountProduct);

    useEffect(() => {
        //console.log("Loc: ", clientInfo)
        setProduct(() => product_)
    }, [clientInfo, product, product_]);

    ///This handles what happens when a product is clicked
    const viewProduct = (e: MouseEvent<HTMLElement, globalThis.MouseEvent>, id: string) => {
        e.preventDefault()
        //console.log("Type: ", typeof event)
        //console.log("id: ", id)
        
        router.push(`/products/${id}`);
    }

    ///This function opens discount modal
    const openDiscountModal = (e: MouseEvent<SVGSVGElement, globalThis.MouseEvent>): void => {
        e.preventDefault()
        const productName = product.name as unknown as string
        const productFreeOption = product.freeOption as unknown as boolean

        setDiscountProduct({ name: productName, freeOption: product.freeOption as unknown as boolean, poppedUp: false })
        setModalBackground(true)
        setDiscountModal(true)
    }

    const getViewClass = (view: string | undefined) => {
        switch (view) {
            case "slide":
                return styles.slideView
            case "query":
                return styles.queryView
            default: 
                undefined
        }
    }

    return (
        <main className={`${styles.main} ${getViewClass(view)}`} onClick={(e) => viewProduct(e, product._id)}>
            <div className={styles.discounts}>
                <div className={styles.percent}>
                    <span>-{product.discount}%</span>
                </div>
                {/* {product.extraDiscount ? (
                    <Discount className={styles.offer} onClick={(e) => openDiscountModal(e)} />
                ) : (
                    <></>
                )} */}
            </div>
            <div className={styles.card_image}>
                <Image
                    className={styles.img} 
                    src={product.images[0].src}
                    alt=""
                    width={product.images[0].width}
                    height={product.images[0].height}
                />
            </div>
            <div className={styles.card_name}>
                <span>{product.name}</span>
            </div>
            <div className={styles.card_price}>
                    <div className={styles.price_1}>
                        <strong>
                            {/* <span dangerouslySetInnerHTML={{ __html: decodedString(nairaSymbol) }} /> */}
                            {clientInfo ? (
                                <span>{clientInfo?.country?.currency?.symbol}</span>
                            ) : (
                                <></>
                            )}
                            {clientInfo?.country?.currency?.exchangeRate ? (
                                <span>
                                    {product.price ? (round(product.price * clientInfo.country?.currency?.exchangeRate, 1)).toLocaleString("en-US") : ""}
                                </span>
                            ) : (
                                <></>
                            )}
                        </strong>
                    </div>
                    <div className={styles.price_2}>
                        {/* {clientInfo ? (<span dangerouslySetInnerHTML={{ __html: decodedString(getCurrencySymbol(clientInfo)) }} />) : (<></>)} */}
                        {clientInfo ? (
                            <span>{clientInfo?.country?.currency?.symbol}</span>
                        ) : (
                            <></>
                        )}
                        {clientInfo?.country?.currency?.exchangeRate ? (
                            <span>
                                {product.price ? (
                                    round(slashedPrice(product.price * clientInfo.country?.currency?.exchangeRate, product.discount), 1)).toLocaleString("en-US") 
                                : (
                                    <></>
                                )}
                            </span>
                        ) : (
                            <></>
                        )}
                    </div>
                </div>
        </main>
    );
};
  
export default ProductCard;