import { mount } from '@vue/test-utils';
import InputBox from '~/components/elements/common/InputBox';

describe('InputBox.vue', () => {
  it('renders texts', () => {
    const wrapper = mount(InputBox, {
      propsData: {
        label: 'test label',
        placeholder: 'test holder',
        unit: 'test unit',
      },
    });
    expect(wrapper.html()).toContain('test holder');
    expect(wrapper.html()).not.toContain('必須');
    expect(wrapper.text()).toContain('test label');
    expect(wrapper.text()).toContain('test unit');
  });

  it('displays "必須" with isRequired = true', () => {
    const wrapper = mount(InputBox, {
      propsData: {
        isRequired: true,
      },
    });
    expect(wrapper.html()).toContain('必須');
  });

  it('passes icon class', () => {
    const wrapper = mount(InputBox, {
      propsData: {
        label: 'test label',
        placeholder: 'test holder',
        unit: 'test unit',
        icon: 'fas fa-lock',
      },
    });
    // propsで渡したicon classの反映
    expect(wrapper.html()).toContain('fas fa-lock');
  });

  it('behaves with readonly = false, default', () => {
    const wrapper = mount(InputBox, {
      propsData: {
        label: 'test label',
        placeholder: 'test holder',
        unit: 'test unit',
        icon: 'fas fa-lock',
      },
    });
    // クリックでclickイベントを発火
    wrapper.find('.a-inputBox__input').trigger('click');
    expect(wrapper.emitted('click')).toBeTruthy();
    expect(wrapper.emitted('click').length).toBe(1);
    // テキストを入力するとinputイベントを発火
    wrapper.find('.a-inputBox__input').setValue('test value');
    expect(wrapper.emitted('input')).toBeTruthy();
    expect(wrapper.emitted('input').length).toBe(1);
    expect(wrapper.emitted('input')[0]).toEqual(['test value']);
  });
});
