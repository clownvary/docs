---
layout: page
title: Sidebar
---

Sidebar is the related secondary content of the site. Use it when secondary information is needed on the page. This can be for: steps, tips, help links.

It should be used for content tangentially related to the content surrounding it, such as related reading links, steps, tips, help links, creatives and glossaries.

## Contents

* Will be replaced with the ToC, excluding the "Contents" header
{:toc}

## Friendly Reminder

To implement a proper heading tag in the sidebar, please ensure the level of it should not be greater than the page's level.

For instance, using `<h4>` is a tempting choice if the page level is 3.

## Steps

{% example html %}
<div class="sidebar-example grid-u-4-12">
  <aside class="sidebar">
    <h5>Progress steps to add a Family Member</h5>
    <ul>
      <li><a href="" class="past" title="1. Enter the age">1. Enter the age</a></li>
      <li><a href="" class="active" title="2. Select the gender">2. Select the gender</a></li>
      <li><a href="" title="3. Select the interests">3. Select the interests</a></li>
      <li><a href="" title="4. Enter a nickname">4. Enter a nickname</a></li>
      <li><a href="" title="5. Save and view results">5. Save and view results</a></li>
    </ul>
  </aside>
</div>
{% endexample %}


## Frequently Asked Questions

{% example html %}
<div class="sidebar-example grid-u-4-12">
  <aside class="sidebar sidebar--links">
    <h4>Frequently asked questions</h4>
    <ul>
      <li>
        <a href="" title="What is ACTIVE Advantage?">
        What is ACTIVE Advantage?</a>
      </li>
      <li>
        <a href="" title="What are the benefits of the ACTIVE Advantage membership?">
        What are the benefits of the ACTIVE Advantage membership?</a>
      </li>
      <li>
        <a href="" title="What is the ACTIVE Advantage trial membership?">What is the ACTIVE Advantage trial membership?</a>
      </li>
      <li>
        <a href="" title="How much does an ACTIVE Advantage membership cost?">How much does an ACTIVE Advantage membership cost?</a>
      </li>
      <li>
        <a href="" title="How do I cancel my ACTIVE Advantage membership?">How do I cancel my ACTIVE Advantage membership?</a>
      </li>
      <li>
        <a href="" title="How do I redeem ACTIVE Advantage registration discounts?">How do I redeem ACTIVE Advantage registration discounts?</a>
      </li>
    </ul>
  </aside>
</div>
{% endexample %}
