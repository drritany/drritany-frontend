"use client"
///Terms of use component

///Libraries -->
import styles from "./terms.module.scss"

///Commencing the code 
  
/**
 * @title Terms Component
 * @returns The Terms component
 */
const Terms = () => {

    return (
        <main className={`${styles.main}`}>
        <h3 className={styles.terms_heading}>Terms of Use</h3>
        <div className={styles.terms_body}>
            <span>
                Welcome to Dr Ritany, your goto for your health products. These terms of use (&apos;Terms&apos;) govern your access and use of the website, products, 
                and services offered by our company (&apos;we&apos;, &apos;us&apos;, or &apos;our&apos;) through this website. By accessing and using our website, 
                you agree to be bound by these Terms.
            </span>
            <ol>
                <li>Website Use: Our website is intended for informational and e-commerce purposes only. You are prohibited from using our website for any illegal or unauthorized purposes.</li>
                <li id="personal_data">Personal Data: In order to purchase products from our website, you will be required to provide us with personal information. We respect your privacy and would only share it with the delivery company that&apos;s meant to deliver your products.</li>
                <li>Product Orders: When you place an order for a products on our website are made on delivery, delivery is fee. You are responsible for all applicable taxes associated with your purchase</li>
                <li>Product Information: We make every effort to provide accurate and complete product information on our website. We guarantee the accuracy or completeness of any product information on our website.</li>
                <li>Medical Information: Our website may provide general medical information, but it is not intended to be a substitute for professional medical advice, diagnosis, or treatment. You should always seek the advice of your physician or other qualified healthcare provider with any questions you may have regarding a medical condition</li>
                <li>Intellectual Property: Our website and its contents, including but not limited to text, graphics, images, and software, are protected by copyright, trademark, and other intellectual property laws. You may not copy, modify, distribute, or reproduce any part of our website without our prior written consent.</li>
                <li>Disclaimer of Warranties: OUR WEBSITE AND THE PRODUCTS AND SERVICES OFFERED THROUGH OUR WEBSITE ARE PROVIDED “AS IS” WITHOUT WARRANTY OF ANY KIND, EITHER EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE IMPLIED WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, AND NON-INFRINGEMENT.</li>
                <li>Limitation of Liability: IN NO EVENT SHALL WE BE LIABLE FOR ANY INDIRECT, SPECIAL, INCIDENTAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES ARISING OUT OF OR RELATED TO YOUR USE OF OUR WEBSITE OR THE PRODUCTS OR SERVICES OFFERED THROUGH OUR WEBSITE.</li>
                <li>Indemnification: You agree to indemnify, defend, and hold us harmless from any claims, damages, liabilities, and expenses (including attorneys&apos; fees) arising out of or related to your use of our website or the products or services offered through our website.</li>
                <li>Governing Law: These Terms shall be governed by and construed in accordance with the laws of the jurisdiction in which our company is incorporated.</li>
                <li>Modification: We reserve the right to modify these Terms at any time, and such modifications shall be effective immediately upon posting on our website.</li>
                <li>Termination: We may terminate these Terms and your access to our website at any time, with or without cause or notice.</li>
                <li>Entire Agreement: These Terms constitute the entire agreement between you and us regarding your use of our website and the products and services offered through our website.</li>
            </ol>
        </div>
    </main>
    );
};
  
export default Terms;