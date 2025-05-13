import axiosCustomize from "@/utils/axios/axios.customize";

export const getOptionsBySession = async (sessionID: string) => {
  const res = await axiosCustomize.get(`/bet-option/${sessionID}/by-session`);
  return res;
};
