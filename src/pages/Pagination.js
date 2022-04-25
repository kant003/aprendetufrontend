import { useLocation, useNavigate } from "react-router-dom";
import { LINKS_PER_PAGE } from "./CourseGraphqlQuery";

const Pagination = ({count, page, isNewPage}) => {
  const navigate = useNavigate();
  
  const totalPages=Math.ceil(count / LINKS_PER_PAGE)

  const nextPage = () => {
    if (page < count / LINKS_PER_PAGE) {
      navigate(`/new/${page + 1}`);
    }
  }
  const prevPage = () => {
    if (page > 1) {
      navigate(`/new/${page - 1}`);
    }
  }
  const toPage = (pageNumber) => {
    if (pageNumber >= 1 && pageNumber <= Math.ceil(count / LINKS_PER_PAGE)) {
      navigate(`/new/${pageNumber}`);
    }
  }


  function fillNumbers() {
    return Array.from({ length: totalPages }, (x, i) => {
      const pageNumber = i + 1;
      return (
        <div className="flex ml-3 cursor-pointer" key={`pagination-number${pageNumber}`} onClick={() => toPage(pageNumber)}>
          {pageNumber === page ? <b>{pageNumber}</b> : pageNumber}
        </div>
      );
    })
  }
  return <>
    {isNewPage && (
      <div className="flex justify-around">
        <div className="cursor-pointer" onClick={prevPage} > Previous </div>
        <div className="flex ml-3"> {fillNumbers()} </div>
        <div className="cursor-pointer" onClick={nextPage}> Next </div>
        <div>Total: {count}</div>
      </div>
    )}
  </>
}
export default Pagination;
