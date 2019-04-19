console.log(process.env.NODE_ENV)
const baseUrl = process.env.NODE_ENV === "production" ? "" : "/api"
export const domain = `${baseUrl}`
export const test = `${domain}/test`
export const rule = `${baseUrl}/rule`
export const router = `${domain}/router`
