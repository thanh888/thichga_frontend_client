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

export const numberThousandFloadBigMoney = (value: string | number) => {
  const floatValue = parseFloat(value.toString());
  if (isNaN(floatValue)) return "0,00";

  let shortValue = floatValue;
  let suffix = "";

  if (floatValue >= 1_000_000_000) {
    shortValue = floatValue / 1_000_000_000;
    suffix = "B";
  } else if (floatValue >= 1_000_000) {
    shortValue = floatValue / 1_000_000;
    suffix = "M";
  } else if (floatValue >= 1_000) {
    shortValue = floatValue / 1_000;
    suffix = "K";
  }

  return (
    shortValue.toLocaleString("de-DE", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }) + suffix
  );
};

export const calculateMoneyBet = (win: number, lost: number, money: number) => {
  const result = ((Number(money) * Number(lost)) / Number(win)).toFixed(2);

  return Number(result);
};

export const convertDateTime = (dateTime: string) => {
  return new Date(dateTime ?? "").toLocaleString("vi-VN");
};

export const convertDateTimeVN = (dateInput: string | Date): string => {
  const date = new Date(dateInput);
  return date.toLocaleString("vi-VN", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });
};

export const sampleMoneys = [
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
