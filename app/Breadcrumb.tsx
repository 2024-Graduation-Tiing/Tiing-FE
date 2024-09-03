import React from 'react';
import { Breadcrumbs, Link } from '@mui/material';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';

interface BreadcrumbProps {
  linkCount: Number,
  routes: Array<String>,
  routeNames: Array<String>
}

const Breadcrumb = ({linkCount, routes, routeNames}: BreadcrumbProps) => {
  return (
    <Breadcrumbs
            separator={<NavigateNextIcon fontSize="small" />}
            aria-label="breadcrumb"
            className="mb-9"
        >
          {/* TODO: <Link> map */}
          <Link underline="hover" color="inherit" href="/">
            홈
          </Link>
          <Link
            underline="hover"
            color="inherit"
            href="/mypage"
          >
            마이페이지
          </Link>
        </Breadcrumbs>
  );
};

export default Breadcrumb;