import axiosCustomize from "@/utils/axios/axios.customize";

export const getHistoriesBySession = async (sessionID: string) => {
  const res = await axiosCustomize.get(`/bet-history/${sessionID}/by-session`);
  return res;
};
