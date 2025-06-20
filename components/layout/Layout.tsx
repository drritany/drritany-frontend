"use client"
///Layout component

///Libraries -->
import styles from "./layout.module.scss"
import { useEffect, Suspense, useState } from "react";
import dynamic from "next/dynamic";
//const Header = dynamic(() => import("@/components/header/Header"), { ssr: false })
import Header from "@/components/header/Header"
import Footer from "@/components/footer/Footer";
import { ToastContainer } from 'react-toastify';
import Modal from "@/components/modals/modalBackground/Modal";
import 'react-toastify/dist/ReactToastify.css';
import { useClientInfoStore, useLoadingModalStore, useModalBackgroundStore, useOrderModalStore } from "@/config/store";
import { IClientInfo, ITrafficResearch, ISheetInfo, IProduct, IMetaWebEvent, MetaStandardEvent, MetaActionSource } from "@/config/interfaces";
import { countryList } from "@/config/database";
//import GoogleTagManager from "@/config/GoogleTagManager";
import GoogleAnalytics from '@/config/GoogleAnalytics';
import { useRouter, usePathname } from "next/navigation";
import Head from "next/head";
import { v4 as uuid } from 'uuid';
import { GoogleTagManager, sendGTMEvent } from "@next/third-parties/google"
import { getCurrentDate, getCurrentTime, backend, statSheetId, extractBaseTitle, userIdName, clientInfoName, productsName, getProducts, sortProductByActiveStatus, hashValue, sendMetaCapi } from "@/config/utils";
import { getDevice, getItem, getOS, setItem, Cache, notify, getFacebookCookies } from "@/config/clientUtils";

///Commencing the code
///This function get client's info
// async function getClientInfo(clientInfo: IClientInfo | undefined, setClientInfo: (info: IClientInfo) => void, _userId: string) {
//     try {
//         if (clientInfo === undefined) {
//             // ---> Uncomment this for general countries <---
//             // const res = await fetch(`https://api.ipdata.co?api-key=0c7caa0f346c2f6850c0b2e749ff04b3829f4a7229c88389b3160641`, {
//             //     method: "GET",
//             //     cache: "default",
//             // })
//             // console.log("IP red: ", res)

//             // if (res.ok) {
//             //     const info_ = await res.json()
//             //     console.log('Info res: ', info_)
//             //     const country_ = countryList.find(country => country.name?.abbreviation === info_.country_code)
//             //     const info : IClientInfo = {
//             //        _id: _userId,
//             //       ip: info_.ip,
//             //       country: country_ ? country_ : countryList.find(country => country.name?.abbreviation === "US")
//             //     }
//             //     console.log("Client info: ", info)
//             //     setClientInfo(info)
//             // } else {
//             //     getClientInfo(clientInfo, setClientInfo)
//             // }
//             // ---> Uncomment this for general countries <---

//             // ---> For USA only <---
//             const info : IClientInfo = {
//               _id: _userId,
//               ip: "xxxxxx",
//               country: countryList.find(country => country.name?.abbreviation === "US")
//             }
//             //setItem(userIdName, )
//             //console.log("Client info: ", info)
//             setClientInfo(info)
//             setItem(clientInfoName, info)
//             //setCacheItem(clientInfoName, info)
//         }
//     } catch (error) {
//       //console.log(error);
//     }
// }

/**
 * @title Layout Component
 * @returns The Layout component
 */
