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
        setBanners(data);
      } catch (err) {
        console.error(err);
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
          loop={true}
          slidesPerView={1}
        >
          {banners.map((banner) => (
            <SwiperSlide key={banner._id}>
              <img
                src={banner.image}
                alt={banner.title}
                className="w-full h-[400px] object-cover"
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

export default Banner;
