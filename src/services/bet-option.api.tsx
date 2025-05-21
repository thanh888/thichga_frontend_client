import axiosCustomize from "@/utils/axios/axios.customize";

export const getOptionsBySession = async (sessionID: string) => {
  const res = await axiosCustomize.get(`/bet-option/${sessionID}/by-session`);
  return res;
};

export const getOptionsExGameBySession = async (sessionID: string) => {
  const res = await axiosCustomize.get(`/bet-history/${sessionID}/of-exgame`);
  return res;
};

export const createOptionExGame = async (formData: any) => {
  const res = await axiosCustomize.post(
    `/bet-option/create-by-exgame`,
    formData
  );
  return res;
};
