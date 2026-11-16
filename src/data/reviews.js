/**
 * Client reviews copied from our team's two Fiverr profiles (verified orders).
 * - One review per client (where a client reviewed several orders, the most
 *   detailed one is used; `repeat` marks clients who came back).
 * - Platform names (Wix, Velo, Shopify) are left out of the quotes on purpose;
 *   otherwise the wording is the client's own, and "…" marks shortened text.
 * - Keep `reviewSummary` in sync with both profiles.
 * `photo` is the client's Fiverr avatar when they have one; otherwise a letter avatar is drawn.
 */
export const reviewSummary = {
  platform: 'Fiverr',
  rating: 4.9, // weighted across both profiles: (25 × 5.0 + 48 × 4.9) / 73
  count: 73,
  fiveStar: 70,
  profiles: 2,
  // shows a "See reviews on Fiverr" button
  profileUrl: 'https://www.fiverr.com/ractorn_studio',
};

export const reviews = [
  {
    name: 'everttsharif', country: 'United States', code: 'us', rating: 5,
    project: 'Website design', repeat: true,
    quote: 'Excellent website designer! I’m very happy with the work and overall experience. He is highly skilled in website design, development, and customization. He understood my requirements perfectly and delivered great results with excellent attention to detail. Highly recommended!',
  },
  {
    name: 'jesonnorth', country: 'United Kingdom', code: 'gb', rating: 5,
    project: 'Online store',
    quote: 'Riaz did an excellent job on our website. From the beginning, he was professional, responsive, and very easy to work with. He took the time to understand our requirements and delivered a clean, professional-looking website that exceeded our expectations. The product pages are well organized, the overall design looks polished, and the customer experience is smooth and easy to navigate. … We’re very happy with the final result and would definitely recommend Riaz to anyone looking for a reliable and skilled website developer.',
  },
  {
    name: 'sklano', country: 'United States', code: 'us', rating: 5, photo: '/images/reviews/sklano.jpg',
    project: 'Company re-brand', repeat: true,
    quote: 'We set out on a mission — to re-brand a 30 year old company into a unified one stop service provider. Mission complete!',
  },
  {
    name: 'miamia2019', country: 'United Kingdom', code: 'gb', rating: 5,
    project: 'Gift card system', repeat: true,
    quote: 'I’m very happy with Sunmoon’s work on this project. He developed and implemented the gift card functionality for my website, and I’m really pleased with the final result. Throughout the project he was professional, polite, patient and very thorough. He communicated clearly, listened carefully to my requirements and was always willing to review feedback and make adjustments where needed. I especially appreciated his support during the testing stage. … Highly recommended.',
  },
  {
    name: 'sesjones444', country: 'United States', code: 'us', rating: 5,
    project: 'Website development',
    quote: 'I had such a great experience working with Riaz on my website. He did an exceptional job bringing my vision to life and made sure every detail I needed was completed exactly the way I asked. What really stood out to me was his attention to detail, communication, and willingness to make sure everything was done properly. He even offered 30 days after completion to fix anything that may need adjusting, which I really appreciated. …',
  },
  {
    name: 'mollides', country: 'United States', code: 'us', rating: 5, photo: '/images/reviews/mollides.jpg',
    project: 'CMS & dynamic pages', repeat: true,
    quote: 'This was easily one of the best Fiverr experiences I have ever had. They did exactly as I needed, carefully and thoroughly. The communication was regular and friendly. The work, the attitude, the expertise, were all very professional. I was over my head with CMS and dynamic pages… their help was well worth the price. I can highly recommend Sunmoon.',
  },
  {
    name: 'jhan_np', country: 'United States', code: 'us', rating: 5,
    project: 'Store design',
    quote: 'I had a fantastic experience working with Riaz! He created a beautiful, professional, and modern store design that looks amazing and is very user-friendly. Riaz paid great attention to every design detail, from the layout and colors to the overall look and feel of the website. The final design exceeded my expectations! … Excellent work and outstanding service!',
  },
  {
    name: 'mitchel_gomezz', country: 'United States', code: 'us', rating: 5,
    project: 'Booking system', repeat: true,
    quote: 'I’m extremely happy with the booking system page created by Sunmoon. The design looks clean, modern, and professional, and everything works smoothly as expected. Communication was excellent throughout the project, and he was very responsive to feedback and details. The work was delivered on time with great quality and attention to detail.',
  },
  {
    name: 'elilazer', country: 'Switzerland', code: 'ch', rating: 5, photo: '/images/reviews/elilazer.jpg',
    project: 'E-commerce features', lang: 'fr',
    quote: 'J’ai eu le plaisir de collaborer avec ce développeur et je suis très satisfaite de son travail. Il a rapidement compris des demandes pourtant complexes, notamment la mise en place de fonctionnalités spécifiques pour mon e-commerce. Il est réactif, professionnel, patient et propose toujours des solutions adaptées. … Un vrai plaisir de collaborer avec lui.',
  },
  {
    name: 'nagim63', country: 'United States', code: 'us', rating: 5,
    project: 'Business website',
    quote: 'Riaz did an excellent job with our website. We needed something clean, professional, and easy for our customers to navigate, and he delivered exactly that. Communication was clear throughout the project and everything works perfectly on mobile as well.',
  },
  {
    name: 'jahan_prova', country: 'United States', code: 'us', rating: 5,
    project: 'Domain & launch', repeat: true,
    quote: 'Riaz is really helpful. He connected the domain and patiently waited for two days to make sure the DNS was properly connected. He’s very efficient and reliable.',
  },
  {
    name: 'emilyrentz', country: 'United States', code: 'us', rating: 5, photo: '/images/reviews/emilyrentz.jpg',
    project: 'Website design',
    quote: 'Wonderful work! Thank you so much for your attention to detail and high quality design. Really appreciate it.',
  },
  {
    name: 'john_d_luffy', country: 'United States', code: 'us', rating: 5,
    project: 'Website development', repeat: true,
    quote: 'I’m really impressed with his work! The website looks amazing, professional, and exactly what I was hoping for. He was very responsive, easy to communicate with, and delivered everything on time. He is truly great at website building, and his pricing is very affordable for the quality he provides. I’d definitely recommend him to anyone looking for a skilled and reliable web developer.',
  },
  {
    name: 'berry93', country: 'Netherlands', code: 'nl', rating: 5,
    project: 'Website development',
    quote: 'Working with Riaz was great. He delivered a working website. I would definitely recommend him. I will work with him in the future.',
  },
  {
    name: 'anne_roster', country: 'United States', code: 'us', rating: 5,
    project: 'Store design',
    quote: 'Riaz did an excellent job with my store design. I got a really good result, and he knows how to design a store that looks professional and helps attract more customers. He understood what I wanted and delivered great work. Highly recommended!',
  },
  {
    name: 'veronica_wilss', country: 'United States', code: 'us', rating: 5,
    project: 'eBook website', repeat: true,
    quote: 'Thank you so much Sunmoon for delivering the eBook website exactly as requested. Everything looks great, and I’m very satisfied with the final result. I truly appreciate your hard work and would definitely recommend your service to others. Great job!',
  },
  {
    name: 'episode_eleven', country: 'Germany', code: 'de', rating: 5,
    project: 'Website development',
    quote: 'Working with Riaz was just GREAT. He exactly understood my needs. He was super fast. Our communication was always perfect. Thanks a lot and highly recommended!!!',
  },
  {
    name: 'krisashh', country: 'United States', code: 'us', rating: 5,
    project: 'Website development', repeat: true,
    quote: 'Absolutely outstanding work! The project exceeded all my expectations, attention to detail, creativity, and professionalism were truly impressive. Communication was seamless, and every aspect was handled with care and precision. Would highly recommend their services to anyone looking for excellence. A flawless experience from start to finish!',
  },
  {
    name: 'agannon1', country: 'United States', code: 'us', rating: 5, photo: '/images/reviews/agannon1.jpg',
    project: 'Website development',
    quote: 'Amazing to work with! Very pleased with results! I will definitely work with him again!',
  },
  {
    name: 'jistin247', country: 'United States', code: 'us', rating: 5,
    project: 'Landing page', repeat: true,
    quote: 'Riaz always does a great job! This is my second time working with him, and once again, he exceeded my expectations. He’s professional, responsive, and delivers high quality work. I’m very pleased with the results and would definitely work with him again. Highly recommended!',
  },
  {
    name: 'merry_joness', country: 'United States', code: 'us', rating: 5,
    project: 'Website development', repeat: true,
    quote: 'Absolutely amazing experience working with this seller! They delivered high-quality work ahead of schedule and communicated clearly throughout the entire process. Every detail was handled professionally, and the final result exceeded my expectations. I highly recommend this seller to anyone looking for reliable, skilled, and fast service. Will definitely order again!',
  },
  {
    name: 'zanzibarlux', country: 'Tanzania', code: 'tz', rating: 4,
    project: 'Website pages',
    quote: 'I worked very well with Riaz! He delivered the website pages I asked for in a timely manner and he was always very responsive when needed. I can definitely recommend him.',
  },
  {
    name: 'matthewe_davis', country: 'United States', code: 'us', rating: 5,
    project: 'Website design', repeat: true,
    quote: 'I honestly had very little idea how I wanted my website to come together, but Sunmoon made the whole process easy. He understood what I was trying to achieve and turned it into a beautiful website. I’m extremely happy with the final result.',
  },
  {
    name: 'sugaluv992', country: 'United States', code: 'us', rating: 5,
    project: 'Landing page',
    quote: 'Thank you much! Very attentive and nice. Love the page and the attention to detail. Definitely reaching out again for another project.',
  },
  {
    name: 'richard_tys', country: 'United States', code: 'us', rating: 5,
    project: 'Website development', repeat: true,
    quote: 'The project he delivered was excellent. I am very satisfied with the website, it runs smoothly, looks consistent across all pages, and overall feels like a solid, ready-to-use website.',
  },
  {
    name: 'gavin_caldwell', country: 'United States', code: 'us', rating: 5,
    project: 'Website development',
    quote: 'Excellent work! Sunmoon is very professional, responsive, and delivered high-quality results. They understood the requirements well and completed the project efficiently. Communication was smooth throughout the process, and they were willing to make adjustments when needed. I’m very satisfied with the outcome and would definitely recommend them to others.',
  },
  {
    name: 'dkcshop', country: 'United States', code: 'us', rating: 5,
    project: 'Website design', repeat: true,
    quote: 'Riaz did an amazing job! I absolutely love the design. He was professional, responsive, and delivered exactly what I wanted. Highly recommended, and I’ll definitely work with him again!',
  },
  {
    name: 'olivia_kan', country: 'United States', code: 'us', rating: 5,
    project: 'Website design',
    quote: 'Excellent work! Sunmoon did a great job creating my website exactly how I wanted. The design looks professional, communication was smooth. They were very skilled, responsive, and paid attention to details. I am very happy with the final result.',
  },
  {
    name: 'jeanne_roster', country: 'United States', code: 'us', rating: 5,
    project: 'Website development',
    quote: 'Completed on time, no problems, I will work with this freelancer again.',
  },
  {
    name: 'matthew_gamble', country: 'United States', code: 'us', rating: 5,
    project: 'Website development', repeat: true,
    quote: 'Excellent work and very professional service. He understood my requirements perfectly and delivered exactly what I was looking for. Communication was smooth, and the final result exceeded my expectations. I’m very happy with the work and would gladly work with him again.',
  },
  {
    name: 'depul_07', country: 'United States', code: 'us', rating: 5,
    project: 'Landing page', repeat: true,
    quote: 'I’m extremely happy with the work. The website design is beautiful, professional, and exactly what I was looking for. He understood my requirements and delivered high-quality work. I would definitely hire him again for future projects.',
  },
  {
    name: 'christopher_mic', country: 'United States', code: 'us', rating: 5,
    project: 'Website development', repeat: true,
    quote: 'Great experience working with Sunmoon! The pricing is very reasonable, and the quality of work is excellent. Communication was smooth, delivery was on time, and everything met my expectations. Highly recommended!',
  },
  {
    name: 'celineraymondez', country: 'United States', code: 'us', rating: 5,
    project: 'Website development', repeat: true,
    quote: 'Thank you for your professionalism and dedication.',
  },
  {
    name: 'joshmendi07', country: 'United States', code: 'us', rating: 5,
    project: 'Website development',
    quote: 'I’m impressed with how fast you can work.',
  },
  {
    name: 'deepika_kayilan', country: 'India', code: 'in', rating: 4.3,
    project: 'Website development',
    quote: 'I really appreciate the work which Sunmoon did.',
  },
];

export const reviewCountries = [...new Set(reviews.map((r) => r.country))];
