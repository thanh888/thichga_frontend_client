export const ConvertMoneyVND = (value: number): string => {
  return value.toLocaleString("it-IT", { style: "currency", currency: "VND" });
};

export const numberThousand = (value: string) => {
  return Number(value).toLocaleString("de-DE");
};
