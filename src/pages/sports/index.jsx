import React, { useContext, useMemo, useState } from "react";

import { GlobalTable, ModalForm, ModalDelete } from "@/components";
import { useSportsEvents } from "@/hooks";
import { constant, yupSchema, client } from "@/utils";
import { ActionContext } from "@/context/Action";

export const Sports = () => {
  const [page, setPage] = useState(1);
  const [perPage, setPerpage] = useState(10);
  const {
    updateModal,
    deleteModal,
    postModal,
    toggleUpdate,
    togglePost,
    oneData,
  } = useContext(ActionContext);
  const {
    data,
    isLoading,
    isLoadingUpdate,
    handlerSubmitUpdate,
    handlerSubmit,
    deleteOrganizers,
    isLoadingDelete,
    isLoadingPost,
  } = useSportsEvents(page, perPage);

  const columns = useMemo(
    () => [
      {
        Header: "Event Date",
        accessor: "eventDate",
      },
      {
        Header: "Event Name",
        accessor: "eventName",
      },
      {
        Header: "Event type",
        accessor: "eventType",
      },
      {
        Header: "Organizer",
        accessor: "organizer.organizerName",
      },
    ],
    []
  );

  const defaultValuesUpdate = {
    eventDate: client.getDataById(data?.data, oneData)?.eventDate,
    eventType: client.getDataById(data?.data, oneData)?.eventType,
    eventName: client.getDataById(data?.data, oneData)?.eventName,
    organizerId: {
      value: client.getDataById(data?.data, oneData)?.organizer.id,
      label: client.getDataById(data?.data, oneData)?.organizer.organizerName,
    },
  };

  return (
    <>
      <GlobalTable
        isLoading={isLoading}
        columns={columns}
        setPage={setPerpage}
        data={data?.data}
        nextPage={client.nextPage(setPage, page, data?.meta?.pagination?.total)}
        prevPage={client.prevPage(setPage, page)}
        gotoPage={client.gotoPage(setPage)}
        currentPage={data?.meta?.pagination?.current_page}
        pageCount={data?.meta?.pagination?.total}
      />
      {updateModal && (
        <ModalForm
          onSubmit={handlerSubmitUpdate}
          validatorSchema={yupSchema.validationSportsEvents()}
          isSubmitting={isLoadingUpdate}
          isOpen={updateModal}
          template={constant.TEMPLATE_FORM_SPORTS_EVENT}
          onClose={toggleUpdate}
          defaultValues={defaultValuesUpdate}
        />
      )}
      {postModal && (
        <ModalForm
          onSubmit={handlerSubmit}
          validatorSchema={yupSchema.validationSportsEvents()}
          isSubmitting={isLoadingPost}
          isOpen={postModal}
          template={constant.TEMPLATE_FORM_SPORTS_EVENT}
          defaultValues={constant.DEFAULTVALUES_ORGANIZERS}
          onClose={togglePost}
        />
      )}
      {deleteModal && (
        <ModalDelete
          confirmModal={deleteOrganizers}
          isLoading={isLoadingDelete}
        />
      )}
    </>
  );
};
