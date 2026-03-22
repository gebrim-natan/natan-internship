import React, { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import Countdown from "../UI/Countdown";
import Skeleton from "../UI/Skeleton";

const SKELETON_ITEMS_COUNT = 8;

const ExploreItems = () => {
  const [items, setItems] = useState([]);
  const [filter, setFilter] = useState("");
  const [visibleItems, setVisibleItems] = useState(8);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);

        const response = await fetch(
          "https://us-central1-nft-cloud-functions.cloudfunctions.net/explore"
        );

        const data = await response.json();
        setItems(data);
      } catch (error) {
        console.error("Error fetching explore items:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  const filteredItems = useMemo(() => {
    const itemsCopy = [...items];

    switch (filter) {
      case "price_low_to_high":
        return itemsCopy.sort((a, b) => a.price - b.price);
      case "price_high_to_low":
        return itemsCopy.sort((a, b) => b.price - a.price);
      case "likes_high_to_low":
        return itemsCopy.sort((a, b) => b.likes - a.likes);
      default:
        return itemsCopy;
    }
  }, [items, filter]);

  function loadMore() {
    setVisibleItems((prev) => prev + 4);
  }

  function renderSkeletonCard(index) {
    return (
      <div
        key={index}
        className="d-item col-lg-3 col-md-6 col-sm-6 col-xs-12"
        style={{ display: "block", backgroundSize: "cover" }}
      >
        <div className="nft__item">
          <div className="author_list_pp">
            <Skeleton width="50px" height="50px" borderRadius="50%" />
          </div>

          <Skeleton
            width="110px"
            height="28px"
            borderRadius="20px"
            className="mb-3"
          />

          <div className="nft__item_wrap">
            <Skeleton height="280px" borderRadius="12px" />
          </div>

          <div className="nft__item_info">
            <Skeleton width="75%" height="24px" className="mb-2" />
            <Skeleton width="35%" height="20px" className="mb-2" />
            <Skeleton width="25%" height="18px" />
          </div>
        </div>
      </div>
    );
  }

  function renderItemCard(item) {
    return (
      <div
        key={item.id}
        className="d-item col-lg-3 col-md-6 col-sm-6 col-xs-12"
        style={{ display: "block", backgroundSize: "cover" }}
      >
        <div className="nft__item">
          <div className="author_list_pp">
            <Link
              to={`/author/${item.authorId}`}
              data-bs-toggle="tooltip"
              data-bs-placement="top"
            >
              <img className="lazy" src={item.authorImage} alt={item.title} />
              <i className="fa fa-check"></i>
            </Link>
          </div>

          <Countdown expiryDate={item.expiryDate} />

          <div className="nft__item_wrap">
            <div className="nft__item_extra">
              <div className="nft__item_buttons">
                <button>Buy Now</button>
                <div className="nft__item_share">
                  <h4>Share</h4>
                  <a href="/" onClick={(event) => event.preventDefault()}>
                    <i className="fa fa-facebook fa-lg"></i>
                  </a>
                  <a href="/" onClick={(event) => event.preventDefault()}>
                    <i className="fa fa-twitter fa-lg"></i>
                  </a>
                  <a href="/" onClick={(event) => event.preventDefault()}>
                    <i className="fa fa-envelope fa-lg"></i>
                  </a>
                </div>
              </div>
            </div>

            <Link to={`/item-details/${item.nftId}`}>
              <img
                src={item.nftImage}
                className="lazy nft__item_preview"
                alt={item.title}
              />
            </Link>
          </div>

          <div className="nft__item_info">
            <Link to={`/item-details/${item.nftId}`}>
              <h4>{item.title}</h4>
            </Link>
            <div className="nft__item_price">{item.price} ETH</div>
            <div className="nft__item_like">
              <i className="fa fa-heart"></i>
              <span>{item.likes}</span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <div>
        <select
          id="filter-items"
          value={filter}
          onChange={(event) => setFilter(event.target.value)}
        >
          <option value="">Default</option>
          <option value="price_low_to_high">Price, Low to High</option>
          <option value="price_high_to_low">Price, High to Low</option>
          <option value="likes_high_to_low">Most liked</option>
        </select>
      </div>

      {loading
        ? Array.from({ length: SKELETON_ITEMS_COUNT }).map((_, index) =>
            renderSkeletonCard(index)
          )
        : filteredItems
            .slice(0, visibleItems)
            .map((item) => renderItemCard(item))}

      {!loading && visibleItems < filteredItems.length && (
        <div className="col-md-12 text-center">
          <button onClick={loadMore} id="loadmore" className="btn-main lead">
            Load more
          </button>
        </div>
      )}
    </>
  );
};

export default ExploreItems;