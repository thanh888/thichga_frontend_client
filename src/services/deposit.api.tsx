import axiosCustomize from "@/utils/axios/axios.customize";

export const createDepositApi = async (formData: any) => {
  try {
    const res = await axiosCustomize.post(`/deposit-history`, formData);
    return res;
  } catch (error) {
    console.log(error);
    return error;
  }
};

export const paginateDepositApi = async (query: string) => {
  try {
    const res = await axiosCustomize.get(`/deposit-history/paginate?${query}`);
    return res;
  } catch (error) {
    console.log(error);
    return error;
  }
};
