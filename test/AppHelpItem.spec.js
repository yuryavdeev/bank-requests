import { mount } from '@vue/test-utils'
import AppHelpItem from '@/components/ui/AppHelpItem'

// - убрать условие отрисовки
// <p class="pb-4 mb-0" data-test="text">{{ question.text }}</p>
// - добавить данные
// data() {...
//     question: {
//       title: 'TITLE - Vue.js 3',
//       text: 'TEXT - Learn Vue.js 3'
//     }
//   };
// }


describe('AppHelpItem', () => {
  test('is a help title', () => {
    const wrapper = mount(AppHelpItem)

    const titleItem = wrapper.get('[data-test="title"]')

    expect(wrapper.findAll('[data-test="title"]')).toHaveLength(1)
    expect(titleItem.text()).toBe('TITLE - Vue.js 3')
  })

  test('is a help text', () => {
    const wrapper = mount(AppHelpItem)

    const textItem = wrapper.get('[data-test="text"]')

    expect(wrapper.findAll('[data-test="text"]')).toHaveLength(1)
    expect(textItem.text()).toBe('TEXT - Learn Vue.js 3')
  })
})
