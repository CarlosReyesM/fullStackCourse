import React from 'react';
import Part from './Part';

const Content = ({course}) => {
  console.log(course);
  return (
    <div>
      {course.parts.map(p => <Part part={p} />)}
    </div>
  )
}

export default Content
