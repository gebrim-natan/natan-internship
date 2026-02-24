import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";

const NewItems = () => {
  const [newItems, setNewItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [sliderRef, slider] = useKeenSlider({
    loop: true,
    slides: {
      perView: 4,
      spacing: 20,
    },
    move: { type: "slide" },
    breakpoints: {
      "(max-width: 480px)": { slides: { perView: 1, spacing: 10 } },
      "(max-width: 768px)": { slides: { perView: 2, spacing: 15 } },
      "(max-width: 1024px)": { slides: { perView: 3, spacing: 20 } },
    },
  });

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch(
          "https://us-central1-nft-cloud-functions.cloudfunctions.net/newItems"
        );
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const data = await res.json();
        setNewItems(data);
        setError(null);
      } catch (e) {
        setError(e.message);
        setNewItems([]);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  if (loading) return <p>Loading items...</p>;
  if (error) return <p>Error loading items: {error}</p>;

  return (
    <section id="section-items" className="no-bottom">
      <div className="container">
        <div className="row align-items-center">
          <div className="col-lg-12">
            <div className="text-center">
              <h2>New Items</h2>
              <div className="small-border bg-color-2"></div>
            </div>
          </div>

          <div className="col-lg-12 position-relative">
            <div ref={sliderRef} className="keen-slider">
              {newItems.map((item) => (
                <div key={item.id ?? item.nftId} className="keen-slider__slide">
                  <div className="nft__item">
                    <div className="author_list_pp">
                      <Link
                        to={`/author/${item.authorId}`}
                        data-bs-toggle="tooltip"
                        data-bs-placement="top"
                        title={`Creator: ${item.authorName ?? "Unknown"}`}
                      >
                        <img
                          className="lazy pp-coll"
                          src={item.authorImage}
                          alt={`Author ${item.authorId}`}
                        />
                        <i className="fa fa-check"></i>
                      </Link>
                    </div>

                    <div className="nft__item_wrap">
                      <Link to={`/item-details/${item.nftId}`}>
                        <img
                          src={item.nftImage}
                          className="lazy img-fluid nft__item_preview"
                          alt={item.title}
                        />
                      </Link>
                    </div>

                    <div className="nft__item_info">
                      <Link to={`/item-details/${item.nftId}`}>
                        <h4>{item.title}</h4>
                      </Link>
                      <div className="nft__item_price">
                        {Number(item.price).toFixed(2)} ETH
                      </div>
                      <div className="nft__item_like">
                        <i className="fa fa-heart"></i>
                        <span>{item.likes}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {slider && (
              <>
                <button
                  onClick={(e) => e.stopPropagation() || slider.current?.prev()}
                  className="keen-slider__prev custom-arrow new-items-arrow"
                >
                  <i className="fa fa-chevron-left"></i>
                </button>
                <button
                  onClick={(e) => e.stopPropagation() || slider.current?.next()}
                  className="keen-slider__next custom-arrow new-items-arrow"
                >
                  <i className="fa fa-chevron-right"></i>
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default NewItems;