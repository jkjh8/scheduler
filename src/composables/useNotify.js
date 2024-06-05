import { useQuasar } from 'quasar'

const useNotify = () => {
  const $q = useQuasar()

  const fnNotiInfo = (message, caption) => {
    $q.notify({
      color: 'positive',
      textColor: 'white',
      icon: 'info',
      message: message,
      caption: caption ?? '',
      position: 'top'
    })
  }
  const fnNotiWarn = (message, caption) => {
    $q.notify({
      color: 'warning',
      textColor: 'white',
      icon: 'warning',
      message: message,
      caption: caption ?? '',
      position: 'top'
    })
  }

  const fnNotiError = (message, caption) => {
    $q.notify({
      color: 'negative',
      textColor: 'white',
      icon: 'error',
      message: message,
      caption: caption ?? '',
      position: 'top'
    })
  }

  return { fnNotiInfo, fnNotiWarn, fnNotiError }
}

export { useNotify }
