export const ConvertMoneyVND = (value: number): string => {
  return value.toLocaleString("it-IT", { style: "currency", currency: "VND" });
};

export const numberThousand = (value: string) => {
  return Number(value).toLocaleString("de-DE");
};

export const calculateMoneyBet = (win: number, lost: number, money: number) => {
  const result = ((Number(money) * Number(win)) / Number(lost)).toFixed(2);

  return Number(result).toLocaleString("de-DE");
};
