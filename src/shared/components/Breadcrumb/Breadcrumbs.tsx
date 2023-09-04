import React from 'react';
import { Link } from 'react-router-dom';
import './_Breadcrumbs.scss';

interface BreadcrumbProps {
  breadcrumbs: Array<{
    value: string;
    path: string;
    key: number;
  }>;
}

const Breadcrumbs: React.FC<BreadcrumbProps> = ({ breadcrumbs }) => {
  return (
    <div className='breadcrumbs'>
      {breadcrumbs.map((breadcrumb, index) => (
        <Link to={breadcrumb.path} key={breadcrumb.key}>
          {breadcrumb.value}
          {index < breadcrumbs.length - 1 && <span> / </span>}
        </Link>
      ))}
    </div>
  );
};

export default Breadcrumbs;
