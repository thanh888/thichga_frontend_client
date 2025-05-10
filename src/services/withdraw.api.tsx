import axiosCustomize from "@/utils/axios/axios.customize";

export const createWithdrawApi = async (formData: any) => {
  try {
    const res = await axiosCustomize.post(`/withdraw-history`, formData);
    return res;
  } catch (error) {
    return error;
  }
};

export const paginateWithdrawApi = async (query: string) => {
  try {
    const res = await axiosCustomize.get(`/withdraw-history/paginate?${query}`);
    return res;
  } catch (error) {
    console.log(error);
    return error;
  }
};
