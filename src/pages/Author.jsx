import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import AuthorBanner from "../images/author_banner.jpg";
import AuthorItems from "../components/author/AuthorItems";
import Skeleton from "../components/UI/Skeleton";

const Author = () => {
  const { id } = useParams();

  const [authorData, setAuthorData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchAuthor() {
      try {
        setLoading(true);

        const res = await fetch(
          `https://us-central1-nft-cloud-functions.cloudfunctions.net/authors?author=${id}`
        );

        if (!res.ok) {
          throw new Error(`HTTP ${res.status}`);
        }

        const data = await res.json();
        setAuthorData(data);
        setError(null);
      } catch (err) {
        setError(err.message);
        setAuthorData(null);
      } finally {
        setLoading(false);
      }
    }

    fetchAuthor();
  }, [id]);

  if (error) return <p>Error loading author: {error}</p>;
  if (!loading && !authorData) return <p>No author found.</p>;

  return (
    <div id="wrapper">
      <div className="no-bottom no-top" id="content">
        <div id="top"></div>

        <section
          id="profile_banner"
          data-aos="fade-in"
          data-aos-delay="50"
          data-aos-duration="1000"
          aria-label="section"
          className="text-light"
          data-bgimage="url(images/author_banner.jpg) top"
          style={{ background: `url(${AuthorBanner}) top` }}
        ></section>

        <section aria-label="section"
          data-aos="fade-up"
          data-aos-delay="50"
          data-aos-duration="1000">
          <div className="container">
            <div className="row">
              <div className="col-md-12">
                <div className="d_profile de-flex">
                  <div className="de-flex-col">
                    <div className="profile_avatar">
                      {loading ? (
                        <>
                          <Skeleton
                            width="150px"
                            height="150px"
                            borderRadius="50%"
                          />
                          <div className="profile_name">
                            <div className="mb-2">
                              <Skeleton width="180px" height="28px" />
                            </div>
                          </div>
                        </>
                      ) : (
                        <>
                          <img
                            src={authorData.authorImage}
                            alt={authorData.authorName}
                          />
                          <i className="fa fa-check"></i>

                          <div className="profile_name">
                            <h4>
                              {authorData.authorName}
                              <span className="profile_username">
                                @{authorData.tag}
                              </span>
                              <span id="wallet" className="profile_wallet">
                                {authorData.address}
                              </span>
                              <button id="btn_copy" title="Copy Text">
                                Copy
                              </button>
                            </h4>
                          </div>
                        </>
                      )}
                    </div>
                  </div>

                  <div className="profile_follow de-flex">
                    <div className="de-flex-col">
                      {loading ? null : (
                        <>
                          <div className="profile_follower">
                            {authorData.followers} followers
                          </div>
                          <Link to="#" className="btn-main">
                            Follow
                          </Link>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-md-12">
                <div className="de_tab tab_simple">
                  <AuthorItems
                    nftCollection={authorData?.nftCollection ?? []}
                    authorImage={authorData?.authorImage ?? ""}
                    authorName={authorData?.authorName ?? ""}
                    authorId={authorData?.authorId ?? ""}
                    loading={loading}
                  />
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Author;