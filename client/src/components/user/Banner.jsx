import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";

import "swiper/css";

const Banner = () => {
  const [banners, setBanners] = useState([]);

  useEffect(() => {
    const fetchBanners = async () => {
      try {
        const res = await fetch(
          "http://localhost:5000/api/banner/fetch?count=5"
        );
        const data = await res.json();
        console.log("BANNERS API RESPONSE:", data);
        setBanners(data);
      } catch (err) {
        console.error("Failed to fetch banners:", err);
      }
    };

    fetchBanners();
  }, []);

  if (!banners.length) return null;

  return (
    <section className="w-full flex justify-center py-4">
      <div className="w-[90%] rounded-lg overflow-hidden shadow-md">
        <Swiper
          modules={[Autoplay]}
          autoplay={{
            delay: 3000,
            disableOnInteraction: false
          }}
          loop
          slidesPerView={1}
          autoHeight={true}   // ⭐ KEY FIX
        >
          {banners.map((banner) => (
            <SwiperSlide key={banner._id}>
              <img
                src={banner.image}
                alt={banner.title || "banner"}
                className="w-full h-auto block"
                loading="lazy"
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

export default Banner;
