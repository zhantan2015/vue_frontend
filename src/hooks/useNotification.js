import { mainState } from '@/store'


// import useNotification from './hooks/useNotification'
// const notification = { ...useNotification() }

export default function () {
    let mainStateObj = mainState()

    return {
        success(message, timeout) {
            let option = {
                type: 'success',
                message: message,
                timeout: timeout
            }
            mainStateObj.activeNotification(option)
        },
        failed(message, timeout) {
            let option = {
                type: 'failed',
                message: message,
                timeout: timeout
            }
            mainStateObj.activeNotification(option)
        },
        info(message, timeout) {
            let option = {
                type: 'info',
                message: message,
                timeout: timeout
            }
            mainStateObj.activeNotification(option)
        },
        warn(message, timeout) {
            let option = {
                type: 'warn',
                message: message,
                timeout: timeout
            }
            mainStateObj.activeNotification(option)
        }
    }
}