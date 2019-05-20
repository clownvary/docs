---
layout: page
title: Tags
---

Tags have a height of 18px, Font S, 3px corner radius and 5px margin between tags.

The tags function as links. Hover state - darken color by 15%

## Contents

* Will be replaced with the ToC, excluding the 'Contents' header
{:toc}

## When to Use
- Use for sets of items that require a tagging mechanism. e.g., tag clouds

## Tags

This is how tags look when entered into a form field.

{% example html %}
<div class="tag-input input">
  <span class="badge">Jogging</span>
  <span class="badge">Running</span>
  <span class="badge">Walk</span>
</div>
{% endexample %}

## Tags with Input

{% example html %}
<div class="tag-input">
  <input class='input' value='Jogging' />
</div>
{% endexample %}

## Tags Published

This is how tags look once they are **published**.

{% example html %}
<span class="badge">Jogging</span>
<span class="badge">Running</span>
<span class="badge">Walk</span>
{% endexample %}

## Tag Editor

{% example html %}
<div class="tageditor">
  <span class="tag-input">
    <span class="badge">
      <span>first with custom className</span>
    </span>
  </span>
  <span class="tag-input">
    <span class="badge">
      <span>fee@activenetwork.com</span>
    </span>
  </span>
  <span class="tag-input">
    <span class="badge">
      <span>third</span>
    </span>
  </span>
  <span class="tag-input">
    <span class="badge">
      <span>180 1234 5678</span>
    </span>
  </span>
</div>
{% endexample %}

Tag Editor with `is-errored` state

{% example html %}
<div class="tageditor is-errored">
  <span class="tag-input">
    <span class="badge">
      <span>first with custom className</span>
    </span>
  </span>
  <span class="tag-input">
    <span class="badge">
      <span>fee@activenetwork.com</span>
    </span>
  </span>
  <span class="tag-input">
    <span class="badge">
      <span>third</span>
    </span>
  </span>
  <span class="tag-input">
    <span class="badge">
      <span>180 1234 5678</span>
    </span>
  </span>
</div>
{% endexample %}

Tag Editor with customized close icon

{% example html %}
<div class="tag-input input">
  <span class="badge badge--with-close-icon">
    Jogging
    <i class='icon-close-thin'></i>
  </span>
  <span class="badge badge--with-close-icon">
    Running
    <i class='icon-close-thin'></i>
  </span>
  <span class="badge badge--with-close-icon">
    Walk
    <i class='icon-close-thin'></i>
  </span>
</div>
{% endexample %}