const Layout = ({ children }: { children: React.ReactNode }) => {
    //const setClientInfo = useClientInfoStore(state => state.setClientInfo);
    //const clientInfo = useClientInfoStore(state => state.info)
    const setLoadingModal = useLoadingModalStore(state => state.setLoadingModal)
    const setModalBackground = useModalBackgroundStore(state => state.setModalBackground)
    const routerPath = usePathname();
    const _userId = getItem(userIdName)
    const [userId, setUserId] = useState<string>(_userId ? _userId : uuid())
    const _clientInfo = getItem(clientInfoName)
    const [clientInfo, setClientInfo] = useState<IClientInfo | undefined>(_clientInfo!)
    const [trafficStore, setTrafficStore] = useState<boolean>(false)
    const _products = Cache(productsName).get()
    const orderModal = useOrderModalStore(state => state.modal)
    const containerId = process.env.NEXT_PUBLIC_GTM_CONTAINER_ID!
    const [mounted, setMounted] = useState<boolean>(false)
    const [currentURL, setCurrentURL] = useState<string>()
    //const [products, setProducts] = useState<Array<IProduct> | undefined>(_products?.value!)

    //Fetching client info
    // useEffect(() => {


    //   //I want to fetch the products and set them in cache ------------------------->
    //   const _getProducts = async () => {
    //     const _products = Cache(productsName).get()
    //     console.log('Cache products: ', Cache(productsName).get())
    //     if (_products && Object.keys(_products.value).length !== 0) {

    //     } else {
    //       const products = sortProductByActiveStatus(await getProducts(), "Active") as unknown as Array<IProduct>
    //       console.log("Called: ", products)
    //       if (products) {
    //         console.log("setting...")
    //         Cache(productsName).set(products, 300)
    //       }

    //     }

    //     console.log('Cache products2: ', Cache(productsName).get())
    //   }

    //   _getProducts()
    //   //Decided to test something here ------------------------->

    //   //Setting the client info
    //   // if (!getItem(clientInfoName)) {
    //   //   //Setting the client info
    //   //   const info : IClientInfo = {
    //   //     _id: userId,
    //   //     ip: "xxxxxx",
    //   //     country: countryList.find(country => country.name?.abbreviation === "US")
    //   //   }
    //   //   setItem(clientInfoName, info)
    //   //   setClientInfo(info)
    //   // }
    // }, []);
    //This is a simple function that gets the ip of a client

    // Fetch initial data once on mount
    useEffect(() => {
      setMounted(true);

      const getClientInfo = async () => {
        try {
          const res = await fetch(`https://api.ipdata.co?api-key=0c7caa0f346c2f6850c0b2e749ff04b3829f4a7229c88389b3160641`, {
              method: "GET",
              cache: "default",
          })
          //console.log("IP red: ", res)
  
          if (res.ok) {
              const info_ = await res.json()
              //console.log('Info res: ', info_)

            //Setting the user id
            if (!_userId) {
              setItem(userIdName, userId)
            } else {
              //console.log("User id is active")
            }

            // ---> For universal <---
            const country_ = countryList.find(country => country.name?.abbreviation === info_.country_code)
            const info : IClientInfo = {
              _id: userId,
              ipData: {
                ip: info_.ip,
                city: info_.city,
                region: info_.region,
                country: info_.country_name
              },
              countryInfo: country_ ? country_ : countryList.find(country => country.name?.abbreviation === "US")
            }
            //console.log("")
            //console.log("setting")
            //setClientInfo(info)
            setItem(clientInfoName, info)
            setClientInfo(() => info)
          } 
        } catch (error) {
          console.error('Error: ', error)
        }
      }

      getClientInfo()
    }, []);

    //Updating client info
    useEffect(() => {
        //console.log("Hero: ", _clientInfo, clientInfo)
        //console.log("Container: ", containerId)
        //console.log('ToastContainer:', ToastContainer)

        let _clientInfo_
        //let interval: NodeJS.Timer

        if (!clientInfo) {
          setModalBackground(true)
          setLoadingModal(true)

            //console.log("Client info not detected")
            const interval = setInterval(() => {
                _clientInfo_ = getItem(clientInfoName)
                //console.log("Delivery Info: ", _deliveryInfo)
                setClientInfo(_clientInfo_)
            }, 1000);

            //console.log("Delivery Info: ", deliveryInfo)

            return () => {
                clearInterval(interval );
            };
        } else {
          //clearInterval(interval)
          if (orderModal === false) {
            setModalBackground(false)
            //console.log("setting off modal background 3")
          }
          //setModalBackground(false)

            setLoadingModal(false)
            //console.log("Client info detected")
        }

    }, [_clientInfo])

    //Setting the client user details
    // useEffect(() => {
    //   const start = performance.now()
    //   //Setting the clientInfo
    //   if (!_clientInfo) {
    //     //console.log('Client is not active')

    //     //Setting client infos 
    //     const getClientInfo = async () => {
    //       try {
    //         const res = await fetch(`https://api.ipdata.co?api-key=0c7caa0f346c2f6850c0b2e749ff04b3829f4a7229c88389b3160641`, {
    //             method: "GET",
    //             cache: "default",
    //         })
    //         //console.log("IP red: ", res)
    
    //         if (res.ok) {
    //             const info_ = await res.json()
    //             console.log('Info res: ', info_)

    //           //Setting the user id
    //           if (!_userId) {
    //             setItem(userIdName, userId)
    //           } else {
    //             //console.log("User id is active")
    //           }

    //           // ---> For USA only <---
    //           const info : IClientInfo = {
    //             _id: userId,
    //             ipData: {
    //               ip: info_.ip,
    //               city: info_.city,
    //               region: info_.region,
    //               country: info_.country_name
    //             },
    //             countryInfo: countryList.find(country => country.name?.abbreviation === "US")
    //           }
    //           //console.log("setting")
    //           //setClientInfo(info)
    //           setItem(clientInfoName, info)
    //           setClientInfo(() => info)
    //         } 
    //       } catch (error) {
    //         console.log('Error: ', error)
    //       }
    //     }

    //     getClientInfo()
    //   } else {
    //     //console.log('Client is active')
    //   }

    //   //console.log("client info store: ", clientInfo)
    //   const end = performance.now()
    //   //console.log(`useEffect 1 took ${end - start}ms`)
    //   //getClientInfo(clientInfo, setClientInfo, userId)
    // }, [userId])

    //Keeping track of visitors
    useEffect(() => {
      const start = performance.now()

      //getClientInfo(clientInfo, setClientInfo, userId)

      //console.log("Client Info Layout: ", clientInfo)
      //Storing the keyword in an excel sheet for research purposes
      if (clientInfo) {

          //Checking if the traffic has been stored
          if (!trafficStore) {
            //console.log("Sending traffic")
            const storeTraffic = async () => {
                try {

                    //Arranging the query research info
                    const trafficInfo: ITrafficResearch = {
                        ID: clientInfo?._id!,
                        IP: clientInfo?.ipData?.ip!,
                        City: clientInfo?.ipData?.city!,
                        Region: clientInfo?.ipData?.region!,
                        Country: clientInfo?.ipData?.country!,
                        Page_Title: extractBaseTitle(document.title),
                        Page_URL: routerPath,
                        Date: getCurrentDate(),
                        Time: getCurrentTime(),
                        OS: getOS(),
                        Device: getDevice()
                    }

                    const sheetInfo: ISheetInfo = {
                        sheetId: statSheetId,
                        sheetRange: "Traffic!A:K",
                        data: trafficInfo
                    }

                    const res = await fetch(`${backend}/sheet`, {
                        method: "POST",
                        body: JSON.stringify(sheetInfo),
                    });

                    if (res.ok) {
                      setTrafficStore(true)
                    } else {
                      storeTraffic()
                    }
                    //console.log("Google Stream: ", res)
                } catch (error) {
                    //console.log("Store Error: ", error)
                }
            }

            storeTraffic()

            //Sending page view event to gtm
            const countryInfo_ = countryList.find((country) => country.name?.common === clientInfo.ipData?.country)
            const stateInfo_ = countryInfo_?.states?.find((state) => state.name === clientInfo.ipData?.region)
            const eventTime = Math.round(new Date().getTime() / 1000)
            const eventId = uuid()
            const userAgent = navigator.userAgent
            const { fbp, fbc } = getFacebookCookies();
            const eventData: IMetaWebEvent = {
              data: [
                {
                  event_name: MetaStandardEvent.PageView,
                  event_time: eventTime,
                  event_id: eventId,
                  action_source: MetaActionSource.website,
                  custom_data: {
                    content_name: extractBaseTitle(document.title),
                  },
                  user_data: {
                    client_user_agent: userAgent,
                    client_ip_address: clientInfo?.ipData?.ip!,
                    external_id: hashValue(clientInfo?._id!),
                    fbc: fbc!,
                    fbp: fbp!,
                    ct: hashValue(clientInfo?.ipData?.city?.trim().toLowerCase()!),
                    st: hashValue(stateInfo_?.abbreviation?.trim().toLowerCase()!),
                    country: hashValue(countryInfo_?.name?.abbreviation?.trim().toLowerCase()!)
                  }
                }
              ]
            } 
            sendGTMEvent({ event: eventData.data[0].event_name, value: eventData.data[0] })
            sendMetaCapi(eventData, clientInfo?._id!, getOS(), getDevice())

          } else {
            //console.log("Traffic has been sent already")
          }


          if (orderModal === false) {
            setModalBackground(false)
            //console.log("setting off modal background 1")
          }
          //setModalBackground(false)
        setLoadingModal(false)
      } else {
        setModalBackground(true)
        setLoadingModal(true)
      }

      const end = performance.now()
      //console.log(`useEffect 2 took ${end - start}ms`)
    }, [routerPath, clientInfo, trafficStore])

    //Checking if url has changed and updating page view event
    useEffect(() => {
        const intervalId = setInterval(() => {
            if (currentURL === window.location.href) {
                undefined
            } else {
              //console.log("url changed")

              if (!clientInfo) {
                //console.log("client not detected")
                return
              }
                //console.log("changed")
                clearInterval(intervalId)
                setCurrentURL(window.location.href)
                //window.location.reload()

                const storeTraffic = async () => {
                  try {
  
                      //Arranging the query research info
                      const trafficInfo: ITrafficResearch = {
                          ID: clientInfo?._id!,
                          IP: clientInfo?.ipData?.ip!,
                          City: clientInfo?.ipData?.city!,
                          Region: clientInfo?.ipData?.region!,
                          Country: clientInfo?.ipData?.country!,
                          Page_Title: extractBaseTitle(document.title),
                          Page_URL: routerPath,
                          Date: getCurrentDate(),
                          Time: getCurrentTime(),
                          OS: getOS(),
                          Device: getDevice()
                      }
  
                      const sheetInfo: ISheetInfo = {
                          sheetId: statSheetId,
                          sheetRange: "Traffic!A:K",
                          data: trafficInfo
                      }
  
                      const res = await fetch(`${backend}/sheet`, {
                          method: "POST",
                          body: JSON.stringify(sheetInfo),
                      });
  
                      if (res.ok) {
                        setTrafficStore(true)
                      } else {
                        storeTraffic()
                      }
                      //console.log("Google Stream: ", res)
                  } catch (error) {
                      //console.log("Store Error: ", error)
                  }
              }
  
              storeTraffic()
  
              //Sending page view event to gtm
              const countryInfo_ = countryList.find((country) => country.name?.common === clientInfo?.ipData?.country)
              const stateInfo_ = countryInfo_?.states?.find((state) => state.name === clientInfo?.ipData?.region)
              const eventTime = Math.round(new Date().getTime() / 1000)
              const eventId = uuid()
              const userAgent = navigator.userAgent
              const { fbp, fbc } = getFacebookCookies();
              const eventData: IMetaWebEvent = {
                data: [
                  {
                    event_name: MetaStandardEvent.PageView,
                    event_time: eventTime,
                    event_id: eventId,
                    action_source: MetaActionSource.website,
                    custom_data: {
                      content_name: extractBaseTitle(document.title),
                    },
                    user_data: {
                      client_user_agent: userAgent,
                      client_ip_address: clientInfo?.ipData?.ip!,
                      external_id: hashValue(clientInfo?._id!),
                      fbc: fbc!,
                      fbp: fbp!,
                      ct: hashValue(clientInfo?.ipData?.city?.trim().toLowerCase()!),
                      st: hashValue(stateInfo_?.abbreviation?.trim().toLowerCase()!),
                      country: hashValue(countryInfo_?.name?.abbreviation?.trim().toLowerCase()!)
                    }
                  }
                ]
              } 
              sendGTMEvent({ event: eventData.data[0].event_name, value: eventData.data[0] })
              sendMetaCapi(eventData, clientInfo?._id!, getOS(), getDevice())
                
            }
            
        }, 1000);

        return () => clearInterval(intervalId);
    }, [currentURL]);

    // useEffect(() => {
    //         //console.log("Hero: ", _clientInfo, clientInfo)

    //         let _clientInfo_

    //         if (!clientInfo) {
    //             //console.log("Client info not detected")
    //             const interval = setInterval(() => {
    //                 _clientInfo_ = getItem(clientInfoName)
    //                 //console.log("Delivery Info: ", _deliveryInfo)
    //                 setClientInfo(_clientInfo_)
    //             }, 100);

    //             //console.log("Delivery Info: ", deliveryInfo)

    //             return () => {
    //                 clearInterval(interval);
    //             };
    //         } else {
    //             setModalBackground(false)
    //             setLoadingModal(false)
    //             //console.log("Client info detected")
    //         }

    //     }, [clientInfo])

  return (
    <html lang="en" className={styles.html}>
       {/* <Head> */}
          
          {/* <GoogleAnalytics /> */}
      {/* </Head> */}
      <GoogleTagManager gtmId={containerId} />
      <body suppressHydrationWarning={true} className={styles.body}>
        {/* Add GTM noscript */}
        {/* <noscript>
          <iframe
            src={`https://www.googletagmanager.com/ns.html?id=${containerId}`}
            height="0"
            width="0"
            style={{ display: 'none', visibility: 'hidden' }}
          ></iframe>
        </noscript> */}
       {mounted && <ToastContainer autoClose={8000} limit={5} newestOnTop={true} />}
        <Header />
        <Modal />
          <main className='container'>{children}</main>
        <Footer />
      </body>
    </html>
  );
};

export default Layout;