import React, { useState } from 'react';
import { useLazyQuery } from '@apollo/client';
import { Course } from './CoursesPage';
import { FEED_SEARCH_QUERY } from './CourseGraphqlQuery';


const CourseSearchPage = () => {
    const [searchFilter, setSearchFilter] = useState('');

    const [executeSearch, { data }] = useLazyQuery(
        FEED_SEARCH_QUERY
    );

    const handleSearch = () => executeSearch({ variables: { filter: searchFilter } } )

    return (
        <>
            <div>
                Search
                <input type="text" onChange={(e) => setSearchFilter(e.target.value)} />
                <button onClick={handleSearch}>OK</button>
            </div>
            {data && data.filterCourses.courses.map(course => (
                <Course key={course.id} course={course} />
            ))}
        </>
    );
};

export default CourseSearchPage;