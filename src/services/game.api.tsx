import axiosCustomize from "@/utils/axios/axios.customize";

export const getGameNewApi = async () => {
  const res = await axiosCustomize.get(`/game/game-new`);
  return res;
};
