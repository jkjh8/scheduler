import { useQuasar } from 'quasar'
import DialogAddress from 'src/components/DialogAddress.vue'

export const useAddress = () => {
  const $q = useQuasar()

  const fnSetMainServerAddress = (address) => {
    $q.dialog({
      component: DialogAddress,
      componentProps: {
        address: address,
        title: '메인 서버 주소 수정'
      }
    }).onOk((data) => {
      console.log('DialogAddress onOk', data)
    })
  }

  return { fnSetMainServerAddress }
}
