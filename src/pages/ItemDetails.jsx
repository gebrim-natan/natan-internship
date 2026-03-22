import React, { useEffect, useState } from "react";
import EthImage from "../images/ethereum.svg";
import { Link, useParams } from "react-router-dom";
import Skeleton from "../components/UI/Skeleton";

const ItemDetails = () => {
  const { id } = useParams();

  const [itemData, setItemData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    async function fetchItemDetails() {
      try {
        setLoading(true);

        const res = await fetch(
          `https://us-central1-nft-cloud-functions.cloudfunctions.net/itemDetails?nftId=${id}`
        );

        if (!res.ok) {
          throw new Error(`HTTP ${res.status}`);
        }

        const data = await res.json();
        setItemData(data);
        setError(null);
      } catch (err) {
        setError(err.message);
        setItemData(null);
      } finally {
        setLoading(false);
      }
    }

    fetchItemDetails();
  }, [id]);

  if (error) return <p>Error loading item details: {error}</p>;
  if (!loading && !itemData) return <p>No item found.</p>;

  return (
    <div id="wrapper">
      <div className="no-bottom no-top" id="content">
        <div id="top"></div>
        <section aria-label="section" className="mt90 sm-mt-0">
          <div className="container">
            <div className="row">
              <div className="col-md-6 text-center">
                {loading ? (
                  <Skeleton height="520px" borderRadius="12px" />
                ) : (
                  <img
                    src={itemData.nftImage}
                    className="img-fluid img-rounded mb-sm-30 nft-image"
                    alt={itemData.title}
                    data-aos="fade-in"
                    data-aos-delay="100"
                    data-aos-duration="600"
                  />
                )}
              </div>

              <div className="col-md-6">
                <div className="item_info">
                  {loading ? (
                    <>
                      <div className="mb-3">
                        <Skeleton width="260px" height="42px" />
                      </div>

                      <div className="item_info_counts mb-3">
                        <div className="item_info_views">
                          <Skeleton width="70px" height="20px" />
                        </div>
                        <div className="item_info_like">
                          <Skeleton width="70px" height="20px" />
                        </div>
                      </div>

                      <div className="mb-2">
                        <Skeleton width="100%" height="18px" />
                      </div>
                      <div className="mb-2">
                        <Skeleton width="95%" height="18px" />
                      </div>
                      <div className="mb-4">
                        <Skeleton width="80%" height="18px" />
                      </div>

                      <div className="d-flex flex-row">
                        <div className="mr40">
                          <h6>Owner</h6>
                          <div className="item_author">
                            <div className="author_list_pp">
                              <Skeleton
                                width="50px"
                                height="50px"
                                borderRadius="50%"
                              />
                            </div>
                            <div className="author_list_info">
                              <Skeleton width="120px" height="18px" />
                            </div>
                          </div>
                        </div>
                        <div></div>
                      </div>

                      <div className="de_tab tab_simple">
                        <div className="de_tab_content">
                          <h6>Creator</h6>
                          <div className="item_author">
                            <div className="author_list_pp">
                              <Skeleton
                                width="50px"
                                height="50px"
                                borderRadius="50%"
                              />
                            </div>
                            <div className="author_list_info">
                              <Skeleton width="120px" height="18px" />
                            </div>
                          </div>
                        </div>

                        <div className="spacer-40"></div>

                        <h6>Price</h6>
                        <div className="nft-item-price">
                          <Skeleton width="120px" height="28px" />
                        </div>
                      </div>
                    </>
                  ) : (
                    <>
                      <div
                        data-aos="fade-left"
                        data-aos-delay="50"
                        data-aos-duration="600"
                      >
                        <h2>
                          {itemData.title} #{itemData.tag}
                        </h2>

                        <div className="item_info_counts">
                          <div className="item_info_views">
                            <i className="fa fa-eye"></i>
                            {itemData.views}
                          </div>
                          <div className="item_info_like">
                            <i className="fa fa-heart"></i>
                            {itemData.likes}
                          </div>
                        </div>
                      </div>

                      <p
                        data-aos="fade-left"
                        data-aos-delay="100"
                        data-aos-duration="600"
                      >
                        {itemData.description}
                      </p>

                      <div
                        className="d-flex flex-row"
                      >
                        <div className="mr40"
                        data-aos="fade-left"
                        data-aos-delay="150"
                        data-aos-duration="600">
                          <h6>Owner</h6>
                          <div className="item_author">
                            <div className="author_list_pp">
                              <Link to={`/author/${itemData.ownerId}`}>
                                <img
                                  className="lazy"
                                  src={itemData.ownerImage}
                                  alt={itemData.ownerName}
                                />
                                <i className="fa fa-check"></i>
                              </Link>
                            </div>
                            <div className="author_list_info">
                              <Link to={`/author/${itemData.ownerId}`}>
                                {itemData.ownerName}
                              </Link>
                            </div>
                          </div>
                        </div>
                        <div></div>
                      </div>

                      <div className="de_tab tab_simple">
                        <div
                          className="de_tab_content"
                          data-aos="fade-left"
                          data-aos-delay="200"
                          data-aos-duration="600"
                        >
                          <h6>Creator</h6>
                          <div className="item_author">
                            <div className="author_list_pp">
                              <Link to={`/author/${itemData.ownerId}`}>
                                <img
                                  className="lazy"
                                  src={itemData.ownerImage}
                                  alt={itemData.ownerName}
                                />
                                <i className="fa fa-check"></i>
                              </Link>
                            </div>
                            <div className="author_list_info">
                              <Link to={`/author/${itemData.ownerId}`}>
                                {itemData.ownerName}
                              </Link>
                            </div>
                          </div>
                        </div>

                        <div className="spacer-40"></div>

                        <div
                          data-aos="fade-left"
                          data-aos-delay="250"
                          data-aos-duration="600"
                        >
                          <h6>Price</h6>
                          <div className="nft-item-price">
                            <img src={EthImage} alt="Ethereum" />
                            <span>{Number(itemData.price).toFixed(2)}</span>
                          </div>
                        </div>
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default ItemDetails;