export const ConvertMoneyVND = (value: number): string => {
  return value.toLocaleString("it-IT", { style: "currency", currency: "VND" });
};

export const numberThousand = (value: string) => {
  return Number(value).toLocaleString("de-DE");
};

export const calculateMoneyBet = (win: number, lost: number, money: number) => {
  const result = ((Number(money) * Number(win)) / Number(lost)).toFixed(2);

  return Number(result);
};

export const convertDateTime = (dateTime: string) => {
  return new Date(dateTime ?? "").toLocaleString("vi-VN");
};
