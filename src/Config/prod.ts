
interface Prod {
    JWT_SECRET: string;
  }
const prod:Prod = {
    JWT_SECRET:process.env.JWT_SECRET!
}
export default prod;