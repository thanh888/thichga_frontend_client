import axiosCustomize from "@/utils/axios/axios.customize";

export const getRoomIsOpenedApi = async () => {
  const res = await axiosCustomize.get(`/bet-room/opened`);
  return res;
};

export const getRoomById = async (id: string) => {
  const res = await axiosCustomize.get(`/bet-room/${id}`);
  return res;
};

export const getListRoomsOpening = async () => {
  const res = await axiosCustomize.get(`/bet-room/list-opened`);
  return res;
};

export const getListOtherRoomsOpening = async () => {
  const res = await axiosCustomize.get(`/bet-room/list-other-opening`);
  return res;
};
