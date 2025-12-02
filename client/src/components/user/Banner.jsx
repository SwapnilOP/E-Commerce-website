import React from "react";

const Banner = () => {
  return (
    <section className="w-full flex justify-center py-4">
      <div className="w-[90%] rounded-lg overflow-hidden shadow-md">
        <img
          src="https://static.vecteezy.com/system/resources/thumbnails/002/294/859/small/flash-sale-web-banner-design-e-commerce-online-shopping-header-or-footer-banner-free-vector.jpg"
          alt="Promotional Banner"
          className="w-full h-auto object-contain"
        />
      </div>
    </section>
  );
};

export default Banner;
