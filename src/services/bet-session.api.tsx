import axiosCustomize from "@/utils/axios/axios.customize";

export const getSessionIsOpenedApi = async (roomID: string) => {
  const res = await axiosCustomize.get(`/bet-session/${roomID}/opened`);
  return res;
};
