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

export const sampleMoneys = [
  {
    lable: "100K",
    value: "100000",
  },
  {
    lable: "200K",
    value: "200000",
  },
  {
    lable: "500K",
    value: "500000",
  },
  {
    lable: "1M",
    value: "1000000",
  },
  {
    lable: "2M",
    value: "2000000",
  },
  {
    lable: "5M",
    value: "5000000",
  },
];
