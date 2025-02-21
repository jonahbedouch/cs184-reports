import { getCachedSidebarContent } from "@/helpers/frontmatter.helper";
import { Suspense } from "react";
import Category from "../Category";
import Link from "next/link";

type Props = {
  page: "projects" | "blog";
  mini?: boolean;
};

async function Sidebar(props: Props) {
  const sidebarInfo = await getCachedSidebarContent(props.page);

  if (props.mini) {
    return (
      <aside
        className="mt-4 md:hidden md:invisible visible grid grid-cols-2 h-min rounded-lg border-2 p-2 border-secondary-1000 dark:border-secondary-900 ring-opacity-5"
        aria-label="filter results"
      >
        <div className="">
          <span className="my-1 font-semibold font-lato">Categories</span>
          <div className="flex flex-row flex-wrap">
            <Suspense fallback={<>Loading...</>}>
              {sidebarInfo.categories.map((val) => (
                <Category
                  key={`main-blog-category-${val}`}
                  page={props.page}
                  category={val}
                  className="mr-2 mb-2"
                />
              ))}
            </Suspense>
          </div>
        </div>
      </aside>
    );
  }

  return (
    <aside
      className="md:flex hidden mt-3xs-xl ml-sm col-span-4 sticky top-10 flex-col h-min lg:py-sm px-sm py-md bg-secondary-0 dark:bg-secondary-1000 rounded-lg shadow-medium dark:shadow-d-medium ring-1 ring-secondary-1000 dark:ring-secondary-900 ring-opacity-5"
      aria-label="filter results"
    >
      <span className="my-1 font-semibold font-lato">Categories</span>
      <div className="flex flex-row flex-wrap">
        <Suspense fallback={<>Loading...</>}>
          {sidebarInfo.categories.map((val) => (
            <Category
              key={`main-project-category-${val}`}
              page={props.page}
              category={val}
              className="mr-2 mb-2"
            />
          ))}
        </Suspense>
      </div>

      {sidebarInfo.tags.length !== 0 ? (
        <span className="my-1 font-semibold font-lato">Top Tags</span>
      ) : (
        <></>
      )}

      <span className="my-1 font-semibold font-lato">
        {props.page === "projects" ? "Featured Projects" : "Featured Posts"}
      </span>
      <Suspense fallback={<>Loading...</>}>
        {sidebarInfo.featured.map((val) => (
          <Link
            key={`main-project-featured-${val.slug}`}
            href={`/${props.page}/${val.slug}`}
            className="text-primary-800 dark:text-primary-300 underline decoration-transparent hover:decoration-primary-800 dark:hover:decoration-primary-300 transition-colors duration-200"
          >
            {val.title}
          </Link>
        ))}
      </Suspense>
    </aside>
  );
}

export async function SidebarFallback(props: Props) {
  if (props.mini) {
    return (
      <aside
        className="mt-4 md:hidden md:invisible visible grid grid-cols-2 h-min rounded-lg border-2 p-2 border-secondary-1000 dark:border-secondary-900 ring-opacity-5"
        aria-label="filter results"
      >
        <div className="">
          <span className="my-1 font-semibold font-lato">Categories</span>
          <div className="flex flex-row flex-wrap">Loading...</div>
        </div>

        <div className="">
          <span className="my-1 font-semibold font-lato">Top Tags</span>
          <div className="flex flex-row flex-wrap">Loading...</div>
        </div>
      </aside>
    );
  }
  return (
    <aside
      className="md:flex hidden mt-3xs-xl ml-sm col-span-4 sticky top-10 flex-col h-min lg:py-sm px-sm py-md bg-secondary-0 dark:bg-secondary-1000 rounded-lg shadow-medium dark:shadow-d-medium ring-1 ring-secondary-1000 dark:ring-secondary-900 ring-opacity-5"
      aria-label="filter results"
    >
      <span className="my-1 font-semibold font-lato">Categories</span>
      <div className="flex flex-row flex-wrap">Loading...</div>
      <span className="my-1 font-semibold font-lato">Top Tags</span>
      <div className="flex flex-row flex-wrap">Loading...</div>
      <span className="my-1 font-semibold font-lato">
        {props.page === "projects" ? "Featured Projects" : "Featured Posts"}
      </span>
      Loading...
    </aside>
  );
}

export default Sidebar;
