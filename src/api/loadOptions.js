import { QueryClient } from "@tanstack/react-query";
import { http } from "@/lib/services/https";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      refetchOnMount: false,
      cacheTime: 1000 * 60 * 60 * 24,
      staleTime: Infinity,
    },
  },
});

const queryOptions = (key, url, page, perPage) => ({
  queryKey: [key.split("-"), Number(page, perPage)],
  queryFn: () =>
    http(
      {
        method: "GET",
        params: {
          page,
          perPage,
        },
      },
      url
    ),
});

export const loadOptionsOrganizer = async (
  q,
  prev,
  { page = 1, perPage = 10 }
) => {
  try {
    const query = queryOptions(
      "options-organizers",
      "organizers",
      page,
      perPage
    );

    const data =
      queryClient.getQueryData(query.queryKey) ??
      (await queryClient.fetchQuery(query));

    const hasMore = data.meta.pagination.total_pages > page;

    return {
      options: data.data.map((item) => ({
        value: item.id,
        label: item.organizerName,
      })),
      hasMore,
      additional: {
        page: hasMore ? page + 1 : page,
      },
    };
  } catch (error) {
    Promise.reject(error);
  }
};
