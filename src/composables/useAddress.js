import { useQuasar } from 'quasar'
import DialogAddress from 'src/components/DialogAddress.vue'
import { useNotify } from './useNotify'

export const useAddress = () => {
  const $q = useQuasar()
  const { fnNotiInfo, fnNotiError } = useNotify()

  const fnSetMainServerAddress = (address) => {
    $q.dialog({
      component: DialogAddress,
      componentProps: {
        address: address,
        title: '메인 서버 주소 수정'
      }
    }).onOk((data) => {
      try {
        $q.loading.show()
        window.ipc.send('settings:main:ipaddress', data)
        fnNotiInfo('메인 서버 주소 수정 완료')
      } catch (error) {
        fnNotiError('메인 서버 주소 수정 오류')
      } finally {
        $q.loading.hide()
      }
    })
  }

  const fnSetBackupServerAddress = (address) => {
    $q.dialog({
      component: DialogAddress,
      componentProps: {
        address: address,
        title: '백업 서버 주소 수정'
      }
    }).onOk((data) => {
      try {
        $q.loading.show()
        window.ipc.send('settings:backup:ipaddress', data)
        fnNotiInfo('백업 서버 주소 수정 완료')
      } catch (error) {
        fnNotiError('백업 서버 주소 수정 오류')
      } finally {
        $q.loading.hide()
      }
    })
  }

  return { fnSetMainServerAddress, fnSetBackupServerAddress }
}
