///Layout page

///Libraries -->
import styles from "./layout.module.scss"
import dynamic from "next/dynamic";
const Header = dynamic(() => import("@/components/header/Header"), { ssr: false })
//import Header from "@/components/header/Header";
import Footer from "@/components/footer/Footer";
import { domainName, companyName } from '@/config/utils';
import { ToastContainer } from 'react-toastify';
import Modal from "@/components/modalBackground/Modal";
import ContactModal from "@/components/contactModal/ContactModal";
import 'react-toastify/dist/ReactToastify.css';
import DiscountModal from "@/components/discountModal/DiscountModal";
import OrderModal from "@/components/orderModal/OrderModal";

///Commencing the code
let status: boolean = false

///Declaring the metadata
export const metadata = {
  metadataBase: new URL(domainName), 
  title: {
    default: `${companyName}`,
    template: `%s | ${companyName}`
  },
  icons: {
    icon: 'favicon.ico',
  },
  description: 'E-Commerce website for all sorts of natural health products',
  keywords: "drug, health, pharmacy, detox, toxin, shop, store, tea, pad, commerce, ecommerce, natural"
}

///This function gets the client details
// async function getClientInfo() {
  
//   try {
//     if (status === false) {
//       ///Getting the ip of the client
//       const ip_ = await fetch(
//         `https://api.ipify.org`,
//         {
//           next: {
//             revalidate: 60,
//           },
//         }
//       );
    
//       await new Promise((resolve) => setTimeout(resolve, 1000)); // Wait 1 second
    
//       const ip = await ip_.text();
//       console.log("IP: ", ip)

//       //Getting the client info with the given ip
//       const response = await fetch(
//         `${backend}/client-info/${ip}`,
//         {
//           next: {
//             revalidate: 60,
//           },
//         }
//       );
    
//       await new Promise((resolve) => setTimeout(resolve, 1000)); // Wait 1 second
//         //let clientInfo
//       //if (response.ok) {
//         const clientInfo = await response.json();
//       // } else {
//       //   clientInfo = {

//       //   }
//       // }
        
//       status = true
//       console.log("status updated")
//       return clientInfo;
//     } else {
//       console.log("status not updated")
//     }
    
// } catch (error) {
//     console.error(error);
// }
// }

///This fetches the contact information
// async function getContacts() {
//   try {
//     const response = await fetch(
//         `${backend}/contacts`,
//         {
//           next: {
//             revalidate: 60,
//           },
//         }
//       );
    
//       await new Promise((resolve) => setTimeout(resolve, 1000)); // Wait 1 second
    
//       const contacts = await response.json();
//       return contacts;
// } catch (error) {
//     console.error(error);
// }
// }

///Handles the root layout of the page
export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  // const clientInfo = await getClientInfo()
  // //console.log("Layout: ", clientInfo)
  // const contacts = await getContacts()

  return (
    <html lang="en" className={styles.html}>
      <body suppressHydrationWarning={true} className={styles.body}>
        <ToastContainer autoClose={5000} limit={5} newestOnTop={true} />
        <Header />
        <Modal>
          <DiscountModal />
          <ContactModal />
          <OrderModal />
        </Modal>
        <main className='container'>{children}</main>
        <Footer />
      </body>
    </html>
  )
}
