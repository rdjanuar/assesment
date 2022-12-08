import { useContext } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { http } from "@/lib/services/https";
import { ActionContext } from "@/context/Action";

export const useSportsEvents = (page, perPage) => {
  const { oneData, notify, toggleUpdate, toggleDelete } =
    useContext(ActionContext);
  const queryClient = useQueryClient();

  const { data, isLoading } = useQuery(
    ["sport-events", "list", page, perPage],
    () =>
      http(
        {
          method: "GET",
          params: {
            page,
            perPage,
          },
        },
        `sport-events`
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
        `sport-events/${oneData?.id}`
      ),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["sport-events", "list", page, perPage]);
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
        `sport-events`
      ),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["sport-events", "list", page, perPage]);
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
        `sport-events/${oneData?.id}`
      ),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["sport-events", "list", page, perPage]);
        setTimeout(() => {
          notify("success", "Berhasil mengubah data");
        }, 1);
        toggleDelete();
      },
    }
  );

  const handlerSubmit = (data) => {
    postOrganizers({
      ...data,
      organizerId: data.organizerId.value,
    });
  };

  const handlerSubmitUpdate = (data) => {
    updateOrganizers({
      ...data,
      organizerId: data.organizerId.value,
    });
  };

  return {
    data,
    handlerSubmitUpdate,
    deleteOrganizers,
    isLoadingDelete,
    isLoadingUpdate,
    isLoading,
    handlerSubmit,
    isLoadingPost,
  };
};
