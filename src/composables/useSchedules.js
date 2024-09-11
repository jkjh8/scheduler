import { ref } from 'vue'

const schedules = ref([])

const fnGetSchedules = async () => {
  return window.ipc.send('schedule:refresh')
}

const fnUpdateSchedules = (arr) => {
  schedules.value = arr
}

const fnGetScheduleModeLabel = (value) => {
  const idx = modeOptions.findIndex((e) => e.value === value)
  if (idx !== -1) return modeOptions[idx].label
  return ''
}

const modeOptions = [
  { label: '한번', value: 'once' },
  { label: '매일', value: 'everyDay' },
  { label: '매주', value: 'everyWeek' },
  { label: '월~금', value: 'workDays' }
]

const localeKR = {
  days: ['일요일', '월요일', '화요일', '수요일', '목요일', '금요일', '토요일'],
  daysShort: ['일', '월', '화', '수', '목', '금', '토'],
  months: [
    '1월',
    '2월',
    '3월',
    '4월',
    '5월',
    '6월',
    '7월',
    '8월',
    '9월',
    '10월',
    '11월',
    '12월'
  ],
  monthsShort: [
    '1월',
    '2월',
    '3월',
    '4월',
    '5월',
    '6월',
    '7월',
    '8월',
    '9월',
    '10월',
    '11월',
    '12월'
  ]
}

export {
  schedules,
  fnGetSchedules,
  fnUpdateSchedules,
  fnGetScheduleModeLabel,
  localeKR
}
