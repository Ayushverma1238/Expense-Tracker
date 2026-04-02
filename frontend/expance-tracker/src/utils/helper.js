import moment from "moment";

export const validateEmail = (email) => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
};

export const getInitial = ({ fullName }) => {
  if (!fullName) return "";

  const words = fullName.split(" ");
  let initial = "";
  for (let i = 0; i < Math.min(words.length, 2); i++) {
    initial += words[i][0];
  }

  return initial.toUpperCase();
};

export const addThousandSeparator = (num) => {
  if (num === null || isNaN(num)) return "";

  const [integerPart, fractionalPart] = num.toString().split(".");
  const formattedInteger = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ",");

  return fractionalPart ? `${formattedInteger}.${fractionalPart}`: formattedInteger;
};


export const prepareExpenseBarChart = (data = []) => {
  const chartData = data.map((item) => ({
    category: item?.category,
    month: moment(item?.date).format('Do MMM YYYY'),
    amount: Number(item?.amount), // ✅ convert string → number
  }));
  
  return chartData;
};

export const prepareIncomeChartData = (data =[]) =>{
  const sortedData = [...data].sort((a,b) => new Date(a.date) - new Date(b.date))
  const chartData = sortedData.map((item) => ({
    month: moment(item?.date).format('Do MMM YYYY'),
    amount: Number(item?.amount),
    category: item?.source
  }))

  return chartData;
}



export const prepareExpenseLineChartData = (data =[]) =>{
  const sortedData = [...data].sort((a,b)=> new Date(a.date) - new Date(b.date)) 
  const chartData = sortedData.map((item) =>({
    month : moment(item?.date).format('Do MMM YYYY'),
    amount: Number(item?.amount),
    category: item?.category
  }))
  return chartData;
}