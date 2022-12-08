import { loadOptionsOrganizer } from "@/api/loadOptions";

export const DEFAULTVALUES_REGISTER = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  repeatPassword: "",
};

export const DEFAULTVALUES_LOGIN = {
  email: "",
  password: "",
};

export const DEFAULTVALUES_ORGANIZERS = {
  organizerName: "",
  imageLocation: "",
};

export const HEADERS_ORGANIZERS = ["imageLocation", "organizerName", "Actions"];

export const MENU_DASHBOARD = [
  {
    name: "Organizers",
    link: "organizers",
  },
  {
    name: "Sports events",
    link: "sports-events",
  },
  {
    name: "Users",
    link: "users",
  },
];

export const TEMPLATE_FORM_ORGANIZERS = {
  tittle: "Organizer Name",
  fields: [
    {
      title: "Organizer Name",
      name: "organizerName",
      type: "text",
    },
    {
      title: "Image Location",
      name: "imageLocation",
      type: "text",
    },
  ],
};

export const TEMPLATE_FORM_SPORTS_EVENT = {
  tittle: "Sports Events",
  fields: [
    {
      title: "Event Date",
      name: "eventDate",
      type: "date",
    },
    {
      title: "Event Type",
      name: "eventType",
      type: "text",
    },
    {
      title: "Event Name",
      name: "eventName",
      type: "text",
    },
    {
      title: "Organizer Name",
      name: "organizerId",
      type: "hidden",
      loadOptions: loadOptionsOrganizer,
    },
  ],
};
