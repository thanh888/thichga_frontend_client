export const ConvertMoneyVND = (value: number): string => {
  return value.toLocaleString("it-IT", { style: "currency", currency: "VND" });
};

export const numberThousand = (value: string) => {
  return Number(value).toLocaleString("de-DE");
};

export const numberThousandFload = (value: string | number) => {
  const floatValue = parseFloat(value.toString());
  if (isNaN(floatValue)) return "0,00";
  return floatValue.toLocaleString("de-DE", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
};

export const calculateMoneyBet = (win: number, lost: number, money: number) => {
  const result = ((Number(money) * Number(lost)) / Number(win)).toFixed(2);

  return Number(result);
};

export const convertDateTime = (dateTime: string) => {
  return new Date(dateTime ?? "").toLocaleString("vi-VN");
};

export const sampleMoneys = [
  {
    lable: "100K",
    value: "100",
  },
  {
    lable: "200K",
    value: "200",
  },
  {
    lable: "500K",
    value: "500",
  },
  {
    lable: "1M",
    value: "1000",
  },
  {
    lable: "2M",
    value: "2000",
  },
  {
    lable: "5M",
    value: "5000",
  },
];
