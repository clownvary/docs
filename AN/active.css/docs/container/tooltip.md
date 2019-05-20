---
layout: page
title: Tooltip
---

## Contents

* Will be replaced with the ToC, excluding the 'Contents' header
{:toc}

## When to use

- Short sentences. The black tooltips should be on light color background; the light gray tooltips should be on dark color background.

## Interaction details

- Desktop - Tooltips and popovers should be displayed onHover
- Tablet/Mobile - Tooltips and popovers should be displayed/disappeared on tap. When tooltip appears, tapping anywhere outside of the tooltip will close it.

### Tooltip default

Add tooltip support for every HTML5 element with a few CSS classes and also adding any tooltip content at will with help of `tooltips__content` child element.

Also, you could specify the direction of Tooltip:

- `.tooltips--n`
- `.tooltips--ne`
- `.tooltips--e`
- `.tooltips--se`
- `.tooltips--s`
- `.tooltips--sw`
- `.tooltips--w`
- `.tooltips--nw`


{% example html %}
<div class='tooltips-example'>
  <p>
    <a href='#' class='tooltips tooltips--n'>
      Tooltip North
      <span class='tooltips__content'>This is the tooltip.<button class='btn btn-strong'>I'm a button</button></span>
    </a>
  </p>
  <p>
    <a href='#' class='tooltips tooltips--ne'>
      Tooltip North East
      <span class='tooltips__content'>This is the tooltip.</span>
    </a>
  </p>
  <p>
    <a href='#' class='tooltips tooltips--e'>
      Tooltip East
      <span class='tooltips__content'>This is the tooltip.</span>
    </a>
  </p>
  <p>
    <a href='#' class='tooltips tooltips--se'>
      Tooltip South East
      <span class='tooltips__content'>This is the tooltip.</span>
    </a>
  </p>
  <p>
    <a href='#' class='tooltips tooltips--s'>
      Tooltip South
      <span class='tooltips__content'>This is the tooltip.</span>
    </a>
  </p>
  <p>
    <a href='#' class='tooltips tooltips--sw'>
      Tooltip South West
      <span class='tooltips__content'>This is the tooltip.</span>
    </a>
  </p>
  <p>
    <a href='#' class='tooltips tooltips--w'>
      Tooltip West
      <span class='tooltips__content'>This is the tooltip.</span>
    </a>
  </p>
  <p>
    <a href='#' class='tooltips tooltips--nw'>
      Tooltip North West
      <span class='tooltips__content'>This is the tooltip.</span>
    </a>
  </p>
</div>
{% endexample %}

### Tooltip Light Theme

Absolutely you could custimize the styles for the tooltips, such as applying different themes.

{% example html %}
<div class='tooltips-example'>
  <p>
    <a href='#' class='tooltips t-light tooltips--n'>
      Tooltip North
      <span class='tooltips__content'>This is the tooltip.<button class='btn btn-strong'>I'm a button</button></span>
    </a>
  </p>
  <p>
    <a href='#' class='tooltips t-light tooltips--ne'>
      Tooltip North East
      <span class='tooltips__content'>This is the tooltip.</span>
    </a>
  </p>
  <p>
    <a href='#' class='tooltips t-light tooltips--e'>
      Tooltip East
      <span class='tooltips__content'>This is the tooltip.</span>
    </a>
  </p>
  <p>
    <a href='#' class='tooltips t-light tooltips--se'>
      Tooltip South East
      <span class='tooltips__content'>This is the tooltip.</span>
    </a>
  </p>
  <p>
    <a href='#' class='tooltips t-light tooltips--s'>
      Tooltip South
      <span class='tooltips__content'>This is the tooltip.</span>
    </a>
  </p>
  <p>
    <a href='#' class='tooltips t-light tooltips--sw'>
      Tooltip South West
      <span class='tooltips__content'>This is the tooltip.</span>
    </a>
  </p>
  <p>
    <a href='#' class='tooltips t-light tooltips--w'>
      Tooltip West
      <span class='tooltips__content'>This is the tooltip.</span>
    </a>
  </p>
  <p>
    <a href='#' class='tooltips t-light tooltips--nw'>
      Tooltip North West
      <span class='tooltips__content'>This is the tooltip.</span>
    </a>
  </p>
</div>
{% endexample %}

### Tooltip Multiline

By default you only could add one line tooltip for your text, but with `tooltips--multiline` you could add long content. The downside is that you can't preform at the text with newlines and are always **250px** wide.

{% example html %}
<p>
  <a href='#' class='tooltips tooltips--w tooltips--multiline'>
    Multiline Tooltip
    <span class='tooltips__content'>Add tooltips built entirely in CSS to nearly any element and you could add any tooltip content at will with help of tooltips__content child element.</span>
  </a>
</p>
{% endexample %}

### Tooltip Without Delay

By default all of the tooltips have a tender animation delay(0.4s) before appearing. However, you could change this default behavior with the modifier class(`tooltips--no-delay`).

{% example html %}
<p>
  <a href='#' class='tooltips tooltips--n tooltips--no-delay'>
    Tooltip no delay
    <span class='tooltips__content'>This is the tooltip.</span>
  </a>
</p>
{% endexample %}
