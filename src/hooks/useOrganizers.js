import { useContext } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { http } from "@/lib/services/https";
import { ActionContext } from "@/context/Action";

export const useOrganizers = (page, perPage) => {
  const { oneData, notify, toggleUpdate, toggleDelete } =
    useContext(ActionContext);
  const queryClient = useQueryClient();
  const { data, isLoading } = useQuery(
    ["organizers", "list", page, perPage],
    () =>
      http(
        {
          method: "GET",
          params: {
            page,
            perPage,
          },
        },
        `organizers`
      ),
    {
      keepPreviousData: true,
    }
  );

  const { mutate: updateOrganizers, isLoading: isLoadingUpdate } = useMutation(
    (data) =>
      http(
        {
          method: "PUT",
          data,
        },
        `organizers/${oneData?.id}`
      ),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["organizers", "list", page, perPage]);
        toggleUpdate();
        setTimeout(() => {
          notify("success", "Berhasil mengubah data");
        }, 1);
      },
    }
  );

  const { mutate: postOrganizers, isLoading: isLoadingPost } = useMutation(
    (data) =>
      http(
        {
          method: "POST",
          data,
        },
        `organizers`
      ),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["organizers", "list", page, perPage]);
        setTimeout(() => {
          notify("success", "Berhasil mengubah data");
        }, 1);
      },
    }
  );

  const { mutate: deleteOrganizers, isLoading: isLoadingDelete } = useMutation(
    (data) =>
      http(
        {
          method: "DELETE",
          data,
        },
        `organizers/${oneData?.id}`
      ),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["organizers", "list", page, perPage]);
        setTimeout(() => {
          notify("success", "Berhasil mengubah data");
        }, 1);
        toggleDelete();
      },
    }
  );

  return {
    data,
    updateOrganizers,
    deleteOrganizers,
    isLoadingDelete,
    isLoadingUpdate,
    isLoading,
    postOrganizers,
    isLoadingPost,
  };
};
