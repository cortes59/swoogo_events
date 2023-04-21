import moment from "moment";

export const sortBy = (field, fieldType) => (a, b) => {
  switch (fieldType) {
    case "string":
    case "time":
      return (a[field] || "")
        .toString()
        .toLowerCase()
        .localeCompare((b[field] || "").toString().toLowerCase());
    default:
      return 0;
  }
};

console.log(moment("01:30:00"));
