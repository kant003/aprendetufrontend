import Pagination from './Pagination';
import { useCourse } from '../hooks/useCourse';
import { usePagination } from '../hooks/usePagination';
import { useState } from 'react';

export const Course = ({ course, index }) => {
  return (
    <>
      {index} - {course.id} {course.title} ({course.description})
    </>
  );
};

const CoursesPage = () => {
  const [count, setCount] = useState(null)

  const handleCompleted = (countval) => {
    setCount(countval)
  }

  const { take, skip, orderBy, page, isNewPage } = usePagination();

  const { data, loading, error, handleRemove } = useCourse({take, skip, orderBy, handleCompleted});

  if (loading) return <div>Loading...</div>;
  if (error) return <pre>{JSON.stringify(error, null, 2)}</pre>

  return (
    <div>
      {data.filterCourses.courses.map(
        (course, index) => (
          <div key={course.id}>
            <Course course={course} index={index + 1} />
            <button onClick={() => handleRemove(course.id)}>Borrar</button> |
            <button onClick={null}>editar</button> |
            <button onClick={null}>toggle solicitar contriv</button> |
            <button onClick={null}>ver</button> |
            <button onClick={null}>toggle acti</button>
          </div>
        )
      )}

       { count && <Pagination
        count={count}
        page={page}
        isNewPage={isNewPage}
        />}

    </div>
  );
};

export default CoursesPage;
