import axiosCustomize from "@/utils/axios/axios.customize";

export const getRoomIsOpenedApi = async () => {
  const res = await axiosCustomize.get(`/bet-room/opened`);
  return res;
};
