import PageHeaderTitle from "@/components/layouts/globals/PageHeaderTitle";
import BlogItem from "@/components/layouts/BlogItem";
import { useEffect, useState } from "react";
import blogsApi from "@/api/modules/blogs.api";
import { toast } from "react-toastify";
import NotFound from "@/components/layouts/globals/NotFound";
import Loading from "@/components/layouts/globals/Loading";
import { formatDateToIndo } from "@/helpers/dateHelper";

export default function NewsPage() {
  const [isDataLoaded, setIsDataLoaded] = useState(false);
  const [errorDataLoaded, setErrorDataLoaded] = useState(false);

  const [blogsData, setBlogsData] = useState([]);

  const fetchBlogsData = async () => {
    const { response, error } = await blogsApi.getAllBlogs({
      status: "published",
    });
    if (response) {
      setBlogsData(response);
      setTimeout(() => {
        setIsDataLoaded(true);
      }, 500);
    }
    if (error) {
      toast.error(error.message);
      setErrorDataLoaded(true);
    }
  };
  //
  useEffect(() => {
    fetchBlogsData();
  }, []);

  return (
    <>
      {errorDataLoaded ? (
        <NotFound />
      ) : isDataLoaded ? (
        <div className="pb-4 md:px-24 md:mt-4 md:pb-10">
          <PageHeaderTitle
            title="BERITA DESA"
            description="Berita terbaru seputar Desa Gunturu"
          />

          <div className="grid grid-cols-1 gap-4 md:grid-cols-3 md:gap-6">
            {blogsData.map((blog, i) => (
              <BlogItem
                key={i}
                image={blog.coverImageURL || "/image-home-hero.jpg"}
                title={blog.title}
                slug={blog.slug}
                date={formatDateToIndo(blog.createdAt)}
              />
            ))}
          </div>
        </div>
      ) : (
        <Loading />
      )}
    </>
  );
}
