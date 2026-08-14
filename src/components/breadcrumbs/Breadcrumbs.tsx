import { Fragment } from "react";
import { Link, useLocation, useMatches } from "react-router";
import { IoMdHome } from "react-icons/io";

type CrumbHandle = {
  crumb: (params: Record<string, string | undefined>) => React.ReactNode;
};

const Breadcrumbs = () => {
  const matches = useMatches();
  const location = useLocation();

  const crumbs = matches
    .filter((match) => Boolean((match.handle as CrumbHandle | undefined)?.crumb))
    .map((match) => ({
      pathname: match.pathname,
      node: (match.handle as CrumbHandle).crumb(match.params),
    }));

  if (crumbs.length === 0) return null;
  if (crumbs.length === 1 && location.pathname === "/dashboard") return null;

  return (
    <nav aria-label="Breadcrumb" className="ml-15 mb-6">
      <ol className="flex items-center gap-2 font-mono text-xs text-text-muted flex-wrap">
        <li>
          <Link to="/dashboard" className="flex items-center hover:text-primary transition-colors">
            <IoMdHome className="h-3.5 w-3.5" />
          </Link>
        </li>
        {crumbs.map((crumb, index) => {
          const isLast = index === crumbs.length - 1;
          return (
            <Fragment key={crumb.pathname}>
              <span className="text-text-muted">/</span>
              <li>
                {isLast ? (
                  <span className="text-text-primary font-medium truncate max-w-50 inline-block align-bottom">
                    {crumb.node}
                  </span>
                ) : (
                  <Link
                    to={crumb.pathname}
                    className="hover:text-primary transition-colors truncate max-w-40 inline-block align-bottom"
                  >
                    {crumb.node}
                  </Link>
                )}
              </li>
            </Fragment>
          );
        })}
      </ol>
    </nav>
  );
};

export default Breadcrumbs;