---
layout: page
title: Footer
---

## Footer

Table **LeagueOne** as an example. The global footer will be included in every pages of **LeagueOne system**, in order to match **Active Network** UI style.

You can find all the below styles in `footer.less`.

### How it works

Reference `globalfooter.js`in the page, and add `<div id="footerControl"></div>`before the end tag of body(`</body>`).

{% highlight html %}
<div id="footerControl"></div>
{% endhighlight %}

### Demo

In practice, your footer will look like the example below.

{% example html %}
<div class="footer-example">
  <div class="footer">
    <div class="wrap">
      <div class="footer__logo">
        <a class="footer__float-left" href="http://www.activenetwork.com">
            <img src="/img/pic_logo.png" alt="" /></a>
        <a class="footer__float-right" href="http://www.active.com">
            <img src="/img/pic_active_logo.png" alt="" /></a>
      </div>
      <ul class="footer__links">
          <li>
              <a target="_blank" href="http://www.activenetwork.com/information/terms-of-use.htm">Terms of Use</a></li>
          <li>
              <a target="_blank" href="http://www.activenetwork.com/information/copyright-policy">Copyright Policy</a></li>
          <li>
              <a target="_blank" href="http://www.activenetwork.com/information/privacy-policy.htm">Your Privacy Rights</a></li>
          <li>
              <a target="_blank" href="http://www.activenetwork.com/information/cookie-policy.htm">Cookie Policy</a></li>
          <li>
              <a target="_blank" href="http://www.activenetwork.com/information/security">Security</a></li>
          <li>
              <a target="_blank" href="http://activesupport.force.com/leagueone">Support</a></li>
      </ul>
      <div class="footer__copyright">
          <a href="http://www.activenetwork.com" class="copyright-color">
              <span>©&nbsp;&nbsp;</span>
              <span id="copyYear">2016</span>
              <span>&nbsp;&nbsp;Active Network, LLC and/or its affiliates and licensors. All rights reserved.</span>
          </a>
      </div>
    </div>
  </div>
</div>
{% endexample %}
