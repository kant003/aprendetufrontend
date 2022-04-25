import { useLocation } from "react-router-dom";
import { LINKS_PER_PAGE } from "../pages/CourseGraphqlQuery";

export function usePagination() {
    const location = useLocation();

    const isNewPage = location.pathname.includes(
        'new'
    );
    const pageIndexParams = location.pathname.split(
        '/'
    );
    const page = parseInt(
        pageIndexParams[pageIndexParams.length - 1]
    );

    const skip = isNewPage ? (page - 1) * LINKS_PER_PAGE : 0;
    const take = isNewPage ? LINKS_PER_PAGE : 10;
    const orderBy = { createdAt: 'desc' };
    console.log(take, skip, orderBy)

    return { take, skip, orderBy, page, isNewPage };
}