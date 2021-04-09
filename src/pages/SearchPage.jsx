import React from "react";
import "./SearchPage.css";
import { useStateValue } from "../StateProvider";
import useGoogleSearch from "../useGoogleSearch";
import { useHistory } from "react-router-dom";
import Search from "./Search";
// import SearchIcon from "@material-ui/icons/Search";
// import DescriptionIcon from "@material-ui/icons/Description";
// import ImageIcon from "@material-ui/icons/Image";
// import LocalOfferIcon from "@material-ui/icons/LocalOffer";
// import RoomIcon from "@material-ui/icons/Room";
// import MoreVertIcon from "@material-ui/icons/MoreVert";
// import Response from "../response";
function SearchPage() {
  const [{ term }] = useStateValue();
  const { data } = useGoogleSearch(term);
  //const data = Response;
  console.log(data);
	const history = useHistory();

  const handleClick = () => {
    history.push("/");
  }

  return (
    <div className="searchPage">
      <div className="searchPage__header">
          <img
            className="searchPage__logo"
						src="logo.svg"
            alt="logo"
						onClick={handleClick}
          />
        <div className="searchPage__headerBody">
          <Search hideButtons className="search" />
        </div>
      </div>
      {/* true / term */}
      {term && (
        <div className="searchPage__results">
          <p className="searchPage__resultCount">
            About {data?.searchInformation.formattedTotalResults} results ({" "}
            {data?.searchInformation.formattedSearchTime}) for {term}
          </p>
          {data?.items.map((item) => (
            <div className="searchPage__result">
              <a className="searchPage__resultLink" href={item.link}>
                {item.pagemap?.cse_image?.length > 0 &&
                  item.pagemap?.cse_image[0]?.src && (
                    <img
                      className="searchPage__resultImage"
                      src={item.pagemap?.cse_image[0]?.src}
                      alt=""
                    />
                  )}
                {item.displayLink}
              </a>
              <a href={item.link} className="searchPage__resultTitle">
                <h2>{item.title}</h2>
              </a>
              <p className="searchPage__resultSnippet">{item.snippet}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default SearchPage;
