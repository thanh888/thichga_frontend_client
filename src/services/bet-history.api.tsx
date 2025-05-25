import axiosCustomize from "@/utils/axios/axios.customize";

export const getHistoriesBySession = async (sessionID: string) => {
  const res = await axiosCustomize.get(`/bet-history/${sessionID}/by-session`);
  return res;
};

export const paginateBetHistoryByUserIDApi = async (
  userID: string,
  query: string
) => {
  const res = await axiosCustomize.get(
    `/bet-history/${userID}/paginate-user?${query}`
  );
  return res;
};

export const createBetHistoryApi = async (formData: any) => {
  const res = await axiosCustomize.post(`/bet-history`, formData);
  return res;
};

export const updateMatchedBetHistoryApi = async (id: string, formData: any) => {
  const res = await axiosCustomize.put(`/bet-history/${id}/matched`, formData);
  return res;
};

export const createBetHistoryByOptionApi = async (
  option_id: string,
  formData: any
) => {
  const res = await axiosCustomize.put(
    `/bet-history/${option_id}/matched-by-option`,
    formData
  );
  return res;
};

export const deleteBetHistoryApi = async (id: string) => {
  const res = await axiosCustomize.delete(`/bet-history/${id}`);
  return res;
};
