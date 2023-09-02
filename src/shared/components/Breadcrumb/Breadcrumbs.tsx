import React from 'react';
import { Link } from 'react-router-dom';
import './_Breadcrumbs.scss';

interface BreadcrumbProps {
  breadcrumbs: Array<{
    value: string;
    path: string;
  }>;
}

const Breadcrumbs: React.FC<BreadcrumbProps> = ({ breadcrumbs }) => {
  return (
    <div className='breadcrumbs'>
      {breadcrumbs.map((breadcrumb, index) => (
        <Link to={breadcrumb.path}>
          {breadcrumb.value}
          {index < breadcrumbs.length - 1 && <span> / </span>}
        </Link>
      ))}
    </div>
  );
};

export default Breadcrumbs;
