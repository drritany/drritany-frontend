"use client"
///FAQ component

///Libraries -->
import styles from "./faq.module.scss"
import Link from "next/link";
import Image from "next/image";
import { IFAQState } from "@/config/interfaces";
import { useState, useEffect } from "react";
import AddIcon from "@mui/icons-material/Add";
import { faqs } from "@/config/database";
import { companyName } from "@/config/utils";

///Commencing the code 
/**
 * @title FAQ Component
 * @returns The FAQ component
 */
const FAQ = () => {
    //const [faqs, setFaqs] = useState<Array<IFAQState>>(faq_)
    const [activeHeading, setActiveHeading] = useState(0);

    ///This function triggers when someone opens an accordian
  const handleHeadingClick = (index: any) => {
    setActiveHeading(index === activeHeading ? null : index);
  };

    return (
        // <main className={styles.main} id="faqs">
        //     <h2><strong>FAQs</strong></h2>
        //     <span className={styles.brief}>
        //         At {companyName}, we are dedicated to providing our customers with the highest level of service and support. We are always available to answer your questions and help you find the right products for your needs.
        //     </span>
        //     <div className={styles.accordian}>
        //         {faqs ? faqs.map((faq, index) => ( 
        //             <div key={index} className={`${styles.accordian_item} ${activeHeading === index ? styles.activeAccordian : styles.inactiveAccordian}`}>
        //                 <button
        //                     className={`${styles.question} ${activeHeading === index ? styles.activeQuestion : styles.inactiveQuestion}`}
        //                     onClick={() => handleHeadingClick(index)}
        //                 >
        //                     {faq.question}
        //                     <AddIcon className={`${activeHeading === index ? styles.activeSymbol : styles.inactiveSymbol}`} />
        //                 </button>
        //                 <div
        //                     className={`${styles.answer} ${
        //                         activeHeading === index ? styles.answerActive : ''
        //                     }`}
        //                 >
        //                     {faq.answer} {index === 4 ? <Link href="/terms/#personal_data"><span>Read more</span></Link> : (<></>)}
        //                 </div>
        //             </div>
        //         )) : (<span>Loading...</span>)} 
        //     </div>
        // </main>
        <>
            <div className={`${styles.faqsHero}`}>
            <div className={styles.gradientOverlay}></div>
            <Image 
                className={styles.image}
                src={"https://drive.google.com/uc?export=download&id=1IUijgKEBpZqmRs4uL7lezKLijukfwlnV"}
                alt=""
                width={2048}
                height={1366}
            />
            <div className={styles.brief}>
                <span className={styles.brief1}>FAQs</span>
                <span className={styles.brief2}>At {companyName}, we are dedicated to providing our customers with the highest level of service and support. We are always available to answer your questions and help you find the right products for your needs.</span>
            </div>
        </div>
        <div className={styles.faqMain}>
            <div className={styles.accordian}>
                {faqs.map((faq, index) => ( 
                    <div key={index} className={`${styles.accordianItem} ${activeHeading === index ? styles.activeAccordian : styles.inactiveAccordian}`}>
                        <button
                            className={`${styles.question} ${activeHeading === index ? styles.activeQuestion : styles.inactiveQuestion}`}
                            onClick={() => handleHeadingClick(index)}
                        >
                            {faq.question}
                            <AddIcon className={`${activeHeading === index ? styles.activeSymbol : styles.inactiveSymbol}`} />
                        </button>
                        <div className={`${styles.answer} ${activeHeading === index ? styles.answerActive : ''}`}>
                            {faq.answer} {index === 17 ? <Link href="/terms-of-use/#account-security"><span>Learn more</span></Link> : (<></>)}
                        </div>
                    </div>
                ))}
            </div>
        </div>
        </>
    );
};
  
export default FAQ;