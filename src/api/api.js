import Axios from "axios";

const api = Axios.create({
  baseURL: "https://esports-api.lolesports.com/persisted/gw",
});

export default api;
