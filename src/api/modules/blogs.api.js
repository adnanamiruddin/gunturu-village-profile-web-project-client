import privateClient from "../clients/private.client";
import publicClient from "../clients/public.client";

const blogsEndpoint = {
  blogs: "/blogs",
  blogsByStatus: ({ status }) => `/blogs?status=${status}`,
  blogBySlug: ({ slug }) => `/blogs/${slug}`,
  blogById: ({ blogId }) => `/blogs/${blogId}`,
};

const blogsApi = {
  createBlog: async ({
    type,
    title,
    slug,
    status,
    author,
    coverImageURL,
    coverDescription,
    content,
  }) => {
    try {
      const response = await privateClient.post(blogsEndpoint.blogs, {
        type,
        title,
        slug,
        status,
        author,
        coverImageURL,
        coverDescription,
        content,
      });
      return { response };
    } catch (error) {
      return { error };
    }
  },

  getAllBlogs: async ({ status }) => {
    try {
      const response = await publicClient.get(
        blogsEndpoint.blogsByStatus({
          status: status ? status : "",
        })
      );
      return { response };
    } catch (error) {
      return { error };
    }
  },

  getBlogBySlug: async ({ slug }) => {
    try {
      const response = await publicClient.get(
        blogsEndpoint.blogBySlug({ slug })
      );
      return { response };
    } catch (error) {
      return { error };
    }
  },

  editBlog: async ({
    blogId,
    type,
    title,
    slug,
    status,
    author,
    coverImageURL,
    coverDescription,
    content,
  }) => {
    try {
      const response = await privateClient.put(
        blogsEndpoint.blogById({ blogId }),
        {
          type,
          title,
          slug,
          status,
          author,
          coverImageURL,
          coverDescription,
          content,
        }
      );
      return { response };
    } catch (error) {
      return { error };
    }
  },

  deleteBlog: async ({ blogId }) => {
    try {
      const response = await privateClient.delete(
        blogsEndpoint.blogById({ blogId })
      );
      return { response };
    } catch (error) {
      return { error };
    }
  },
};

export default blogsApi;
