import axiosCustomize from "@/utils/axios/axios.customize";

export const changePasswordApi = async (id: string, formData: any) => {
  const res = await axiosCustomize.put(`/user/${id}/password`, formData);
  return res;
};

export const changePinApi = async (id: string, formData: any) => {
  console.log(id);

  const res = await axiosCustomize.put(`/user/${id}/pin`, formData);
  return res;
};

export const createPinApi = async (id: string, formData: any) => {
  const res = await axiosCustomize.put(`/user/${id}/create-pin`, formData);
  return res;
};

export const changeBankApi = async (id: string, formData: any) => {
  const res = await axiosCustomize.put(`/user/${id}/bank`, formData);
  return res;
};
