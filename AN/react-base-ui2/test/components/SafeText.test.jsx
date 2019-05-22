import React from 'react';
import { mount } from 'enzyme';
import { SafeText } from 'src/components/SafeText';


describe('components/SafeText', () => {
  test('SafeText renders with correct tag', () => {
    let wrapper = mount(
      <SafeText tagName="span" text="Castle Black" className="dummy" />
    );
    expect(wrapper.html()).toEqual('<span class="dummy" data-qa-id="">Castle Black</span>');

    wrapper = mount(
      <SafeText tagName="div" />
    );
    expect(wrapper.html()).toEqual('<div data-qa-id=""></div>');

    wrapper = mount(
      <SafeText tagName="li" />
    );
    expect(wrapper.html()).toEqual('<li data-qa-id=""></li>');

    wrapper = mount(
      <SafeText tagName="label" />
    );
    expect(wrapper.html()).toEqual('<label data-qa-id=""></label>');

    wrapper = mount(
      <SafeText tagName="p" />
    );
    expect(wrapper.html()).toEqual('<p data-qa-id=""></p>');

    wrapper = mount(
      <SafeText tagName="button" />
    );
    expect(wrapper.html()).toEqual('<button data-qa-id=""></button>');
  });

  test('SafeText works fine with decoded text', () => {
    let wrapper = mount(
      <SafeText tagName="span" text="<h1>Title</h1>" className="dummy" />
    );
    expect(wrapper.html()).toEqual('<span class="dummy" data-qa-id="">&lt;h1&gt;Title&lt;/h1&gt;</span>');

    wrapper = mount(
      <SafeText tagName="span" text="&lt;h1&gt;Title&lt;/h1&gt;" className="dummy" />
    );
    expect(wrapper.html()).toEqual('<span class="dummy" data-qa-id="">&lt;h1&gt;Title&lt;/h1&gt;</span>');

    wrapper = mount(
      <SafeText tagName="span" text="&amp;&lt;&gt;&#39;&quot;&#126;&#096;" className="dummy" />
    );
    expect(wrapper.html()).toEqual('<span class="dummy" data-qa-id="">&amp;&lt;&gt;\'"~`</span>');
  });
});
