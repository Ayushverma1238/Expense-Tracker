
export const BASE_URI = import.meta.env.VITE_API_URL;

export const API_PATH = {
    AUTH :{
        LOGIN: "/api/auth/login",
        REGISTER: "/api/auth/register",
        GET_USER_INFO : "/api/auth/getUser"
    },
    DASHBOARD:{
        GET_DASHBOARD_DATA : "/api/dashboard"
    },
    INCOME:{
        ADD_INCOME: "/api/income/add",
        DELETE_INCOME: (incomeId) => `/api/income/${incomeId}`,
        GET_ALL_INCOME: "/api/income/get",
        DOWNLOAD_INCOME: "/api/income/downloadexcel",
    },
    EXPENSE:{
         ADD_EXPENSE: "/api/expense/add",
        DELETE_EXPENSE: (incomeId)=> `/api/expense/${incomeId}`,
        GET_ALL_EXPENSE: "/api/expense/get",
        DOWNLOAD_EXPENSE: "/api/expense/downloadExpenses",
    },
    IMAGE:{
        UPLOAD_IMAGE: '/api/auth/upload-image'
    }
}