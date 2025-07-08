import blogsApi from "@/api/modules/blogs.api";
import HeaderDetailPage from "@/components/layouts/globals/HeaderDetailPage";
import Loading from "@/components/layouts/globals/Loading";
import NotFound from "@/components/layouts/globals/NotFound";
import { formatDateToIndo } from "@/helpers/dateHelper";
import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { CgProfile } from "react-icons/cg";
import { FaRegCalendarAlt } from "react-icons/fa";
import { toast } from "react-toastify";
import he from "he";
import BlogItem from "@/components/layouts/BlogItem";
import SectionTitle from "@/components/layouts/SectionTitle";

export default function NewsDetailPage() {
  const router = useRouter();
  const { slug } = router.query;

  const [isDataLoaded, setIsDataLoaded] = useState(false);
  const [errorDataLoaded, setErrorDataLoaded] = useState(false);

  const [blogData, setBlogData] = useState({});
  const [anotherBlogsData, setAnotherBlogsData] = useState([]);

  const fetchBlogData = async () => {
    const { response, error } = await blogsApi.getBlogBySlug({
      slug,
    });
    if (response) {
      setBlogData(response);
      fetchAnotherBlogsData();
    }
    if (error) {
      toast.error(error.message);
      setErrorDataLoaded(true);
    }
  };
  //
  const fetchAnotherBlogsData = async () => {
    const { response, error } = await blogsApi.getAllBlogs({
      status: "published",
    });
    if (response) {
      const filteredData = response.filter((data) => data.slug !== slug);
      setAnotherBlogsData(filteredData);
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
    if (slug) fetchBlogData();
  }, [slug]);

  return (
    <>
      {errorDataLoaded ? (
        <NotFound />
      ) : isDataLoaded ? (
        <div className="pb-4 md:px-24 md:mt-4 md:pb-10">
          <div className="-m-2 -mt-4 md:flex md:items-start md:gap-3">
            <div className="w-full md:w-[70%]">
              <HeaderDetailPage title={blogData.title} />

              <div className="mt-2 bg-white rounded py-2 px-3 text-sm">
                <p className="text-[#A0A0A0]">
                  <FaRegCalendarAlt className="inline mb-0.5 me-1 text-lg" />{" "}
                  <span className="text-black">
                    {formatDateToIndo(blogData.createdAt)}
                  </span>
                </p>
                <p className="mt-1 text-[#A0A0A0]">
                  <CgProfile className="inline mb-0.5 me-1 text-lg" /> Ditulis
                  oleh <span className="text-black">{blogData.author}</span>
                </p>
              </div>

              <div className="mt-2 bg-white py-2 px-3">
                <Image
                  priority
                  src={blogData.coverImageURL || "/image-home-hero.jpg"}
                  alt={blogData.title}
                  width={500}
                  height={500}
                  className="w-full object-cover"
                />
              </div>

              <div className="mt-2 bg-white rounded py-2 px-3">
                <p className="text-[#A0A0A0] text-sm">
                  {blogData.coverDescription}
                </p>
              </div>

              <div className="text-sm text-justify break-words whitespace-normal">
                <div
                  className="sanitized-content mt-2 bg-white rounded py-2 px-3"
                  dangerouslySetInnerHTML={{
                    __html: he.decode(blogData.content),
                  }}
                ></div>
              </div>
            </div>

            {/* BERITA LAINNYA */}
            <div className="md:hidden">
              <SectionTitle title="BERITA LAINNYA" />

              <div className="mt-2 flex flex-col gap-2">
                {anotherBlogsData.map((blog, i) => (
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

            {/* BERITA LAINNYA */}
            <div className="hidden md:inline md:w-[30%] md:mt-2">
              <div className="bg-white rounded py-4">
                <p className="font-semibold text-center text-3xl">
                  BERITA LAINNYA
                </p>
              </div>

              {anotherBlogsData.length > 0 ? (
                <div className="mt-2 flex flex-col gap-2">
                  {anotherBlogsData.map((blog, i) => (
                    <BlogItem
                      key={i}
                      image={blog.coverImageURL || "/image-home-hero.jpg"}
                      title={blog.title}
                      slug={blog.slug}
                      date={formatDateToIndo(blog.createdAt)}
                    />
                  ))}
                </div>
              ) : (
                <NotFound message="Belum ada berita" />
              )}
            </div>
          </div>
        </div>
      ) : (
        <Loading />
      )}
    </>
  );
}

// export async function getStaticProps({ params }) {
//   const { slug } = params;
//   const { response, error } = await blogsApi.getBlogBySlug({
//     slug,
//   });
//   return {
//     props: {
//       blogData: response,
//     },
//   };
// }
// export async function getStaticPaths() {
//   const { response, error } = await blogsApi.getAllBlogs({
//     status: "published",
//   });
//   const paths = response.map((blog) => ({
//     params: { slug: blog.slug },
//   }));
//   return { paths, fallback: false };
// }
