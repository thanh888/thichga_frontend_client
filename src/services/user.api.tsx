import axiosCustomize from "@/utils/axios/axios.customize";

export const changePasswordApi = async (id: string, formData: any) => {
  const res = await axiosCustomize.put(`/user/${id}/password`, formData);
  return res;
};

export const changePinApi = async (id: string, formData: any) => {
  const res = await axiosCustomize.put(`/user/${id}/pin`, formData);
  return res;
};
