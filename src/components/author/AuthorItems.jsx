import React from "react";
import { Link } from "react-router-dom";
import Skeleton from "../UI/Skeleton";

const SKELETON_ITEMS_COUNT = 4;

const AuthorItems = ({
  nftCollection,
  authorImage,
  authorName,
  authorId,
  loading,
}) => {
  const skeletonItems = Array.from({ length: SKELETON_ITEMS_COUNT });

  return (
    <div className="de_tab_content">
      <div className="tab-1">
        <div className="row">
          {loading
            ? skeletonItems.map((_, index) => (
                <div
                  key={index}
                  className="col-lg-3 col-md-6 col-sm-6 col-xs-12"
                >
                  <div className="nft__item">
                    <div className="author_list_pp">
                      <Skeleton
                        width="50px"
                        height="50px"
                        borderRadius="50%"
                      />
                    </div>

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
              ))
            : nftCollection.map((item) => (
                <div
                  key={item.id}
                  className="col-lg-3 col-md-6 col-sm-6 col-xs-12"
                >
                  <div className="nft__item">
                    <div className="author_list_pp">
                      <Link to={`/author/${authorId}`}>
                        <img className="lazy" src={authorImage} alt={authorName} />
                        <i className="fa fa-check"></i>
                      </Link>
                    </div>

                    <div className="nft__item_wrap">
                      <div className="nft__item_extra">
                        <div className="nft__item_buttons">
                          <button>Buy Now</button>
                          <div className="nft__item_share">
                            <h4>Share</h4>
                            <a href="/" onClick={(e) => e.preventDefault()}>
                              <i className="fa fa-facebook fa-lg"></i>
                            </a>
                            <a href="/" onClick={(e) => e.preventDefault()}>
                              <i className="fa fa-twitter fa-lg"></i>
                            </a>
                            <a href="/" onClick={(e) => e.preventDefault()}>
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
      </div>
    </div>
  );
};

export default AuthorItems;