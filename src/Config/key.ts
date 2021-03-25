import dev from './dev'
import prod from './prod'
// if (process.env.NODE_ENV === 'production') {
//    export default prod
// } else {
//     module.exports = dev;
// }
export const config = process.env.NODE_ENV === 'production' ? prod:dev